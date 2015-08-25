'use strict';

/**
 * @ngdoc function
 * @name Application.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the Application
 */
angular.module('Application')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
