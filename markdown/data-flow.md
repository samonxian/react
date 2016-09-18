# 数据流和沟通

本章会讲关于React的单向数据流和组件之间沟通方式。

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

## 参考文章

- [ReactJS组件间沟通的一些方法](http://www.alloyteam.com/2016/01/some-methods-of-reactjs-communication-between-components/)
- [React 数据流管理架构之 Redux 介绍](http://www.alloyteam.com/2015/09/react-redux/)

