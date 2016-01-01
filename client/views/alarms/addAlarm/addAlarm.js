Template.addAlarm.onCreated(function(){
    var self = this;
    self.autorun(function () {
        self.subscribe('alarmList', FlowRouter.getParam('sensor_id'));
    });
})

Template.addAlarm.helpers({
    thisSensor: function(){
        return Sensors.findOne({_id: FlowRouter.getParam('sensor_id')});
    }
})

Template.addAlarm.events({
    "submit form": function(e){
        e.preventDefault();
        var sensor_id = FlowRouter.getParam('sensor_id'),
            name = $("#name").val(),
            max = $("#maxValue").val(),
            min = $("#minValue").val(),
            SMS = $("#sms").val(),
            email = $("#email").val();

        Meteor.call('addAlarm', sensor_id, name, max, min, function(){
            FlowRouter.go('alarmList', {sensor_id: sensor_id});
        })
    }
})
