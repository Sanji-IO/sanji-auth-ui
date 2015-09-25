import ngCookies from 'angular-cookies';
import 'angular-http-auth';
import sjRest from 'sanji-rest-ui';

import authEvent from './auth.constant';
import AuthProvider from './auth.provider';
import authConfig from './auth.config';
import authInterceptor from './auth.interceptor';
import SessionProvider from './session.provider';

let app = angular.module('sanji.auth', [ngCookies, sjRest, 'http-auth-interceptor']);
app.constant('AUTH_EVENTS', authEvent);
app.config(authConfig);
app.provider('session', SessionProvider);
app.provider('auth', AuthProvider);
app.factory('authInterceptor', authInterceptor);
export default app = app.name
