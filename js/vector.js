function Vector()
{
  this.x = 0;
  this.y = 0;
  this.z = 0;

  switch (arguments.length)
  {
    case 1:
      this.x = this.y = this.z = arguments[0];
      break;

    case 3:
      this.z = arguments[2];

    case 2:
      this.x = arguments[0];
      this.y = arguments[1];
      break;
  }
}

Vector.prototype.print = function()
{
    if (arguments.length && arguments[0] == 2)
      console.log("X: " + this.x + ", Y: " + this.y);
    else
      console.log("X: " + this.x + ", Y: " + this.y + ", Z: " + this.z);
}

Vector.prototype.add = function(v)
{
  return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
}

Vector.prototype.sub = function(v)
{
  return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
}

Vector.prototype.mul = function(n)
{
  return new Vector(this.x * n, this.y * n, this.z * n);
}

Vector.prototype.div = function(n)
{
  return new Vector(this.x / n, this.y / n, this.z / n);
}

Vector.prototype.normalize = function()
{
  var l = this.length();

  if (l > 0)
    return this.div(l);

  return this;
}

Vector.prototype.length = function()
{
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}
