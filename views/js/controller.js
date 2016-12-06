angular.module('mainController',[])

.controller('signUpController', ['$cookieStore','$scope', '$http', '$log','$location','$window', function($cookieStore, $scope, $http,$location,$window, $log) {

	$scope.tempUsr={}

	$scope.user={}
	$scope.majors=[];
	$scope.getMajor = function () {

		$http.get('/auth/major')
		.success(function (data, status) {
			$scope.majors = data;

		})
		.error(function (data, status) {
			console.log(data, status);
			console.log("Could not get major")
		});
	};
	$scope.getMajor();

	$scope.signUpStudent=function(usr){
		console.log(usr)

		$http.post('/auth/signup/student', usr )
		.success(function (data) {
			$cookieStore.put('role', $scope.user.role);
			$cookieStore.put('userid', $scope.user.userid);
			window.location='/#/'+$scope.user.role

		})
		.error(function (data, status, header, config) {
			console.log(data, status);
			console.log("could not register new student")
		});
	}


	$scope.signUpRecruiter=function(usr){
		// $http.post('/auth/signup/recruiter', usr )
		//           .success(function (data) {
		//           	console.log(data)
		//               $scope.user = data;
		// 		$cookieStore.put('role', $scope.user.role);
		// 		$cookieStore.put('userID', $scope.user.userID);
		// 		window.location='/#/'+$scope.user.role
		//           })
		//           .error(function (data, status, header, config) {
		//               console.log(data, status);
		//       		console.log("could not login")
		//           });
		window.location='/#/recruiter'
	}
	$scope.signUpProfessor=function(usr){
		// $http.post('/auth/signup/recruiter', usr )
		//           .success(function (data) {
		//           	console.log(data)
		//               $scope.user = data;
		// 		$cookieStore.put('role', $scope.user.role);
		// 		$cookieStore.put('userID', $scope.user.userID);
		// 		window.location='/#/'+$scope.user.role
		//           })
		//           .error(function (data, status, header, config) {
		//               console.log(data, status);
		//       		console.log("could not login")
		//           });
		window.location='/#/professor'
	}


}])

.controller('signInController', ['$cookieStore','$scope', '$http', '$log','$location','$window',
function($cookieStore,$scope, $http,$location,$window, $log) {


	$scope.tempUsr={}

	$scope.user={}
	$scope.login=function(usr){


		// $cookieStore.put('username', 'gatosvolando');
		// console.log($cookieStore.get('username'))
		$scope.temUsr={}

		$http.post('/auth/login', usr )
		//TODO anadir sanitacion si no se encuentra ningun valor,, se puede hacer en node
		.success(function (data) {
			console.log(data[0])
			$scope.user = data[0];
			$cookieStore.put('role', $scope.user.role);
			$cookieStore.put('userid', $scope.user.userid);
			window.location='/#/'+$scope.user.role
		})
		.error(function (data, status, header, config) {
			console.log(data, status);
			console.log("could not login")
		});



	}


}])
