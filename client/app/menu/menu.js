angular.module('delivery.menu', ['ngMaterial'])

.controller('MenuController', function ($scope, Menus, $window) {

  $scope.data = {};
  $scope.order = {};
  // $scope.cart_items = [];
  $scope.cart = [];
  // $scope.order['cart_items'] = [];
  $scope.order['subtotal'] = 0;
  $scope.order['tax'] = 0;
  $scope.order['total'] = 0;

  $scope.modalShown = false;
  $scope.item = {};

  $scope.getMenus = function () {
    Menus.getAll()
      .then(function (menu) {
        $scope.data.menu = menu;
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  $scope.getMenus();

  var calculateTotal = function(){
    $scope.order.subtotal = 0;
    $scope.cart.forEach(function(item){
      $scope.order.subtotal += item.price * item.qty;
    });
    $scope.order.tax = $scope.order.subtotal * 0.06;
    $scope.order.total = $scope.order.subtotal + $scope.order.tax;
  }


  $scope.addItem = function() {
    console.log($scope.item);
    $scope.cart.push($scope.item);
    calculateTotal();
    $scope.item = {};
    $scope.modalShown = false;
  };

  $scope.removeItem = function(index){
    $scope.cart.splice(index, 1);
    calculateTotal();
  };

  $scope.checkoutBtnCallback = function() {
    $scope.order['items'] = $scope.cart;

    Menus.checkout($scope.order)
    .then(function (menus) {
      console.log(menus);
    })
    .catch(function (error) {
      console.error(error);
    });

  }

  $scope.showModal = function(item){
    $scope.item = item;
    $scope.modalShown = true;
  };

})
.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  })
.directive('modalDialog', function(){
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
})
.directive('dialogElement', function(){
  return {
    scope: {
      sub_item: '=dialogElement'
    },
    restrict: 'E',
    template: '<td>{{ sub_item.name }}</td><td>{{ sub_item.html }}</td>'
  }
});
