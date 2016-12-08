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
	$scope.majors=[]


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
		var info={userid:$cookieStore.get('userid'),
		studentid:student.studentid}
		$http.post('/recruiter/adding', info )
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
	$scope.getMajor();


}]).controller('recruiterStudentFolder', ['$cookieStore','$scope', '$http', '$log', function($cookieStore,$scope, $http, $log) {

	//TODO cambiar esto
	$scope.selectedStudent={}
	$scope.students=[]
	console.log("entre")
	$scope.display=function(student){
		$scope.selectedStudent=student;
	}
	$scope.getStudents = function () {
		var userid={'userid':$cookieStore.get('userid')}
		$http.post('/recruiter/added',userid)
		.success(function (data, status) {
			console.log(data)
			$scope.students = data;
		})
		.error(function (data, status) {
			console.log(data, status);
			console.log("Could not get students")
		});
	};


	$scope.removeStudent=function(id){
		console.log(id)
		$http.delete('/recruiter/added/'+id).success(function (data) {
			$scope.getStudents()
		})
		.error(function (data, status, header, config) {
			console.log(data, status);
			console.log("could not remove student from folder")
		})
	};

	$scope.getStudents();

}]).controller('recruiterResearch', ['$cookieStore','$scope', '$http', '$log','$mdDialog', function($cookieStore,$scope, $http, $log,$mdDialog) {

	//TODO cambiar esto
	$scope.selectedResearch={}
	$scope.researches=[]
	$scope.donation={}
	console.log("entre")
	$scope.display=function(student){
		$scope.selectedStudent=student;
	}
	$scope.getResearch = function () {
		$http.get('recruiter/research/get')
		.success(function (data, status) {
			$scope.researches = data;
			console.log(data)
		})
		.error(function (data, status) {
			console.log(data, status);
			console.log("Could not get all projectazos")
		});
	};

	$scope.fund = function (researchid) {
		console.log("donating")
		$scope.donation.rid=researchid;
		$scope.donation.userid=$cookieStore.get('userid')
		$http.post('recruiter/funding',$scope.donation)
		.success(function (data, status) {
			$scope.researches = data;
			console.log(data)
		})
		.error(function (data, status) {
			console.log(data, status);
			console.log("Could not get all projectazos")
		});
	};



	$scope.display=function(project){
		$scope.selectedResearch=project;
	}

	$scope.getResearch();


	$scope.eventDialog = function(ev,project) {
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

}])
