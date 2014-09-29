(function() {
  'use strict';

  function PlayListDetailCtrl($scope, PlayListService, PlayerService) {
    $scope.PlayListService = PlayListService;
    $scope.PlayerService = PlayerService;
  }

  PlayListDetailCtrl.$inject = ['$scope', 'PlayListService', 'PlayerService'];

  angular
    .module('miniSpotifyApp')
    .controller('PlayListDetailCtrl', PlayListDetailCtrl);
})();