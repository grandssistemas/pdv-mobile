angular.module('app.core')
.service('MovementGroupService', function(BaseService,route){
  var url = route.concat('/api/movementgroup');

  this.save = save;
  this.billing = billing;

  function save(entity){
    if(entity.id){
      return BaseService.put(url.concat('/').concat(entity.id),entity);
    }
    return BaseService.post(url,entity);
  }


  function billing(entity){
    if(entity.id){
      return BaseService.put(url.concat('/domovement/').concat(entity.id),entity);
    }
    return BaseService.post(url,entity);
  }
})
