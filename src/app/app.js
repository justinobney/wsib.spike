angular
    .module('wsib.spike', [
        'wsib.spike.templates',
        'wsib.spike.layout',
        'ui.router',
        'placeholders.txt'
    ])
    .controller('AppCtrl', function (layoutManager) {
      var vm = this;

      vm.toggleLeft = function(){
        layoutManager.state.left.closed = ! layoutManager.state.left.closed;
        layoutManager.calculateLayout();
      }
    })
