var User = require('../models/User');
var Article = require('../models/Article')
module.exports = {
    loggedInUser : (req,res,next) => {
        if(req.session && req.session.userId){
            next();
        }else{
            res.redirect('/users/login')
        }
    },
    userInfo : (req,res,next) => {
        var userId = req.session && req.session.userId;
        if(userId){
            User.findById(userId, "name email", (err,user) => {
                if(err) return next(err)
                req.user = user;
                req.session.user =user;
                next();
            })
        }else {
            req.user = null;
            req.session.user = null
            next();
        }
    },
    // userAllow : (req,res,next) => {
    //     var id = req.params.id;
    //     Article.findOne(id).populate('name , email').exec((err, article) => {
    //         if(err) return next(err);
    //         if(req.session.userId === article.name.id){
    //             next();
    //         }else{
    //             res.redirect('/articles/' + id)
    //         }
    //     })
        
    // } 
    
}