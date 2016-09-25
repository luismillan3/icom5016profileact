angular.module('student',[])

.controller('researchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#blogForm').slideToggle();
    }

}]).controller('studentEventsController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#blogForm').slideToggle();
    }

}]).controller('studentProfileController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.firstName="Fabio";
    $scope.lastName="Lanzoni";
    $scope.major="Computer Engineering"
    $scope.resume= ""
    $scope.research = [
        { name: 'Master HTML/CSS/Javascript'},
        { name: 'Learn AngularJS' },
        { name: 'Build NodeJS backend' },
        { name: 'Get started with ExpressJS' },
        { name: 'Setup Postgres database' },
        { name: 'Be awesome!' },
      ]

}]).controller('AppCtrl', function($scope) {
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;

  $scope.googleUrl = 'http://google.com';

});