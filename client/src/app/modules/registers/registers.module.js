import angular from 'angular';

import createRegisterComponent from './components/create-register/create-register.component';
import listRegistersComponent from './components/list-registers/list-registers.component';
import editAuthorizedUserComponent from './components/edit-authorized-user/edit-authorized-user.component';
import { routes } from './registers.module.config';

export default angular
  .module('RegistersModule', [])
  .component('createRegister', createRegisterComponent)
  .component('listRegisters', listRegistersComponent)
  .component('editAuthorizedUser', editAuthorizedUserComponent)
  .config(routes)
  .name;
