'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipSkin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// external libraries


// components


// skins


// internal utility functions


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Bubble = require('../../components/Bubble');

var _BubbleSkin = require('./BubbleSkin');

var _props = require('../../utils/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TooltipSkin = exports.TooltipSkin = function TooltipSkin(props) {
  var theme = props.theme,
      themeId = props.themeId;

  return _react2.default.createElement(
    'span',
    _extends({}, (0, _props.pickDOMProps)(props), {
      className: (0, _classnames2.default)([props.className, theme[themeId].root])
    }),
    _react2.default.createElement(
      _Bubble.Bubble,
      {
        className: (0, _classnames2.default)([theme[themeId].bubble, props.isAligningRight ? theme[themeId].alignRight : theme[themeId].alignLeft, props.isBounded ? null : theme[themeId].nowrap]),
        theme: theme,
        isOpeningUpward: props.isOpeningUpward,
        skin: _BubbleSkin.BubbleSkin,
        isTransparent: props.isTransparent,
        arrowRelativeToTip: props.arrowRelativeToTip
      },
      props.tip
    ),
    props.children
  );
};
//# sourceMappingURL=TooltipSkin.js.map