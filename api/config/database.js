var connectToDB = function(){
	var pgp = require('pg-promise')();
	var connectionString=process.env.DATABASE_URL || 'postgres://postgres:mysecretpassword@localhost:5432/postgres';
	var client = pgp(connectionString);
	return client;
}
module.exports = connectToDB;


