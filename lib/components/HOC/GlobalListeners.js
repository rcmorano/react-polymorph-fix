'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalListeners = undefined;

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _events = require('../../utils/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// $FlowFixMe


var GlobalListeners = exports.GlobalListeners = function (_Component) {
  _inherits(GlobalListeners, _Component);

  // define static properties
  function GlobalListeners(props) {
    _classCallCheck(this, GlobalListeners);

    var _this = _possibleConstructorReturn(this, (GlobalListeners.__proto__ || Object.getPrototypeOf(GlobalListeners)).call(this, props));

    _this._removeListenersAndToggle = function () {
      var _this$props = _this.props,
          optionsIsOpen = _this$props.optionsIsOpen,
          optionsRef = _this$props.optionsRef;

      _this._removeGlobalListeners();

      // before toggle, ensure options is open and optionsRef exists on DOM
      if (!optionsIsOpen || !optionsRef || !optionsRef.current) {
        return;
      }
      _this.props.toggleOpen();
    };

    _this._getDocumentListeners = function () {
      return {
        click: _this._handleDocumentClick,
        scroll: _this._handleDocumentScroll
      };
    };

    _this._getWindowListeners = function () {
      return {
        resize: _this._handleWindowResize
      };
    };

    _this._handleDocumentClick = function (event) {
      var _this$props2 = _this.props,
          optionsIsOpen = _this$props2.optionsIsOpen,
          rootRef = _this$props2.rootRef;

      // ensure Options is open

      if (!optionsIsOpen || !rootRef || !rootRef.current) {
        return;
      }

      // return early if the user clicked an element within the parent component
      // for example, the parent component could be Autocomplete or Select
      if ((0, _events.targetIsDescendant)(event, rootRef.current)) {
        return;
      }

      // otherwise, remove all listeners and close Options
      _this._removeListenersAndToggle();
    };

    _this._handleWindowResize = function () {
      return _this._removeListenersAndToggle();
    };

    _this._handleDocumentScroll = function () {
      return _this._removeListenersAndToggle();
    };

    _this._addCalculateMaxHeightListeners = function () {
      var _document, _window;

      var scrollListener = ['scroll', (0, _debounce3.default)(_this._calculateOptionsMaxHeight, 300, { leading: true }), true];
      var resizeListener = ['resize', (0, _debounce3.default)(_this._calculateOptionsMaxHeight, 300)];
      (_document = document).addEventListener.apply(_document, scrollListener);
      (_window = window).addEventListener.apply(_window, resizeListener);
    };

    _this._calculateOptionsMaxHeight = function () {
      var _document2 = document,
          documentElement = _document2.documentElement;
      var _this$props3 = _this.props,
          rootRef = _this$props3.rootRef,
          optionsIsOpeningUpward = _this$props3.optionsIsOpeningUpward,
          optionsIsOpen = _this$props3.optionsIsOpen,
          toggleOpen = _this$props3.toggleOpen,
          mouseIsOverOptions = _this$props3.mouseIsOverOptions;

      // checks if Options are open & being scrolled upon via mouse position prior to toggling closed

      optionsIsOpen && !mouseIsOverOptions && toggleOpen();

      if (!documentElement || !documentElement.style || !rootRef || !rootRef.current) {
        return;
      }

      var _rootRef$current$getB = rootRef.current.getBoundingClientRect(),
          height = _rootRef$current$getB.height,
          top = _rootRef$current$getB.top;
      // opening upwards case


      if (optionsIsOpeningUpward && top < window.innerHeight) {
        _this.setState({ optionsMaxHeight: top - 20 });
        return;
      }

      // opening downwards case
      var optionsMaxHeight = window.innerHeight - top - height - 30;
      if (!optionsIsOpeningUpward && optionsMaxHeight > 0) {
        _this.setState({ optionsMaxHeight: optionsMaxHeight });
      }
    };

    _this.state = {
      optionsMaxHeight: 300
    };
    return _this;
  }

  _createClass(GlobalListeners, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.optionsIsOpen) {
        return;
      }
      // adds scroll and resize event listeners for calculating Options max-height
      this._addCalculateMaxHeightListeners();
      // runs initial Options max-height calculation
      this._calculateOptionsMaxHeight();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var optionsIsOpen = this.props.optionsIsOpen;

      // if Options is transferring from closed to open, add listeners
      // if Options is transferring from open to closed, remove listeners

      if (!optionsIsOpen && nextProps.optionsIsOpen) {
        // first remove max-height calc handler on scroll and resize
        // then add toggle handler on scroll and resize
        this._removeGlobalListeners();
        (0, _events.addWindowListeners)(this._getWindowListeners());
        (0, _events.addDocumentListeners)(this._getDocumentListeners());
      } else if (optionsIsOpen && !nextProps.optionsIsOpen) {
        // remove toggle handler on scroll and resize
        // then add calc max-height calc handler on scroll and resize
        this._removeGlobalListeners();
        this._addCalculateMaxHeightListeners();
      }
    }

    // before unmounting, remove all global listeners

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._removeGlobalListeners();
    }

    // removes all event listeners from document and window

  }, {
    key: '_removeGlobalListeners',
    value: function _removeGlobalListeners() {
      (0, _events.removeDocumentListeners)(this._getDocumentListeners());
      (0, _events.removeWindowListeners)(this._getWindowListeners());
    }

    // removes all global listeners, then closes Options


    // calculates max-height for Options, max-height shouldn't be greater than distance
    // from Options rootRef to edge of window (up or down) else Options run off page

  }, {
    key: 'render',
    value: function render() {
      var optionsMaxHeight = this.state.optionsMaxHeight;

      return _react2.default.createElement(
        'div',
        null,
        this.props.children({ optionsMaxHeight: optionsMaxHeight })
      );
    }
  }]);

  return GlobalListeners;
}(_react.Component);

GlobalListeners.displayName = 'GlobalListeners';
GlobalListeners.defaultProps = {
  optionsIsOpen: false
};
//# sourceMappingURL=GlobalListeners.js.map