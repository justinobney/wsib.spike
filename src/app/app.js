angular
    .module('wsib.spike', [
        'wsib.spike.templates',
        'wsib.spike.layout',
        'ui.router',
        'placeholders.txt'
    ])
    .controller('AppCtrl', function (layoutManager) {
      var vm = this;

      vm.toggleSidebar = function(side){
        layoutManager.toggle(side);
      }
    })
