(function() {
  'use strict';

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'playlistList.html',
        controller: 'PlayListCtrl',
        resolve: {
          auth: ['UserService', function(UserService) {
            return UserService.authenticateFromLocalStorage();
          }]
        }
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginCtrl'
      });
  }

  config.$inject = ['$routeProvider'];

  angular
    .module('miniSpotifyApp')
    .config(config);
})();