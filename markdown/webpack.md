# webpack构建React应用

NodeJs的流行，催生了很多优秀的前端工具。webpack就是非常优秀的一种标准模块化打包工具。webpack是目前（2016-09-20）使用最为火热的打包工具，说它占据了前端构建工具的大半江山也不为过。webpack 是以 commonJS 的形式来书写脚本滴，但对 AMD/CMD 的支持也很全面。它在单页应用和类库打包上帮助许多人从代码管理中解脱了出来，成为了当下风靡一时的打包工具。本文主要总结了一些常用的webpack知识。ps：**下面的demo都是层层递进的，后面demo会把前面的知识都囊括在一起。**

## 简单使用

### 安装webpack

首先要安装node，通过nvm安装node（nvm可以管理多个版本node,可以来回切换,请使用v6.0.0以上），npm默认跟随node一起安装。

```sh
#安装nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
#安装最新版node,并可以立刻使用node不用重启终端
nvm install node && nvm alias default node
#安装node v6.0.0，也可以安装其他版本
nvm install v6.0.0
#切换到node版本v6.0.0
nvm use v6.0.0
```

npm安装如果被墙可以使用[淘宝镜像](http://npm.taobao.org/?target=_blank)（但不建议使用cnpm，使用cnpm有时候会安装不完全），直接在~/.npmrc中直接配置：

```sh
registry=https://registry.npm.taobao.org
```

通过`npm`安装webpack，		

```sh
#全局安装，在终端可直接使用命令
npm install -g webpack
#安装到项目目录，后续说明，如果不懂现在先别理
npm install --save-dev webpack
```

### 初步尝试webpack

新建文件夹[demo01](https://github.com/sn-demo/webpack-react-demo?target=_blank)，在demo01新建entry.js入口js文件:

```jsx
document.write("Hello World!");
```

新建index.html文件

```html
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
  </body>
</html>
```

终端进入demo01当前文件夹，运行命令`webpack ./entry.js bundle.js`，然后你回看到demo01文件夹中生成了bundle.js（输出文件）。网页访问index.html，就会看到页面打印出"Hello World!"。恭喜你成功使用webpack打包了第一个应用。

但是这不方便，webpack跟其他grunt、gulp等不同的是，webpack支持用commonJS 的形式来书写脚本！要使用这个功能，就要基于`npm`、`webpack.config.js`和一个运行node服务的sever.js（名字可以自己定）。

##  新建webpack项目

### 初始化

demo01上一级目录（为了统一管理所用demo），运行终端命令如下：

```sh
#项目初始化
npm init #直接回车就行，信息后面也可以改的，如果项目要发布到npm就要改
```

运行这个命令后在当前运行命令的文件夹中会生成package.json配置文件，暂时我们先不理会。运行下面命令把webpack依赖报安装到当前项目：

```sh
# --save会把安装的信息保存在package.json中，详细的请自行上网查看
npm install webpack --save-dev #请观察package.json的变化
```

在项目根目录新建`webpack.config.js`，下面会详细说明。

### 新建server.js

需要使用到express和webpack-hot-middleware。express用来启动服务，webpack-hot-middleware中我们经常用的功能是：

- webpack打包的文件可以直接在内存中（跟直接访问真的静态文件效果一样）
- 热替换功能。

安装依赖包

```sh
npm install --save-dev express
npm install --save-dev webpack-hot-middleware
```

然后再demo02中新建server.js（后续的每个demo都有server.js和webpack.config.js，demo之间相互独立）。

server.js中的一些配置如果不明白，慢慢消化，可以先直接copy使用。

```js
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');//webpack.config.js同一目录
var port = 6666;
var app = express();
var compiler = webpack(config);
//内存生成的js文件，请求第一优先
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,//必须跟webpack.config.js的ouput.publickPath一致
}));
//设置路径不存在(webpack-dev-middleware内存中也不存在)时访问静态文件目录，请求第二优先
app.use(express.static(path.join(__dirname, 'public/sop')));
app.use(require('webpack-hot-middleware')(compiler));
//上面静态文件访问不存在时，所有请求都定位到index.html文件，最后都找不到的请求都访问index.html
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
var host = "localhost"
app.listen(port, host, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.info("==> 🌎  Listening on port %s. Open up http://"+host+":%s/ in your browser.",     port, port)
});
```

### 新建webpack.config.js

看下面的详解。

## webpack.config.js配置详解

webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的 `webpack.config.js` 文件。下面系列的demo，请按照以下说明运行：

> 进入demoxxx目录，运行`node server.js`，访问http://localhost:3666。终止正在运行的服务，运行`webpack --progress --colors`（后面的参数是展示进度和颜色）打包，运行`node ./pathxxx/http-server.js`（根据http-sever.js的位置），访问http://localhost:3666打包的App。注意：每个demo的端口都一样，没错运行新的demo都要先把之前占用的端口服务停止！
>
> demo08后请使用下面命令：
>
> 开发环境
>
> ```sh
> export NODE_ENV=development && node server.js
> #windows使用下面的命令
> set NODE_ENV=development && node server.js
> ```
>
> 生成环境（打包）
>
> ```sh
> export NODE_ENV=production && webpack --progress --colors
> #windows使用下面的命令
> set NODE_ENV=production && webpack --progress --colors
> ```

`webpack.config.js`

```js
var webpack = require('webpack')
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by zhaoda')
  ]
}
```

### 入口文件

入口文件是我们代码编写的文件入口，可以通过`require`引进其他js或者css文件，当然还有多文件入口（后面在说明）

#### 单个入口文件

```js
 module.exports = {
     entry: './entry.js',//入口文件
 };
```

#### 多个入口文件

多入口文件，稍微复杂点，后续也会有说到。

````js
 //第一种，这个挺好理解
 module.exports = {
     entry: [
       './entry.js',
       './entry2.js',
     ]
 };
 //第二种跟第一中效果是一样的，知识多了个app来包装，这个也还好
 module.exports = {
     entry: {
       app: [
         './entry.js',
         './entry2.js',
       ],
     }
 };
//第三种，这种就稍微难理解点（可以先放着），需要结合Chunk相关来理解，看后面的code splitting 
 module.exports = {
     entry: {
       app: [
         './entry.js',
         './entry2.js',
       ],
       lib: ['react','react-dom']
     }
 };
````

### 输出打包文件

最终我们会打包输出一个文件（当然还可以有chunks，后续会说明）。

```jsx
var webpack = require('webpack')
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,//_dirname项目根目录路径
    filename: 'bundle.js',//输出为bundle.js
    chunkFilename: '[name]-[id]-[chunkHash].chunk.js',
  }
}
```

下面说下常用的ouput配置。

- output.path，定义输出文件路径

- output.filename

  输出文件命名可带url参数，如`bundle.js?hash=[hash]`，动态生成的html文件时，这种方式可以防止版本更新缓存问题。

- output.publicPath

  内存和打包静态文件输出目录，以index.html为准,使用绝对路径，最好以斜杠`/`结尾，要不会有意想不到的bug。

- chunkFilename

  ```js
  chunkFilename: '[name]-[id]-[chunkHash].chunk.js',
  ```

  `[id]`会替换成chunk的id.

  `[name]` 会替换成chunk名字（如果没设置替换为id）chunk命名设置在:

  ```js
  require.ensure([], function(require) {
  },'命名在这');
  ```

  `[hash]` 替换成编译hash值。

  `[chunkhash]` 替换成chunk对应hash值。

  ​

### 打包第一个React应用

[demo02](https://github.com/sn-demo/webpack-react-demo?target=_blank)，安装React依赖包

```sh
#不要-dev,把react归于必须依赖的类库
#加-dev也没影响的，只是为了方便管理
npm install --save react
npm install --save react-dom
```

webpack.config.js

```js
var webpack = require('webpack')
var path = require('path')
module.exports = {
  entry: "entry.js",
  output: {
    filename: 'bundle.js',
	path: path.resolve(__dirname,'./'),//打包输出目录，以package.json为准，是用相对路径
	publicPath: '/',//内存输出目录，以index.html为准,使用绝对路径
  }
};
```

server.js

```js
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');//webpack.config.js同一目录
var port = 3666;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,//必须跟webpack.config.js的ouput.publickPath一致
}));
app.use(require('webpack-hot-middleware')(compiler));
//所有请求都定位到index.html文件
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
var host = "localhost"
app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.info("==> 🌎  Listening on port %s. Open up http://"+host+":%s/ in your browser.", port, port)
});
```

entry.js

暂且不用jsx来实现，因为要涉及到jsx解析，后面loader补充。

```jsx
var React = require('react');
var ReactDOM = require('react-dom');
var Component = React.createElement("div",{},"Hello World!");
//相当于
//var Component = <div>Hello World!</div>;
ReactDOM.render(Component,document.getElementById("app_container"))
```

### module.loaders

loader是webpack的必不可少部分，多数loader都是第三方开发的，主要用来转换`require`（js、css、图片等）资源（如babel转换JSX成JS代码）。那loader配置是怎么用的？

```js
var webpack = require('webpack')
var path = require('path')
module.exports = {
  entry: "entry.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'./'),//打包输出目录，以package.json为准，是用相对路径
    publicPath: '/',//内存输出目录，以index.html为准,使用绝对路径
  },
  //loaders要在module中配置
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ],
  }
};
```

后续讲诉一些常用的loaders。

#### 加载CSS

加载css文件，我们需要用到，两种loader:

- style-loader
- css-loader

```sh
npm install style-loader --save-dev
npm install css-loader --save-dev
```

原始加载css文件是这样的：

```js
require("!style!css!path/style.css");
```

这多不爽，我们想直接这样用`require("path/style.css")`。当然可以，那就要使用loader的一些配置了：

```js
module.exports = {
  //loaders要在module中配置
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ],
  }
}
```

请查看[demo3](https://github.com/sn-demo/webpack-react-demo?target=_blank)。

但是这些的css会跟js打包在一起，要使css也分离开来，就要用到[extract-text-webpack-plugin](#extract-text-webpack-plugin)插件了，后面详说。

#### 加载图片和字体

需要用到两种loader:

- file-loader

- url-loader（url-loader是基于file-loader的，没有file-loader会报错）

  url-loader还有个功能，提取css中的图片和字体，需要配合css-loader和style-loader使用，图片会根据配置打包到指定位置。

```sh
npm install file-loader --save-dev
npm install url-loader --save-dev
```

配置如下：

```js
module.exports = {
  //loaders要在module中配置
  module: {
    loaders: [
      //limit是base64转换最大限制，小于设置值，都会转为base64格式
      //name是提取图片的命名方式
      { 
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, //匹配图片或字体格式的文件
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      },
      //下面方式也可以
      { 
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
        loader: 'url-loader',
        query: {
          limit: 50000,
          //[path]是以publicPath为准
          name: "[path][name].[ext]",
        }
      },
    ],
  }
}
```

看下下面的demo:

- js中直接使用图片

  [demo4](https://github.com/sn-demo/webpack-react-demo?target=_blank)

  entry.js

  ```jsx
  var React = require('react');
  var ReactDOM = require('react-dom');
  require("./style.css");
  var img = require("./react.png")  
  var Component = React.createElement("img",{src: img});
  //相当于
  //var Component = <img src={img}>;
  ReactDOM.render(Component,document.getElementById("app_container"))
  ```

- css中使用图片

  [demo5](https://github.com/sn-demo/webpack-react-demo?target=_blank)，做了些改动。

  webpack.config.js，输出目录改为了public，index.html移进了public文件中，url-loader配置也改了。**需要注意的是，不要在url-loader的参数name设置name的上级目录，如`url-loader?limit=50000&name=[path]../images/[name].[hash].[ext]`。**这样在使用server.js运行的服务是访问不到图片的，但是在webpack打包中是可以的。

  只要是设置文件提取路径的，在开发环境都不要使用上级目录`../`来处理，生成（打包）环境可以使用（后续会提到）。

  ```js
  module.exports = {
      entry: "./entry.js",
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./public/js'),//打包输出目录，以package.json为准，是用相对路径
        publicPath: '/js/',//内存输出目录，以index.html为准,使用绝对路径
      },
      module: {
        loaders: [
          //匹配到rquire中以.css结尾的文件则直接使用指定loader
          { test: /\.css$/, loader: "style!css" },
          //limit是base64转换最大限制，小于设置值，都会转为base64格式
          //name是在css中提取图片的命名方式
          { 
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, //匹配图片或字体格式的文件
            //位置放进了images文件夹中了，还添加了hash
            //使用../images/[name].[hash].[ext]，在开发环境是不行的
            loader: 'url-loader?limit=50000&name=[path]images/[name].[hash].[ext]',
          },
        ],
      }
  };
  ```

#### babel解析JSX

现在开始使用大名鼎鼎的babel了，React的JSX需要使用Babel来解析成js，ES6语法需要Bable解析成es5兼容语法。

```sh
npm install babel-core --save-dev 
npm install babel-loader --save-dev #需要babel-core支持
npm install babel-preset-react --save-dev #解析jsx
npm install babel-preset-es2015 --save-dev #使用es6语法
```

现在开始配置：

webpack.config.js

```js
module.exports = {
    ...
    module: {
      loaders: [
        ...
        { 
          //匹配.js或.jsx后缀名的文件
          test: /\.js[x]?$/, 
          loader: 'babel',
          query: {
            presets: ['react','es2015']
          },
          //不解析node_modules的es6语法 
          exclude: /node_modules/,
        },
      ],
    }
};
```

还有中更方便的方式，在package.json目录下新建文件.babelrc，上面的query就可以删掉了。

```json
{
  "presets": ["react", "es2015"]
}
```

```js
module.exports = {
    ...
    module: {
      loaders: [
        ...
        { 
          //匹配.js或.jsx后缀名的文件
          test: /\.js[x]?$/, 
          loader: 'babel',
          //不解析node_modules的es6语法 
          exclude: /node_modules/,
        },
      ],
    }
};
```

看[demo6](https://github.com/sn-demo/webpack-react-demo?target=_blank)，是用来es6语法。

entry.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Compoent.jsx';

require("./style.css");

ReactDOM.render(<Component />,document.getElementById("app_container"));
```

Component.jsx

```jsx
import React from 'react';

export default class Component extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="bg">
      </div>
    )
  }
}
```

#### expose-loader

请看后面的[模块暴露全局方式](#模块暴露全局方式)。

### module.noParse

当我们使用的类库是没有依赖的时候我们可以使用这个配置直接跳过webpack处理。如react.min.js。

### resolve

这是神马东西？这个东东可好用了。

#### resolve.alias

`resolve.alias`是用来设置require路径别名，即使不是通过npm安装的包也可以像npm安装包一样使用。

```js
module.exports = {
  resolve: {
    alias: {
      'com': path.resolve(__dirname,'components'),
    }, 
  },
}
```

基于demo06改成[demo7](https://github.com/sn-demo/webpack-react-demo?target=_blank)。

#### resolve.extensions

设置requre时不带后缀名的文件识别为配置的后缀名（前面的优先返回），匹配不到直接报错。demo请看[demo7](https://github.com/sn-demo/webpack-react-demo?target=_blank)。

```jsx
module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
}
```

### devtool

开发总是离不开调试，如果可以更加方便的调试当然就能提高开发效率，不过打包后的文件有时候你是不容易找到出错了的地方对应的源代码的位置的，Source Maps就是来帮我们解决这个问题的。通过简单的配置后，Webpack在打包时可以为我们生成的source maps，这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。

webpack有好几种生成source map的配置，从错误定位的的方式，大致为两种：

- loader转换后的代码

  如JSX有错误，错误定位到被转换后的代码。

  ```jsx
   _createClass(Component, [{
      key: "render",
      value: function render() {
        debugger;//断点，定位到这里
        return _react2.default.createElement("div", { className: "bg" });
      }
    }]);
  ```

- loader转换前的代码

  就是我们自己写的代码。

  ```jsx
  render(){
    debugger;//断点，定位到这里
    return (
    	<div className="bg">
    	</div>
    )
  }
  ```

从生成source map的位置，source map分两种：

- 文件内

  `文件内`source map比较少用。eval的都是文件内，不支持生产环境。其他的都可以使用`inline-`前缀编程，变成`文件内`的source map。其他`文件内`source map直接在打包的文件bundle中：

  ```jsx
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s...
  ```

- 文件外

  生成环境使用`文件外`的方式，打包的bundle，文件末尾引入外部source map：

  ```js
  //# sourceMappingURL=bundle.js.map
  ```

下面是各种devtool配置对照表（inline-xxx的就不列举了）。

| devtool                      | 构建速度 | 重新构建速度 | 生成环境支持情况 | 质量（调试定位看到的代码） | map位置 |
| ---------------------------- | ---- | ------ | -------- | ------------- | ----- |
| eval                         | +++  | +++    | no       | loader转换后的代码  | 文件内   |
| cheap-eval-source-map        | +    | ++     | no       | loader转换后的代码  | 文件内   |
| cheap-source-map             | +    | o      | yes      | loader转换后的代码  | 文件外   |
| cheap-module-eval-source-map | o    | ++     | no       | loader转换后的代码  | 文件内   |
| cheap-module-source-map      | o    | -      | yes      | loader转换后的代码  | 文件外   |
| eval-source-map              | –    | +      | no       | loader转换前的代码  | 文件内   |
| source-map                   | –    | –      | yes      | loader转换前的代码  | 文件外   |

基于demo07我们进行逐个尝试，首先在`demo07/components/Compnent.jsx`打上断点（代码自行修改）：

```jsx
render(){
  debugger;//这里打断点
  return (
    <div className="bg">
    </div>
  )
}
```

#### 第一类source map

修改配置devtool为以下其中一种：

- eval
- cheap-source-map
- cheap-eval-source-map

`node server.js`运行后，在chrome浏览器中访问，并打开开发者工具，刷新，会看到下面效果图。source map定位并没有跳到我们的熟悉原代码，而是经过loader解析生成后的代码。

![](../../react/img/loader-after.png)

#### 第二类source map

修改配置devtool为以下其中一种：

- eval-source-map

  不过eval-source-map有个缺点，不好用，在chrome开发工具中的打包文件中，点断点不会跳转到我们编写的代码文件，不过生成的代码我们一般都不会去看，问题不大。

- source-map

`node server.js`运行后，在chrome浏览器中访问，并打开开发者工具，刷新，会看到下面效果图。source map定位跳到我们的熟悉原代码。

![](../../react/img/loader-before.png)

### 第三类source map

修改配置devtool为以下其中一种：

- cheap-module-eval-source-map
- cheap-module-source-map

`node server.js`运行后，在chrome浏览器中访问，并打开开发者工具，刷新，会看到下面效果图。source map定位并没有下如图，好像没啥用，断点也找不到具体位置。

![](../../react/img/third-source-map.png)

#### devtool使用建议

本人是觉得开发环境`devtool: "#eval-source-map"`，比较合适，当然开发环境也可以使用其他的。生产环境使用`devtool: "#source-map"`是最佳的选择。

### 插件

插件也是webpack比不可少的一部分，下面列举几种常用的插件。

```js
var webpack = require('webpack');
module.exports = {
  ...
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production") 
    })
  ]
  ...
}
```

#### webpack.NoErrorsPlugin

允许错误不打断程序。

#### webpack.HotModuleReplacementPlugin

热替换功能必须开启的一个插件，热替换详说。
#### webpack.optimize.CommonsChunkPlugin

作用是提取公共chunk，后续[Code Splitting][#Code Splitting]详说。
#### webpack.DefinePlugin

这个是定义全局变量,常量，像process.env.NODE_ENV在node服务端才可以访问的到，通过以下代码可以在客户端也可以访问。通过这个方式就可以用来区别开发和生产环境。目前R2框架我是采用webpack.config.js为开发环境，Gruntfile.js是生产环境，Gruntfile.js里面覆盖了一些webpack.config.js的配置。
```js
//需要使用使用JSON.stringify
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify("production") //定义为生产环境
}),
```
这样就可以process.evn.NODE_ENV的值就为production。demo看`webpack.optimize.UglifyJsPlugin`。
#### webpack.optimize.UglifyJsPlugin

用到这个插件就必须区分开发和生成环境了，此插件用于生产环境打包压缩插件，例子看[demo8](https://github.com/sn-demo/webpack-react-demo?target=_blank)，终端运行开发环境运行下面命令（**后续的demo也要这样**，打包环境为生成环境）：

```sh
export NODE_ENV=development && node server.js
#windows使用下面的命令
set NODE_ENV=development && node server.js
```

生成环境运行下面命令（打包）：

```sh
export NODE_ENV=production && webpack
#windows使用下面的命令
set NODE_ENV=production && webpack
```

打包后运行`node ./public/http-server.js`，访问http://localhost:3666/js/bundle.js，就可以看到压缩的js代码。ps：因为要压缩，打包时间变长了。

webpack.config.js配置如下：

```js
var webpack = require('webpack')
var path = require('path')
var config = {
  devtool: isProduction ? "#source-map":"#eval-source-map",
  entry: "./entry.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'./public/js'),//打包输出目录，以package.json为准，是用相对路径
    publicPath: '/js/',//内存输出目录，以index.html为准,使用绝对路径
  },
  module: {
    loaders: [
      //匹配到rquire中以.css结尾的文件则直接使用指定loader
      { test: /\.css$/, loader: "style!css" },
      //limit是base64转换最大限制，小于设置值，都会转为base64格式
      //name是在css中提取图片的命名方式
      { 
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, //匹配图片或字体格式的文件
        loader: 'url-loader?limit=50000&name=[path]images/[name].[hash].[ext]'
      },
      { 
        //匹配.js或.jsx后缀名的文件
        test: /\.js[x]?$/, 
        loader: 'babel',
        //不解析node_modules的es6语法 
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      'com': path.resolve(__dirname,'components'),
    }, 
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      //定义process.env.NODE_ENV，这样在webpack中也能使用
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), 
    }),
  ]
};
//通过process.env.NODE_ENV判别是否是生成环境
if(process.env.NODE_ENV === "production"){
  var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
  });
  config.plugins.push(UglifyJsPlugin)
}

