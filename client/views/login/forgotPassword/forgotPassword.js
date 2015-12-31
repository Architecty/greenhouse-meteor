Template.forgotPassword.events({
  "click #resetPassword": function(e){
    e.preventDefault();
    var email = $("#email").val();
    Accounts.forgotPassword({email: email}, function(err){
      if(err){
        bootbox.alert('Email not found! Please try again');
      } else {
        $("#content").html("<h4>Password Sent!</h4><p>Your password has been reset, check your email for instructions on how to sign in</p>");
      }
    });

  }
})
