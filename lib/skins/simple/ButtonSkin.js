'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonSkin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// external libraries


// internal utility functions


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _props = require('../../utils/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonSkin = exports.ButtonSkin = function ButtonSkin(props) {
  return _react2.default.createElement(
    'button',
    _extends({}, (0, _props.pickDOMProps)(props), {
      className: (0, _classnames2.default)([props.className, props.theme[props.themeId].root, props.disabled ? props.theme[props.themeId].disabled : null])
    }),
    props.label
  );
};
//# sourceMappingURL=ButtonSkin.js.map