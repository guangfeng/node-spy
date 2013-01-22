var MySQLPool = require("mysql-pool").MySQLPool;

var DataBase = function (opts) {
	this.pool_size = opts.psize || 10;
	this.host		= opts.host || "localhost";
	this.options 	= opts;
	this.options["host"] = this.host;
	this.options["poolSize"] = this.pool_size;
	
	this.connector = new MySQLPool (this.options);
}

DataBase.prototype.getConnector = function () {
	return this.connector;
}

DataBase.prototype.execute = function(sql, value, cb) {
	return this.connector.query(sql, value, cb);
}

DataBase.prototype.useDataBase  = function(db, cb) {
	this.connector.useDataBase(db, cb);
	return this;
}

DataBase.prototype.escape = function(val) {
	return this.connector.escape(val);
}

DataBase.prototype.end = function(cb) {
	return this.connector.end(cb);
}

if (typeof module !== 'undefined' && "exports" in module) {
	module.exports = {DataBase: DataBase};
}