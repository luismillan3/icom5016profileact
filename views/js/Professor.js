angular.module('professor',[])

.controller('professorController', ['$scope', '$http', '$log', '$mdDialog', function($scope, $http, $log, $mdDialog) {
	$scope.profesora={name:"Clarita la Shark",lastName:"Diaz",title:"PhD"}

    $scope.project = {}
	$scope.projects = []
    $scope.research = {}
    $scope.researchstudents = []
    $scope.researchstudent = {}
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

    $scope.getProjectsStudents = function (researchstudent) {
        $http.get('/investigacionprof/researchStudents')
        .success(function (data, status) {
             $scope.researchstudents = data;
            return data;
             //console.log(data)
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

	$scope.updateProject=function(e){

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
$scope.getProjectsStudents();

$scope.showAdvanced = function(ev,research) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/updateResearchDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function() {

      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });

      selectedResearch=research

      allStudents = $scope.researchstudents
  

     
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        $scope.selectedResearch=selectedResearch;
        $scope.students = allStudents;
    }


}]).controller('pResearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

   	$scope.research =  { id:1,title: 'Multisensor buoy for underwater data collection',funding:100,member:'Luis Millan'}




}])