module.exports = config;
```

#### extract-text-webpack-plugin

`extract-text-webpack-plugin`是用来提取css到指定文件的第三方插件，需要安装，并require进来。在配置文件中需要修改两处：

- 处理样式的loader
- 插件

安装：

```sh
npm install extract-text-webpack-plugin --save-dev
```

配置：

```js
var ExtractTextPlugin = require("extract-text-webpack-plugin");
...
module.exports = {
  module: {
    loaders: [
      //只要是需要提取样式的，都要这样处理
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },
    ]
  },
  plugins: [
    //new ExtractTextPlugin('../css/styles.css', {})，在开发环境这样设置失效
    new ExtractTextPlugin('css/styles.css', {
      allChunks: true//最好true,要不后面加上sass-loader等时，会出现css没有提取的现象
    })
  ]
}
```
**注意：只要是设置文件提取路径的，在开发环境都不要使用上级目录`../`来处理，生成（打包）环境可以使用。**

index.html加载styles.css文件

```html
<html>
  <head>
    <meta charset="utf-8">
    <!--这里加载-->
	<link href="/js/css/styles.css" rel="stylesheet">
  </head>
  <body>
    <div id="app_container"></div>
    <script type="text/javascript" src="/js/bundle.js" charset="utf-8"></script>
  </body>
