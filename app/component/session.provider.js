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

  $get($cookies) {
    let config = this.config;
    let session = {};

    session[config.tokenKey] = $cookies.get(config.tokenKey) || null;
    session.user = null;

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

    function getUserData(data) {
      return session.get('user');
    }

    function setUserData(data) {
      session.set('user', data);
    }

    function getTokenHeader() {
      return config.tokenHeader;
    }

    function create(token) {
      $cookies.put(config.tokenKey, token);
      session[config.tokenKey] = token;
    }

    function destroy() {
      $cookies.remove(config.tokenKey);
      session[config.tokenKey] = null;
    }
  }

}

SessionProvider.$inject = $inject;
export default SessionProvider;
