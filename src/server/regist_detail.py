# coding: utf-8

from sqlite_access import DbAccess

def get_category_items():
    # DBアクセスインスタンスを生成
    db_access = DbAccess("db/lps.sqlite")

    # カテゴリ項目を取得
    category_items = []
    for result_dict in db_access.exec_select_query("select * from category"):
        category_items.append(result_dict["name"])
    
    return category_items

# メイン関数
def main():
    print("regist_detail.py loaded.")
    

# エントリポイント
if __name__ == "__main__":
    main()
