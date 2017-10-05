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

LoginCtrl.$inject = ['$auth', '$state','$rootScope'];
function LoginCtrl($auth, $state, $rootScope) {
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
  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;

    if(err.status === 401) {
      vm.message = err.data.message;
      $state.go('login');
    }

    if(err.status === 422) {
      vm.errors = err.data.errors;
      console.log(vm.errors);
    }
  });

  vm.authenticate = authenticate;
  vm.submit = submit;
}
