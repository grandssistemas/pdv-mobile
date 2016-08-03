angular.module('app.core')
.service('StockItemService', function(BaseService,route){
  var url = route.concat('/stockitem');
  var query = {},
    defaultParams = {
        start: 0,
        pageSize: 10
    };

  this.getByName = getByName;
  this.getByProductType = getByProductType;

  function getByName(name){
    console.log(name)
    query.params = defaultParams;
    query.params.q = name;
    query.params.searchFields = 'item.name';
    return BaseService.get(url,query);
  }

  function getByProductType(productTypeId){
    query.params = defaultParams;
    query.params.aq = 'obj.item.product.productType.id = ' + productTypeId;
    return BaseService.get(url,query);
  }

})
