angular
  .module('petsApp')
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl(){
  const vm = this;

  function showLostForm() {
    vm.lostFormSelected = true;
    vm.foundFormSelected = false;
  }

  vm.showLostForm = showLostForm;

  function showFoundForm() {
    vm.foundFormSelected = true;
    vm.lostFormSelected = false;
  }

  vm.showFoundForm = showFoundForm;
}
