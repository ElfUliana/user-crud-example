"use strict";
angular.module('dataRepositories', ['ngResource']).
  factory('UserRepository', function($resource){
    var User = $resource('users/:userId', {"userId": "@id"}, {"update": {"method": "PUT"}}); // TODO: Use Front-end caching with {cache: true}
    return {
      getUsers: function (skip, limit, onSuccess, onError) {
        if ('undefined' === skip) {
          skip = 0;
        }
        if ('undefined' === limit) {
          limit = 10;
        }
        var result;
        if ('undefined' === onSuccess) {
          result = User.query({"skip": skip, "limit": limit});
        } else {
          if ('undefined' === onError) {
            result = User.query({"skip": skip, "limit": limit}, onSuccess);
          } else {
            result = User.query({"skip": skip, "limit": limit}, onSuccess, onError);
          }
        }
        return result;
      },
      newUser: function () {
        return new User({
          "name": null,
          "email": null,
          "phone": null,
          "id": null,
          "address": {"state": null, "city": null, "street": null, "zip": null}
        });
      },
      // TODO: Debug statement. Remove!!!
      sampleUser: function() {
        return new User({"name":"John Doe","email":"johndoe@example.com","phone":"+5555333444","id":"E1_MuvJ2","address":{"state": "New York", "city": "New York", "street": "Manhattan", "zip": "MH00056"}});
      }
    };
  });
