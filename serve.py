# -*- coding: utf-8 -*-
"""
serve.py - Range リクエスト対応の簡易ローカルサーバー
このフォルダを配信します。ページがモデル(VRM)を分割取得するため、
標準の http.server では足りず、Range 対応版を同梱しています。

使い方:  python serve.py [ポート番号(既定 8000)]
開くURL: http://localhost:8000/
"""
import http.server
import os
import re
import sys
import threading
import webbrowser


class RangeHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        self._remaining = None
        path = self.translate_path(self.path)
        rng = self.headers.get("Range")
        if rng and os.path.isfile(path):
            m = re.match(r"bytes=(\d*)-(\d*)", rng.strip())
            if m:
                size = os.path.getsize(path)
                start = int(m.group(1)) if m.group(1) else 0
                end = int(m.group(2)) if m.group(2) else size - 1
                end = min(end, size - 1)
                if start <= end:
                    length = end - start + 1
                    self.send_response(206)
                    self.send_header("Content-Type", self.guess_type(path))
                    self.send_header("Content-Range",
                                     "bytes %d-%d/%d" % (start, end, size))
                    self.send_header("Content-Length", str(length))
                    self.send_header("Accept-Ranges", "bytes")
                    self.end_headers()
                    f = open(path, "rb")
                    f.seek(start)
                    self._remaining = length
                    return f
        return super().send_head()

    def copyfile(self, source, outputfile):
        if self._remaining is None:
            return super().copyfile(source, outputfile)
        remaining = self._remaining
        while remaining > 0:
            chunk = source.read(min(65536, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    url = "http://localhost:%d/" % port
    try:
        server = http.server.ThreadingHTTPServer(
            ("127.0.0.1", port), RangeHandler)
    except OSError:
        print("ポート %d は使用中でした（サーバー起動済みのはず）。"
              "ブラウザだけ開きます。" % port)
        webbrowser.open(url)
        sys.exit(0)
    print("サーバー起動: %s" % url)
    print("ブラウザを自動で開きます。終了は Ctrl+C")
    threading.Timer(0.8, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
