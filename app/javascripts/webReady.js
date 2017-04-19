// webReady.js

import Activity from '../javascripts/classActivity';
import {
    load_webpage,
    click_btn_submit_activity,
    canvas_over
} from '../javascripts/webEvents';

let activity = new Activity();

$(document).ready(function () {
    load_webpage();

    $('#btn_submit_activity').click(function () {
        click_btn_submit_activity(activity);
    });

    // 当鼠标指针在指定的元素中移动时
    $('canvas').mousemove(function (e) {
        let [X, Y] = [e.offsetX, e.offsetY]; // 鼠标在 canvas 中的坐标值

        /* 此处添加显示鼠标轨迹的脚本 */
        console.log('activity.secret_count: ', activity.secret_count);
        console.log('activity.participant: ', activity.participant);
        if (activity.secret_count < activity.participant) {
            activity.createSecret(X, Y);
        }
        else {
            canvas_over();
        }
    });
});

export default activity;