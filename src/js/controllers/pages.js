angular
  .module('petsApp')
  .controller('HomeCtrl', HomeCtrl)
  .controller('HomeFoundCtrl', HomeFoundCtrl)
  .controller('HomeLostCtrl', HomeLostCtrl);

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
function HomeFoundCtrl(){
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
function HomeLostCtrl(){
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
