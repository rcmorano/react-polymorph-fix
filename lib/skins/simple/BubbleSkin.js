'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BubbleSkin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _props = require('../../utils/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// external libraries


// internal utility functions


var BubbleSkin = exports.BubbleSkin = function BubbleSkin(props) {
  var _ref;

  var arrowRelativeToTip = props.arrowRelativeToTip,
      theme = props.theme,
      themeId = props.themeId;


  return _react2.default.createElement(
    'div',
    _extends({
      ref: props.rootRef
    }, (0, _props.pickDOMProps)(props), {
      className: (0, _classnames2.default)([props.className, theme[themeId].root, props.isOpeningUpward ? theme[themeId].openUpward : null, props.isTransparent ? theme[themeId].transparent : null, props.isFloating ? theme[themeId].isFloating : null, props.isHidden ? theme[themeId].isHidden : null]),
      style: props.position && (_ref = {}, _defineProperty(_ref, props.isOpeningUpward ? 'bottom' : 'top', props.position.positionY), _defineProperty(_ref, 'left', props.position.positionX), _defineProperty(_ref, 'width', props.position.width), _ref)
    }),
    _react2.default.createElement(
      'div',
      { className: theme[themeId].bubble, 'data-bubble-container': true },
      props.children,
      arrowRelativeToTip && _react2.default.createElement('span', { className: theme[themeId].arrow, 'data-bubble-arrow': true })
    ),
    !arrowRelativeToTip && _react2.default.createElement('span', { className: theme[themeId].arrow, 'data-bubble-arrow': true })
  );
};
//# sourceMappingURL=BubbleSkin.js.map