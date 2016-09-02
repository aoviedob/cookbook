module.exports = function server(express){
	var client = require('./config/database')();
	var router = require('./routes/index')(express, client);
	return router;
}

