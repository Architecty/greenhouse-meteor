Template.statusMonitorTemp.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('latestReading', Template.currentData()._id);
  });
});

Template.statusMonitorTemp.helpers({
  latestReading: function(){
    console.log("thisID", this._id);
    return Readings.findOne({sensor_id: this._id}, {sort:{time:-1}});
  },
  timeToString: function(timeMs){
    return moment(timeMs, 'x').format('DD MMM YYYY hh:mm a');
  },
  valueToTemp: function(value){
    var valInC = Math.round(value / 100) / 10; //Convert the reading to a manageable number
    var valInF = Math.round((valInC * (9/5) + 32) * 10) / 10; //Convert the Celsius to Farenheit
    return valInF + "&deg; F";
  }
})

