'use strict';

angular.module('miniSpotifyApp', [
  'ngRoute',
  'LocalStorageModule'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });