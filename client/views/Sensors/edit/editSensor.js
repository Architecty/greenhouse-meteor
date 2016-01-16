Template.editSensor.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('singleSensor', FlowRouter.getParam('sensor_id'));
  });
});

Template.editSensor.helpers({
  thisSensor: function(){
    return Sensors.findOne({_id: FlowRouter.getParam('sensor_id')});
  }
})


Template.editSensor.events({
    "submit form": function(e){
        e.preventDefault();
        var sensor_id = FlowRouter.getParam('sensor_id'),
            name = $("#sensorName").val(),
            description = $("#sensorDescription").val(),
            type = $("#sensorType").val();

        Meteor.call('updateSensor', sensor_id, name, description, type, function(){
          FlowRouter.go('status');
        })
    }
})
