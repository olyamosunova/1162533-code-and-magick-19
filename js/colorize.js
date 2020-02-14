'use strict';

window.colorize = (function () {

  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  return {
    coatColors: coatColors,
    eyesColors: eyesColors,
    fireballColors: fireballColors,
    changeAppearanceWizard: function (thing, inputThing, colorsList) {
      var getNextColor = window.getItem.getNextItem(colorsList);
      var a = 1;
      for (var i = 0; i < a; i++) {
        thing.addEventListener('click', function () {
          a++;
          var color = getNextColor();
          if (thing.tagName.toLowerCase() === 'div') {
            thing.style.background = color;
          } else {
            thing.style.fill = color;
          }
          inputThing.value = color;
        });

        thing.addEventListener('keydown', function (evt) {
          a++;
          var color = getNextColor();
          if (evt.keyCode === window.util.ENTER_KEY_CODE) {
            if (thing.tagName.toLowerCase() === 'div') {
              thing.style.background = color;
            } else {
              thing.style.fill = color;
            }
            inputThing.value = color;
          }
        });
      }
    }
  };
})();