</html>
```

上面的设置是将所有require的css打包成一个独立的styles.css文件,当然也可以按css文件一一对应打包，这里不多说。目前还有遇到要一一对应的需求，都巴不得整个web app样式都一次加载进来。

还有，我平常的处理是生产环境使用这个插件，开发环境不使用。因为后面用到热替换后，使用这个插件css的热替换会失效，只有第一次加载有效。

demo请看[demo9](https://github.com/sn-demo/webpack-react-demo?target=_blank)。

#### webpack.ProvidePlugin

请看后面的[模块暴露全局方式](#模块暴露全局方式)。

#### HtmlWebpackPlugin

使用这个插件，[demo9-01](https://github.com/sn-demo/webpack-react-demo?target=_blank)进行了一次全新的开发环境和生成环境配置，请结合[全新的开发与生成环境](#全新的开发与生成环境)来看。

HtmlWebpackPlugin这个插件可以用来简化创建服务于 webpack bundle 的 HTML 文件，尤其是对于在文件名中包含了 hash 值，而这个值在每次编译的时候都发生变化的情况。HtmlWebpackPlugin会自动插入提取的css和打包的js输出文件，我们基本不用去关心的。

现在的`demoxx/public/index.html`文件是直接生成的，

**请记住大部分的插件或者loader提取文件或生成文件的路径是以output.publicPath为参考位置，还在开发环境中不要使用`../`上级目录，不过可以在生成打包时是使用**。

```js
var HtmlWebpackPlugin = require('html-webpack-plugin')
var isProduction = process.env.NODE_ENV === "production";
...
output: {
  filename: 'bundle.js?hash=[hash]',
    //js打包输出目录，以package.json为准，是用相对路径
    path: path.resolve(__dirname,'./public/js'),
    //内存和打包静态文件输出目录，以index.html为准,使用绝对路径，最好以斜杠/结尾，要不有意想不到的bug
    publicPath: '/js/',
},
plugins: [
  new HtmlWebpackPlugin({
    //模板html文件
    template: 'html_template/index.html',
    //通过生成的html文件，使用上级目录在webpack-dev-middleware生成的内存文件中是访问不到的
    //不使用上级目录就可以，生产环境就没问题
    //index.html在publicPath上一级目录 。
    filename: isProduction ? './../index.html' : 'index.html',
  })
 ],
