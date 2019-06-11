'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getMousePosition = exports.getMousePosition = function getMousePosition(event) {
  return {
    x: event.pageX - (window.scrollX || window.pageXOffset),
    y: event.pageY - (window.scrollY || window.pageYOffset)
  };
};
// $FlowFixMe
var getTouchPosition = exports.getTouchPosition = function getTouchPosition(event) {
  return {
    x: event.touches[0].pageX - (window.scrollX || window.pageXOffset),
    y: event.touches[0].pageY - (window.scrollY || window.pageYOffset)
  };
};

var pauseEvent = exports.pauseEvent = function pauseEvent(event) {
  event.stopPropagation();
  event.preventDefault();
};

var addDocumentListeners = exports.addDocumentListeners = function addDocumentListeners(eventMap) {
  for (var key in eventMap) {
    if (Object.prototype.hasOwnProperty.call(eventMap, key)) {
      document.addEventListener(key, eventMap[key], false);
    }
  }
};

var removeDocumentListeners = exports.removeDocumentListeners = function removeDocumentListeners(eventMap) {
  for (var key in eventMap) {
    if (Object.prototype.hasOwnProperty.call(eventMap, key)) {
      document.removeEventListener(key, eventMap[key], false);
    }
  }
};

var addWindowListeners = exports.addWindowListeners = function addWindowListeners(eventMap) {
  for (var key in eventMap) {
    if (Object.prototype.hasOwnProperty.call(eventMap, key)) {
      window.addEventListener(key, eventMap[key]);
    }
  }
};

var removeWindowListeners = exports.removeWindowListeners = function removeWindowListeners(eventMap) {
  for (var key in eventMap) {
    if (Object.prototype.hasOwnProperty.call(eventMap, key)) {
      window.removeEventListener(key, eventMap[key]);
    }
  }
};

var targetIsDescendant = exports.targetIsDescendant = function targetIsDescendant(event, parent) {
  var clickedNode = event.target;

  // if the node exists,
  // the node is not the given parent,
  // and the node does not contain the parent,
  // then the node is a descendant of the parent
  if (clickedNode && parent && parent.contains(clickedNode) && !clickedNode.contains(parent)) {
    return true;
  }

  // otherwise it is not a descendant of the given parent
  return false;
};

var addEventListenerOnTransitionEnded = exports.addEventListenerOnTransitionEnded = function addEventListenerOnTransitionEnded(element, fn) {
  var eventName = transitionEventNamesFor(element);
  if (!eventName) return false;
  element.addEventListener(eventName, fn);
  return true;
};

var removeEventListenerOnTransitionEnded = exports.removeEventListenerOnTransitionEnded = function removeEventListenerOnTransitionEnded(element, fn) {
  var eventName = transitionEventNamesFor(element);
  if (!eventName) return false;
  element.removeEventListener(eventName, fn);
  return true;
};

// constants and helper functions /////////

var TRANSITIONS = {
  transition: 'transitionend',
  OTransition: 'oTransitionEnd',
  MozTransition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd'
};

/* eslint space-before-function-paren:0 */
function transitionEventNamesFor(element) {
  for (var _transition in TRANSITIONS) {
    if (element && Object.prototype.hasOwnProperty.call(element.style, _transition)) {
      return TRANSITIONS[_transition];
    }
  }
}
//# sourceMappingURL=events.js.map