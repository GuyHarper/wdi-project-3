angular
  .module('petsApp')
  .factory('User', User);

User.$inject = ['$resource'];
function User($resource) {
  console.log('got here');
  return new $resource('/api/users/:id', { id: '@id' });
}
