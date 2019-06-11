'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Options = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('./HOC/withTheme');

var _themes = require('../utils/themes');

var _props6 = require('../utils/props');

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// internal utility functions


// import constants


var OptionsBase = function (_Component) {
  _inherits(OptionsBase, _Component);

  // TODO: Does this get used? Don't think so.

  // define static properties
  function OptionsBase(props) {
    _classCallCheck(this, OptionsBase);

    var _this = _possibleConstructorReturn(this, (OptionsBase.__proto__ || Object.getPrototypeOf(OptionsBase)).call(this, props));

    _initialiseProps.call(_this);

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API),
      highlightedOptionIndex: 0
    };
    return _this;
  }
  // declare ref types


  _createClass(OptionsBase, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.isOpen) {
        document.addEventListener('keydown', this._handleKeyDown, false);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.isOpen && nextProps.isOpen) {
        document.addEventListener('keydown', this._handleKeyDown, false);
      } else if (this.props.isOpen && !nextProps.isOpen) {
        document.removeEventListener('keydown', this._handleKeyDown, false);
      }
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this._handleKeyDown, false);
    }

    // returns an object containing props, theme, and method handlers
    // associated with rendering this.props.options, the user can call
    // this in the body of the renderOptions function


    // ========= PRIVATE HELPERS =========

    // this needs to get passed to OptionsSkin and attached to each Option Li

  }, {
    key: 'render',
    value: function render() {
      // destructuring props ensures only the "...rest" get passed down
      var _props = this.props,
          skin = _props.skin,
          targetRef = _props.targetRef,
          theme = _props.theme,
          themeOverrides = _props.themeOverrides,
          onChange = _props.onChange,
          context = _props.context,
          optionsRef = _props.optionsRef,
          isOpen = _props.isOpen,
          rest = _objectWithoutProperties(_props, ['skin', 'targetRef', 'theme', 'themeOverrides', 'onChange', 'context', 'optionsRef', 'isOpen']);

      var _state = this.state,
          composedTheme = _state.composedTheme,
          highlightedOptionIndex = _state.highlightedOptionIndex;


      var OptionsSkin = skin || context.skins[_.IDENTIFIERS.OPTIONS];

      return _react2.default.createElement(OptionsSkin, _extends({
        getHighlightedOptionIndex: this.getHighlightedOptionIndex,
        getOptionProps: this.getOptionProps,
        handleClickOnOption: this.handleClickOnOption,
        highlightedOptionIndex: highlightedOptionIndex,
        isHighlightedOption: this.isHighlightedOption,
        isOpen: isOpen,
        isSelectedOption: this.isSelectedOption,
        optionsRef: optionsRef,
        setHighlightedOptionIndex: this.setHighlightedOptionIndex,
        targetRef: targetRef,
        theme: composedTheme
      }, rest));
    }
  }]);

  return OptionsBase;
}(_react.Component);

