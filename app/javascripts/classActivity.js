// classActivity.js

import { showString } from '../javascripts/webEvents'

const charsList = '0123456789ABCDEF'.split('') // secret 包含的字符列表

// 定义活动类
export default class Activity {
  // 构造函数
  constructor () {
    this.secretMaxLength = 64 // 每个 secret 的最大长度
    this.secretList = [] // 生成的 sercet[] 的集合
    this.secretCount = 0 // 已生成的 secret[] 的数量

    this.singleSecret = [] // 正在生成的 secret
    this.singleSecretLength = 0 // 正在生成的 secret 的长度

    this.bnum = -1   // 目标区块数
    this.deposit = -1   // 押金
    this.lowest = -1   // 目标最低人数
    this.participant = -1   // 实际参与人数
    this.finney = -1   // 赏金
  }
  // 生成单条 secret
  createSingleSecret (numMod) {
    let singleChar = charsList[numMod]
    console.log('numMod: ', numMod)
    console.log('singleChar: ', singleChar)
    this.singleSecret[this.singleSecretLength++] = singleChar
    showString(singleChar)
  }
  // 将生成的 secret 加入 secret[] 集合
  createSecretList () {
    console.log('this.singleSecret', this.singleSecret)
    this.secretList[this.secretCount++] = this.singleSecret.join('')
    this.singleSecret = []
    this.singleSecretLength = 0
    showString('<br />')
  }
  // 创建 secret[] 的入口
  createSecret (X, Y) {
    let numJoint = -1
    if (X !== -1 && Y !== -1) {
      numJoint = X + Y
    }
    console.log('numJoint: ', numJoint)
    let numMod = numJoint % 16
    console.log('this.singleSecretLength: ', this.singleSecretLength)
    if (this.singleSecretLength < this.secretMaxLength) {
      this.createSingleSecret(numMod)
    } else {
      this.createSecretList()
    }
  }
  // 清空本轮生成的 secret[]
  clearSecret () {
    this.secretList = []
    this.secretCount = 0
  }
}
