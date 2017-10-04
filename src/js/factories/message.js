angular
  .module('petsApp')
  .factory('Message', Message)
  .factory('SentMessage', SentMessage);

Message.$inject = ['$resource'];
function Message($resource) {
  return new $resource('/api/users/:userId/messages', { userId: '@to' });
}

SentMessage.$inject = ['$resource'];
function SentMessage($resource) {
  return new $resource('/api/users/:userId/messages', { userId: '@from' });
}
