var Spy = require('./node-spy.js').Spy
	, util = require('util')
	, fs = require("fs");
	;

var host = "www.xroxy.com";

var proxy = new Spy({"forceutf8":false,debug:1,"cache":true,"agent":"User-Agent	Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0"});



var process_chart = function (error,result,$,params,splats) {

	$('#content table:eq(1) tr[class*="row"]').each(function(){
		   var tr=$(this),ip=$.trim(tr.find('td:eq(1) a')[0].childNodes[0].nodeValue),port=$.trim(tr.find('td:eq(2)').text());
		   console.log(ip+':'+port);
		   fs.appendFile('proxy.txt', ip + ":" + port + "\n" , function (err) {
			   console.log(err);
		   });
		});
}
proxy.route(host, "/proxylist.php*", process_chart);


var generater_proxy_url = function (){

	for(var i = 10; i < 30; ++i) {
		proxy.add({"url":"http://www.xroxy.com/proxylist.php?port=&type=Anonymous&ssl=&country=&latency=&&pnum=" + i + "&reliability=#table"});
	}
	
}

//proxy.add({"url":"http://www.xroxy.com/proxylist.php?port=&type=Anonymous&ssl=&country=&latency=&reliability=#table","debug":true});
generater_proxy_url();
