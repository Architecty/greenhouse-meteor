Meteor.publish('sensorList', function(org_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return Sensors.find();
  }
})

Meteor.publish('latestReading', function(sensor_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return Readings.find({sensor_id: sensor_id}, {sort: {time: -1}, limit:1});
  }
})

Meteor.publish('singleSensor', function(sensor_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return Sensors.find({_id: sensor_id});
  }
})

Meteor.publish('alarmList', function(sensor_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return [
      Sensors.find({_id: sensor_id}),
      Alarms.find({sensor_id: sensor_id})
    ];
  }
})

Meteor.publish('editAlarm', function(alarm_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return [
      Alarms.find({_id: alarm_id})
    ];
  }
})

Meteor.publish('history', function(sensor_id, timeStart, timeStop){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return [
      Readings.find({sensor_id: sensor_id, $and:[{time: {$gte: timeStart}}, {time:{$lte: timeStop}}]})
    ];
  }
})
