$(document).ready(function () {
    // 随机数 secret 生成器
    var max_length = 64; // 随机数 secret 的总长度
    var current_length = 0; // 当前生成的 secret 的长度

    var max_count = -1; // 需要生成的 secret 的个数
    var current_count = 0; // 当前生成的 secret 的个数

    var chars = "0123456789ABCDEF"; // 可接受的字符列表
    var chars_list = chars.split(""); // 将字符串拆分成字符数组

    var current_secret = new Array(); // 当前生成的 secret 的值
    var secret_list = new Array(); // 全部生成的 sercet[] 的值

    var current_bnum = -1; // 目标区块数
    var current_deposit = -1; // 押金
    var current_lowest = -1; // 目标最低人数
    var current_participant = -1; // 实际参与人数
    var secret_list = new Array(); // 全部生成的 sercet[] 的值

    // 点击提交活动按钮
    $("#input_create").click(function () {
        current_bnum = Number($('#input_bnum').val());
        console.log('current_bnum: ', current_bnum);
        current_deposit = Number($('#input_deposit').val());
        console.log('current_deposit: ', current_deposit);
        current_lowest = Number($('#input_lowest').val());
        console.log('current_lowest: ', current_lowest);
        current_participant = Number($('#input_participant').val());
        console.log('current_participant: ', current_participant);
        if (current_bnum > current_participant // 目标区块数应大于最低参与人数
            && current_participant > current_lowest // 实际参与人数应大于最低参与人数
            && current_lowest > 0 // 实际参与人数应大于0
            && current_deposit > 0 // 押金应大于0
        ) {
            max_count = current_participant;
            alert('发起活动成功！');
            $('#input_bnum').attr('disabled', true);
            $('#input_deposit').attr('disabled', true);
            $('#input_lowest').attr('disabled', true);
            $('#input_participant').attr('disabled', true);
            $('#input_create').hide();
            $('#canvas').show();
        }
        else
            alert('输入值不合法！');
    });
    // 返回值给 app
    $.get_bnum = function () {
        return current_bnum;
    }
    $.get_deposit = function () {
        return current_deposit;
    }
    $.get_lowest = function () {
        return current_lowest;
    }
    $.get_participant = function () {
        return current_participant;
    }
    $.get_secret_list = function () {
        return secret_list;
    }

    // 当鼠标指针在指定的元素中移动时
    $("#canvas").mousemove(function (e) {
        var X = -1; // X 坐标
        var Y = -1; // Y 坐标

        X = e.offsetX;  // 鼠标在元素中的 X 坐标值
        Y = e.offsetY;  // 鼠标在元素中的 Y 坐标值

        /* 此处添加显示鼠标轨迹的脚本 */
        if (current_count < max_count) {
            createSingleSecret(X, Y);
        }
        else {
            $("#canvas").hide();
            //createSecretList();
        }
    });

    function createSingleSecret(X, Y) {
        var num_mix = -1;
        if (X !== -1 && Y !== -1)
            num_mix = X + Y;
        /*else
            alert("Invalid X or Y!\n");*/
        var num_mod = num_mix % 16;
        if (current_length < max_length && num_mod !== -1)
            current_secret[current_length++] = chars_list[num_mod];
        /*else
            alert("Invalid num_mod!\n");*/
        if (current_length >= 63) {
            current_length = 0;
            secret_list[current_count] = current_secret.join('');
            $("#show_numbers").append(current_count + ': ' + secret_list[current_count] + '<br />');
            current_count++;
        }
    }



    /*$('#input_secret').click(function () {
        window.App.start();
    });*/
});