# 🚀 QUICK REFERENCE - Ollama + Zenith IDE

**Last Updated**: October 17, 2025

---

## ⚡ GET STARTED IN 5 MINUTES

### 1. Install Ollama

```bash
# macOS
brew install ollama

# Linux
curl https://ollama.ai/install.sh | sh

# Windows: Download from ollama.com
```

### 2. Start Server

```bash
ollama serve
```

### 3. Pull Model

```bash
ollama pull mistral
```

### 4. Test API

```bash
curl http://localhost:11434/api/tags
```

### 5. Build Zenith

```bash
cd C:\Users\Michael\OneDrive\IDE
make setup
make dev
```

---

## 📁 KEY FILES LOCATION

| File | Path | Purpose |
|------|------|---------|
| 📍 START | `ZENITH_OLLAMA_SUMMARY.md` | Project overview |
| 📍 NEXT | `IDE/INDEX.md` | Navigation |
| 📍 THEN | `frameworks/OLLAMA_INTEGRATION_GUIDE.md` | Integration |
| 🔧 REF | `frameworks/OLLAMA_CLOUD_DOCS.md` | API docs |
| 🏗️ ARCH | `IDE/docs/architecture.md` | System design |

---

## 🛠️ DEVELOPMENT COMMANDS

```bash
cd IDE

# Setup
make setup                    # Install dependencies
make clean                    # Clean artifacts

# Development
make dev                      # Start dev server
make watch                    # Watch for changes
make debug                    # Debug build

# Testing & Quality
make test                     # Run tests
make lint                     # Check code quality
make format                   # Format code

# Building
make build                    # Release build
make build-core              # Just Rust
make build-ui                # Just React

# Info
make logs                     # View logs
make help                     # Show all commands
```

---

## 💾 QUICK INTEGRATION GUIDE

### Phase 1: OllamaClient (Week 1-2)

```rust
// core/src/ollama.rs
pub struct OllamaClient {
    base_url: String,
    client: reqwest::Client,
    api_key: Option<String>,
}

impl OllamaClient {
    pub async fn generate(&self, prompt: &str, model: &str) -> Result<String> {
        // Implementation here
    }
}
```

### Phase 2: Connect Editor (Week 2-3)

```rust
// core/src/analyzer.rs - add to CodeAnalyzer
pub async fn get_completions_with_ollama(
    &self,
    code: &str,
    model: &str,
) -> Result<Vec<CompletionItem>> {
    let ollama = OllamaClient::new(...);
    let response = ollama.generate(code, model).await?;
    Ok(self.parse_completions(&response))
}
```

### Phase 3: Build UI Component (Week 3-4)

```typescript
// ui/src/components/AIAssistant.tsx
export const AIAssistant: React.FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const fetchSuggestions = async () => {
    const response = await fetch('/api/ai/complete', {
      method: 'POST',
      body: JSON.stringify({ prompt: editorContent })
    });
    setSuggestions(await response.json());
  };
  
  return <div>{/* Render suggestions */}</div>;
};
```

---

## 📊 KEY STATISTICS

| Metric | Value |
|--------|-------|
| Repositories | 9 (with Ollama) |
| Code Lines | 5,300+ |
| Documentation | 4,700+ |
| Code Examples | 15+ |
| Integration Phases | 4 |
| Total Size | ~14 GB |
| Time to MVP | 2-3 weeks |
| Team Size | 2 recommended |

---

## 🤖 OLLAMA MODELS

### Recommended for IDE

| Model | Size | Speed | Use Case |
|-------|------|-------|----------|
| Mistral | 7B | ⚡⚡⚡⚡⚡ | Code completion |
| Neural-Chat | 7B | ⚡⚡⚡⚡⚡ | Chat, analysis |
| CodeUp | 13B | ⚡⚡⚡⚡ | Code-specific |
| Llama2 | 70B | ⚡⚡⚡ | Detailed responses |
| GPT-OSS-Cloud | 120B | ⚡⚡ | Cloud, most powerful |

### Quick Pull

```bash
ollama pull mistral             # Fast, general purpose
ollama pull neural-chat:7b      # Chat optimized
ollama pull codeup              # Code focused
ollama pull llama2:13b          # Good balance
ollama pull gpt-oss:120b-cloud  # Cloud model
```

---

## 🔌 API ENDPOINTS

### Local (After `ollama serve`)

```bash
# List models
GET http://localhost:11434/api/tags

# Generate text
POST http://localhost:11434/api/generate
Content-Type: application/json
{
  "model": "mistral",
  "prompt": "Hello",
  "stream": false
}

# Chat
POST http://localhost:11434/api/chat
{
  "model": "mistral",
  "messages": [{"role": "user", "content": "Hi"}]
}
```

### Cloud

