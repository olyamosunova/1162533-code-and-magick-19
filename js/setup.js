'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userName = userDialog.querySelector('.setup-user-name');
  var dialogHandler = userDialog.querySelector('.upload');

  var setupWizard = userDialog.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = userDialog.querySelector('.setup-fireball-wrap');
  var inputCoat = userDialog.querySelector('[name="coat-color"]');
  var inputEyes = userDialog.querySelector('[name="eyes-color"]');
  var inputFireball = userDialog.querySelector('[name="fireball-color"]');

  var positionUserDialog = {
    x: userDialog.style.left,
    y: userDialog.style.top
  };


  var onPopupEscPress = function (evt) {
    if ((evt.target !== userName) && (evt.keyCode === window.util.ESC_KEY_CODE)) {
      hidePopup();
    }
  };

  var showPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var hidePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);

    userDialog.style.left = positionUserDialog.x;
    userDialog.style.top = positionUserDialog.y;
  };

  userDialogOpen.addEventListener('click', function () {
    showPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, showPopup);
  });

  userDialogClose.addEventListener('click', function () {
    hidePopup();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, hidePopup);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.colorize.changeAppearanceWizard(wizardCoat, inputCoat, window.colorize.coatColors);
  window.colorize.changeAppearanceWizard(wizardEyes, inputEyes, window.colorize.eyesColors);
  window.colorize.changeAppearanceWizard(fireball, inputFireball, window.colorize.fireballColors);

  window.similarWizard.renderSimilarWizards();
  window.similarWizard.showSimilarWizardsBlock();
})();
