'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteScroll = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createRef = require('create-react-ref/lib/createRef');

var _createRef2 = _interopRequireDefault(_createRef);

var _withTheme = require('./HOC/withTheme');

var _themes = require('../utils/themes');

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// $FlowFixMe


// utilities


// constants


var InfiniteScrollBase = function (_Component) {
  _inherits(InfiniteScrollBase, _Component);

  // define static properties
  function InfiniteScrollBase(props) {
    _classCallCheck(this, InfiniteScrollBase);

    var _this = _possibleConstructorReturn(this, (InfiniteScrollBase.__proto__ || Object.getPrototypeOf(InfiniteScrollBase)).call(this, props));

    _this._handleFetchData = function () {
      return _this.props.fetchData(_this.setState.bind(_this));
    };

    _this._handleScroll = function () {
      var _this$state = _this.state,
          error = _this$state.error,
          isLoading = _this$state.isLoading,
          hasMoreData = _this$state.hasMoreData;

      // return early for error, loading, or lack of future data

      if (error || isLoading || !hasMoreData) {
        return;
      }
      return _this._checkForScrollBottom();
    };

    _this._checkForScrollBottom = function () {
      var scrollContainer = _this.scrollContainer,
          threshold = _this.props.threshold;

      if (!scrollContainer.current) return;
      var _scrollContainer$curr = scrollContainer.current,
          offsetHeight = _scrollContainer$curr.offsetHeight,
          scrollTop = _scrollContainer$curr.scrollTop,
          scrollHeight = _scrollContainer$curr.scrollHeight;


      if (offsetHeight + scrollTop >= scrollHeight - threshold) {
        return _this._handleFetchData();
      }
    };

    _this._isFunction = function (renderProp) {
      return renderProp && typeof renderProp === 'function';
    };

    var context = props.context,
        themeId = props.themeId,
        theme = props.theme,
        themeOverrides = props.themeOverrides;

    // refs

    _this.scrollContainer = (0, _createRef2.default)();

    _this.state = {
      composedTheme: (0, _themes.composeTheme)((0, _themes.addThemeId)(theme || context.theme, themeId), (0, _themes.addThemeId)(themeOverrides, themeId), context.ROOT_THEME_API),
      data: [],
      error: false,
      isLoading: false,
      hasMoreData: true
    };
    return _this;
  }
  // declare ref types


  _createClass(InfiniteScrollBase, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._handleFetchData();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var scrollContainer = this.scrollContainer;

      if (!scrollContainer.current) return;
      scrollContainer.current.addEventListener('scroll', this._handleScroll);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _themes.didThemePropsChange)(this.props, nextProps, this.setState.bind(this));
    }

    // calls user's fetchData function from props


    // scroll event listener attached to scrollContainer element


    // prevents new data fetch until user has scrolled near bottom of existing data

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          context = _props.context,
          renderItems = _props.renderItems,
          skin = _props.skin,
          themeId = _props.themeId,
          _state = this.state,
          composedTheme = _state.composedTheme,
          data = _state.data,
          error = _state.error,
          hasMoreData = _state.hasMoreData,
          isLoading = _state.isLoading,
          scrollContainer = this.scrollContainer;


      if (!this._isFunction(renderItems)) {
        return null;
      }
      var InfiniteScrollSkin = skin || context.skins[_.IDENTIFIERS.INFINITE_SCROLL];

      return _react2.default.createElement(InfiniteScrollSkin, {
        className: className,
        data: data,
        error: error,
        hasMoreData: hasMoreData,
        isLoading: isLoading,
        renderItems: renderItems,
        scrollContainerRef: scrollContainer,
        theme: composedTheme,
        themeId: themeId
      });
    }
  }]);

  return InfiniteScrollBase;
}(_react.Component);

InfiniteScrollBase.displayName = 'InfiniteScroll';
InfiniteScrollBase.defaultProps = {
  context: (0, _withTheme.createEmptyContext)(),
  fetchData: function fetchData() {},

  theme: null,
  themeId: _.IDENTIFIERS.INFINITE_SCROLL,
  themeOverrides: {},
  threshold: 250
};
var InfiniteScroll = exports.InfiniteScroll = (0, _withTheme.withTheme)(InfiniteScrollBase);
//# sourceMappingURL=InfiniteScroll.js.map