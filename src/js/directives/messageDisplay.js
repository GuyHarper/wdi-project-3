angular.module('petsApp')
  .directive('messageDisplay', messageDisplay);

function messageDisplay() {
  var directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl =  'js/views/partials/_message-display.html';
  return directive;
}
