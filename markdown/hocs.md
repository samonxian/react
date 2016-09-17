# 高阶组件

> minins将死，ES6的Class不对其进行支持,HOC就是解决办法。

那什么是高级组件？首先你得先了解请求ES6中的`class`只是`语法糖`，本质还是`原型继承`。能够更好的进行说明，我们将不会修改`组件`的代码。而是通过提供一些能够包裹`组件`的`组件`， 并通过一些额外的功能来增强`组件`。这样的`组件`我们称之为高阶组件（Higher-Order Components）。

ES7中的新特性`decorator(装饰器)`就是使用高阶组件模式（不过有点稍微不一样），`transform-decorators-legacy`是目前babel插件转换`decorator`的，可以研究下。下面看下如何实现React的PureRender功能（高阶组件和decorator一起讲解）。

`PureRenderDecorator`,decorator其实就是一个高阶组件。

```jsx
import _ from 'lodash';

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    const keyA = keysA[i];

    if (objA[keyA] === objB[keyA]) {
      continue;
    }

    // special diff with Array or Object
    if (_.isArray(objA[keyA])) {
      if (!_.isArray(objB[keyA]) || objA[keyA].length !== objB[keyA].length) {
        return false;
      } else if (!_.isEqual(objA[keyA], objB[keyA])) {
        return false;
      }
    } else if (_.isPlainObject(objA[keyA])) {
      if (!_.isPlainObject(objB[keyA]) || !_.isEqual(objA[keyA], objB[keyA])) {
        return false;
      }
    } else if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}


function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

function shouldComponentUpdate(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState);
}
/* eslint-disable no-param-reassign */
function pureRenderDecorator(component) {
  //覆盖了component中的shouldComponentUpdate方法
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  return component;//Decorator不用返回,直接使用高阶组件需要return
}
/*****
*使用ES6 class 语法糖如下，decorator的没试过，decorator请使用上面的，不要return
*let pureRenderDecorator = component => class {
*  constructor(props) {
*    super(props);
*    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
*  }
*  render(){
*	var Component = component;//自定义组件使用时要大写
*   return (
*		<Component {...this.props}/>
*	)
*  }
*}
******/
export { shallowEqual };
export default pureRenderDecorator;
```

如何使用？假设要使用的组件是**Test**

## 直接使用

```jsx
import React from 'react';
import { pureRenderDecorator } from "./pureRenderDecorator";

class Test extends React.Component {
    // component code here
}
export default pureRenderDecorator(Test)
```

## 通过`decorator`

```jsx
import React from 'react';
import { pureRenderDecorator } from "./pureRenderDecorator";

@pureRenderDecorator
export default class Test extends React.Component {
    // component code here
}
```