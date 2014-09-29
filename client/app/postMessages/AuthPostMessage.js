(function() {
  'use strict';

  function AuthPostMessage($window, $timeout, $rootScope) {

    this.init = function() {
      $window.addEventListener('message', receiveMessage, false);
    };

    function receiveMessage(event) {
      if (window.authWindow) {
        window.authWindow.close();
      }
      $timeout(function(){
        $rootScope.$broadcast('tokenReceived', {token: event.data});
      }, 100);
    }

  }
  AuthPostMessage.$inject = ['$window', '$timeout', '$rootScope'];

  angular
    .module('miniSpotifyApp')
    .service('AuthPostMessage', AuthPostMessage);
})();