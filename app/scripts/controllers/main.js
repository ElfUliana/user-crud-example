'use strict';

/**
 * @ngdoc function
 * @name Application.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Application
 */
angular.module('Application')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
