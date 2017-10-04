angular
  .module('petsApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/statics/home.html'
    })
    .state('petsIndex', {
      url: '/pets?lat&lng',
      templateUrl: 'js/views/pets/index.html',
      controller: 'PetsIndexCtrl as petsIndex'
    })
    .state('petsNew', {
      url: '/pets/new',
      templateUrl: 'js/views/pets/new.html',
      controller: 'PetsNewCtrl as petsNew'
    })
    .state('location', {
      url: '/location',
      templateUrl: 'js/views/users/location.html',
      controller: 'LocationIndexCtrl as locationIndex'
    })
    .state('petsShow', {
      url: '/pets/:id',
      templateUrl: 'js/views/pets/show.html',
      controller: 'PetsShowCtrl as petsShow'
    })
    .state('petsEdit', {
      url: '/pets/:id/edit',
      templateUrl: 'js/views/pets/edit.html',
      controller: 'PetsEditCtrl as petsEdit'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('Home', {
      url: '/home',
      templateUrl: 'js/views/pages/home.html',
      controller: 'HomeCtrl as home'
    });

  $urlRouterProvider.otherwise('/');
}
