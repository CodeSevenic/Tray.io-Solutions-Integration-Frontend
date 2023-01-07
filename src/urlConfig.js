let url =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://seashell-app-ixpn3.ondigitalocean.app';

exports.baseUrl = url;
