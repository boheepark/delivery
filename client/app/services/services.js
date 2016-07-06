angular.module('delivery.services', [])

.factory('Menus', function ($http) {
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/menu'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addMenu = function (cart_item) {
    return $http({
      method: 'POST',
      url: '/api/menu',
      data: cart_item
    });
  };

  var addOrderItem = function (cart_item) {
    return $http({
      method: 'POST',
      url: '/api/menu/addOrderItem',
      data: cart_item
    });
  };

  var checkout = function (order) {
    return $http({
      method: 'POST',
      url: '/api/menu/checkout',
      data: order
    });
  };
  
  return {
    getAll: getAll,
    addMenu: addMenu,
    addOrderItem: addOrderItem,
    checkout: checkout
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.delivery');  //ORG
    //return false;  //DEBUG
  };

  var signout = function () {
    $window.localStorage.removeItem('com.delivery');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
