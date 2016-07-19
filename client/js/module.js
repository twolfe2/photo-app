'use strict';


var app = angular.module('myApp', ['ui.router', 'ui.router', 'satellizer', 'ngFileUpload']);

app.config(function($authProvider) {
  $authProvider.loginUrl = '/api/users/login';
  $authProvider.signupUrl = '/api/users/signup';

  $authProvider.facebook({
    clientId: '277768235911300',
    url: '/api/users/facebook'
  });

});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/html/home.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/register.html',
      controller: 'registerCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'loginCtrl'
    })
    .state('images', {
      url: '/images',
      templateUrl: '/html/images.html',
      controller: 'imagesCtrl',
      resolve: {
        Images: function(Image) {
          return Image.getAll();
        }
      }
    })
    .state('addImage', {
      url: '/addImage',
      templateUrl: '/html/addImage.html',
      controller: 'addImageCtrl'
    })



  $urlRouterProvider.otherwise('/');
})