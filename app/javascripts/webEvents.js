// webEvents.js

// 初始化页面
let load_webpage = function () {
    $('#input_bnum').attr('disabled', false);
    $('#input_deposit').attr('disabled', false);
    $('#input_lowest').attr('disabled', false);
    $('#input_participant').attr('disabled', false);
    $("#main2").hide();
    $('#btn_submit_secrets').hide();
    $("#main3").hide();
}
// 点击提交活动按钮
let click_btn_submit_activity = function (activity) {
    activity.bnum = Number($('#input_bnum').val());
    activity.deposit = Number($('#input_deposit').val());
    activity.lowest = Number($('#input_lowest').val());
    activity.participant = Number($('#input_participant').val());
    activity.finney = Number($('#input_finney').val());

    console.log('current_bnum: ', activity.bnum);
    console.log('current_deposit: ', activity.deposit);
    console.log('current_lowest: ', activity.lowest);
    console.log('current_participant: ', activity.participant);
    console.log('current_finney: ', activity.participant);

    if (activity.bnum > activity.participant // 目标区块数应大于最低参与人数
        &&
        activity.participant >= activity.lowest // 实际参与人数应大于最低参与人数
        &&
        activity.lowest > 0 // 实际参与人数应大于0
        &&
        activity.deposit > 0 // 押金应大于0
    ) {
        //alert('发起活动成功！');
        $('#input_bnum').attr('disabled', true);
        $('#input_deposit').attr('disabled', true);
        $('#input_lowest').attr('disabled', true);
        $('#input_participant').attr('disabled', true);
        $('#input_finney').attr('disabled', true);
        $('#btn_submit_activity').hide();
        $('#main2').show();
    } else
        alert('输入值不合法！');
}
// secret 生成完毕
let canvas_over = function () {
    $('#canvas').hide();
    $('#btn_submit_secrets').show();
}
// 显示字符
let showString = function (str) {
    if ($('#show_numbers').children('br').length >= 33)
        $('#show_numbers').empty();
    $('#show_numbers').append(str);
}
// 点击提交用户随机数
let click_btn_submit_secrets = function (random) {
    let random_16 = random.slice(2, 66);
    $('#btn_submit_secrets').hide();
    $('#show_results').append(convert_16_to_2(random_16));
    $('#main3').show();
    console.log('生成的随机数为: ', random);
}
// 十六进制字符串转二进制字符串
let convert_16_to_2 = function (random_16) {
    let random_2 = new String();
    for (let i = 0; i < 64; i++) {
        let char_16 = random_16[i];
        let char_2 = "0000" + parseInt(char_16, 16).toString(2);
        char_2 = char_2.slice(char_2.length - 4, char_2.length) + " ";
        random_2 += char_2;
    }
    return random_2;
}
// 二进制数前补0
export {
    load_webpage,
    click_btn_submit_activity,
    canvas_over,
    canvas_over_2,
    showString,
    click_btn_submit_secrets
};