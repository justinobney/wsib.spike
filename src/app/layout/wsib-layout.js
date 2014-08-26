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

  .directive('panel', function panel(PanelService){
    return {
      restrict: 'A',
      priority: 950,
      compile: function(iElement, iAttrs){
        PanelService.addPanel(iElement);
        return Function.prototype;
      }
    }
  })

  .service('PanelService', function(){
    var panels = [];
    
    this.addPanel = function(element){
      panels.push(element);
      processPanels();
    };

    var processPanels = _.debounce(function(){
      var panel = panels.shift();
      while(panel){
        var parent = panel.parent();
        var parentHeight = parent.outerHeight();
        var parentWidth = parent.width();

        panel.height(parentHeight);

        var header = panel.find('>.layout__panel--header');
        var content = panel.find('>.layout__panel--content');
        var footer = panel.find('>.layout__panel--footer');

        var maxHeight = parentHeight - header.outerHeight() - footer.outerHeight();
        content.height(maxHeight);
        content.find('>.layout__columns').height(maxHeight);
        
        panel = panels.shift();
      }
    }, 10);
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

  .directive('addContent', function div(){
    return {
      restrict: 'A',
      link: function(scope, iElement, iAttrs){
        var count = 50;
        while(count--){
          iElement.append('<p>this is a tag</p>')
        }
      }
    }
  })