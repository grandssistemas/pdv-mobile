angular.module('app.core')
.service('LoginService', function(BaseService,route,localStorageService){


  this.setToken = setToken;
  this.removeToken = removeToken;
  this.getSavedUser = getSavedUser;

  function setToken(email,password,saveData) {
    var promiseObj = {},
      param = {user: email ,password: password, saveData: saveData};
      return BaseService.post(route.concat('/public/token'),param).then(function (data) {
        if (data.data.token) {
          localStorageService.set('token',data.data.token);
          if (param.saveData) {
            localStorageService.set('email', param.user);
            localStorageService.set('password', param.password);
            localStorageService.set('saveData', param.saveData);
          } else {
            localStorageService.set('email', '');
            localStorageService.set('password', '');
            localStorageService.set('saveData', param.saveData);
          }
        }
        return data.data;
      },function(data){
        console.log(data)
      });
  };

  function getSavedUser(entity) {
    entity.email = localStorageService.get('email');
    entity.password = localStorageService.get('password');
    entity.saveData = localStorageService.get('saveData');
    return entity;
  }

  function removeToken(){
    localStorageService.remove('token');
  }
})
