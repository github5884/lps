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
    // 入力項目のテーブルサイズを固定
    

    // 日付を初期化し表示
    currentDate = new Date();
    showDate(currentDate);

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