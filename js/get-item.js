'use strict';

window.getItem = (function () {
  return {
    getRandomItem: function (dataList) {
      return dataList[Math.floor(Math.random() * dataList.length)];
    },
    getNextItem: function (array) {
      var index = -1;
      return function () {
        index++;
        if (index === array.length) {
          index = 0;
        }
        return array[index];
      };
    }
  };
})();
