'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBarSkin = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgressBarSkin = exports.ProgressBarSkin = function ProgressBarSkin(props) {
  var className = props.className,
      label = props.label,
      progress = props.progress,
      themeId = props.themeId;

  var theme = props.theme[themeId];

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)([className, theme.track]) },
    _react2.default.createElement('div', { className: theme.progress, style: { width: progress + '%' } }),
    _react2.default.createElement(
      'div',
      { className: theme.label },
      progress === 100 && label ? label : null
    )
  );
};

// external libraries
//# sourceMappingURL=ProgressBarSkin.js.map