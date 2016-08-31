const $inject = [];
class SessionProvider {
  constructor(...injects) {
    SessionProvider.$inject.forEach((item, index) => this[item] = injects[index]);
    this.config = {
      tokenHeader: 'Authorization',
      tokenKey: 'token'
    };

    this.configure = cfg => Object.assign(this.config, cfg);
  }

  $get(localStorageService) {
    'ngInject';
    let config = this.config;
    let session = {};

    session[config.tokenKey] = localStorageService.get(config.tokenKey) || null;
    session.user = localStorageService.get('sj-user-profile') || null;

    return {
      get: get,
      set: set,
      getTokenKey: getTokenKey,
      getUserData: getUserData,
      setUserData: setUserData,
      getTokenHeader: getTokenHeader,
      create: create,
      destroy: destroy
    };

    function get(key) {
      return session[key];
    }

    function set(key, data) {
      session[key] = data;
    }

    function getTokenKey() {
      return config.tokenKey;
    }

    function getUserData() {
      return get('user');
    }

    function setUserData(data) {
      localStorageService.set('sj-user-profile', data);
      set('user', data);
    }

    function getTokenHeader() {
      return config.tokenHeader;
    }

    function create(token) {
      localStorageService.set(config.tokenKey, token);
      session[config.tokenKey] = token;
    }

    function destroy() {
      localStorageService.remove(config.tokenKey);
      localStorageService.remove('sj-user-profile');
      session[config.tokenKey] = null;
    }
  }

}

SessionProvider.$inject = $inject;
export default SessionProvider;
