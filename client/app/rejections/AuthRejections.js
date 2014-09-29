(function() {
  'use strict';

  var AuthRejections = {
    UNAUTHENTICATED: 'unauthenticated'
  };

  angular
    .module('miniSpotifyApp')
    .constant('AuthRejections', AuthRejections);
})();