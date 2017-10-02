angular
  .module('petsApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', 'Message', '$state'];
function UsersShowCtrl(User, Message, $state) {
  const vm = this;
  vm.user = User.get($state.params);



  console.log(vm.user);

}
