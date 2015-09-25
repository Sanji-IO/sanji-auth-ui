import 'angular-material.css';
import './app.scss';
import 'angular';
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
      this.auth.login('/auth/local', credentials)
      .then(function(data) {
        console.log('login success', data);
      })
      .catch(function(err) {
        console.log('login fail', err);
      });
    }
  }
}
AppController.$inject = ['auth'];
let app = angular.module('webapp', [ngMaterial, component]);
app.controller('AppController', AppController);

