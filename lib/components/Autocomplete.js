'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autocomplete = undefined;

var _startsWith2 = require('lodash/startsWith');

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _pullAt2 = require('lodash/pullAt');

var _pullAt3 = _interopRequireDefault(_pullAt2);

var _concat2 = require('lodash/concat');

var _concat3 = _interopRequireDefault(_concat2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createRef = require('create-react-ref/lib/createRef');

var _createRef2 = _interopRequireDefault(_createRef);

var _GlobalListeners = require('./HOC/GlobalListeners');

var _withTheme = require('./HOC/withTheme');

var _themes = require('../utils/themes');

var _props3 = require('../utils/props');

var _2 = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// external libraries


// interal components


// internal utility functions


var AutocompleteBase = function (_Component) {
  _inherits(AutocompleteBase, _Component);

  // define static properties

  // declare ref types
  function AutocompleteBase(props) {
    _classCallCheck(this, AutocompleteBase);

    // define refs
    var _this = _possibleConstructorReturn(this, (AutocompleteBase.__proto__ || Object.getPrototypeOf(AutocompleteBase)).call(this, props));

    _initialiseProps.call(_this);

    _this.rootElement = (0, _createRef2.default)();
    _this.inputElement = (0, _createRef2.default)();
    _this.suggestionsElement = (0, _createRef2.default)();
    _this.optionsElement = (0, _createRef2.default)();

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides,
        sortAlphabetically = props.sortAlphabetically,
        options = props.options,
        preselectedOptions = props.preselectedOptions;


    _this.state = {
      inputValue: '',
      error: '',
      selectedOptions: preselectedOptions || [],
      filteredOptions: sortAlphabetically && options ? options.sort() : options || [],
      isOpen: false,
      mouseIsOverOptions: false,
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API)
    };
    return _this;
  }

  _createClass(AutocompleteBase, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }

    // onChange handler for input element in AutocompleteSkin


    // passed to Options onChange handler in AutocompleteSkin


    // returns an object containing props, theme, and method handlers
    // associated with rendering this.state.selectedOptions, the user can call
    // this in the body of the renderSelections function

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // destructuring props ensures only the "...rest" get passed down
      var _props = this.props,
          context = _props.context,
          invalidCharsRegex = _props.invalidCharsRegex,
          multipleSameSelections = _props.multipleSameSelections,
          sortAlphabetically = _props.sortAlphabetically,
          skin = _props.skin,
          theme = _props.theme,
          themeOverrides = _props.themeOverrides,
          onChange = _props.onChange,
          error = _props.error,
          rest = _objectWithoutProperties(_props, ['context', 'invalidCharsRegex', 'multipleSameSelections', 'sortAlphabetically', 'skin', 'theme', 'themeOverrides', 'onChange', 'error']);

      var AutocompleteSkin = skin || context.skins[_2.IDENTIFIERS.AUTOCOMPLETE];

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
          return _react2.default.createElement(AutocompleteSkin, _extends({
            error: error || _this2.state.error,
            filteredOptions: _this2.state.filteredOptions,
            getSelectionProps: _this2.getSelectionProps,
            handleAutocompleteClick: _this2.handleAutocompleteClick,
            handleChange: _this2.handleChange,
            handleInputChange: _this2.handleInputChange,
            inputRef: _this2.inputElement,
            inputValue: _this2.state.inputValue,
            isOpen: _this2.state.isOpen,
            onKeyDown: _this2.onKeyDown,
            optionsMaxHeight: optionsMaxHeight,
            optionsRef: _this2.optionsElement,
            removeOption: _this2.removeOption,
            rootRef: _this2.rootElement,
            selectedOptions: _this2.state.selectedOptions,
            suggestionsRef: _this2.suggestionsElement,
            theme: _this2.state.composedTheme,
            toggleMouseLocation: _this2.toggleMouseLocation,
            toggleOpen: _this2.toggleOpen
          }, rest));
        }
      );
    }

    // ======== PRIVATE METHOD ==========

  }]);

  return AutocompleteBase;
}(_react.Component);

