angular
  .module('petsApp')
  .controller('PetsIndexCtrl', PetsIndexCtrl)
  .controller('PetsNewCtrl', PetsNewCtrl)
  .controller('PetsShowCtrl', PetsShowCtrl)
  .controller('PetsEditCtrl', PetsEditCtrl);

PetsIndexCtrl.$inject = ['Pet'];
function PetsIndexCtrl(Pet) {
  const vm = this;

  vm.all = Pet.query();
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
