import angular from 'angular';
import 'angular-http-auth';
import LocalStorageModule from 'angular-local-storage';
import {sjRest} from 'sanji-rest-ui';

import authEvent from './auth.constant';
import AuthProvider from './auth.provider';
import authConfig from './auth.config';
import authInterceptor from './auth.interceptor';
import SessionProvider from './session.provider';

const sjAuth = angular.module('sanji.auth', [
  sjRest,
  LocalStorageModule,
  'http-auth-interceptor'
])
.constant('AUTH_EVENTS', authEvent)
.config(authConfig)
.provider('session', SessionProvider)
.provider('auth', AuthProvider)
.factory('authInterceptor', authInterceptor)
.name;
export {sjAuth};
