angular.module('app.core')
  .service('MovementGroupService', function (BaseService, route, $http) {
    var url = route.concat('/api/movementgroup');

    this.save = save;
    this.billing = billing;
    this.print = print;

    function save(entity) {
      correctTypes(entity);
      if (entity.id) {
        return BaseService.put(url.concat('/').concat(entity.id), entity);
      }
      return BaseService.post(url, entity);
    }


    function billing(entity) {
      correctTypes(entity);
      if (entity.id) {
        return BaseService.put(url.concat('/domovement/').concat(entity.id), entity);
      }
      return BaseService.post(url, entity);
    }

    function print(mg) {
      return $http.post(url + '/printpoynt/' + mg.id, {responseType: 'arraybuffer'})
    }

    function correctTypes(entity) {
      entity.type = "br.com.codein.movementgroup.domain.model.stock.MovementGroup"
      entity.movements.forEach(function (movement) {
        if (!movement.type) {
          movement.type = "br.com.codein.movementgroup.domain.model.stock.MovementStock"
        }
      })
    }
  });
