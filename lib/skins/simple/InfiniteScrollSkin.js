'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteScrollSkin = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfiniteScrollSkin = exports.InfiniteScrollSkin = function InfiniteScrollSkin(_ref) {
  var className = _ref.className,
      data = _ref.data,
      error = _ref.error,
      hasMoreData = _ref.hasMoreData,
      isLoading = _ref.isLoading,
      renderItems = _ref.renderItems,
      scrollContainerRef = _ref.scrollContainerRef,
      theme = _ref.theme,
      themeId = _ref.themeId;
  return _react2.default.createElement(
    'div',
    { ref: scrollContainerRef, className: (0, _classnames2.default)([className, theme[themeId].root]) },
    renderItems({
      data: data,
      error: error,
      hasMoreData: hasMoreData,
      isLoading: isLoading,
      theme: theme[themeId]
    })
  );
};

// external libraries
//# sourceMappingURL=InfiniteScrollSkin.js.map