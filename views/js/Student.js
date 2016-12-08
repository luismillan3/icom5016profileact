angular.module('student',[])

.controller('studentResearchController', ['$cookieStore','$scope', '$http', '$log', '$filter', function($cookieStore,$scope, $http, $log, filter) {


    $scope.getResearch = function () {
        //Get all events
        $http.get('/student/research')
        .success(function (data, status) {
            $scope.researchProjects = data;
            console.log($scope.projects)
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Could not get all projects")
        });
    };

    $scope.getResearch();



}]).controller('studentEventsController', ['$scope', '$http', '$log','$mdDialog', function($scope, $http, $log, $mdDialog) {

    // var dateFormat = require('dateformat');

    $scope.getEvents = function () {
        //Get all events
        $http.get('/student/events')
        .success(function (data, status) {
            $scope.events = data;
            console.log($scope.events);
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Could not get all projects")
        });
    };

    $scope.getEvents();

    $scope.getDates = function(){
        for (var event in $scope.events) {
            console.log(event.date)
        }
    }

    $scope.getDates();

    $scope.display=function(event){
        $scope.selectedEvent=event;
    }





    $scope.showAlert = function(ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('You will be reminded')
            .textContent('This event has been added to your calendar')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };

    $scope.eventDialog = function(ev,event) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'components/eventDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function() {

        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });

        selectedEvent=event
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
        $scope.selectedEvent=selectedEvent;
    }

}]).controller('studentProfileController', ['$route', '$cookieStore','$scope', '$http', '$log', '$mdDialog', function($route,$cookieStore, $scope, $http, $log, $mdDialog, $location ) {


    $scope.newStudent={}
    $scope.student={}
    $scope.project={}
    $scope.majors = []
    $scope.userid = $cookieStore.get('userid')
    $scope.frmToggle = function() {
        $('#profileForm').slideToggle();
    }
    $scope.go = function ( path ) {
        console.log(path);
        window.location=path;
    }
    $scope.userid = $cookieStore.get('userid')

    $scope.getStudent = function () {
        //chequiar rol, sino es student tirar homepage
        var userid={'userid':$cookieStore.get('userid')}
        console.log(userid)
        $http.post('/student/profile',userid)
        .success(function (data, status) {
            $scope.student = data[0];
            console.log($scope.student)
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Could not get student Info")
        });
    };
    $scope.go = function () {
       console.log("quiero hacer reload")
        $route.reload();
    }
    $scope.getMajors = function () {
        $http.get('/student/majors')
        .success(function (data, status) {
            $scope.majors = data;
            console.log($scope.majors)
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Could not get student Info")
        });
    };

    $scope.updateProfile=function(re){
		if(re.name==null){
			re.name=$scope.student.name
		}
		if(re.lastname==null){
			re.lastname=$scope.student.lastname
		}
		console.log(re)
		re.userid=$cookieStore.get('userid')
		$http.put('/student/profile/update', re )
		.success(function (data) {
			$scope.getStudent();
		})
		.error(function (data, status, header, config) {
			console.log(data, status);
			console.log("could not update profile")
		});
	};

    $scope.updateInfo=function(re){
		if(re.majorid==null){
			re.majorid=$scope.student.majorid
		}
		if(re.year==null){
			re.year=$scope.student.year
		}
        if(re.gpa==null){
			re.gpa=$scope.student.gpa
		}
		console.log(re)
		re.userid=$cookieStore.get('userid')
		$http.put('/student/info/update', re )
		.success(function (data) {
			$scope.getStudent();
		})
		.error(function (data, status, header, config) {
			console.log(data, status);
			console.log("could not update student info")
		});
	};

    $scope.getProjects = function () {
        //chequiar rol, sino es student tirar homepage
        var userid={'userid':$cookieStore.get('userid')}
        console.log(userid)
        $http.post('/student/projects',userid)
        .success(function (data, status) {
            $scope.projects = data;
            console.log($scope.projects)
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Could not get all projects")
        });
    };

    $scope.updateProject=function(re, id){
		if(re.title==null){
			re.title=$scope.student.title
		}
		if(re.description==null){
			re.description=$scope.student.description
		}
		$http.put('/student/projects/update/'+id, re )
		.success(function (data) {
			$scope.getProjects();
		})
		.error(function (data, status, header, config) {
			console.log(data, status);
			console.log("could not update project info")
		});
	};

    $scope.getResearch = function () {
        //chequiar rol, sino es student tirar homepage
        var userid={'userid':$cookieStore.get('userid')}
        console.log(userid)
        $http.post('/student/myResearch',userid)
        .success(function (data, status) {
            $scope.researchProjects = data;
            console.log($scope.researchProjects)
        })
        .error(function (data, status) {
            console.log(data, status);
            console.log("Could not get all research projects")
        });
    };

    $scope.addProject=function(e){
        e.userid=$cookieStore.get('userid')
        console.log(e)

        $http.post('/student/projects/add', e )
        .success(function (data) {
            console.log("recibi la data del proyecto")
            $scope.getProjects()
        })
        .error(function (data, status, header, config) {
            console.log(data, status);
            console.log("could not add project")
        });
    };

    $scope.removeProject=function(id){
       $http.delete('/student/projects/delete/'+id).success(function (data) {
               $scope.getProjects();
           })
           .error(function (data, status, header, config) {
               console.log(data, status);
               console.log("could not remove event")
           })
     };





    $scope.getStudent();
    $scope.getMajors();
    $scope.getProjects();
    $scope.getResearch();

    // $scope.updateProfile=function(re){
    //     console.log(re)
    //     $scope.newr={}

    //     $http.put('/student/update', re )
    //     .success(function (data) {
    //         $scope.student = data;
    //     })
    //     .error(function (data, status, header, config) {
    //         console.log(data, status);
    //         console.log("could not add event")
    //     });
    // };

    //  $scope.addProject=function(re){
    //     $scope.project={}
    //     re.id=$scope.student.projects.length+1;
    //     console.log(re)
    //     $scope.newr={}
    //
    //     $http.post('/student/projects', re )
    //     .success(function (data) {
    //         $scope.student.projects = data;
    //     })
    //     .error(function (data, status, header, config) {
    //         console.log(data, status);
    //         console.log("could not add event")
    //     });
    // };


    // $scope.addProject = function(project){
    //   this.project.id = projects.length
    //   projects.push(this.project);
    // };

    $scope.frmToggle = function() {
        $('#projectForm').slideToggle();
    }

    $scope.frmHide = function() {
        $('#projectForm').hide();
    }



    $scope.showAdvanced = function(ev,project) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'components/dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function() {

        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });

        selectedProject=project
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
        $scope.selectedProject=selectedProject;
    };

}]).controller('AppCtrl', function($scope) {
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;

    $scope.googleUrl = 'http://google.com';

});