...
```

配置参数入下：

- filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
- template: 模板文件路径。
- inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
- favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
- minify: {} | false , 传递 html-minifier 选项给 minify 输出
- hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
- cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
- showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
- chunks: 允许只添加某些块
- chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
- excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块) 

### 全新的开发与生产环境

demo请看[demo9-01](https://github.com/sn-demo/webpack-react-demo?target=_blank)。

区别开发与生成环境需要通过设置环境变量`process.env.NODE_ENV`，设置方法如下：

```sh
#mac linux
export export NODE_ENV=xxxx
#windows
set export NODE_ENV=xxxx
```

按照github上大牛用法，一般开发环境`NODE_ENV`设置为`development`，生成环境设置为`production`。

需要分生产和开发环境的地方有以下几种：

- devtool（这里看需要）
- 热替换（这个demo没有添加这个功能）
- css文件提取（热替换需要直接js插入样式，才会生效）
- url-loader,HtmlWebpackPlugin生成文件路径问题（内存虚拟路径使用`../`失效）
- 代码压缩（生产环境）

`webpack.config.js`

bundle.js和styles.css都加上了`?hash=[hash]`，防止新版本更新缓存问题。

```js
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//定义是否为生成环境
var isProduction = process.env.NODE_ENV === "production";

