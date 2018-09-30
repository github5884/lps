# coding: utf-8

import sqlite3

# DBアクセスクラス
class DbAccess:

    # コンストラクタ
    def __init__(self, dbpath):
        # DBファイルパスを取得
        self._dbpath = dbpath
    
    # SELECTクエリを実行
    # @param select_query   SELECTクエリ
    # @return               クエリ実行結果＠dict形式
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
        
        # DBから切断
        db_conn.close()

        return return_dicts

    # UPDATEクエリを実行
    # @param update_query   UPDATEクエリ
    def exec_update_query(self, update_query):
        # DB接続
        db_conn = sqlite3.connect(self._dbpath)
        cursor = db_conn.cursor()

        try:
            # UPDATEクエリ実行
            cursor.execute(update_query)
        except sqlite3.Error as e:
            print("sqlite3 access error : " + e.args[0])
        
        # コミット
        db_conn.commit()

        # DBから切断
        db_conn.close()


# メイン関数
def main():
    dbpath = "db/lps.sqlite"

    db_access = DbAccess(dbpath)
    print(db_access.exec_select_query("select * from category"))

    #db_access.exec_update_query("insert into category(name) values('雑費')")
    #db_access.exec_update_query("update category set name='その他' where id=5")


# エントリポイント
if __name__ == "__main__":
    main()
