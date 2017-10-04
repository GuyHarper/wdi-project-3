angular
  .module('petsApp')
  .controller('MessagesNewCtrl', MessagesNewCtrl)
  .controller('MessagesReplyCtrl', MessagesReplyCtrl);


MessagesNewCtrl.$inject = ['Pet', 'Message', '$state'];
function MessagesNewCtrl(Pet, Message, $state) {
  const vm = this;
  vm.message = {};
  vm.pet = Pet.get($state.params);

  function messagesCreate() {
    vm.message.pet = vm.pet.id;
    vm.message.to = vm.pet.postedBy.id;

    Message
      .save(vm.message)
      .$promise
      .then(() => {
        $state.go('petsIndex');
      });
  }

  vm.messagesCreate = messagesCreate;
}

MessagesReplyCtrl.$inject = ['User', 'Message', '$state'];
function MessagesReplyCtrl(User, Message, $state) {
  const vm = this;
  vm.message = {};
  vm.from = User.get($state.params);


  function messagesCreate(pet, sender) {
    console.log(pet, sender.id);
    vm.message.pet = pet;
    vm.message.to = sender.id;

    Message
      .save(vm.message)
      .$promise
      .then(() => {
        $state.go('petsIndex');
      });
  }

  vm.messagesCreate = messagesCreate;
}
