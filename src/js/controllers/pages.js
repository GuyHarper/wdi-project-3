angular
  .module('petsApp')
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$auth', '$state'];
function HomeCtrl($auth, $state){
  const vm = this;

  function showLostForm() {

    vm.lostFormSelected = true;
    vm.foundFormSelected = false;
  }

  vm.showLostForm = showLostForm;
  vm.credentials = {};

  function submit() {
    $auth.login(vm.credentials)
      .then(() => $state.go('location'));
  }
  function register() {
    $auth.signup(vm.user)
      .then(() => {
        $state.go('login');
      });
  }
  vm.register = register;
  vm.submit = submit;

  function showFoundForm() {
    vm.foundFormSelected = true;
    vm.lostFormSelected = false;
  }

  function authenticate(provider) {
    console.log('in authenticate function');
    $auth.authenticate(provider)
      .then(() => $state.go('petsIndex'));
  }

  vm.authenticate = authenticate;

  vm.showFoundForm = showFoundForm;

}
