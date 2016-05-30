Meteor.publish('sensorList', function(org_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    var controllers = Meteor.users.find({owner_id: this.userId})
    var allController_ids = [];
    controllers.forEach(function(doc){
      allController_ids.push(doc._id);
    })
    return [
      Sensors.find({controller_id: {$in: allController_ids}})
    ];
  }
})

Meteor.publish('latestReading', function(sensor_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return [
      Readings.find({sensor_id: sensor_id}, {sort: {time: -1}, limit:1}),
      Alarms.find({sensor_id: sensor_id, active: true, owner_id: this.userId})
    ];
  }
})

Meteor.publish('singleSensor', function(sensor_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return [
      Sensors.find({_id: sensor_id}),
      Alarms.find({sensor_id: sensor_id, active: true, owner_id: this.userId})
    ];
  }
})

Meteor.publish('alarmList', function(sensor_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return [
      Sensors.find({_id: sensor_id}),
      Alarms.find({sensor_id: sensor_id, enabled:true, owner_id: this.userId})
    ];
  }
})

Meteor.publish('editAlarm', function(alarm_id){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return [
      Alarms.find({_id: alarm_id, owner_id: this.userId})
    ];
  }
})

Meteor.publish('history', function(sensor_id, timeStart, timeStop){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return [
      HourlyAverage.find({sensor_id: sensor_id, $and:[{time: {$gte: timeStart}}, {time:{$lte: timeStop}}]}),
      Sensors.find({_id: sensor_id})
    ];
  }
})

Meteor.publish('controllers', function(){
  var thisUser = Meteor.users.findOne({_id: this.userId});
  if(thisUser){
    return [
      Meteor.users.find({type:"controller", owner_id: this.userId}, {fields: {username: 1, profile:1, type: 1, desc: 1, name: 1, owner_id: 1}})
    ];
  }
})

Meteor.publish('editAccount', function(){
  return Meteor.users.find({_id: this.userId}, {fields: {profile:1, keys: 1, emails:1}});
})
