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
