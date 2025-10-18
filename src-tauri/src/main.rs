// NEXUS Pro - The Fastest IDE on Earth
// MVP Core: Editor + Terminal + AI Integration

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod editor;
mod commands;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            commands::open_file,
            commands::save_file,
        ])
        .setup(|app| {
            let main_window = app.get_window("main")
                .expect("no main window");
            tauri_plugin_window_state::StateFlags::all().save_window_state(&main_window)
                .ok();
            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                let _ = tauri_plugin_window_state::StateFlags::all()
                    .save_window_state(window);
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