OptionsBase.displayName = 'Options';
OptionsBase.defaultProps = {
  context: (0, _withTheme.createEmptyContext)(),
  isOpen: false,
  isOpeningUpward: false,
  noResultsMessage: 'No results',
  options: [],
  resetOnClose: false,
  theme: null,
  themeId: _.IDENTIFIERS.OPTIONS,
  themeOverrides: {},
  toggleOpen: function toggleOpen() {}
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.close = function () {
    var _props2 = _this2.props,
        isOpen = _props2.isOpen,
        onClose = _props2.onClose,
        resetOnClose = _props2.resetOnClose,
        toggleOpen = _props2.toggleOpen;

    if (isOpen && toggleOpen) toggleOpen();
    _this2.setState({
      highlightedOptionIndex: resetOnClose ? 0 : _this2.state.highlightedOptionIndex
    });
    if (onClose) onClose();
  };

  this.getHighlightedOptionIndex = function () {
    // If nothing is higlighted, highlight selected option
    // In case nothing is selected, highlight first option
    var _props3 = _this2.props,
        options = _props3.options,
        isOpeningUpward = _props3.isOpeningUpward;

    var currentIndex = _this2.state.highlightedOptionIndex;
    var index = 0;

    if (currentIndex !== null) {
      index = currentIndex;
    }

    if (isOpeningUpward) return options.length - 1 - index;
    return index;
  };

  this.setHighlightedOptionIndex = function (optionIndex) {
    if (!_this2.isHighlightedOption(optionIndex) && _this2.isDisabledOption(optionIndex)) {
      _this2.setState({ highlightedOptionIndex: optionIndex });
    }
  };

  this.isSelectedOption = function (optionIndex) {
    var _props4 = _this2.props,
        options = _props4.options,
        isOpeningUpward = _props4.isOpeningUpward;

    var index = isOpeningUpward ? options.length - 1 - optionIndex : optionIndex;
    var option = options[index];
    return option && _this2.props.selectedOption === option;
  };

  this.isHighlightedOption = function (optionIndex) {
    return _this2.state.highlightedOptionIndex === optionIndex;
  };

  this.isDisabledOption = function (optionIndex) {
    var options = _this2.props.options;

    var option = options[optionIndex];
    return option && !option.isDisabled;
  };

  this.handleClickOnOption = function (option, event) {
    if (option) {
      if (option.isDisabled) return;
      if (_this2.props.onChange) _this2.props.onChange(option, event);
    }
    if (_this2.props.onBlur) _this2.props.onBlur(event);
    _this2.close();
  };

  this.getOptionProps = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _onClick = _ref.onClick,
        _onMouseEnter = _ref.onMouseEnter,
        rest = _objectWithoutProperties(_ref, ['onClick', 'onMouseEnter']);

    var _props5 = _this2.props,
        isOpen = _props5.isOpen,
        themeId = _props5.themeId,
        options = _props5.options,
        selectedOptions = _props5.selectedOptions;
    var composedTheme = _this2.state.composedTheme;
    var isHighlightedOption = _this2.isHighlightedOption,
        isDisabledOption = _this2.isDisabledOption,
        handleClickOnOption = _this2.handleClickOnOption,
        setHighlightedOptionIndex = _this2.setHighlightedOptionIndex;


    return _extends({
      options: options,
      selectedOptions: selectedOptions,
      isOpen: isOpen,
      isHighlightedOption: isHighlightedOption,
      isDisabledOption: isDisabledOption,
      theme: composedTheme[themeId],
      onClick: function onClick(option, event
      // the user's custom onClick event handler is composed with
      // the internal functionality of Options (this.handleClickOnOption)
      ) {
        return (0, _props6.composeFunctions)(_onClick, handleClickOnOption)(option, event);
      },
      onMouseEnter: function onMouseEnter(index, event
      // user's custom onMouseEnter is composed with this.setHighlightedOptionIndex
      ) {
        return (0, _props6.composeFunctions)(_onMouseEnter, setHighlightedOptionIndex)(index, event);
      }
    }, rest);
  };

  this._handleSelectionOnKeyDown = function (event) {
    var options = _this2.props.options;

    if (options.length) {
      var _isOpeningUpward = _this2.props.isOpeningUpward;

      var currentIndex = _this2.state.highlightedOptionIndex;
      var reverseIndex = options.length - 1 - currentIndex;
      var highlightedOption = options[_isOpeningUpward ? reverseIndex : currentIndex];
      _this2.handleClickOnOption(highlightedOption, event);
    } else {
      event.preventDefault();
    }
  };

  this._handleHighlightMove = function (currentIndex, direction) {
    var options = _this2.props.options;

    if (options.length) {
      var lowerIndexBound = 0;
      var upperIndexBound = options.length - 1;
      var newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

      // Make sure new index is within options bounds
      newIndex = Math.max(lowerIndexBound, Math.min(newIndex, upperIndexBound));

      if (options[newIndex].isDisabled) {
        // Try to jump over disabled options
        var canMoveUp = newIndex > lowerIndexBound;
        var canMoveDown = newIndex < upperIndexBound;
        if (direction === 'up' && canMoveUp || direction === 'down' && canMoveDown) {
          _this2._handleHighlightMove(newIndex, direction);
        }
      } else {
        _this2.setHighlightedOptionIndex(newIndex);
      }
    }
  };

  this._handleKeyDown = function (event) {
    var highlightOptionIndex = _this2.state.highlightedOptionIndex;
    switch (event.keyCode) {
      case 9:
        // Tab key: selects currently highlighted option
        event.preventDefault();
        _this2._handleSelectionOnKeyDown(event);
        break;
      case 13:
        // Enter key: selects currently highlighted option
        event.preventDefault();
        _this2._handleSelectionOnKeyDown(event);
        break;
      case 32:
        // Space key: selects currently highlighted option
        event.preventDefault();
        _this2._handleSelectionOnKeyDown(event);
        break;
      case 27:
        // Escape key: closes options if open
        _this2.close();
        break;
      case 38:
        // Up Arrow key: moves highlighted selection 'up' 1 index
        event.preventDefault(); // prevent caret move
        _this2._handleHighlightMove(highlightOptionIndex, 'up');
        break;
      case 40:
        // Down Arrow key: moves highlighted selection 'down' 1 index
        event.preventDefault(); // prevent caret move
        _this2._handleHighlightMove(highlightOptionIndex, 'down');
        break;
      default:
        _this2.props.resetOnClose && _this2.setHighlightedOptionIndex(0);
    }
  };
};

var Options = exports.Options = (0, _withTheme.withTheme)(OptionsBase);
//# sourceMappingURL=Options.js.map