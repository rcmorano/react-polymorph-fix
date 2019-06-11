'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = undefined;

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _pickBy2 = require('lodash/pickBy');

var _pickBy3 = _interopRequireDefault(_pickBy2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('./Base');

var _withTheme = require('../HOC/withTheme');

var _props2 = require('../../utils/props');

var _layout = require('../../utils/layout');

var _themes = require('../../utils/themes');

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components


// utilities


// constants


var GridBase = function (_Component) {
  _inherits(GridBase, _Component);

  // define static properties
  function GridBase(props) {
    _classCallCheck(this, GridBase);

    var _this = _possibleConstructorReturn(this, (GridBase.__proto__ || Object.getPrototypeOf(GridBase)).call(this, props));

    _this._assembleInlineGrid = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          gridProps = _objectWithoutProperties(_this$props, ['className']);

      // return early if gridProps are empty


      if ((0, _isEmpty3.default)((0, _pickBy3.default)(_extends({}, gridProps)))) {
        return;
      }

      var alignItems = gridProps.alignItems,
          autoColumns = gridProps.autoColumns,
          autoRows = gridProps.autoRows,
          center = gridProps.center,
          columnGap = gridProps.columnGap,
          columns = gridProps.columns,
          gap = gridProps.gap,
          justifyItems = gridProps.justifyItems,
          rowGap = gridProps.rowGap,
          rows = gridProps.rows,
          template = gridProps.template,
          templateAreas = gridProps.templateAreas;

      // obj with correct css grid class names

      var inlineClasses = {
        alignItems: center ? 'center' : alignItems,
        gridAutoColumns: autoColumns,
        gridAutoRows: autoRows,
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gridColumnGap: gap ? false : (0, _props2.numberToPx)(columnGap),
        gridGap: (0, _props2.numberToPx)(gap),
        gridRowGap: gap ? false : (0, _props2.numberToPx)(rowGap),
        gridTemplate: template,
        gridTemplateAreas: (0, _layout.formatTemplateAreas)(templateAreas),
        justifyItems: center ? 'center' : justifyItems
      };

      // filters out keys with false(sy) values
      return (0, _pickBy3.default)(inlineClasses);
    };

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API)
    };
    return _this;
  }

  _createClass(GridBase, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }

    // creates obj passed Base component's inline styles (see render)

  }, {
    key: 'renderChildren',
    value: function renderChildren(theme) {
      return _react2.default.Children.map(this.props.children, function (child) {
        if (child.type.displayName === 'GridItem') {
          return _react2.default.cloneElement(child, { theme: theme });
        }
        return child;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          themeId = _props.themeId,
          className = _props.className;


      var inlineGrid = this._assembleInlineGrid();
      var theme = this.state.composedTheme[themeId];

      return _react2.default.createElement(
        _Base.Base,
        {
          className: className,
          stylesToAdd: theme,
          activeClasses: ['container'],
          inlineStyles: inlineGrid
        },
        this.renderChildren(theme)
      );
    }
  }]);

  return GridBase;
}(_react.Component);

GridBase.displayName = 'Grid';
GridBase.defaultProps = {
  columnGap: 5,
  context: (0, _withTheme.createEmptyContext)(),
  gap: 0,
  rowGap: 5,
  templateAreas: [],
  theme: null,
  themeId: _.IDENTIFIERS.GRID,
  themeOverrides: {}
};
var Grid = exports.Grid = (0, _withTheme.withTheme)(GridBase);
//# sourceMappingURL=Grid.js.map