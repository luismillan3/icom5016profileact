angular.module('professor',[])

.controller('professorController', ['$scope', '$http', '$log', function($scope, $http, $log) {
	$scope.profesora={name:"Clarita la Shark",lastName:"Diaz",title:"PhD"}
	
  $scope.project = {}
	$scope.projects = []
	// $scope.projects = [
 //        { id:1,title: 'Gatos de ataque para el Army',funding:100,student:["Luis Millan","Juan Guzman"]},
 //        { id:2,title: 'Smart food',funding:69,student:["Fernando Arocho","Scarlett Johanson"]},
 //      ]

      $scope.display = function(project){
        $scope.selectedProject=project;
    }


      $scope.getProjects = function () {
            $http.get('/investigacionprof/projects')
            .success(function (data, status) {
                $scope.projects = data;
                 //console.log(data, status)
            })
            .error(function (data, status) {
                console.log(data, status);
                console.log("Could not get all projectazos")
            });
        };

          $scope.addProject=function(e){
           
          $('#viewModalAddResearch').modal("hide");
          e.id=$scope.projects.length+1;
           console.log(e)

       $http.post('/investigacionprof/projects', e )
            .success(function (data) {
                $scope.projects = data;
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
            console.log("could not add event")
            });
        };

$scope.getProjects();


}]).controller('pResearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

   	$scope.research =  { id:1,title: 'Multisensor buoy for underwater data collection',funding:100,member:'Luis Millan'}




}])