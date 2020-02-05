'use strict';

var COUNT_CHARACTERS = 4;
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

var userDialog = document.querySelector('.setup');
var similarWizardsBlock = userDialog.querySelector('.setup-similar');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userName = userDialog.querySelector('.setup-user-name');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupWizard = userDialog.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireball = userDialog.querySelector('.setup-fireball-wrap');
var inputCoat = userDialog.querySelector('[name="coat-color"]');
var inputEyes = userDialog.querySelector('[name="eyes-color"]');
var inputFireball = userDialog.querySelector('[name="fireball-color"]');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var onPopupEscPress = function (evt) {
  if ((evt.target !== userName) && (evt.keyCode === ESC_KEY_CODE)) {
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
};

var showSimilarWizardsBlock = function () {
  similarWizardsBlock.classList.remove('hidden');
};

var getRandomItem = function (dataList) {
  return dataList[Math.floor(Math.random() * dataList.length)];
};

var getNextItem = function (array) {
  var index = -1;
  return function () {
    index++;
    if (index === array.length) {
      index = 0;
    }
    return array[index];
  };
};

var getCharacters = function (name, surname, colorCoat, colorEyes) {
  var characters = [];
  for (var i = 0; i < COUNT_CHARACTERS; i++) {
    var character = {
      name: getRandomItem(name) + ' ' + getRandomItem(surname),
      coatColor: getRandomItem(colorCoat),
      eyesColor: getRandomItem(colorEyes)
    };
    characters.push(character);
  }
  return characters;
};

var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderSimilarWizards = function () {
  var fragment = document.createDocumentFragment();
  var wizards = getCharacters(firstNames, lastNames, coatColors, eyesColors);
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

userDialogOpen.addEventListener('click', function () {
  showPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    showPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  hidePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    hidePopup();
  }
});

var changeAppearanceWizard = function (thing, inputThing, colorsList) {
  var getNextColor = getNextItem(colorsList);
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
      if (evt.keyCode === ENTER_KEY_CODE) {
        if (thing.tagName.toLowerCase() === 'div') {
          thing.style.background = color;
        } else {
          thing.style.fill = color;
        }
        inputThing.value = color;
      }
    });
  }
};

changeAppearanceWizard(wizardCoat, inputCoat, coatColors);
changeAppearanceWizard(wizardEyes, inputEyes, eyesColors);
changeAppearanceWizard(fireball, inputFireball, fireballColors);

renderSimilarWizards();
showSimilarWizardsBlock();
