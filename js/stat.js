'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var CHART_HEIGHT = 150; // максимальная высота колонки
var CHART_WIDTH = 40; // ширина колонки
var CHART_SPACE = 50; // расстояние между колонками

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxNumber = Math.max.apply(null, times); // вычисляем максимальное время в массиве данных

  var getColor = function () {
    return 'hsl(240,' + Math.floor(Math.random() * 101) + '%, 50%)';
  };

  ctx.font = '16px PT Mono';
  var startX = 150; // коррдината, с которой начинается построение гистограммы
  var startY = 270; // коррдината, с которой начинается построение гистограммы

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], startX, startY);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getColor();
    }

    var heightColumn = times[i] * CHART_HEIGHT / maxNumber; // вычисляем высоту колонки по пропорции
    var startChartY = startY - 20 - heightColumn; // координата с которой начинается построение колонок гистограммы

    ctx.fillRect(startX, startChartY, CHART_WIDTH, heightColumn);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), startX, startY - heightColumn - 30);
    startX += CHART_WIDTH + CHART_SPACE;
  }

  ctx.fillText('Ура вы победили!', CLOUD_X + 20, 40);
  ctx.fillText('Список результатов:', CLOUD_X + 20, 60);
};
