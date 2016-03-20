import 'angular-material.css';
import './app.scss';
import angular from 'angular';
import ngMaterial from 'angular-material';
import component from './component';

class AppController {
  constructor(...injects) {
    AppController.$inject.forEach((item, index) => this[item] = injects[index]);
    this.state = null;
    this.credentials = {
      username: '',
      passowrd: ''
    };
    this.login = (credentials) => {
      this.auth.login('http://private-88b4e0-sanjiauthui.apiary-mock.com/auth/local', credentials)
      .then((data) => {
        console.log('login success, token: ', data);
        return this.$http.get('http://private-88b4e0-sanjiauthui.apiary-mock.com/users/me');
      })
      .then(res => {
        sesion.setUserData(res.data);
      })
      .catch(function(err) {
        console.log('login fail', err);
      });
    }
  }
}
AppController.$inject = ['$http', 'auth', 'session'];
let app = angular.module('webapp', [ngMaterial, component]);
app.config((authProvider, sessionProvider) => {
  sessionProvider.configure({
    tokenHeader: 'token'
  });
  authProvider.configure({
    role: {
      admin: 'admin',
      guest: 'guest'
    }
  });
});
app.controller('AppController', AppController);

