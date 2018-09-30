# coding: utf-8

import sys
from flask import Flask, request, jsonify
import regist_detail

# flask object
flask_obj = Flask(__name__)
flask_obj.config['JSON_AS_ASCII'] = False   # 文字化け対策

# インデックスページ
@flask_obj.route("/")
def index_page():
    return "lps index page"

# カテゴリ項目取得
@flask_obj.route("/get_category_items")
def get_category_items_access():
    category_items = regist_detail.get_category_items()
    return jsonify({'items': category_items})

# 明細登録
@flask_obj.route("/regist_detail", methods=['POST'])
def regist_detail_access():
    if (request.methods == 'POST'):
        value = request.form['key']
    else:
        print('do not support GET access.')

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
    flask_obj.run(debug=False, host='0.0.0.0', port=flask_port)

# エントリポイント
if __name__ == "__main__":
    main()
