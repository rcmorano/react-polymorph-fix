'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = undefined;

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

// $FlowFixMe


// utilities


// constants


var InputBase = function (_Component) {
  _inherits(InputBase, _Component);

  // define static properties
  function InputBase(props) {
    _classCallCheck(this, InputBase);

    // define ref
    var _this = _possibleConstructorReturn(this, (InputBase.__proto__ || Object.getPrototypeOf(InputBase)).call(this, props));

    _this.onChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled;

      if (disabled) return;

      if (onChange) onChange(_this._processValue(event.target.value), event);
    };

    _this.focus = function () {
      var inputElement = _this.inputElement;

      if (!inputElement.current) return;
      inputElement.current.focus();
    };

    _this._setError = function (error) {
      var setError = _this.props.setError;

      // checks for setError func from FormField component
      // if this Input instance is being used within the render function
      // of a FormField instance, the error field within FormField's local state
      // will be set

      if (setError) setError(error);
      _this.setState({ error: error });
    };

    _this.inputElement = (0, _createRef2.default)();

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


  _createClass(InputBase, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) this.focus();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
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
        throw new Error('Values passed to Input::onChange must be strings');
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
    key: 'render',
    value: function render() {
      // destructuring props ensures only the "...rest" get passed down
      var _props = this.props,
          skin = _props.skin,
          context = _props.context,
          theme = _props.theme,
          themeOverrides = _props.themeOverrides,
          onChange = _props.onChange,
          error = _props.error,
          maxLength = _props.maxLength,
          minLength = _props.minLength,
          setError = _props.setError,
          autoFocus = _props.autoFocus,
          rest = _objectWithoutProperties(_props, ['skin', 'context', 'theme', 'themeOverrides', 'onChange', 'error', 'maxLength', 'minLength', 'setError', 'autoFocus']);

      var InputSkin = skin || context.skins[_.IDENTIFIERS.INPUT];

      return _react2.default.createElement(InputSkin, _extends({
        error: error || this.state.error,
        onChange: this.onChange,
        inputRef: this.inputElement,
        theme: this.state.composedTheme
      }, rest));
    }
  }]);

  return InputBase;
}(_react.Component);

InputBase.displayName = 'Input';
InputBase.defaultProps = {
  autoFocus: false,
  context: (0, _withTheme.createEmptyContext)(),
  error: '',
  readOnly: false,
  theme: null,
  themeId: _.IDENTIFIERS.INPUT,
  themeOverrides: {},
  value: ''
};
var Input = exports.Input = (0, _withTheme.withTheme)(InputBase);
//# sourceMappingURL=Input.js.map