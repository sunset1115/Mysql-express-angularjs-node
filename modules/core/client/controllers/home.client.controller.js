'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state', '$http',
  function ($scope, Authentication, $state, $http) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    var auth = Authentication;
    var vm = this;

    vm.mainmenu = [
      {
        caption: 'Post a Job',
        link: 'job.post'
      },
      {
        caption: 'Interview',
        link: 'dashboard'
      },
      {
        caption: 'Evaluate',
        link: 'chat'
      },
      {
        caption: 'Join',
        link: 'authentication.signup'
      }
    ];

    vm.goProperState = function goProperState(link) {

      $state.go(link);
    };

    vm.logout = function logout() {
      if (auth.user) {
        $http.get('/api/auth/signout')
            .success(function(res) {
            });
      }
    };
  }
]);
