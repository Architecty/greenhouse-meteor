Template.navBar.events({
  "click #logout": function(){
    Meteor.logout();
    FlowRouter.go('login');
  }
})
