FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('cover');
  }
});

FlowRouter.route('/status', {
  action: function(params, queryParams) {
    BlazeLayout.render('status');
  }
});

FlowRouter.route('/login', {
  action: function(params, queryParams) {
    BlazeLayout.render('login');
  }
});


FlowRouter.route('/forgotPassword', {
  action: function(params, queryParams) {
    BlazeLayout.render('forgotPassword');
  }
});

FlowRouter.route('/resetPassword', {
  action: function(params, queryParams) {
    BlazeLayout.render('resetPassword');
  }
});


FlowRouter.route('/editAccount', {
  action: function(params, queryParams) {
    BlazeLayout.render('editAccount');
  }
});
