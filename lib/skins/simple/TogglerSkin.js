'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TogglerSkin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// external libraries


// import utility functions


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _props = require('../../utils/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TogglerSkin = exports.TogglerSkin = function TogglerSkin(props) {
  var theme = props.theme,
      themeId = props.themeId;

  return _react2.default.createElement(
    'div',
    {
      role: 'presentation',
      'aria-hidden': true,
      className: (0, _classnames2.default)([props.className, theme[themeId].root, props.disabled ? theme[themeId].disabled : null]),
      onClick: function onClick(event) {
        if (!props.disabled && props.onChange) {
          props.onChange(!props.checked, event);
        }
      }
    },
    _react2.default.createElement('input', _extends({}, (0, _props.pickDOMProps)(props), {
      className: theme[themeId].input,
      readOnly: true,
      type: 'checkbox'
    })),
    _react2.default.createElement(
      'div',
      { className: theme[themeId].toggler },
      _react2.default.createElement(
        'span',
        {
          className: (0, _classnames2.default)([theme[themeId].label, props.checked ? theme[themeId].checked : null])
        },
        props.labelLeft
      ),
      _react2.default.createElement(
        'span',
        {
          className: (0, _classnames2.default)([theme[themeId].label, props.checked ? null : theme[themeId].checked])
        },
        props.labelRight
      )
    )
  );
};
//# sourceMappingURL=TogglerSkin.js.map