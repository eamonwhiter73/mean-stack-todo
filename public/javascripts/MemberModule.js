var MemberModule = angular.module('MemberModule', ['ui.bootstrap']);

MemberModule.controller('MemberListController', function ($scope, $http) {
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
        alert("hello");
        $scope.members.push(data.member);
      }
      else {
        alert(JSON.stringify(data));
      }
    });
  };
});