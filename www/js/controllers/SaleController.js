angular.module('app.core')
.controller('SaleController',function($scope,
  $http,
  ShoppingCartService,
  $state,
  $cordovaKeyboard,
  ProductInternalBarcodeService,
  $ionicPlatform,
  $cordovaBarcodeScanner,
  $cordovaVibration,
  PersonService,
  PaymentTypeService,
  OperationTypeService,
  MovementGroupService,
  $timeout){

  var barcodeOpen = false,
    paymentType,
    operationType,
    responsable;

  PersonService.getByCpf('00000000000').then(function(data){
    responsable = data.data.values[0];
  });

  PaymentTypeService.getByName('Real').then(function(data){
    paymentType = data.data.values[0];
  });

  OperationTypeService.getByName('Venda Simples').then(function(data){
    operationType = data.data.values[0];
  });


  $scope.attTotal = attTotal;
  $scope.entity = {
    movements:ShoppingCartService.get(),
    movementDate: new Date(),
    status: 'OPEN',
    nfeList: [],
    homeDelivery: false,
    accountMovements: []
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
    entity = angular.copy(entity);
    entity.entries = [{value:entity.total,paymentType:paymentType}];
    entity.parcels = [];
    entity.responsable = responsable;
    entity.operationType = operationType;
    entity.count = entity.movements.length;
    entity.subTotal = entity.total *= -1;
    entity.discount = 0;
    entity.movements = entity.movements.map(parseMovement);
    MovementGroupService.save(entity).then(save)
  }

  attTotal();

  function save(response){
    $state.go('menu.billing',{id:response.data.data.id});
  }

  function parseMovement(mov){
    mov.count *= -1;
    mov.value = [];
    mov.movementType = -1;
    return mov;
  }

  function attTotal(){
    $timeout(function(){
      $scope.entity.total = $scope.entity.movements.reduce(function(a,b){
        return a+(b.count*b.saleValue);
      },0) || 0;
    })
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
    $state.go('menu.searchprod',params)
  }
})
