angular.module('app.core')
.service('PersonService', function(BaseService,route){
  var url = route.concat('/api/person');
  this.getByCpf = getByCpf;

  function getByCpf(cpf){
    var query = {params:{}};
    query.params.aq = 'obj.cpf = \''.concat(cpf).concat('\'')
    return BaseService.get(url,query);
  }
})
