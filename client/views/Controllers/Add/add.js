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
  }
})
