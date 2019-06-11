'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridItem = undefined;

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _pickBy2 = require('lodash/pickBy');

var _pickBy3 = _interopRequireDefault(_pickBy2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('./Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components


var GridItem = exports.GridItem = function (_Component) {
  _inherits(GridItem, _Component);

  function GridItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GridItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GridItem.__proto__ || Object.getPrototypeOf(GridItem)).call.apply(_ref, [this].concat(args))), _this), _this._assembleInlineGridItem = function (gridItemProps) {
      // return early if gridProps are empty
      if ((0, _isEmpty3.default)((0, _pickBy3.default)(_extends({}, gridItemProps)))) {
        return;
      }

      var alignSelf = gridItemProps.alignSelf,
          column = gridItemProps.column,
          columnStart = gridItemProps.columnStart,
          columnEnd = gridItemProps.columnEnd,
          gridArea = gridItemProps.gridArea,
          justifySelf = gridItemProps.justifySelf,
          placeSelf = gridItemProps.placeSelf,
          row = gridItemProps.row,
          rowEnd = gridItemProps.rowEnd,
          rowStart = gridItemProps.rowStart;

      // obj with correct css grid-item class names

      var inlineClasses = {
        alignSelf: alignSelf,
        gridArea: gridArea,
        gridColumn: column,
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRow: row,
        gridRowEnd: rowEnd,
        gridRowStart: rowStart,
        justifySelf: justifySelf,
        placeSelf: placeSelf
      };

      // filters out keys with false(sy) values
      return (0, _pickBy3.default)(inlineClasses);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GridItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          theme = _props.theme,
          gridItemProps = _objectWithoutProperties(_props, ['children', 'className', 'theme']);

      var inlineGridItem = this._assembleInlineGridItem(_extends({}, gridItemProps));

      return _react2.default.createElement(
        _Base.Base,
        {
          activeClasses: ['item'],
          className: className,
          inlineStyles: inlineGridItem,
          stylesToAdd: theme
        },
        children
      );
    }
  }]);

  return GridItem;
}(_react.Component);

GridItem.displayName = 'GridItem';
//# sourceMappingURL=GridItem.js.map