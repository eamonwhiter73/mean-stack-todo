var MemberModule = angular.module('MemberModule', ['ui.bootstrap', 'ngRoute', 'ngResource', 'memberControllers']);

MemberModule.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when("/member/:id.json", {
        templateUrl: "/home/yz/meanstack/projects/mean-stack-todo/views/templates/home.jade",
        controller: "MemberViewController" })
      .when("/members.json", {
        templateUrl: '/home/yz/meanstack/projects/mean-stack-todo/views/templates/memberlist.jade',
        controller: 'PhoneListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);

var memberControllers = angular.module('memberControllers', []);

memberControllers.controller('MemberListController', ['$scope', '$http',
  function ($scope, $http) {
    $scope.members = [];
    $scope.newMember = {
      done : false
    };

    $scope.doneFilter = { done : true };
    $scope.notDoneFilter = { done : false };

    $scope.setMembers = function(members) {
      $scope.members = members;
    };

    $scope.update = function(member) {
      $http.put('/member/' + member._id + '.json', member).success(function(data) {
        if (!data.member) {
          alert(JSON.stringify(data));
        }
      });
    };

    $scope.updateList = function() {
      $http.get('/members.json').success(function(data) {
        $scope.members = data.members;
      });
    };

    setInterval(function() {
      $scope.updateList();
      $scope.$apply();
    }, 30 * 60 * 1000); // update every 30 minutes;

    $scope.updateList();

    $scope.addNewMember = function() {
      $http.post('/member.json', $scope.newMember).success(function(data) {
        if (data.member) {
          $scope.members.push(data.member);
        }
        else {
          alert(JSON.stringify(data));
        }
      });
    };
  }
]);

memberControllers.controller('MemberViewController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.member.id = $routeParams.member.id;
  }
]);