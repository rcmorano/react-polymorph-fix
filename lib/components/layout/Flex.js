'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flex = undefined;

var _pickBy2 = require('lodash/pickBy');

var _pickBy3 = _interopRequireDefault(_pickBy2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('./Base');

var _withTheme = require('../HOC/withTheme');

var _themes = require('../../utils/themes');

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components


// utilities


// constants


var FlexBase = function (_Component) {
  _inherits(FlexBase, _Component);

  // define static properties
  function FlexBase(props) {
    _classCallCheck(this, FlexBase);

    var _this = _possibleConstructorReturn(this, (FlexBase.__proto__ || Object.getPrototypeOf(FlexBase)).call(this, props));

    _initialiseProps.call(_this);

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API)
    };
    return _this;
  }

  _createClass(FlexBase, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(theme) {
      return _react2.default.Children.map(this.props.children, function (child) {
        if (child.type.displayName === 'FlexItem') {
          return _react2.default.cloneElement(child, { theme: theme });
        }
        return child;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          alignItems = _props.alignItems,
          className = _props.className,
          justifyContent = _props.justifyContent,
          themeId = _props.themeId,
          directionProps = _objectWithoutProperties(_props, ['alignItems', 'className', 'justifyContent', 'themeId']);

      var inlineStyles = (0, _pickBy3.default)({ alignItems: alignItems, justifyContent: justifyContent });
      var activeClasses = this._getActiveClasses(directionProps);
      var flexTheme = this._assembleFlexTheme(activeClasses);
      var fullTheme = this.state.composedTheme[themeId];

      return _react2.default.createElement(
        _Base.Base,
        {
          activeClasses: activeClasses,
          className: className,
          inlineStyles: inlineStyles,
          stylesToAdd: flexTheme
        },
        this.renderChildren(fullTheme)
      );
    }
  }]);

  return FlexBase;
}(_react.Component);

FlexBase.displayName = 'Flex';
FlexBase.defaultProps = {
  context: (0, _withTheme.createEmptyContext)(),
  theme: null,
  themeId: _.IDENTIFIERS.FLEX,
  themeOverrides: {}
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._getActiveClasses = function (_ref) {
    var center = _ref.center,
        column = _ref.column,
        columnReverse = _ref.columnReverse,
        row = _ref.row,
        rowReverse = _ref.rowReverse;

    var activeClasses = ['container'];
    var activeProps = (0, _pickBy3.default)({ center: center, column: column, columnReverse: columnReverse, row: row, rowReverse: rowReverse });
    return [].concat(activeClasses, _toConsumableArray(Object.keys(activeProps))).filter(function (val) {
      return val;
    });
  };

  this._assembleFlexTheme = function (activeClasses) {
    var theme = _this2.state.composedTheme[_this2.props.themeId];

    return activeClasses.reduce(function (reducedTheme, activeClass) {
      if (Object.hasOwnProperty.call(theme, activeClass)) {
        reducedTheme[activeClass] = theme[activeClass];
      }
      return reducedTheme;
    }, {});
  };
};

var Flex = exports.Flex = (0, _withTheme.withTheme)(FlexBase);
//# sourceMappingURL=Flex.js.map