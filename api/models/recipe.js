module.exports = function recipe(client){
  var ingredient = require('../models/ingredient');

  function getAllRecipes(req, res, next) {
    client.any('select recipe.*,category.name as categoryName,'+ 
                'coalesce(json_agg(DISTINCT ingredient.*) FILTER (WHERE ingredient.recipeid IS NOT NULL),\'[]\') as ingredients,'+
                'round(coalesce(avg(rating.stars),0.0),1) as rating, round(coalesce(avg(rating.stars),0)) as stars from recipe ' + 
                'inner join category on (recipe.category = category.id) '+
                'left join ingredient on (recipe.id = ingredient.recipeid) '+
                'left join rating on (recipe.id = rating.recipeid) '+
                'group by recipe.id, category.name')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved all recipes'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  function createRecipe(req, res, next) {
    if(req.body.category){
      req.body.category = parseInt(req.body.category);
    }
    client.one('insert into recipe(name, category, chef, preparation)' +
            'values(${name}, ${category}, ${chef}, ${preparation}) RETURNING id', req.body)
    .then(function (data) {
      if(req.body.ingredients.length && data.id){
        ingredient(client).createIngredients(data.id, req.body.ingredients);
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one recipe with ingredients'
        });

      }else{
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one recipe without ingredients'
          });
      }
    })
    .catch(function (err) {
      return next(err);
    });
  }
  function editRecipe(req, res, next) {
    req.body.id = parseInt(req.body.id);
    req.body.category = parseInt(req.body.category);
    client.none('update recipe set name=${name}, category=${category}, chef=${chef}, preparation=${preparation} ' +
                'where id=${id}', req.body)
    .then(function () {
      if(req.body.ingredients.length > 0) {
        ingredient(client).createIngredients(req.body.id, req.body.ingredients);
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated one recipe with ingredients'
        });

      }else{
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated one recipe without ingredients'
          });
      }
    })
    .catch(function (err) {
      return next(err);
    });
  }
  function deleteRecipe(req, res, next) {
    var recipeID = parseInt(req.params.id);
    client.query('begin;'+
                  'delete from ingredient where recipeid=$1;'+
                  'delete from rating where recipeid=$1;'+
                  'delete from recipe where id = $1;'+
                  'commit;', recipeID)
      .then(function (result) {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed recipe`
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  return {
    getAll: getAllRecipes,
    create: createRecipe,
    edit: editRecipe,
    delete: deleteRecipe
  }
}