var config = {
  devtool: "#source-map",
  entry: "./entry.js",
  output: {
    filename: 'bundle.js?hash=[hash]',
    //js打包输出目录，以package.json为准，是用相对路径
    path: path.resolve(__dirname,'./public/js'),
    //内存和打包静态文件输出目录，以index.html为准,使用绝对路径，最好以斜杠/结尾，要不有意想不到的bug
    publicPath: '/js/',
  },
  module: {
    loaders: [
      //匹配到rquire中以.css结尾的文件则直接使用指定loader
      { 
        test: /\.css$/, 
        loader: isProduction ? ExtractTextPlugin.extract("style", "css") : "style!css", 
      },
      //limit是base64转换最大限制，小于设置值，都会转为base64格式
      //name是在css中提取图片的命名方式
      { 
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, //匹配图片或字体格式的文件
        //[path]是以publicPath为准
        loader: 'url-loader',
        query: {
          limit: 50000,
          name: isProduction ? "[path]../images/[name].[hash].[ext]" : "images/[name].[hash].[ext]",
        }
      },
      { 
        //匹配.js或.jsx后缀名的文件
        test: /\.js[x]?$/, 
        loader: 'babel',
        //不解析node_modules的es6语法 
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      'com': path.resolve(__dirname,'components'),
    }, 
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), 
    }),
    new HtmlWebpackPlugin({
      template: 'html_template/index.html',
      //通过生成的html文件，使用上级目录在webpack-dev-middleware生成的内存文件中是访问不到的
      //不使用上级目录就可以，生产环境就没问题
      filename: isProduction ? './../index.html' : 'index.html',//以output.publicPath为参考位置,index.html在其上一级 
    })
  ]
};
if(isProduction){
  var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
  });
  config.plugins.push(UglifyJsPlugin)
  config.plugins.push(
    //生成环境才把css单独打包，这样在开发环境css的热替也能生效。
    new ExtractTextPlugin('../css/styles.css?hash=[hash]', {
      allChunks: true //最好true,要不后面加上sass-loader等时，会出现css没有提取的现象
    })
  )
}
module.exports = config;
```

`server.js`

`server.js`也做了一些处理，因为index.html文件直接生成了。

- 禁止开发环境静态访问index.html。
- express直接访问不了内存文件，只能把内存文件index.html内容提取出来。

```js
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');//webpack.config.js同一目录
var port = 3666;
var app = express();
var compiler = webpack(config);

