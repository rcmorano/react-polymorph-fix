'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gutter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('./Base');

var _withTheme = require('../HOC/withTheme');

var _themes = require('../../utils/themes');

var _props2 = require('../../utils/props');

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components


// utility functions


// constants


var GutterBase = function (_Component) {
  _inherits(GutterBase, _Component);

  // define static properties
  function GutterBase(props) {
    _classCallCheck(this, GutterBase);

    var _this = _possibleConstructorReturn(this, (GutterBase.__proto__ || Object.getPrototypeOf(GutterBase)).call(this, props));

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API)
    };
    return _this;
  }

  _createClass(GutterBase, [{
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
          themeId = _props.themeId,
          inlinePadding = _props.padding;

      var padding = inlinePadding ? (0, _props2.numberToPx)(inlinePadding) : null;
      var theme = this.state.composedTheme[themeId];

      return _react2.default.createElement(
        _Base.Base,
        {
          activeClasses: ['gutter'],
          className: className,
          inlineStyles: { padding: padding },
          stylesToAdd: theme
        },
        children
      );
    }
  }]);

  return GutterBase;
}(_react.Component);

GutterBase.displayName = 'Gutter';
GutterBase.defaultProps = {
  context: (0, _withTheme.createEmptyContext)(),
  theme: null,
  themeId: _.IDENTIFIERS.GUTTER,
  themeOverrides: {}
};
var Gutter = exports.Gutter = (0, _withTheme.withTheme)(GutterBase);
//# sourceMappingURL=Gutter.js.map