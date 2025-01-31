angular.module('app.core')
.service('ProductInternalBarcodeService', function(BaseService,route){
  var url = route.concat('/api/productinternalbarcode')
  this.getByBarcode = getByBarcode;

  function getByBarcode(barcode){
    return BaseService.get(url.concat('/getbybarcode?barcode=').concat(barcode));
  }

})
