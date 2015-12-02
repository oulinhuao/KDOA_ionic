// Ionic Starter App



// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

// database handle
//var db = null;

angular.module('starter', ['ionic', 'ngCordova',
  'starter.controllers',
  'starter.services',
  'starter.databaseservice',
  'starter.globalservice',
  'starter.MainController',
  'starter.UserInfoController',
  'starter.UserInfoService',
  'starter.WorklogController',
  'starter.workloglistcontroller'
  ])



  // 设备类型：是否为IOS设备
  .constant("IsIOSDevice", ionic.Platform.isIOS())

  // 设备类型：是否为Android设备
  .constant("IsAndroidDevice", ionic.Platform.isAndroid())

  // 设备类型：是否为网页
  .constant("IsWebView", ionic.Platform.isWebView())

  .run(['$ionicPlatform',
    '$rootScope', '$location',
    '$timeout', '$ionicHistory',
    '$cordovaToast', '$cordovaKeyboard',
    'GlobalSetting',
    'DBHelper',
    '$cordovaFile',
    function ($ionicPlatform, $rootScope, $location,
              $timeout, $ionicHistory,
              $cordovaToast, $cordovaKeyboard,
              GlobalSetting,DBHelper,$cordovaFile) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }

        GlobalSetting.initSetting();
        // set device's external pa
        if (ionic.Platform.isAndroid()) { // android设备
          if("undefined" != typeof(cordova)){
            GlobalSetting.setLocalPath(cordova.file.externalRootDirectory);
          }
          // 注册back键事件
          $ionicPlatform.registerBackButtonAction(function (e) {
            e.preventDefault();

            // 退出应用程序
            function exitApp() {
              if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
              } else {
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortBottom("再按一次退出应用！");
                setTimeout(function () {
                  $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
              }
            }

            // Is there a page to go back to?
            if ($location.path() == '/main') {
              exitApp();
            } else if ($ionicHistory.backView()) { // $rootScope.$viewHistory.backView
              if ($cordovaKeyboard.isVisible()) {
                $cordovaKeyboard.close();
              } else {
                //$rootScope.$viewHistory.backView.go();
                $ionicHistory.goBack();
              }
            } else {
              exitApp();
            }
            return false;
          }, 101); //不回退页面（优先级100）
        } else if (ionic.Platform.isIOS()) { // ios设备
          //GlobalSetting.setLocalPath(cordova.file.dataDirectory);
        }
        //// init database object
        //db = DBHelper.opendb();
        ////DBHelper.dropTable();
        //// create table
        //DBHelper.createTable();

      });
    }
  ])

  .config(['$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider,GlobalSetting) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

        .state('login',{
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'UserInfoCtrl'
        })

        .state('main', {
          url: '/main',
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        })

        // 菜单
        .state('main.menu', {
          abstract: true,
          url: '/menu',
          views: {
            'menuContent' :{
              templateUrl: "templates/main_menu.html",
              controller: 'MainRightMenuCtrl'
            }
          }
        })

        .state('worklog', {
          url: '/worklog',
          templateUrl: 'templates/worklog.html',
          controller: 'WorklogCtrl'
        })


        .state('worklog.list', {
          url: '/list',
          views: {
            'worklog-list': {
              templateUrl: 'templates/worklog_list.html',
              controller: 'WorklogListCtrl'
            }
          }
        })
        .state('worklog.analysis', {
          url: '/analysis',
          views: {
            'worklog-analysis':{
              templateUrl: 'templates/worklog_analysis.html',
              controller: 'WorklogListCtrl'
            }
          }
        })

        .state('worklogdetial', {
          url: '/detial',
          params: {
            'projEntity': null
          },
          templateUrl: 'templates/worklog_detial.html',
          controller: 'WorklogCtrl'
        })

        .state('worklogdetial_edit', {
          url: '/detial_edit',
          params: {
            'projEntity': null
          },
          templateUrl: 'templates/worklog_detial_edit.html',
          controller: 'WorklogCtrl'
        })



      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');

    }]);
