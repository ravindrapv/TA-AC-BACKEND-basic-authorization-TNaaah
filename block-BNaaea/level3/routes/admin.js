var express = require('express');
var router = express.Router();
var Product = require('../models/Product');

// add product
router.get('/newproduct', (req,res,next) => {
    let user = req.user;
    res.render('adminAddProduct', { user })
});

router.post('/newproduct', (req,res,next) => {
    Product.create(req.body, (err,product) => {
        if(err) return next(err);
        res.redirect('/admin/allProducts');
    })
})
// list all products
router.get('/allproducts', (req,res,next) => {
    Product.find({}, (err,allproducts) => {
        let user = req.user;
        if(err) return next(err);
        res.render('adminAllProducts' , {user ,allproducts })
    })
})
// list all clients
router.get('/allclients',(req,res,next)=> {
    let user = req.user;
    res.render('allClients', { user })
})

// list all products
router.get('/:id', (req,res,next) =>{ 
    var id = req.params.id;
    let user = req.user;
    Product.findById(id, (err,eachproduct) => {
        if(err) return next(err);
        res.render('adminEachProduct', {eachproduct , user});
    })
})

// edit 
router.get('/:id/edit' ,(req,res,next) => {
    let id = req.params.id;
    let user = req.user;
    Product.findById(id,(err,product) => {
        if(err) return next(err);
        res.render('adminUpdateProduct', { product , user })
    })
})

router.post('/:id/updated', (req,res,next) => {
    let id= req.params.id;
    Product.findByIdAndUpdate(id, req.body, (err,product) => {
        if(err) return next(err);
        res.redirect('/admin/' + id);        
    })
})

// delete
router.get('/:id/delete',(req,res,next)=> {
    let id= req.params.id;
    Product.findByIdAndDelete(id, (err, product) => {
        if(err) return next(err);
        res.redirect('/admin/allproducts');
    })
})

module.exports = router;