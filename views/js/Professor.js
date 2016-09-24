angular.module('professor',[])

.controller('professorController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#blogForm').slideToggle();
    }

}]).controller('professorResearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#blogForm').slideToggle();
    }

}])