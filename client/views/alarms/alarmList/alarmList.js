Template.alarmList.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('alarmList', FlowRouter.getParam('sensor_id'));
  });
})

Template.alarmList.helpers({
  thisSensor: function(){
    return Sensors.findOne({_id: FlowRouter.getParam('sensor_id')});
  },
  allAlarms: function(){
    return Alarms.find({sensor_id: FlowRouter.getParam('sensor_id')});
  },
  alarmStatus: function(){
    if(this.enabled == false){
      return "disabled"
    }
    if(this.active == true){
      return "btn-danger";
    }
    return "btn-info";
  }
})
