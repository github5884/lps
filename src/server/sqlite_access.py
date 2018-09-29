# coding: utf-8

import sqlite3

dbpath = "db/lps.sqlite"

class DbAccess:

    # コンストラクタ
    def __init__(self, dbpath):
        # DBファイルパスを取得
        self._dbpath = dbpath
    
    # Selectクエリを実行
    def exec_select_query(self, select_query):
        # DB接続
        db_conn = sqlite3.connect(self._dbpath)
        db_conn.row_factory = sqlite3.Row
        cursor = db_conn.cursor()

        # SELECTクエリ実行
        cursor.execute(select_query)
        # 実行結果を取得
        return_dicts = []
        for query_result in cursor.fetchall():
            return_dict = {}
            for record_key in query_result.keys():
                return_dict[record_key] = query_result[record_key]
            
            return_dicts.append(return_dict)
        
        return return_dicts


# メイン関数
def main():
    db_access = DbAccess(dbpath)
    print(db_access.exec_select_query("select * from category"))


# エントリポイント
if __name__ == "__main__":
    main()
