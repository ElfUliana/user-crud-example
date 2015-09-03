'use strict';

/**
 * @ngdoc function
 * @name Application.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the Application
 */
angular.module('Application')
  .controller('CreateCtrl', function ($scope) {
    $scope.user = {"name":null,"email":null,"phone":null,"id":null,"address":{"state":null, "city":null, "street":null, "zip":null}};
    $scope.createUser = function(){
      console.log($scope.user);
    }
  });
