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
    $scope.users = [
      {"name":"John Doe","email":"johndoe@example.com","phone":"+5555333444","id":"E1_MuvJ2"},
      {"name":"John Doe","email":"johndoe@example.com","phone":"+5555333444","id":"E1_MuvJ2","address":{"state": "New York", "city": "New York", "street": "Manhattan", "zip": "MH00056"}}
    ];
  });
