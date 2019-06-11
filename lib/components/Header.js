'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = undefined;

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _pickBy2 = require('lodash/pickBy');

var _pickBy3 = _interopRequireDefault(_pickBy2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('./HOC/withTheme');

var _themes = require('../utils/themes');

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// utility functions


// constants


var HeaderBase = function (_Component) {
  _inherits(HeaderBase, _Component);

  // define static properties
  function HeaderBase(props) {
    _classCallCheck(this, HeaderBase);

    var _this = _possibleConstructorReturn(this, (HeaderBase.__proto__ || Object.getPrototypeOf(HeaderBase)).call(this, props));

    _initialiseProps.call(_this);

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API)
    };
    return _this;
  }

  _createClass(HeaderBase, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          skin = _props.skin,
          context = _props.context,
          styleProps = _objectWithoutProperties(_props, ['children', 'className', 'skin', 'context']);

      var HeaderSkin = skin || context.skins[_.IDENTIFIERS.HEADER];
      var reducedTheme = this._assembleHeaderTheme(styleProps);
      var inlineStyles = this._assembleInlineStyles(styleProps);

      return _react2.default.createElement(
        HeaderSkin,
        {
          className: className,
          inlineStyles: inlineStyles,
          theme: reducedTheme
        },
        children
      );
    }
  }]);

  return HeaderBase;
}(_react.Component);

HeaderBase.displayName = 'Header';
HeaderBase.defaultProps = {
  context: (0, _withTheme.createEmptyContext)(),
  theme: null,
  themeId: _.IDENTIFIERS.HEADER,
  themeOverrides: {}
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._assembleInlineStyles = function (_ref) {
    var center = _ref.center,
        lowerCase = _ref.lowerCase,
        left = _ref.left,
        right = _ref.right,
        upperCase = _ref.upperCase;

    var inlineStyles = {};
    var textAlign = (0, _pickBy3.default)({ center: center, left: left, right: right });
    var textTransform = (0, _pickBy3.default)({ lowerCase: lowerCase, upperCase: upperCase });

    if (!(0, _isEmpty3.default)(textAlign)) {
      inlineStyles.textAlign = Object.keys(textAlign)[0];
    }

    if (!(0, _isEmpty3.default)(textTransform)) {
      inlineStyles.textTransform = Object.keys(textTransform)[0];
    }

    return inlineStyles;
  };

  this._assembleHeaderTheme = function (styleProps) {
    var activeClasses = _this2._getActiveClasses(styleProps);
    var theme = _this2.state.composedTheme[_this2.props.themeId];

    return activeClasses.reduce(function (reducedTheme, activeClass) {
      if (activeClass && Object.hasOwnProperty.call(theme, activeClass)) {
        reducedTheme[activeClass] = theme[activeClass];
      }
      return reducedTheme;
    }, {});
  };

  this._getActiveFont = function (_ref2) {
    var light = _ref2.light,
        medium = _ref2.medium,
        regular = _ref2.regular,
        thin = _ref2.thin,
        bold = _ref2.bold;

    var fontProps = (0, _pickBy3.default)({ light: light, medium: medium, regular: regular, thin: thin, bold: bold });
    if ((0, _isEmpty3.default)(fontProps)) {
      return;
    }
    // returns the first active font if more than 1 is passed
    return Object.keys(fontProps)[0];
  };

  this._getActiveTheme = function (_ref3) {
    var h1 = _ref3.h1,
        h2 = _ref3.h2,
        h3 = _ref3.h3,
        h4 = _ref3.h4;

    var themeProps = (0, _pickBy3.default)({ h1: h1, h2: h2, h3: h3, h4: h4 });
    if ((0, _isEmpty3.default)(themeProps)) {
      return;
    }
    // returns the first active theme if more than 1 is passed
    return Object.keys(themeProps)[0];
  };

  this._getActiveClasses = function (styleProps) {
    var activeClasses = ['header'];
    var activeTheme = _this2._getActiveTheme(styleProps);
    var activeFont = _this2._getActiveFont(styleProps);

    if (activeTheme) {
      return [].concat(activeClasses, [activeTheme]);
    }
    if (activeFont) {
      return [].concat(activeClasses, [activeFont]);
    }

    return [].concat(activeClasses, [activeTheme, activeFont]).filter(function (val) {
      return val;
    });
  };
};

var Header = exports.Header = (0, _withTheme.withTheme)(HeaderBase);
//# sourceMappingURL=Header.js.map