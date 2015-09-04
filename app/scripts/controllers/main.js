'use strict';

/**
 * @ngdoc function
 * @name Application.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Application
 */
angular.module('Application')
  .controller('MainCtrl', ['$scope', 'UserRepository', function ($scope, UserRepository) {
    /*
      Private class that represents list users page.
      Not getting instance of it through DI because it shouldn't be used anywhere in a code except current place
     */
    var UsersPage = function (downloadLimit) {
      this.__downloadLimit = 'undefined' === downloadLimit ? 10 : downloadLimit;
      this.loaded = [];
      this.paging = {
        disabled: false,
        complete: false,
        hasError: false,
        error: null
      };
    };
    UsersPage.prototype.getNextUsers = function () {
      if (this.paging.disabled || this.paging.complete) {
        return;
      }

      // TODO: Debug statements. Remove!!!
      //this.loaded.push(UserRepository.sampleUser());
      //this.paging.complete = this.loaded.length > 5;
      //return this;

      this.paging.disabled = true;
      UserRepository.getUsers(
        this.loaded.length,
        this.__downloadLimit,
        function (value/*, responseHeaders*/) {
          for (var i = 0; i < value.length; i++) {
            this.loaded.push(value[i]);
          }
          this.paging.complete = (value.length >= this.__downloadLimit);
          this.paging.disabled = false;
          this.paging.hasError = false;
        }.bind(this), function (httpResponse) {
          this.paging.disabled = false;
          this.paging.hasError = true;
          this.paging.error = httpResponse.data
            || 'Request failed with status {0}: {1}'.format(httpResponse.status, httpResponse.statusText);
        }.bind(this));
      return this;
    };
    $scope.page = new UsersPage();
    $scope.closeAlert = function () {
      $scope.page.paging.error = false;
    }
  }]);
