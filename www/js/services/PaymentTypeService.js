angular.module('app.core')
.service('PaymentTypeService', function(BaseService,route){
  var url = route.concat('/api/paymenttype')
  this.getByName = getByName;
  this.getByNames = getByNames;

  function getByName(name){
    var query = {params:{}};
    query.params.searchFields = 'name';
    query.params.q = name;
    return BaseService.get(url,query);
  }

  function getByNames(names){
    var query = {params:{}};
    query.params.aq = names.map(function(name){
      return 'obj.name like \''.concat(name).concat('\'')
    }).join(' or ');
    return BaseService.get(url,query);
  }
})
