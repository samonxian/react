# 组件

组件（Component）是对数据和方法的简单封装。随着前端开发复杂度的日益提升，组件化开发应运而生。React的每个组件都可以用JSX来表示，React构建页面的基础单元就是React组件。

## 组件类型

组件分两种类型：

- 原生HTML组件

  原生HTML组件是不用定义的，可以直接使用的，所有组件跟html标签一一对应。如：

  ```jsx
  <div></div>
  <ul><li></li></ul>
  ```

- 自定义组件

  自定义组件，我们可以封装各种功能。**在JSX中使用自定义组件首字母必须大写**。

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

## 组件创建方式

有三种方式，可以创建React组件，下面就分别使用三种方式创建第一个React组件。

### React.createClass

JSX解析使用Babel。

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

请看codepen例子：[编写第一个组件](https://codepen.io/nange/pen/ALWkyP?target=_blank)。

### ES62015 class

ES6学习请移步[ECMAScript 6入门](http://es6.ruanyifeng.com/?target=_blank)

```jsx
//自定义组件首字母要大写
class HelloWorld extends React.Component {
  constructor(props){
    super(props);
  }
  render: function() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}
```

### 无状态函数

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

## props

`props`是property的缩写，可以理解为HTML标签的attribute，可以自定义。在当前组件访问`props`，使用`this.props`。请把`props`当做只读的（不可以使用`this.props`直接修改props），`props`是用于整个组件树中传递数据和配置。在什么情况下可以使用`props`，请看[组件生命周期](#组件生命周期)

```jsx
class Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
        <div title={this.props.title}></div>
    )
  }
}
<Component title="test"/>//title就传进去了
```

## PropTypes

`PropsTypes`是React中用来定义`props`的类型，不符合定义好的类型会报错。建议可复用组件要使用prop验证！接着上面的列子设置`PropsTypes`如下：

```jsx
class Component {
  ...
}
Component.PropsType = {
  title: React.PropTypes.string,
}
```

`React.PropTypes` 提供很多验证器 (validator) 来验证传入数据的有效性。官方定义的验证器如下，不是使用ES6语法。

```jsx
React.createClass({
  propTypes: {
    // 可以声明 prop 为指定的 JS 基本类型。默认
    // 情况下，这些 prop 都是可传可不传的。
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,
    optionalSymbol: React.PropTypes.symbol,

    // 所有可以被渲染的对象：数字，
    // 字符串，DOM 元素或包含这些类型的数组(or fragment) 。
    optionalNode: React.PropTypes.node,

    // React 元素
    optionalElement: React.PropTypes.element,

    // 你同样可以断言一个 prop 是一个类的实例。
    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),

    // 你可以用 enum 的方式
    // 确保你的 prop 被限定为指定值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // 指定的多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // 特定形状参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // 你可以在任意东西后面加上 `isRequired`
    // 来确保 如果 prop 没有提供 就会显示一个警告。
    requiredFunc: React.PropTypes.func.isRequired,

    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,

    // 你可以自定义一个验证器。如果验证失败需要返回一个 Error 对象。
    // 不要直接使用 `console.warn` 或抛异常，
    // 因为这在 `oneOfType` 里不起作用。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});
```

## defaultProps

如何设置组件默认的`props`？

```jsx
//React提供的crateClass创建方式
var Component = React.createClass({
  getDefaultProps(){
    return {
      //这里设置defaultProps
    }
  }
})
//ES6
class Component {
  ...
}
Component.defaultProps = {}
//ES7 stage-0
class Component {
  static defaultProps = {
    
  }
  ...
}
```

## state

每个组件都有属于自己的`state`，`state`和`props`的区别在于前者之只存在于组件内部，只能从当前组件调用`this.setState`修改state值（不可以直接修改`this.state`）。一般我们更新子组件都是通过改变`state`值，更新新子组件的`props`值从而达到更新。

那如何设置默认state?

```jsx
//React提供的crateClass创建方式
var Component = React.createClass({
  getInitialState(){
    return {
      //这里设置初始state值
    }
  }
})
//ES6 && ES7
class Component {
  constructor(){
    this.state = {}//在ES6中的构造函数中初始化，可以之直接赋值，在其他方法中，只能使用this.setState
  }
  ...
}
```

## props和state使用方式

尽可能使用`props`当做数据源，`state`用来存放状态值（简单的数据），如复选框、下拉菜单等。

## 组件生命周期

组件会随着组件的`props`和`state`改变而发生变化，它的DOM也会有相应的变化。

> 一个组件就是一个状态机：对于特定的输入，它总会返回一致的输出。

React组件提供了`生命周期`的`钩子函数`去响应组件不同时刻的状态，组件的`生命周期`本人总结如下：

- 立即执行期
- 实例化
- 存在期
- 销毁期

`钩子函数`是我们重点关注的地方，下面来详细了解下`生命周期`下的`钩子函数`调用顺序和作用。每个`生命周期`阶段调用的`钩子函数`会略有不同。下面的图片或许对你有帮助。

![组件 生命周期 ](../../react/img/component-01.png)

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

## 复合组件

复合组件，简单说就是多个JSX（理论上你可以嵌套无数个，你可以试试，我不会说你2B的）标签嵌套使用。如

```jsx
<div>
	<span></span>
</div>
```

使用React非常好的地方就是，只要你的组件写的好，就像用html标签一样，用起来非常顺手。在React中你可以复合构造出大而复杂的组件，如下拉框、视频播放器等。这里先不编写例子，因为还需要大量用到下面的知识。

## 组件的一些特殊属性

### key属性

`key`的作用是为了在React元素变更后，**达到最低限度的DOM变更**。

`key`这个属性不是给用户自己用的，而是给 React 自己用的。如果我们动态地创建 React 元素，而且 React 元素内包含数量或顺序不确定的子元素时，我们就需要提供 key 这个特殊的属性，而且在兄弟组件中必须是唯一的。要不然会打印报警：

```jsx
Warning: Each child in an array or iterator should have a unique "key" prop. 
Check the render method of `App`. 
See https://fb.me/react-warning-keys for more information.
```

看下codepen例子：[组件的一些特殊属性之key](https://codepen.io/nange/pen/ZpQyWw?target=_blank)

```jsx
//自定义组件首字母要大写
var App = React.createClass({
  render: function() {
    var data = [1,2,3,4,5];
    return (
      <ul>
        {
          data.map(function(v,k){
            return (
              <li key={k}>{v}</li>
            )
          })
        }
      </ul>
    );
  }
});
```

### ref属性

这个属性有时候挺有用的，通过这个属性可以获取到当前组件的实例和原生DOM对象。没有必要的时候，官方是不建议使用这个属性的。可以通过`this.refs`获取都当前组件（父组件）中所有设置了`ref`的子组件实例。通过设置`ref`属性后获取到的组件实例，会因为组件类别有些区别。详细请看后续的[浏览器DOM操作](/react/dom)，这里不详说。`ref`有以下两种类型：

#### ref之string属性

举个例子，打开页面input光标自动聚焦。

```jsx
//自定义组件首字母要大写
var App = React.createClass({
  componentDidMount: function(){
    this.refs.input.focus();
  },
  render: function() {
    return (
      <div>
        <input ref="input"/>
      </div>
    );
  }
});
```

请看codepen列子：[组件的一些特殊属性之ref（string）](https://codepen.io/nange/pen/vXKqxB?target=_blank)

#### ref之callback属性

举个例子，打开页面input光标自动聚焦。

```jsx
//自定义组件首字母要大写
var App = React.createClass({
  componentDidMount: function(){
    //第三方的类库整合进来需要在这个生命周期函数中操作
  },
  focus: function(target){
    target.focus();
  },
  render: function() {
    return (
      <div>
        <input ref={this.focus}/>
      </div>
    );
  }
});
```

请看codepen列子：[组件的一些特殊属性之ref（callback）](https://codepen.io/nange/pen/WGAXvd?target=_blank)

不过也要注意几点：

- 需要组件渲染完成后才能使用`this.refs`获取到对应DOM，在render方法中就用不了
- `无状态函数`是没有`ref`属性的。

### dangerouslySetInnerHTML属性

为了防止各种 XSS 攻击， React 默认会转义所有字符串。如果想在 JSX 表达式中显示 HTML 实体，可以会遇到二次转义的问题。而使用此属性后插入的html没经过React处理，需要自行处理XSS防御。而且插入的html是脱离了React的控制的，跟React组件渲染完成后我们使用innerHTML自行插入html一样不会生成`虚拟DOM`。

如下面例子，就是经过了二次转义和没经过二次转义的区别：

```jsx
//自定义组件首字母要大写
var App = React.createClass({
  render: function() {
    var data = "&nbsp;我前面有一个空格,但是被二次转义了"
    var text = <div>{data}</div>
    var text2 = (
      <div>
        &nbsp;我前面有一个空格,没被二次转义，因为在这没使用JSX表达式
        （{String.fromCharCode(123)+String.fromCharCode(125)}）
      </div>
    )
    return (
      <div>
        {text}
        {text2}
      </div>
    );
  }
});
```

请看codepen列子：[组件的一些特殊属性之dangerouslySetInnerHTML](https://codepen.io/nange/pen/kkPmwr?target=_blank)

## 参考文章

- [An Introduction to Life Cycle Events in React.js](https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js-aa3796ad85aa#.pmi9akipj)
- [stateless function（无状态函数）](https://facebook.github.io/react/docs/reusable-components.html?target=_blank#stateless-functions)
- [key](https://facebook.github.io/react/docs/reconciliation.html?target=_blank)
- [ref](https://facebook.github.io/react/docs/more-about-refs-zh-CN.html?target=_blank)
- [dangerouslySetInnerHTML](https://facebook.github.io/react/tips/dangerously-set-inner-html.html?target=_blank)
- [JSX陷阱](https://facebook.github.io/react/docs/jsx-gotchas-zh-CN.html?target=_blank)

