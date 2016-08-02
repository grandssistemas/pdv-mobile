angular.module('app.core')
.service('CategoryService', function(BaseService){
  var url = 'http://192.168.25.179:8084/fashionmanager-api/api/category';

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
    throw 'data shold be informed';
  }

  function getLevel(level){
      return BaseService.get(url.concat('/tree/level/').concat(level));
  }

  function getFatherLevel(value){
      return BaseService.get(url.concat('/tree/fatherlevel/').concat(value.categoryType).concat('/').concat(value.id));
  }
})
