var util = require('util')
    , fs = require("fs");

var Proxybot = function (proxy) {
	this.proxy = proxy || "proxy.txt";
	this.proxy = fs.readFileSync(this.proxy).toString().split("\n");
	this.cache = {};
}

Proxybot.prototype.get = function () {

		var _rand_index = Math.floor(Math.random()*this.proxy.length + 1);
		return  this.proxy[_rand_index];
}

