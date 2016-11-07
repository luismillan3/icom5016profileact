
var app=angular.module('app', ['ngRoute','ngCookies','ngMaterial','xeditable','mainController', 'professor','student','recruiter','research'])

.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/templates/home.html',
		controller: 'mainCtrl'
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
		controller: 'recruiterProfileController',
		aunthenticated:true
	})
	 .when('/recruiterEvent', {
		templateUrl: '/templates/recruiterEvent.html',
		controller: 'recruiterEventController'
	})
	 .when('/recruiterSearch', {
		templateUrl: '/templates/recruiterSearch.html',
		controller: 'recruiterSearchController'
	})
	 .when('/recruiterFolder',{
	 	templateUrl: '/templates/recruiterAddedStudents.html',
		controller: 'recruiterStudentFolder'
	 })

	.when('/professor', {
		templateUrl: '/templates/professor.html',
		controller: 'professorController'

	}).when('/studentEvents', {
		templateUrl: '/templates/studentEvents.html',
		controller: 'studentEventsController'
	})
	.when('/studentResearch', {
		templateUrl: '/templates/studentResearch.html',
		controller: 'studentResearchController'
	})
	.otherwise({
		templateUrl: '/templates/404.html'
	})
})