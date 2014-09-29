(function() {
  'use strict';

  function PlayerService(PlayerEvents, $rootScope) {
    this.setCurrentTrack = function(track) {
      this.currentTrack = track;
      $rootScope.$broadcast(PlayerEvents.currentTrackUpdated, {track: this.currentTrack});
    };
  }

  PlayerService.$inject = ['PlayerEvents', '$rootScope'];

  angular
    .module('miniSpotifyApp')
    .service('PlayerService', PlayerService);
})();