const nameComponent = /*#__PURE__*/React.createElement("div", {
  id: "myName"
}, /*#__PURE__*/React.createElement("h2", {
  id: "name_comp"
}, "OM SHELKE"));
const pictureComponent = /*#__PURE__*/React.createElement("div", {
  id: "myPicture"
}, /*#__PURE__*/React.createElement("img", {
  id: "picture_comp",
  src: "./image.jpg"
}));
const introComponent = /*#__PURE__*/React.createElement("div", {
  id: "myIntro"
}, /*#__PURE__*/React.createElement("p", {
  id: "intro_comp"
}, "Completed bachelor's degree in computer engineering from SPPU (formerly Pune University). Worked as a SOC analyst for 1.8 years. I am intrigued by cyber security operations which paved my path for master's in CS with specialization in cyber security. Always looking out for opportunities to fulfil my cravings to learn, embrace emerging technology."));
const buttonComponent = /*#__PURE__*/React.createElement("div", {
  id: "myButton"
}, /*#__PURE__*/React.createElement("a", {
  href: "https://github.com/OmShelke05"
}, /*#__PURE__*/React.createElement("button", {
  id: "button_comp"
}, "VIEW MY GITHUB REPO")));
ReactDOM.render(nameComponent, document.getElementById('name'));
ReactDOM.render(pictureComponent, document.getElementById('picture'));
ReactDOM.render(introComponent, document.getElementById('introduction'));
ReactDOM.render(buttonComponent, document.getElementById('button'));