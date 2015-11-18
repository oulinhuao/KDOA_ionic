angular.module('starter.controllers', [])


.controller('MainCtrl', function ($scope, $state) {
    $scope.goWorkLog = function () {
        $state.go('worklog');
    };
    $scope.goInfo = function () {
        $state.go('main');
    };
    $scope.goContactsg = function () {
        $state.go('main');
    };
    $scope.goIM = function () {
        $state.go('main');
    }


})

.controller('ToggleCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
})

.controller('MainRightMenuCtrl', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
})











.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
