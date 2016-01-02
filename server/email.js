Meteor.startup(function () {

  Accounts.emailTemplates.siteName = "Greenhouse";
  Accounts.emailTemplates.from = "Greenhouse Admin <no-reply@greenhouse.clayson.io>";
  Accounts.emailTemplates.resetPassword.subject = function(){return "Greenhouse Password Reset"};
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
    return "To reset your account password, please press the link below:"
    + " \n\n"
    + url;};

  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('resetPassword/' + token);
  };

});
