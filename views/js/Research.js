
angular.module('research',[])

.controller('researchController', ['$scope', '$http', '$log', '$mdDialog', function($scope, $http, $log, $mdDialog) {

$scope.project={}

 $scope.go = function ( path ) {
        console.log(path);
        window.location=path;
}
    $scope.projectazos = []


   $scope.getProjectazo = function () {
            $http.get('/investigacion/projectazos')
            .success(function (data, status) {
                $scope.projectazos = data;
                 console.log(data, status)
            })
            .error(function (data, status) {
                console.log(data, status);
                console.log("Could not get all projectazos")
            });
        };

        $scope.getProjectazo();

    // $scope.display=function(project){
    //     $scope.selectedProject=project;
    // }

    $scope.showAdvanced = function(ev,project) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/recruiterProjectDialog.html',
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



}]).controller('professorResearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {



}])
