angular.module('mainController',[])

.controller('mainCtrl', ['$scope', '$http', '$log','$location','$window', function($scope, $http,$location,$window, $log) {
	
	$scope.tempUsr={}

	$scope.user={}
	$scope.login=function(usr){
		$scope.temUsr={}
		
		$http.post('/auth/login', usr )
            .success(function (data) {
            	console.log(data)
                $scope.user = data;
                $('#loginModal').modal('hide');
				$('.modal-backdrop').remove();
			
				window.location='/#/'+$scope.user.role
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
        		console.log("could not login")
            }); 
     	
       
		
	}
	$scope.signUp=function(usr){
		$scope.temUsr={}
		$http.post('/auth/signup', usr )
            .success(function (data) {
                $scope.user = data;
                 $('#signupModal').modal('hide');
   		 		$('.modal-backdrop').remove();
				window.location='/#/'+$scope.user.role
               
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
        		console.log("could not log in")
            });
		
		

	}
	$scope.roleSet=function(rol){
		return $scope.role===rol;
	}



}])