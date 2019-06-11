'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextAreaSkin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// external libraries


// components


// skins


// import utility functions


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FormField = require('../../components/FormField');

var _FormFieldSkin = require('./FormFieldSkin');

var _props = require('../../utils/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextAreaSkin = exports.TextAreaSkin = function TextAreaSkin(props) {
  var theme = props.theme,
      themeId = props.themeId;

  return _react2.default.createElement(_FormField.FormField, {
    className: props.className,
    disabled: props.disabled,
    label: props.label,
    error: props.error,
    inputRef: props.textareaRef,
    skin: _FormFieldSkin.FormFieldSkin,
    render: function render() {
      return _react2.default.createElement('textarea', _extends({
        ref: props.textareaRef
      }, (0, _props.pickDOMProps)(props), {
        className: (0, _classnames2.default)([theme[themeId].textarea, props.disabled ? theme[themeId].disabled : null, props.error ? theme[themeId].errored : null])
      }));
    }
  });
};
//# sourceMappingURL=TextAreaSkin.js.map