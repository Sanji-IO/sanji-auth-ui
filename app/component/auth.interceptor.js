export default function($q, session) {
  'ngInject';
  return {
    // Add authorization token to headers
    request: function(config) {
      config.headers = config.headers || {};
      let token = session.get(session.getTokenKey());
      if (token) {
        config.headers[session.getTokenHeader()] = 'Bearer ' + token;
      }
      return config;
    }
  };
}