AutocompleteBase.displayName = 'Autocomplete';
AutocompleteBase.defaultProps = {
  context: (0, _withTheme.createEmptyContext)(),
  error: null,
  invalidCharsRegex: /[^a-zA-Z0-9]/g, // only allow letters and numbers by default
  isOpeningUpward: false,
  maxVisibleOptions: 10, // max number of visible options
  multipleSameSelections: true, // if true then same word can be selected multiple times
  options: [],
  sortAlphabetically: true, // options are sorted alphabetically by default
  theme: null,
  themeId: _2.IDENTIFIERS.AUTOCOMPLETE,
  themeOverrides: {}
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.clear = function () {
    return _this3._removeOptions();
  };

  this.focus = function () {
    return _this3.handleAutocompleteClick();
  };

  this.open = function () {
    return _this3.setState({ isOpen: true });
  };

  this.close = function () {
    return _this3.setState({ isOpen: false });
  };

  this.toggleOpen = function () {
    if (_this3.state.isOpen && _this3.optionsElement && _this3.optionsElement.current) {
      // set Options scroll position to top on close
      _this3.optionsElement.current.scrollTop = 0;
    }
    _this3.setState({ isOpen: !_this3.state.isOpen });
  };

  this.toggleMouseLocation = function () {
    return _this3.setState({ mouseIsOverOptions: !_this3.state.mouseIsOverOptions });
  };

  this.handleAutocompleteClick = function () {
    var inputElement = _this3.inputElement;

    if (inputElement && inputElement.current) {
      inputElement.current.focus();
    }
    // toggle options open/closed
    _this3.toggleOpen();
  };

  this.onKeyDown = function (event) {

    if ( // Check for backspace in order to delete the last selected option
    event.keyCode === 8 && !event.target.value && _this3.state.selectedOptions.length) {
      // Remove last selected option
      _this3.removeOption(_this3.state.selectedOptions.length - 1, event);
    } else if (event.keyCode === 27) {
      // ESCAPE key: Stops propagation & modal closing
      event.stopPropagation();
    } else if (event.keyCode === 13) {
      // ENTER key: Opens suggestions
      _this3.open();
    }
  };

  this.handleInputChange = function (event) {
    _this3._setInputValue(event.target.value);
  };

  this.handleChange = function (option, event) {
    _this3.updateSelectedOptions(event, option);
  };

  this.updateSelectedOptions = function (event) {
    var selectedOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var _props2 = _this3.props,
        maxSelections = _props2.maxSelections,
        multipleSameSelections = _props2.multipleSameSelections;
    var _state = _this3.state,
        selectedOptions = _state.selectedOptions,
        filteredOptions = _state.filteredOptions,
        isOpen = _state.isOpen;

    var canMoreOptionsBeSelected = maxSelections != null ? selectedOptions.length < maxSelections : true;
    var areFilteredOptionsAvailable = filteredOptions && filteredOptions.length > 0;

    if (!maxSelections || canMoreOptionsBeSelected && areFilteredOptionsAvailable) {
      if (!selectedOption) return;
      var option = selectedOption.trim();
      var optionCanBeSelected = selectedOptions.indexOf(option) < 0 && !multipleSameSelections || multipleSameSelections;

      if (option && optionCanBeSelected && isOpen) {
        var newSelectedOptions = (0, _concat3.default)(selectedOptions, option);
        _this3.selectionChanged(newSelectedOptions, event);
        _this3.setState({ selectedOptions: newSelectedOptions, isOpen: false });
      }
    }

    _this3._setInputValue('');
  };

  this.removeOption = function (index, event) {
    var selectedOptions = _this3.state.selectedOptions;
    (0, _pullAt3.default)(selectedOptions, index);
    _this3.selectionChanged(selectedOptions, event);
    _this3.setState({ selectedOptions: selectedOptions });
  };

  this.selectionChanged = function (selectedOptions, event) {
    if (_this3.props.onChange) _this3.props.onChange(selectedOptions, event);
  };

  this.getSelectionProps = function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _removeSelection = _ref2.removeSelection;

    var themeId = _this3.props.themeId;
    var _state2 = _this3.state,
        inputValue = _state2.inputValue,
        isOpen = _state2.isOpen,
        selectedOptions = _state2.selectedOptions,
        composedTheme = _state2.composedTheme;

    return {
      inputValue: inputValue,
      isOpen: isOpen,
      selectedOptions: selectedOptions,
      theme: composedTheme[themeId],
      removeSelection: function removeSelection(index, event
      // the user's custom removeSelection event handler is composed with
      // the internal functionality of Autocomplete (this.removeOption)
      ) {
        return (0, _props3.composeFunctions)(_removeSelection, _this3.removeOption)(index, event);
      }
    };
  };

  this._removeOptions = function () {
    var onChange = _this3.props.onChange;

    onChange ? onChange([]) : null;
    _this3.setState({ selectedOptions: [], inputValue: '' });
  };

  this._filterOptions = function (value) {
    var filteredOptions = [];

    if (value !== '') {
      (0, _some3.default)(_this3.props.options, function (option) {
        if ((0, _startsWith3.default)(option, value)) {
          filteredOptions.push(option);
        }
      });
    } else {
      filteredOptions = _this3.props.options;
    }

    return filteredOptions;
  };

  this._filterInvalidChars = function (value) {
    var filteredValue = '';

    if (_this3.props.invalidCharsRegex.test(value)) {
      filteredValue = value.replace(_this3.props.invalidCharsRegex, '');
    } else {
      filteredValue = value;
    }

    return filteredValue;
  };

  this._setInputValue = function (value) {
    var filteredValue = _this3._filterInvalidChars(value);
    var filteredOptions = _this3._filterOptions(filteredValue);
    _this3.setState({
      isOpen: true,
      inputValue: filteredValue,
      filteredOptions: filteredOptions
    });
  };
};

var Autocomplete = exports.Autocomplete = (0, _withTheme.withTheme)(AutocompleteBase);
//# sourceMappingURL=Autocomplete.js.map