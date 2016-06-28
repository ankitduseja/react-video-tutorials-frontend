var configs = {};
configs.protocol='http:';
configs.hostname='localhost';
if(window && window.location && window.location.hostname) {
  configs.hostname=window.location.hostname;
}
configs.frontendDomain = 'http://'+configs.hostname+':3000';
configs.frontendPort = 3000;
configs.backendDomain = 'http://'+configs.hostname+':3030';
configs.backendPort = 3030;

module.exports = configs;
