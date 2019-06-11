'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutocompleteSkin = undefined;

var _slice2 = require('lodash/slice');

var _slice3 = _interopRequireDefault(_slice2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FormField = require('../../components/FormField');

var _Options = require('../../components/Options');

var _FormFieldSkin = require('./FormFieldSkin');

var _OptionsSkin = require('./OptionsSkin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// skins


// components
var AutocompleteSkin = exports.AutocompleteSkin = function AutocompleteSkin(props) {
  var theme = props.theme[props.themeId];

  var filteredAndLimitedOptions = (0, _slice3.default)(props.filteredOptions, 0, props.maxVisibleOptions);

  // show placeholder only if no maximum selections declared or maximum not reached
  var canMoreOptionsBeSelected = props.selectedOptions.length < props.maxSelections;

  var placeholder = !props.maxSelections || canMoreOptionsBeSelected ? props.placeholder : '';

  var renderSelectedOptions = function renderSelectedOptions() {
    // check if the user passed a renderSelections function
    if (props.selectedOptions && props.renderSelections) {
      // call custom renderSelections function
      return props.renderSelections(props.getSelectionProps);
    } else if (props.selectedOptions && !props.renderSelections) {
      // render default skin
      return props.selectedOptions.map(function (selectedOption, index) {
        return _react2.default.createElement(
          'span',
          { className: theme.selectedWordBox, key: index },
          _react2.default.createElement(
            'span',
            { className: theme.selectedWordValue },
            selectedOption,
            _react2.default.createElement(
              'span',
              {
                role: 'presentation',
                'aria-hidden': true,
                className: theme.selectedWordRemoveButton,
                onClick: props.removeOption.bind(null, index)
              },
              '\xD7'
            )
          )
        );
      });
    }
    return null;
  };

  // A label, input, and selected words are the content
  var renderContent = function renderContent() {
    return _react2.default.createElement(_FormField.FormField, {
      error: props.error,
      inputRef: props.inputRef,
      label: props.label,
      skin: _FormFieldSkin.FormFieldSkin,
      render: function render() {
        return _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)([theme.autocompleteContent, props.isOpen ? theme.opened : null, props.selectedOptions.length ? theme.hasSelectedWords : null, props.error ? theme.errored : null]),
            ref: props.suggestionsRef
          },
          _react2.default.createElement(
            'div',
            { className: theme.selectedWords },
            renderSelectedOptions(),
            _react2.default.createElement('input', {
              ref: props.inputRef,
              placeholder: placeholder,
              value: props.inputValue,
              onChange: props.handleInputChange,
              onKeyDown: props.onKeyDown
            })
          )
        );
      }
    });
  };

  return _react2.default.createElement(
    'div',
    {
      'aria-hidden': true,
      className: (0, _classnames2.default)([props.className, theme.autocompleteWrapper]),
      onClick: props.handleAutocompleteClick,
      ref: props.rootRef,
      role: 'presentation'
    },
    renderContent(),
    _react2.default.createElement(_Options.Options, {
      isOpen: props.isOpen,
      isOpeningUpward: props.isOpeningUpward,
      noResults: !props.filteredOptions.length,
      onChange: props.handleChange,
      options: filteredAndLimitedOptions,
      optionsRef: props.optionsRef,
      optionsMaxHeight: props.optionsMaxHeight,
      render: props.renderOptions,
      resetOnClose: true,
      selectedOptions: props.selectedOptions,
      skin: _OptionsSkin.OptionsSkin,
      targetRef: props.suggestionsRef,
      toggleMouseLocation: props.toggleMouseLocation,
      toggleOpen: props.toggleOpen
    })
  );
};

// external libraries
//# sourceMappingURL=AutocompleteSkin.js.map