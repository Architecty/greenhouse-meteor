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
    var ddpHost = Meteor.absoluteUrl(),
        ddpPort = 80,
        ID = $("#ID").val(),
        secret = $("#secret").val();

    saveConfigFile(ddpHost, ddpPort, ID, secret, "config.js");
  }
})

saveConfigFile = function(ddpHost, ddpPort, key, secret, fileName){

  var blob = new Blob([
    "var config = {\n" +
    "  ddpHost: '" + Meteor.absoluteUrl() + "', //This is the location of the Meteor app\n" +
    "  ddpPort: " + ddpPort + ", //This is the port to reach the meteor app.\n" +
    "  key: '" + key + "', //This is the key, which is the username for the controller\n" +
    "  secret:'" + secret + "' //The secret is the passowrd for the controller\n" +
    "};\n\n" +

    "module.exports = config;" ], {type: "text/plain;charset=utf-8"});
  saveAs(blob, fileName);
}
