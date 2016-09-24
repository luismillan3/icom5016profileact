angular.module('app', ['ngRoute', 'controller', 'professor','student'])

.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/templates/home.html'
	})
	.when('/signin', {
		templateUrl: '/templates/sign_in.html',
		controller: 'signInController'
	})
    .when('/research', {
		templateUrl: '/templates/research.html',
		//controller: 'researchController'
	})
    .when('/signup', {
		templateUrl: '/templates/sign_up.html',
		//controller: 'signUpController'
	})
	.when('/student', {
		templateUrl: '/templates/studentProfile.html',
		controller: 'studentProfileController'
	})
	.otherwise({
		templateUrl: '/templates/404.html'
	})
})