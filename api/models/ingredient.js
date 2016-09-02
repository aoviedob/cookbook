var ingredient = function ingredient(client){
  function getIngredients(req, res, next) {
    var recipeID = parseInt(req.params.id);
    client.any('select * from ingredient where recipeid = $1', recipeID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved recipe ingredients'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  function createIngredient(req, res, next) {
    client.none('insert into ingredient(recipeid, name, amount)' +
            'values(${recipeid}, ${name}, ${amount})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one ingredient'
        });
    })
    .catch(function (err) {
      return next(err);
    });
  }
  function createRecipeIngredients(recipeid, ingredients) {
    ingredients.forEach(function (ingredient){
      var formattedIngredient = {recipeid: recipeid, name: ingredient.name, amount: ingredient.amount};
        client.none('insert into ingredient(recipeid, name, amount)' +
                      'values(${recipeid}, ${name}, ${amount})',formattedIngredient).
          then(function () {
          })
          .catch(function (err) {
            return next(err);
          });
    });
  }
  function deleteIngredient(req, res, next) {
    var ingredientID = parseInt(req.params.id);
    client.result('delete from ingredient where id = $1', ingredientID)
      .then(function (result) {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} ingredient`
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  return {
    get: getIngredients,
    create: createIngredient,
    createIngredients: createRecipeIngredients,
    delete: deleteIngredient
  }
}
module.exports = ingredient;
