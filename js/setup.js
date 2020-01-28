'use strict';

var COUNT_CHARACTERS = 4;
var userDialog = document.querySelector('.setup');
var similarWizardsBlock = userDialog.querySelector('.setup-similar');

var showBlock = function (block) {
  block.classList.remove('hidden');
};
/*
var hideBlock = function (block) {
  block.classList.add('hidden');
};
*/
showBlock(userDialog);

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomItem = function (dataList) {
  return dataList[Math.floor(Math.random() * dataList.length)];
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

renderSimilarWizards();

showBlock(similarWizardsBlock);
