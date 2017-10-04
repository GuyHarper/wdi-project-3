angular
  .module('petsApp')
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }
  vm.submit = submit;


}

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    $auth.login(vm.credentials)
      .then(() => $state.go('petsIndex'));
  }

  function authenticate(provider) {
    console.log('in authenticate function');
    $auth.authenticate(provider)
      .then(() => $state.go('petsIndex'));
  }

  vm.authenticate = authenticate;
  vm.submit = submit;
}
