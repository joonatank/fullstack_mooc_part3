(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(13),u=t.n(l),o=t(2),c=t(3),i=t.n(c),m="https://fathomless-shore-94502.herokuapp.com/api/persons",s=function(){return i.a.get(m)},d=function(e){return i.a.post(m,e)},f=function(e,n){return i.a.put("".concat(m,"/").concat(e),n)},b=function(e){return i.a.delete("".concat(m,"/").concat(e))},h=(t(36),function(e){var n=e.msg,t=e.look;return null===n||""===n?null:r.a.createElement("div",{className:t},n)}),p=function(e){var n=e.filter,t=e.filterChangeCb;return r.a.createElement("p",null,"filter shown with : ",r.a.createElement("input",{value:n,onChange:t}))},E=function(e){var n=e.person,t=e.delCb;return r.a.createElement("p",null,n.name," ",n.number,r.a.createElement("button",{onClick:t.bind(void 0,n._id)},"delete"))},v=function(e){var n=e.persons,t=e.filter,a=e.delCb,l=n.filter(function(e){return 0===t.length||e.name.includes(t)}).map(function(e){return r.a.createElement(E,{key:e._id,person:e,delCb:a})});return r.a.createElement("div",null,r.a.createElement("h2",null,"Numbers"),l)},g=function(e){var n=e.name,t=e.number,a=e.handleNameChangeCb,l=e.handleNumberChangeCb,u=e.addPersonCb;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:u},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:a}),r.a.createElement("br",null),"number : ",r.a.createElement("input",{value:t,onChange:l})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},C=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],l=n[1],u=Object(a.useState)(""),c=Object(o.a)(u,2),i=c[0],m=c[1],E=Object(a.useState)(""),C=Object(o.a)(E,2),j=C[0],w=C[1],O=Object(a.useState)(""),k=Object(o.a)(O,2),S=k[0],N=k[1],_=Object(a.useState)(null),y=Object(o.a)(_,2),P=y[0],A=y[1],D=Object(a.useState)(null),J=Object(o.a)(D,2),T=J[0],x=J[1];Object(a.useEffect)(function(){s().then(function(e){var n=e.data;l(n)})},[i]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(h,{msg:P,look:"status"}),r.a.createElement(h,{msg:T,look:"error"}),r.a.createElement(p,{filter:S,filterChangeCb:function(e){N(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(g,{name:i,number:j,handleNameChangeCb:function(e){m(e.target.value)},handleNumberChangeCb:function(e){w(e.target.value)},addPersonCb:function(e){e.preventDefault();var n=t.filter(function(e){return e.name===i}),a={name:i,number:j},r=null,l="";if(0!==n.length){var u=n[0]._id;window.confirm("Change ".concat(a.name," number instead?"))&&(r=f(u,a),l="Changed")}else r=d(a),l="Added";r.then(function(e){m(""),w(""),A("".concat(l," person ").concat(a.name)),setTimeout(function(){return A(null)},5e3)}).catch(function(e){console.log(e.response.data.error),x(e.response.data.error),setTimeout(function(){return x(null)},5e3)})}}),r.a.createElement(v,{persons:t,filter:S,delCb:function(e){var n=t.filter(function(n){return n._id===e})[0];console.log("deleting ".concat(e)),window.confirm("Delete ".concat(n.name,"?"))&&(b(e),l(t.filter(function(n){return n._id!==e})))}}))};u.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.8fb30ea9.chunk.js.map