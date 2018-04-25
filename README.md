# Demo
## 这是一个单页面应用(只有一个html文件, 多个css文件，一个js文件)

------

### 用到的程序
  * node.js (js的解释器)
  * yarn (获取和管理第三方库)
  * cordova (把html, css, javascript打包成移动端应用)

### 主要用到的库
  * vue (mvvm框架)
  * webpack (把所有的源代码模块打包成一个js文件)
  * mint-ui (移动端的组件库)
  * axios (请求后端的http接口)

### 环境搭建
  1. 下载并安装node.js, yarn, git
  2. 安装cordova(yarn global add cordova)
  3. cordova create demo com.example.demo Demo --template <>
  4. cd demo && yarn
  5. cordova prepare
  6. 下载并安装AndroidStudio

### 目录结构
app
  build
  hooks
  
