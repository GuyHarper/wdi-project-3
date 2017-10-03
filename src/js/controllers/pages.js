angular
  .module('petsApp')
  .controller('HomeCtrl', HomeCtrl);
// .controller('LoginCtrl', LoginCtrl);


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

  LoginCtrl.$inject = ['$auth', '$state'];
  function LoginCtrl($auth, $state) {
    const vm = this;
    vm.credentials = {};

    function submit() {
      $auth.login(vm.credentials)
        .then(() => $state.go('petsIndex'));
    }

    vm.submit = submit;
  }

}
