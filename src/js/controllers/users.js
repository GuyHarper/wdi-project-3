angular
  .module('petsApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', 'Message', '$auth', '$state', 'filterFilter'];
function UsersShowCtrl(User, Message, $auth, $state, filterFilter) {
  const vm = this;

  vm.user = User.get($state.params);

  User.get($state.params)
    .$promise
    .then((user) => {
      const uniqueSenderIds = [];
      const uniqueSenders = [];

      user.messages.forEach(message => {
        if(uniqueSenderIds.indexOf( message.from.id ) === -1) {
          uniqueSenderIds.push(message.from.id);
          uniqueSenders.push(message.from);
        }
        vm.uniqueSenders = uniqueSenders;
      });
    });

  function showMessagesFrom(sender) {
    if(vm.sender === sender) {
      vm.sender = null;
      vm.replyActivated = false;
    } else {
      const params = { from: { id: sender.id } };
      const filteredMessages = filterFilter(vm.user.messages, params);
      vm.filteredMessages = filteredMessages;
      vm.sender = sender;
      vm.pet = filteredMessages[filteredMessages.length - 1].pet.id;
    }
  }
  vm.showMessagesFrom = showMessagesFrom;

  vm.replyActivated = false;

  function toggleReplyActivated() {
    vm.replyActivated = !vm.replyActivated;
  }
  vm.toggleReplyActivated = toggleReplyActivated;
}
