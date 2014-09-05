angular
  .module('wsib.spike.layout')
  .directive('wsibPanel', function() {
    return {
      restrict: 'EA',
      transclude: true,
      template: '<div class="wsib-panel" ng-class="{\'panel-scrolled\': isScrolledDown}" ng-transclude></div>',
      replace: true,
      controller: function($scope) {
        this.setIsScrolled = function(isScrolledDown) {
          $scope.isScrolledDown = isScrolledDown;
        }
      },
      link: function(scope, element, attrs) {
        var parent = element.parent();
        var throttledResize = _.throttle(calculateLayout, 50);

        parent.addClass('has-panel');

        calculateLayout();

        angular.element(window).on('resize', throttledResize);
        scope.$on('layout::resize', throttledResize)

        function calculateLayout() {
          element.height(parent.height());
          element.width(parent.width());
        }
      }
    }
  })
  .directive('wsibPanelHeader', function() {
    return {
      restrict: 'EA',
      transclude: true,
      template: '<div class="wsib-panel-header" ng-transclude></div>',
      replace: true,
      link: function(scope, element, attrs) {

      }
    }
  })
  .directive('wsibPanelContent', function() {
    return {
      restrict: 'EA',
      transclude: true,
      require: '^wsibPanel',
      template: '<div class="wsib-panel-content" ng-transclude></div>',
      replace: true,
      link: function(scope, element, attrs, ctrl) {
        var parent = element.parent();
        var header = parent.find('>.wsib-panel-header');
        var throttledResize = _.throttle(calculateLayout, 55);

        calculateLayout();
        
        angular.element(window).on('resize', throttledResize);
        scope.$on('layout::resize', throttledResize)

        function calculateLayout() {
          setTimeout(function() {
            element.height(parent.outerHeight() - header.outerHeight());
          }, 30)
        }

        element.on('scroll', _.throttle(function(e) {
          ctrl.setIsScrolled(element.scrollTop() != 0)
          scope.$evalAsync();
        }, 100));
      }
    }
  })
