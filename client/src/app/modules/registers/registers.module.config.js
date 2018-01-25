export const routes = ($locationProvider, $stateProvider) => {
  $stateProvider
    .state('createRegister', {
      url: '/create-register',
      component: 'createRegister'
    })
    .state('listRegisters', {
      url: '/list-registers',
      component: 'listRegisters'
    });;
};
