import angular from 'angular';
import 'angular-mocks';

import {sjAuth} from './index' ;

let sessionProvider;
let store;

describe('Provider: sessionProvider', () => {
  beforeEach(angular.mock.module(sjAuth));

  beforeEach(() => {
    angular.mock.module(_sessionProvider_ => {
      sessionProvider = _sessionProvider_;
    });
  });

  beforeEach(() => {
    angular.mock.inject((_store_) => {
      store = _store_;
    });
  });

  it('#configure() should extend config', () => {
    let config = {
      tokenHeader: 'mx-authroization',
      tokenKey: 'token'
    };
    sessionProvider.configure({tokenHeader: 'mx-authroization', tokenKey: 'token'});
    expect(sessionProvider.config).to.eql(config);
  });

  it('#$get(<...injects>) should return session service instance', () => {
    let obj = sessionProvider.$get(store);
    expect(obj.get).to.be.a('function');
    expect(obj.set).to.be.a('function');
    expect(obj.getTokenKey).to.be.a('function');
    expect(obj.getUserData).to.be.a('function');
    expect(obj.getTokenHeader).to.be.a('function');
    expect(obj.create).to.be.a('function');
    expect(obj.destroy).to.be.a('function');
  });

  describe('Service: session', () => {
    it('#get(<key>) should return specific value', function() {
      let obj = sessionProvider.$get(store);
      obj.set('test', 'hello world');
      expect(obj.get('test')).to.equal('hello world');
    });

    it('#set(<key>, <value>) should set specific key and value', function() {
      let obj = sessionProvider.$get(store);
      obj.set('test', 'hello world');
      expect(obj.get('test')).to.equal('hello world');
    });

    it('#getTokenKey() should return default token key name', function() {
      let obj = sessionProvider.$get(store);
      expect(obj.getTokenKey()).to.equal('token');
    });

    it('#getTokenKey() should return settings token key name', function() {
      let obj;
      sessionProvider.configure({tokenKey: 'test'});
      obj = sessionProvider.$get(store);
      expect(obj.getTokenKey()).to.equal('test');
    });

    it('#getTokenHeader() should return default token header', function() {
      let obj = sessionProvider.$get(store);
      expect(obj.getTokenHeader()).to.equal('Authorization');
    });

    it('#getTokenHeader() should return settings token key name', function() {
      let obj;
      sessionProvider.configure({tokenHeader: 'test'});
      obj = sessionProvider.$get(store);
      expect(obj.getTokenHeader()).to.equal('test');
    });

    it('#getUserData() should return user data', function() {
      let obj = sessionProvider.$get(store);
      let data = {role: 'admin', username: 'admin'};
      obj.setUserData(data);
      expect(obj.getUserData()).to.eql(data);
    });

    it('#setUserData(<user data>) should set user data', function() {
      let obj = sessionProvider.$get(store);
      let data = {role: 'admin', username: 'admin'};
      obj.setUserData(data);
      expect(obj.getUserData()).to.eql(data);
    });

    it('#create(<token>) should set token data', function() {
      let obj = sessionProvider.$get(store);
      let token = 'helloworld';
      obj.create(token);
      expect(obj.get('token')).to.equal(token);
    });

    it('#destory() should remove token data', function() {
      let obj = sessionProvider.$get(store);
      let token = 'helloworld';
      obj.create(token);
      expect(obj.get('token')).to.equal(token);
      obj.destroy();
      expect(obj.get('token')).to.be.null;
    });
  });
});
