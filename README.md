# Demo
这是一个单页面应用(只有一个html文件, 多个css文件，一个js文件)

------

### 用到的程序
  * [node.js](https://nodejs.org/dist/latest-v8.x/docs/api/synopsis.html) ( js 的解释器 ) 
  * [yarn](https://yarnpkg.com/zh-Hans/docs/usage) ( 获取和管理第三方 js 库 )
  * [webpack](https://doc.webpack-china.org/) ( 把所有的源代码模块打包成一个js文件 )
  * [cordova](http://cordova.axuer.com/#getstarted) ( 使用 html, css 和 js 进行移动App开发, 多平台共用一套代码 )

------

### 主要用到的库
  * [vue](https://cn.vuejs.org/v2/guide/) ( 前端框架 )
  * [mint-ui](http://mint-ui.github.io/#!/zh-cn) ( 移动端的组件库 )
  * [axios](https://github.com/axios/axios) ( 请求后端的http接口 )

------

### 环境搭建
  1. 下载并安装[node.js](https://nodejs.org/en/download/), [yarn](https://yarnpkg.com/zh-Hans/docs/install#windows-stable), [git](https://git-scm.com/downloads), 然后设置环境变量
  1. 打开命令行，下面所有的命令都要在命令行里执行（开头的美元符号是命令提示符）
  1. 安装cordova
    ```
$ yarn global add cordova
    ```
    
  1. 随便进入一个目录，创建项目
    ```
$ cordova create demo com.example.demo Demo --template mhf-cordova-demo
    ```
    
  1. 在当前目录下会产生一个叫demo的目录，然后安装依赖
    ```
$ cd demo && yarn       // 安装第三方库
$ cordova prepare       // 安装cordova需要的平台和插件
    ```
    
  1. 现在就可以在浏览器里运行程序了
  ```
$ yarn dev-b
  ```
    
  1. 如果需要在安卓上运行，首先需要下载并安装[AndroidStudio](https://developer.android.com/studio/#downloads)
  
  1. 然后运行命令
  ```
$ yarn dev-a
  ```
  
------

### 项目的目录结构
名字前面带加号的是没打开的目录，带减号的是已经打开的目录，什么都不带的是文件
```
-demo   项目名
  +build    webpack的配置文件，一般不需要改动
  +node_modules     项目需要的依赖，里面的内容是自动生成的, 不能改动
  -platforms    // 原生平台的内容, 运行命令　cordova platform add <平台名> 生成
    +android
    +ios
  -plugins      // cordova调用原生功能的插件，运行命令 cordova plugin add <插件名> 自动生成
    +cordova-plugin-camera      相机和选择图片插件
    +cordova-plugin-file        读写文件插件
    +cordova-plugin-geolocation 地理位置插件
    +cordova-plugin-whitelist   白名单插件
   +res     原生应用需要用到的图片等资源
   
   // 上面这些目录可以先不管，一般不需要改
   
   // 这是最重要的目录，包含主要的源代码, 新增或者修改页面时编辑这里面的文件
   // 这个目录下面所有的文件和目录都可以自由命名，不过最好统一一下
   -src
     -components    // 多个页面会用到的组件放在这个目录下面
       site-header.vue      比如说这可以是一个每个页面都包含的头部组件
     -conf  包含配置文件
       routes.js    // 在这个文件里定义网址和页面的对应关系
     
     // 所有的页面都在root目录下面
     -root      // 每一个目录都是一个页面, 每一个页面都是一个组件，默认叫a.vue(也可以叫别的名)
       -file    选择文件的页面
         a.vue      页面组件
         Header.vue     页面的一部分，上面的a.vue组件会引用这个组件
       -main    这是默认页面，打开应用的第一个页面
         a.vue      页面组件
       NotFound.vue     404页面组件
     app.js     // 这是入口文件，在这里配置vue实例, 引入上面的routes.js，第三方组件库(比如mint-ui)，等等...
   
   // 静态资源
　 -www    
　   +css   全局的css文件, 直接在index.html里引用
　   +img   页面里要显示的本地图片放在这里
　   -js    js文件
　     app.js   运行webpack打包生成的文件，直接在index.html里引用
　   index.html   唯一的html文件
　 
　 config.xml       cordova的配置文件, 一般不需要改
　 package.json     // 整个项目的配置文件, 包含整个项目的依赖和一些自定义的脚本
　 
  
```
