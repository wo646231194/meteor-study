if (Meteor.isClient) {
  Template.body.helpers({
    getProfile:function(){
      return{
        name:"mayan",
        age:3
      }
    },
    et:function(){
      return 100;
    },
    paiting:function(){
      return 9;
    },
    tplname : function(){
      return Session.get("tplname");
    }
  });

  Template.salary.helpers({
    getSalary:function(name,over){
      var overtime = over.overtime;
      var ret = 500;
      if(overtime) ret = ret +1000;
      if(name=="huyang") ret = ret+100;;
      return ret+over.hash.gender;
    }
  });

  Template.phone.helpers({
    phone:function(){
      return{
        name:"魅蓝NOTE2",
        age:1
      }
    }
  });

  Template.message.events({
    "click button":function(event,tpl){
      var msg = tpl.$("input").val();
      var name = this.name,tel = this.tel;
      alert("拨打"+tel+"发送消息给"+name+" 消息内容:"+msg);
    }
  });

  Template.list.helpers({
    friends:function(){
      //根据在模板标签中的具体应用，应当返回对象数组
      return [
        {name:"Tracer"},
        {name:"Tyrion"},
        {name:"Samus Aran"},
        {name:"Heisenberg"},
        {name:"Bender"}
      ];
    }
  });

  //设置Session中flag变量初始值为false
  Session.setDefault("flag",false);

  Template.body.helpers({
    flag : function(){
      return Session.get("flag");
    }
  });

  //点击按钮将切换Session中flag变量的值
  Template.body.events({
    "click button":function(){
      Session.set("flag",!Session.get("flag"));
    }
  });

  //设置Session中tplname变量初始值为blogs
  Session.setDefault("tplname","blogs");

  //导航模板的helpers声明
  Template.navi.helpers({
    links : ["blogs","musics","sports"]
  });

  //导航模板初次被渲染时，为所有的li元素绑定click时间
  Template.navi.onRendered(function(){
    this.$("li").click(function(){
      //在点击li元素时，设置Session中tplname变量的值
      Session.set("tplname",$(this).text());
    });
  });

  Template.hello.helpers({
    extcls:"ezt",
    attrs: {id:"aaa", style:"color:blue"}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
