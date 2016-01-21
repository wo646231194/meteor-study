if (Meteor.isClient) {

  //--------------------------Tracker---------------------------
  //---------------计算器--------------
  //reactive对象
  //var ReactiveObj = function(val){
  //  this.value = val;
  //  this.dependency = new Tracker.Dependency();
  //};
  //ReactiveObj.prototype.get = function(){
  //  this.dependency.depend();
  //  return this.value;
  //};
  //ReactiveObj.prototype.set = function(newval){
  //  this.value = newval;
  //  this.dependency.changed();
  //};
  //Meteor.startup(function(){
  //
  //  var obja = new ReactiveObj(0);
  //  var objb = new ReactiveObj(0);
  //
  //  Tracker.autorun(function(){
  //    var a = obja.get(),b = objb.get(),c = Number(a)+Number(b);
  //    $("input[name='c']").val(c);
  //  });
  //
  //  $("input").on("change keydown keyup keypress",function(){
  //    var a = $("input[name='a']").val(),b = $("input[name='b']").val();
  //    obja.set(a);
  //    objb.set(b);
  //  });
  //});

  //--------------------------ReactiveVar---------------------------
  //Meteor.startup(function(){
  //
  //  var obja = new ReactiveVar(0);
  //  var objb = new ReactiveVar(0);
  //
  //  Tracker.autorun(function(){
  //    var a = obja.get(),b = objb.get(),c = Number(a)+Number(b);
  //    $("input[name='c']").val(c);
  //  });
  //
  //  $("input").on("change keydown keyup keypress",function(){
  //    var a = $("input[name='a']").val(),b = $("input[name='b']").val();
  //    obja.set(a);
  //    objb.set(b);
  //  });
  //});

  //--------------------------Blaze---------------------------
  Session.setDefault("c",0);

  //DOM就绪时执行参数函数体
  Meteor.startup(function(){
    //创建一个Template对象
    var tpl = new Template("calc",function(){
      var view = this;
      return [HTML.H1("加法计算器"), HTML.P("和为:",
            Blaze.View("",function(){ //子视图渲染函数体
              //返回prices helper的返回值
              return Spacebars.mustache(view.lookup("c"));
            })
        )
      ]
    });

    //定义Template对象的helper函数
    tpl.helpers({
      "c":function(){
        return  Session.get("c");
      }
    });

    //启动反应式渲染计算过程
    Blaze.render(tpl,document.body);

    $("input").on("change keydown keyup keypress",function(){
      var a = $("input[name='a']").val(),b = $("input[name='b']").val();
      var c = Number(a)+Number(b);
      Session.set("c",c);
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
