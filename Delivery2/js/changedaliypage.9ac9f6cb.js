(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["changedaliypage"],{"065e":function(t,e,i){},"0b14":function(t,e,i){"use strict";i("862b")},"0d8c":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"home_editBox_content"},[i("div",{staticClass:"ruleForm"},[i("div",{staticClass:"formItem"},[i("van-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[i("van-collapse-item",{attrs:{title:"任务",name:"1"},scopedSlots:t._u([{key:"value",fn:function(){return[t._v(" "+t._s(t.commision)+" ")]},proxy:!0}])},t._l(t.commiListThe,(function(e,o){return i("div",{key:o},[i("div",[i("van-radio-group",{model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[i("van-cell",{attrs:{title:e,clickable:""},scopedSlots:t._u([{key:"right-icon",fn:function(){return[i("van-radio",{attrs:{name:o},on:{click:function(e){return t.getRadioIndex(o)}}})]},proxy:!0}],null,!0)})],1)],1)])})),0)],1)],1),i("div",{directives:[{name:"show",rawName:"v-show",value:t.dailyShow,expression:"dailyShow"}],staticClass:"formItem"},[i("van-field",{attrs:{"is-link":"",readonly:"",label:"工时",placeholder:"请选择"},on:{click:function(e){t.showPickerHour=!0}},model:{value:t.workHour,callback:function(e){t.workHour=e},expression:"workHour"}}),i("van-popup",{attrs:{round:"",position:"bottom"},on:{close:t.getWorkContent},model:{value:t.showPickerHour,callback:function(e){t.showPickerHour=e},expression:"showPickerHour"}},[i("van-picker",{attrs:{"show-toolbar":"",columns:t.hourSelects},on:{cancel:function(e){t.showPickerHour=!1},confirm:t.onConfirmHour}})],1)],1),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.dailyShow,expression:"!dailyShow"}]},[i("div",{staticClass:"formItem box_frame-row"},[i("van-field",{attrs:{"is-link":"",readonly:"",label:"开始时间",placeholder:"请选择"},on:{click:function(e){t.startTimeHM=!0}},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}}),i("van-popup",{attrs:{position:"bottom"},on:{close:t.getWorkContent},model:{value:t.startTimeHM,callback:function(e){t.startTimeHM=e},expression:"startTimeHM"}},[i("van-datetime-picker",{attrs:{type:"time",title:" ",formatter:t.formatterTime},on:{cancel:function(e){t.startTimeHM=!1},confirm:t.onConfirmStartHM},model:{value:t.currentStart,callback:function(e){t.currentStart=e},expression:"currentStart"}})],1)],1),i("div",{staticClass:"formItem"},[i("van-field",{attrs:{"is-link":"",readonly:"",label:"结束时间",placeholder:"请选择"},on:{click:function(e){t.endTimeHM=!0}},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}}),i("van-popup",{attrs:{position:"bottom"},on:{close:t.getWorkContent},model:{value:t.endTimeHM,callback:function(e){t.endTimeHM=e},expression:"endTimeHM"}},[i("van-datetime-picker",{attrs:{type:"time",title:" ",formatter:t.formatterTime},on:{cancel:function(e){t.endTimeHM=!1},confirm:t.onConfirmEndHM},model:{value:t.currentEnd,callback:function(e){t.currentEnd=e},expression:"currentEnd"}})],1)],1)]),i("div",[i("div",{staticClass:"workTitle"},[t._v("今日工作")]),i("van-field",{staticClass:"textareaEdit",staticStyle:{height:"4.5rem","text-align":"left"},attrs:{rows:"2",type:"textarea",placeholder:"请输入工作内容(最少10个字)"},on:{input:t.getWorkContent},model:{value:t.workContent,callback:function(e){t.workContent=e},expression:"workContent"}})],1)])])])},n=[],a={name:"WorkInfo",props:["daily","commiList","taskList"],data:function(){return{workHour:"",showPickerHour:!1,hourSelects:["2小时","4小时","6小时","8小时"],activeNames:["1"],commiListThe:[],commision:"",radio:0,workContent:"",show:!0,dailyShow:"",startTime:"18:30",startTimeHM:!1,currentStart:"18:30",currentEnd:"21:30",endTime:"21:30",endTimeHM:!1,projectId:"",taskListThe:[],taskId:""}},methods:{formatterTime:function(t,e){return"hour"===t?"".concat(e,"时"):"minute"===t?"".concat(e,"分"):e},getRadioIndex:function(t){this.taskId=this.taskListThe[t],this.commision=this.commiList[t]},onConfirmHour:function(t){this.workHour=t,this.showPickerHour=!1},onConfirmStartHM:function(t){this.startTime=t,this.startTimeHM=!1},onConfirmEndHM:function(t){this.endTime=t,this.endTimeHM=!1},sendFlag:function(t){return this.flagToParent=t,this.flagToParent},getWorkContent:function(){this.$emit("checkInput")},assignTask:function(){this.commiListThe=this.commiList,this.taskListThe=this.taskList,this.taskId=this.taskListThe[0],this.commision=this.commiList[0]}},mounted:function(){this.dailyShow=this.daily,this.assignTask()},watch:{commiList:{handler:function(){this.assignTask()}}}},r=a,s=(i("5b56"),i("2877")),c=Object(s["a"])(r,o,n,!1,null,"734747bb",null);e["a"]=c.exports},2052:function(t,e,i){},"5b56":function(t,e,i){"use strict";i("2052")},"862b":function(t,e,i){},"8e23":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",t._l(t.dataList,(function(e,o){return i("div",{key:e.id,staticClass:"home_editBox_content",on:{touchstart:function(e){return t.touchinUk(o)},touchend:function(e){return t.cleartime(o)}}},[i("div",{staticClass:"ruleForm"},[i("div",{staticClass:"formItem box_frame-row"},[i("div",[t._v("任务")]),i("div",{staticClass:"textEllipsis"},[t._v(t._s(e.taskName))])]),i("div",{directives:[{name:"show",rawName:"v-show",value:t.dailyShow,expression:"dailyShow"}],staticClass:"formItem box_frame-row"},[i("van-field",{attrs:{"is-link":"",readonly:"",label:"工时",placeholder:"请选择"},on:{click:function(e){return t.getIndex(o)}},model:{value:e.workerLength,callback:function(i){t.$set(e,"workerLength",i)},expression:"item.workerLength"}}),i("van-popup",{attrs:{round:"",position:"bottom"},on:{close:t.getWorkContent},model:{value:t.showPickerHour,callback:function(e){t.showPickerHour=e},expression:"showPickerHour"}},[i("van-picker",{attrs:{"show-toolbar":"",columns:t.hourSelects},on:{cancel:function(e){t.showPickerHour=!1},confirm:t.onConfirmHour}})],1)],1),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.dailyShow,expression:"!dailyShow"}]},[i("div",{staticClass:"formItem box_frame-row"},[i("van-field",{attrs:{"is-link":"",readonly:"",label:"开始时间",placeholder:"请选择"},on:{click:function(e){t.startTimeHM=!0}},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}}),i("van-popup",{attrs:{position:"bottom"},on:{close:t.getWorkContent},model:{value:t.startTimeHM,callback:function(e){t.startTimeHM=e},expression:"startTimeHM"}},[i("van-datetime-picker",{attrs:{type:"time",title:" "},on:{confirm:t.onConfirmStartHM},model:{value:t.currentStart,callback:function(e){t.currentStart=e},expression:"currentStart"}})],1)],1),i("div",{staticClass:"formItem"},[i("van-field",{attrs:{"is-link":"",readonly:"",label:"结束时间",placeholder:"请选择"},on:{click:function(e){t.endTimeHM=!0}},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}}),i("van-popup",{attrs:{position:"bottom"},on:{close:t.getWorkContent},model:{value:t.endTimeHM,callback:function(e){t.endTimeHM=e},expression:"endTimeHM"}},[i("van-datetime-picker",{attrs:{type:"time",title:" "},on:{confirm:t.onConfirmEndHM},model:{value:t.currentEnd,callback:function(e){t.currentEnd=e},expression:"currentEnd"}})],1)],1)]),i("div",{staticClass:"formItem"},[i("div",{staticClass:"workTitle"},[t._v("今日工作")]),i("van-field",{staticClass:"textareaEdit",staticStyle:{height:"4.5rem","text-align":"left"},attrs:{rows:"2",type:"textarea",placeholder:"请输入工作内容(最少10个字)"},on:{input:t.getWorkContent},model:{value:e.workerInfo,callback:function(i){t.$set(e,"workerInfo",i)},expression:"item.workerInfo"}})],1)])])})),0)},n=[],a=(i("a434"),{name:"ChangeWorkInfo",props:["data","daily"],data:function(){return{dataList:[],hourIndex:0,showPickerHour:!1,hourSelects:["2小时","4小时","6小时","8小时"],startTime:this.data.workHourStart,endTime:this.data.workHourEnd,endTimeHM:!1,startTimeHM:!1,currentStart:this.data.workHourStart,currentEnd:this.data.workHourEnd,commiList:"",commiListAll:[[{title:"哈哈哈啦哈哈哈哈哈啦哈哈哈哈啦哈哈啦哈啦哈啦哈啦哈哈啦哈哈啦哈啦哈啦哈啦"},{title:"aklla"}],[{title:"akalj啦哈啦哈啦哈啦哈哈啦哈哈啦哈啦哈啦哈啦"},{title:"击杀拉拉裤手机卡案例"}],[{title:"jjjjjjjjjjjj"},{title:"aklla"}],[{title:"亲亲亲亲亲亲群群群群群"},{title:"击杀拉拉裤手机卡案例"}]],workContent:this.data.workContent,dailyShow:this.daily,Loop:""}},methods:{getIndex:function(t){this.showPickerHour=!0,this.hourIndex=t},onConfirmHour:function(t){this.dataList[this.hourIndex].workerLength=t,this.showPickerHour=!1},getCommi:function(t,e){this.commision=e},onConfirmStartHM:function(t){this.startTime=t,this.startTimeHM=!1},onConfirmEndHM:function(t){this.endTime=t,this.endTimeHM=!1},getWorkContent:function(){this.$emit("checkInput",this.dataList)},touchinUk:function(t){var e=this;clearInterval(this.Loop),this.Loop=setTimeout((function(){e.$dialog.confirm({message:"是否删除"}).then((function(){e.dataList.splice(t,1)})).catch((function(){}))}),1e3)},cleartime:function(){clearInterval(this.Loop)}},mounted:function(){this.dataList=this.data;for(var t=0;t<this.dataList.length;t++)this.dataList[t].workerLength="".concat(this.dataList[t].workerLength,"小时")}}),r=a,s=(i("0b14"),i("2877")),c=Object(s["a"])(r,o,n,!1,null,"9ddfd43c",null);e["a"]=c.exports},a434:function(t,e,i){"use strict";var o=i("23e7"),n=i("23cb"),a=i("a691"),r=i("50c4"),s=i("7b0b"),c=i("65f0"),l=i("8418"),d=i("1dde"),u=d("splice"),m=Math.max,h=Math.min,f=9007199254740991,k="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!u},{splice:function(t,e){var i,o,d,u,p,v,w=s(this),b=r(w.length),T=n(t,b),g=arguments.length;if(0===g?i=o=0:1===g?(i=0,o=b-T):(i=g-2,o=h(m(a(e),0),b-T)),b+i-o>f)throw TypeError(k);for(d=c(w,o),u=0;u<o;u++)p=T+u,p in w&&l(d,u,w[p]);if(d.length=o,i<o){for(u=T;u<b-o;u++)p=u+o,v=u+i,p in w?w[v]=w[p]:delete w[v];for(u=b;u>b-o+i;u--)delete w[u-1]}else if(i>o)for(u=b-o;u>T;u--)p=u+o-1,v=u+i-1,p in w?w[v]=w[p]:delete w[v];for(u=0;u<i;u++)w[u+T]=arguments[u+2];return w.length=b-o+i,d}})},d729:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box"},[i("nav-bar-top",{attrs:{title:"修改日报"}}),i("div",{staticClass:"home"},[i("div",{staticClass:"home_editBox"},[i("div",{staticClass:"home_editBox_time box_frame-row"},[i("div",[t._v("填写日期")]),i("div",{staticClass:"edit_date"},[i("div",{staticClass:"getTime"},[t._v(t._s(t.date))])])]),i("change-work-info",{ref:"childTop",attrs:{data:t.data,daily:"true"},on:{checkInput:t.checkInput}}),t._l(t.editList,(function(e,o){return i("work-info",{key:e.id,ref:"child",refInFor:!0,attrs:{daily:"true",commiList:t.commiList,taskList:t.taskList},on:{checkInput:t.checkInput},nativeOn:{touchstart:function(e){return t.touchinUk(o)},touchend:function(e){return t.cleartime(o)}}})})),i("div",{staticClass:"home_editBox_iconAdd",on:{click:t.addeditbox}},[i("svg-icon",{staticClass:"iconBig",attrs:{iconClass:"tianjia"}})],1)],2)]),i("div",{staticClass:"submit_btn"},[i("div",{staticClass:"sendBtnDefault",style:t.thisStyle,attrs:{disabled:t.disabledCommit},on:{click:t.sendData}},[t._v("提交日报")])])],1)},n=[],a=(i("a434"),i("065e"),i("22ff")),r=i("0032"),s=i("8e23"),c=i("0d8c"),l=i("8521"),d=0,u={components:{SvgIcon:r["a"],ChangeWorkInfo:s["a"],WorkInfo:c["a"]},name:"ChangeDaily",data:function(){return{date:JSON.parse(this.$route.query.date),data:JSON.parse(this.$route.query.data),editList:[],Loop:"",startTimePop:!1,maxDate:new Date,currentDate:new Date,commiList:[],taskList:[],disabledCommit:!1,thisStyle:""}},methods:{defaultProject:function(){var t=this;this.requestAxios({url:"/businessTask/business-task/getListTaskByUser",data:{},method:"post"}).then((function(e){e.data.length>0&&(t.commiList=[],t.taskList=[],Array.prototype.forEach.call(e.data,(function(e){t.commiList.push(e.taskName),t.taskList.push(e.taskId)})))})).catch((function(){}))},addeditbox:function(){var t=this;d+=1,this.editList.push({id:d}),this.$nextTick((function(){t.checkInput()}))},checkInput:function(){var t=!0,e=[],i=this.$refs.childTop.data;i&&Array.prototype.forEach.call(i,(function(t){e.push(t.workerInfo),e.push(t.workerLength)}));var o=this.$refs.child;o&&Array.prototype.forEach.call(o,(function(t){e.push(t.workContent),e.push(t.workHour)})),e&&e.forEach((function(e){e||(t=!1)})),t?(this.disabledCommit=!1,this.thisStyle="background:rgb(102, 102, 102)"):(this.disabledCommit=!0,this.thisStyle="background:#d3d3d3")},touchinUk:function(t){var e=this;clearInterval(this.Loop),this.Loop=setTimeout((function(){e.$dialog.confirm({message:"是否删除"}).then((function(){e.editList.splice(t,1),e.checkInput()})).catch((function(){}))}),1e3)},cleartime:function(){clearInterval(this.Loop)},sendData:function(){var t=this,e=[],i=0,o=this.$refs.childTop.data;Array.prototype.forEach.call(o,(function(t){var o=parseInt(t.workerLength.substring(0,1),10);i+=o;var n={};n.taskId=parseInt(t.taskId,10),n.taskName=t.taskName,n.workerLength=o,n.workerInfo=t.workerInfo,e.push(n)})),this.$refs.child&&Array.prototype.forEach.call(this.$refs.child,(function(t){var o=parseInt(t.workHour.substring(0,1),10);i+=o;var n={};n.taskId=t.taskId,n.taskName=t.commision,n.workerLength=o,n.workerInfo=t.workContent,e.push(n)})),i<8?Object(a["a"])(l["a"],{},{content:'<div style="text-align:center">填写工时不足8小时，请检查工时</div>',knowBtn:!0}):i>8?Object(a["a"])(l["a"],{},{content:'<div style="text-align:center">填写工时已超 8 小时,请检查工时</div>',knowBtn:!0}):this.requestAxios({url:"/workDaily/work-daily/upd",data:{createDate:JSON.parse(this.$route.query.formatDate),dailyDetailList:e,id:JSON.parse(this.$route.query.id)},method:"put"}).then((function(e){e.success?(t.$store.state.module3.changedaily=1,t.$router.push({path:"/SeeDaily"})):Object(a["a"])(l["a"],{},{content:'<div style="text-align:center">'.concat(e.message,'</div><div style="text-align:center;margin-top:.5rem">请重新提交！</div>'),knowBtn:!0})})).catch((function(){}))}},mounted:function(){this.defaultProject()}},m=u,h=i("2877"),f=Object(h["a"])(m,o,n,!1,null,null,null);e["default"]=f.exports}}]);