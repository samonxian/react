# 表单操作

表单是用户交互组要入口，表单组件如 `input`、`textarea` 、`select`状态是会因为用户而发生变化的。表单组件渲染一个初始值为 `Untitled` 的输入框。当用户改变输入框的值时，节点的 `value` 属性(*property*)将随之变化，但是 `node.getAttribute('value')` 还是会返回初始设置的值`Untitled`.与 HTML 不同，React 组件必须在任何时间点表现视图的状态，而不仅仅是在初始化时。比如在 React 中：

```jsx
render: function() {
	return <input type="text" name="title" value="Untitled" />;
}
```

由于这个方法描述了在任意时间点上的视图，那么文本输入框的值就应该始终为 `Untitled`。

React的表组件分为两种组件：

- 受控组件
- 不受控组件

## 受控组件

受控的表单组件的value是直接改不了的，需要使用`onChange` 事件监控用户输入来修改。看下面的例子，实现类Angular双向绑定数据功能（只要涉及到用户数据交互，基本都要用到双向数据绑定，单并不影响React的单向数据流，两码事）。

```jsx
//自定义组件首字母要大写
var App = React.createClass({
  componentDidMount: function(){
  },
  onChange: function(e){
    this.setState({
      value: e.target.value
    })
  },
  render: function() {
    return (
      <div>
        <h3>受控组件不使用onchange事件修改value</h3>
        <input value="不可变"/>
        <h3>受控组件使用onchange事件修改value</h3>
        <input value={this.state && this.state.value} onChange={this.onChange.bind(this)}/>
        <br />
        {this.state && this.state.value || "我会跟着input value改变而改变(双向数据绑定)"}
      </div>
    );
  }
});
```

codepen例子：[表单操作之双向数据绑定](https://codepen.io/nange/pen/PGGmQL?target=_blank)

## 不受控组件

不设置value值就是不受控组件：

```jsx
<input type="text" defaultValue="test"/>
<input type="checkbox" defaultChecked={true}/>
```

`defaultValue`和`defaultChecked`只适合在受控组件中使用。

## 表单组件与HTML标签不同点

所有表单组件都多了一个`defaultValue`属性，都通过value来设置表单值，改变表单值需要使用React的`onChange`事件。下面说下具体的各种表单组件与html表单特有的不同点。

### input

input类型为复选框和单选按钮时，React使用 `click` 事件代替 `change` 事件。在大多数情况下它们表现的如同预期，除了在`change` handler中调用`preventDefault`。`preventDefault` 阻止了浏览器视觉上更新输入，即使`checked`被触发。变通的方式是要么移除`preventDefault`的调用，要么把`checked` 的触发放在一个`setTimeout`里。

 `<input type="checkbox">` 和 `<input type="radio">`支持 `defaultChecked`。

### select

HTML 中 `` 通常使用 `` 的 `selected` 属性设置选中状态；React 为了更方便地控制组件，采用以下方式代替：

```jsx
<select value="B">
  <option value="A">Apple</option>
  <option value="B">Banana</option>
  <option value="C">Cranberry</option>
</select>
```

### textarea

对 HTML 而言，让开发者设置多行的值很容易。但是，由于 React 是 JavaScript，没有字符串限制，可以使用 `\n` 实现换行。简言之，React 已经有 `value`、`defaultValue` 属性，`` 组件的子节点扮演什么角色就有点模棱两可了。基于此， 设置 ``值时不应该使用子节点：

```jsx
{
  //正确用法(jsx注释应该这样用)
}
<textarea name="description" value="This is a description." />
{
  //反例：在 React 中不要这样使用！ (jsx注释应该这样用)
}
<textarea name="description">This is the description.</textarea>
```

## 参考文章

- [Forms](https://facebook.github.io/react/docs/forms.html?target=_blank)