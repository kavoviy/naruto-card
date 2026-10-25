"""Local-only static server. No external dependencies. Keeps save origin stable."""
import http.server, os, pathlib, webbrowser
os.chdir(pathlib.Path(__file__).resolve().parent)
url = 'http://localhost:8765/?edition=07'
class FreshHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

try:
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 8765), FreshHandler)
except OSError:
    print('Port 8765 is busy. Close the previous game server and retry.')
    input('Press Enter to close...')
    raise SystemExit(1)
print('Naruto Shinobi Cards:', url)
print('Keep this window open. Press Ctrl+C to stop.')
webbrowser.open(url)
try: server.serve_forever()
except KeyboardInterrupt: server.server_close()
