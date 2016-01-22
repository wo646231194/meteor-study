var msgs = new Mongo.Collection("messages");

//在前端和后端都定义persons集合
var persons = new Mongo.Collection("persons");
//在前端和后端都定义friends集合
var friends = new Mongo.Collection("friends");
var news = new Mongo.Collection("news");

if (Meteor.isClient) {

  Session.setDefault("criteria",{});

  Template.msg.helpers({
    messages:function(){
      return msgs.find({},{sort:{time:-1}});
    }
  });

  Template.sender.events({
    "submit form":function(event,tpl){
      event.preventDefault();
      var $name = $("input[name='uname']");
      var $text = $("textarea[name='msg']");
      var text = $name.val()+"留言"+$text.val();
      if($name.val()!=''&&$text.val()!=''){
        msgs.insert({text:text,time:Date.now()});
        $name.val("");$text.val("");
      }
    }
  });

  Template.persons.helpers({
    //persons:function(){
    //  return persons.find();
    //}
    persons : function(){
      var criteria = Session.get("criteria");
      return persons.find(criteria);
    }
  });

  Template.persons.events({
    "click a":function(e,t){
      e.preventDefault();
      Session.set("id",this._id);
    }
  });
  Template.criteria.events({
    "click button":function(event,tpl){
      var $name = tpl.$("input");
      var criteria = {};
      criteria.name = $name.val();
      Session.set("criteria",criteria);
    }
  });

  Template.updater.helpers({
    id:function(){
      return Session.get("id");
    }
  });
  Template.updater.events({
    "click button#inc":function(){
      var id = Session.get("id");
      persons.update({_id:id},{$inc:{age:1}});
    },
    "click button#dec":function(){
      var id = Session.get("id");
      persons.update({_id:id},{$inc:{age:-1}});
    }
  });

  Template.friends.helpers({
    friends:function(){
      return friends.find();
    }
  });
  Template.friends.events({
    "click button":function(){
      console.log(this);
      friends.remove({_id:this._id});
    }
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
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.tpl_map.helpers({
    titles:function(){
      return news.find().map(function(item){
        return item.title;
      })
    }
  });
  Template.tpl_fetch.helpers({
    news:function(){
      return news.find().fetch();
    }
  });
  Template.tpl_count.helpers({
    count:function(){
      return news.find().count();
    }
  });
  Tracker.autorun(function(){
    news.find().forEach(function(item){
      $("<li></li>").text(item.title).appendTo("#foreach");
    })
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if(persons.find().count() === 0){
      persons.insert({name:"jACK",age:28});
      persons.insert({name:"Mary",age:32});
    }
    if(friends.find().count()===0){
      friends.insert({name:"linda"});
      friends.insert({name:"mary"});
    }
    if(news.find().count()===0){
      news.insert({title:"title 1",source:"xinhua",time:Date.now()});
      news.insert({title:"title 2",source:"huyang",time:Date.now()});
    }
  });
}
