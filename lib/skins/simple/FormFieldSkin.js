'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormFieldSkin = undefined;

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormFieldSkin = exports.FormFieldSkin = function FormFieldSkin(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)([props.className, props.theme[props.themeId].root, props.disabled ? props.theme[props.themeId].disabled : null, props.error ? props.theme[props.themeId].errored : null])
    },
    props.error && _react2.default.createElement(
      'div',
      { className: props.theme[props.themeId].error },
      props.error
    ),
    props.label && _react2.default.createElement(
      'label',
      {
        role: 'presentation',
        'aria-hidden': true,
        className: props.theme[props.themeId].label,
        onClick: props.focusChild
      },
      props.label
    ),
    _react2.default.createElement(
      'div',
      { className: props.theme[props.themeId].inputWrapper },
      props.render((0, _omit3.default)(props, ['themeId']))
    )
  );
};
//# sourceMappingURL=FormFieldSkin.js.map