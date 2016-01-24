Template.editController.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('controllers');
  });
  this.newSecret = new ReactiveVar('');
  this.advancedOptions = new ReactiveVar(false);
});

Template.editController.helpers({
  controller: function(){
    return Meteor.users.findOne({_id: FlowRouter.getParam('controller_id'), type: "controller", owner_id: Meteor.userId()}, {sort: {name: 1}})
  },
  canDownload: function(){
    var secret = Template.instance().newSecret.get();
    if(secret){
      return secret.length >= 10 ? "btn-warning" : "btn-default disabled";
    } else {
      return "btn-default disabled";
    }
  },
  showAdvanced: function(){
    return Template.instance().advancedOptions.get();
  }
})

Template.editController.events({
  "click .toggledAdvanced": function(){
    Template.instance().advancedOptions.set(!Template.instance().advancedOptions.get());
  },
  "submit form": function(e){
    e.preventDefault();
  },
  "keypress #secret": function(e){
    Template.instance().newSecret.set($("#secret").val());
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
      if(secret){

        bootbox.confirm("Are you sure you want to set a new secret? This will mean you need to update the secret on your Raspberry Pi. If you're not sure how to do this, don't take this action.", function(result){
          if(result){
            Meteor.call('updateController', controller_id, name, desc, secret, function(error, result){
              if(result){
                FlowRouter.go('listControllers');
              }
            });
          }
        })
      } else {
        Meteor.call('updateController', controller_id, name, desc, secret, function(error, result){
          if(result){
            FlowRouter.go('listControllers');
          }
        });
      }
    } else {
      bootbox.alert("Please fill out all of the fields", function(){});
    }
  },
  "click #downloadConfig": function(e){ //Download a config file, ready to be plopped onto the Raspberry Pi. Only works if a new secret is typed in.

    var controller = Meteor.users.findOne({_id: FlowRouter.getParam('controller_id')})
    var ID = controller.username,
        name = $("#name").val(),
        desc = $("#desc").val(),
        secret = $("#secret").val(),
        ddpHost = Meteor.absoluteUrl(),
        ddpPort = 80;

    bootbox.confirm("Are you sure you want to set a new secret? This will mean you need to update the secret on your Raspberry Pi. If you're not sure how to do this, don't take this action.", function(result){
      if(result){
        Meteor.call('updateController', FlowRouter.getParam('controller_id'), name, desc, secret, function(error, result){
          if(result){

            saveConfigFile(ddpHost, ddpPort, ID, secret, "config.js");
          }

        })
      }
    })
  },
  "click #newSecret": function(e, template){
    var controller_id = FlowRouter.getParam('controller_id'),
        name = $("#name").val(),
        desc = $("#desc").val(),
        newSecret = Random.secret();
    Meteor.call('updateController', controller_id, name, desc, newSecret, function(error, result){
      if(error){
        bootbox.alert(error);
      } else {
        $("#secret").val(newSecret);
        template.newSecret.set(newSecret);
      }
    })
  }
})
