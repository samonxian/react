# 数据流和沟通

本章会讲关于React的单向数据流、沟通相关的属性和组件之间沟通方式。

## 单向数据流

React组件之间的沟通是数据流是单向的。单向数据流在React中简单说就**数据从父组件传递到子组件**（通过`props`），不会有数据从子组件中传给父组件这种情况。在一个多组件构成的应用中，每一个父组件负责管理`state`并且通过`props`（数据就可以在这里）传递给下一层组件。请记住在Reac本身只提供两种数据传递方式，请看后面的**组件之间沟通**。

React组件主要负责接收、传递（父组件传递数据到子组件）和渲染数据。如果顶层的某个`props`改变了，React会重渲染所有的子节点（性能优化方向）。严格意义上React只提供，也强烈建议使用这种数据交流方式。

新手可能有写看不太明白，没关系，往后看基础知识点，一步一步来，过段时间再回来看。下面举个列子说明单向数据流是如何运作的。

```jsx
//自定义组件首字母要大写
var Parent = React.createClass({
  getInitialState(){
     return {
       text: "快点！",
     }
  },
  //react事件绑定，基础知识往后看
  transformData: function(e){
    this.setState({
      text: "我来了！",
    })
  },
  render: function() {
    return (
      <div>
        <button onClick={this.transformData}>向子组件传递数据</button>
        <Child text={this.state.text}/>
      </div>
    );
  }
});
var Child = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.text}
      </div>
    );
  }
});
```

