# sanji-auth-ui
Sanji auth service is part of Sanji UI framework and also it is a angular module. It accounts for authenticate
and authorize a user based on json web token.

## Dependencises
- angularjs
- angular-http-auth
- sanji-rest-ui

## Installation
Sanji auth service is based on es6 + webpack to development and embrace npm to
install it.

```sh
npm install sanji-auth-ui --save
```

## How to use
You need to include module first.
```javascript
angular.module('webapp', ['sanji.auth'])
```
and then use `auth` and `session` as DI service. `auth` service accounts for
identifying user and `session` accounts for keeping login success information.
```javascript
class AppController {
  constructor($http, auth, session) {
    this.credentials = { username: '', passowrd: '' };
    this.login = (credentials) => {
      // Authenticate a user
      this.auth.login('http://private-88b4e0-sanjiauthui.apiary-mock.com/auth/local', credentials)
      .then((data) => {
        // Return token data
        return this.$http.get('http://private-88b4e0-sanjiauthui.apiary-mock.com/users/me');
      })
      .then((res) => {
        // Return authenticated user data
        session.set('user', res.data);
        console.log('user data: ', res.data);
      });
    }
  }
}
AppController.$inject = ['$http', 'auth', 'session'];
```

## Configuration
### authProvider
You can define roles to acheive access control. Default includes *admin*, *user* and *guest*.
```javascript
let app = angular.module('webapp', ['sanji.auth']);
app.config(authProvider => {
  authProvider.configure({
    roles: {
      admin: 'admin',
      guest: 'guest'
    }
  });
});
```
### sessionProvider
You can define token http header. Default is `Authorization`.
```javascript
let app = angular.module('webapp', ['sanji.auth']);
app.config(sessionProvider => {
  sessionProvider.configure({
    tokenHeader: 'define-your-own-token-http-header'
  });
});
```
You also can define token key. Default is `token`. The key name must match your server response data. For example:
[token](http://private-88b4e0-sanjiauthui.apiary-mock.com/auth/local)
```javascript
let app = angular.module('webapp', ['sanji.auth']);
app.config(sessionProvider => {
  sessionProvider.configure({
    tokenKey: 'token'
  });
});
```
By the way, you can save autheticated user data in `session` service,
```javascript
let app = angular.module('webapp', ['sanji.auth']);
app.run(($http, session) => {
  $http.get('/users/me')
  .then(res => {
    session.setUserData(res.data);
  });
});
```
