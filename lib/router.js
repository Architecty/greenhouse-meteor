External = FlowRouter.group({
  name: 'external'
})

Authenticated = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [
    function(context){
      if(Meteor.loggingIn() || Meteor.userId()){
        route = FlowRouter.current()
      } else {
        FlowRouter.go('login');
      }
    }
  ]
})

External.route('/login', {
  name: "login",
  action: function(params, queryParams) {
    BlazeLayout.render('login');
  }
});

External.route('/signup', {
  name: 'signup',
  action: function(params, queryParams) {
    BlazeLayout.render('signup');
  }
});

External.route('/forgotPassword', {
  name: "forgotPassword",
  action: function(params, queryParams) {
    BlazeLayout.render('forgotPassword');
  }
});

External.route('/resetPassword/:token', {
  name: "resetPassword",
  action: function(params, queryParams) {
    BlazeLayout.render('resetPassword');
  }
});

Authenticated.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('status');
  },
  name: "main"
});

Authenticated.route('/status', {
  name: "status",
  action: function(params, queryParams) {
    BlazeLayout.render('status');
  }
});


Authenticated.route('/editSensor/:sensor_id', {
  name: 'editSensor',
  action: function(params, queryParams) {
    BlazeLayout.render('editSensor');
  }
});

Authenticated.route('/editAccount', {
  name: "editAccount",
  action: function(params, queryParams) {
    BlazeLayout.render('editAccount');
  }
});

Authenticated.route('/alarmList/:sensor_id', {
  name: 'alarmList',
  action: function(params, queryParams){
    BlazeLayout.render('alarmList');
  }
})

Authenticated.route('/addAlarm/:sensor_id', {
  name: 'addAlarm',
  action: function(params, queryParams){
    BlazeLayout.render('addAlarm');
  }
})

Authenticated.route('/history/:sensor_id', {
  name: 'history',
  action: function(params, queryParams){
    BlazeLayout.render('history');
  }
})

Authenticated.route('/editAlarm/:alarm_id', {
  name: 'editAlarm',
  action: function(params, queryParams){
    BlazeLayout.render('editAlarm');
  }
})


Authenticated.route('/addController', {
  name: 'addController',
  action: function(params, queryParams){
    BlazeLayout.render('addController');
  }
})

Authenticated.route('/editController/:controller_id', {
  name: 'editController',
  action: function(params, queryParams){
    BlazeLayout.render('editController');
  }
})

Authenticated.route('/listControllers', {
  name: 'listControllers',
  action: function(params, queryParams){
    BlazeLayout.render('listControllers');
  }
})
