(function() {
  'use strict';

  function UserService($rootScope, $location, $http, $q,
                       localStorageService, AuthRejections) {
    this.currentUser = {authenticated: false};

    this.onTokenReceived = function(event, eventPayload) {
      angular.extend(this.currentUser, {token: eventPayload.token});
      this.afterTokenReceived();
    };

    this.afterTokenReceived = function() {
      this.getCurrentUser()
        .then(_.bind(onGetCurrentUserSuccess, this))
        .then(_.bind(saveToLocalStorage, this))
        .then(redirect);
    };

    this.getCurrentUser = function() {
      return $http({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.token
        }
      });
    };

    this.init = function() {
      $rootScope.$on('tokenReceived', _.bind(this.onTokenReceived, this));
    };

    function onGetCurrentUserSuccess(response) {
      angular.extend(this.currentUser, {
        id: response.data.id,
        authenticated: true
      });
    }

    function saveToLocalStorage() {
      localStorageService.set('token', this.currentUser.token);
    }

    function redirect() {
      $location.path('/');
    }

    this.authenticateFromLocalStorage = function() {
      var deferred = $q.defer();
      if(this.currentUser.authenticated) {
        deferred.resolve();
        return deferred.promise;
      }
      var token = localStorageService.get('token');
      if(token) {
        angular.extend(this.currentUser, {
          token: localStorageService.get('token')
        });
        this.getCurrentUser()
          .then(_.bind(onGetCurrentUserSuccess, this))
          .then(function() {
            deferred.resolve();
          })
          .catch(function() {
            deferred.reject(AuthRejections.UNAUTHENTICATED);
          });

      } else {
        deferred.reject(AuthRejections.UNAUTHENTICATED);
      }
      return deferred.promise;
    };
  }

  UserService.$inject = ['$rootScope', '$location', '$http', '$q',
    'localStorageService', 'AuthRejections'];

  angular
    .module('miniSpotifyApp')
    .service('UserService', UserService);
})();