(function() {
  'use strict';

  function run($rootScope, $location, UserService, AuthRejections,
               RecommendedTrackService, AuthPostMessage) {

    UserService.init();
    RecommendedTrackService.init();
    AuthPostMessage.init();

    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
      if(rejection === AuthRejections.UNAUTHENTICATED) {
        $location.path('/login');
      }
    });

  }

  run.$inject= ['$rootScope', '$location', 'UserService', 'AuthRejections',
    'RecommendedTrackService', 'AuthPostMessage'];

  angular
    .module('miniSpotifyApp')
    .run(run);
})();