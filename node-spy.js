var nCrawler = require("crawler").Crawler
	, nCookieJar = require('cookiejar')
	, nRoutes = require('routes')
	, urlParse = require('url').parse
	, urlResolve = require('url').resolve
	;

var _headers = 
{ 'accept': "application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
};

var _firefox = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) ' +
				'AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.41 Safari/534.7';


var copy = function (obj) {
	  var n = {}
	  for (i in obj) {
	    n[i] = obj[i];
	  }
	  return n
	};

function Spy (options) {
	  this.maxconnections = options.maxconnections || 10;
	  this.agent = options.agent || _firefox;
	  this.cache = options.cache || false;
	  this.spool = options.spool || {maxconnections: this.maxconnections};
	  this.options = options;
	  this.forceutf8 = options.forceutf8 || true;
	  this.currentUrl = null;
	  this.routers = {};
	  this.urls = [];
	  this.jar = true;
	  this.timeout = this.timeout || 6000;
	  this.crawler = options.crawler || new nCrawler({"maxConnections":this.maxconnections,
		  												"forceUTF8":this.forceutf8,
		  												"timeout":this.timeout,
		  												"routers":this.routers,
		  											});
	  
}

Spy.prototype.cb = function (error,result,$) {
	var u = urlParse(result.uri)
	    , self = this
	    ;
	//console.log(this);
	
	if (this.routers[u.host]) {
	    var r = this.routers[u.host].match(u.href.slice(u.href.indexOf(u.host)+u.host.length));
	    if(r.fn) {
	    	
//	    	if(result.options["debug"])
//	    		console.log("[DEBUG] PROCESS " + u + " WITH " + r.fn);
	    	
	    	r.fn(error,result,$,r.params,r.splats);
	    }
	    
	}
}

Spy.prototype.route = function (hosts, pattern, cb) {
	  var self = this;
	  if (typeof hosts === 'string') {
	    hosts = [hosts];
	  }
	  hosts.forEach(function (host) {
	    if (!self.routers[host]) self.routers[host] = new nRoutes.Router();
	    self.routers[host].addRoute(pattern, cb);
	  })
	  return self;
}

Spy.prototype.add = function (opts) {
	if (typeof opts === 'string') {
	    opts = {"url":opts};
	  }
	
	var self = this
    , h = copy(_headers)
    , referer = opts.referer || null
    , url = opts.url
    , uri = url.slice(0, (url.indexOf('#') === -1) ? url.length : url.indexOf('#'))
    ;
	
	
	var u = urlParse(url);
	if (!this.routers[u.host]) {
		console.log('DEBUG', 'No routes for host: '+u.host+'. skipping.')
	    return this;
	}
	if (!this.routers[u.host].match(u.href.slice(u.href.indexOf(u.host)+u.host.length))) {
		console.log('DEBUG', 'No routes for path '+u.href.slice(u.href.indexOf(u.host)+u.host.length)+'. skipping.')
	    return this;
	}
	  
	if (referer) h.referer = referer;  
	h['user-agent'] = this.agent;
	
	//本来有一个处理last-modified的逻辑，现在不写了
	
	
	opts["uri"] = uri;
	opts["jar"] = opts["jar"] || self.jar;
	opts["spool"] = self.spool;
	opts["headers"] = h;
	opts["callback"] = self.cb;
	
	
	self.crawler.queue([opts,]);
	
	return this;
}

Spy.prototype.release = function () {
	var self = this;
	return self.crawler.pool.darin(function()  {
		self.crawler.pool.destroyAllNow();
	});
}

if (typeof module !== 'undefined' && "exports" in module) {
	module.exports = {Spy: Spy};
}
