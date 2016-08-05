angular.module('app.core')
.controller('SaleController',function($scope,$http,ShoppingCartService){
  // $http.get('/js/mock-venda.json').then(function(data){
  //   $scope.entity = data.data;
  // })
  $scope.attTotal = attTotal;

  $scope.entity = {
    movements:ShoppingCartService.get()
  }

  function attTotal(){
    $scope.entity.total = $scope.entity.movements.reduce(function(a,b){
      return a+(b.count*b.saleValue);
    },0) || 0;
  }

  $scope.remove = function(index){
    $scope.entity.movements.splice(index,1);
    attTotal();
  }
})
