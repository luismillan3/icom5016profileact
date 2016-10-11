angular.module('mainController',[])

.controller('mainCtrl', ['$scope', '$http', '$log', function($scope, $http, $log,$location) {

	$scope.tempUsr={}
	$scope.users=[
	{username:'Pedro',password:'pedro',role:'student'},
	{username:'Juan',password:'galleta',role:'recruiter'},
	{username:'Rogelio',password:'marie',role:'professor'}

	]
	$scope.login=function(usr){
		$scope.temUsr={}
		for(var i=0;i<$scope.users.length;i++){
			if($scope.users[i].username===usr.username&&
				$scope.users[i].password===usr.password){
				window.location="#/"+$scope.users[i].role;
			}
		}
	}

}])