angular
  .module('petsApp')
  .factory('Message', Message);

Message.$inject = ['$resource'];
function Message($resource) {
  return new $resource('/api/users/:userId/messages', { userId: '@to' });
}
