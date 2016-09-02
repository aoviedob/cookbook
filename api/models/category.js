module.exports = function category(client){
  function getAllCategories(req, res, next) {
    client.any('select * from category')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved all categories'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  function getCategory(req, res, next) {
    var categoryID = parseInt(req.params.id);
    client.one('select * from category where id = $1', categoryID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved one category'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  return {
    getAll: getAllCategories,
    get: getCategory
  }
}

