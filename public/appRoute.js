var myApp = angular.module('mainApp',["ngRoute","ngAnimate"]);
myApp.config(function($routeProvider){
	$routeProvider
        .when('/', {
            templateUrl: 'templates/login.html',
            controller: 'appController'
        })
        .when('/user/register', {
            templateUrl: 'templates/register.html',
            controller: 'appController'
        })
        .otherwise({
            redirectTo: '/'
        });
});