```bash
# Set API key
export OLLAMA_API_KEY=sk_your_key

# Generate (same as local but use cloud host)
curl https://ollama.com/api/generate \
  -H "Authorization: Bearer $OLLAMA_API_KEY" \
  -d '{"model": "gpt-oss:120b-cloud", "prompt": "Hello"}'
```

---

## 🎯 INTEGRATION POINTS

### 1. Code Completion

- **Trigger**: User pauses typing (500ms)
- **Model**: Mistral (7B)
- **Input**: Code context (500 chars before cursor)
- **Output**: 3-5 suggestions
- **Cache**: Yes (by context hash)

### 2. Error Analysis

- **Trigger**: Syntax error detected
- **Model**: CodeUp (13B)
- **Input**: Error + surrounding code
- **Output**: Fix suggestions
- **Cache**: 24 hours

### 3. Documentation

- **Trigger**: User selects code + Alt+D
- **Model**: Llama2 (70B)
- **Input**: Code snippet
- **Output**: Docstring
- **Cache**: 30 days

### 4. Code Review

- **Trigger**: User right-clicks + Review
- **Model**: Mistral (7B)
- **Input**: File or selection
- **Output**: Review comments
- **Cache**: Per-file

### 5. Search

- **Trigger**: Ctrl+F (ai mode)
- **Model**: GPT-OSS-cloud (120B)
- **Input**: Natural language query
- **Output**: Matching code locations
- **Cache**: Query-based

---

## ⚙️ CONFIGURATION

### Default Settings

```toml
[ollama]
enabled = true
mode = "local"
local_url = "http://localhost:11434"

[features]
code_completion = true
error_analysis = true
documentation = true
code_review = false      # Disabled by default
search = false           # Disabled by default

[models]
completion = "mistral"
chat = "neural-chat"
analysis = "codeup"
documentation = "llama2"
powerful = "gpt-oss:120b-cloud"
```

---

## 🔍 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Connection refused | `ollama serve` in separate terminal |
| Model not found | `ollama pull mistral` |
| Out of memory | Use smaller model: `mistral:7b` |
| Slow responses | Check GPU: `nvidia-smi` |
| API key error | Verify: `echo $OLLAMA_API_KEY` |
| No suggestions | Check: `curl http://localhost:11434/api/tags` |

---

## 📚 DOCUMENTATION ROADMAP

**Read In Order:**

1. **`ZENITH_OLLAMA_SUMMARY.md`** (5 min)
   - Overview and big picture

2. **`IDE/INDEX.md`** (10 min)
   - Architecture overview

3. **`frameworks/OLLAMA_INTEGRATION_GUIDE.md`** (20 min)
   - Phase 1-4 details

4. **`frameworks/OLLAMA_CLOUD_DOCS.md`** (5 min)
   - API reference

5. **`IDE/docs/architecture.md`** (15 min)
   - System design

**Total: ~55 minutes to full understanding**

---

## 🚀 NEXT STEPS

### Today

- [ ] Read `ZENITH_OLLAMA_SUMMARY.md`
- [ ] Install Ollama
- [ ] Pull Mistral model
- [ ] Test API with curl

### This Week

- [ ] Implement `OllamaClient` (Phase 1)
- [ ] Create API endpoint `/api/ai/complete`
- [ ] Write unit tests
- [ ] Test with editor

### Next Week

- [ ] Add caching layer (Phase 2)
- [ ] Implement streaming
- [ ] Build React component (Phase 3)
- [ ] Connect to editor

### In 2 Weeks

- [ ] Full Phase 1-3 complete
- [ ] MVP ready for testing
- [ ] Performance optimization (Phase 4)

---

## 💡 PRO TIPS

1. **Start Local**: Use local models first (Mistral), add cloud later
2. **Cache Aggressively**: Cache 90%+ of completions
3. **Stream Large Outputs**: Don't wait for full response
4. **Monitor Performance**: Log every API call
5. **Test Early**: Test with small models first
6. **Use Multiple Models**: Different models for different tasks
7. **Hot Reload**: Update settings without restart
8. **Fallback Gracefully**: Show basic completion if Ollama down

---

## 🎓 LEARNING RESOURCES

- Official: <https://ollama.com>
- Docs: <https://docs.ollama.com>
- Cloud: <https://docs.ollama.com/cloud>
- Models: <https://ollama.com/models>
- GitHub: <https://github.com/ollama/ollama>

---

## ✅ QUICK CHECKLIST

- [ ] Read ZENITH_OLLAMA_SUMMARY.md
- [ ] Install Ollama
- [ ] Start Ollama server
- [ ] Pull Mistral model
- [ ] Test API (curl)
- [ ] Read IDE/INDEX.md
- [ ] Read OLLAMA_INTEGRATION_GUIDE.md
- [ ] Run `cd IDE && make setup`
- [ ] Run `make dev`
- [ ] Implement Phase 1
- [ ] Test completions
- [ ] Continue to Phase 2

---

**Quick Reference v1.0**  
**October 17, 2025**

*Bookmark this file for quick access!*
