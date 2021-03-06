var User = require('./database').User;
var Message = require('./database').Message;
var Recipe = require('./database').Recipe;

console.log('queries');

//Use this for store new user for our application
module.exports.registerUser = function(req,res){
    
    var user = new User();
    user.name = req.body.username;
    user.password = user.generateHash(req.body.password);
    user.email = req.body.email;
    
    //Store model in database
    user.save(function(err){
        if(err){
            res.send({status:'Error'})
        }
        else{
            res.send({status:'Ok'});
        }
    });
}

//console.log(Recipe);
// new recipe
module.exports.newRecipe = function(req,res){
    console.log('new recipe');
    User.findOne({name:req.user.name},function(err,user){
    //User.findOne({name:data.owner},function(err,user){
        console.log(req.user.name);
        if(!err){
            var rec = new Recipe();
                //{
            rec.owner = user;
            rec.subject = req.body.subject; //recipe.subject;
             
            //Store model in database
            rec.save(function(err){
                if(err){
                    res.send({status:'Error'})
                }
                else{
                    res.send({status:'Ok'});
                    console.log('Ok');
                }
            });
            //user.recipes.push(recipeData);
            
            //recipeData.save();
            //user.save();
                /*
                nimi:req.body.nimi,
                aineet:req.body.aineet,
                valmistus:req.body.valmistus,
                lahde:req.body.lahde,
                paivays:new Date(req.body.paivays)
                */
            }
        //);
            
            //recipeData.save();
            
            /*
            var recipe = new Recipe();
            recipe.owner = user;
            recipe.subject = data.subject;
            user.recipes.push(recipe);
            recipe.save();
            user.save();
            */
        //}
    });
                 
    
}

module.exports.recentRecipes = function(req,res){

    console.log('rr');
    var options = {
        path:'recipes',
        options:{limit:30,sort:{_id: -1}}
    };

    User.findOne({name:req.user.name}).populate(options).exec(function(err,popul){
        res.send(popul);
    });
}

//Called when we need to store message for user
module.exports.saveMessage = function(data){
    //Find the user by name
    User.findOne({name:data.owner},function(err,user){
        
        if(!err){
            var message = new Message();
            message.owner = user;
            message.subject = data.subject;
            message.text = data.text;
            message.timestamp = data.timestamp;
            user.messages.push(message);
            message.save();
            user.save();
        }
    });
}

module.exports.getRecentPosts = function(req,res){
    var options = {
        path:'messages',
        options:{limit:5,sort:{_id: -1}}
    };
    User.findOne({name:req.user.name}).populate(options).exec(function(err,popul){
        res.send(popul);
    });
}

module.exports.getFilteredData = function(req,res){
    
    var data = JSON.parse(req.query.id);
    console.log(data.query1);
    console.log(data.query2);
    User.find(data.query1).populate(data.query2).exec(function(err,data){
        
        var temp = {};
        temp.all = [];
        for(var i = 0; i < data.length; i++)
        {
            if(data[i].messages.length > 0)
            {
                console.log('here we find the data');
                console.log(data[i]);
                temp.all[0] = data[i];
                break;
            }
        }
        
        //console.log(data);
        res.send(temp);
    });
}

module.exports.getFilterNames = function(req,res){
    User.find().select('name').exec(function(err,popul){
        Message.find().select('subject').exec(function(err,mes){
            var data = {};
            data.names = popul;
            data.subjects = mes;
            res.send(data);
        });
    });
}

module.exports.getMessagesForUser = function(req,res){

    var options = {
        path:'messages',
        options:{limit:30,sort:{_id: -1}}
    };

    User.findOne({name:req.user.name}).populate(options).exec(function(err,popul){
        res.send(popul);
    });
}

module.exports.deleteMessage = function(req,res){
    
    Message.findOne({_id:req.query.id}).remove().exec(function(err,done){
        
        res.send('Element deleted');
    });
}