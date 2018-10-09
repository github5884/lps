# coding: utf-8

from sqlite_access import DbAccess

# DBアクセスインスタンスを取得
def get_db_instance():
    return DbAccess("db/lps.sqlite")

# カテゴリ項目取得
def get_category_items():
    # DBアクセスインスタンスを生成
    db_access = get_db_instance()

    # カテゴリ項目を取得
    category_items = []
    for result_dict in db_access.exec_select_query("select * from category"):
        category_items.append(result_dict["name"])
    
    return category_items

# 明細を挿入
def insert_detail(detail_json):
    # DBアクセスインスタンスを生成
    db_access = get_db_instance()

    insert_query = "insert into detail(date, category_name, location, cost, purchase, last_update) values("
    insert_query = insert_query + dq(detail_json["dateText"])
    insert_query = insert_query + "," + dq(detail_json["category"])
    insert_query = insert_query + "," + dq(detail_json["location"])
    insert_query = insert_query + "," + str(detail_json["cost"])
    insert_query = insert_query + "," + str(detail_json["purchase"])
    insert_query = insert_query + "," + dq("0000/00/00 00:00:00") + ")"

    print(insert_query)

    # 明細を挿入
    db_access.exec_update_query(insert_query)



# ダブルクオーテーション付与
def dq(org):
    return "\"" + org + "\""

# メイン関数
def main():
    print("regist_detail.py loaded.")
    

# エントリポイント
if __name__ == "__main__":
    main()
