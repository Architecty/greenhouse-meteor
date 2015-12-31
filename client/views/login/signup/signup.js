Template.signup.events({

  'submit form': function(event){
    event.preventDefault();
    var email = $("#email").val().toLowerCase(),
        telephone = $("#telephone").val(),
        firstName = $("#firstName").val(),
        lastName = $("#lastName").val(),
        title = $("#title").val(),
        department = $("#department").val(),
        password = $("#password").val(),
        confirmPassword = $("#confirmPassword").val();

    var passwordCheck = false,
        nameCheck = false,
        emailCheck = false;

    //Highlight various fields if they're not correctly filled.
    if(!validateEmail(email)){
      $("#email").closest(".has-feedback").addClass("has-error");
    } else {
      emailCheck = true;
      $("#email").closest(".has-feedback").removeClass("has-error");
    }

    if(!validateName(firstName, lastName)){
      $("#firstName").closest(".has-feedback").addClass("has-error");
    } else {
      nameCheck = true;
      $("#firstName").closest(".has-feedback").removeClass("has-error");
    }

    if(!validatePassword(password)){
      $("#password").closest(".has-feedback").addClass("has-error");
      $("#confirmPassword").closest(".has-feedback").removeClass("has-error");
    } else if(password !== confirmPassword){
      $("#password").closest(".has-feedback").removeClass("has-error");
      $("#confirmPassword").closest(".has-feedback").addClass("has-error");
    }  else {
      $("#password").closest(".has-feedback").removeClass("has-error");
      $("#confirmPassword").closest(".has-feedback").removeClass("has-error");
      passwordCheck = true;
    }

    if(nameCheck && emailCheck && passwordCheck){
      Accounts.createUser({email: email, password: password, profile:{firstName: firstName, lastName: lastName, telephone: telephone, title: title, department: department}}, function(error){
        if(error){
         bootbox.alert(error);
        }
        else {
         Router.go('generalDashboard');
        }
      });
    }
  }

})
