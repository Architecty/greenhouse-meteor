Template.history.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('history', FlowRouter.getParam('sensor_id'), moment().subtract(1, 'days').valueOf(), moment().valueOf());
  });
});

Template.history.helpers({
  thisSensor: function(){
    return Sensors.findOne({_id: FlowRouter.getParam('sensor_id')})
  },
  celsiusToFarenheit: function(celsius){
    return CentrigradeToFarenheit(celsius) + "&deg; F"
  },
  hourToTime: function(hoursCount){
    return moment().subtract(hoursCount, 'h').format("h a");
  },
  selectedReadings: function(){
    var allReadings = Readings.find({}, {sort:{time:-1}});
    var currentHour = 0;
    var tempReadings = [];
    allReadings.forEach(function(doc, index){
      if(index > 0 && index % 60 == 0){
        currentHour += doc.value;
        var averageTempInC = (currentHour / 60 ) / 1000;
        tempReadings.push({hour: index / 60, temp: averageTempInC});
        currentHour = 0;
      } else {
        currentHour += doc.value;
      }
    })
    return tempReadings;
  }
})
