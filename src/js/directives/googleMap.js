/*global google */
angular
  .module('petsApp')
  .directive('googleMap', googleMap);

function googleMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map">I am google map!</div>',
    scope: {
      center: '='
    },
    link($scope, $element){

      const map = new google.maps.Map($element[0], {
        // london as location
        center: { lat: 51.530017, lng: -0.123598 },
        zoom: 14
      });

      const latLng = { lat: location.lat, lng: location.lng };
      const marker = new google.maps.Marker({
        position: latLng,
        map: map
      });

      $scope.$watch('center', () => {
        if(!$scope.center) return false;
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });
    }
  };
}
