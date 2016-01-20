if (Meteor.isClient) {

  Meteor.startup(function(){
    $("<h1>The client is ready</h1>").appendTo("body");
  });
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      alert("clicked");
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.test.helpers({
    'displayName':function(name,title){
     return "<b>"+title+" "+name+"</b>";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("Server is ready");
  });
}
