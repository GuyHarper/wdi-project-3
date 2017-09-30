angular
  .module('petsApp')
  .controller('PetsIndexCtrl', PetsIndexCtrl)
  .controller('PetsNewCtrl', PetsNewCtrl)
  .controller('PetsShowCtrl', PetsShowCtrl)
  .controller('PetsEditCtrl', PetsEditCtrl);

<<<<<<< HEAD

PetsIndexCtrl.$inject = ['Pet'];
function PetsIndexCtrl(Pet) {
=======
PetsIndexCtrl.$inject = ['Pet', '$http', 'API'];
function PetsIndexCtrl(Pet, $http, API) {
>>>>>>> c4dbecea5cdb0019d79562a85416efc0600cb51f
  const vm = this;

  vm.all = Pet.query();

  // *************************************************************
  //******************* geolocation ******************************
  //**************************************************************

  // if the user has geolocation enabled
  if (navigator.geolocation) {
    // run the getCurrentPosition function, which takes a callback and receives the position object as an argument
    navigator.geolocation.getCurrentPosition((position) => {
      getEvents(position.coords.latitude, position.coords.longitude);
      console.log(position.coords.latitude, position.coords.longitude);
    });
  } else {
    // if geolocation is disabled, call getEvents and pass in London coords
    getEvents(51.02, -0.12);
  }
  function getEvents(lat, lng) {
    $http
      .get(`${API}/events`, { params: { lat, lng }})
      .then((response) => {
        vm.events = response.data.results;
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
