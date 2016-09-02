module.exports = function categoryRoutes(router, client){
	var category = require('../models/category');
	router.get('/api/categories', category(client).getAll);
	router.get('/api/categories/:id', category(client).get);
}
