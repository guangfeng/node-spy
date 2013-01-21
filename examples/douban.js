var Spy = require('./node-spy.js').Spy
	, util = require('util')
	;

var movie_index = "movie.douban.com";

var douban = new Spy({debug:1});


//针对每一类需要提交处理的页面,分别给定一个url规则和对应的callback

//下面处理首页
var process_chart = function (error,result,$,params,splats) {
	//error是错误信号，result包含整个window的对象,$是装载了页面的jq对象,params是规则指定的对应参数,splats是通配
	
	$('.indent:eq(0) table').each(function(){
		 var table=$(this),href=table.find('.pl2 a').attr('href');
		 console.log("捕获到页面" + href)
		 douban.add(href);
		 })
}
douban.route(movie_index, "/chart?", process_chart);


//下面处理具体的电影页面
var process_movie = function (error, result, $, params, splats) {
	console.log("豆瓣 subject id->" + params.ID);
	
	var movie_name = $('h1 span:eq(0)').text();
	var movie_thumb = $('#mainpic img').attr('src').replace('mpic','lpic');

	var info=$('#info');
	info = info.text().split('\n');
	var infos={};
	for(x in info){
		var v=$.trim(info[x]);
		if(v!=''){
			v=v.split(":");
			switch (v[0]){
				case '导演': if(v[1])infos.direct=v[1];
				case '主演': if(v[1])infos.acts=v[1];
				case '编剧': if(v[1])infos.writer=v[1];
				case '类型': if(v[1])infos.type=v[1];
				case '制片国家/地区': if(v[1])infos.area=v[1];
				case '语言': if(v[1])infos.lan=v[1];
				case '上映日期': if(v[1])infos.time=v[1];
				case '片长': if(v[1])infos.len=v[1];
				case '又名': if(v[1])infos.names=v[1];
				case 'IMDb链接': if(v[1])infos.imdb=v[1];				
			}
		}
	}
	
	infos.name = movie_name;
	infos.thumb = movie_thumb
	
	console.log(infos);
	console.log("→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→");
}
douban.route(movie_index, "/subject/:ID?/?", process_movie)



//将入口add到里面,相当于启动
douban.add({"url":"http://movie.douban.com/chart","debug":true});
