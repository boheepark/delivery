angular.module('delivery.menu', [])

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
