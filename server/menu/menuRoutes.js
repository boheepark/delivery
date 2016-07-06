var menuController = require('./menuController.js');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js

  // app.param will hijack any request with a 'code' parameter on in
  // like line 16 below. That code will actually be the shortned url
  // so the real URL will be pre fetched from mongo and attached to
  // req.navLink before it reaches line 16.
  app.param('code', menuController.findUrl);

  // app.route('/')
  //   .get(menuController.allMenus)
  //   .post(menuController.newMenu);
  app.route('/')
    .get(menuController.allMenus);

  app.route('/addOrderItem')
    .post(menuController.addOrderItem);

  app.route('/checkout')
    .post(menuController.checkout);
    
  app.get('/:code', menuController.navToMenu);

};
