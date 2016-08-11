angular.module('app.core')
.controller('SearchProdController',function($scope,
  ShoppingCartService,
  $ionicPopover,
  CategoryService,
  StockItemService,
  $cordovaKeyboard,
  $stateParams,
  $ionicPlatform,
  $cordovaBarcodeScanner,
  ProductInternalBarcodeService,
  $state,
  $cordovaVibration,
  $cordovaToast){
    console.log('aki')

  var barcodeOpen = false;
  $scope.place = null;
  $scope.showTree = true;

  $scope.getChildren = getChildren;
  $scope.addCart = function(item){
    var cost = item.item.productInternalBarCodes[0].costValue;
    var value = item.item.productInternalBarCodes[0].saleValue;
    $cordovaToast.showShortTop('Adicionado na lista');
    ShoppingCartService.addItem({item:item,count:1,costValue:cost,saleValue:value,soldValue:value});
  };
  $scope.getFather = function(value){
    resetSearch();
    $scope.place = null;
    if(value.categoryType === 'DEPARTMENT'){
      getBase();
    }else{
      CategoryService.getFatherLevel(value).then(function(data){
        $scope.values = [data.data.data];
      })
    }
  };
  $scope.getLevel = function(level){
    resetSearch();
    $scope.place = level;
    CategoryService.getLevel(level).then(function(response){
      $scope.values = response.data.data;
    });
  };
  $scope.search = function(event,value){
    $scope.place = null;
    if(event.keyCode === 13) {
      $scope.showTree = false;
      StockItemService.getByName(value).then(setStockItens);
      $cordovaKeyboard.close();
      event.preventDefault();
    }
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
  }

  $scope.changeState = function(){
    $state.go('menu.sale');
  }

  function setStockItens(response){
    $scope.products = response.data.values.reduce(function(a,b,index){
      if(index%2 == 0){
        a.push([b]);
      }else{
        a[a.length-1].push(b);
      }
      return a;
    },[]);
  }

  function resetSearch(){
    $scope.showTree = true;
    $scope.products = null;
    $scope.searchValue = null;
  }

  function getBase(){
    $scope.products = null;
    resetSearch();

    CategoryService.getTree().then(function(response){
      $scope.values = [{
        name: 'Departamentos',
        childrens: response.data.data}];
    })
  }

  function getChildren(item){
    $scope.place = null;
    $scope.showTree = true;
    if(item.categoryType !== 'PRODUCTTYPE'){
      CategoryService.getChildren(item).then(function(response){
        item.childrens = response.data.data;
        $scope.values = [item];
      });
    }else{
      $scope.values = [item];
      StockItemService.getByProductType(item.id).then(setStockItens);
    }
  }

  function searchByBarcode(response){
    barcodeOpen = false;
    $cordovaVibration.vibrate(100);
    ProductInternalBarcodeService.getByBarcode(response.text).then(function(data){
      $scope.addCart(data.data);
    })
  }


  if($stateParams.value){
    $scope.search({keyCode:13,preventDefault:function(){}},$stateParams.value);
  }else if($stateParams.level){
    $scope.getLevel($stateParams.level);
  }else{
    getBase();
  }
})
