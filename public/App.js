"use strict";

// const element = (
//   <div title="Outer div">
//     <h1>Hello World</h1>
//   </div>
// );
//
// ReactDOM.render(element, document.getElementById('contents'))
var continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
var helloContinents = Array.from(continents, continent => "Hello ".concat(continent, "!"));
var message = helloContinents.join(' ');
var element = /*#__PURE__*/React.createElement("div", {
  title: "outer div"
}, /*#__PURE__*/React.createElement("h1", null, message));
ReactDOM.render(element, document.getElementById('contents'));