'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.didThemePropsChange = exports.composeTheme = exports.addThemeId = exports.composeComponentStyles = exports.appendToProperty = undefined;

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _props = require('./props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var appendToProperty = exports.appendToProperty = function appendToProperty(dest, name, value) {
  dest[name] === '' ? dest[name] = value : dest[name] += ' ' + value;
};

var composeComponentStyles = exports.composeComponentStyles = function composeComponentStyles(componentStyles, componentTheme) {
  if (!componentTheme) return;
  for (var property in componentStyles) {
    if ((0, _props.hasProperty)(componentStyles, property)) {
      if ((0, _props.hasProperty)(componentTheme, property)) {
        appendToProperty(componentStyles, property, componentTheme[property]);
      }
    }
  }
};

// checks for the existence of a property on theme
// that matches the value of themeId (string)
// if the property exists, also checks the type of
// theme[themeId] to ensure it's an object
var addThemeId = exports.addThemeId = function addThemeId() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var themeId = arguments[1];

  if (theme && !(0, _isEmpty3.default)(theme) && themeId) {
    var themeIdExists = (0, _props.hasProperty)(theme, themeId);
    var themeIdIsObj = _typeof(theme[themeId]) === 'object';
    return themeIdExists && themeIdIsObj ? theme : _defineProperty({}, themeId, theme);
  }
  return theme;
};

/**
 * Composes a base theme with the given overrides, which should
 * be provided in the same schema, defined by the theme API param.
 *
 * @param theme - The base theme to be composed with overrides
 * @param themeOverrides - The custom overrides for the base theme
 * @param themeAPI - The theme API schema that should be used for composition
 * @returns {{}} - The composed theme
 */

var composeTheme = exports.composeTheme = function composeTheme() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var themeOverrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var themeAPI = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // Return theme if there are no overrides provided
  if ((0, _isEmpty3.default)(themeOverrides)) return theme;

  // final object to be returned
  var composedTheme = (0, _cloneDeep3.default)(themeAPI);

  for (var componentId in themeAPI) {
    if ((0, _props.hasProperty)(composedTheme, componentId)) {
      var componentStyles = composedTheme[componentId];
      composeComponentStyles(componentStyles, theme[componentId]);
      composeComponentStyles(componentStyles, themeOverrides[componentId]);
    }
  }
  return composedTheme;
};

// Used in componentWillReceiveProps, this function compares the current
// set of theme related props against the next set to see if any have changed.
// If true, a component's theme is recomposed and local state is updated
var didThemePropsChange = exports.didThemePropsChange = function didThemePropsChange(_ref2, _ref3, setState) {
  var context = _ref2.context,
      themeId = _ref2.themeId,
      theme = _ref2.theme,
      themeOverrides = _ref2.themeOverrides;
  var nextContext = _ref3.context,
      nextThemeId = _ref3.themeId,
      nextTheme = _ref3.theme,
      nextOverrides = _ref3.themeOverrides;

  if (!(0, _isEqual3.default)(context, nextContext) || !(0, _isEqual3.default)(themeId, nextThemeId) || !(0, _isEqual3.default)(theme, nextTheme) || !(0, _isEqual3.default)(themeOverrides, nextOverrides)) {
    setState(function () {
      return {
        composedTheme: composeTheme(addThemeId(nextTheme || nextContext.theme, nextThemeId), addThemeId(nextOverrides, nextThemeId), nextContext.ROOT_THEME_API)
      };
    });
  }
};
//# sourceMappingURL=themes.js.map