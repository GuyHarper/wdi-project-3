/* global google:ignore */

angular
  .module('petsApp')
  .controller('PetsIndexCtrl', PetsIndexCtrl)
  .controller('PetsNewCtrl', PetsNewCtrl)
  .controller('PetsShowCtrl', PetsShowCtrl)
  .controller('PetsEditCtrl', PetsEditCtrl);

PetsIndexCtrl.$inject = ['Pet', '$http', '$scope', 'filterFilter', 'distanceFromFilter', '$state'];
function PetsIndexCtrl(Pet, $http, $scope, filterFilter, distanceFromFilter, $state) {
  const vm = this;

  const search = $state.params.lat && $state.params.lng;

  Pet.query()
    .$promise
    .then((pets) => {
      vm.all = pets;

      if(search) {
        // if there is a lat and lng in the query params
        filterPets($state.params.lat, $state.params.lng, $state.params.status);
      } else {
        getUserLocation();
      }


      function filterPost() {
        console.log($state.params.status, status);
        // if(pet.status !== status) return false;
        vm.filtered = filterFilter(vm.all, $state.params.status);
        // if the checkbox is checked, use the custom distance filter and pass in the array of pets and the range value
        if(vm.useDistance) vm.filtered = distanceFromFilter(vm.filtered, vm.distance);
      }

      $scope.$watchGroup([
        () => vm.useDistance,
        () => vm.distance
      ], filterPost);


    });




  // *************************************************************
  //******************* geolocation ******************************
  //**************************************************************

  // if the user has geolocation enabled
  function getUserLocation() {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      // run the getCurrentPosition function, which takes a callback and receives the position object as an argument
      navigator.geolocation.getCurrentPosition(geolocationAllowed, geolocationDenied);
    }
  }

  // user has allowed geolocation
  function geolocationAllowed(position) {
    filterPets(position.coords.latitude, position.coords.longitude);
  }

  // user has disabled geolocation
  // show a text search box for user to enter their location using autocomplete
  function geolocationDenied(err) {
    console.log(err);
    filterPets(51.521296, -0.127012);
  }

  function filterPets(lat, lng) {
    // loop through each pet
    vm.all.forEach((pet) => {
      if(!pet.location) return false;
      // create LatLng objects that Google will accept as the correct format
      const petLatLng = new google.maps.LatLng(pet.location);
      const userLatLng = new google.maps.LatLng(lat, lng);
      // used geometry library to calculate distance in meters, turn it into km to 2 decimal places
      const distance = (google.maps.geometry.spherical.computeDistanceBetween(petLatLng, userLatLng) / 1000).toFixed(2);

      // adding a new key of distance to the pet object and setting it to the calculated distance
      pet.distance = distance;
    });

    if(!$scope.$$phase) $scope.$apply();
  }
}

PetsNewCtrl.$inject = ['Pet', '$state'];
function PetsNewCtrl(Pet, $state) {
  const vm = this;
  vm.pet = {};

  function petsCreate() {
    Pet
      .save(vm.pet)
      .$promise
      .then(() => $state.go('petsIndex'));
  }

  vm.create = petsCreate;
}

PetsShowCtrl.$inject = ['Pet', '$state'];
function PetsShowCtrl(Pet, $state) {
  const vm = this;

  vm.pet = Pet.get($state.params);


  function petsDelete() {
    vm.pet
      .$remove()
      .then(() => $state.go('petsIndex'));
  }

  vm.delete = petsDelete;



}

PetsEditCtrl.$inject = ['Pet', '$state'];
function PetsEditCtrl(Pet, $state) {
  const vm = this;

  vm.pet = Pet.get($state.params);

  function petsUpdate() {
    vm.pet
      .$update()
      .then(() => $state.go('petsShow', $state.params));
  }

  vm.update = petsUpdate;
}
