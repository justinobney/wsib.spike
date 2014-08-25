angular
  .module('wsib.spike.layout')
  .directive('wsibLayout', function wsibLayout(){
    return {
      restrict: 'A',
      priority: 1000,
      compile: function(iElement, iAttrs){
        var win = $(window);
        iElement.height(win.outerHeight());
        iElement.width(win.outerWidth());
        return Function.prototype;
      }
    }
  })

  .directive('panel', function panel(){
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      priority: 950,
      template: '<div class="layout__panel" ng-transclude></div>',
      link: function(scope, iElement, iAttrs){
        var parent = iElement.parent();
        var parentHeight = parent.outerHeight();
        var parentWidth = parent.width();

        iElement.height(parentHeight);
        iElement.width(parentWidth);

        var header = iElement.find('>.panel__header');
        var content = iElement.find('>.panel__content');
        var footer = iElement.find('>.panel__footer');

        content.height(parentHeight - header.outerHeight() - footer.outerHeight());
        return Function.prototype;
      }
    }
  })

  .directive('header', function header(){
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: '<div class="panel__header" ng-transclude></div>',
      link: function(scope, iElement, iAttrs){
        return Function.prototype;
      }
    }
  })

  .directive('content', function content(){
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      priority: 951,
      template: '<div class="panel__content" ng-transclude></div>',
      link: function(scope, iElement, iAttrs){
        return Function.prototype;
      }
    }
  })

  .directive('footer', function footer(){
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      priority: 951,
      template: '<div class="panel__footer" ng-transclude></div>',
      link: function(scope, iElement, iAttrs){
        return Function.prototype;
      }
    }
  })

  .directive('columns', function columns(){
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      priority: 900,
      template: '<div class="layout__columns"><div class="layout__columnswrap" ng-transclude></div></div>',
      link: function(scope, iElement, iAttrs){
        return Function.prototype;
      }
    }
  })

  .directive('column', function column($timeout){
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      priority: 951,
      template: '<div class="layout__column" ng-transclude></div>',
      link: function(scope, iElement, iAttrs){
        if(iAttrs.width){
          iElement.width(iAttrs.width);
        }

        $timeout(function(){
          var parent = iElement.parent();
          var parentHeight = parent.outerHeight();

          iElement.height(parentHeight);

          var header = iElement.find('>.panel__header');
          var content = iElement.find('>.panel__content');
          var footer = iElement.find('>.panel__footer');

          content.height(parentHeight - header.outerHeight() - footer.outerHeight());
        })
        return Function.prototype;
      }
    }
  })

  .directive('div', function div(){
    return {
      restrict: 'E',
      link: function(scope, iElement, iAttrs){
        iElement.css('background-color', Please.make_color())
        return Function.prototype;
      }
    }
  })