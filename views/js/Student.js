angular.module('student',[])

.controller('studentResearchController', ['$cookieStore','$scope', '$http', '$log', '$filter', function($cookieStore,$scope, $http, $log, filter) {

    $scope.departments = [{id:1, name: "ICOM"},
      {id:2, name: "INEL"},
      {id:3, name: "ININ"},
      {id:4, name: "INCI"},
      {id:5, name: "INQU"},
      {id:6, name: "BIOL"},
      {id:7, name: "QUIM"},
      {id:8, name: "MATE"},
    ]

    $scope.projects = [
      {id:0, name:"Enfoque", advisor:"Nayda", department:"ICOM", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:1, name:"Nanito", advisor:"Nayda2", department:"ICOM", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:2, name:"Gene Editing", advisor:"Fulano", department:"BIOL", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:3, name:"Tiburones", advisor:"Fernando", department:"INEL", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:4, name:"HCI", advisor:"Fulanita", department:"ININ", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:5, name:"Drones", advisor:"Nayda3", department:"ICOM", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:6, name:"Point Cloud", advisor:"Nayda4", department:"ICOM", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
    ]


    $scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];

    $scope.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];
    $scope.selectedPredicate = $scope.predicates[0];

    $scope.results = $scope.projects
    $scope.display = function(research){
        $scope.selectedResearch=research;
    }

    $scope.searchResearch = function(criteria){
        $scope.results=[]
        $scope.criteria={}
        for(var i=0;i<$scope.projects.length;i++){

            // if(criteria==null)break;
            if(criteria.name!=null &&criteria.department!=null){
                if ($scope.projects[i].department==criteria.department&&$scope.projects[i].name>=criteria.name){
                    $scope.results.push($scope.projects[i])
            }
            }
            else if(criteria.name==null &&criteria.department!=null){
                if ($scope.projects[i].department==criteria.department){
                    $scope.results.push($scope.projects[i])
            }
            }
            else if(criteria.name!=null &&criteria.department==null){
                if ($scope.projects[i].name>=criteria.name){
                    $scope.results.push($scope.projects[i])
            }
            }

        }
      }

}]).controller('studentEventsController', ['$scope', '$http', '$log','$mdDialog', function($scope, $http, $log, $mdDialog) {

    $scope.events = [ {date: '7/06/2106', name:'GM Info Session', image:"lib/img/eventsPlaceholder.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '10/25/2106', name: 'Graduate School Fair', image:"lib/img/eventsPlaceholder.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '10/07/2106', name: 'Facebook Info Table', image:"lib/img/eventsPlaceholder.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"lib/img/eventsPlaceholder.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"lib/img/eventsPlaceholder.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"lib/img/eventsPlaceholder.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"lib/img/eventsPlaceholder.jpg", description:"Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"lib/img/eventsPlaceholder.jpg", description:"Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"lib/img/eventsPlaceholder.jpg", description:"Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum."},
    ]

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
    // $scope.getStudent = function () {
    //         $http.get('/student/profile')
    //         .success(function (data, status) {
    //             $scope.student = data;
    //         })
    //         .error(function (data, status) {
    //             console.log(data, status);
    //             console.log("Could not get all")
    //         });
    // };



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

    // $scope.getProjects = function () {
    //     $http.get('/student/projects')
    //     .success(function (data, status) {
    //         $scope.projects = data;
    //          //console.log(data, status)
    //     })
    //     .error(function (data, status) {
    //         console.log(data, status);
    //         console.log("Could not get all projectazos")
    //     });
    // };

    $scope.getStudent();
    $scope.getProjects();
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
