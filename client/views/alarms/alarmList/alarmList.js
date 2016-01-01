Template.alarmList.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('alarmList', FlowRouter.getParam('sensor_id'));
  });
})

Template.alarmList.helpers({
  thisSensor: function(){
    return Sensors.findOne({_id: FlowRouter.getParam('sensor_id')});
  }
})
