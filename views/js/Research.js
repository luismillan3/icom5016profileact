angular.module('research',[])

.controller('researchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

	$scope.research = [
        { id:1,title: 'Multisensor buoy for underwater data collection',funding:100,member:'Luis Millan'},

      ]
   

}]).controller('professorResearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

   

}])