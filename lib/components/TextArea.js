'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextArea = undefined;

var _flow2 = require('lodash/flow');

var _flow3 = _interopRequireDefault(_flow2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createRef = require('create-react-ref/lib/createRef');

var _createRef2 = _interopRequireDefault(_createRef);

var _withTheme = require('./HOC/withTheme');

var _themes = require('../utils/themes');

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// external libraries


// internal utility functions


// import constants


var TextAreaBase = function (_Component) {
  _inherits(TextAreaBase, _Component);

  // define static properties
  function TextAreaBase(props) {
    _classCallCheck(this, TextAreaBase);

    // define ref
    var _this = _possibleConstructorReturn(this, (TextAreaBase.__proto__ || Object.getPrototypeOf(TextAreaBase)).call(this, props));

    _this.focus = function () {
      var textareaElement = _this.textareaElement;

      if (!textareaElement.current) return;
      textareaElement.current.focus();
    };

    _this.onChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled;

      if (disabled) return;

      if (onChange) onChange(_this._processValue(event.target.value), event);
    };

    _this._setError = function (error) {
      return _this.setState({ error: error });
    };

    _this.textareaElement = (0, _createRef2.default)();

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API),
      error: ''
    };
    return _this;
  }
  // declare ref types


  _createClass(TextAreaBase, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          autoResize = _props.autoResize,
          autoFocus = _props.autoFocus;


      if (autoResize) {
        window.addEventListener('resize', this._handleAutoresize);
        this._handleAutoresize();
      }

      if (autoFocus) {
        this.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.autoResize && nextProps.autoResize) {
        window.addEventListener('resize', this._handleAutoresize);
      } else if (this.props.autoResize && !nextProps.autoResize) {
        window.removeEventListener('resize', this._handleAutoresize);
      }

      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.autoResize) this._handleAutoresize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.autoResize) {
        window.removeEventListener('resize', this._handleAutoresize);
      }
    }
  }, {
    key: '_processValue',
    value: function _processValue(value) {
      return (0, _flow3.default)([this._enforceStringValue, this._enforceMaxLength, this._enforceMinLength]).call(this, value);
    }
  }, {
    key: '_enforceStringValue',
    value: function _enforceStringValue(value) {
      if (!(0, _isString3.default)(value)) {
        throw new Error('Values passed to TextArea::onChange must be strings');
      }
      return value;
    }
  }, {
    key: '_enforceMaxLength',
    value: function _enforceMaxLength(value) {
      var maxLength = this.props.maxLength;

      var isTooLong = maxLength != null && value.length > maxLength;
      return isTooLong ? value.substring(0, maxLength) : value;
    }
  }, {
    key: '_enforceMinLength',
    value: function _enforceMinLength(value) {
      var minLength = this.props.minLength;

      var isTooShort = minLength != null && value.length < minLength;

      if (isTooShort) {
        this._setError('Please enter a valid input');
      } else if (this.state.error !== '') {
        this._setError('');
      }

      return value;
    }
  }, {
    key: '_handleAutoresize',
    value: function _handleAutoresize() {
      var textareaElement = this.textareaElement;


      if (!textareaElement.current) return;

      // compute the height difference between inner height and outer height
      var style = getComputedStyle(textareaElement.current, '');
      var heightOffset = style.boxSizing === 'content-box' ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)) : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

      // resize the input to its content size
      textareaElement.current.style.height = 'auto';
      textareaElement.current.style.height = textareaElement.current.scrollHeight + heightOffset + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      // destructuring props ensures only the "...rest" get passed down
      var _props2 = this.props,
          skin = _props2.skin,
          theme = _props2.theme,
          themeOverrides = _props2.themeOverrides,
          onChange = _props2.onChange,
          error = _props2.error,
          context = _props2.context,
          autoFocus = _props2.autoFocus,
          autoResize = _props2.autoResize,
          rest = _objectWithoutProperties(_props2, ['skin', 'theme', 'themeOverrides', 'onChange', 'error', 'context', 'autoFocus', 'autoResize']);

      var TextAreaSkin = skin || context.skins[_.IDENTIFIERS.TEXT_AREA];

      return _react2.default.createElement(TextAreaSkin, _extends({
        error: error || this.state.error,
        onChange: this.onChange,
        textareaRef: this.textareaElement,
        theme: this.state.composedTheme
      }, rest));
    }
  }]);

  return TextAreaBase;
}(_react.Component);

TextAreaBase.displayName = 'TextArea';
TextAreaBase.defaultProps = {
  autoFocus: false,
  autoResize: true,
  context: (0, _withTheme.createEmptyContext)(),
  theme: null,
  themeId: _.IDENTIFIERS.TEXT_AREA,
  themeOverrides: {},
  value: ''
};
var TextArea = exports.TextArea = (0, _withTheme.withTheme)(TextAreaBase);
//# sourceMappingURL=TextArea.js.map