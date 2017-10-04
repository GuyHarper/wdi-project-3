angular.module('petsApp')
  .directive('messageCreate', messageCreate);

function messageCreate() {
  var directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl =  'js/views/partials/_message-create.html';
  return directive;
}
