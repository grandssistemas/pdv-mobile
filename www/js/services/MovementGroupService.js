angular.module('app.core')
.service('MovementGroupService', function(BaseService,route){
  var url = route.concat('/api/movementgroup');

  this.save = save;

  function save(entity){
    if(entity.id){
      return BaseService.put(url.concat('/').concat(entity.id),entity);
    }
    return BaseService.post(url,entity);
  }
})
