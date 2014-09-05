angular
  .module('wsib.spike.layout')
  .service('layoutManager', function($rootScope, $timeout) {
    var svc = this;

    svc.state = {
      left1: {
        closed: false
      },
      left2: {
        closed: false
      },
      main: {
        closed: false
      }
    };
    
    svc.calculateLayoutSync = _calculateLayout;

    svc.init = function(){
      svc.calculateLayoutSync();
      
      angular.element(window).on('resize', _.throttle(svc.calculateLayout, 50));
    }

    svc.calculateLayout = function(){
      $timeout(_calculateLayout, 10);
    }

    svc.toggle = function(section){
      svc.state[section].closed = ! svc.state[section].closed;
      svc.calculateLayout();
    }

    function _calculateLayout() {
      var $window = angular.element(window);
      var $header = angular.element('#layout-header')
      var $footer = angular.element('#layout-footer')

      var $content_container = angular.element('#layout-content')

      var $content_left1 = angular.element('#layout-content-left1')
      var $content_left2 = angular.element('#layout-content-left2')
      var $content_main = angular.element('#layout-content-main')

      // set heights

      var content_height = $window.height() - ($header.height() + $footer.height());
      $content_container.height(content_height);
      $content_left1.height(content_height);
      $content_main.height(content_height);
      $content_left2.height(content_height);

      $content_left2.css({
        left: $content_left1.width()
      });

      $content_main.css({
        width: $window.width() - ($content_left1.width() + $content_left2.width()),
        left: $content_left1.width() + $content_left2.width()
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
