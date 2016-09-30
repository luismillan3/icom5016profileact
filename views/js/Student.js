angular.module('student',[])

.controller('researchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#blogForm').slideToggle();
    }

}]).controller('studentEventsController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.events = [ {date: '10/06/2106', name:'GM Info Session'},
        {date: '10/25/2106', name: 'Graduate School Fair'},
        {date: '10/07/2106', name: 'Facebook Info Table'},
        {date: '9/06/2106', name: 'Facebook Info Session'}
    ]

}]).controller('studentProfileController', ['$scope', '$http', '$log', '$mdDialog', function($scope, $http, $log, $mdDialog) {

    $scope.firstName="Fabio";
    $scope.lastName="Lanzoni";
    $scope.profileImage = "https://s-media-cache-ak0.pinimg.com/236x/bd/01/40/bd01401c5b6c716b8b14786ec995ecbe.jpg";
    $scope.major="Computer Engineering";
    $scope.resume= "https://github.com/Specialist17/Resume/blob/master/Fernando-Arocho-Colom_Resume.pdf";
    $scope.projects = [
        { name: 'Enfoque Film Festival', picture:"http://www.filmfestivals.com/files/enfoque_logo_HORIZONTAL1.jpg?0"},
        { name: 'Tarzan Watch', picture:"http://www.nse.org/exchange/slides/135_4_Our-Mascot-Tarzan.jpg"},
        { name: 'Build NodeJS backend' , picture:"https://cdn.tutsplus.com/net/uploads/legacy/956_nodeJs/nodeJs.png"},
        { name: 'Get started with AngularJS' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg"},
        { name: 'Setup Postgres database' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg"},
        { name: 'Be awesome!' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg"},
    ];

    $scope.research = [
        { name: 'Enfoque Film Festival', department: 'Computer Engineering', advisor: 'Nayda Santiago'},
        { name: 'Tiburones', department: 'Electrical Engineering', advisor: 'Nayda Santiago'},

    ];


    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
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
  }


}]).controller('AppCtrl', function($scope) {
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;

  $scope.googleUrl = 'http://google.com';

});