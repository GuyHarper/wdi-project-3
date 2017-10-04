angular
  .module('petsApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$transitions', '$rootScope', '$state', '$auth'];
function MainCtrl($transitions, $rootScope, $state, $auth) {
  const vm = this;
  vm.getCurrentUserId = () => $auth.getPayload().userId;


  vm.isAuthenticated = $auth.isAuthenticated;

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;

  $transitions.onSuccess({}, (transition) => {
    vm.menuIsOpen = false;
    vm.pageName = transition.$to().name;

    if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;

    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
  });

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;

    if(err.status === 401) {
      vm.message = err.data.message;
      $state.go('login');
    }

    if(err.status === 422) {
      vm.errors = err.data.errors;
    }
  });

}
