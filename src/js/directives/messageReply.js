angular.module('petsApp')
  .directive('messageReply', messageReply);

function messageReply() {
  var directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl =  'js/views/partials/_message-reply.html';
  return directive;
}
