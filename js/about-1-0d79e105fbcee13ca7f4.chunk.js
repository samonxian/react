webpackJsonp([1],{318:function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function o(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(319),c=o(l),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=function g(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:g(o,t,n)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(n)},p=n(1),d=o(p),h=n(320),y=o(h),b=n(163),v=n(305),m=(r(v),function(e){function t(e){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return u(t,e),s(t,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"dataAdapter",value:function(){return{}}},{key:"events",value:function(){return{}}},{key:"render",value:function(){f(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"render",this).call(this);this.props.targetProps;return d["default"].createElement("div",{className:"about"},d["default"].createElement(c["default"],{message:r2fn.t("这是一个关于页面！"),type:"info",showIcon:!0}))}}]),t}(y["default"])),O=(0,b.connect)(function(e){return{targetProps:e.about}})(m);O.defaultProps=Object.assign({},y["default"].defaultProps,{title:r2fn.t("关于"),breadcrumb:[{label:r2fn.t("关于")}]}),e.exports=O},319:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var c,s,f=n(1),p=r(f),d=n(30),h=r(d),y=n(271),b=r(y),v=n(283),m=r(v),O=n(281),g=r(O),j=(s=c=function(e){function t(n){i(this,t);var r=u(this,e.call(this,n));return r.handleClose=function(e){e.preventDefault();var t=h["default"].findDOMNode(r);t.style.height=t.offsetHeight+"px",t.style.height=t.offsetHeight+"px",r.setState({closing:!1}),r.props.onClose(e)},r.animationEnd=function(){r.setState({closed:!0,closing:!0})},r.state={closing:!0,closed:!1},r}return l(t,e),t.prototype.render=function(){var e,t=this.props,n=t.closable,r=t.description,o=t.type,i=t.prefixCls,u=t.message,l=t.closeText,c=t.showIcon,s="";switch(o){case"success":s="check-circle";break;case"info":s="info-circle";break;case"error":s="cross-circle";break;case"warning":s="exclamation-circle";break;default:s="default"}r&&(s+="-o");var f=(0,g["default"])((e={},a(e,i,!0),a(e,i+"-"+o,!0),a(e,i+"-close",!this.state.closing),a(e,i+"-with-description",!!r),a(e,i+"-no-icon",!c),e));return l&&(n=!0),this.state.closed?null:p["default"].createElement(b["default"],{component:"",showProp:"data-show",transitionName:i+"-slide-up",onEnd:this.animationEnd},p["default"].createElement("div",{"data-show":this.state.closing,className:f},c?p["default"].createElement(m["default"],{className:"ant-alert-icon",type:s}):null,p["default"].createElement("span",{className:i+"-message"},u),p["default"].createElement("span",{className:i+"-description"},r),n?p["default"].createElement("a",{onClick:this.handleClose,className:i+"-close-icon"},l||p["default"].createElement(m["default"],{type:"cross"})):null))},t}(p["default"].Component),c.defaultProps={prefixCls:"ant-alert",showIcon:!1,onClose:function(){},type:"info"},s);t["default"]=j,e.exports=t["default"]},320:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=n(283),l=r(u),c=n(321),s=r(c),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=function j(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:j(o,t,n)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(n)},d=n(1),h=r(d),y=n(324),b=r(y),v=n(187),m=s["default"],O=r2ActionCreator,g=function(e){function t(e){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),f(t,[{key:"createBreadcrumb",value:function(){if(this.props&&this.props.children){var e=this.props.children.props.breadcrumb;if(e){var t=this.props.children.props;this.breadcrumb=h["default"].createElement(m,{className:"breadcrumb"},h["default"].createElement(m.Item,null,h["default"].createElement(v.Link,{to:this.props.homeLink.link},this.props.homeLink.label)),e.map(function(e,n){if(e.link){var r,o;return r="[object Function]"==Object.prototype.toString.apply(e.link)?e.link(t):e.link,o="[object Function]"==Object.prototype.toString.apply(e.label)?e.label(t):e.label,h["default"].createElement(m.Item,{key:n},h["default"].createElement(v.Link,{to:r},o))}return h["default"].createElement(m.Item,{key:n},e.label)}))}else this.breadcrumb=""}}},{key:"handleInputState",value:function(e){var t=this;return{onChange:function(n){var r={};n.target?"checkbox"==n.target.type?n.target.checked?(r[e]=n.target.value,t.setState(r)):(r[e]=null,t.setState(r)):(r[e]=n.target.value,t.setState(r)):(r[e]=n,t.setState(r))},value:this.state[e]}}},{key:"handleInputProps",value:function(e){var t=this;return{onChange:function(n){n.target?"checkbox"==n.target.type?n.target.checked?t.props.dispatch(O.inputAction(e,n.target.value)):t.props.dispatch(O.inputAction(e,null)):t.props.dispatch(O.inputAction(e,n.target.value)):t.props.dispatch(O.inputAction(e,n))},value:t.props.formInput[e]}}},{key:"render",value:function(){p(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"render",this).call(this),this.createBreadcrumb()}}]),t}(b["default"]);g.defaultProps={layout:"page/layout",titleSffix:r2Common.suffixTitle,homeLink:{label:h["default"].createElement(l["default"],{type:"home"}),link:"/"}},e.exports=g},321:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(322),a=r(o),i=n(323),u=r(i);a["default"].Item=u["default"],t["default"]=a["default"],e.exports=t["default"]},322:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var l,c,s=n(1),f=r(s),p=n(323),d=r(p),h=function(e,t,n){if(!e)return null;var r=Object.keys(n).join("|"),o=e.replace(new RegExp(":("+r+")","g"),function(e,t){return n[t]||e});return f["default"].createElement("span",null,o)},y=(c=l=function(e){function t(){return a(this,t),i(this,e.apply(this,arguments))}return u(t,e),t.prototype.render=function(){var e=void 0,t=this.props,n=t.separator,r=t.prefixCls,o=t.routes,a=t.params,i=t.children,u=t.linkRender,l=t.nameRender;return o&&o.length>0?!function(){var t=[],r=o.length-1;e=o.map(function(e,o){e.path=e.path||"";var i=e.path.replace(/^\//,"");Object.keys(a).forEach(function(e){i=i.replace(":"+e,a[e])}),i&&t.push(i);var c=l(e.breadcrumbName,e,a);if(c){var s=o===r?c:u("/"+t.join("/"),c,t);return f["default"].createElement(d["default"],{separator:n,key:e.breadcrumbName||o},s)}return null})}():e=f["default"].Children.map(i,function(e,t){return(0,s.cloneElement)(e,{separator:n,key:t})}),f["default"].createElement("div",{className:r},e)},t}(f["default"].Component),l.defaultProps={prefixCls:"ant-breadcrumb",separator:"/",linkRender:function(e,t){return f["default"].createElement("a",{href:"#"+e},t)},nameRender:h},l.propTypes={prefixCls:f["default"].PropTypes.string,separator:f["default"].PropTypes.oneOfType([f["default"].PropTypes.string,f["default"].PropTypes.element]),routes:f["default"].PropTypes.array,params:f["default"].PropTypes.object,linkRender:f["default"].PropTypes.func,nameRender:f["default"].PropTypes.func},c);t["default"]=y,e.exports=t["default"]},323:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var c,s,f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},p=n(1),d=r(p),h=(s=c=function(e){function t(){return i(this,t),u(this,e.apply(this,arguments))}return l(t,e),t.prototype.render=function(){var e=this.props,t=e.prefixCls,n=e.separator,r=e.children,o=a(e,["prefixCls","separator","children"]),i=void 0;return i="href"in this.props?d["default"].createElement("a",f({className:t+"-link"},o),r):d["default"].createElement("span",f({className:t+"-link"},o),r),d["default"].createElement("span",null,i,d["default"].createElement("span",{className:t+"-separator"},n))},t}(d["default"].Component),c.defaultProps={prefixCls:"ant-breadcrumb",separator:"/"},c.propTypes={prefixCls:d["default"].PropTypes.string,separator:d["default"].PropTypes.oneOfType([d["default"].PropTypes.string,d["default"].PropTypes.element]),href:d["default"].PropTypes.string},s);t["default"]=h,e.exports=t["default"]},324:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),c=r(l),s=n(253),f=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n.bindFunctions(),e&&e.title&&(document.title=e.title+e.titleSffix),n}return i(t,e),u(t,[{key:"shouldComponentUpdate",value:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=this.props||{},r=this.state||{};if(Object.keys(n).length!==Object.keys(e).length||Object.keys(r).length!==Object.keys(t).length)return!0;for(var o in e)if(n[o]!==e[o]||!(0,s.is)(n[o],e[o]))return!0;for(var a in t)if(r[a]!==t[a]||!(0,s.is)(r[a],t[a]))return!0;return!1}},{key:"bindFunctions",value:function(){this.dataAdapter&&(Object.assign(this,this.dataAdapter()),this.dataAdapter=null),this.events&&(Object.assign(this,this.events()),this.events=null),this.actions&&(Object.assign(this,this.actions()),this.actions=null)}},{key:"render",value:function(){}}]),t}(c["default"].Component);e.exports=f}});