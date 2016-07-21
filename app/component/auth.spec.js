import angular from 'angular';
import 'angular-mocks';

import {sjAuth} from './index' ;

let authProvider;
let $q, $httpBackend, rest, authService, session, auth, authInterceptor;

describe('Provider: authProvider', () => {
  beforeEach(angular.mock.module(sjAuth));

  beforeEach(() => {
    angular.mock.module(_authProvider_ => {
      authProvider = _authProvider_;
    });
  });

  beforeEach(() => {
    angular.mock.inject((_session_, _$q_, _authService_, _rest_, _auth_, _authInterceptor_, _$httpBackend_) => {
      $q = _$q_;
      session = _session_;
      authService = _authService_;
      rest = _rest_;
      auth = _auth_;
      $httpBackend = _$httpBackend_;
      authInterceptor = _authInterceptor_;
    });
  });

  afterEach(() => {
    session.destroy();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('#configure() should extend config', () => {
    let config = {
      roles: {
        admin: 'admin',
        user:  'user'
      },
      test: 'hello world'
    };
    authProvider.configure(config);
    expect(authProvider.config).to.eql(config);
  });

  it('#$get(<...injects>) should return auth service instance', () => {
    let obj = authProvider.$get($q, rest, authService, session);
    expect(obj.get).to.be.a('function');
    expect(obj.login).to.be.a('function');
    expect(obj.isAuthenticated).to.be.a('function');
    expect(obj.isAuthorized).to.be.a('function');
  });

  describe('Interceptor: authInterceptor', () => {
    it('should be defined', () => {
      expect(authInterceptor).to.be.exist;
    });

    it('should have a handler for request', () => {
      expect(authInterceptor.request).to.be.a('function');
    });

    it('should return config without token header', () => {
      let config = authInterceptor.request({});
      expect(config.headers).to.be.empty;
    });

    it('should return config with token header', () => {
      let config;
      session.create('sdfwersdf');
      config = authInterceptor.request({});
      expect(config.headers).to.eql({Authorization: 'Bearer sdfwersdf'});
    });
  });

  describe('Service: auth', () => {
    it('#get(<key>) should return specific value', function() {
      expect(auth.get('roles')).to.eql({
        admin: 'admin',
        user:  'user',
        guest: 'guest'
      });
    });

    it('#login(<uri>, <credentials>) should check user login credentials', function(done) {
      let fakeData = { token: '1234567890zxcvbnm' };
      $httpBackend.expectPOST('/auth/local', {
        username: 'admin',
        password: 'xxdeswersdf'
      }).respond(200, fakeData);
      auth.login('/auth/local', {
        username: 'admin',
        password: 'xxdeswersdf'
      })
      .then(res => {
        expect(res.data).to.eql(fakeData);
        done();
      });
      $httpBackend.flush();
    });

    it('#isAuthorized(<authorizedRoles>) should return boolean', function() {
      expect(auth.isAuthorized()).to.be.false;
      expect(auth.isAuthorized(['hello'])).to.be.false;
      session.setUserData(null);
      expect(auth.isAuthorized(['admin'])).to.be.false;
      session.setUserData({ name: 'admin' });
      expect(auth.isAuthorized(['admin'])).to.be.false;
      session.create('sdfwersdf');
      session.setUserData({ role: 'admin', name: 'admin' });
      expect(auth.isAuthorized(['admin'])).to.be.true;
    });

    it('#isAuthenticated() should return boolean', function() {
      expect(auth.isAuthenticated()).to.be.false;
      session.create('sdfwersdf');
      expect(auth.isAuthenticated()).to.be.true;
    });
  });
});
