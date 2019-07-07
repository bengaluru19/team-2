var myApp = angular.module('mainApp',["ngRoute","ngAnimate"]);
myApp.config(function($routeProvider){
    $routeProvider
        // .when('/', {
        //     templateUrl: 'templates/console.html',
        //     controller: 'appController'
        // })
        // .when('/', {
        //     templateUrl: 'templates/login.html',
        //     controller: 'appController'
        // })
        .when('/user/orderHistory', {
            templateUrl: 'templates/order.html',
            controller: 'loginController'
        })
        .when('/user/register', {
            templateUrl: 'templates/register.html',
            controller: 'appController'
        })
        .when('/',{
            templateUrl: 'templates/productCat.html',
            controller: 'loginController'
        })
        .when('/selectedCat/:range/:cat',{
            templateUrl: 'templates/selectedCat.html',
            controller: 'loginController'
        })
        .otherwise({
            redirectTo: '/'
        });
});