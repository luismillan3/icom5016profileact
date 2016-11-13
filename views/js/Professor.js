angular.module('professor',[])

.controller('professorController', ['$scope', '$http', '$log', '$mdDialog','$cookieStore', function($scope, $http, $log, $mdDialog,$cookieStore) {
	$scope.profesora={name:"Clarita la Shark",lastName:"Diaz",title:"PhD"}

    $scope.project = {}
	$scope.projects = []
    $scope.research = {}
    $scope.researchstudents = []
    $scope.researchstudent = {}
    $scope.studentsInProjects = []
    $scope.studentInProject = {}

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

        console.log
        $http.get('/investigacionprof/researchStudents')
        .success(function (data, status) {
             $scope.researchstudents = data;
            return data;
             console.log(data)
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Could not get all projectazos")
        });
    };

    $scope.getStudentsPerProjects = function (research) {
        $http.get('/investigacionprof/singleProjectStudents', research)
        .success(function (data, status) {
             $scope.studentsInProjects = data;
              console.log(data)
            return data;
            
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Error finding students in research " + status + "--o---" + data)
        });
    };

    $scope.addProject=function(e){

        $('#viewModalAddResearch').modal("hide");
       // e.id=$scope.projects.length+1;
        console.log(e)
        var sending = {title:e.title,fund:e.funding}
        $http.post('/investigacionprof/projects', sending)
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
$scope.getStudentsPerProjects();

$scope.showAdvanced = function(ev,research) {

        //   $http.post('/investigacionprof/singleProjectStudents', research)
        // .success(function (data, status) {
        //      papitouu = data;
        //     console.log(data)
        //     //return data;
        // })
        // .error(function (data, status) {
        //     console.log(data, status);
        //     console.log("Error finding students in research " + status + "--o---" + data)
        // });


      
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
      //$scope.research = selectedResearch;
      allStudents = $scope.researchstudents
      //$scope.getStudentsPerProjects(selectedResearch);
      

      estudiantePorProject = $scope.studentsInProjects

      //console.log("Estudiente per blah " + allStudents);

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

        $scope.addStudentProject=function(estudiante, research){

          var srrelation = { student:estudiante,rese: research};

                $http.post('/investigacionprof/researchStudents', srrelation)
                .success(function (data, status) {
                    
                
            //return data;
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Error finding students in research " + status + "--" + data)
        });



        $scope.hide();
        
        $scope.getProjects();


    };

          $scope.removeStudentProject=function(estudiante, research){
     
          var srrelation = { student:estudiante,rese: research};

                $http.post('/investigacionprof/removeResearchstudents', srrelation)
                .success(function (data, status) {
                    
                
            //return data;
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Error finding students in research " + status + "--" + data)
        });



        $scope.hide();
        $scope.getProjects();


    };



          $scope.submitResearchChanges=function(titulo, fund, id){
     
          var changes = { title:titulo, funding:fund, rid:id};

                $http.post('/investigacionprof/researchChanges', changes)
                .success(function (data, status) {
                    
                
            //return data;
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Error finding students in research " + status + "--" + data)
        });



        $scope.hide();
        $scope.getProjects();


    };


     $scope.removeResearch=function(id){
     
          var changes = { rid:id};
    
                $http.post('/investigacionprof/removeResearch', changes)
                .success(function (data, status) {
                    
                
            //return data;
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Error finding students in research " + status + "--" + data)
        });



        $scope.hide();
        $scope.getProjects();


    };






        //$scope.getStudentsPerProjects(selectedResearch);
        $scope.selectedResearch=selectedResearch;
     
        $scope.students = allStudents;
       // $scope.estudiantesEnProyecto = papitouu; //Spanglish done right here
        $scope.studentSelected = function(myStudent){
            $scope.SelectedStudent = myStudent;
        }

          $scope.changeTitle = function(thetitle){
            $scope.changedTitle = thetitle;
        }

          $scope.changeFunds = function(thefunding){
            $scope.changedFund = thefunding;
        }

        $scope.addNewFunding = function(newTitle){
            $scope.NuevoTitle = newTitle;
        }

         $scope.addNewTitle = function(newFunding){
            $scope.NuevoFunding = newFunding;
        }


    }


}]).controller('pResearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

   	$scope.research =  { id:1,title: 'Multisensor buoy for underwater data collection',funding:100,member:'Luis Millan'}




}])
