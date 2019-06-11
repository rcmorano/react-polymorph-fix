'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumericInput = undefined;

var _flow2 = require('lodash/flow');

var _flow3 = _interopRequireDefault(_flow2);

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


// internal utility functions


// import constants


var NumericInputBase = function (_Component) {
  _inherits(NumericInputBase, _Component);

  // define static properties
  function NumericInputBase(props) {
    _classCallCheck(this, NumericInputBase);

    var _this = _possibleConstructorReturn(this, (NumericInputBase.__proto__ || Object.getPrototypeOf(NumericInputBase)).call(this, props));

    _this.onChange = function (event) {
      event.preventDefault();
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      // it is crucial to remove whitespace from input value
      // with String.trim()
      var processedValue = _this._processValue(event.target.value.trim(), event.target.selectionStart);

      // if the processed value is the same, then the user probably entered
      // invalid input such as nonnumeric characters, do not call onChange
      if (processedValue === _this.state.oldValue) {
        return;
      }

      if (onChange) {
        onChange(processedValue, event);
      }
    };

    _this.focus = function () {
      var inputElement = _this.inputElement;

      if (!inputElement.current) return;
      inputElement.current.focus();
    };

    _this._setError = function (error) {
      var setError = _this.props.setError;

      // checks for setError func from FormField component
      // if this NumericInput instance is rendered within FormField's render prop,
      // FormField's local state.error will also be set via props.setError

      if (setError) setError(error);
      // also set (this: NumericInput)'s state.error
      _this.setState({ error: error });
    };

    var context = props.context,
        minValue = props.minValue,
        maxBeforeDot = props.maxBeforeDot,
        maxAfterDot = props.maxAfterDot,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    var minValueIsNum = typeof minValue === 'number';
    // if minValue is a number and user supplied maxBeforeDot and/or maxAfterDot
    if (minValue && minValueIsNum && (maxBeforeDot || maxAfterDot)) {
      // check combination of values for validity
      _this._validateLimitProps(minValue, maxBeforeDot, maxAfterDot);
    }

    // define ref
    _this.inputElement = (0, _createRef2.default)();

    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API),
      caretPosition: 0,
      separatorsCount: 0,
      error: '',
      oldValue: ''
    };
    return _this;
  }
  // declare ref types


  _createClass(NumericInputBase, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var inputElement = this.inputElement;
      // check for autoFocus prop

      if (this.props.autoFocus) this.focus();

      // Set last input caret position on updates
      if (inputElement && inputElement.current) {
        this.setState({ caretPosition: inputElement.current.selectionStart });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var inputElement = this.inputElement;

      if (inputElement && inputElement.current !== document.activeElement) {
        return;
      }

      // caret position calculation after separators injection
      var caretPosition = void 0;
      // prevent unnecessary changes on re-rendering
      if (this.state.oldValue !== prevState.oldValue || this.state.caretPosition !== prevState.caretPosition) {
        if (this.state.separatorsCount !== prevState.separatorsCount && this.state.separatorsCount - prevState.separatorsCount <= 1 && this.state.separatorsCount - prevState.separatorsCount >= -1) {
          caretPosition = this.state.caretPosition + (this.state.separatorsCount - prevState.separatorsCount);
        } else {
          caretPosition = this.state.caretPosition;
        }
        caretPosition = caretPosition >= 0 ? caretPosition : 0;

        if (inputElement && inputElement.current) {
          inputElement.current.selectionEnd = caretPosition;
          inputElement.current.selectionStart = caretPosition;
        }
      }
    }
  }, {
    key: '_validateLimitProps',
    value: function _validateLimitProps(minValue, maxBeforeDot, maxAfterDot) {
      if (typeof minValue !== 'number') return;
      var maxBeforeDotIsNum = typeof maxBeforeDot === 'number';
      var maxAfterDotIsNum = typeof maxAfterDot === 'number';
      // if minValue is a float, it will split at the decimal
      // trailing zeros are dropped with parseFloat
      var minValParts = parseFloat(minValue).toString().split('.');

      // if minValParts array has length of 2, it is a float
      if (minValParts.length >= 2) {
        var minValBeforeDot = minValParts[0];
        var minValAfterDot = minValParts[1];

        // if the number of integers in minValue is greater than maxBeforeDot
        if (maxBeforeDot && maxBeforeDotIsNum && minValBeforeDot.length > maxBeforeDot) {
          // the combo is incompatible, throw error
          var _error = '\n          minValue: ' + minValue + ' exceeds the limit of maxBeforeDot: ' + maxBeforeDot + '.\n          Adjust the values of these properties.\n        ';
          throw new Error(_error);
          // if the number of decimal spaces in minValue is greater than maxBeforeDot
        } else if (maxAfterDot && maxAfterDotIsNum && minValAfterDot.length > maxAfterDot) {
          var _error2 = '\n          minValue: ' + minValue + ' exceeds the limit of maxAfterDot: ' + maxAfterDot + '.\n          Adjust the values of these properties.\n        ';
          throw new Error(_error2);
        }
      }
    }
  }, {
    key: '_processValue',
    value: function _processValue(value, position) {
      return (0, _flow3.default)([this._enforceNumericValue, this._parseToParts, this._enforceValueLimits, this._separate]).call(this, value, position);
    }
  }, {
    key: '_enforceNumericValue',
    value: function _enforceNumericValue(value, position) {
      var regex = /^[0-9.,]+$/;
      var isValueRegular = regex.test(value);
      var maxBeforeDot = this.props.maxBeforeDot;

      var handledValue = void 0;
      var lastValidValue = this.state.oldValue;
      if (!isValueRegular && value !== '') {
        // input contains invalid value
        // e.g. 1,00AAbasdasd.asdasd123123
        // - reject it and show last valid value
        handledValue = lastValidValue || '0.000000';
        position -= 1;
      } else if (!this._isNumeric(value)) {
        // input contains comma separated number
        // e.g. 1,000,000.123456
        // - make sure commas and caret are at correct position
        var splitedValue = value.split('.');

        // check if input value contains more than one decimal
        if (splitedValue.length === 3) {
          var splitedOldValue = lastValidValue.split('.');
          var _beforeDot = splitedValue[0] + splitedValue[1];
          // variable for value before the decimal containing a comma. Ex: 1,425
          var beforeDotWithoutComma = _beforeDot;

          // if comma exists, remove before comparing length in next if-else statement
          if (_beforeDot.includes(',')) {
            var beforeComma = _beforeDot.slice(0, _beforeDot.indexOf(','));
            var afterComma = _beforeDot.slice(_beforeDot.indexOf(',') + 1);
            beforeDotWithoutComma = beforeComma + afterComma;
          }
          if (!_beforeDot.includes(',') && splitedOldValue[0].length < _beforeDot.length || _beforeDot.includes(',') && splitedOldValue[0].length < beforeDotWithoutComma.length) {
            // dot is in decimal part
            position -= 1;
            handledValue = _beforeDot + '.' + splitedValue[2];
            _beforeDot = _beforeDot.replace(/,/g, '');
            // prevent replace dot if length before dot is greater then max before dot length
            if (maxBeforeDot && _beforeDot.length > maxBeforeDot) {
              handledValue = lastValidValue;
            }
          } else {
            handledValue = splitedValue[0] + '.' + splitedValue[1] + splitedValue[2];
            // Second dot was entered after current one -> stay in same position (swallow dot)
            if (position > _beforeDot.length + 1) {
              position -= 1;
            }
          }
        } else if (splitedValue.length === 2 && splitedValue[0] === '' && splitedValue[1] === '') {
          // special case when dot is inserted in an empty input
          // - return 0.|00000
          handledValue = '0.000000';
          position = 2; // position caret after the dot
        } else if (value !== '') {
          // special case when user selects part of an input value and hits ',' key
          // - reject it and show last valid value
          handledValue = lastValidValue;
        }
      }

      var lastInsertedCharacter = value.substring(position - 1, position);
      if (lastInsertedCharacter === ',') {
        // prevent move caret position on hit ','
        position -= 1;
      }

      return !this._isNumeric(value) ? { value: handledValue, position: position } : { value: value, position: position };
    }
  }, {
    key: '_parseToParts',
    value: function _parseToParts(data) {
      var value = data.value;
      var position = data.position;

      // show placeholder on select all and delete/backspace key action
      if (!value) return;

      var beforeDot = void 0;
      var afterDot = void 0;

      if (data.value.length > 1 && value.split('.').length < 2) {
        // handle numbers deletion from both integer and decimal parts at once
        beforeDot = value.substring(0, position) || '0';
        afterDot = value.substring(position, value.length);
      } else {
        // split float number to integer and decimal part - regular way
        var splitedValue = value.split('.');
        beforeDot = splitedValue[0] ? splitedValue[0] : '0';
        afterDot = splitedValue[1] ? splitedValue[1] : '000000';
      }

      // remove leading zero and update caret position
      if (value.charAt(0) === '0' && parseInt(beforeDot.replace(/,/g, ''), 10) > 0) {
        beforeDot = parseInt(beforeDot.replace(/,/g, ''), 10);
        if (position !== 2) {
          position = 0;
        } else {
          position = 1;
        }
      } else if (parseInt(beforeDot.replace(/,/g, ''), 10) === 0) {
        beforeDot = parseInt(beforeDot.replace(/,/g, ''), 10);
      }

      return { value: value, position: position, parts: { beforeDot: beforeDot, afterDot: afterDot } };
    }

    // enforces props.maxValue and props.minValue

  }, {
    key: '_enforceValueLimits',
    value: function _enforceValueLimits(data) {
      if (!data) return;

      var _props = this.props,
          minValue = _props.minValue,
          maxValue = _props.maxValue,
          enforceMax = _props.enforceMax,
          enforceMin = _props.enforceMin,
          maxAfterDot = _props.maxAfterDot;
      var position = data.position;

      // enforce props.maxBeforeDot and props.maxAfterDot

      var valueWithDecimalRestrictions = this._enforceDecimalRestrictions(data);

      // creates floating point number equal to valueWithDecimalRestrictions (string)
      // will be used for value comparisons against props.maxValue and props.minValue if applicable
      var valueWithoutSeparators = parseFloat(valueWithDecimalRestrictions.replace(/,/g, ''));

      // if input value is greater than props.maxValue, throw error
      if (maxValue && valueWithoutSeparators > maxValue) {
        var formattedMaxVal = maxValue.toFixed(maxAfterDot || 6).toString();
        this._setError('Maximum amount is ' + formattedMaxVal);

        // if user passes enforceMax=true, restrict input value to props.maxValue
        if (enforceMax) {
          this.setState({ caretPosition: position });
          return formattedMaxVal;
        }
        // if input value is below props.minValue, throw error
      } else if (minValue && valueWithoutSeparators < minValue) {
        var formattedMinVal = minValue.toFixed(maxAfterDot || 6).toString();
        this._setError('Minimum amount is ' + formattedMinVal);

        // if props.enforceMin=true, restrict input value to props.minValue
        if (enforceMin) {
          this.setState({ caretPosition: position });
          return formattedMinVal;
        }
        // if input value has no errors, clear state.error
      } else if (this.state.error !== '') {
        this._setError('');
      }

      // update caret in state
      this.setState({ caretPosition: position });

      // input value w/ decimal restrictions is passed along
      // to this._separate without value restrictions
      return valueWithDecimalRestrictions;
    }

    // enforces props.maxBeforeDot and props.maxAfterDot

  }, {
    key: '_enforceDecimalRestrictions',
    value: function _enforceDecimalRestrictions(data) {
      var _props2 = this.props,
          maxBeforeDot = _props2.maxBeforeDot,
          maxAfterDot = _props2.maxAfterDot;
      var beforeDot = data.parts.beforeDot;
      var afterDot = data.parts.afterDot;

      // preventing numbers with more than maxBeforeDot units
      // - return first maxBeforeDot numbers (with comma separators)

      if (maxBeforeDot && beforeDot) {
        // max number of commas depending on max number of characters before dot
        var numberOfCommas = maxBeforeDot % 3 > 0 ? parseInt(maxBeforeDot / 3, 10) : parseInt(maxBeforeDot / 3, 10) - 1;
        var maxBeforeDotWithSeparator = maxBeforeDot + numberOfCommas;
        if (beforeDot.length > maxBeforeDotWithSeparator) {
          beforeDot = beforeDot.substring(0, maxBeforeDotWithSeparator);
        }
      }

      // remove commas from decimal part
      // (e.g. 123,23,2.002000 -> dot after 2.character reproduce 12.3,23,2)
      afterDot = afterDot.replace(/,/g, '');
      // preventing numbers with more than maxAfterDot units - return first maxAfterDot numbers
      if (maxAfterDot && afterDot && afterDot.length > maxAfterDot) {
        afterDot = afterDot.substring(0, maxAfterDot);
      }

      // if decimal number has less than maxAfterDot numbers add trailing zeros
      var afterDotLength = afterDot ? afterDot.length : 0;
      if (maxAfterDot && afterDotLength < maxAfterDot) {
        for (afterDotLength; afterDotLength < maxAfterDot; afterDotLength++) {
          afterDot += '0';
        }
      }
      // if maxAfterDot is 0, drop decimal & numbers after decimal, return int
      if (maxAfterDot === 0) {
        return beforeDot;
      }

      // return input value w/decimal restrictions as a string
      return beforeDot + '.' + afterDot;
    }
  }, {
    key: '_separate',
    value: function _separate(value) {
      this.setState({ oldValue: value });
      // value will not contain '.' if maxAfterDot is 0, return early
      if (value && !value.includes('.')) {
        return value;
      }
      if (!value) {
        this.setState({ separatorsCount: 0 });
      }
      if (value) {
        var splitedValue = value.split('.');
        var separatedValue = splitedValue[0].replace(/,/g, '').split('').reverse().join('').replace(/(\d{3}\B)/g, '$1,').split('').reverse().join('');
        var newSeparatorsCount = (separatedValue.match(/,/g) || []).length;
        this.setState({ separatorsCount: newSeparatorsCount });
        return separatedValue + '.' + splitedValue[1];
      }
    }
  }, {
    key: '_isNumeric',
    value: function _isNumeric(value) {
      var replacedValue = value.replace(/,/g, '');
      // eslint-disable-next-line no-restricted-globals
      return !isNaN(parseFloat(replacedValue)) && isFinite(replacedValue);
    }
  }, {
    key: 'render',
    value: function render() {
      // destructuring props ensures only the "...rest" get passed down
      var _props3 = this.props,
          skin = _props3.skin,
          theme = _props3.theme,
          themeOverrides = _props3.themeOverrides,
          onChange = _props3.onChange,
          error = _props3.error,
          context = _props3.context,
          maxValue = _props3.maxValue,
          minValue = _props3.minValue,
          maxBeforeDot = _props3.maxBeforeDot,
          maxAfterDot = _props3.maxAfterDot,
          rest = _objectWithoutProperties(_props3, ['skin', 'theme', 'themeOverrides', 'onChange', 'error', 'context', 'maxValue', 'minValue', 'maxBeforeDot', 'maxAfterDot']);

      var InputSkin = skin || context.skins[_.IDENTIFIERS.INPUT];

      return _react2.default.createElement(InputSkin, _extends({
        error: error || this.state.error,
        inputRef: this.inputElement,
        onChange: this.onChange,
        theme: this.state.composedTheme
      }, rest));
    }
  }]);

  return NumericInputBase;
}(_react.Component);

NumericInputBase.displayName = 'NumericInput';
NumericInputBase.defaultProps = {
  context: (0, _withTheme.createEmptyContext)(),
  enforceMax: false,
  enforceMin: false,
  readOnly: false,
  theme: null,
  themeId: _.IDENTIFIERS.INPUT,
  themeOverrides: {},
  value: ''
};
var NumericInput = exports.NumericInput = (0, _withTheme.withTheme)(NumericInputBase);
//# sourceMappingURL=NumericInput.js.map