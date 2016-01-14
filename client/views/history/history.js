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
    return CentigradeToFarenheit(celsius) + "&deg; F"
  },
  hourlyAverages: function(){
    return HourlyAverage.find({sensor_id: FlowRouter.getParam('sensor_id')}, {sort: {time: -1}});
  },
  msToHour: function(ms){
    return moment(ms, 'x').format('h a');
  }
})
