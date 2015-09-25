const $inject = [];
class AuthProvider {
  constructor(...injects) {
    AuthProvider.$inject.forEach((item, index) => this[item] = injects[index]);
    this.config = {
      roles: {
        admin: 'admin',
        user:  'user',
        guest: 'guest'
      },
      tokenKey: 'token'
    };

    this.configure = cfg => {
      if (cfg.roles) {
        this.config.roles = cfg.roles;
      }
      Object.assign(this.config, cfg);
    };
  }

  $get($q, rest, authService, session) {
    let config = this.config;

    return {
      get:             get,
      login:           login,
      isAuthenticated: isAuthenticated,
      isAuthorized:    isAuthorized
    };

    function get(key) {
      return config[key];
    }

    function login(uri, credentials) {
      return rest.post(uri, credentials)
        .then(res => {
          let token = res.data[config.tokenKey];
          authService.loginConfirmed('success', function(config) {
            config.headers[session.getTokenHeader()] = 'Bearer ' + token;
            return config;
          });
          session.create({ token: token });
          return res;
        })
        .catch(err => $q.reject(err));
    }

    function isAuthenticated() {
      return !!session.get('token');
    }

    function isAuthorized(authorizedRoles) {
      if (!Array.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      if (isAuthenticated()) {
        let user = session.get('user');
        if (user && user.role) {
          return (-1 !== authorizedRoles.indexOf(user.role)) ? true : false;
        }
        return true;
      }
      else {
        return false;
      }
    }
  }

}

AuthProvider.$inject = $inject;
export default AuthProvider;
