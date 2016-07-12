/**
 * Created by Tony on 2016/7/12.
 */
angular.module('starter.ResAttachmentController',[
    'ngCordova',
    'starter.ResAttachmentService'])

  .controller('ResAttachmentCtrl', ['$scope',
    '$ionicModal',
    'ResAttachmentService',
    function ($scope,$ionicModal,ResAttachmentService) {
      $scope.mResAttachmentService = ResAttachmentService;


    }])
