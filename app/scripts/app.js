'use strict';

/**
 * @ngdoc overview
 * @name Application
 * @description
 * # Application
 *
 * Main module of the application.
 */
angular
  .module('Application', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'internationalPhoneNumber'
  ])//TODO: Add UserRepository service
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        activeTab: 'list'
      })
      .when('/client', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl',
        activeTab: 'create'
      })
      .when('/client/:clientId', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        activeTab: 'edit'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
