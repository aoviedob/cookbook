module.exports = function rating(client){
  function createRating(req, res, next) {
    req.body.stars = parseInt(req.body.stars);
    req.body.recipeid = parseInt(req.body.recipeid);
    client.none('insert into rating(recipeid, stars, comment)' +
            'values(${recipeid}, ${stars}, ${comment})', req.body)
    .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one rating'
          });
    })
    .catch(function (err) {
      return next(err);
    });
  }

  return {
    create: createRating,
  }
}
