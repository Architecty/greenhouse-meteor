Meteor.startup(function(){

  Meteor.methods({
    addValues: function(valuesArray){ //A method to add values from the Raspberry Pi to the system;
      console.log(valuesArray);
      var currentDate = new Date();
      for(var i = 0; i < valuesArray.length; i++){
        var thisSensor_id = findSensor(valuesArray[i].sensorID, valuesArray[i].currentIP);
        var value = +valuesArray[i].value.match(/\d*/)[0];
        Readings.insert({
          sensor_id: thisSensor_id,
          value: value,
          time: currentDate.getTime()
        });
        console.log("Added Reading", value, "from sensor", valuesArray[i].sensorID);
      }
    }
  })
})


var findSensor = function(sensorID, currentIP){
  var thisSensor =  Sensors.findOne({sensorID: sensorID});
  if (thisSensor) {
    Sensors.update({_id: thisSensor._id}, {$set: {currentIP:currentIP}});
    return thisSensor._id;
  } else {
    return Sensors.insert({
      sensorID: sensorID,
      name: "",
      type: "",
      metric: "",
      currentIP: currentIP,
      desc: ""
    });
  }
}
