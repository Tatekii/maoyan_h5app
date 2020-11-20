import Vue from "vue";
import MessageBox from "./MessageBox";

export let messageBox = (function() {
  return opt => {
    let defaultOpt = {
      title: "标题",
      content: "内容",
      button1: "选项1",
      button2: "选项2",
      handleButton1: ()=>{console.log('button1Active!');
      },
      handleButton2: ()=>{console.log('button2Active!');
      }
    };

    let myComponents = Vue.extend(MessageBox)

    for(let i in opt){
      defaultOpt[i] = opt[i]
    }

    let vm = new myComponents({
      el: document.createElement('div'),

      data:{
        title : defaultOpt.title,
        content : defaultOpt.content,
        button1 : defaultOpt.button1,
        button2 : defaultOpt.button2
      },
      methods:{
        handleButton1 : ()=>{
          defaultOpt.handleButton1 && defaultOpt.handleButton1.call(this)
          document.body.removeChild(vm.$el)
        },
        handleButton2 : ()=>{
          defaultOpt.handleButton2 && defaultOpt.handleButton2.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })

    document.body.appendChild(vm.$el)
  };
})();
