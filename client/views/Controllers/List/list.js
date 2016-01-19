Template.listControllers.onCreated(function(){
  var self = this;
  self.autorun(function () {
    self.subscribe('controllers');
  });
});

Template.listControllers.helpers({
  allControllers: function(){
    return Meteor.users.find({type: "controller", owner_id: Meteor.userId()}, {sort: {name: 1}})
  }
})
