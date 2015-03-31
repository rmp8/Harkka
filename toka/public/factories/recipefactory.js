module.factory('RecipeFactory',['$resource','$location','$rootScope',function($resource,$location,$rootScope){
    
    var factory = {};
    
    factory.recentRecipes = function(){
        console.log('testingrR');
        return $resource('/recipe/').get().$promise;
        //return $resource('/recipe/forUser').get().$promise;
    }
    /*
    factory.deleteMessage = function(id){
        
        return $resource('/recipe/',{id:id}).delete().$promise
        
    }*/
    /*recentRecipes?*/
    
    factory.newRecipe = function(recipe){
        console.log('testingRecipe1');
        return $resource('/recipe/newR',{},{post:{method:'POST'}}).post(recipe).$promise; //app?
        
        //return $resource('/message/filtered/',{id:data}).get().$promise;
        
        //factory.deleteMessage = function(id){
        
        //return $resource('/message/',{id:id}).delete().$promise
        
        //}   
    }
    
    return factory;
}]);