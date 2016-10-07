angular.module('app', ['ngRoute', 'controller', 'professor','student'])

.config(function($routeProvider) {
	$routeProvider
	.when('/research', {
		templateUrl: '/research_profile.html'
	})
})