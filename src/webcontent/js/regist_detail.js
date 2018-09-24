/**
 * regist_detail.js
 */

// 曜日表記
var DAY_EXP_ARRAY = ['(SUN)', '(MON)', '(TUE)', '(WED)', '(THU)', '(FRI)', '(SAT)'];
// 曜日配色
var DAY_COLOR_ARRAY = ['#ff0000', '#000000', '#000000', '#000000', '#000000', '#000000', '#0000ff'];


// 日付を初期化
var currentDate = new Date();

 /**
  * ページロード処理
  */
function pageOnLoad() {
    // 日付を初期化し表示
    currentDate = new Date();
    showDate(currentDate);

    // カテゴリのドロップダウン項目をセット
    setDropdownItems('dropdownCategory', ['食費', '外食', '交通費']);

    // 場所のドロップダウン項目をセット
    setDropdownItems('dropdownLocation', ['スギ薬局', '近商', 'ライフ', 'イオン']);
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
 * @param targetId      対象ID
 * @param items         項目リスト(array)
 */
function setDropdownItems(targetId, items) {
    console.log(items);
    // 一旦、項目をすべて削除
    $('#' + targetId).empty();

    // 各項目に対して処理
    for (var i = 0; i < items.length; i++) {
        $('#' + targetId).append($('<a>').attr({class: 'dropdown-item', href: '#'}).text(items[i]));
    }
}

 /**
  * サンプルボタン押下時処理
  */
 function btnSampleClicked() {
    alert("button clicked.");
 }