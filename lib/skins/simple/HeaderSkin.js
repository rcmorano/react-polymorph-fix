'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderSkin = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var HeaderSkin = exports.HeaderSkin = function HeaderSkin(props) {
  var children = props.children,
      className = props.className,
      inlineStyles = props.inlineStyles,
      theme = props.theme;

  var themeClasses = Object.values(theme);

  return _react2.default.createElement(
    'header',
    { className: (0, _classnames2.default)([className].concat(_toConsumableArray(themeClasses))), style: inlineStyles },
    children
  );
};
//# sourceMappingURL=HeaderSkin.js.map