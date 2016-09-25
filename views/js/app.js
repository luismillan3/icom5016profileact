angular.module('app', ['ngRoute', 'ngMaterial','controller', 'professor','student','recruiter'])

.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/templates/home.html'
	})
	.when('/signin', {
		templateUrl: '/templates/sign_in.html',
		controller: 'signInController'
	})
    .when('/signup', {
		templateUrl: '/templates/sign_up.html',
		controller: 'signUpController'
	})
	 .when('/research', {
		templateUrl: '/templates/research.html',
		controller: 'researchController'
	})
	 .when('/student', {
		templateUrl: '/templates/studentProfile.html',
		controller: 'studentProfileController'
	})
	 .when('/recruiter', {
		templateUrl: '/templates/recruiterProfile.html',
		controller: 'recruiterProfileController'
	})
	 .when('/recruiterevent', {
		templateUrl: '/templates/recruiterEvent.html',
		controller: 'recruiterEventController'
	})
	 .when('/recruitersearch', {
		templateUrl: '/templates/recruiterSearch.html',
		controller: 'recruiterSearchController'
	})
	.otherwise({
		templateUrl: '/templates/404.html'
	})
})