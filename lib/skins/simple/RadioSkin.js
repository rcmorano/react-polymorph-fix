'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioSkin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// external libraries


// internal utility functions


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _props = require('../../utils/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioSkin = exports.RadioSkin = function RadioSkin(props) {
  var theme = props.theme,
      themeId = props.themeId,
      className = props.className,
      disabled = props.disabled,
      selected = props.selected,
      onChange = props.onChange,
      label = props.label;

  return _react2.default.createElement(
    'div',
    {
      role: 'presentation',
      'aria-hidden': true,
      className: (0, _classnames2.default)([className, theme[themeId].root, disabled ? theme[themeId].disabled : null, selected ? theme[themeId].selected : null]),
      onClick: function onClick(event) {
        if (!disabled && onChange) {
          onChange(!selected, event);
        }
      }
    },
    _react2.default.createElement('input', _extends({}, (0, _props.pickDOMProps)(props), {
      className: theme[themeId].input,
      type: 'radio'
    })),
    _react2.default.createElement('div', {
      className: (0, _classnames2.default)([theme[themeId].circle, selected ? theme[themeId].selected : null])
    }),
    label ? _react2.default.createElement(
      'label',
      { className: theme[themeId].label },
      label
    ) : null
  );
};
//# sourceMappingURL=RadioSkin.js.map