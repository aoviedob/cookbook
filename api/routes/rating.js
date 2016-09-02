module.exports = function ingredientRoutes(router, client){
	var rating = require('../models/rating');
	router.post('/api/ratings', rating(client).create);
}