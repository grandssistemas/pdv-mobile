angular.module('app.core')
.service('OperationTypeService', function(BaseService,route){
  var url = route.concat('/api/operationtype')
  this.getByName = getByName;

  function getByName(name){
    var query = {params:{}};
    query.params.searchFields = 'name';
    query.params.q = name;
    return BaseService.get(url,query);
  }
})
