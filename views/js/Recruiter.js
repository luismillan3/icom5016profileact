angular.module('recruiter',[])

.controller('recruiterProfileController', ['$scope', '$http', '$log', function($scope, $http,$location, $log) {

<<<<<<< HEAD
	$scope.newr={}
=======
    $scope.newr={}
>>>>>>> d711fdf089e5ace37f55e0d1e3eafdc0891371a1
    $scope.recruiter={name:"Alejandro",lastname:"Martinez",email:"ale.ma@raytheon.com",company:"Raytheon"}
    $scope.pic="public/dummyprofilepic.png"
    $scope.frmToggle = function() {
        $('#profileForm').slideToggle();
    }
    $scope.go = function ( path ) {
<<<<<<< HEAD
    	console.log(path);
	    window.location=path;
	}	
    $scope.updateProfile=function(info){
    	$scope.recruiter=info;
    	$scope.newr={}
=======
        console.log(path);
        window.location=path;
    }
    $scope.updateProfile=function(info){
        $scope.recruiter=info;
        $scope.newr={}
>>>>>>> d711fdf089e5ace37f55e0d1e3eafdc0891371a1
    }

}]).controller('recruiterEventController', ['$scope', '$http', '$log', function($scope, $http, $log) {

    $scope.frmToggle = function() {
        $('#eventForm').slideToggle();
    }
    $scope.event=[];
    $scope.events = [
        { title: 'Master HTML/CSS/Javascript',description:"Awesome Event",date:"10/12/16 10:00"},
        { title: 'Raytheon Session',description:"Awesome Event",date:"10/12/16 10:00"},
        { title: 'Johns Hopkins Session',description:"Awesome Event",date:"10/12/16 10:00"},
        { title: 'Boeing Company',description:"Awesome Event",date:"10/12/16 10:00"},
        { title: 'Mario Bros in the House',description:"Awesome Event",date:"10/12/16 10:00"}
      ]
     $scope.addEvent=function(e){
<<<<<<< HEAD
     	$scope.events.push(e);
     	$scope.event=[];
     }
     $scope.removeEvent=function(e){
     	for(var i = $scope.events.length-1; i--;){
	if ($scope.events[i] === e) $scope.events.splice(i, 1);
=======
        $scope.events.push(e);
        $scope.event=[];
     }
     $scope.removeEvent=function(e){
        for(var i = $scope.events.length-1; i--;){
    if ($scope.events[i] === e) $scope.events.splice(i, 1);
>>>>>>> d711fdf089e5ace37f55e0d1e3eafdc0891371a1
}
     }

}]).controller('recruiterSearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {
<<<<<<< HEAD
	$scope.selectedStudent={}
	$scope.results=[]
	$scope.criteria={}
	$scope.majors=[{value:"ICOM"},
		{value:"INEL"},
		{value:"INSO"},
		{value:"INME"},
		{value:"INCI"},
		{value:"ININ"},
		{value:"INQU"}]
	  $scope.students = [
=======
    $scope.selectedStudent={}
    $scope.results=[]
    $scope.criteria={}
    $scope.majors=[{value:"ICOM"},
        {value:"INEL"},
        {value:"INSO"},
        {value:"INME"},
        {value:"INCI"},
        {value:"ININ"},
        {value:"INQU"}]
      $scope.students = [
>>>>>>> d711fdf089e5ace37f55e0d1e3eafdc0891371a1
        { studentName: 'Marcel',studentLastName:"Fuentes",gpa:3.53,major:"BIOL"},
        { studentName: 'Maria',studentLastName:"Del Valle",gpa:3.32,major:"COMP"},
        { studentName: 'Kelvin',studentLastName:"Pelota",gpa:2.74,major:"ICOM"},
        { studentName: 'Nerymar',studentLastName:"Cucuza",gpa:2.9,major:"INEL"},
        { studentName: 'Cafralin',studentLastName:"Pelora",gpa:3.94,major:"ININ"}
      ]
      $scope.results=$scope.students
      $scope.display=function(student){
<<<<<<< HEAD
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
=======
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
>>>>>>> d711fdf089e5ace37f55e0d1e3eafdc0891371a1
      }

}])