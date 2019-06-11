'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContext = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactContext = require('create-react-context');

var _createReactContext2 = _interopRequireDefault(_createReactContext);

var _API = require('../../themes/API');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// components that are NOT directly nested within a ThemeProvider
// can access simple theme as "this.props.context.theme",
// same goes for "this.props.context.ROOT_THEME_API"
// if the user passes ThemeProvider a theme and/or ROOT_THEME_API,
// these default values are overwritten

// check to use context pollyfill or not
var createContext = void 0;

if (_react2.default.createContext) {
  // React module contains createContext method, no polyfill
  createContext = _react2.default.createContext;
} else {
  // use create-react-context polyfill
  createContext = _createReactContext2.default;
}

var defaultContext = {
  skins: {},
  theme: _API.ROOT_THEME_API,
  ROOT_THEME_API: _API.ROOT_THEME_API
};

var ThemeContext = exports.ThemeContext = createContext(defaultContext);
//# sourceMappingURL=ThemeContext.js.map