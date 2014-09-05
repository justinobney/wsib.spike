// Declare app level module which depends on filters, and services
angular.module('wsib.spike')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('layout', {
        abstract: true
        // resolve: {
        //     auth: function(){
        //         return true;
        //     }
        // }
      })
      .state('layout.intake', {
        url: '/',
        views: {
          'header@': {
            template: 'Header'
          },
          'left@': {
            template: '<div class="container-fluid"><div class="row"><div class="col-xs-12"><div ph-txt="20p"></div></div></div></div>'
          },
          'main@': {
            templateUrl: '/partials/home.main.html'
          },
          'right@': {
            template: '<div class="container-fluid"><div class="row"><div class="col-xs-12"><div ph-txt="20p"></div></div></div></div>'
          },
          'footer@': {
            template: 'Footer'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  });
