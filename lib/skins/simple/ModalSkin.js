'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalSkin = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalSkin = exports.ModalSkin = function ModalSkin(props) {
  return _react2.default.createElement(
    _reactModal2.default,
    {
      contentLabel: props.contentLabel,
      isOpen: props.isOpen,
      onRequestClose: props.onClose,
      shouldCloseOnOverlayClick: props.triggerCloseOnOverlayClick,
      className: props.theme[props.themeId].modal,
      overlayClassName: props.theme[props.themeId].overlay,
      ariaHideApp: false
    },
    props.children
  );
};

// external libraries
//# sourceMappingURL=ModalSkin.js.map