var module = angular.module('Harkka',['ngRoute','ngResource','ngAnimate','ngCookies']);

var authenticationFailed = function($q,$rootScope){
    var responseInterceptor = {
        response: function(response) {
            if(response.status === 401){
                console.log('Authentication failed');
            }
            return response;
        },
        responseError:function(err){
            //Login failed....
            if(err.status === 401){
                console.log('Login failed');
                $rootScope.$broadcast('rootScope:broadcast','Authentication Failed');
            }
            return err;
        }
    }
    
    return responseInterceptor;
}

module.config(function($routeProvider,$locationProvider,$httpProvider){
    
    $locationProvider.html5Mode(true);
    $routeProvider.when('/',{
        templateUrl:'partials/login.html',
        controller:'LoginController',
    });
    
    $routeProvider.when('/user',{
        templateUrl:'partials/welcome.html',
        //templateUrl:'partials/userdata.html',
        //controller:'MessageController',
        resolve:{loginRequired:loginRequired}
    });
    console.log('newRecipe1');
    $routeProvider.when('/newRecipe',{
        //console.log('newRecipe1');
        templateUrl:'partials/newRecipe.html',
        controller:'RecipeController'
        //resolve:{loginRequired:loginRequired}
    });
    
    $routeProvider.when('/recentRecipes',{
        //console.log('newRecipe1');
        templateUrl:'partials/recentRecipes.html'
        //controller:'RecipeController',
        //resolve:{loginRequired:loginRequired}
    });
    
    $routeProvider.when('/filter',{
        templateUrl:'partials/filtermessages.html',
        controller:'FilterController',
        resolve:{loginRequired:loginRequired}
    });
    
    $routeProvider.when('/new',{
        templateUrl:'partials/newMessage.html',
        controller:'MessageController',
        resolve:{loginRequired:loginRequired}
    });
    
    $routeProvider.when('/delete',{
        templateUrl:'partials/delete.html',
        controller:'DeleteController',
        resolve:{loginRequired:loginRequired}
    });
    
    $routeProvider.otherwise({redirectTo: '/'});
    $httpProvider.interceptors.push(authenticationFailed);
});

function loginRequired($q,$location,$resource){
    
    var deferred = $q.defer();
        
    $resource('/authenticate').get().$promise.then(function(auth){
        
        if(auth.authenticated){
            deferred.resolve();
        }
        else{
            deferred.reject();
            $location.path('/');
        }
    });
    
    return deferred.promise;
}

