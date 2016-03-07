Template.editAccount.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('editAccount');
  });
})

Template.editAccount.helpers({
  emailAddress: function(){
    return Meteor.user().emails[0].address;
  }
});

Template.editAccount.events({
  "submit form": function(e){
    e.preventDefault();
  },
  "click #updateAccount": function(e){
    var firstName = $("#firstName").val(),
        lastName = $("#lastName").val(),
      email = $("#email").val(),
        telephone = $("#telephone").val(),
        IFTTTkey = $("#IFTTTkey").val();

    console.log(firstName, lastName, telephone, IFTTTkey);
    Meteor.call('updateAccount', firstName, lastName, email, telephone, IFTTTkey, function(error, result){
      if(!error){
        FlowRouter.go('status');
      }
    });
  }
});
