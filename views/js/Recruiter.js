angular.module('recruiter',[])

.controller('recruiterProfileController', ['$cookieStore','$scope', '$http', '$log', function($cookieStore,$scope, $http,$location, $log) {


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

            //chequiar rol, sino es recruiter tirar homepage
            var userid={'userid':$cookieStore.get('userid')}
            console.log(userid)
            $http.post('/recruiter/profile',userid)
            .success(function (data, status) {
                $scope.recruiter = data[0];
            })
            .error(function (data, status) {
            	console.log(data, status);
        		console.log("Could not get all")
            });
        };
   $scope.updateProfile=function(re){
      if(re.name==null){
        re.name=$scope.recruiter.name
      }
      if(re.lastname==null){
        re.lastname=$scope.recruiter.lastname
      }
       if(re.email==null){
        re.email=$scope.recruiter.email
      }  
      if(re.company==null){
        re.company=$scope.recruiter.company
      }   
    	 console.log(re)
        re.userid=$cookieStore.get('userid')
    	 $scope.newr={}
     	 $http.put('/recruiter/profile/update', re )
            .success(function (data) {
                $scope.getRecruiter();
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
        		console.log("could not update profile")
            });
        };
        $scope.getRecruiter();




}]).controller('recruiterEventController', ['$cookieStore','$scope', '$http', '$log', function($cookieStore,$scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#eventForm').slideToggle();
    }
    $scope.event={};
    $scope.events = []

     $scope.getEvents = function () {
        var userid={'userid':$cookieStore.get('userid')}
            $http.post('/recruiter/events',userid)
            .success(function (data, status) {
                $scope.events = data;
            })
            .error(function (data, status) {
            	console.log(data, status);
        		console.log("Could not get all")
            });
        };
    $scope.addEvent=function(e){
    	e.userid=$cookieStore.get('userid')
    	 console.log(e)

     	 $http.post('/recruiter/events/add', e )
            .success(function (data) {
              console.log("recibi la data")
              $scope.getEvents()
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
     	$http.delete('/recruiter/events/delete/'+id).success(function (data) {
                $scope.getEvents();
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
        		console.log("could not remove event")
            })
      };

     $scope.getEvents();

}]).controller('recruiterSearchController', ['$cookieStore','$scope', '$http', '$log', function($cookieStore,$scope, $http, $log) {
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
      console.log($cookieStore.get('username'))
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
      $scope.addStudentToFolder=function(student){

       $http.post('/recruiter/added', student )
            .success(function (data) {
                console.log("Added to folder")
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
            console.log("could not add to folder")
            });
        };
      $scope.searchStudents=function(criteria){
      	$scope.results=[]
      	$scope.criteria={}
      	for(var i=0;i<$scope.students.length;i++){

      		// if(criteria==null)break;
      		if(criteria.gpa!=null &&criteria.major!=null){
      			if ($scope.students[i].value==criteria.major&&$scope.students[i].gpa>=criteria.gpa){
      				$scope.results.push($scope.students[i])
      		}
      		}
      		else if(criteria.gpa==null &&criteria.major!=null){
      			if ($scope.students[i].value==criteria.major){
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


}]).controller('recruiterStudentFolder', ['$scope', '$http', '$log', function($scope, $http, $log) {

    //TODO cambiar esto
  $scope.selectedStudent={}
  $scope.students=[]
  console.log("entre")
    $scope.display=function(student){
        $scope.selectedStudent=student;
      }
    $scope.getStudents = function () {

            $http.get('/recruiter/added')
            .success(function (data, status) {
                $scope.students = data;
            })
            .error(function (data, status) {
              console.log(data, status);
            console.log("Could not get students")
            });
        };


     $scope.removeStudent=function(id){
      $http.delete('/recruiter/added/'+id).success(function (data) {
                $scope.students = data;
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
            console.log("could not remove student from folder")
            })
      };

     $scope.getStudents();

}]).controller('recruiterResearch', ['$scope', '$http', '$log', function($scope, $http, $log) {

    //TODO cambiar esto
  $scope.selectedStudent={}
  $scope.students=[]
  console.log("entre")
    $scope.display=function(student){
        $scope.selectedStudent=student;
      }
    $scope.getStudents = function () {

            $http.get('/recruiter/added')
            .success(function (data, status) {
                $scope.students = data;
            })
            .error(function (data, status) {
              console.log(data, status);
            console.log("Could not get students")
            });
        };


     $scope.removeStudent=function(id){
      $http.delete('/recruiter/added/'+id).success(function (data) {
                $scope.students = data;
            })
            .error(function (data, status, header, config) {
                console.log(data, status);
            console.log("could not remove student from folder")
            })
      };

     $scope.getStudents();

}])

