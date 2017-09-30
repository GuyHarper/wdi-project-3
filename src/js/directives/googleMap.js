angular
  .module('petsApp')
  .directive('googleMap', googleMap);

function googleMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map">I am google map!</div>',
    link(scope, element) {
      console.log(element);
    }
  };
}
