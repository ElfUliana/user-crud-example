'use strict';

/**
 * @ngdoc function
 * @name Application.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the Application
 */
angular.module('Application')
  .controller('CreateCtrl', ['$scope', 'UserRepository', function ($scope, UserRepository) {
    $scope.user = UserRepository.newUser();
    $scope.createUser = function(form){
      if (form.$valid) {
        $scope.user.$save();
      }
    }
  }]);
