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
        && activity.participant >= activity.lowest // 实际参与人数应大于最低参与人数
        && activity.lowest > 0 // 实际参与人数应大于0
        && activity.deposit > 0  // 押金应大于0
    ) {
        //alert('发起活动成功！');
        $('#input_bnum').attr('disabled', true);
        $('#input_deposit').attr('disabled', true);
        $('#input_lowest').attr('disabled', true);
        $('#input_participant').attr('disabled', true);
        $('#input_finney').attr('disabled', true);
        $('#btn_submit_activity').hide();
        $('#main2').show();
    }
    else
        alert('输入值不合法！');
}
// secret 生成完毕
let canvas_over = function () {
    $('canvas').hide();
    $('#btn_submit_secrets').show();
}
// 显示字符
let showString = function (str) {
    $('#show_numbers').append(str);
}
// 点击提交用户随机数
let click_btn_submit_secrets = function (random) {
    $('#btn_submit_secrets').hide();
    $('#show_results').append(random);
    $('#main3').show();
    console.log('生成的随机数为: ', random);
}

export {
    load_webpage,
    click_btn_submit_activity,
    canvas_over,
    showString,
    click_btn_submit_secrets
};