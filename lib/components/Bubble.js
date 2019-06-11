'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bubble = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createRef = require('create-react-ref/lib/createRef');

var _createRef2 = _interopRequireDefault(_createRef);

var _withTheme = require('./HOC/withTheme');

var _themes = require('../utils/themes');

var _events = require('../utils/events');

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// internal utility functions


// import constants


var BubbleBase = function (_Component) {
  _inherits(BubbleBase, _Component);

  // define static properties
  function BubbleBase(props) {
    _classCallCheck(this, BubbleBase);

    // define ref
    var _this = _possibleConstructorReturn(this, (BubbleBase.__proto__ || Object.getPrototypeOf(BubbleBase)).call(this, props));

    _this._hasEventListeners = false;

    _this._handleScrollEventListener = function (action) {
      // const rootNode = this.rootElement;
      var rootElement = _this.rootElement;

      if (rootElement) {
        var scrollableNode = _this._getFirstScrollableParent(rootElement);
        if (scrollableNode) {
          if (action === 'add') {
            scrollableNode.addEventListener('scroll', _this._updatePosition);
          } else if (action === 'remove') {
            scrollableNode.removeEventListener('scroll', _this._updatePosition);
          }
        }
      }
    };

    _this._getFirstScrollableParent = function (element) {
      if (element == null) return null;
      var rootElement = _this.rootElement;

      var node = {}.hasOwnProperty.call(element, 'current') ? element.current : element;

      if (rootElement) {
        if (node === rootElement.current || node.scrollHeight <= node.clientHeight) {
          return _this._getFirstScrollableParent(node.parentElement);
        }
      }

      return node;
    };

    _this._updatePosition = function () {
      var _this$props = _this.props,
          isOpeningUpward = _this$props.isOpeningUpward,
          targetRef = _this$props.targetRef;
      var rootElement = _this.rootElement;


      var target = targetRef && typeof targetRef !== 'string' ? targetRef.current : null;

      // Without a target, try to fallback to the parent node
      if (!target) {
        //  Only proceed if the root element is defined
        if (!rootElement || !rootElement.current) return;
        target = rootElement.current.parentElement;
      }

      var targetRect = target.getBoundingClientRect();

      var positionY = void 0;
      if (isOpeningUpward) {
        // Since we don't know the height of the bubble before rendering it we positioning
        // it with { bottom: XYpx } (within the viewport) and need this calculation:
        positionY = window.innerHeight - targetRect.top + 20;
      } else {
        positionY = targetRect.bottom + 20;
      }

      var position = {
        width: targetRect.width,
        positionX: targetRect.left,
        positionY: positionY
      };
      _this.setState({ position: position });
    };

    _this.rootElement = (0, _createRef2.default)();

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;


    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API),
      position: null
    };
    return _this;
  }
  // declare ref types


  _createClass(BubbleBase, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        if (_this2.props.isFloating) _this2._updatePosition();
      }, 0);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var isFloating = this.props.isFloating;
      // Add listeners when the bubble

      if (isFloating && !nextProps.isHidden && !this._hasEventListeners) {
        this._handleScrollEventListener('add');
        (0, _events.addDocumentListeners)(this._getDocumentEvents());
        window.addEventListener('resize', this._updatePosition);
        this._hasEventListeners = true;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var isHidden = this.props.isHidden;

      var didVisibilityChange = isHidden !== prevProps.isHidden;
      var wasBubbleHidden = !prevProps.isHidden && isHidden;

      if (wasBubbleHidden) this._removeAllEventListeners();
      if (didVisibilityChange) this._updatePosition();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._hasEventListeners) this._removeAllEventListeners();
    }

    // =========== PRIVATE HELPERS ==============

  }, {
    key: '_removeAllEventListeners',
    value: function _removeAllEventListeners() {
      if (this._hasEventListeners) {
        (0, _events.removeDocumentListeners)(this._getDocumentEvents());
        this._handleScrollEventListener('remove');
        window.removeEventListener('resize', this._updatePosition);
        this._hasEventListeners = false;
      }
    }
  }, {
    key: '_getDocumentEvents',
    value: function _getDocumentEvents() {
      return {
        resize: this._updatePosition,
        scroll: this._updatePosition
      };
    }
  }, {
    key: 'render',
    value: function render() {
      // destructuring props ensures only the "...rest" get passed down
      var _props = this.props,
          skin = _props.skin,
          theme = _props.theme,
          themeOverrides = _props.themeOverrides,
          context = _props.context,
          rest = _objectWithoutProperties(_props, ['skin', 'theme', 'themeOverrides', 'context']);

      var BubbleSkin = skin || context.skins[_.IDENTIFIERS.BUBBLE];

      return _react2.default.createElement(BubbleSkin, _extends({
        rootRef: this.rootElement,
        position: this.state.position,
        theme: this.state.composedTheme
      }, rest));
    }
  }]);

  return BubbleBase;
}(_react.Component);

BubbleBase.displayName = 'Bubble';
BubbleBase.defaultProps = {
  context: (0, _withTheme.createEmptyContext)(),
  isHidden: false,
  isFloating: false,
  isOpeningUpward: false,
  isTransparent: true,
  arrowRelativeToTip: false,
  theme: null,
  themeId: _.IDENTIFIERS.BUBBLE,
  themeOverrides: {}
};
var Bubble = exports.Bubble = (0, _withTheme.withTheme)(BubbleBase);
//# sourceMappingURL=Bubble.js.map