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
            template: '<button ng-click="app.toggleLeft()">Toggle Left</button>'
          },
          'left@': {
            template: '<div class="panel panel-info"><div class="panel-heading">Panel heading</div><ul class="list-group"><li ng-repeat="item in [1,2,3,4,5,6,7,8,9,10]" class="list-group-item">Cras justo odio</li></ul></div><div class="panel panel-info"><div class="panel-heading">Panel heading</div><ul class="list-group"><li ng-repeat="item in [1,2,3,4,5,6,7,8,9,10]" class="list-group-item">Cras justo odio</li></ul></div>'
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
