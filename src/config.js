var url = 'http://localhost:8000';
var config = {
  'url': url,
  'serverUrl': `${url}/api`,
  'api': {
    'apiSignin':"/login",
    'apiGetDevices':"/devices",
    'apiGetSensors':"/sensors",
    'apiDataCollections':"/data-collections",
    'apiSetting':"/settings"
  }
};

// Production
if (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production') {
  url = 'http://10.71.7.111:8080';
  delete config.url;
  delete config.serverUrl;
  config.url = url;
  config.serverUrl = `${url}/api`;
}

export default config;