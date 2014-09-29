(function() {
  'use strict';

  function RecommendedTrackService($rootScope, $http, PlayerEvents) {
    this.init = function() {
      $rootScope.$on(PlayerEvents.currentTrackUpdated, _.bind(this.onCurrentTrackUpdated, this));
    };

    this.onCurrentTrackUpdated = function(event, eventPayload) {
      this.setRecommendedTracks(eventPayload.track);
    };

    this.setRecommendedTracks = function(track) {
      var artistId = track.artists[0].id;
      this.getRelatedArtists(artistId)
        .then(_.bind(this.onGetRelatedArtistsSuccess, this));
    };

    this.onGetRelatedArtistsSuccess = function(response) {
      var artists = response.data.artists;
      var artistId = artists[0].id;
      this.getArtistTopTracks(artistId)
        .then(_.bind(this.onGetArtistTopTracksSuccess, this));
    };

    this.onGetArtistTopTracksSuccess = function(response) {
      this.tracks = response.data.tracks;
    };

    this.getRelatedArtists = function(artistId) {
      return $http({
        method: 'GET',
        url: 'https://api.spotify.com/v1/artists/'+artistId+'/related-artists'
      });
    };

    this.getArtistTopTracks = function(artistId, countryCode) {
      return $http({
        method: 'GET',
        url: 'https://api.spotify.com/v1/artists/'+artistId+'/top-tracks?country='+(countryCode || 'US')
      });
    };
  }

  RecommendedTrackService.$inject = ['$rootScope', '$http', 'PlayerEvents'];

  angular
    .module('miniSpotifyApp')
    .service('RecommendedTrackService', RecommendedTrackService);
})();