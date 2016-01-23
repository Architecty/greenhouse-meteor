Meteor.startup(function(){
  SyncedCron.start();
})

SyncedCron.add({
  name: 'Check for projects that have stopped reporting.',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 10 minutes');
  },
  job: function() {
    testTimedAlarms();
    clearTimedAlarms();
  }
});

var testTimedAlarms = function(){
  var allAlarms = Alarms.find({alarmType: "stop", enabled: true, active:false});
  allAlarms.forEach(function(doc){
    if(!Readings.findOne({sensor_id: doc.sensor_id, time: {$gte: moment().subtract(doc.value, "minutes").valueOf()}})){
      activateAlarm(doc._id);
    }
  })

}

var clearTimedAlarms = function(){
  var allAlarms = Alarms.find({alarmType: "stop", enabled: true, active:false});
  allAlarms.forEach(function(doc){
    if(Readings.findOne({sensor_id: doc.sensor_id, time: {$gte: moment().subtract(doc.value, "minutes").valueOf()}})){
      deactivateAlarm(doc._id);
    }
  })
}
