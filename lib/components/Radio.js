'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

// internal utility functions


// import constants


var RadioBase = function (_Component) {
  _inherits(RadioBase, _Component);

  // define static properties
  function RadioBase(props) {
    _classCallCheck(this, RadioBase);

    var _this = _possibleConstructorReturn(this, (RadioBase.__proto__ || Object.getPrototypeOf(RadioBase)).call(this, props));

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API)
    };
    return _this;
  }

  _createClass(RadioBase, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      // destructuring props ensures only the "...rest" get passed down
      var _props = this.props,
          skin = _props.skin,
          theme = _props.theme,
          themeOverrides = _props.themeOverrides,
          context = _props.context,
          rest = _objectWithoutProperties(_props, ['skin', 'theme', 'themeOverrides', 'context']);

      var RadioSkin = skin || context.skins[_.IDENTIFIERS.RADIO];

      return _react2.default.createElement(RadioSkin, _extends({ theme: this.state.composedTheme }, rest));
    }
  }]);

  return RadioBase;
}(_react.Component);

RadioBase.displayName = 'Radio';
RadioBase.defaultProps = {
  context: (0, _withTheme.createEmptyContext)(),
  selected: false,
  theme: null,
  themeId: _.IDENTIFIERS.RADIO,
  themeOverrides: {}
};
var Radio = exports.Radio = (0, _withTheme.withTheme)(RadioBase);
//# sourceMappingURL=Radio.js.map