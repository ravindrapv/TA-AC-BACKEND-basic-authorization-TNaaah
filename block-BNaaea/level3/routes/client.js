var express = require('express');
var router = express.Router();

var Product = require('../models/Product');
var auth = require('../middlewares/Auth');

// list allProducts
router.get('/product', (req, res, next) => {
  Product.find({}, (err, products) => {
    let user = req.user;
    console.log(err, products);
    if (err) return next(err);
    res.render('clientsAllProducts', { products, user });
  });
});

// to get Specific product
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  let user = req.user;
  Product.findById(id, (err, product) => {
    if (err) return next(err);
    res.render('clientsEachProduct', { product, user });
  });
});

router.use(auth.loggedInUser);

// likes and dislikes

router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;
  Product.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, product) => {
    if (err) return next(err);
    res.redirect('/client/' + id);
  });
});

router.get('/:id/dislikes', (req, res, next) => {
  let id = req.params.id;
  Product.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, product) => {
    if (err) return next(err);
    res.redirect('/client/' + id);
  });
});

module.exports = router;
