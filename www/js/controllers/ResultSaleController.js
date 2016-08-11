angular.module('app.core')
.controller('ResultSaleController',function($scope,
  entity,
  ShoppingCartService,
  $state){
    console.log(entity)
    $scope.entity = entity;
    $scope.newSale = function(){
      ShoppingCartService.setShoppingCart([]);
      $state.go('menu.searchprod')
    }
  })
