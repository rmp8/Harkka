var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/harkka',function(err,success){
    
    if(err){
        console.log(err + " check that your mongodb is running.");
    }
    else{
        console.log('We are connected to database');
    }
});

var Schema = mongoose.Schema;

var user = new Schema({
    name:{type:String,unique:true},
    password:String,
    email:String,
    messages:[{type:Schema.Types.ObjectId,ref:'Message'}],
    recipes:[{type:Schema.Types.ObjectId,ref:'Recipe'}]
});

user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var message = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    subject:String,
    text:String,
    timestamp:Date
});

var recipe = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    subject:String,
    category:String,
    amount:Number,
    ingredients:String,
    instruction:String,
    cookingtime:String,
    description:String,
    source:String,
    timestamp:Date
});  //

var User = mongoose.model('User',user);
var Message = mongoose.model('Message',message);
var Recipe = mongoose.model('Recipe',recipe);

module.exports.User = User;
module.exports.Message = Message;
module.exports.Recipe = Recipe;
