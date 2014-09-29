(function() {
  'use strict';

  var PlayerEvents = {
    currentTrackUpdated: 'currentTrackUpdated'
  };

  angular
    .module('miniSpotifyApp')
    .constant('PlayerEvents', PlayerEvents);
})();