(function() {
  'use strict';

  function PlayListService($q, $http, UserService) {
    this.playlists = [];

    this.currentPlaylist = {};

    this.getById = function(playlistId) {
      var deferred = $q.defer();
      var playlist = _.find(this.playlists,
        function(playlist) { return playlist.id === playlistId; });

      function onPlaylistFound(playlist) {
        return playlist;
      }

      if(playlist) { deferred.resolve(onPlaylistFound(playlist)); }
      return deferred.promise;
    };

    this.setCurrentPlaylist = function(playlist) {
      angular.extend(this.currentPlaylist, playlist);
      this.getPlaylist(playlist);
    };

    this.getPlaylists = function() {
      $http({
        method: 'GET',
        url: 'https://api.spotify.com/v1/users/'+UserService.currentUser.id+'/playlists',
        headers: {
          'Authorization': 'Bearer '+UserService.currentUser.token
        }
      }).success(_.bind(function(response) {
          this.playlists = response.items;
        }, this));
    };

    this.getPlaylist = function(playlist) {
      $http({
        method: 'GET',
        url: 'https://api.spotify.com/v1/users/'+UserService.currentUser.id+'/playlists/'+playlist.id,
        headers: {
          'Authorization': 'Bearer '+UserService.currentUser.token
        }
      }).success(_.bind(function(response) {
          angular.extend(this.currentPlaylist, response);
        }, this));
    };
  }

  PlayListService.$inject = ['$q', '$http', 'UserService'];

  angular
    .module('miniSpotifyApp')
    .service('PlayListService', PlayListService);
})();