// classActivity.js

import { showString } from '../javascripts/webEvents';

const chars_list = '0123456789ABCDEF'.split(''); // secret 包含的字符列表

// 定义活动类
export default class Activity {
    // 构造函数
    constructor() {
        this.secret_max_length = 64; // 每个 secret 的最大长度
        this.secret_list = new Array(); // 生成的 sercet[] 的集合
        this.secret_count = 0; // 已生成的 secret[] 的数量

        this.single_secret = new Array(); // 正在生成的 secret
        this.single_secret_length = 0; // 正在生成的 secret 的长度

        this.bnum = -1; // 目标区块数
        this.deposit = -1; // 押金
        this.lowest = -1; // 目标最低人数
        this.participant = -1; // 实际参与人数
        this.finney = -1; // 赏金
    }
    // 生成单条 secret
    createSingleSecret(num_mod) {
        let single_char = chars_list[num_mod];
        console.log('num_mod: ', num_mod);
        console.log('single_char: ', single_char);
        this.single_secret[this.single_secret_length++] = single_char;
        showString(single_char);
    }
    // 将生成的 secret 加入 secret[] 集合
    createSecretList() {
        console.log('this.single_secret', this.single_secret);
        this.secret_list[this.secret_count++] = this.single_secret.join('');
        this.single_secret = new Array();
        this.single_secret_length = 0;
        showString('<br />');
    }
    // 创建 secret[] 的入口
    createSecret(X, Y) {
        let num_joint = -1;
        if (X !== -1 && Y !== -1)
            num_joint = X + Y;
        console.log("num_joint: ", num_joint);
        let num_mod = num_joint % 16;
        console.log('this.single_secret_length: ', this.single_secret_length);
        if (this.single_secret_length < this.secret_max_length)
            this.createSingleSecret(num_mod);
        else
            this.createSecretList();
    }
}
