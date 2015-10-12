# sanji-auth-ui
> Sanji auth service is part of Sanji UI framework and also it is a angular module. It accounts for authenticate and authorize a user based on json web token.

[sanji-auth-ui-icon]: https://nodei.co/npm/sanji-auth-ui.png?downloads=true
[sanji-auth-ui-url]: https://npmjs.org/package/sanji-auth-ui
[quality-badge]: http://npm.packagequality.com/badge/sanji-auth-ui.png
[quality-url]: http://packagequality.com/#?package=sanji-auth-ui
[travis-build-badge]: https://travis-ci.org/Sanji-IO/sanji-auth-ui.svg?branch=master
[travis-build-url]: https://travis-ci.org/Sanji-IO/sanji-auth-ui
[sanji-auth-ui-coverage-image]: http://codecov.io/github/Sanji-IO/sanji-auth-ui/coverage.svg?branch=master
[sanji-auth-ui-coverage-url]: http://codecov.io/github/Sanji-IO/sanji-auth-ui?branch=master
[sanji-auth-ui-codacy-image]: https://api.codacy.com/project/badge/13d7e2e9bf1b40a3bd9a3113c7cea587
[sanji-auth-ui-codacy-url]: https://www.codacy.com/public/zack9433/sanji-auth-ui.git
[dependencies-image]: https://david-dm.org/Sanji-IO/sanji-auth-ui.png
[dependencies-url]: https://david-dm.org/Sanji-IO/sanji-auth-ui
[devdependencies-image]: https://david-dm.org/Sanji-IO/sanji-auth-ui/dev-status.png
[devdependencies-url]: https://david-dm.org/Sanji-IO/sanji-auth-ui#info=devDependencies
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

[![NPM][sanji-auth-ui-icon]][sanji-auth-ui-url]
[![Package Quality][quality-badge]][quality-url]
[![Build Status][travis-build-badge]][travis-build-url]
[![Coverage Status][sanji-auth-ui-coverage-image]][sanji-auth-ui-coverage-url]
[![Codacy Badge][sanji-auth-ui-codacy-image]][sanji-auth-ui-codacy-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devdependencies][devdependencies-image]][devdependencies-url]
[![semantic-release][semantic-release-image]][semantic-release-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]

## Dependencies
- [angularjs](https://github.com/angular/angular.js)
- [angular-http-auth](https://github.com/witoldsz/angular-http-auth)
- [sanji-rest-ui](https://github.com/Sanji-IO/sanji-rest-ui)

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
      this.auth.login('/auth/local', credentials)
      .then((data) => {
        // Return token data
        return this.$http.get('/users/me');
      })
      .then((res) => {
        // Return authenticated user data and save in session service
        session.setUserData(res.data);
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

## Contact

Author: Zack Yang &copy; 2015

* [@zack9433](https://twitter.com/zack9433)

Support: if you find any problems with this library,
[open issue](https://github.com/Sanji-IO/sanji-auth-ui/issues) on Github

