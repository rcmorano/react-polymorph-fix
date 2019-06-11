'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxSkin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// external libraries


// internal utility functions


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _props = require('../../utils/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxSkin = exports.CheckboxSkin = function CheckboxSkin(props) {
  return _react2.default.createElement(
    'div',
    {
      role: 'presentation',
      'aria-hidden': true,
      className: (0, _classnames2.default)([props.className, props.theme[props.themeId].root, props.disabled ? props.theme[props.themeId].disabled : null, props.checked ? props.theme[props.themeId].checked : null]),
      onClick: function onClick(event) {
        if (!props.disabled && props.onChange) {
          props.onChange(!props.checked, event);
        }
      }
    },
    _react2.default.createElement('input', _extends({}, (0, _props.pickDOMProps)(props), {
      className: props.theme[props.themeId].input,
      type: 'checkbox'
    })),
    _react2.default.createElement('div', {
      className: (0, _classnames2.default)([props.theme[props.themeId].check, props.checked ? props.theme[props.themeId].checked : null])
    }),
    props.label && _react2.default.createElement(
      'label',
      { className: props.theme[props.themeId].label },
      props.label
    )
  );
};
//# sourceMappingURL=CheckboxSkin.js.map