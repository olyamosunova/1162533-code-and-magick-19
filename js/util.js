'use strict';

window.util = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  return {
    ESC_KEY_CODE: ESC_KEY_CODE,

    ENTER_KEY_CODE: ENTER_KEY_CODE,

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY_CODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        action();
      }
    }
  };
})();