请看codepen例子：[单向数据流说明例子](https://codepen.io/nange/pen/vXNqOX)。

## props

`props`是property的缩写，可以理解为HTML标签的attribute，可以自定义。在当前组件访问`props`，使用`this.props`。请把`props`当做只读的（不可以使用`this.props`直接修改props），`props`是用于整个组件树中传递数据和配置。在什么情况下可以使用`props`，请看[组件生命周期](https://segmentfault.com/a/1190000006792687)

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

## 组件之间沟通

组件沟通因为React的单向数据流方式会有所限制，请记住在React**本身**只提供两种数据传递方式（如果还有其他方式请告诉我）：

- 通过`props`
- 通过React的上下文`this.context`

当然这样还是有其他方式的，但是React本身没有支持，不过有挺多优秀的第三方类库。

### 通过props

#### 父子组件沟通

这种方式是最常见的，也是最简单的。

- 父组件更新组件状态

  父组件更新子组件状态，通过传递`props`，就可以了。

- 子组件更新父组件状态

  这种情况需要父组件传递回调函数给子组件，子组件调用触发即可。

代码示例：

```jsx
class Child extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
        {this.props.text}
        <br />
        <button onClick={this.props.refreshParent}>
            更新父组件
        </button>
      </div>
    )
  }
}
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  refreshChild(){
    return (e)=>{
      this.setState({
        childText: "父组件沟通子组件成功",
      })
    }
  }
  refreshParent(){
    this.setState({
      parentText: "子组件沟通父组件成功",
    })
  }
  render(){
    return (
      <div>
        <h1>父子组件沟通</h1>
        <button onClick={this.refreshChild()} >
            更新子组件
        </button>
        <Child 
          text={this.state.childText || "子组件未更新"} 
          refreshParent={this.refreshParent.bind(this)}
        />
        {this.state.parentText || "父组件未更新"}
      </div>
    )
  }
}
```

codepen例子[React组件之父子组件沟通](https://codepen.io/nange/pen/KgwRJk) 。

#### 兄弟组件沟通

当两个组件有相同的父组件时，就称为兄弟组件（堂兄也算的）。按照React单向数据流方式，我们需要借助父组件进行传递，通过父组件回调函数改变兄弟组件的`props`。

```jsx
class Brother1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
        <button onClick={this.props.refresh}>
            更新兄弟组件
        </button>
      </div>
    )
  }
}
class Brother2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
         {this.props.text || "兄弟组件未更新"}
      </div>
    )
  }
}
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  refresh(){
    return (e)=>{
      this.setState({
        text: "兄弟组件沟通成功",
      })
    }
  }
  render(){
    return (
      <div>
        <h2>兄弟组件沟通</h2>
        <Brother1 refresh={this.refresh()}/>
        <Brother2 text={this.state.text}/>
      </div>
    )
  }
}
```

codepen例子：[React组件之兄弟组件沟通](https://codepen.io/nange/pen/xEbJVg)。

### this.context

但是如果组件层次太深（如下图），上面的兄弟组件沟通方式就效率低了（不建议组件层次太深）。

![](http://cdn.alloyteam.com/wp-content/uploads/2016/01/share-parent-components-278x300.png)

React提供了一种上下文方式（挺方便的），可以让子组件直接访问祖先的数据或函数，无需从祖先组件一层层地传递数据到子组件中。

```jsx
class Brother1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    
    return (
      <div>
        <button onClick={this.context.refresh}>
            更新兄弟组件
        </button>
      </div>
    )
  }
}
Brother1.contextTypes = {
  refresh: React.PropTypes.any
}
class Brother2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    return (
      <div>
         {this.context.text || "兄弟组件未更新"}
      </div>
    )
  }
}
Brother2.contextTypes = {
  text: React.PropTypes.any
}
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  getChildContext(){
    return {
      refresh: this.refresh(),
        text: this.state.text,
      }
    }
  
  refresh(){
    return (e)=>{
      this.setState({
        text: "兄弟组件沟通成功",
      })
    }
  }
  render(){
    return (
      <div>
        <h2>兄弟组件沟通</h2>
        <Brother1 />
        <Brother2 text={this.state.text}/>
      </div>
    )
  }
}
Parent.childContextTypes = {
  refresh: React.PropTypes.any,
  text: React.PropTypes.any,
}
```

codepen例子：[React组件之兄弟组件沟通2](https://codepen.io/nange/pen/VKYBAX)

### 全局事件

> For communication between two components that don't have a parent-child relationship, you can set up your own global event system. Subscribe to events in `componentDidMount()`, unsubscribe in `componentWillUnmount()`, and call `setState()` when you receive an event.[Flux](https://facebook.github.io/flux/) pattern is one of the possible ways to arrange this.

官网中提到可以使用全局事件来进行组件间的通信，官网推荐Flux（Facebook官方出的），还有Relay、Redux、trandux等第三方类库。这些框架思想都一致，都是统一管理组件state变化情况，达到**数据可控**目的。本人使用了Redux，建议要会其中一种。对于EventEmitter或PostalJS这类的第三方库是不建议使用的，这类全局事件框架并没有统一管理组件数据变化，用多了会导致数据流不可控。

这里就不细说，请选择其中一种类库，深入学习下。

### 组件沟通总结

简单的组件交流我们可以使用上面非全局事件的简单方式，但是当项目复杂，组件间层次越来越深，上面的交流方式就不太合适（当然还是要用到的，简单的交流）。强烈建议使用Flux、Relay、Redux、trandux等类库其中一种，这些类库不只适合React，像Angular等都可以使用。

## 组件的一些特殊属性

### 属性[key](https://facebook.github.io/react/docs/reconciliation.html)

`key`的作用是为了在React元素变更后，**达到最低限度的DOM变更**。

`key`这个属性不是给用户自己用的，而是给 React 自己用的。如果我们动态地创建 React 元素，而且 React 元素内包含数量或顺序不确定的子元素时，我们就需要提供 key 这个特殊的属性，而且在兄弟组件中必须是唯一的。要不然会打印报警：

```jsx
Warning: Each child in an array or iterator should have a unique "key" prop. 
Check the render method of `App`. 
See https://fb.me/react-warning-keys for more information.
```

看下codepen例子：[组件的一些特殊属性之key](https://codepen.io/nange/pen/ZpQyWw)

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

### 属性[ref](https://facebook.github.io/react/docs/more-about-refs-zh-CN.html)

`ref`是个非常好用的属性，并且在不断完善，最新版本比之前的旧版本多了一些功能。通过`ref`属性可以用来获取到原生DOM。具体情况下面的**浏览器DOM操作**。

### 属性dangerouslySetInnerHTML

如果想在 JSX 表达式中显示 HTML 实体，可以会遇到二次转义的问题，因为 React 默认会转义所有字符串，为了防止各种 XSS 攻击。`dangerouslySetInnerHTML`允许你插入原生的html（不经过React转义），这种情况就可能带有XSS攻击的可能性就会提高，而且通过此种方法插入的html不会算入虚拟DOM进行对比。

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

codepen例子：[组件的一些特殊属性之dangerouslySetInnerHTML](https://codepen.io/nange/pen/kkPmwr)

## 参考文章

- [ReactJS组件间沟通的一些方法](http://www.alloyteam.com/2016/01/some-methods-of-reactjs-communication-between-components/)
- [React 数据流管理架构之 Redux 介绍](http://www.alloyteam.com/2015/09/react-redux/)

