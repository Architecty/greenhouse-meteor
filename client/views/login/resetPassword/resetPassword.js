Template.resetPassword.events({
    "click #resetPassword": function(e){
        e.preventDefault();
        var password = $("#password").val();

        Accounts.resetPassword(Router.current().params.token, password, function(err){
            if(err){
                bootbox.alert(err);
            } else {
                Router.go('/');
            }
        })

    }
})
