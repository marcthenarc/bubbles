var circles = [];
var img = [];
var data = []
var v = {};
var maxGrow = 50;
var currentLogo = 0;
var count = 0;
var logos =
[
  { png: 'png/2017.png', color: '#63ff00'},
  { png: 'png/marcthenarc.png', color: 'yellow'},
  { png: 'png/twitch.png', color: '#9b65ff' },
  { png: 'png/twitter.png', color: '#2aa9e0'},
  { png: 'png/steam.png', color: 'white'},
  { png: 'png/youtube.png', color: 'red'}
];

function init()
{
  count = 0;
  circles = [];
  data = [];
  l = logos[currentLogo];
  img = loadImage(l.png);
  img.logoColor = l.color;
  v = new Vector();
}

function setup()
{
  if (img.valid)
  {
    // This is where we filter the pixel data and
    // only keep the valid ones.
    img.FilterPixelData(function(x, y, pixel)
    {
      if (pixel.r > 127)
        data.push({x: x, y: y, hit: false});
    });
  }
}

function draw()
{
  // Clear screen
  background('black');

  // This will help us center the image.
  if (img.valid)
  {
    img.x = width / 2 - img.width / 2;
    img.y = height / 2 - img.height / 2;
  }

  // Draw 10 bubbles at a time.
  for (var i=0; i<10; i++)
  {
    // Select a random point in the data.
    var d = data[getRandomInt(0, data.length)];

    // Was it previously selected ?
    if (!d.hit)
    {
      // Center the point based on image.
      v.x = d.x + img.x;
      v.y = d.y + img.y;

      // If the point is not inside some circle,
      // create a new one based on it.
      if (checkValidPoint(v))
        newCircle(v);

      // mark it.
      d.hit = true;
    }
  }

  // Make the circles grow.
  everybodyGrow();

  // Then draw them.
  drawCircles();

  // Switch logo after a 1000 iterations.
  if (count++ == 1000)
  {
    currentLogo = (currentLogo + 1 == logos.length) ? 0: currentLogo + 1;
    rebase();
  }
}

function everybodyGrow()
{
  // For each circle ...
  for (var i=0; i<circles.length; i++)
  {
    var c1 = circles[i];

    // Can it still grow ?
    if (c1.CanGrow())
    {
      // Does it hit another circle ?
      for (var j=0; j<circles.length; j++)
      {
          // Don't compare it to itself.
          if (i==j)
            continue;

          var c2 = circles[j];

          // If indeed it touches one ...
          if (c1.IsCircleInside(c2))
          {
            // ... might as well make it stop growing.
            // And abort.
            c1.StopGrow();
            break;
          }
      } // j

      // Check again.
      if (c1.CanGrow())
        c1.Grow(1);
    }
  } // i
}

function checkValidPoint(p)
{
  for (var i=0; i<circles.length; i++)
  {
    if (circles[i].IsPointInside(p))
      return false;
  }

  return true;
}

function drawCircles()
{
  for (var i=0; i<circles.length; i++)
    circles[i].Draw();
}

function newCircle(v)
{
  var c = new Circle(v, 1);
  c.SetColor('black', img.logoColor, 1);
  c.SetSizeLimits(1, maxGrow);
  circles.push(c);
}
