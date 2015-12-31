Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $("#email").val().toLowerCase(),
        password =$("#password").val();

    if(email && password){
      Meteor.loginWithPassword(email, password, function(error){
        if(error){
          switch(error.reason){
            case "User not found": bootbox.alert("Could not find user with that email"); break;
            case "Incorrect password": bootbox.alert("Password Incorrect. Please try again"); break;
            default: bootbox.alert(error.message);
          }
        } else {
          if(Meteor.user()){
            if(_.has(Meteor.user(), 'profile')){
              var user = Meteor.user();
              heap.identify({
                name: user.profile.firstName || "" + " " + user.profile.lastName || "",
                email: user.emails[0].address
              });
            } else {
              heap.identify({
                email: user.emails[0].address
              });
            }
          }
          if(Router.current().route.getName() == "login"){
            Router.go('generalDashboard');
          }
        }
      })
    } else {
      bootbox.alert("Please enter your username and password");
    }

  }
})
