'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = undefined;

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ThemeContext = require('./HOC/ThemeContext');

var _API = require('../themes/API');

var _themes = require('../utils/themes');

var _props2 = require('../utils/props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// contains default theme and context provider


// external libraries


// imports the Root Theme API object which specifies the shape
// of a complete theme for every component in this library, used in this.composeLibraryTheme


// internal utility functions


var ThemeProvider = exports.ThemeProvider = function (_Component) {
  _inherits(ThemeProvider, _Component);

  // define static properties
  function ThemeProvider(props) {
    _classCallCheck(this, ThemeProvider);

    var _this = _possibleConstructorReturn(this, (ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).call(this, props));

    _initialiseProps.call(_this);

    var theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      theme: _this._composeLibraryTheme(theme, themeOverrides)
    };
    return _this;
  }

  _createClass(ThemeProvider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var _props = this.props,
          theme = _props.theme,
          themeOverrides = _props.themeOverrides;
      var nextTheme = nextProps.theme,
          nextOverrides = nextProps.themeOverrides;


      if (!(0, _isEqual3.default)(theme, nextTheme) || !(0, _isEqual3.default)(themeOverrides, nextOverrides)) {
        this.setState(function () {
          return {
            theme: _this2._composeLibraryTheme(nextTheme, nextOverrides)
          };
        });
      }
    }

    // composeLibraryTheme returns a single obj containing theme definitions
    // for every component in the library. Every key on the returned obj is named
    // in conjunction with a component in the library and each key's value is structured
    // to contain the css definitions for each element in that component.
    // Which is just a string via CSS-Modules. Looks like this:
    // {
    //   button: { root: '', disabled: '' },
    //   input: { input: '', disabled: '', error: '' },
    //   formField: { root: '', label: '', error: '' },
    //   ... and so on, creating a complete theme for the library,
    //  }

  }, {
    key: 'render',
    value: function render() {
      var theme = this.state.theme;
      var skins = this.props.skins;

      var providerState = { skins: skins, theme: theme, ROOT_THEME_API: _API.ROOT_THEME_API };

      return _react2.default.createElement(
        _ThemeContext.ThemeContext.Provider,
        { value: providerState },
        this.props.children
      );
    }
  }]);

  return ThemeProvider;
}(_react.Component);

ThemeProvider.displayName = 'ThemeProvider';
ThemeProvider.defaultProps = {
  skins: {},
  theme: {},
  themeOverrides: {}
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._composeLibraryTheme = function (theme, themeOverrides) {
    // if themeOverrides is empty, no need for composition
    if ((0, _isEmpty3.default)(themeOverrides)) {
      return theme;
    }

    // final object to be returned
    var composedTheme = {};

    for (var componentName in _API.ROOT_THEME_API) {
      // check if ROOT_THEME_API contains the key of componentName
      if ((0, _props2.hasProperty)(_API.ROOT_THEME_API, componentName)) {

        // check if theme contains a key of componentName
        if ((0, _props2.hasProperty)(theme, componentName)) {
          // add componentName as a key to final return obj
          composedTheme[componentName] = theme[componentName];
        }

        // also check if themeOverrides contains the key componentName
        if ((0, _props2.hasProperty)(themeOverrides, componentName)) {
          // compose theme styles with user's themeOverrides
          composedTheme[componentName] = _this3._applyThemeOverrides(theme[componentName], themeOverrides[componentName], _API.ROOT_THEME_API[componentName]);
        }
      }
    }
    return composedTheme;
  };

  this._applyThemeOverrides = function (componentTheme, componentThemeOverrides, componentThemeAPI) {
    // Return componentTheme if there are no overrides provided
    if ((0, _isEmpty3.default)(componentThemeOverrides)) {
      return componentTheme;
    }

    // final composed theme obj to be returned at end
    var composedComponentTheme = (0, _cloneDeep3.default)(componentThemeAPI);

    for (var className in componentThemeAPI) {
      if ((0, _props2.hasProperty)(componentThemeAPI, className)) {
        if ((0, _props2.hasProperty)(componentTheme, className)) {
          (0, _themes.appendToProperty)(composedComponentTheme, className, componentTheme[className]);
        }

        if ((0, _props2.hasProperty)(componentThemeOverrides, className)) {
          (0, _themes.appendToProperty)(composedComponentTheme, className, componentThemeOverrides[className]);
        }
      }
    }
    return composedComponentTheme;
  };
};
//# sourceMappingURL=ThemeProvider.js.map