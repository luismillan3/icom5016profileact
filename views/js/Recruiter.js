angular.module('recruiter',[])

.controller('recruiterProfileController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#blogForm').slideToggle();
    }

}]).controller('recruiterEventController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#eventForm').slideToggle();
    }
    $scope.event=[];
     $scope.events = [
        { title: 'Master HTML/CSS/Javascript',description:"Awesome Event",date:"10/12/16 10:00"},
        { title: 'Raytheon Session',description:"Awesome Event",date:"10/12/16 10:00"},
        { title: 'Johns Hopkins Session',description:"Awesome Event",date:"10/12/16 10:00"},
        { title: 'Boeing Company',description:"Awesome Event",date:"10/12/16 10:00"},
        { title: 'Mario Bros in the House',description:"Awesome Event",date:"10/12/16 10:00"}
      ]
     $scope.addEvent=function(e){
     	$scope.events.push(e);
     	$scope.event=[];
     }
     $scope.removeEvent=function(e){
     	for(var i = $scope.events.length-1; i--;){
	if ($scope.events[i] === e) $scope.events.splice(i, 1);
}
     }

}]).controller('recruiterSearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#blogForm').slideToggle();
    }

}])