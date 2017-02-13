var ctx = {};
var canvas = {};
var onePI = Math.PI;
var twoPI = 2 * Math.PI;
var halfPI = Math.PI / 2;
var quarterPI = Math.PI / 4;
var start = null;
var width = 0;
var height = 0;
var randomPointInCanvas = {};
var loader = {}
var assets = [];
var rebased = false;

function base()
{
  if (!rebased)
  {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
  }

  rebased = false;

  if (init && typeof init === 'function')
    init();

  if (assets.length == 0)
    base_start();
  else
  {
    var loader = new Loader();
    loader.Finished(base_start);
    loader.GetAssets(assets);
  }
}

function base_start()
{
  setup();
  requestAnimationFrame(loop);
}

function rebase()
{
  rebased = true;
}

function loop(timestamp)
{
  draw();
  requestAnimationFrame((rebased) ? base : loop);
}

function background(color)
{
  ctx.fillStyle=color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getRandomInt(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}
var seed = 1;

function sinRandom()
{
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getRandomPointInCanvas()
{
  randomPointInCanvas.x = getRandomInt(0, width);
  randomPointInCanvas.y = getRandomInt(0, height);
  randomPointInCanvas.z = 0;

  return randomPointInCanvas;
}

function loadImage(loc)
{
  var s = new Sprite();
  var n = "" + assets.length;
  assets[assets.length] = { url: loc, data: s, type: 'image'};
  return s;
}
