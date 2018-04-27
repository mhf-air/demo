# Demo
这是一个单页面应用(只有一个html文件, 多个css文件，一个js文件)

------

## 用到的程序
  * [node.js](https://nodejs.org/dist/latest-v9.x/docs/api/synopsis.html) ( js 的解释器 ) 
  * [yarn](https://yarnpkg.com/zh-Hans/docs/usage) ( 获取和管理第三方 js 库 )
  * [webpack](https://doc.webpack-china.org/) ( 把所有的源代码模块打包成一个js文件 )
  * [cordova](http://cordova.axuer.com/#getstarted) ( 使用 html, css 和 js 进行移动App开发, 多平台共用一套代码 )

------

## 主要用到的库
  * [vue](https://cn.vuejs.org/v2/guide/) ( 前端框架 )
  * [mint-ui](http://mint-ui.github.io/#!/zh-cn) ( 移动端的组件库 )
  * [axios](https://github.com/axios/axios) ( 请求后端的http接口 )

------

## 环境搭建
  1. 下载并安装[node.js](https://nodejs.org/en/download/), [yarn](https://yarnpkg.com/zh-Hans/docs/install#windows-stable), [git](https://git-scm.com/downloads), 然后设置环境变量
  1. 打开命令行，下面所有的命令都要在命令行里执行（开头的美元符号是命令提示符）
  1. 安装cordova

        $ yarn global add cordova
    
  1. 随便进入一个目录，创建项目

        $ cordova create demo com.example.demo Demo --template mhf-cordova-demo
    
  1. 在当前目录下会产生一个叫demo的目录，然后安装依赖

        $ cd demo && yarn       // 安装第三方库
$ cordova prepare       // 安装cordova需要的平台和插件
    
  1. 现在就可以在浏览器里运行程序了

        $ yarn dev-b
    
  1. 如果需要在安卓上运行，首先需要下载并安装[AndroidStudio](https://developer.android.com/studio/#downloads)
  
  1. 然后运行命令

        $ yarn dev-a
  
  1. 安装IDE, 推荐使用[Visual Studio Code](https://code.visualstudio.com/)或者[Sublime Text](https://www.sublimetext.com/), 也可以用vim
  
------

## 项目的目录结构
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

[项目地址](https://github.com/mhf-air/demo.git)

    $ git clone https://github.com/mhf-air/demo.git
$ yarn
    $ cordova prepare
$ yarn dev-b

----------

## 教程
点击下面的链接可以看官网的教程
### [node.js教程](https://nodejs.org/dist/latest-v8.x/docs/api/synopsis.html)
现在运行js有两种方式，一种是在浏览器里面，另一种是直接在服务器上，在服务器上运行就需要node这个js的解释器。

**简单的情况**
比如现在有一个hello目录, 里面只有一个a.js文件
```
-hello
  a.js
```

a.js里面是这样
```
funtion sum(a, b) {
  return a + b
}

let result = sum(1, 2)
console.log(result)
```
在hello目录里运行命令

    $ node a.js

终端就会输出

    3


**稍微复杂的情况**
如果程序变得复杂，就需要把函数放到不同的文件里。比如把上面的sum函数放到b.js里，现在hello目录是这样
```
-hello
  a.js
  b.js
```
b.js里面是这样
```
funtion sum(a, b) {
  return a + b
}

// 这里左边的module.exports是node内置的对象，目的是把右边的值暴露给其它引用这个文件的模块
module.exports = sum
```
a.js里面是这样
```
// 引用其它模块，注意这里用了相对路径，这是个本地模块。这里的sum就是b.js里暴露的sum函数
const sum = require("./b")

let result = sum(1, 2)
console.log(result)
```
在hello目录里运行命令

    $ node a.js
    
终端还是会输出

    3

**更复杂的情况**
如果想引用第三方的模块，比如说有人写了一个叫math-sum的模块，并且推送到了npm平台上。
你就可以这样写a.js
```
// 引用第三方模块
const sum = require("math-sum")

let result = sum(1, 2)
console.log(result)
```
现在执行命令会报错
```
Error: Cannot find module 'math-sum'
```
因为你没有把math-sum这个包下载到本地，这时就需要一个包管理器来下载第三方模块。
包管理器主要有两个，功能几乎是一样的。

 - npm
 - yarn (可能比npm快一点)

运行命令

    yarn init
来初始化模块，它会要求你输入模块名称，版本等内容，一直按回车就行，然后目录下面就会多出一个package.json文件。
package.json里面是这样
```
{
    "name": "hello",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT"
}
```
然后运行命令

    yarn add math-sum
现在hello目录变成这样
```
-hello
  -node_modules     // 下载的第三方包都在这里面，可以不用管
    +math-sum
  a.js
  package.json
  yarn.lock     // 这个是yarn存储的依赖信息，可以不用管
```
package.json是这样
```
{
    "name": "hello",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT"，
    "dependencies": {   // 所有本项目依赖的第三方包都在dependencies下面
        "math-sum": "^1.0.0"
    }
}
```
现在再执行命令

    node a.js
就会输出3了

如果不想用math-sum这个包，就运行命令

    yarn remove math-sum
去掉依赖

另外yarn还有一个常用的命令，就是添加全局依赖，就是在任何项目里不添加本地依赖也能用的。比如安装cordova

    yarn global add cordova
 
 你还可以在package.json里添加自定义脚本，比如
```
{
    "name": "hello",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT"，
    "dependencies": {
        "math-sum": "^1.0.0"
    },
    "scripts": {    // 这里是自定义的脚本, 里面的内容可以随便写
        "dev": "node a.js"
    }
}
```
现在运行

    yarn run dev
就相当于运行

    node a.js
    
**webpack**

    webpack是一个js文件打包工具
如果要在浏览器里使用require()这些函数，就需要用webpack把所有js文件打包成一个js文件，然后在html文件里引用。
webpack的配置文件一般不需要改动。　

----------

### [cordova教程](http://cordova.axuer.com/#getstarted)
cordova是一个开源的移动开发框架，它可以让你使用标准的web技术－－html5, css3和javascript来进行跨平台的开发，主要用它来把写好的代码打包成移动端的安装包。

**安装cordova**

    yarn global add cordova
然后创建一个项目，假如项目叫hello

    cordova create hello com.example.hello Hello
上面的hello是目录名，com.example.hello是应用的ID, 后面的Hello是类名
这样就会生成一个默认的目录
```
-hello
  +hooks
  +platforms
  +plugins
  +res
  -www
    +css
    +img
    +js
    index.html
　config.xml    // cordova的配置文件，一般不需要改动
```
当然如果别人已经做好了一个好的项目模板，可以直接用

    cordova create hello com.example.hello Hello --template <模板名>
这样生成的hello目录里面就是模板里的内容

**添加平台**
如果要生成android的安装包, 要先添加android平台

    cordova platform add android
platforms目录下就新增了一个android目录
```
+hello
  -platforms
    +android
```

**添加插件**
如果要调用原生的功能，比如获取地理位置，要先添加地理位置插件

    cordova plugin add cordova-plugin-geolocation
plugins目录下就新增了一个cordova-plugin-geolocation目录
```
+hello
  -plugins
    +cordova-plugin-geolocation
```
**生成android安装包**
需要android的sdk, 去android官网下载并安装[AndroidStudio](https://developer.android.com/studio/#downloads)
然后运行

    cordova run android
就会在android模拟器里打开应用

----------

### [axios教程](https://github.com/axios/axios)
axios是一个http客户端库，可以运行在浏览器和node.js中，主要用来发起http请求，从后端获取数据

**安装**
在hello目录下运行

    yarn add axios

**功能**

发送GET请求
```
// 请求ID为12345的用户详情
axios.get("/user?ID=12345")
  .then(function (response) {   // 成功之后执行的函数
    console.log(response);
  })
  .catch(function (error) {     // 失败之后执行的函数
    console.log(error);
  })
```
发送POST请求
```
// 新增用户
axios.post("/user", {
    firstName: "Fred",
    lastName: "Flintstone",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

----------

### [pug教程](https://pugjs.org/api/getting-started.html)
pug是一种html简化之后的格式, 主要是为了少写一些代码

**安装**

    yarn add --dev pug
    
**格式**
这段pug代码
```
div.box.box-large(name="abc")
  img(src="/a.png" alt="a")
  p 你好
```

会编译成下面的html
```
<div class="box box-large" name="abc">
  <img src="a.png" alt="a" />
  <p>你好</p>
</div>
```

----------

### [stylus教程](http://stylus-lang.com/)
stylus是一种css预处理器，主要也是为了少些一些代码

**安装**

    yarn add --dev stylus

**格式**
这段stylus代码
```
.box
  background: cyan
  &:hover           // &符号指的是离它最近的父级，在这里指的就是.box
    background: red
  &-large
    background: blue
```
会编译成下面这段css
```
.box {
  background: cyan;
}

.box:hover {
  background: red;
}

.box-large {
  background: blue;
}
```

----------

### [vue教程](https://cn.vuejs.org/v2/guide/)
**Vue是什么**
Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。

**声明式渲染**
Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统：

html(引用了vue.js和a.js)
```
<div id="app">
  {{ message }}
</div>
```
a.js
```
var app = new Vue({
  el: "#app",   // 跟html里id为app的元素绑定
  data: {
    message: "Hello Vue!",
  },
})
```
页面上会显示

    Hello Vue!
现在数据和DOM已经建立了关联，所有东西都是响应式的，就是说如果你在a.jsw文件的某个函数里有下面一句
```
app.message = "你好"
```
运行这个函数之后，页面里原来显示的“Hello Vue!”就变成了“你好”

除了文本插值，我们还可以像这样来绑定元素属性：
html
```
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```
js
```
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```
这里我们遇到了一点新东西。你看到的 v-bind 特性被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊特性。在这里，该指令的意思是：“将这个元素节点的 title 特性和 Vue 实例的 message 属性保持一致”。

**条件与循环**

控制切换一个元素是否显示也相当简单：
html
```
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```
js
```
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```
如果把app3.seen的值变成false, id为app-3的div就会隐藏；再把app3.seen的值变成true，这个div就会重新显示。
这个例子演示了我们不仅可以把数据绑定到 DOM 文本或特性，还可以绑定到 DOM 结构。

还有其它很多指令，每个都有特殊的功能。例如，v-for 指令可以绑定数组的数据来渲染一个项目列表：
html
```
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```
js
```
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
```
显示的效果就是

    1. 学习JavaScript
    2. 学习Vue
    3. 整个牛项目

如果在某个函数里有app4.todos.push({ text: '新项目' })，运行这个函数之后你会发现列表最后添加了一个新项目。

**处理用户输入**

为了让用户和你的应用进行交互，我们可以用 v-on指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法：
html
```
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">逆转消息</button>
</div>
```
js
```
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```
注意在 reverseMessage 方法中，我们更新了应用的状态，但没有触碰 DOM——所有的 DOM 操作都由 Vue 来处理，你编写的代码只需要关注逻辑层面即可。

Vue 还提供了 v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定。
html
```
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```
js
```
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

**组件化应用构建**

组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树。

在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例。在 Vue 中注册组件很简单：
```
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
```

现在你可以用它构建另一个组件模板：
```
<ol>
  <!-- 创建一个 todo-item 组件的实例 -->
  <todo-item></todo-item>
</ol>
```
但是这样会为每个待办项渲染同样的文本，这看起来并不炫酷。我们应该能从父作用域将数据传到子组件才对。让我们来修改一下组件的定义，使之能够接受一个 prop：
```
Vue.component('todo-item', {
  // todo-item 组件现在接受一个
  // "prop"，类似于一个自定义特性。
  // 这个 prop 名为 todo。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```
现在，我们可以使用 v-bind 指令将待办项传到循环输出的每个组件中：
```
<div id="app-7">
  <ol>
    <!--
      现在我们为每个 todo-item 提供 todo 对象
      todo 对象是变量，即其内容可以是动态的。
      我们也需要为每个组件提供一个“key”，稍后再
      作详细解释。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id">
    </todo-item>
  </ol>
</div>
```
允许接收参数的自定义组件
```
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
  }
})
```
下面是显示的效果

    1. 蔬菜
    2. 奶酪
    3. 随便其它什么人吃的东西
    
尽管这只是一个刻意设计的例子，但是我们已经设法将应用分割成了两个更小的单元。子单元通过 prop 接口与父单元进行了良好的解耦。我们现在可以进一步改进 <todo-item> 组件，提供更为复杂的模板和逻辑，而不会影响到父单元。

在一个大型应用中，有必要将整个应用程序划分为组件，以使开发更易管理。在后续教程中我们将详述组件，不过这里有一个 (假想的) 例子，以展示使用了组件的应用模板是什么样的：
```
<div id="app">
  <app-nav></app-nav>
  <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </app-view>
</div>
```

**单文件组件**

在上面的例子中每个组件都包含了一部分html在html文件中，js在js文件中，而且还没有加css。我们可以用扩展名是.vue的文件来写一个组件，下面是一个文件名为Hello.vue的实例:
![](https://cn.vuejs.org/images/vue-component.png)

我们可以使用预处理器来构建简洁和功能更丰富的组件，比如 Pug，Babel (with ES2015 modules)，和 Stylus。
![](https://cn.vuejs.org/images/vue-component-with-preprocessors.png)

**路由**

对于大多数单页面应用，都推荐使用官方支持的 vue-router 库

假设项目名叫demo, 可以在demo/src/conf/routes.js文件里配置路由
routes.js
```
// front-end routes
import NotFound from "../root/NotFound.vue"     // 404页面

import Main from "../root/main/a.vue"   // 主页
import File from "../root/file/a.vue"   // 选择文件的页面

// 在这里面定义网址和页面的对应关系，一个网址对应一个页面
export default [
  { path: "/", component: Main },

  { path: "/file", component: File },

  // cordova
  { path: "/index.html", component: Main },
  { path: "/android_asset/www/index.html", component: Main },

  { path: "*", component: NotFound },
]

```


----------

### [ES2015教程](https://babeljs.io/learn-es2015/)
ES2015是新一代的JavaScript标准，添加了很多新的特性，主要包括以下方面：

**用 let 和 const 代替 var 来定义变量**

**新增箭头函数**
以前的函数
```
var sum = function(a, b) {
  return a + b
}
```
现在可以这么写
```
let sum = (a, b) => {
  return a + b
}
```


**新增Class**
现在可以这么写
```
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```

**模板字符串**
以前拼字符串需要用 +
```
var name = "alice"
var age = 20
var s = "name: " + name + ", age: "+ age
```
现在可以这么写
```
let name = "alice"
let age = 20
let s = `name: ${name}, age: ${age}`
```

**新增函数参数的默认值**
现在可以指定函数参数的默认值
```
function f(a, b=10) {
  return a + b
}
f(3) === 13
```

**新增模块功能**
现在可以这么写
```
// lib/math.js
export function sum(x, y) {
  return x + y
}
export var pi = 3.141593
```

```
// app.js
import * as math from "lib/math"
console.log("2π = " + math.sum(math.pi, math.pi))
```

```
// otherApp.js
import {sum, pi} from "lib/math"
console.log("2π = " + sum(pi, pi))
```

```
// lib/mathplusplus.js
export * from "lib/math"
export var e = 2.71828182846
export default function(x) {
    return Math.exp(x)
}
```

```
// app.js
import exp, {pi, e} from "lib/mathplusplus"
console.log("e^π = " + exp(pi))
```
使用export指定允许其它模块使用的变量或者函数, 注意这里export的格式跟node.js里的不一样
使用import来引入其它模块中的变量或者函数

***不过要想运行这样写的代码，需要使用babel把代码转译成以前的那种JavaScript***
