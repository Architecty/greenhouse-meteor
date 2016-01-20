Template.editController.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('controllers');
  });
});

Template.editController.helpers({
  controller: function(){
    return Meteor.users.findOne({_id: FlowRouter.getParam('controller_id'), type: "controller", owner_id: Meteor.userId()}, {sort: {name: 1}})
  },
  canDownload: function(){
    var secret = $("#secret").val();
    if(secret){
      return secret.length >= 10 ? "btn-warning" : "btn-default disabled";
    } else {
      return "btn-default disabled";
    }
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
  },
  "click #downloadConfig": function(e){ //Download a config file, ready to be plopped onto the Raspberry Pi. Only works if a new secret is typed in.
    Meteor.call('updateController', controller_id, name, desc, secret, function(error, result){
      if(result){
        var controller = Meteor.users.findOne({_id: FlowRouter.getParam('controller_id')})
        var ID = controller.username,
            secret = $("#secret").val();

        var blob = new Blob([
          "var config = {\n" +
          "ddpHost: '" + Meteor.absoluteUrl() + "',\n" +
          "ddpPort: 80,\n" +
          "ddpUsername: '" + ID + "',\n" +
          "ddpPassword:'" + secret + "'\n" +
          "};\n\n" +

          "module.exports = config;" ], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "config.js");
      }
    })
  }
})
