/**
 * regist_detail.js
 */

// 曜日表記
var DAY_EXP_ARRAY = ['(SUN)', '(MON)', '(TUE)', '(WED)', '(THU)', '(FRI)', '(SAT)'];
// 曜日配色
var DAY_COLOR_ARRAY = ['#ff0000', '#000000', '#000000', '#000000', '#000000', '#000000', '#0000ff'];

// ドロップダウンのベースID(項目のインデックスと連動)
var DROPDOWN_BASE_IDS = ['Category', 'Location'];
// ドロップダウン項目(ベースIDのインデックスと連動)
var dropdownItems = [ 
    ['食費', '外食', '交通費'],
    ['スギ薬局', '近商', 'ライフ', 'イオン']
];

// 日付を初期化
var currentDate = new Date();

 /**
  * ページロード処理
  */
function pageOnLoad() {
    // 日付を初期化し表示
    currentDate = new Date();
    showDate(currentDate);

    // カテゴリ項目を取得
    getCategoryItems()

    // 各ドロップダウン項目をセット
    for (var i = 0; i < DROPDOWN_BASE_IDS.length; i++) {
        setDropdownItems(i);
    }
}

/**
 * 日付を表示
 * @param targetDate    セット対象日付
 */
function showDate(targetDate) {
    // 年月日の表記をセット
    var dateText = targetDate.getFullYear() + "/" + (targetDate.getMonth() + 1) + "/" + targetDate.getDate() + " " + DAY_EXP_ARRAY[targetDate.getDay()];
    $('#lblDate').text(dateText);
    // 文字色を設定
    $('#lblDate').attr('style', 'color:' + DAY_COLOR_ARRAY[targetDate.getDay()] + ";");
}

/**
 * 日付を変更
 * @param changeNum     変更日数
 */
function changeDate(changeNum) {
    var currentDay = currentDate.getDate();
    currentDate.setDate(currentDay + changeNum);
    // 表示
    showDate(currentDate);
}

/**
 * カテゴリ項目を取得
 */
function getCategoryItems() {
    $.ajax({
        url: 'http://127.0.0.1:8888/get_category_items',
        type: 'GET',
        dataType: 'json',
        async: false,
        crossDomain: true,
        cache: false
    })
    .done( (data) => {
        dropdownItems[0] = data.items;
    })
    .fail( (data) => {
        console.log("ajax failed.");
        console.log(data);
    })
}

/**
 * 明細を挿入
 */
function insertDetail() {
    var detailJson = {};

    // 年月日の表記を取得
    detailJson.dateText = currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate();
    // カテゴリを取得
    detailJson.category = $('#txtCategory').val();
    // 場所を取得
    detailJson.location = $('#txtLocation').val();
    // 金額を取得
    detailJson.cost = parseInt($('#txtPrice').val(), 0);
    // 財布を取得(仮)
    detailJson.purchase = 0;
    
    console.log(detailJson);

    $.ajax({
        url: 'http://127.0.0.1:8888/insert_detail',
        type: 'post',
        data: JSON.stringify(detailJson),
        contentType: 'application/JSON',
        dataType: 'JSON',
        scriptCharset: 'utf-8',
        async: false,
        crossDomain: true,
        cache: false
    })
    .done( (data) => {
        console.log(data);
    })
    .fail( (data) => {
        console.log("ajax failed.");
        console.log(data);
    })
}

/**
 * ドロップダウン項目をセット
 * @param targetIndex   対象インデックス
 */
function setDropdownItems(targetIndex) {
    // 一旦、項目をすべて削除
    $('#dropdown' + DROPDOWN_BASE_IDS[targetIndex]).empty();

    // 各項目に対して処理
    for (var i = 0; i < dropdownItems[targetIndex].length; i++) {
        $('#dropdown' + DROPDOWN_BASE_IDS[targetIndex]).append($('<a>').attr({class: 'dropdown-item', href: '#', onclick: 'dropdownItemClicked(' + targetIndex + ',' + i + ')'}).text(dropdownItems[targetIndex][i]));
    }
}

/**
 * ドロップダウン項目選択時処理
 * @param targetIndex       対象インデックス
 * @param selectedItemIndex   選択項目インデックス
 */
function dropdownItemClicked(targetIndex, selectedItemIndex) {
    // 入力欄に反映
    $('#txt' + DROPDOWN_BASE_IDS[targetIndex]).val(dropdownItems[targetIndex][selectedItemIndex]);
}

 /**
  * サンプルボタン押下時処理
  */
 function btnSampleClicked() {
    alert("button clicked.");
 }