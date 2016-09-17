# 事件系统

React采用的`事件委托`机制，实现了一个`SyntheticEvent`(合成事件)。`SyntheticEvent`的表现和功能都跟浏览器原生事件对象一致，并且消除了夸浏览器兼容性问题。

所有通过 JSX 这种方式绑定的事件都是绑定到`SyntheticEvent`中来处理。 `SyntheticEvent`会以`事件委托`（event delegation）的方式绑定到组件最上层，并且在组件卸载（unmount）的时候自动销毁绑定的事件。

React的`SyntheticEvent`对各种事件类型提供了友好支持，具体请看官网的[Event System](https://facebook.github.io/react/docs/events-zh-CN.html)。

## 组件绑定事件处理器

### JSX事件绑定

React中使用JSX绑定事件跟HTML非常相似。需要注意的时事件命名需要驼峰式（避免跟原生的事件起冲突），而且是要传方法进去。

```jsx
//自定义组件首字母要大写
var App = React.createClass({
  clickEvent: function(){
    alert("干嘛点我！滚蛋！")
  },
  render: function() {
    return (
      <div>
        <button onClick={this.clickEvent}>有不种点我</button>
      </div>
    );
  }
});
```

codepen例子：[事件系统之JSX事件绑定](https://codepen.io/nange/pen/XjXNbV)

### 事件回调函数参数传递

- 默认参数

事件绑定回调函数的默认参数是`事件对象`，跟原生事件一样。

- 自定义参数

自定义参数？但是只能传方法啊，怎么自定义参数？

办法一，使用`bind`方法

```jsx
clickEvent2: function(param,e){
  console.debug("自定义参数是：",param);
},
...
<button onClick={this.clickEvent2.bind(this,'哈喽')}>点我查看</button>
...
```

办法二，利用`闭包`原理

```jsx
clickEvent3: function(param){
  return functon(e){
  	console.debug("自定义参数是：",param);
  }
},
...
<button onClick={this.clickEvent3('哈喽2')}>点我查看</button>
```

请看codepen: [事件系统之参数传递](https://codepen.io/nange/pen/yaZVJX)

### 绑定事件上下文问题

- 使用bind

```jsx
<button onClick={this.clickEvent2.bind(this,'哈喽')}>点我查看</button>
```

- 使用ES6箭头函数

```jsx
<button onClick={(e)=>{return this.clickEvent(e)}}>点我查看</button>
```

## 绑定浏览器原生事件

在 componentDidMount 方法里面通过绑定的事件就是浏览器原生事件，使用原生事件的时候注意在 componentWillUnmount 解除绑定 removeEventListener。那如何进行原声事件绑定呢，请看后续的**浏览器DOM 操作**。