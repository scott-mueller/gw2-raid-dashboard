(this["webpackJsonpgw2-raid-dashboard"]=this["webpackJsonpgw2-raid-dashboard"]||[]).push([[0],{37:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(14),o=n.n(a),s=n(13),i=n(19),u=n.n(i),l=n(24);function j(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t){return setTimeout((function(){return t({data:e})}),500)}))}var d=Object(s.b)("counter/fetchCount",function(){var e=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),b=Object(s.c)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}},extraReducers:function(e){e.addCase(d.pending,(function(e){e.status="loading"})).addCase(d.fulfilled,(function(e,t){e.status="idle",e.value+=t.payload}))}}),h=b.actions,x=h.increment,O=h.decrement,p=h.incrementByAmount,m=function(e){return e.counter.value},f=b.reducer,v=Object(s.a)({reducer:{counter:f}}),g=n(12);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var _=n(16),k=n(3),w=n.p+"static/media/logo.b2e5a01e.svg",A=n(26),N=n(9),C=n.n(N),y=n(1);function B(){var e=Object(g.c)(m),t=Object(g.b)(),n=Object(r.useState)("2"),c=Object(A.a)(n,2),a=c[0],o=c[1],s=Number(a)||0;return Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{className:C.a.row,children:[Object(y.jsx)("button",{className:C.a.button,"aria-label":"Decrement value",onClick:function(){return t(O())},children:"-"}),Object(y.jsx)("span",{className:C.a.value,children:e}),Object(y.jsx)("button",{className:C.a.button,"aria-label":"Increment value",onClick:function(){return t(x())},children:"+"})]}),Object(y.jsxs)("div",{className:C.a.row,children:[Object(y.jsx)("input",{className:C.a.textbox,"aria-label":"Set increment amount",value:a,onChange:function(e){return o(e.target.value)}}),Object(y.jsx)("button",{className:C.a.button,onClick:function(){return t(p(s))},children:"Add Amount"}),Object(y.jsx)("button",{className:C.a.asyncButton,onClick:function(){return t(d(s))},children:"Add Async"}),Object(y.jsx)("button",{className:C.a.button,onClick:function(){return t((e=s,function(t,n){m(n())%2===1&&t(p(e))}));var e},children:"Add If Odd"})]})]})}n(37);var R=function(){return Object(y.jsx)("div",{className:"App",children:Object(y.jsxs)("header",{className:"App-header",children:[Object(y.jsx)("img",{src:w,className:"App-logo",alt:"logo"}),Object(y.jsx)(B,{}),Object(y.jsx)("p",{children:"We did it!"}),Object(y.jsxs)("span",{children:[Object(y.jsx)("span",{children:"Learn "}),Object(y.jsx)("a",{className:"App-link",href:"https://reactjs.org/",target:"_blank",rel:"noopener noreferrer",children:"React"}),Object(y.jsx)("span",{children:", "}),Object(y.jsx)("a",{className:"App-link",href:"https://redux.js.org/",target:"_blank",rel:"noopener noreferrer",children:"Redux"}),Object(y.jsx)("span",{children:", "}),Object(y.jsx)("a",{className:"App-link",href:"https://redux-toolkit.js.org/",target:"_blank",rel:"noopener noreferrer",children:"Redux Toolkit"}),",",Object(y.jsx)("span",{children:" and "}),Object(y.jsx)("a",{className:"App-link",href:"https://react-redux.js.org/",target:"_blank",rel:"noopener noreferrer",children:"React Redux"})]})]})})},H=function(){return Object(y.jsx)("div",{children:Object(y.jsx)("p",{children:"Hello Collector"})})};function W(){return Object(y.jsx)(_.a,{children:Object(y.jsxs)("div",{children:[Object(y.jsxs)("ul",{children:[Object(y.jsx)("li",{children:Object(y.jsx)(_.b,{to:"/",children:"Home"})}),Object(y.jsx)("li",{children:Object(y.jsx)(_.b,{to:"/about",children:"About"})})]}),Object(y.jsx)("hr",{}),Object(y.jsx)(k.a,{exact:!0,path:"/",component:S}),Object(y.jsx)(k.a,{path:"/about",component:D}),Object(y.jsx)(k.a,{path:"/collector",children:Object(y.jsx)(H,{})}),Object(y.jsx)(k.a,{path:"/app",children:Object(y.jsx)(R,{})})]})})}var S=function(){return Object(y.jsx)("div",{children:Object(y.jsx)("h2",{children:"Home"})})},D=function(){return Object(y.jsx)("div",{children:Object(y.jsx)("h2",{children:"About"})})};o.a.render(Object(y.jsx)(c.a.StrictMode,{children:Object(y.jsx)(g.a,{store:v,children:Object(y.jsx)(W,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,n){e.exports={row:"Counter_row__qB-H1",value:"Counter_value__2-sRl",button:"Counter_button__3DWPw",textbox:"Counter_textbox__13qA1",asyncButton:"Counter_asyncButton__3Hket Counter_button__3DWPw"}}},[[39,1,2]]]);
//# sourceMappingURL=main.b3c5f9db.chunk.js.map