'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// the baseStyles obj will be composed with the stylesToAdd obj
// activeClasses is an array of the classes within stylesToAdd
// that should be added to baseStyles
var composeBaseStyles = exports.composeBaseStyles = function composeBaseStyles(baseStyles) {
  var stylesToAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var activeClasses = arguments[2];

  if (!activeClasses || !activeClasses.length) {
    return baseStyles;
  }
  var composedBase = _extends({}, baseStyles);

  activeClasses.forEach(function (className) {
    if (Object.hasOwnProperty.call(stylesToAdd, className) && stylesToAdd[className]) {
      composedBase.base += ' ' + stylesToAdd[className];
    }
  });

  return composedBase;
};

var formatTemplateAreas = exports.formatTemplateAreas = function formatTemplateAreas(areas) {
  if (!areas || !areas.length) {
    return;
  }

  return areas.reduce(function (template, row, index) {
    if (!index) {
      return '\'' + row + '\'';
    }
    return template + ' \'' + row + '\'';
  }, '');
};
//# sourceMappingURL=layout.js.map