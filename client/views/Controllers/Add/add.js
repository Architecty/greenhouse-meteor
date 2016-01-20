Template.addController.helpers({
  controller: function(){
    return {
      ID: Random.id(),
      secret: Random.secret()
    };
  }
})

Template.addController.events({
  "submit form": function(e){
    e.preventDefault();
  },
  "click #add": function(e){
    var name = $("#name").val(),
        desc = $("#desc").val(),
        ID = $("#ID").val(),
        secret = $("#secret").val();

    if(name && desc && ID && secret){
      Meteor.call('addController', name, desc, ID, secret, function(error, result){
        if(result){
          FlowRouter.go('listControllers');
        }
      });
    } else {
      bootbox.alert("Please fill out all of the fields", function(){});
    }
  },
  "click #downloadConfig": function(e){ //Download a config file, ready to be plopped onto the Raspberry Pi
    var ID = $("#ID").val(),
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
