export const routes = ($locationProvider, $stateProvider, $urlRouterProvider) => {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      component: 'listRegisters'
    })

  $urlRouterProvider.otherwise('/not-found');
};
