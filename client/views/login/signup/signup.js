Template.signup.events({

  'submit form': function(event){
    event.preventDefault();
    var email = $("#email").val().toLowerCase(),
        telephone = $("#telephone").val(),
        firstName = $("#firstName").val(),
        lastName = $("#lastName").val(),
        password = $("#password").val(),
        confirmPassword = $("#confirmPassword").val();

    Accounts.createUser({email: email, password: password, profile:{firstName: firstName, lastName: lastName, telephone: telephone}}, function(error){
      if(error){
        bootbox.alert(error);
      }
      else {
        FlowRouter.go('main');
      }
    });
  }

})
