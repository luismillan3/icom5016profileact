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

    $scope.perro="perro";
    $scope.todos = [
        { name: 'Master HTML/CSS/Javascript'},
        { name: 'Learn AngularJS' },
        { name: 'Build NodeJS backend' },
        { name: 'Get started with ExpressJS' },
        { name: 'Setup Postgres database' },
        { name: 'Be awesome!' },
      ]

}])