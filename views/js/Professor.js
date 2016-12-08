angular.module('professor',[])

.controller('professorController', ['$route','$scope', '$http', '$log', '$mdDialog','$cookieStore', function($route,$scope, $http, $log, $mdDialog,$cookieStore) {
	
    $scope.profesora={name:"Clarita la Shark",lastName:"Diaz",title:"PhD"}

    $scope.project = {}
	$scope.projects = []
    $scope.research = {}
    $scope.researchstudents = []
    $scope.researchstudent = {}
    $scope.studentsInProjects = []
    $scope.studentInProject = {}
    $scope.professor = {}
    $scope.userid = $cookieStore.get('userid')

    localStorage.setItem("myid",$cookieStore.get('userid'))

	// $scope.projects = [
 //        { id:1,title: 'Gatos de ataque para el Army',funding:100,student:["Luis Millan","Juan Guzman"]},
 //        { id:2,title: 'Smart food',funding:69,student:["Fernando Arocho","Scarlett Johanson"]},
 //      ]

    $scope.display = function(project){
        $scope.selectedProject=project;
    }


    $scope.getProjects = function (proff) {
     
        console.log("Filas y columnas"+$scope.professor.professorid);
        $http.post('/investigacionprof/projectsByProf', proff)
        .success(function (data, status) {
            $scope.projects = data;
            
             //console.log(data, status)
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Could not get all projectazos")
        });
    };

 $scope.uploadFileName = function (proff) {
     


     console.log("Yes men");
        // console.log("Filas y columnas"+$scope.professor.professorid);
        $http.post('/investigacionprof/photoUpload', proff)
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
         //   console.log("Error finding students in research " + status + "--o---" + data)
        });
    };

    $scope.addProject=function(e){

        $('#viewModalAddResearch').modal("hide");
       // e.id=$scope.projects.length+1;
        console.log(e)
        var sending = {title:e.title,desc:e.description,pid:$scope.professor.professorid}
        $http.post('/investigacionprof/projects', sending)
        .success(function (data) {
            $scope.projects = data;
        })
        .error(function (data, status, header, config) {
            console.log(data, status);
        console.log("could not add event")
        });
    };

     $scope.getProfessor=function(){

        var sending = {uid:$cookieStore.get('userid')}

        console.log("Profeeeee " + sending);
        $http.post('/investigacionprof/professorData', sending)
        .success(function (data) {
            console.log(data[0])
            $scope.professor = data[0];
            $scope.getProjects(data[0]);
            // console.log(data[0]);
            //$cookieStore.put('professorid', $scope.professor.professorid);
        })
        .error(function (data, status, header, config) {
            console.log(data, status);
        console.log("could not add event")
        });
    };
    $scope.go = function () {
       console.log("quiero hacer reload")
        $route.reload();
    }

      

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

$scope.getProfessor();
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
        scope: $scope,
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

          var srrelation = { student:estudiante,rese: research, pid:$scope.professor.professorid};

                $http.post('/investigacionprof/researchStudents', srrelation)
                .success(function (data, status) {
                    
                
            //return data;
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Error finding students in research " + status + "--" + data)
        });



        $scope.hide();
        
        //$scope.getProfessor();
       


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



          $scope.submitResearchChanges=function(titulo, desc, id){
     
          var changes = { title:titulo, description:desc, rid:id};
          console.log('Updateeeee' + changes.title + " " + changes.funding);
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

          $scope.changeDesc = function(theDesc){
            $scope.changedDesc = theDesc;
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
