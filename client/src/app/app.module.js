import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';
import '../css/app.css';

import RegistersModule from './modules/registers/registers.module';

import mainComponent from './components/main/main.component';
import { routes } from './app.module.config';

export default angular
  .module('app', [uiRouter, uiBootstrap, RegistersModule])
  .component('main', mainComponent)
  .config(routes)
  .name;
