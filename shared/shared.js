FarenheitToCentigrade = function(farenheit){
   return Math.round(((farenheit -32) * (5/9)) * 10)/10;
}

CentrigradeToFarenheit = function(centigrade){
   return Math.round(((centigrade * (9/5)) + 32) * 10)/10;
}
