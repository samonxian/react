# 组件

组件（Component）是对数据和方法的简单封装。随着前端开发复杂度的日益提升，组件化开发应运而生。React的每个组件都可以用JSX来表示，React构建页面的基础单元就是React组件。

## 编写第一个组件

JSX解析使用Babel，codepen可以选择的。

```jsx
//自定义组件首字母要大写
var HelloWorld = React.createClass({
  render: function() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
});
```

请看codepen例子：[编写第一个组件](https://codepen.io/nange/pen/ALWkyP)。

## 组件生命周期

组件会随着组件的`props`和`state`改变而发生变化，它的DOM也会有相应的变化。

> 一个组件就是一个状态机：对于特定的输入，它总会返回一致的输出。

React组件提供了`生命周期`的`钩子函数`去响应组件不同时刻的状态，组件的`生命周期`本人总结如下：

- 立即执行期
- 实例化
- 存在期
- 销毁期

`钩子函数`是我们重点关注的地方，下面来详细了解下`生命周期`下的`钩子函数`调用顺序和作用。每个`生命周期`阶段调用的`钩子函数`会略有不同。下面的图片或许对你有帮助。

![组件 生命周期 ](https://cdn-images-1.medium.com/max/800/0*VoYsN6eq7I_wjVV5.png)

可以查看CodePen在线Demo,[React生命周期](https://codepen.io/nange/pen/RGwPXB)

### 立即执行期

组件创建未调用时，有以下方法会立即被调用，在使用`React.createClass`请看下（注意顺序，从上到下先后执行）：

- `getDefaultProps`

这个方法是用来设置组件默认的`props`，组件`生命周期`只会调用一次。但是只适合`React.createClass`直接创建的组件，使用ES6/ES7创建的这个方法不可使用，ES6/ES7可以使用下面方式：

```jsx
//React.createClass方式
React.createClass({
  getDefaultProps: function(){
    return {
      //设置默认props
    }
  }
})
//新语法方式
class Component {
  //es7定义方式
  static defaultProps = {}
}
//或者也可以在外面定义,es6/es7定义方式
Compnent.defaultProps = {}
```

### 实例化

实例化时，有以下方法会被调用（注意顺序，从上到下先后执行）

- `getInitialState`

设置state初始值，在这个方法中你已经可以访问到`this.props`。当然跟`getDefaultProps`一样只适合`React.createClass`使用。使用ES6初始化state方法如下：

```jsx
//React.createClass方式
React.createClass({
  getInitialState: function(){
    return {
      //设置默认props
    }
  }
})
//es6 || es7
class Component extends React.Component{
  constructor(){
    this.state = {
      render: true,
    }
  }
}
```

- `componentWillMount`

改方法会在组件首次渲染之前调用，这个是在render方法调用前可修改state的最后一次机会。这个方法很少用到。

- `render`

这个方法以后大家都应该会很熟悉，JSX通过这里，解析成对应的`虚拟DOM`，渲染成最终效果。格式大致如下：

```jsx
class Component extends React.Component{
  render(){
	return (
		<div></div>
	)
  }
}
```

- `componentDidMount`

这个方法在首次真实的DOM渲染后调用（仅此一次）当我们需要访问真实的DOM时，这个方法就经常用到。如何访问真实的DOM这里就不想说了。当我们需要请求外部接口数据，一般都在这里处理。

### 存在期

实例化后，当`props`或者`state`发生变化时，下面方法依次被调用：

- `componentWillReceiveProps`

没当我们通过父组件更新子组件props时（这个也是唯一途径），这个方法就会被调用。

```jsx
componentWillReceiveProps(nextProps){}
```

- `shouldComponentUpdate`

字面意思，是否应该更新组件，默认返回true。当返回false时，后期函数就不会调用，组件不会在次渲染。

```jsx
shouldComponentUpdate(nextProps,nextState){}
```

- componentWillUpdate

字面意思组件将会更新，`props`和`state`改变后必调用。

- `render`

跟实例化时的render一样，不多说

- componentDidUpdate

这个方法在更新真实的DOM成功后调用，当我们需要访问真实的DOM时，这个方法就也经常用到。

### 销毁期

销毁阶段，只有一个函数被调用：

- `componentWillUnmount`

没当组件使用完成，这个组件就必须从DOM中销毁，此时该方法就会被调用。当我们在组件中使用了setInterval，那我们就需要在这个方法中调用clearTimeout。

## stateless function（无状态函数）

这是一个特殊的组件写法，一般组件都是使用`React.createClass`或者ES6的class方式来编写的。无状态函数就是直接一个函数直接返回组件（当然包括嵌套的）。

```jsx
function HelloMessage(props) {
  return <div>Hello {props.name}</div>;
}
HelloMessage.propTypes = {
  name: React.PropTypes.string
}
HelloMessage.defaultProps = {
  name: 'John Doe'
}
ReactDOM.render(<HelloMessage name="Sebastian" />, mountNode);
```

和平常的的组件区别是：

- 没有`state`
- 没有生命周期函数

## 复合组件

复合组件，简单说就是多个JSX（理论上你可以嵌套无数个，你可以试试，我不会说你2B的）标签嵌套使用。如

```jsx
<div>
	<span></span>
</div>
```

使用React非常好的地方就是，只要你的组件写的好，就像用html标签一样，用起来非常顺手。在React中你可以复合构造出大而复杂的组件，如下拉框、视频播放器等。这里先不编写例子，因为还需要大量用到下面的知识。

## 参考文章

[An Introduction to Life Cycle Events in React.js](https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js-aa3796ad85aa#.pmi9akipj)