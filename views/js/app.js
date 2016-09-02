angular.module('app', ['ngRoute', 'controller'])

.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'templates/home.html'
	})
	.when('/signin', {
		templateUrl: 'templates/sign_in.html',
		controller: 'BlogCtrl'
	})
    .when('/research', {
		templateUrl: 'templates/research.html',
		controller: 'ResearchCtrl'
	})
    .when('/signup', {
		templateUrl: 'templates/sign_up.html',
		controller: 'SignUpCtrl'
	})
	.otherwise({
		templateUrl: 'templates/404.html'
	})
})