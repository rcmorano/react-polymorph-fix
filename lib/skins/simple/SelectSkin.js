'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectSkin = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Options = require('../../components/Options');

var _Input = require('../../components/Input');

var _OptionsSkin = require('./OptionsSkin');

var _InputSkin = require('./InputSkin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// skins


// components
var SelectSkin = exports.SelectSkin = function SelectSkin(props) {
  var selectedOption = props.getSelectedOption();
  var inputValue = selectedOption ? selectedOption.label : '';
  var theme = props.theme,
      themeId = props.themeId;

  return _react2.default.createElement(
    'div',
    {
      ref: props.rootRef,
      className: (0, _classnames2.default)([props.className, theme[themeId].select, props.isOpen ? theme[themeId].isOpen : null, props.isOpeningUpward ? theme[themeId].openUpward : null])
    },
    _react2.default.createElement(
      'div',
      { className: theme[themeId].selectInput },
      _react2.default.createElement(_Input.Input, {
        skin: _InputSkin.InputSkin,
        theme: theme,
        inputRef: props.inputRef,
        label: props.label,
        value: inputValue,
        onClick: props.handleInputClick,
        placeholder: props.placeholder,
        error: props.error,
        readOnly: true
      })
    ),
    _react2.default.createElement(_Options.Options, {
      skin: _OptionsSkin.OptionsSkin,
      theme: theme,
      isOpen: props.isOpen,
      optionsRef: props.optionsRef,
      optionsMaxHeight: props.optionsMaxHeight,
      options: props.options,
      isOpeningUpward: props.isOpeningUpward,
      onChange: props.handleChange,
      optionRenderer: props.optionRenderer,
      selectedOption: selectedOption,
      noResults: !props.options.length,
      targetRef: props.inputRef,
      toggleMouseLocation: props.toggleMouseLocation,
      toggleOpen: props.toggleOpen
    })
  );
};

// external libraries
//# sourceMappingURL=SelectSkin.js.map