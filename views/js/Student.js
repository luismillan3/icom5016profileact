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


    $scope.getEvents = function () {
        //Get all events
        $http.get('/student/events')
        .success(function (data, status) {
            $scope.events = data;
            console.log($scope.projects)
        })
        .error(function (data, status) {
        	console.log(data, status);
    		console.log("Could not get all projects")
        });
    };

    $scope.getEvents();

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

}]).controller('studentProfileController', [ '$cookieStore','$scope', '$http', '$log', '$mdDialog', function($cookieStore, $scope, $http, $log, $mdDialog, $location ) {


    $scope.newStudent={}
    $scope.student={}
    $scope.project={}

    $scope.frmToggle = function() {
        $('#profileForm').slideToggle();
    }
    $scope.go = function ( path ) {
      console.log(path);
      window.location=path;
    }

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
    		console.log("Could not get all projects")
        });
    };




    $scope.getStudent();
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

     $scope.addProject=function(re){
        $scope.project={}
        re.id=$scope.student.projects.length+1;
        console.log(re)
        $scope.newr={}

        $http.post('/student/projects', re )
        .success(function (data) {
            $scope.student.projects = data;
        })
        .error(function (data, status, header, config) {
            console.log(data, status);
            console.log("could not add event")
        });
    };


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
    }

    $scope.updateProfile=function(){
        // return $http.post('/student/profile/update', $scope.student)
        // return $http.post('/student/profile/update', {name:data,
        //     lastName:"Diablo",
        //     email:"diablo@upr.edu",
        //     profileImage: "https://s-media-cache-ak0.pinimg.com/236x/bd/01/40/bd01401c5b6c716b8b14786ec995ecbe.jpg",
        //     major: "Computer Engineering",
        //     resume:"#",
        //     projects: [
        //         {id: 1, title: 'Enfoque Film Festival', picture:"http://www.filmfestivals.com/files/enfoque_logo_HORIZONTAL1.jpg?0", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
        //         {id: 2, title: 'Tarzan Watch', picture:"http://www.nse.org/exchange/slides/135_4_Our-Mascot-Tarzan.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
        //         {id: 3, title: 'Build NodeJS backend' , picture:"https://cdn.tutsplus.com/net/uploads/legacy/956_nodeJs/nodeJs.png", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
        //         {id: 4, title: 'Get started with AngularJS' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
        //         {id: 5, title: 'Setup Postgres database' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
        //         {id: 6, title: 'Be awesome!' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
        //     ],
        //     research: [
        //         { name: 'Enfoque Film Festival', department: 'Computer Engineering', advisor: 'Nayda Santiago'},
        //         { name: 'Tiburones', department: 'Electrical Engineering', advisor: 'Nayda Santiago'},

        //     ],

        // });
        console.log()
        $scope.newr={}
        $http.put('/student/profile/update', $scope.student )
        .success(function () {

            console.log('funciona');
            //     $scope.student = data
            //     {name:data,
            //     lastName:"Diablo",
            //     email:"diablo@upr.edu",
            //     profileImage: "https://s-media-cache-ak0.pinimg.com/236x/bd/01/40/bd01401c5b6c716b8b14786ec995ecbe.jpg",
            //     major: "Computer Engineering",
            //     resume:"#",
            //     projects: [
            //         {id: 1, title: 'Enfoque Film Festival', picture:"http://www.filmfestivals.com/files/enfoque_logo_HORIZONTAL1.jpg?0", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
            //         {id: 2, title: 'Tarzan Watch', picture:"http://www.nse.org/exchange/slides/135_4_Our-Mascot-Tarzan.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
            //         {id: 3, title: 'Build NodeJS backend' , picture:"https://cdn.tutsplus.com/net/uploads/legacy/956_nodeJs/nodeJs.png", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
            //         {id: 4, title: 'Get started with AngularJS' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
            //         {id: 5, title: 'Setup Postgres database' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
            //         {id: 6, title: 'Be awesome!' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
            //     ],
            //     research: [
            //         { name: 'Enfoque Film Festival', department: 'Computer Engineering', advisor: 'Nayda Santiago'},
            //         { name: 'Tiburones', department: 'Electrical Engineering', advisor: 'Nayda Santiago'},

            //     ],

            // };
        })
        .error(function (data, status, header, config) {
            console.log(data, status);
            console.log("could not update profile")
        });
    };

}]).controller('AppCtrl', function($scope) {
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;

  $scope.googleUrl = 'http://google.com';

});
