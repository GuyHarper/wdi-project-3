angular
  .module('petsApp')
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('LocationIndexCtrl', LocationIndexCtrl);

UsersShowCtrl.$inject = ['User', 'Message', '$auth', '$state', 'filterFilter'];
function UsersShowCtrl(User, Message, $auth, $state, filterFilter) {
  const vm = this;
  if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;
  if(vm.currentUserId !== $state.params.id) $state.go('login');

  vm.user = User.get($state.params);
  vm.additionalMessages = [];


  User.get($state.params)
    .$promise
    .then((user) => {

      const uniqueContactIds = [];
      const uniqueContacts = [];
      user.messages.forEach(message => {
        if(uniqueContactIds.indexOf( message.from.id ) === -1) {
          uniqueContactIds.push(message.from.id);
          uniqueContacts.push(message.from);
        }
      });
      user.sentMessages.forEach(message => {
        if(uniqueContactIds.indexOf( message.to.id ) === -1) {
          uniqueContactIds.push(message.to.id);
          uniqueContacts.push(message.to);
        }
      });
      vm.uniqueContacts = uniqueContacts;

    });

  function showMessagesWith(contact) {
    const filteredMessages = filterFilter(vm.user.messages, { from: { id: contact.id } }).concat(filterFilter(vm.user.sentMessages, { to: { id: contact.id } }));
    vm.filteredMessages = filteredMessages.concat(vm.additionalMessages);
    vm.contact = contact;
    vm.pet = filteredMessages[filteredMessages.length - 1].pet.id;
    angular.element( document.querySelector( 'body' ) ).toggleClass('modal-open');
    angular.element( document.querySelector( '#message-modal' ) ).toggleClass('is-active');
  }
  vm.showMessagesWith = showMessagesWith;

  vm.replyActivated = false;

  function toggleReplyActivated() {
    vm.replyActivated = !vm.replyActivated;
  }
  vm.toggleReplyActivated = toggleReplyActivated;

  function toggleMessageModal() {
    if(vm.additionalMessages.length > 0) $state.go('usersShow');
    angular.element( document.querySelector( '#message-modal' ) ).toggleClass('is-active');
    angular.element( document.querySelector( 'body' ) ).toggleClass('modal-open');
  }
  vm.toggleMessageModal = toggleMessageModal;

  function toggleModal(modalId) {
    angular.element( document.querySelector( `#modal-${modalId}` ) ).toggleClass('is-active');
  }
  vm.toggleModal = toggleModal;


  function messagesReply() {
    vm.message.pet = vm.pet;
    vm.message.to = vm.contact.id;

    Message
      .save(vm.message)
      .$promise
      .then((message) => {
        message.to = vm.contact;
        vm.filteredMessages.push(message);
        vm.additionalMessages.push(message);
        angular.element( document.querySelector( 'textarea' ) ).val('');
      });

  }

  vm.messagesReply = messagesReply;
}

// ******************************** filtering by location and status ************************************

LocationIndexCtrl.$inject = ['User', '$scope', '$state'];
function LocationIndexCtrl(User, $scope, $state) {
  const vm = this;
  getUserLocation();
  // assigned using geolocation
  vm.userLatLng = null;
  // assinged using autocomplete
  vm.latLng = null;

  function search(latLng) {
    // latLng will be different depending on if you click "use my location" or "save"
    $state.go('petsIndex', ( { lat: latLng.lat, lng: latLng.lng, status: vm.status } ));
  }

  vm.search = search;

  // if the user has geolocation enabled
  function getUserLocation() {
    if (navigator.geolocation) {
      // run the getCurrentPosition function, which takes a callback and receives the position object as an argument
      navigator.geolocation.getCurrentPosition(geolocationAllowed, geolocationDenied);
    }
  }

  // user has allowed geolocation
  function geolocationAllowed(position) {
    vm.userLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
    $scope.$apply();
  }

  // user has disabled geolocation
  // show a text search box for user to enter their location using autocomplete
  function geolocationDenied(err) {
    console.log(err);
  }

}

// **************************************************************
