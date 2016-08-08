angular.module('app.core')
.controller('SaleController',function($scope,$http,ShoppingCartService,$state,$cordovaKeyboard){
  $scope.attTotal = attTotal;
  $scope.entity = {
    movements:ShoppingCartService.get()
  }

  $scope.getLevel = function(level){
    changeRoute({level:level})
  }

  $scope.search = function(event,value){
    if(event.keyCode === 13) {
      changeRoute({value:value})
      $cordovaKeyboard.close();
      event.preventDefault();
    }
  };

  attTotal();

  function attTotal(){
    $scope.entity.total = $scope.entity.movements.reduce(function(a,b){
      return a+(b.count*b.saleValue);
    },0) || 0;
  }

  $scope.remove = function(index){
    $scope.entity.movements.splice(index,1);
    attTotal();
  }



  function changeRoute(params){
    $state.go('searchprod',params)
  }
})
