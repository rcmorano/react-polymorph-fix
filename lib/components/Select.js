'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createRef = require('create-react-ref/lib/createRef');

var _createRef2 = _interopRequireDefault(_createRef);

var _GlobalListeners = require('./HOC/GlobalListeners');

var _withTheme = require('./HOC/withTheme');

var _themes = require('../utils/themes');

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// internal components


// internal utility functions


// import constants


var SelectBase = function (_Component) {
  _inherits(SelectBase, _Component);

  // define static properties
  function SelectBase(props) {
    _classCallCheck(this, SelectBase);

    // define ref
    var _this = _possibleConstructorReturn(this, (SelectBase.__proto__ || Object.getPrototypeOf(SelectBase)).call(this, props));

    _this.focus = function () {
      return _this.toggleOpen();
    };

    _this.toggleOpen = function () {
      if (_this.state.isOpen && _this.optionsElement && _this.optionsElement.current) {
        // set Options scroll position to top on close
        _this.optionsElement.current.scrollTop = 0;
      }
      _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.toggleMouseLocation = function () {
      return _this.setState({ mouseIsOverOptions: !_this.state.mouseIsOverOptions });
    };

    _this.handleInputClick = function (event) {
      event.stopPropagation();
      event.preventDefault();

      var inputElement = _this.inputElement;

      if (inputElement.current && document.activeElement === inputElement.current) {
        inputElement.current.blur();
      }
      _this.toggleOpen();
    };

    _this.handleChange = function (option, event) {
      // check if the user passed an onChange handler and call it
      if (_this.props.onChange) _this.props.onChange(option.value, event);
      // onChange is called when an option is selected, so close options
      _this.toggleOpen();
    };

    _this.getSelectedOption = function () {
      var _this$props = _this.props,
          options = _this$props.options,
          value = _this$props.value,
          allowBlank = _this$props.allowBlank;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var option = _step.value;

          if (option.value === value) return option;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!allowBlank) return options[0];
    };

    _this.rootElement = (0, _createRef2.default)();
    _this.inputElement = (0, _createRef2.default)();
    _this.optionsElement = (0, _createRef2.default)();

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API),
      isOpen: false,
      mouseIsOverOptions: false
    };
    return _this;
  }
  // declare ref types


  _createClass(SelectBase, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // check for autoFocus of input element
      if (this.props.autoFocus) {
        return this.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }

    // ========= PUBLIC SKIN API =========

    // applying focus to the input element will
    // toggle options open because Select's input is read only

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // destructuring props ensures only the "...rest" get passed down
      var _props = this.props,
          skin = _props.skin,
          theme = _props.theme,
          themeOverrides = _props.themeOverrides,
          autoFocus = _props.autoFocus,
          context = _props.context,
          allowBlank = _props.allowBlank,
          rest = _objectWithoutProperties(_props, ['skin', 'theme', 'themeOverrides', 'autoFocus', 'context', 'allowBlank']);

      var SelectSkin = skin || context.skins[_.IDENTIFIERS.SELECT];

      return _react2.default.createElement(
        _GlobalListeners.GlobalListeners,
        {
          mouseIsOverOptions: this.state.mouseIsOverOptions,
          optionsIsOpen: this.state.isOpen,
          optionsIsOpeningUpward: this.props.isOpeningUpward,
          optionsRef: this.optionsElement,
          rootRef: this.rootElement,
          toggleOpen: this.toggleOpen
        },
        function (_ref) {
          var optionsMaxHeight = _ref.optionsMaxHeight;
          return _react2.default.createElement(SelectSkin, _extends({
            isOpen: _this2.state.isOpen,
            rootRef: _this2.rootElement,
            inputRef: _this2.inputElement,
            optionsRef: _this2.optionsElement,
            optionsMaxHeight: optionsMaxHeight,
            theme: _this2.state.composedTheme,
            getSelectedOption: _this2.getSelectedOption,
            handleInputClick: _this2.handleInputClick,
            handleChange: _this2.handleChange,
            toggleOpen: _this2.toggleOpen,
            toggleMouseLocation: _this2.toggleMouseLocation
          }, rest));
        }
      );
    }
  }]);

  return SelectBase;
}(_react.Component);

SelectBase.displayName = 'Select';
SelectBase.defaultProps = {
  allowBlank: true,
  autoFocus: false,
  context: (0, _withTheme.createEmptyContext)(),
  isOpeningUpward: false,
  options: [],
  theme: null,
  themeOverrides: {},
  themeId: _.IDENTIFIERS.SELECT,
  value: ''
};
var Select = exports.Select = (0, _withTheme.withTheme)(SelectBase);
//# sourceMappingURL=Select.js.map