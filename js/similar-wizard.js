'use strict';

window.similarWizard = (function () {
  var COUNT_CHARACTERS = 4;

  var similarWizardsBlock = document.querySelector('.setup-similar');
  var similarListElement = similarWizardsBlock.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  return {
    showSimilarWizardsBlock: function () {
      similarWizardsBlock.classList.remove('hidden');
    },
    getCharacters: function (name, surname, colorCoat, colorEyes) {
      var characters = [];
      for (var i = 0; i < COUNT_CHARACTERS; i++) {
        var character = {
          name: window.getItem.getRandomItem(name) + ' ' + window.getItem.getRandomItem(surname),
          coatColor: window.getItem.getRandomItem(colorCoat),
          eyesColor: window.getItem.getRandomItem(colorEyes)
        };
        characters.push(character);
      }
      return characters;
    },
    createWizardElement: function (wizard) {
      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

      return wizardElement;
    },
    renderSimilarWizards: function () {
      var fragment = document.createDocumentFragment();
      var wizards = window.similarWizard.getCharacters(firstNames, lastNames, window.colorize.coatColors, window.colorize.eyesColors);
      for (var i = 0; i < wizards.length; i++) {
        fragment.appendChild(window.similarWizard.createWizardElement(wizards[i]));
      }
      similarListElement.appendChild(fragment);
    }
  };
})();
