angular
  .module('petsApp')
  .controller('HomeCtrl', HomeCtrl);
// .controller('LoginCtrl', LoginCtrl)
// .controller('RegisterCtrl', RegisterCtrl);

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
      .then(() => $state.go('petsIndex'));
  }

  vm.submit = submit;

  function showFoundForm() {
    vm.foundFormSelected = true;
    vm.lostFormSelected = false;
  }

  vm.showFoundForm = showFoundForm;

}

// LoginCtrl.$inject = ['$auth', '$state'];
// function LoginCtrl($auth, $state) {
//   const vm = this;
//   vm.credentials = {};
//
//   function submit() {
//     $auth.login(vm.credentials)
//       .then(() => $state.go('petsIndex'));
//   }
//
//   vm.submit = submit;
// }
//
// RegisterCtrl.$inject = ['$auth', '$state'];
// function RegisterCtrl($auth, $state) {
//   const vm = this;
//   vm.user = {};
//
//   function submit() {
//     $auth.signup(vm.user)
//       .then(() => {
//         $state.go('login');
//       });
//   }
//   vm.submit = submit;
//
//
// }
