<<<<<<< HEAD
angular.module('app', ['ngRoute', 'ngMaterial','controller', 'professor','student','recruiter'])
=======
angular.module('app', ['ngRoute', 'ngMaterial', 'controller', 'professor','student', 'recruiter'])
>>>>>>> d711fdf089e5ace37f55e0d1e3eafdc0891371a1

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
<<<<<<< HEAD
	 .when('/recruiter', {
=======
	.when('/events', {
		templateUrl: '/templates/studentEvents.html',
		controller: 'studentEventsController'
	})
	.when('/researchSearch', {
		templateUrl: '/templates/studentResearch.html',
		controller: 'researchController'
	}).when('/recruiter', {
>>>>>>> d711fdf089e5ace37f55e0d1e3eafdc0891371a1
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