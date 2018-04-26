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
  1. 下载并安装[node.js](https://nodejs.org/en/download/), [yarn](https://yarnpkg.com/zh-Hans/docs/install#windows-stable), [git](https://git-scm.com/downloads)
  2. 安装cordova
    ```
    $ yarn global add cordova
    ```
    
  3. 创建项目 
    ```
    $ cordova create demo com.example.demo Demo --template <>
    ```
    
  4. 安装依赖
    ```
    $ cd demo && yarn && cordova prepare
    ```
    
  5. 下载并安装[AndroidStudio](https://developer.android.com/studio/#downloads)

------

### 目录结构
```
-demo   项目名
  +build    webpack的配置文件，一般不需要改动
  +node_modules     项目需要的依赖，里面的内容是自动生成的
  -platforms    // 原生平台的内容
    +android
    +ios
  -plugins      // cordova调用原生功能的插件
    +cordova-plugin-camera      相机和选择图片
    +cordova-plugin-file        读写文件
    +cordova-plugin-geolocation 地理位置
    +cordova-plugin-whitelist   白名单
   +res     原生应用需要用到的图片等资源
   
   // 这是最重要的目录
   -src     // 包含主要的源代码, 新增或者修改页面时编辑这里面的文件
     -components    多个页面会用到的组件
       site-header.vue
     -conf  包含配置文件
       routes.js    路由
     -root      里面所有的目录都是一个页面, 每一个页面都是一个组件，默认叫a.vue(也可以叫别的名)
       -file    选择文件的页面
         a.vue      页面组件
         Header.vue     页面的一部分，上面的a.vue组件会引用这个组件
       -main    默认页面
         a.vue      页面组件
       NotFound.vue     404页面组件
     app.js     配置vue实例
   
　 -www    // 静态资源
　   +css   css文件
　   +img   图片
　   -js    js文件
　     app.js   运行webpack打包生成的文件
　   index.html   唯一的html文件
　 
　 config.xml       cordova的配置文件
　 package.json     整个项目的配置文件
　 
  
```
