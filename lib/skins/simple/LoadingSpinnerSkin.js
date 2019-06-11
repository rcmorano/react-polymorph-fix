'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingSpinnerSkin = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingSpinnerSkin = exports.LoadingSpinnerSkin = function LoadingSpinnerSkin(props) {
  var big = props.big,
      className = props.className,
      themeId = props.themeId,
      visible = props.visible;

  var theme = props.theme[themeId];
  var size = big ? theme.big : theme.small;

  return visible ? _react2.default.createElement('div', { className: (0, _classnames2.default)([className, theme.root, size]) }) : null;
};

// external libraries
//# sourceMappingURL=LoadingSpinnerSkin.js.map