function Sprite(img)
{
	this.valid = false;

		if (img !== undefined)
			this.Init(img);
}

Sprite.prototype.Init = function(img)
{
	this.img = img;
	this.width = img.width;
	this.height = img.height;
	this.frames = 1;
	this.tickCount = 0;
	this.ticksPerFrame = 2;
	this.frameIndex = 0;
	this.animate = false;
	this.x = 0;
	this.y = 0;
	this.valid = true;
	this.pixelData = [];
}

Sprite.prototype.SetFrames = function(no, animate) {
	this.width =  this.img.width / no;
	this.height = this.img.height;
	this.frames = no;
	this.animate = (animate !== undefined) ? animate : false;
};

Sprite.prototype.SetCurrentFrame = function(no)
{
	this.frameIndex = no;
}

Sprite.prototype.Render = function() {

	var c = (arguments.length) ? arguments[0] : ctx;

	c.clearRect(this.x, this.y, this.width, this.height);

	c.drawImage(
		this.img,
		this.width * this.frameIndex,
		0,
		this.width,
		this.height,
		this.x,
		this.y,
		this.width,
		this.height
	);
};

Sprite.prototype.Update = function() {

	if (this.animate)
	{
		this.tickCount +=1

    	if (this.tickCount > this.ticksPerFrame)
		{
	  		this.tickCount = 0;

		   // Go to the next frame

		  this.frameIndex++;

		  if (this.frameIndex == 30)
		  	this.frameIndex = 0;
		}
	}
}

Sprite.prototype.IsPointInside = function(v)
{
	return (v.x >= this.x && v.y >= this.y && v.x < this.x + this.width && v.y < this.y + this.height);
}

Sprite.prototype.CapturePixelData = function()
{
	var osCanvas = document.createElement('canvas');
	var x2d = osCanvas.getContext("2d");

	osCanvas.width = img.width;
	osCanvas.height = img.height;
	img.Render(x2d);

	this.pixelData = x2d.getImageData(0, 0, img.width, img.height).data;
}

Sprite.prototype.GetColor = function(x, y)
{
	if (this.pixelData.length == 0)
		this.CapturePixelData();

	return this.pixelData[y * this.width + x];
}

Sprite.prototype.FilterPixelData = function(compressFunc)
{
	if (this.pixelData.length == 0)
		this.CapturePixelData();

	for (var j=0; j<this.img.height; j++)
	{
		for (var i=0; i<this.img.width; i++)
		{
			var p = i * 4 + j * this.img.width * 4;
			var d = this.pixelData;
			compressFunc(i, j, {r: d[p], g: d[p+1], b: d[p+2], a: d[p+3]});
		}
	}
}
