// webEvents.js
/* global alert */

import $ from 'jquery'
// 初始化页面
let loadWebpage = function e () {
  $('#input_bnum').attr('disabled', false)
  $('#input_deposit').attr('disabled', false)
  $('#input_lowest').attr('disabled', false)
  $('#input_participant').attr('disabled', false)
  $('#main2').hide()
  $('#btn_submit_secrets').hide()
  $('#main3').hide()
}
// 点击提交活动按钮
let clickBtnSubmitActivity = function (activity) {
  activity.bnum = Number($('#input_bnum').val())
  activity.deposit = Number($('#input_deposit').val())
  activity.lowest = Number($('#input_lowest').val())
  activity.participant = Number($('#input_participant').val())
  activity.finney = Number($('#input_finney').val())

  console.log('currentBnum: ', activity.bnum)
  console.log('currentDeposit: ', activity.deposit)
  console.log('currentLowest: ', activity.lowest)
  console.log('currentParticipant: ', activity.participant)
  console.log('currentFinney: ', activity.participant)

  if (activity.bnum > activity.participant && // 目标区块数应大于最低参与人数
    activity.participant >= activity.lowest && // 实际参与人数应大于最低参与人数
    activity.lowest > 0 &&// 实际参与人数应大于0
    activity.deposit > 0 // 押金应大于0
  ) {
    // alert('发起活动成功！')
    $('#input_bnum').attr('disabled', true)
    $('#input_deposit').attr('disabled', true)
    $('#input_lowest').attr('disabled', true)
    $('#input_participant').attr('disabled', true)
    $('#input_finney').attr('disabled', true)
    $('#btn_submit_activity').hide()
    $('#main2').show()
  } else {
    alert('输入值不合法！')
  }
}
// secret 生成完毕
let canvasOver = function () {
  $('#canvas').hide()
  $('#btn_submit_secrets').show()
}
// 显示字符
let showString = function (str) {
  if ($('#show_numbers').children('br').length >= 33) {
    $('#show_numbers').empty()
  }
  $('#show_numbers').append(str)
}
// 点击提交用户随机数
let clickBtnSubmitSecrets = function (random) {
  let random16 = random.slice(2, 66)
  $('#btn_submit_secrets').hide()
  $('#show_results').append(convert16to2(random16))
  $('#main3').show()
  console.log('生成的随机数为: ', random)
}
// 十六进制字符串转二进制字符串
let convert16to2 = function (random16) {
  let random2 = []
  for (let i = 0; i < 64; i++) {
    let char16 = random16[i]
    let char2 = '0000' + parseInt(char16, 16).toString(2)
    char2 = char2.slice(char2.length - 4, char2.length) + ' '
    random2 += char2
  }
  return random2
}
// 二进制数前补0
export {
  loadWebpage,
  clickBtnSubmitActivity,
  canvasOver,
  showString,
  clickBtnSubmitSecrets
}
