import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000
HANDLER = http.server.SimpleHTTPRequestHandler

# Change to project directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

print("=" * 50)
print("NEXUS IDE - Web Server")
print("=" * 50)
print(f"Starting server on http://localhost:{PORT}")
print("Serving: " + os.getcwd())
print("Press Ctrl+C to stop")
print("=" * 50)

# Open browser
webbrowser.open(f"http://localhost:{PORT}/nexus-ide-standalone.html")

try:
    with socketserver.TCPServer(("", PORT), HANDLER) as httpd:
        print("\nServer running. Browser should open automatically...")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n\nServer stopped.")
except OSError as e:
    print(f"ERROR: Could not bind to port {PORT}")
    print("Port might be in use. Try running: netstat -ano | findstr :{PORT}")
