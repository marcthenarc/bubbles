function Loader()
{
	this.onFinished = function() { };
	this.total = 0;
	this.loaded = 0;
}

Loader.prototype.GetAssets = function(assets)
{
	this.total = Object.keys(assets).length;
	var self = this;

	Object.keys(assets).forEach(function(key,index) {

		self.Fetch(key, assets[key]);
	});
}

Loader.prototype.Fetch = function(key, ele)
{
	var img = new Image();
	img.src = ele.url;

	var self = this;

	img.onload = function() {

		if (ele.type == 'image')
			ele.data.Init(img);

		self.loaded++;

		if (self.loaded == self.total)
			self.onFinished();
	};
};

Loader.prototype.Finished = function(cb)
{
	this.onFinished = cb;
}
