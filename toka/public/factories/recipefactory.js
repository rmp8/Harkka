module.factory('RecipeFactory',['$resource','$location','$rootScope',function($resource,$location,$rootScope){
    
    var factory = {};
    factory.getRecipes = function(){
        
        return $resource('/recipe/forUser').get().$promise;
    }
    /*
    factory.deleteMessage = function(id){
        
        return $resource('/recipe/',{id:id}).delete().$promise
        
    }*/
    
    factory.newRecipe = function(recipeData){
        console.log('testingRecipe1');
        return $resource('/app/newRecipe',{},{post:{method:'POST'}}).post(recipeData).$promise; //
        
        //return $resource('/message/filtered/',{id:data}).get().$promise;
        
        //factory.deleteMessage = function(id){
        
        //return $resource('/message/',{id:id}).delete().$promise
        
        //}   
    }
    
    return factory;
}]);