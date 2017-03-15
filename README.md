# ETHRNG

基于以太坊区块链的随机数生成器
Random number generator based on the ethereum

安装步骤

MacOS 10.12

1. 下载并安装 Nodejs
https://nodejs.org

2. 下载并安装 truffle

Ubuntu 16.04 (x64)

一、安装 Nodejs

1. 下载 Nodejs
https://nodejs.org

2. 将下载后的文件放入某目录下，如 ~/tools

3. 解压
$ tar -C ~/tools -xzf node-v6.10.0-linux-x64.tar.gz

4. 在系统目录下创建到node及npm可执行文件的软链接
$ sudo ln -s ~/tools/node-v6.10.0-linux-x64/bin/node /usr/local/bin/node
$ sudo ln -s ~/tools/node-v6.10.0-linux-x64/bin/npm /usr/local/bin/npm

5. 执行 node -v 以及 npm -v ，如果输出 nodejs 和npm 的版本号，说明安装成功

二、配置 npm 源（可选）
$ npm config set registry http://registry.npm.taobao.org

三、安装 git
$ sudo apt-get install git

四、安装 truffle
$ sudo npm install -g truffle
$ sudo ln -s ~/tools/node-v6.10.0-linux-x64/bin/truffle /usr/local/bin/truffle
安装完成后输入truffle，会显示truffle版本和用法，说明安装成功

Build on 12 March, 2017