var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  //publicPath必须跟webpack.config.js的ouput.publickPath一致
  publicPath: config.output.publicPath,
})
app.use(webpackDevMiddleware);
app.use(require('webpack-hot-middleware')(compiler));
//访问的静态文件
app.use(express.static(path.join(__dirname, './public'),{
  //禁用目录index索引，要不生成环境打包后，开发环境访问域名会直接访问到index.html。
  index: false,
}));
//这里是特殊处理，因为是内存文件，在地址重写时，要重内存中把index.html文件内容取出来
compiler.plugin("done", function(stats) {
  var fs = compiler.outputFileSystem;
  //获取内存index.html文件内容
  var index = fs.readFileSync(webpackDevMiddleware.getFilenameFromUrl(config.output.publicPath + "/index.html"));
  //所有请求都定位到内存文件index.html
  app.get('*', function(req, res) {
    res.send(index.toString('utf8', 0, index.length));
  });
})

var host = "localhost"
app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.info("==> 🌎  Listening on port %s. Open up http://"+host+":%s/ in your browser.", port, port)
});
```



### 热替换

热替换是一直很实用的技术。在改动某处文件之并保存后，页面会直接显示出改动的效果，这就是`热替换`。其他的不多说，说下react项目中如何使用热替换。有一段时间[react-hot-loader](https://github.com/gaearon/react-hot-loader?target=_blank)很火，不过有些缺点，后来原作者是用来新的写法，开发了一个新的react热替换项目[react-transform-hmr](https://github.com/gaearon/react-transform-hmr)。不过现在react-hot-loader有了新版本React Hot Loader 3，react-transform-hmr开始过时了。

> React Hot Loader 3 is [on the horizon](https://github.com/gaearon/react-hot-loader/pull/240), and you can try it today ([boilerplate branch](https://github.com/gaearon/react-hot-boilerplate/pull/61), [upgrade example](https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915)). It fixes some [long-standing issues](https://twitter.com/dan_abramov/status/722040946075045888) with both React Hot Loader and React Transform, and is intended as a replacement for both. The docs are not there yet, but they will be added before the final release. For now, [this commit](https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915) is a good reference.

React Hot Loader 3 使用了全面热替换，解决了redux等部分热替换部分失效问题。

现在我们使用React HOT Loader 3来实现热替换：

```sh
npm install --save-dev react-hot-loader
```

webpack.config.js需要改动的地方是：

入口文件：

需要分生产和开发环境，生产环境是不需要热替换的！生产环境添加了`webpack-hot-middleware`的热替换入口文件。

```js
if(isProduction){
  var entry =  [
    "./entry.js?hash=[hash]",//app 入口文件
  ];
}else{
  var entry =  [
    'webpack-hot-middleware/client',//热替换入口文件
    "./entry.js",//app 入口文件
  ];
}
```

开启热替换功能：

```js
if(isProduction){
  //...
}else{
  //热替换必须的开启的插件
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
```

在入口文件中还要加入如下代码（不加找不到替换位置）：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
//没带后缀名
import Component from 'com/Component';

require("./style.css");

ReactDOM.render(<Component />,document.getElementById("app_container"));
//需要在这里加入代码，进行了整个app热替换
if (module.hot) {
  module.hot.accept('com/Component', () => {
    // 如果你使用了Webpack 2 in ES modules 模式, 你可以
    // 直接使用 <App /> 而不用 require() 一个 <NextApp />.
    const NextApp = require('com/Component').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById("app_container")
    );
  });
}
```

demo请看[demo10](https://github.com/sn-demo/webpack-react-demo?target=_blank)。

### 小结

#### 注意事项

- `url-loader`,`extract-text-webpack-plugin`,`HtmlWebpackPlugin`等需要成文件的loader或者插件，生成路径是以output.publicPath为参考位置，**在开发环境中不要使用`../`上级目录*，可以在生成打包时是使用。如`url-loader`配置：

  ```js
  { 
    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
    loader: 'url-loader',
    query: {
      limit: 50000,
      //这里区别了生成和开发环境
      name: isProduction ? "[path]../images/[name].[hash].[ext]" : "images/[name].[hash].[ext]",
    }
  }
  ```

- `webpack.config.js`中的`output.publicPath`最好以斜杠`/`结尾，要不有意想不到的bug。

  ```js
  output: {
    filename: 'bundle.js?hash=[hash]',
    path: path.resolve(__dirname,'./public/js'),
    publicPath: '/js/',
  },
  ```

## 进阶

### 模块暴露全局方式

#### expose-loader

webpack配置：

```jsx
...
//要将模块导出的内容暴露给多个全局变量的话，可以使用多次expose-loader
//使用两次,全局变量分别为React和react
{ test: require.resolve("react"), loader: "expose?React!expose?react" },
//使用一次暴露全局
{ test: require.resolve("react-dom"), loader: "expose?ReactDOM" },
...
```

**有一点要注意的是，至少要require一次后全局变量才生效！**

请看[demo11](https://github.com/sn-demo/webpack-react-demo?target=_blank)，其中`components/Component`就直接使用了全局变量React，可以在Chrome DevTools Console中查看。

#### webpack.ProvidePlugin

这个插件需要结合expose-loader使用，可以理解为调用模块的别名。本人不建议使用，使用它定义React别名react，在全局变量中是访问不到react的，而且终端会报waring，而且有时候莫名其妙报错（不知道为什么）。

```js
new webpack.ProvidePlugin({
  "react": "React",
}),
```

### Code Splitting

对于大型的web 应用而言，把所有的代码放到一个文件的做法效率很差，特别是在加载了一些只有在特定环境下才会使用到的阻塞的代码的时候。Webpack有个功能会把你的代码分离成`Chunk`，这个功能就是Code Spliiting。

chunk到底是什么，Chunk在webpack中是什么作用？Webpack中将打包后的文件都称之为“Chunk”。Chunk我归类为两种：

#### 异步chunk

而异步chunk插件就是将代码拆分(code splitting)打包。只需要在output配置chunkFilename就行了,看上面。

在开发webapp时，总会有一些功能是使用过程中才会用到的，出于性能优化的需要，对于这部分资源我们希望做成异步加载，所以这部分的代码一般不用打包到入口文件里边。对于这一点，webpack提供了非常好的支持，可以使用`require.ensure()`作为代码分割的标识。

例如某个需求场景，根据url参数，加载不同的两个UI组件，示例代码如下：

```js
var hash = location.hash.split("#")[1];
if(hash == "home"){
  require.ensure([], (require) => {
    this.setState({
      active: "home",
      contents: require('../components/Home').default,
    })
  },'home');
}
if(hash == "about"){
  require.ensure([], (require) => {
    this.setState({
      active: "about",
      contents: require('../components/About').default,
    })
  },'about');
}
```
同时在webpack输出配置中设置（定义打包chunk的名字）：

```js
chunkFilename: '[name]-[id]-[chunkHash].chunk.js'
```

demo请看的[demo12](https://github.com/sn-demo/webpack-react-demo?target=_blank)。

#### 同步chunk（script标签引进来的）

这中就需要使用CommonsChunkPlugin，用到上面的异步chunk，这个就必须用到了，要不每个chunk都会打包一些重复的第三方类库代码。官网说明[commonschunkplugin](https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin?target=_blank)。

同步chunk本人总结为两种：

- 多入口共同chunk，提取方式如下：

  ````js
  entry: {
    app: entry,
  }, 
  ...
  new webpack.optimize.CommonsChunkPlugin({
    name: 'libs',
    filename: 'libs.js',
    minChunks: 2,//定义入口文件至少有两个，这个配置需要>=2。
    chunks: ['app'],//定义需要提取的入口，默认所有
  }),
  ````


- 类库chunk（多入口共同chunk特殊一种）

  ```js
  entry: {
    libs: ['antd/lib/alert'],
    app: entry,
  }, 
  ...
  new webpack.optimize.CommonsChunkPlugin({
    name: 'libs',
    filename: 'libs.js',
    minChunks: Infinity,
    // minChunks (with more entries, this ensures that no other module
    //  goes into the vendor chunk)
    chunks: ['app'],
  }),

  ```

虽然设置了`minChunks: Infinity`，但是react类库还是一起打包到libs.js中了，不知道为什么（或许多处入口都是用了react，之后被判别为Infinity）。demo看[demo13](https://github.com/sn-demo/webpack-react-demo?target=_blank)。

> 有点需要**注意**的，使用了`异步chunk`，require的类库需要在app入口文件和异步chunk中都用到才会被打包到bundle.js文件中（app入口输出文件），要不会单独打包到各自的异步chunk输出文件，就会导致重复。如demo13的`home`页面（components/Home.jsx）中如果引入了`import test from "test"`，而在`compoent/Component.jsx`和`entry.js`中都没有引入，就会打包到home的单独输出文件中

### 使用外部资源类库

有时候我们想直接使用类库外部cdn呢，我们该怎么做？webpack提高了一种方式：`externals`。举个例子，我们要使用react和ReactDOM外部资源。

首先配置好webpack，`externals`是要配合`output.libraryTarget`使用的。推荐如下设置：

```js
···
output: {
  //需要设置为var,设置为其他的没发现可以
  libraryTarget: "var",
}
···
externals: {
  "react": "React",
  "react-dom": "ReactDOM",
}
```

然后再index.html中的scrpt标签中引入react和react-dom资源。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.min.js"></script>
```

经过上面配置，webpack会解析生成为如下代码：

```js
/* 13 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
```

直接在全局变量React和ReactDOM中进行了umd封装，这样我们就可以直接在webpack环境中require了。

### 优化打包时间

有以下几种方式：

- [使用外部资源类库](#使用外部资源类库)
- [Code Splitting](#Code Splitting)
- [module.noParse](#module.noParse)

## 参考文章

- [webpack官网文档](http://webpack.github.io/docs?target=_blank)
- [Webpack打包进阶](http://www.cnblogs.com/sunshq/p/5073301.html?target=_blank)
- [JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
- [webpack使用优化（基本篇）](https://github.com/lcxfs1991/blog/issues/2)
- [webpack 插件： html-webpack-plugin](http://www.cnblogs.com/haogj/p/5160821.html)
- [LIBRARY AND EXTERNALS](https://webpack.github.io/docs/library-and-externals.html)





###  

