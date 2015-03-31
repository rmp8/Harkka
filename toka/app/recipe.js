var express = require('express');
var router = express.Router();
console.log('testR');

// Talletetaan 
router.post('/newR',function(req,res){
    req.queries.newRecipe(req,res);
    //req.queries.newRecipe(req,res);
});

router.get('/recentR',function(req,res){
    req.queries.recentRecipes(req,res);
});

/*
router.get('/',function(req,res){
    req.queries.getRecentPosts(req,res);
});

router.get('/forUser',function(req,res){
    req.queries.getMessagesForUser(req,res);
});

router.get('/filters',function(req,res){
    req.queries.getFilterNames(req,res);
});

router.get('/filtered',function(req,res){
    req.queries.getFilteredData(req,res);
});

router.delete('/',function(req,res){
    
    req.queries.deleteMessage(req,res);
});
*/

module.exports = router;