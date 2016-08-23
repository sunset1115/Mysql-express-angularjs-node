'use strict';

angular.module('dashboard').controller('DashboardController', ['$scope', '$state', 'Authentication',
  function DashboardController($scope, $state, Authentication) {
    var vm = this;

    vm.jobs = [];
    vm.candidates = [];
    vm.sendMessage = sendMessage;

    init();

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // vm.jobs = JobsService.allJobs();
      // vm.candidates = JobsService.allCandidates();
    }

    // Create a controller method for sending messages
    function sendMessage() {
      // Create a new message object
      var message = {
        text: vm.messageText
      };

      // Clear the message text
      vm.messageText = '';
    }
  }
]);
