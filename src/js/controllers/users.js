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
        console.log(message);
        if(uniqueContactIds.indexOf( message.to.id ) === -1) {
          uniqueContactIds.push(message.to.id);
          uniqueContacts.push(message.to);
        }
        vm.uniqueContacts = uniqueContacts;
      });
    });

  function showMessagesWith(contact) {
    if(vm.contact === contact) {
      vm.contact = null;
      vm.replyActivated = false;
    } else {
      const filteredMessages = filterFilter(vm.user.messages, { from: { id: contact.id } }).concat(filterFilter(vm.user.sentMessages, { to: { id: contact.id } }));
      vm.filteredMessages = filteredMessages;
      vm.contact = contact;
      vm.pet = filteredMessages[filteredMessages.length - 1].pet.id;
    }
  }
  vm.showMessagesWith = showMessagesWith;

  vm.replyActivated = false;

  function toggleReplyActivated() {
    vm.replyActivated = !vm.replyActivated;
  }
  vm.toggleReplyActivated = toggleReplyActivated;

  function toggleModal(modalId) {
    console.log('got here');
    angular.element( document.querySelector( `#modal-${modalId}` ) ).toggleClass('is-active');
  }
  vm.toggleModal = toggleModal;
}

// ******************************** added this ************************************

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
    vm.status = 'lost';
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
