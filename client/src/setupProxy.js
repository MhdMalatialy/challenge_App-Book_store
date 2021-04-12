const  createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/verify/resend','/api','/auth/google','/current_user','/user/logout',"/user/login",'/user/signup','/verification/*','verify'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};