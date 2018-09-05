const $inject = [];
class AuthProvider {
  constructor(...injects) {
    AuthProvider.$inject.forEach((item, index) => (this[item] = injects[index]));
    this.config = {
      roles: {
        admin: 'admin',
        user: 'user',
        guest: 'guest'
      }
    };

    this.configure = cfg => {
      if (cfg.roles) {
        this.config.roles = cfg.roles;
      }
      Object.assign(this.config, cfg);
    };
  }

  $get($q, rest, authService, session) {
    'ngInject';
    let config = this.config;

    return {
      get: get,
      login: login,
      isAuthenticated: isAuthenticated,
      isAuthorized: isAuthorized
    };

    function get(key) {
      return config[key];
    }

    function login(uri, credentials) {
      return rest
        .post(uri, credentials, null, {
          ignoreAuthModule: true
        })
        .then(res => {
          let token = res.data[session.getTokenKey()];
          authService.loginConfirmed('success', () => false);
          session.create(token);
          return res;
        })
        .catch(err => $q.reject(err));
    }

    function isAuthenticated() {
      let tokenKey = session.getTokenKey();
      return !!session.get(tokenKey);
    }

    function isAuthorized(authorizedRoles) {
      if (!Array.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      const user = session.getUserData();

      if (isAuthenticated() && (user && user.role)) {
        return authorizedRoles.includes(user.role);
      }
      return false;
    }
  }
}

AuthProvider.$inject = $inject;
export default AuthProvider;
