# 浏览器DOM操作

使用React的大多数情况下，你是无需进行真实的浏览器DOM操作的。但是也有一些特殊情况的，例如使用了第三方类库（自己有一套操作DOM的方法）。不过本人是不建议使用这些第三方类库的，如Jquery，如果使用类库进行了过多的DOM操作会打乱React的`虚拟DOM`，引起不明原因的性能问题。获取原生底层DOM有以下方法：

## 通过Refs

只要是React生成的DOM节点我们都称为受控DOM节点。这些节点是要在组件渲染后才能获取到的。React提高了一种方式来获取，通过设置组件`ref`属性，并通过`ref`属性获取到原生的DOM。

> Refs 是唯一一个可靠的完成这件事的实际方式。

`ref`有以下两种方式获取原生DOM：

## 通过原生的浏览器DOM获取方式

这个是非常有限制的，我们需要知道设置了`class`或`id`的DOM是否已经渲染了，为了可维护性，建议使用`refs`。下面举个小例子：

```jsx
//自定义组件首字母要大写
var App = React.createClass({
  componentDidMount: function(){
    //需要在组件首次渲染完成后才可访问this.refs获取到对应的值
    var input = document.getElementById("input");
    console.debug(input)
    input.focus();
  },
  render: function() {
    return (
      <div>
        <input id="input" />
      </div>
    );
  }
});
```

codepen例子：[通过原生的浏览器DOM获取方式](https://codepen.io/nange/pen/ORrOpx?target=_blank)