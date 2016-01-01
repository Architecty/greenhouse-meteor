FlowRouter.route('/', {
  action: function(params, queryParams) {
    if(Meteor.user()){
      BlazeLayout.render('status');
    } else {
      BlazeLayout.render('login');
    }
  },
  name: "main"
});

FlowRouter.route('/status', {
  name: "status",
  action: function(params, queryParams) {
    BlazeLayout.render('status');
  }
});

FlowRouter.route('/login', {
  name: "login",
  action: function(params, queryParams) {
    BlazeLayout.render('login');
  }
});

FlowRouter.route('/signup', {
  name: 'signup',
  action: function(params, queryParams) {
    BlazeLayout.render('signup');
  }
});

FlowRouter.route('/forgotPassword', {
  name: "forgotPassword",
  action: function(params, queryParams) {
    BlazeLayout.render('forgotPassword');
  }
});

FlowRouter.route('/resetPassword', {
  name: "resetPassword",
  action: function(params, queryParams) {
    BlazeLayout.render('resetPassword');
  }
});


FlowRouter.route('/editSensor/:sensor_id', {
  name: 'editSensor',
  action: function(params, queryParams) {
    BlazeLayout.render('editSensor');
  }
});

FlowRouter.route('/editAccount', {
  name: "editAccount",
  action: function(params, queryParams) {
    BlazeLayout.render('editAccount');
  }
});

FlowRouter.route('/alarmList/:sensor_id', {
  name: 'alarmList',
  action: function(params, queryParams){
    BlazeLayout.render('alarmList');
  }
})

FlowRouter.route('/addAlarm/:sensor_id', {
  name: 'addAlarm',
  action: function(params, queryParams){
    BlazeLayout.render('addAlarm');
  }
})

FlowRouter.route('/editAlarm/:alarm_id', {
  name: 'editAlarm',
  action: function(params, queryParams){
    BlazeLayout.render('editAlarm');
  }
})
