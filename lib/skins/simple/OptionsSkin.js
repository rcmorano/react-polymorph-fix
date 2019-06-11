'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsSkin = undefined;

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Bubble = require('../../components/Bubble');

var _BubbleSkin = require('./BubbleSkin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// components
var OptionsSkin = exports.OptionsSkin = function OptionsSkin(props) {
  var getOptionProps = props.getOptionProps,
      getHighlightedOptionIndex = props.getHighlightedOptionIndex,
      handleClickOnOption = props.handleClickOnOption,
      isHighlightedOption = props.isHighlightedOption,
      isOpen = props.isOpen,
      isOpeningUpward = props.isOpeningUpward,
      isSelectedOption = props.isSelectedOption,
      noResults = props.noResults,
      noResultsMessage = props.noResultsMessage,
      optionsMaxHeight = props.optionsMaxHeight,
      optionRenderer = props.optionRenderer,
      options = props.options,
      optionsRef = props.optionsRef,
      render = props.render,
      setHighlightedOptionIndex = props.setHighlightedOptionIndex,
      targetRef = props.targetRef,
      theme = props.theme,
      themeId = props.themeId,
      toggleMouseLocation = props.toggleMouseLocation;


  var highlightedOptionIndex = getHighlightedOptionIndex();
  var isFirstOptionHighlighted = highlightedOptionIndex === 0;
  var sortedOptions = isOpeningUpward ? options.slice().reverse() : options;

  var renderOptions = function renderOptions() {
    // check for user's custom render function
    // if Options is being rendered via Autocomplete,
    // the value of props.render is renderOptions passed down from AutocompleteSkin
    if (!noResults && render) {
      // call user's custom render function
      return render(getOptionProps);
    } else if (!noResults && !render) {
      // render default simple skin
      return sortedOptions.map(function (option, index) {
        // set reference of event handlers in memory to prevent excess re-renders
        var boundSetHighlightedOptionIndex = setHighlightedOptionIndex.bind(null, index);
        var boundHandleClickOnOption = handleClickOnOption.bind(null, option);

        return _react2.default.createElement(
          'li',
          {
            role: 'presentation',
            'aria-hidden': true,
            key: index,
            className: (0, _classnames2.default)([theme[themeId].option, isHighlightedOption(index) ? theme[themeId].highlightedOption : null, isSelectedOption(index) ? theme[themeId].selectedOption : null, option.isDisabled ? theme[themeId].disabledOption : null]),
            onClick: boundHandleClickOnOption,
            onMouseEnter: boundSetHighlightedOptionIndex
          },
          renderOption(option)
        );
      });
    }
    // render no results message
    return _react2.default.createElement(
      'li',
      { className: theme[themeId].option },
      noResultsMessage
    );
  };

  var renderOption = function renderOption(option) {
    // check if user has passed render prop "optionRenderer"
    if (optionRenderer && (0, _isFunction3.default)(optionRenderer)) {
      // call user's custom rendering logic
      return optionRenderer(option);
    } else if ((0, _isObject3.default)(option)) {
      return _react2.default.createElement(
        'span',
        { className: theme[themeId].label },
        option.label
      );
    }
    return option;
  };

  // Enforce max height of options dropdown if necessary
  var optionsStyle = optionsMaxHeight == null ? null : {
    maxHeight: optionsMaxHeight + 'px'
  };

  return _react2.default.createElement(
    _Bubble.Bubble,
    {
      className: (0, _classnames2.default)([theme[themeId].options, isOpen ? theme[themeId].isOpen : null, isOpeningUpward ? theme[themeId].openUpward : null, isFirstOptionHighlighted && !noResults ? theme[themeId].firstOptionHighlighted : null]),
      isTransparent: false,
      skin: _BubbleSkin.BubbleSkin,
      isOpeningUpward: isOpeningUpward,
      isHidden: !isOpen,
      isFloating: true,
      targetRef: targetRef
    },
    _react2.default.createElement(
      'ul',
      {
        style: optionsStyle,
        ref: optionsRef,
        className: theme[themeId].ul,
        onMouseEnter: toggleMouseLocation,
        onMouseLeave: toggleMouseLocation
      },
      renderOptions()
    )
  );
};

// skins


// external libraries
//# sourceMappingURL=OptionsSkin.js.map