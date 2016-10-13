angular.module('professor',[])

.controller('professorController', ['$scope', '$http', '$log', function($scope, $http, $log) {
	$scope.profesora={name:"Clarita la Shark",lastName:"Diaz",title:"PhD"}
	$scope.projects = [
        { id:1,title: 'Gatos de ataque para el Army',funding:100,student:["Luis Millan","Juan Guzman"]},
        { id:2,title: 'Smart food',funding:69,student:["Fernando Arocho","Scarlett Johanson"]},
      ]


}]).controller('pResearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

   	$scope.research =  { id:1,title: 'Multisensor buoy for underwater data collection',funding:100,member:'Luis Millan'}




}])