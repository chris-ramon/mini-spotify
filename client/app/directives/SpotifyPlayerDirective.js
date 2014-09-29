(function() {
  'use strict';

  function spotifyPlayer($sce, $rootScope, PlayerEvents, $compile) {
    var iframeTemplate = '<iframe ng-src="{{trackIframeSrc}}" frameborder="0" allowtransparency="true"></iframe>';
    return {
      restrict: 'A',
      scope: {track: '='},
      compile: function(tElement, tAttrs, transclude) {
        tElement.html('');
        return function postLink(scope, iElement, iAttrs, controller) {
          $rootScope.$on(PlayerEvents.currentTrackUpdated, onCurrentTrackUpdated);

          function onCurrentTrackUpdated(event, eventPayload) {
            scope.trackIframeSrc = $sce.trustAsResourceUrl(
              'https://embed.spotify.com/?uri='+eventPayload.track.uri);
            iElement.html($compile(iframeTemplate)(scope));
          }
        };
      }
    };
  }

  spotifyPlayer.$inject = ['$sce', '$rootScope', 'PlayerEvents', '$compile'];

  angular
    .module('miniSpotifyApp')
    .directive('spotifyPlayer', spotifyPlayer);
})();