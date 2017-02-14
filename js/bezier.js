function Bezier()
{
  this.points = [];
  this.color = 'black';
  this.width = 1;
  this.path = [];

  if (Array.isArray(arguments) && arguments[0].length == 4)
  {
    var a = arguments[0];

    for (var i=0; i<4; i++)
        this.points.push({ x: a[i].x, y: a[i].y });
  }
  else if (arguments.length == 4)
  {
    for (var i=0; i<4; i++)
      this.points.push({ x: arguments[i].x, y: arguments[i].y });
  }
}

Bezier.prototype.SetColor = function(color)
{
  this.color = color;
}

Bezier.prototype.SetLineWidth = function(width)
{
  this.width = width;
}

Bezier.prototype.Draw = function()
{
  ctx.beginPath();
  ctx.moveTo(this.points[0].x, this.points[0].y);
  ctx.bezierCurveTo(
    this.points[1].x, this.points[1].y,
    this.points[2].x, this.points[2].y,
    this.points[3].x, this.points[3].y
  );

  ctx.stokeStyle = this.color;
  ctx.lineWidth = this.width;

  ctx.stroke();
}

Bezier.prototype.GetPath = function(accuracy)
{
  this.path = [];

  for (var i=0; i<1; i+=accuracy)
  {
      var p = function(t, p0, p1, p2, p3)
      {
        var cX = 3 * (p1.x - p0.x),
            bX = 3 * (p2.x - p1.x) - cX,
            aX = p3.x - p0.x - cX - bX;

        var cY = 3 * (p1.y - p0.y),
            bY = 3 * (p2.y - p1.y) - cY,
            aY = p3.y - p0.y - cY - bY;

        var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
        var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

        return {x: x, y: y};
      }(this.points[0], this.points[1], this.points[2], this.points[3]);

      this.path.push(p);
    }
}
