External = FlowRouter.group({
  name: 'external'
})

Authenticated = FlowRouter.group({
  name: 'authenticated'
})

External.route('/login', {
  name: "login",
  action: function(params, queryParams) {
    BlazeLayout.render('mainTemplate', {template: 'login'});
  }
});

External.route('/signup', {
  name: 'signup',
  action: function(params, queryParams) {
    BlazeLayout.render('mainTemplate', {template: 'signup'});
  }
});

External.route('/forgotPassword', {
  name: "forgotPassword",
  action: function(params, queryParams) {
    BlazeLayout.render('mainTemplate', {template: 'forgotPassword'});
  }
});

External.route('/resetPassword/:token', {
  name: "resetPassword",
  action: function(params, queryParams) {
    BlazeLayout.render('mainTemplate', {template: 'resetPassword'});
  }
});

Authenticated.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainTemplate', {template: 'cover'});
  },
  name: "main"
});

Authenticated.route('/status', {
  name: "status",
  action: function(params, queryParams) {
    BlazeLayout.render('mainTemplate', {template: 'status'});
  }
});


Authenticated.route('/editSensor/:sensor_id', {
  name: 'editSensor',
  action: function(params, queryParams) {
    BlazeLayout.render('mainTemplate', {template: 'editSensor'});
  }
});

Authenticated.route('/editAccount', {
  name: "editAccount",
  action: function(params, queryParams) {
    BlazeLayout.render('mainTemplate', {template: 'editAccount'});
  }
});

Authenticated.route('/alarmList/:sensor_id', {
  name: 'alarmList',
  action: function(params, queryParams){
    BlazeLayout.render('mainTemplate', {template: 'alarmList'});
  }
})

Authenticated.route('/addAlarm/:sensor_id', {
  name: 'addAlarm',
  action: function(params, queryParams){
    BlazeLayout.render('mainTemplate', {template: 'addAlarm'});
  }
})

Authenticated.route('/history/:sensor_id', {
  name: 'history',
  action: function(params, queryParams){
    BlazeLayout.render('mainTemplate', {template: 'history'});
  }
})

Authenticated.route('/editAlarm/:alarm_id', {
  name: 'editAlarm',
  action: function(params, queryParams){
    BlazeLayout.render('mainTemplate', {template: 'editAlarm'});
  }
})


Authenticated.route('/addController', {
  name: 'addController',
  action: function(params, queryParams){
    BlazeLayout.render('mainTemplate', {template: 'addController'});
  }
})

Authenticated.route('/editController/:controller_id', {
  name: 'editController',
  action: function(params, queryParams){
    BlazeLayout.render('mainTemplate', {template: 'editController'});
  }
})

Authenticated.route('/listControllers', {
  name: 'listControllers',
  action: function(params, queryParams){
    BlazeLayout.render('mainTemplate', {template: 'listControllers'});
  }
})
