'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlexItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('./Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components


var FlexItem = exports.FlexItem = function (_Component) {
  _inherits(FlexItem, _Component);

  function FlexItem() {
    _classCallCheck(this, FlexItem);

    return _possibleConstructorReturn(this, (FlexItem.__proto__ || Object.getPrototypeOf(FlexItem)).apply(this, arguments));
  }

  _createClass(FlexItem, [{
    key: 'render',

    // define static properties
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          alignSelf = _props.alignSelf,
          flex = _props.flex,
          order = _props.order,
          theme = _props.theme;

      return _react2.default.createElement(
        _Base.Base,
        {
          activeClasses: ['item'],
          className: className,
          inlineStyles: { order: order, alignSelf: alignSelf, flex: flex },
          stylesToAdd: theme
        },
        children
      );
    }
  }]);

  return FlexItem;
}(_react.Component);

FlexItem.displayName = 'FlexItem';
FlexItem.defaultProps = { theme: {} };
//# sourceMappingURL=FlexItem.js.map