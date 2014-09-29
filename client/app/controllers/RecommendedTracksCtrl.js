(function() {
  'use strict';

  function RecommendedTracksCtrl($scope, RecommendedTrackService, PlayerService) {
    $scope.RecommendedTrackService = RecommendedTrackService;
    $scope.PlayerService = PlayerService;
  }

  RecommendedTracksCtrl.$inject =  ['$scope', 'RecommendedTrackService', 'PlayerService'];

  angular
    .module('miniSpotifyApp')
    .controller('RecommendedTracksCtrl', RecommendedTracksCtrl);
})();