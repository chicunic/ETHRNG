# ETHRNG

## 简介

基于以太坊区块链的随机数生成器

A random number generator based on the ethereum blockchain

## 要求

- Linux / macOS / Windows

- Node.js

## 安装

### 1. 安装 truffle

	$ npm install -g truffle

### 2. 进入 ETHRNG 目录

	$ cd ETHRNG

### 3. 安装 node 依赖

	$ npm install

## 运行

### 1. 打开终端，进入 truffle 开发环境

	$ truffle develop

### 2. 编译合约

	truffle(devolop)> compile

### 3. 部署合约

	truffle(develop)> migrate

### 4. 运行测试脚本

	truffle(develop)> test

### 5. 测试 Web 站点

#### (1) 新建终端，进入 ETHRNG 目录

	$ cd ETHRNG

#### (2) 启动 Web 服务

	$ npm run dev

#### (3) 打开浏览器，访问 http://localhost:8080

## 参考

### 1. Node.js

https://nodejs.org

### 2. Truffle

http://truffleframework.com

### 3. webpack

https://webpack.js.org

### 4. Solidity

https://solidity.readthedocs.io
