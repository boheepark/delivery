var Q       = require('q'),
    util    = require('../config/utils.js');
// var Menu    = require('./menuModel.js');
var Order    = require('./orderModel.js');
var MenuItems    = require('./menuItems.js');
// var OrderItem    = require('./orderItemModel.js');
var User = require('../users/userModel.js');

module.exports = {
  findUrl: function (req, res, next, code) {
    var findOrder = Q.nbind(Order.findOne, Order);
    findOrder({code: code})
      .then(function (menu) {
        if (menu) {
          req.navOrder = menu;
          next();
        } else {
          next(new Error('Order not added yet'));
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  allMenus: function (req, res, next) {
    res.json(MenuItems.menu);
  },

  // newMenu: function (req, res, next) {
  //   var url = req.body.url;
  //   console.log('newMenu: req.body.url=' + req.body.url);
  //   console.log('newMenu: JSON.stringify(req.body)=' + JSON.stringify(req.body));
  //
  //   // if (!util.isValidUrl(url)) {
  //   //   return next(new Error('Not a valid url'));
  //   // }
  //
  //   var createMenu = Q.nbind(Menu.create, Menu);
  //   var findMenu = Q.nbind(Menu.findOne, Menu);
  //
  //   findMenu({url: url})
  //     .then(function (match) {
  //       if (match) {
  //         res.send(match);
  //       } else {
  //         return  util.getUrlTitle(url);
  //       }
  //     })
  //     .then(function (title) {
  //       if (title) {
  //         var newMenu = {
  //           url: url,
  //           visits: 0,
  //           base_url: req.headers.origin,
  //           title: title
  //         };
  //         return createMenu(newMenu);
  //       }
  //     })
  //     .then(function (createdMenu) {
  //       if (createdMenu) {
  //         res.json(createdMenu);
  //       }
  //     })
  //     .fail(function (error) {
  //       next(error);
  //     });
  // },

  addOrderItem: function (req, res, next) {
    console.log('addOrderItem: JSON.stringify(req.body)=' + JSON.stringify(req.body));

    var createOrderItem = Q.nbind(Order.create, Order);
    var findOrder = Q.nbind(Order.findOne, Order);

      // var newOrderItem = {
      //   id: req.body,
      //   orderId: req.body,
      //   itemId: req.body.id,
      //   price: req.body.price,
      // };
      // return createOrderItem(newOrderItem);
  },

  checkout: function (req, res, next) {
    console.log('Order: JSON.stringify(req.body)=' + JSON.stringify(req.body));
    var order = req.body;
    order['username'] = 'bohee';

    var createOrder = Q.nbind(Order.create, Order);
    var findOrder = Q.nbind(Order.findOne, Order);
    createOrder(order);
  },

  navToMenu: function (req, res, next) {
    var menu = req.navMenu;
    menu.visits++;
    menu.save(function (err, savedMenu) {
      if (err) {
        next(err);
      } else {
        res.redirect(savedMenu.url);
      }
    });
  }

};
