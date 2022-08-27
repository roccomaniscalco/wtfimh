"use strict";

var _ink = require("ink");

var _inkBigText = _interopRequireDefault(require("ink-big-text"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Title = () => {
  return /*#__PURE__*/_react.default.createElement(_inkBigText.default, {
    text: "WTFIMH",
    colors: ["system", "candy"]
  });
};

(0, _ink.render)( /*#__PURE__*/_react.default.createElement(Title, null));
