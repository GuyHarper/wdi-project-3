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
        sendMessageConfirmation();
        setTimeout(() => {
          console.log($state.params);
          angular.element( document.querySelector( '#message-modal' ) ).toggleClass('is-active');
        }, 1500);
      });
  }

  vm.messagesCreate = messagesCreate;

  vm.messageSent = false;
  function sendMessageConfirmation() {
    angular.element( document.querySelector( '.message-form' ) ).toggleClass('hidden');
    vm.messageSent = true;
  }
  vm.sendMessageConfirmation = sendMessageConfirmation;
}

MessagesReplyCtrl.$inject = ['User', 'Message', '$state'];
function MessagesReplyCtrl(User, Message, $state) {
  const vm = this;
  vm.message = {};
  vm.from = User.get($state.params);


  function messagesCreate(pet, sender, messagesDisplay) {
    vm.message.pet = pet;
    vm.message.to = sender.id;

    Message
      .save(vm.message)
      .$promise
      .then((message) => {
        messagesDisplay.push(message);
        vm.messagesDisplay = messagesDisplay;
        angular.element( document.querySelector( 'textarea' ) ).val('');
      });

  }

  vm.messagesCreate = messagesCreate;
}
