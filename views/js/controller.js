angular.module('controller',[])

.controller('BlogCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {

	$scope.frmToggle = function() {
		$('#blogForm').slideToggle();
	}

}])