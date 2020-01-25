'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var COLOR_CLOUD = '#fff';
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.3)';

var INDENT = 30; // Отступ слева и сверху

var CHART_HEIGHT = 150; // максимальная высота колонки
var CHART_WIDTH = 40; // ширина колонки
var CHART_SPACE = 50; // расстояние между колонками
var CHART_COLOR = 'rgba(255, 0, 0, 1)';

var TEXT_COLOR = '#000';
var FONT = '16px PT Mono';
var LINE_HEIGHT = 20;


var renderCloud = function (ctx, x, y, colorCloud, colorShadow) {
  ctx.fillStyle = colorShadow;
  ctx.fillRect(x + GAP, y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = colorCloud;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomBlueColor = function () {
  return 'hsl(240,' + Math.floor(Math.random() * 101) + '%, 50%)';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_CLOUD, COLOR_SHADOW);

  var maxNumber = Math.max.apply(null, times); // вычисляем максимальное время в массиве данных

  ctx.font = FONT;

  var startX = CLOUD_X + INDENT; // коррдината, с которой начинается построение гистограммы
  var startY = CLOUD_Y + CLOUD_HEIGHT - INDENT + GAP; // коррдината, с которой начинается построение гистограммы

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], startX, startY);

    if (names[i] === 'Вы') {
      ctx.fillStyle = CHART_COLOR;
    } else {
      ctx.fillStyle = getRandomBlueColor();
    }

    var heightColumn = times[i] * CHART_HEIGHT / maxNumber; // вычисляем высоту колонки по пропорции
    var startChartY = startY - LINE_HEIGHT - heightColumn; // координата с которой начинается построение колонок гистограммы

    ctx.fillRect(startX, startChartY, CHART_WIDTH, heightColumn);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]), startX, startY - heightColumn - INDENT);
    startX += CHART_WIDTH + CHART_SPACE;
  }

  ctx.fillText('Ура вы победили!', CLOUD_X + INDENT, CLOUD_Y + INDENT);
  ctx.fillText('Список результатов:', CLOUD_X + INDENT, CLOUD_Y + INDENT + LINE_HEIGHT);
};
