Template.editAccount.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('editAccount');
  });
})

Template.editAccount.helpers({

});

Template.editAccount.events({
  "submit form": function(e){
    e.preventDefault();
  },
  "click #updateAccount": function(e){
    var firstName = $("#firstName").val(),
        lastName = $("#lastName").val(),
        telephone = $("#telephone").val(),
        IFTTTkey = $("#IFTTTkey").val();

    console.log(firstName, lastName, telephone, IFTTTkey);
    Meteor.call('updateAccount', firstName, lastName, telephone, IFTTTkey, function(error, result){
      if(!error){
        FlowRouter.go('status');
      }
    });
  }
});
