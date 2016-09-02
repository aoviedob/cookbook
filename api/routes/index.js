module.exports = function routes(express, client){
	var router = express.Router();
	
	var categoryRoutes = require('./category');
	categoryRoutes(router, client);

	var recipeRoutes = require('./recipe');
	recipeRoutes(router, client);

	var ingredientRoutes = require('./ingredient');
	ingredientRoutes(router, client);

	var ratingRoutes = require('./rating');
	ratingRoutes(router, client);

	return router;
}
