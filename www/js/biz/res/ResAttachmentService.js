/**
 * Created by Tony on 2016/7/12.
 */

angular.module('starter.ResAttachmentService',[
  'ngCordova',
  'ionic',])

  .factory("ResAttachmentService", [
    '$soap',
    '$ionicModal',
    function($soap,$ionicModal){
      var workLogScore;// 上面传过来的区间引用

      var ctrl = {
        mTypeName :null,
        mData : [],
        onItemClick:function(entity){
          ctrl.closeAttachments();
        },
        showAttachments:function(attacments){
          if(attacments!=undefined && attacments instanceof Array){
            if(ctrl.mData.length === 0){
              var size = attacments.length;
              for(var i = 0;i < size;i++){
                if(!attacments[i].IsDeleted){
                  ctrl.mData.push(attacments[i]);
                }
              }
            }
          }
          workLogScore.modal.show();
        },
        closeAttachments:function(){
          workLogScore.modal.hide();
        }

      };

      var _modal = function ($scope) {
        workLogScore = $scope;
        var modal = $ionicModal.fromTemplateUrl('templates/res/modal_list_selector.html',{
          scope:$scope,
          animation:'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;
          return modal
        });

        $scope.$on('$destroy', function () {
          $scope.modal.remove();
        });
        return modal;
      };

      return {
        mInitModal : _modal,
        mListCtrl : ctrl,
      }
    }])
