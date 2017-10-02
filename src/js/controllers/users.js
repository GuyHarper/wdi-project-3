angular
  .module('petsApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', 'Message', '$auth', '$state'];
function UsersShowCtrl(User, Message, $auth, $state) {
  const vm = this;

  vm.user = User.get($state.params);
}
