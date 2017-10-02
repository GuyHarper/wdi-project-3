angular
  .module('petsApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', 'Message', '$state'];
function UsersShowCtrl(User, Message, $state) {
  const vm = this;
  vm.user = User.get($state.params);

  vm.message = {};

  function messageCreate() {
    Message
      .save(vm.message)
      .$promise
      .then(() => $state.go('usersShow'));
  }

  vm.messageCreate = messageCreate;


}
