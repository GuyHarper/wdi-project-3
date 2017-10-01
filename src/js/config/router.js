angular
  .module('petsApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('petshomepage', {
      url: '/homepage',
      templateUrl: 'js/views/pets/homepage.html',
      controller: 'HomepageCtrl as homepageHompage'
    })
    .state('petsIndex', {
      url: '/pets',
      templateUrl: 'js/views/pets/index.html',
      controller: 'PetsIndexCtrl as petsIndex'
    })
    .state('petsNew', {
      url: '/pets/new',
      templateUrl: 'js/views/pets/new.html',
      controller: 'PetsNewCtrl as petsNew'
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
    });

  $urlRouterProvider.otherwise('/hompage');
}
