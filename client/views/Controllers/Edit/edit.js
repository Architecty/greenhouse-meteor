Template.editController.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('controllers');
  });
});

Template.editController.helpers({
  controller: function(){
    return Meteor.users.findOne({_id: FlowRouter.getParam('controller_id'), type: "controller", owner_id: Meteor.userId()}, {sort: {name: 1}})
  }
})

Template.editController.events({
  "submit form": function(e){
    e.preventDefault();
  },
  "click #update": function(e){
    var controller_id = FlowRouter.getParam('controller_id'),
        name = $("#name").val(),
        desc = $("#desc").val(),
        secret = $("#secret").val();

    if(name && desc){
      if(secret && secret.length < 10){
        bootbox.alert("Secret must be at least 10 characters", function(){});
        return;
      }
      Meteor.call('updateController', controller_id, name, desc, secret, function(error, result){
        if(result){
          FlowRouter.go('listControllers');
        }
      });
    } else {
      bootbox.alert("Please fill out all of the fields", function(){});
    }
  }
})
