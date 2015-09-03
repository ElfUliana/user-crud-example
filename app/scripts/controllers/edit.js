'use strict';

/**
 * @ngdoc function
 * @name Application.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the Application
 */
angular.module('Application')
  .controller('EditCtrl', ['$scope', '$location', '$routeParams',
    function ($scope, $location, $routeParams) {
      $scope.user = {"name":"John Doe","email":"johndoe@example.com","phone":"+5555333444","id":"E1_MuvJ2","address":{"state": "New York", "city": "New York", "street": "Manhattan", "zip": "MH00056"}};
      $scope.deleteUser = function(userId) {
        console.log(userId);
        $location.path('#/');
      };
      $scope.editUser = function () {
        console.log($scope.user);
      }
    }
  ]);
