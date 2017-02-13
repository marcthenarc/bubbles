function Circle(v, r)
{
  this.pos = new Vector(v.x, v.y, v.z);
  this.radius = r;
  this.inner = "#ffffff";
  this.outer = "#000000";
  this.lineWidth = 1;
  this.direction = new Vector(0);
  this.lowerLimit = 0;
  this.upperLimit = 999999;
}

Circle.prototype.SetColor = function ()
{
  switch (arguments.length)
  {
    case 1:
      this.inner = arguments[0];
      this.outer = arguments[0];
      this.lineWidth = 0;
      break;

    case 2:
      this.inner = arguments[0];
      this.outer = arguments[1];
      this.lineWidth = 5;
      break;

    case 3:
      this.inner = arguments[0];
      this.outer = arguments[1];
      this.lineWidth = arguments[2];
      break;
  }
};

Circle.prototype.Move = function()
{
  this.pos = this.pos.add(this.direction);
}

Circle.prototype.Draw = function()
{
  var c = (arguments.length) ? arguments[0] : ctx;

  c.beginPath();
  c.arc(this.pos.x, this.pos.y, this.radius, 0, twoPI);
  c.fillStyle = this.inner;
  c.fill();
  c.lineWidth = this.lineWidth;
  c.strokeStyle = this.outer;
  c.stroke();
}

Circle.prototype.SetSizeLimits = function(lower, higher)
{
  this.lowerLimit = lower;
  this.upperLimit = higher;
}

Circle.prototype.Grow = function(amount)
{
  if (amount < 0)
    this.Shrink(Math.abs(amount));
  else
  {
    if (this.radius + amount > this.upperLimit)
      this.radius  = this.upperLimit;
    else
      this.radius += amount;
  }
}

Circle.prototype.CanGrow = function()
{
  return (this.radius < this.upperLimit);
}

Circle.prototype.StopGrow = function()
{
  this.upperLimit = this.radius;
}

Circle.prototype.CanShrink = function()
{
  return (this.radius > this.lowerLimit);
}

Circle.prototype.StopShrink = function()
{
  this.lowerLimit = this.radius;
}

Circle.prototype.Shrink = function(amount)
{
  if (amount < 0)
    this.Grow(Math.abs(amount));
  else
  {
    if (this.radius - amount < this.lowerLimit)
      this.radius  = this.lowerLimit;
    else
      this.radius -= amount;
  }
}

Circle.prototype.IsPointInside = function(p)
{
  return (this.pos.sub(p).length() <= this.radius);
}

Circle.prototype.IsCircleInside = function(c)
{
  return (this.pos.sub(c.pos).length() < this.radius + c.radius);
}
