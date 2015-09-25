export default function($q, session) {
  return {
    // Add authorization token to headers
    request: function(config) {
      config.headers = config.headers || {};
      let token = session.get('token');
      if (token) {
        config.headers[session.getTokenHeader()] = 'Bearer ' + token;
      }
      return config;
    }
  };
}
