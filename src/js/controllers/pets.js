angular
  .module('petsApp')
  .controller('PetsIndexCtrl', PetsIndexCtrl)
  .controller('PetsNewCtrl', PetsNewCtrl)
  .controller('PetsShowCtrl', PetsShowCtrl)
  .controller('PetsEditCtrl', PetsEditCtrl);

PetsIndexCtrl.$inject = ['Pet', '$http', 'API'];
function PetsIndexCtrl(Pet, $http, API) {
  const vm = this;

  vm.all = Pet.query();

  // *************************************************************
  //******************* geolocation ******************************
  //**************************************************************

  // if the user has geolocation enabled
  if (navigator.geolocation) {
    // run the getCurrentPosition function, which takes a callback and receives the position object as an argument
    navigator.geolocation.getCurrentPosition((position) => {
      getPets(position.coords.latitude, position.coords.longitude);
      console.log(position.coords.latitude, position.coords.longitude);
    });
  } else {
    // if geolocation is disabled, call getPets and pass in London coords
    getPets(51.02, -0.12);
  }
  function getPets(lat, lng) {
    $http
      .get(`${API}/pets`, { params: { lat, lng }})
      .then((response) => {
        vm.pets = response.data.results;
      });
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
