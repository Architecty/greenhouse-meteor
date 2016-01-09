Template.statusMonitorTemp.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('latestReading', Template.currentData()._id);
  });
});

Template.statusMonitorTemp.helpers({
  latestReading: function(){
    return Readings.findOne({sensor_id: this._id}, {sort:{time:-1}});
  },
  timeToString: function(timeMs){
    return moment(timeMs, 'x').format('DD MMM YYYY hh:mm a');
  },
  valueToTemp: function(value){
    var valInC = Math.round(value / 100) / 10; //Convert the reading to a manageable number
    var valInF = Math.round((valInC * (9/5) + 32) * 10) / 10; //Convert the Celsius to Farenheit
    return valInF + "&deg; F";
  },
  alarmStatus: function(){
    return (Alarms.findOne({sensor_id: this._id, active:true})) ? "btn-danger" : "btn-default";
  },
  alarmPanel: function(){
    return (Alarms.findOne({sensor_id: this._id, active:true})) ? "panel-danger" : "panel-success";
  }
})

