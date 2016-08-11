angular.module('app.core')
.service('CategoryService', function(BaseService,route){
  var url = route.concat('/api/category');

  this.getTree = getTree;
  this.getChildren = getChildren;
  this.getLevel = getLevel;
  this.getFatherLevel = getFatherLevel;

  function getTree(data){
    if(data){
      return BaseService.get(url.concat('/tree/').concat(data));
    }
    return BaseService.get(url.concat('/tree'));
  }

  function getChildren(data){
    if(data){
      return BaseService.get(url.concat('/tree/childrens/').concat(data.categoryType).concat('/').concat(data.id));
    }
    throw 'data should be informed';
  }

  function getLevel(level){
      return BaseService.get(url.concat('/tree/level/').concat(level));
  }

  function getFatherLevel(value){
      return BaseService.get(url.concat('/tree/fatherlevel/').concat(value.categoryType).concat('/').concat(value.id));
  }
})
