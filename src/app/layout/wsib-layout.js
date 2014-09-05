angular
  .module('wsib.spike.layout')
  .service('layoutManager', function() {
    var svc = this;

    svc.init = function(){
      svc.calculateLayout();  
      
      angular.element(window).on('resize', _.throttle(svc.calculateLayout, 50));
    }

    svc.calculateLayout = function() {
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
    }
  })
  .directive('wsibPanel', function(){
    return {
      restrict: 'E',
      transclude: true,
      template: '<section class="wsib-panel" ng-class="{\'panel-scrolled\': isScrolledDown}" ng-transclude></section>',
      replace: true,
      controller: function($scope){
        this.setIsScrolled = function(isScrolledDown){
          $scope.isScrolledDown = isScrolledDown;
        }
      },
      link: function(scope, element, attrs){
        var parent = element.parent();
        
        calculateLayout();
        angular.element(window).on('resize', _.throttle(calculateLayout, 50));

        function calculateLayout(){
          element.height(parent.height());
          element.width(parent.width());
        }
      }
    }
  })
  .directive('wsibPanelHeader', function(){
    return {
      restrict: 'E',
      transclude: true,
      template: '<section class="wsib-panel-header" ng-transclude></section>',
      replace: true,
      link: function(scope, element, attrs){
        
      }
    }
  })
  .directive('wsibPanelContent', function(){
    return {
      restrict: 'E',
      transclude: true,
      require: '^wsibPanel',
      template: '<section class="wsib-panel-content" ng-transclude></section>',
      replace: true,
      link: function(scope, element, attrs, ctrl){
        var parent = element.parent();
        var header = parent.find('>.wsib-panel-header');

        calculateLayout();
        angular.element(window).on('resize', _.throttle(calculateLayout, 50));

        function calculateLayout(){
          setTimeout(function(){ element.height(parent.outerHeight() - header.outerHeight()); }, 30)
        }

        element.on('scroll', _.throttle(function(e){
          ctrl.setIsScrolled(element.scrollTop() != 0)
          scope.$evalAsync();
        }, 100));
      }
    }
  })
  .run(function(layoutManager) {
    layoutManager.init();
  });
