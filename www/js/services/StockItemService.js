angular.module('app.core')
.service('StockItemService', function(BaseService,route){
  var url = route.concat('/api/stockitem');
  var query = {};

  this.getByName = getByName;
  this.getByProductType = getByProductType;

  function getByName(name){
    resetParams();
    query.params.q = name;
    query.params.searchFields = 'item.name';
    return BaseService.get(url,query);
  }

  function getByProductType(productTypeId){
    resetParams();
    query.params.aq = 'obj.item.product.productType.id = ' + productTypeId;
    return BaseService.get(url,query);
  }

  function resetParams(){
    query.params = {
        start: 0,
        pageSize: 10
    };
  }
})
