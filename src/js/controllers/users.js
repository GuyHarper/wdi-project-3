
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
