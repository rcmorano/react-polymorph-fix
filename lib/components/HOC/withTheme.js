'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmptyContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.withTheme = withTheme;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _forwardRef = require('create-react-ref/lib/forwardRef');

var _forwardRef2 = _interopRequireDefault(_forwardRef);

var _ThemeContext = require('./ThemeContext');

var _props = require('../../utils/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createEmptyContext = exports.createEmptyContext = function createEmptyContext() {
  return {
    skins: {},
    theme: {},
    ROOT_THEME_API: {}
  };
};

// withTheme is a HOC that takes a Component as a parameter
// and returns that Component wrapped within ThemeContext.Consumer.
// Any additional props and refs are forwarded to the returned Component.
function withTheme(Component) {
  var WrappedComponent = void 0;

  if (process.env.NODE_ENV === 'test') {
    // wraps component in context only
    WrappedComponent = function WrappedComponent(props) {
      return _react2.default.createElement(
        _ThemeContext.ThemeContext.Consumer,
        null,
        function (context) {
          return _react2.default.createElement(Component, _extends({ context: context }, props));
        }
      );
    };
  } else {
    // wraps component in context AND forwardRef
    WrappedComponent = (0, _forwardRef2.default)(function (props, ref) {
      return _react2.default.createElement(
        _ThemeContext.ThemeContext.Consumer,
        null,
        function (context) {
          return _react2.default.createElement(Component, _extends({ context: context, ref: ref }, props));
        }
      );
    });
  }
  // create a new displayName for the wrapped component
  WrappedComponent.displayName = 'withTheme(' + (0, _props.getDisplayName)(Component) + ')';
  // Cast type to our desired custom component
  return WrappedComponent;
}
//# sourceMappingURL=withTheme.js.map