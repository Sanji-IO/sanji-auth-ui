import angular from 'angular';
import 'angular-http-auth';
import LocalStorageModule from 'angular-local-storage';
import sjRest from 'sanji-rest-ui';

import authEvent from './auth.constant';
import AuthProvider from './auth.provider';
import authConfig from './auth.config';
import authInterceptor from './auth.interceptor';
import SessionProvider from './session.provider';

let app = angular.module('sanji.auth', [
  sjRest,
  LocalStorageModule,
  'http-auth-interceptor'
]);
app.constant('AUTH_EVENTS', authEvent);
app.config(authConfig);
app.provider('session', SessionProvider);
app.provider('auth', AuthProvider);
app.factory('authInterceptor', authInterceptor);
export default app = app.name
