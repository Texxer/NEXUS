use anyhow::Result;
use tokio::sync::RwLock;
use std::sync::Arc;
use std::collections::HashMap;

pub struct OllamaClient {
    base_url: String,
    model: String,
    cache: Arc<RwLock<HashMap<String, String>>>,
}

impl OllamaClient {
    pub fn new(base_url: String, model: String) -> Self {
        Self {
            base_url,
            model,
            cache: Arc::new(RwLock::new(HashMap::new())),
        }
    }

    pub async fn complete(&self, context: &str) -> Result<String> {
        let cache = self.cache.read().await;
        if let Some(cached) = cache.get(context) {
            return Ok(cached.clone());
        }
        drop(cache);

        let prompt = format!(
            "Complete this code snippet. Return only the completion without explanation:\n\n{}",
            context
        );

        let client = reqwest::Client::new();
        let response = client
            .post(format!("{}/api/generate", self.base_url))
            .json(&serde_json::json!({
                "model": self.model,
                "prompt": prompt,
                "stream": false
            }))
            .send()
            .await?;

        let body: serde_json::Value = response.json().await?;
        let completion = body["response"].as_str().unwrap_or("").to_string();

        let mut cache = self.cache.write().await;
        cache.insert(context.to_string(), completion.clone());

        Ok(completion)
    }

    pub async fn explain(&self, code: &str) -> Result<String> {
        let prompt = format!(
            "Explain this code in one sentence:\n\n{}",
            code
        );

        let client = reqwest::Client::new();
        let response = client
            .post(format!("{}/api/generate", self.base_url))
            .json(&serde_json::json!({
                "model": self.model,
                "prompt": prompt,
                "stream": false
            }))
            .send()
            .await?;

        let body: serde_json::Value = response.json().await?;
        Ok(body["response"].as_str().unwrap_or("").to_string())
    }

    pub async fn fix_error(&self, error: &str, code: &str) -> Result<String> {
        let prompt = format!(
            "Fix this error in the code:\nError: {}\nCode:\n{}\n\nReturn only the fixed code.",
            error, code
        );

        let client = reqwest::Client::new();
        let response = client
            .post(format!("{}/api/generate", self.base_url))
            .json(&serde_json::json!({
                "model": self.model,
                "prompt": prompt,
                "stream": false
            }))
            .send()
            .await?;

        let body: serde_json::Value = response.json().await?;
        Ok(body["response"].as_str().unwrap_or("").to_string())
    }

    pub fn set_model(&mut self, model: String) {
        self.model = model;
    }

    pub async fn clear_cache(&self) {
        let mut cache = self.cache.write().await;
        cache.clear();
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_client_creation() {
        let client = OllamaClient::new(
            "http://localhost:11434".to_string(),
            "deepseek-v3:671b-cloud".to_string(),
        );
        assert_eq!(client.model, "deepseek-v3:671b-cloud");
    }
}
