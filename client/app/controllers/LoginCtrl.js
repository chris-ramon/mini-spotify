(function() {
  'use strict';

  function LoginCtrl($scope, $global) {

    $scope.login = function() {
      var width = 400,
        height = 500;
      var left = (screen.width / 2) - (width / 2);
      var top = (screen.height / 2) - (height / 2);

      var params = {
        client_id: 'c46d743a5e054927bf66f3e8d88461d9',
        redirect_uri: ($global.env ? 'http://polar-coast-9145.herokuapp.com/api/login-callback'  : 'http://localhost:9000/api/login-callback'),
        scope: 'user-read-private playlist-read-private',
        response_type: 'token'
      };
      window.authWindow = window.open(
        'https://accounts.spotify.com/authorize?' + toQueryString(params),
        'Spotify',
        'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
      );
    };

    function toQueryString(obj) {
      var parts = [];
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
        }
      }
      return parts.join('&');
    }

  }

  LoginCtrl.$inject = ['$scope', '$global'];

  angular
    .module('miniSpotifyApp')
    .controller('LoginCtrl', LoginCtrl);
})();