angular.module('recruiter',[])

.controller('recruiterProfileController', ['$scope', '$http', '$log', function($scope, $http,$location, $log) {

	$scope.newr={}
    $scope.recruiter={}

    $scope.frmToggle = function() {
        $('#profileForm').slideToggle();
    }
    $scope.go = function ( path ) {
    	console.log(path);
	    window.location=path;
	}
	$scope.getRecruiter = function () {
            $http.get('/recruiter/profile')
            .success(function (data, status) {
                $scope.recruiter = data;
            })
            .error(function (data, status) {               
            	console.log(data, status);
        		console.log("Could not get all")
            });
        };	
   $scope.updateProfile=function(re){
    	 console.log(re)
    	 $scope.newr={}
     	 $http.put('/recruiter/profile/update', re )
            .success(function (data) {
                $scope.recruiter = data;
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
        		console.log("could not add event")
            });
        };
        $scope.getRecruiter();

}]).controller('recruiterEventController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#eventForm').slideToggle();
    }
    $scope.event={};
    $scope.events = []

     $scope.getEvents = function () {
            $http.get('/recruiter/events')
            .success(function (data, status) {
                $scope.events = data;
            })
            .error(function (data, status) {               
            	console.log(data, status);
        		console.log("Could not get all")
            });
        };
    $scope.addEvent=function(e){
    	e.id=$scope.events.length+1;
    	 console.log(e)
    	 
     	 $http.post('/recruiter/events', e )
            .success(function (data) {
                $scope.events = data;
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
        		console.log("could not add event")
            });
        };
    
     // $scope.addEvent=function(e){
     // 	$scope.events.push(e);
     // 	$scope.event=[];
     // }
     $scope.removeEvent=function(id){
     	$http.delete('/recruiter/events/'+id).success(function (data) {
                $scope.events = data;
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
        		console.log("could not remove event")
            })
      };
    
     $scope.getEvents();

}]).controller('recruiterSearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {
	$scope.selectedStudent={}
	$scope.results=[]
	$scope.criteria={}
	$scope.students=[]
	$scope.majors=[{value:"ICOM"},
		{value:"INEL"},
		{value:"INSO"},
		{value:"INME"},
		{value:"INCI"},
		{value:"ININ"},
		{value:"INQU"}]
	  
	  $scope.getStudents = function () {
            $http.get('/recruiter/search')
            .success(function (data, status) {
                $scope.students = data;
                $scope.results=$scope.students
            })
            .error(function (data, status) {               
            	console.log(data, status);
        		console.log("Could not get students")
            });
        };
      
      $scope.display=function(student){
      	$scope.selectedStudent=student;
      }
      $scope.searchStudents=function(criteria){
      	$scope.results=[]
      	$scope.criteria={}
      	for(var i=0;i<$scope.students.length;i++){
      		
      		// if(criteria==null)break;
      		if(criteria.gpa!=null &&criteria.major!=null){
      			if ($scope.students[i].major==criteria.major&&$scope.students[i].gpa>=criteria.gpa){
      				$scope.results.push($scope.students[i])
      		}
      		}
      		else if(criteria.gpa==null &&criteria.major!=null){
      			if ($scope.students[i].major==criteria.major){
      				$scope.results.push($scope.students[i])
      		}
      		}
      		else if(criteria.gpa!=null &&criteria.major==null){
      			if ($scope.students[i].gpa>=criteria.gpa){
      				$scope.results.push($scope.students[i])
      		}
      		}
      		
      	}
      }
      $scope.getStudents();


}])