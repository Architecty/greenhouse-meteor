Template.editAlarm.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('editAlarm', FlowRouter.getParam('alarm_id'));
  });
})

Template.editAlarm.helpers({
  thisAlarm: function(){
    return Alarms.findOne({_id: FlowRouter.getParam('alarm_id')});
  }
})
