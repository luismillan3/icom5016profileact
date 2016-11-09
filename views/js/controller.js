angular.module('mainController',[])

.controller('signUpController', ['$scope', '$http', '$log','$location','$window', function($scope, $http,$location,$window, $log) {
	
	$scope.tempUsr={}

	$scope.user={}
	$scope.majors=[{value:"ICOM"},
		{value:"INEL"},
		{value:"INSO"},
		{value:"INME"},
		{value:"INCI"},
		{value:"ININ"},
		{value:"INQU"}]
	
	$scope.signUpStudent=function(usr){
		// $http.post('/auth/signup/student', usr )
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
  			console.log("gatos volando")
            window.location='/#/student' 
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