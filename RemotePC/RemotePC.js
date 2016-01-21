if (Meteor.isClient) {
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
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Meteor.methods({
    "getSalary" :function(name){
      $("p").html("请稍等...");
    }
  });

  var pm25 = new Mongo.Collection("pm2.5");
  Meteor.subscribe("weather");

  Meteor.startup(function(){
    var tpl = "<input type='text' placeholder='name...'>\n"
        + "<button>获取工资</button>"+
        "<p></p>";
    $("body").append(tpl);

    $("button").click(function(){
      var name = $("input").val();
      Meteor.call("getSalary",name,function(err,result){
        $("p").html(name+" "+result);
      });
    });

    pm25.find().observe({
      "added":function(data){
        $("h1").html("PM 2.5 is "+data.data);
      }
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    "getSalary" : function(name){
      var date = Date.now();
      while ((Date.now()-date) <5000) var i=1;
      if (name =="huyang") return 600;
      if (name =="mayan") return 99999;
      if (name =="bb") return 100;
      return 300;
    }
  });
  Meteor.publish("weather",function(){
    var self = this;
    var id = 0;
    self.ready();
    setInterval(function(){
      var data  = (Math.random()*200).toFixed(2);
      self.added("pm2.5",++id,{data:data,time:Date.now()});
    },2000);
  });
}
