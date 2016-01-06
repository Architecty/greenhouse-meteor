Meteor.startup(function(){

  Meteor.methods({
    addValues: function(valuesArray){ //A method to add values from the Raspberry Pi to the system;
      console.log(valuesArray);
      var currentDate = new Date();
      for(var i = 0; i < valuesArray.length; i++){
        var thisSensor_id = findSensor(valuesArray[i].sensorID, valuesArray[i].currentIP);
        var value = +valuesArray[i].value.match(/-??\d+/)[0];
        Readings.insert({
          sensor_id: thisSensor_id,
          value: value,
          time: currentDate.getTime()
        });
        console.log("Added Reading", value, "from sensor", valuesArray[i].sensorID);
      }
    },
    updateSensor: function(sensor_id, name, desc, type){
      if(!Meteor.user()) return;
      Sensors.update({_id: sensor_id}, {$set: {name: name, type: type, desc: desc}});
      return;
    },
    addAlarm: function(sensor_id, name, alarmType, value, msgTypes){
      if(!Meteor.user()) return;
      console.log("Add Alarm");
      var sendEmail = (msgTypes.indexOf("email") > -1),
          sendSMS = (msgTypes.indexOf("sms") > -1);
      Alarms.insert({sensor_id: sensor_id, owner_id: Meteor.userId(), name: name, alarmType: alarmType, value: +value, enabled:true, active:false, actions:{sendEmail: sendEmail, sendSMS:sendSMS}});
      return;
    },
    editAlarm: function(alarm_id, name, alarmType, value, msgTypes){
      if(!Meteor.user()) return;
      var sendEmail = (msgTypes.indexOf("email") > -1),
          sendSMS = (msgTypes.indexOf("sms") > -1);
      Alarms.update({_id: alarm_id}, {$set: {name: name, alarmType: alarmType, value: +value, enabled:true, active:false, actions:{sendEmail: sendEmail, sendSMS:sendSMS}}});
      return;
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

var testAlarms = function(){

}

var activateAlarm = function(alarm_id){
  Alarms.update({_id: alarm_id}, {$set: {active:true}});
  var thisAlarm = Alarms.findOne({_id: alarm_id});
  if(thisAlarm.actions.sendEmail){
    sendEmailAlert(alarm_id);
  }
  if(thisAlarm.actions.sendSMS){
    sendSMSAlert(alarm_id);
  }
}

var sendSMSAlert = function(alarm_id){

}

var sendEmailAlert = function(alarm_id){

}
