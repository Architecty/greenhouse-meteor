Template.status.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('sensorList');
  });
});

Template.status.helpers({
  allSensors: function(){
    Sensors.find();
  }
})
