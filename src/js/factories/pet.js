angular
  .module('petsApp')
  .factory('Pet', Pet);

Pet.$inject = ['$resource'];
function Pet($resource) {
  return new $resource('/api/pets/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
