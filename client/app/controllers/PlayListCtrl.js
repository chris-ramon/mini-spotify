(function() {
  'use strict';

  function PlayListCtrl($scope, PlayListService) {
    $scope.PlayListService = PlayListService;
    PlayListService.getPlaylists();
  }

  PlayListCtrl.$inject = ['$scope', 'PlayListService'];

  angular
    .module('miniSpotifyApp')
    .controller('PlayListCtrl', PlayListCtrl);
})();