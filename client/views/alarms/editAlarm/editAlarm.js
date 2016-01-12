Template.editAlarm.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('editAlarm', FlowRouter.getParam('alarm_id'));
  });
})

Template.editAlarm.helpers({
  thisAlarm: function(){
    var thisAlarm = Alarms.findOne({_id: FlowRouter.getParam('alarm_id')});
    if(thisAlarm){
      var msgType = [];
      if(thisAlarm.actions.sendEmail) msgType.push('email');
      if(thisAlarm.actions.sendSMS) msgType.push('sms');
      Session.set('msgType', msgType);
      Session.set('alarmType', thisAlarm.alarmType);
      thisAlarm.value = CentigradeToFarenheit(thisAlarm.value);
    }
    return thisAlarm;
  },
  whichValueType: function(){
    switch(Session.get('alarmType')){
      case "above": return "&deg; F"; break;
      case "below": return "&deg; F"; break;
      case "stop": return "min"; break;
    }
  },
  whichMsgType: function(whichButton){
    if(!Session.get('msgType')) return "btn-default";
    return (Session.get('msgType').indexOf(whichButton) > -1) ? "btn-success" : "btn-default";
  },
  whichAlarm: function(whichButton){
    return (Session.get('alarmType') == whichButton) ? "btn-success" : "btn-default";
  }
})


Template.editAlarm.events({
  "submit form": function(e){
    e.preventDefault();
  },
  "click #updateAlarm": function(e){
    var thisAlarm = Alarms.findOne({_id: FlowRouter.getParam('alarm_id')}),
        alarm_id = FlowRouter.getParam('alarm_id'),
        name = $("#name").val(),
        alarmType = Session.get('alarmType'),
        value = FarenheitToCentigrade(+$("#value").val()),
        msgTypes = Session.get('msgType'),
    sensor_id = thisAlarm.sensor_id;

    if(alarm_id && name && alarmType && value && msgTypes){

      Meteor.call('editAlarm', alarm_id, name, alarmType, value, msgTypes, function(){
        FlowRouter.go('alarmList', {sensor_id: sensor_id});
      })
    } else {
      console.log( sensor_id, name, alarmType, value, msgTypes);
      bootbox.alert('Make sure to fill out all of the fields');
    }
  },
  "click .alarmType": function(e){
    Session.set('alarmType', $(e.currentTarget).prop('id'));
  },
  "click .msgType": function(e){
    var msgs = Session.get('msgType') || [];
    if(msgs.indexOf($(e.currentTarget).prop('id')) > -1){
      msgs.splice(msgs.indexOf($(e.currentTarget).prop('id')), 1);
    } else {
      msgs.push($(e.currentTarget).prop('id'));
    }
    Session.set('msgType', msgs);
  }
})
