# coding: utf-8

import sys
from flask import Flask

# flask object
flask_obj = Flask(__name__)

# インデックスページ
@flask_obj.route("/")
def index_page():
    return "lps index page"


# メイン関数
def main():
    # コマンドライン引数を取得
    args = sys.argv
    if (len(args) < 2):
        print("invaid arguments.")
        print("Usage: python3 " + args[0] + " (port number)")
        return
    
    # ポート番号
    flask_port = args[1]

    # サーバ始動
    flask_obj.run(port=flask_port)

# エントリポイント
if __name__ == "__main__":
    main()
