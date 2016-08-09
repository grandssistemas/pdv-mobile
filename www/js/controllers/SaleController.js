angular.module('app.core')
.controller('SaleController',function($scope,
  $http,
  ShoppingCartService,
  $state,
  $cordovaKeyboard,
  ProductInternalBarcodeService,
  $ionicPlatform,
  $cordovaBarcodeScanner,
  $cordovaVibration){

  var barcodeOpen = false;
  $scope.attTotal = attTotal;
  $scope.entity = {
    movements:ShoppingCartService.get()
  }

  $scope.getLevel = function(level){
    changeRoute({level:level})
  };
  $scope.search = function(event,value){
    if(event.keyCode === 13) {
      changeRoute({value:value})
      $cordovaKeyboard.close();
      event.preventDefault();
    }
  };
  $scope.remove = function(index){
    $scope.entity.movements.splice(index,1);
    attTotal();
  };
  $scope.openBarcode = function(){
    if(!barcodeOpen){
      barcodeOpen = true;
      $ionicPlatform.ready(function() {
        $cordovaBarcodeScanner.scan().then(searchByBarcode, function(error) {
              barcodeOpen = false;
            });
      })
    }
  };
  $scope.save = function(entity){
    console.log(entity);
  }

  attTotal();

  function attTotal(){
    $scope.entity.total = $scope.entity.movements.reduce(function(a,b){
      return a+(b.count*b.saleValue);
    },0) || 0;
  }

  function searchByBarcode(response){
    barcodeOpen = false;
    $cordovaVibration.vibrate(500);
    ProductInternalBarcodeService.getByBarcode(response.text).then(function(data){
      var cartItemIndex = findIndex(data.data);
      if(cartItemIndex > -1){
        $scope.entity.movements[cartItemIndex].count += 1;
      }else{
        var value = data.data.item.productInternalBarCodes[0].saleValue,
        cost = data.data.item.productInternalBarCodes[0].costValue,
        item = {item:data.ta,count:1,costValue:cost,soldValue:value,saleValue:value};
        $scope.entity.movements.push(item);
      }
    })
  }

  function findIndex(item){
    return $scope.entity.movements.reduce(function(a,b,index){
      if(b.item.id === item.id){
        return index;
      }
      return a;
    }, -1);
  }

  function changeRoute(params){
    $state.go('searchprod',params)
  }
})
