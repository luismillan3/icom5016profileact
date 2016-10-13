angular.module('student',[])

.controller('studentResearchController', ['$scope', '$http', '$log', '$filter', function($scope, $http, $log, filter) {

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

}]).controller('studentEventsController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.events = [ {date: '10/06/2106', name:'GM Info Session', image:"templates/luna.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '10/25/2106', name: 'Graduate School Fair', image:"luna.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '10/07/2106', name: 'Facebook Info Table', image:"luna.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"luna.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"luna.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"luna.jpg", description:"Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"luna.jpg", description:"Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"luna.jpg", description:"Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum."},
        {date: '9/06/2106', name: 'Facebook Info Session', image:"luna.jpg", description:"Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum."},
    ]

}]).controller('studentProfileController', ['$scope', '$http', '$log', '$mdDialog', function($scope, $http, $log, $mdDialog, $location) {


    $scope.newr={}
    $scope.student={}

    $scope.frmToggle = function() {
        $('#profileForm').slideToggle();
    }
    $scope.go = function ( path ) {
      console.log(path);
      window.location=path;
    }
    $scope.getStudent = function () {
            $http.get('/student/profile')
            .success(function (data, status) {
                $scope.student = data;
            })
            .error(function (data, status) {
              console.log(data, status);
            console.log("Could not get all")
            });
    };
    $scope.updateProfile=function(re){
        console.log(re)
        $scope.newr={}

        $http.put('/student/update', re )
        .success(function (data) {
            $scope.student = data;
        })
        .error(function (data, status, header, config) {
            console.log(data, status);
            console.log("could not add event")
        });
    };

     $scope.addProject=function(re){
        re.id=$scope.student.projects.length+1;
        console.log(re)
        $scope.newr={}

        $http.post('/student/projects', re )
        .success(function (data) {
            $scope.projects = data;
        })
        .error(function (data, status, header, config) {
            console.log(data, status);
            console.log("could not add event")
        });
    };

        //  $scope.addProject=function(e){
        // e.id=$scope.projects.length+1;
        //  console.log(e)

        //  $http.post('/student/projects', e )
        //     .success(function (data) {
        //         $scope.projects = data;
        //     })
        //     .error(function (data, status, header, config) {
        //         console.log(data, status);
        //         console.log("could not add event")
        //     });
        // };
    $scope.getStudent();

    // selectedProject={}
    // projects = [
    //       {id: 0, name: 'Enfoque Film Festival', picture:"http://www.filmfestivals.com/files/enfoque_logo_HORIZONTAL1.jpg?0", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
    //       {id: 1, name: 'Tarzan Watch', picture:"http://www.nse.org/exchange/slides/135_4_Our-Mascot-Tarzan.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
    //       {id: 2, name: 'Build NodeJS backend' , picture:"https://cdn.tutsplus.com/net/uploads/legacy/956_nodeJs/nodeJs.png", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
    //       {id: 3, name: 'Get started with AngularJS' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
    //       {id: 4, name: 'Setup Postgres database' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
    //       {id: 5, name: 'Be awesome!' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
    // ];

    // $scope.selectedProject={};

    // $scope.firstName="Fabio";
    // $scope.lastName="Lanzoni";
    // $scope.profileImage = "https://s-media-cache-ak0.pinimg.com/236x/bd/01/40/bd01401c5b6c716b8b14786ec995ecbe.jpg";
    // $scope.major="Computer Engineering";
    // $scope.resume= "https://github.com/Specialist17/Resume/blob/master/Fernando-Arocho-Colom_Resume.pdf";
    // $scope.projects = projects

    // $scope.research = [
    //     { name: 'Enfoque Film Festival', department: 'Computer Engineering', advisor: 'Nayda Santiago'},
    //     { name: 'Tiburones', department: 'Electrical Engineering', advisor: 'Nayda Santiago'},

    // ];


    // $scope.addProject = function(project){
    //   this.project.id = projects.length
    //   projects.push(this.project);
    // };

    // $scope.display=function(project){
    //     $scope.selectedProject=project;
    // }

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

    //   $scope.firstName="Fabio";
    //   $scope.lastName="Lanzoni";
      $scope.selectedProject=selectedProject;
    }


}]).controller('AppCtrl', function($scope) {
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;

  $scope.googleUrl = 'http://google.com';

});