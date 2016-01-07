Template.addAlarm.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('alarmList', FlowRouter.getParam('sensor_id'));
  });
})

Template.addAlarm.helpers({
  thisSensor: function(){
    return Sensors.findOne({_id: FlowRouter.getParam('sensor_id')});
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

Template.addAlarm.events({
  "submit form": function(e){
    e.preventDefault();
  },
  "click #addAlarm": function(e){
    var sensor_id = FlowRouter.getParam('sensor_id'),
        name = $("#name").val(),
        alarmType = Session.get('alarmType'),
        value = FarenheitToCentigrade(+$("#value").val()),
        msgTypes = Session.get('msgType');
    if(sensor_id && name && alarmType && value !== undefined && value !== "" && value !== null && msgTypes){

      Meteor.call('addAlarm', sensor_id, name, alarmType, value, msgTypes, function(){
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
