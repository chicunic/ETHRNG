# ETHRNG

基于以太坊区块链的随机数生成器

Random Number Generator based on the Ethereum blockchain

开发环境安装步骤：

MacOS 10.12 / Ubuntu 16.04 (x64)

一、安装 Nodejs：

1. 下载 Nodejs

		https://nodejs.org


2. 将下载后的文件放入某目录下，如 ~/tools


3. 解压

		$ tar -C ~/tools -xzf node-v6.10.0-linux-x64.tar.gz


4. 在系统目录下创建到node及npm可执行文件的软链接

		$ sudo ln -s ~/tools/node-v6.10.0-linux-x64/bin/node /usr/local/bin/node

		$ sudo ln -s ~/tools/node-v6.10.0-linux-x64/bin/npm /usr/local/bin/npm


5. 执行 node -v 以及 npm -v ，如果输出 nodejs 和 npm 的版本号，说明安装成功


二、配置 npm 源（可选）

	$ npm config set registry http://registry.npm.taobao.org


三、安装 git

	$ sudo apt-get install git


四、安装 truffle

	$ sudo npm install -g truffle

	$ sudo ln -s ~/tools/node-v6.10.0-linux-x64/bin/truffle /usr/local/bin/truffle

	安装完成后输入truffle，会显示truffle版本和用法，说明安装成功


五、安装 testrpc

	$ npm install -g ethereumjs-testrpc


六、开启testrpc

	$ testrpc -g 10 -l 1e+20 -a 10

	其中，-g gasprice 设置每次gas价格，-l gaslimit 设置每次gas的最大限制，-a accounts设置账户数


七、将合约部署到私有链上

1. 编译合约

		$ truffle compile

2. 连接到私链网络

		$ truffle migrate

3. 运行 web 服务

		$ npm run dev


【参考资料】

1. https://github.com/ethereum/go-ethereum
2. https://nodejs.org
3. https://solidity.readthedocs.io
4. https://github.com/ethereumjs/testrpc
