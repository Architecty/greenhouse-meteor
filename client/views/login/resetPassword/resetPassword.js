Template.resetPassword.events({
    "click #resetPassword": function(e){
        e.preventDefault();
        var password = $("#password").val();

        Accounts.resetPassword(FlowRouter.getParam('token'), password, function(err){
            if(err){
                bootbox.alert(err);
            } else {
                FlowRouter.go('status');
            }
        })

    }
})
