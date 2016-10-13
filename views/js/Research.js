angular.module('research',[])

.controller('researchController', ['$scope', '$http', '$log', function($scope, $http, $log) {

	// $scope.research = [
 //        { id:1,title: 'Multisensor buoy for underwater data collection',funding:100,member:'Luis Millan'},

 //      ]

      $scope.departments = [{id:1, name: "ICOM"},
      {id:2, name: "INEL"},
      {id:3, name: "ININ"},
      {id:4, name: "INCI"},
      {id:5, name: "INQU"},
      {id:6, name: "BIOL"},
      {id:7, name: "QUIM"},
      {id:8, name: "MATE"},
    ]

    $scope.projects = [
      {id:0, name:"Enfoque", advisor:"Nayda", department:"ICOM", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:1, name:"Nanito", advisor:"Nayda2", department:"ICOM", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:2, name:"Gene Editing", advisor:"Fulano", department:"BIOL", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:3, name:"Tiburones", advisor:"Fernando", department:"INEL", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:4, name:"HCI", advisor:"Fulanita", department:"ININ", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:5, name:"Drones", advisor:"Nayda3", department:"ICOM", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
      {id:6, name:"Point Cloud", advisor:"Nayda4", department:"ICOM", description: "Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
    ]


    $scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];

    $scope.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];
    $scope.selectedPredicate = $scope.predicates[0];

    $scope.results = $scope.projects
    $scope.display = function(research){
        $scope.selectedResearch=research;
    }

    $scope.searchResearch = function(criteria){
        $scope.results=[]
        $scope.criteria={}
        for(var i=0;i<$scope.projects.length;i++){

            // if(criteria==null)break;
            if(criteria.name!=null &&criteria.department!=null){
                if ($scope.projects[i].department==criteria.department&&$scope.projects[i].name>=criteria.name){
                    $scope.results.push($scope.projects[i])
            }
            }
            else if(criteria.name==null &&criteria.department!=null){
                if ($scope.projects[i].department==criteria.department){
                    $scope.results.push($scope.projects[i])
            }
            }
            else if(criteria.name!=null &&criteria.department==null){
                if ($scope.projects[i].name>=criteria.name){
                    $scope.results.push($scope.projects[i])
            }
            }

        }
      }


}]).controller('professorResearchController', ['$scope', '$http', '$log', function($scope, $http, $log) {



}])