angular.module('professor',[])

.controller('professorController', ['$scope', '$http', '$log', function($scope, $http, $log) {
	$scope.profesora={name:"Perra",lastName:"Diaz",title:"PhD"}
	$scope.projects = [
        { id:1,title: 'Gatos',funding:100,student:["luis","juan"]},
        { id:2,title: 'Me la comi',funding:69,student:["ferand","gatasalvaje"]},
      ]


}]).controller('pResearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

   	$scope.research =  { id:1,title: 'Multisensor buoy for underwater data collection',funding:100,member:'Luis Millan'}




}])