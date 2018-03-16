// webReady.js
/* global webVersion App */

import $ from 'jquery'
import Activity from '../javascripts/classActivity'
import {
  loadWebpage,
  clickBtnSubmitActivity,
  canvasOver
} from '../javascripts/webEvents'

let activity = new Activity()

$(document).ready(function () {
  loadWebpage()

  $('#btn_submit_activity').click(function () {
    clickBtnSubmitActivity(activity)
  })

  // 当鼠标指针在指定的元素中移动时
  $('canvas').mousemove(function (e) {
    let [X, Y] = [e.offsetX, e.offsetY] // 鼠标在 canvas 中的坐标值

    /* 此处添加显示鼠标轨迹的脚本 */
    console.log('activity.secretCount: ', activity.secretCount)
    console.log('activity.participant: ', activity.participant)
    if (activity.secretCount < activity.participant) {
      activity.createSecret(X, Y)
    } else {
      if (webVersion === 1) {
        canvasOver()
      } else if (webVersion === 2) {
        App.runEthrng()
        activity.clearSecret()
      }
    }
  })
})

export default activity
