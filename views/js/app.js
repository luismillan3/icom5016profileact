angular.module('app', ['ngRoute', 'ngMaterial', 'controller', 'professor','student', 'recruiter'])

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
		controller: 'researchController'
	})
    .when('/signup', {
		templateUrl: '/templates/sign_up.html',
		controller: 'signUpController'
	})
	.when('/student', {
		templateUrl: '/templates/studentProfile.html',
		controller: 'studentProfileController'
	})
	.when('/events', {
		templateUrl: '/templates/studentEvents.html',
		controller: 'studentEventsController'
	})
	.when('/researchSearch', {
		templateUrl: '/templates/studentResearch.html',
		controller: 'researchController'
	}).when('/recruiter', {
		templateUrl: '/templates/recruiterProfile.html',
		controller: 'recruiterProfileController'
	})
	 .when('/recruiterEvent', {
		templateUrl: '/templates/recruiterEvent.html',
		controller: 'recruiterEventController'
	})
	 .when('/recruiterSearch', {
		templateUrl: '/templates/recruiterSearch.html',
		controller: 'recruiterSearchController'
	})
	.otherwise({
		templateUrl: '/templates/404.html'
	})
})