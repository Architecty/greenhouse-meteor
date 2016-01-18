Template.addController.helpers({
  controller: function(){
    return {
      ID: Random.id(),
      secret: Random.secret()
    };
  }
})
