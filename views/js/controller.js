angular.module('mainController',[])

.controller('mainCtrl', ['$scope', '$http', '$log','$window','$cookies','$location', function($scope,$window,$cookies, $http, $log,$location) {
	//$scope.role=$cookies.get('role');
	$scope.tempUsr={}
	$scope.roleVal=0
	$scope.users=[
	{username:'Pedro',password:'pedro',role:'student'},
	{username:'Juan',password:'galleta',role:'recruiter'},
	{username:'Rogelio',password:'marie',role:'professor'}

	]
	$scope.login=function(usr){
		$scope.temUsr={}
		var bool=false;
		for(var i=0;i<$scope.users.length;i++){
			if($scope.users[i].username===usr.username&&
				$scope.users[i].password===usr.password){
				$scope.role=$scope.users[i].role
				//$cookies.put('role',$scope.role);
				bool=true;
				break
			}
		}
		if(bool==true){
			$('#loginModal').modal('hide');
			$('.modal-backdrop').remove();
			$location.path('/'+$scope.users[i].role)
		}
	}
	$scope.signUp=function(usr){
		$scope.temUsr={}
		$scope.users.push(usr);
		 $('#signupModal').modal('hide');
   		 $('.modal-backdrop').remove();
		$location.path('/'+usr.role)

	}
	
	

}])