angular
  .module('petsApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', '$state'];
function UsersShowCtrl(User, $state) {
  const vm = this;
  vm.user = User.get($state.params);
  console.log(vm.user);
}
