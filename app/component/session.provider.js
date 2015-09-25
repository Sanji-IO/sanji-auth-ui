const $inject = [];
class SessionProvider {
  constructor(...injects) {
    SessionProvider.$inject.forEach((item, index) => this[item] = injects[index]);
    this.config = {
      tokenHeader: 'Authorization'
    };

    this.configure = cfg => Object.assign(this.config, cfg);
  }

  $get($cookies) {
    let config = this.config;
    let session = { token: null, user: null };
    session.token = $cookies.get('token');

    return {
      get: get,
      set: set,
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

    function getTokenHeader() {
      return config.tokenHeader;
    }

    function create(data) {
      $cookies.put('token', data.token);
      session = {
        token: data.token,
        user: data.user || null
      }
    }

    function destroy() {
      $cookies.remove('token');
      session = {
        token: null,
        user: null
      }
    }
  }

}

SessionProvider.$inject = $inject;
export default SessionProvider;
