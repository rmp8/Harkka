module.controller('RecipeController',['$scope','LoginFactory','SocketFactory',function($scope,LoginFactory,SocketFactory){
    
    $scope.recipe = {};
    $scope.recipe.recipes = [];
    
    //SocketFactory.getRecentPosts().then(function(data){
    //    $scope.recipe.recipes = data.recipes;
    //    $scope.recipe.user = data.name;
    //});
    
    $scope.recipe.save = function(){
        console.log('newRecipeC');
        var recipe = {};
        recipe.owner = $scope.recipe.user;
        recipe.subject = $scope.recipe.subject;
        //message.text = $scope.message.text;
        //message.timestamp = new Date();
        
        //SocketFactory.sendMessage(message);
        newRecipe(recipe);
        $scope.recipe.subject = "";
        //$scope.message.text = "";
    }
    //Will be called when server send socket response
    //SocketFactory.notify = function(data){
        //$scope.recipe.recipes.push(data);
        //$scope.$apply();
    //};
    
}]);