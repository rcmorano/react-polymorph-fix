'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonSpinnerSkin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// external libraries


// internal components & skins


// internal utility functions


// constants


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _LoadingSpinner = require('../../components/LoadingSpinner');

var _LoadingSpinnerSkin = require('./LoadingSpinnerSkin');

var _props = require('../../utils/props');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonSpinnerSkin = exports.ButtonSpinnerSkin = function ButtonSpinnerSkin(props) {
  var className = props.className,
      disabled = props.disabled,
      label = props.label,
      loading = props.loading,
      themeId = props.themeId;

  var buttonTheme = props.theme[themeId];
  var spinnerTheme = props.theme[_components.IDENTIFIERS.LOADING_SPINNER];

  var renderLoadingSpinner = function renderLoadingSpinner() {
    return _react2.default.createElement(_LoadingSpinner.LoadingSpinner, {
      skin: _LoadingSpinnerSkin.LoadingSpinnerSkin,
      theme: spinnerTheme
    });
  };

  return _react2.default.createElement(
    'button',
    _extends({}, (0, _props.pickDOMProps)(props), {
      className: (0, _classnames2.default)([className, buttonTheme.root, disabled ? buttonTheme.disabled : null])
    }),
    loading ? renderLoadingSpinner() : label
  );
};
//# sourceMappingURL=ButtonSpinnerSkin.js.map