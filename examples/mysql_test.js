var DataBase = require("./data.js").DataBase;
var db = new DataBase({user:	'root',
						password:"xxx",
						database:'mall',
						host:'localhost'});

db.execute("insert into items (`title`,`pays`) values (" + db.escape("尼玛") +",'sss')", function(err, rows, fields) {
	  if(err) console.log(err);
	  console.log(rows);
	});

console.log("insert into items (`title`,`pays`) values ('" + "尼玛" +"','sss')");
