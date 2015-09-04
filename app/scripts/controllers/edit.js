'use strict';

/**
 * @ngdoc function
 * @name Application.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller of the Application
 */
angular.module('Application')
  .controller('EditCtrl', ['$scope', '$location', 'UserRepository',
    function ($scope, $location, UserRepository) {
      $scope.user = UserRepository.sampleUser();
      $scope.deleteUser = function() {
        $scope.user.$delete();
        $location.path('#/');
      };
      $scope.editUser = function (form) {
        if (form.$valid) {
          $scope.user.$update();
        }
      }
    }
  ]);
