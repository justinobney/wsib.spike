angular
  .module('wsib.spike.layout')
  .service('layoutManager', function($rootScope, $timeout) {
    var svc = this;

    svc.state = {
      left: {
        closed: false
      },
      main: {
        closed: false
      },
      right: {
        closed: false
      }
    };

    svc.init = function(){
      svc.calculateLayoutSync();
      
      angular.element(window).on('resize', _.throttle(svc.calculateLayout, 50));
    }

    svc.calculateLayoutSync = _calculateLayout;

    svc.calculateLayout = function(){
      $timeout(_calculateLayout, 10);
    }

    function _calculateLayout() {
      var $window = angular.element(window);
      var $header = angular.element('#layout-header')
      var $footer = angular.element('#layout-footer')

      var $content_container = angular.element('#layout-content')

      var $content_left = angular.element('#layout-content-left')
      var $content_main = angular.element('#layout-content-main')
      var $content_right = angular.element('#layout-content-right')

      // set heights

      var content_height = $window.height() - ($header.height() + $footer.height());
      $content_container.height(content_height);
      $content_left.height(content_height);
      $content_main.height(content_height);
      $content_right.height(content_height);

      $content_right.css({
        right: 0
      });

      $content_main.css({
        width: $window.width() - ($content_left.width() + $content_right.width()),
        left: $content_left.width()
      });

      $rootScope.$broadcast('layout::resize');
    }
  })
  .controller('LayoutController', function(layoutManager){
    var vm = this;

    vm.state = layoutManager.state;
  })
  .run(function(layoutManager) {
    layoutManager.init();
  });
