(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["writevacationpage"],{"269c":function(t,a,e){},"884a":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box"},[e("nav-bar-top",{attrs:{title:"休假申请"}}),e("div",{staticClass:"home"},[e("div",{staticClass:"home_editBox"},[e("div",{staticClass:"home_time_vacation box_frame-row"},[e("div",{staticClass:"edit_date_vacation"},[e("van-field",{staticClass:"getTime",attrs:{"is-link":"",readonly:"",label:"休假类型:",placeholder:"请选择"},on:{click:function(a){t.pickVacationType=!0}},model:{value:t.vacationType,callback:function(a){t.vacationType=a},expression:"vacationType"}}),e("van-popup",{attrs:{round:"",position:"bottom"},model:{value:t.pickVacationType,callback:function(a){t.pickVacationType=a},expression:"pickVacationType"}},[e("van-picker",{attrs:{"show-toolbar":"",columns:t.vacationSelects},on:{cancel:function(a){t.pickVacationType=!1},confirm:t.onConfirmVacation}})],1)],1)]),e("div",{staticClass:"ruleFormVacation"},[e("div",{staticClass:"formItemVacation"},[e("van-field",{attrs:{"is-link":"",readonly:"",label:"休假开始日期",placeholder:"请选择"},on:{click:function(a){t.startDatePop=!0}},model:{value:t.startDate,callback:function(a){t.startDate=a},expression:"startDate"}}),e("van-popup",{attrs:{position:"bottom"},model:{value:t.startDatePop,callback:function(a){t.startDatePop=a},expression:"startDatePop"}},[e("van-datetime-picker",{attrs:{type:"date","min-date":t.maxDate,title:" "},on:{cancel:function(a){t.startDatePop=!1},confirm:t.onConfirmStartDate},model:{value:t.currentDate,callback:function(a){t.currentDate=a},expression:"currentDate"}})],1)],1),e("div",{staticClass:"formItemVacation"},[e("van-field",{attrs:{"is-link":"",readonly:"",label:"休假结束日期",placeholder:"请选择"},on:{click:function(a){t.endDatePop=!0}},model:{value:t.endDate,callback:function(a){t.endDate=a},expression:"endDate"}}),e("van-popup",{attrs:{position:"bottom"},model:{value:t.endDatePop,callback:function(a){t.endDatePop=a},expression:"endDatePop"}},[e("van-datetime-picker",{attrs:{type:"date","min-date":t.maxDate,title:" "},on:{cancel:function(a){t.endDatePop=!1},confirm:t.onConfirmEndDate},model:{value:t.currentDate,callback:function(a){t.currentDate=a},expression:"currentDate"}})],1)],1)]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.ifOneDay,expression:"ifOneDay"}],staticClass:"ruleFormVacation"},[e("div",{staticClass:"formItemVacation"},[e("van-field",{attrs:{"is-link":"",readonly:"",label:"休假起始时间",placeholder:"请选择"},on:{click:function(a){t.startTimePop=!0}},model:{value:t.startTime,callback:function(a){t.startTime=a},expression:"startTime"}}),e("van-popup",{attrs:{position:"bottom"},model:{value:t.startTimePop,callback:function(a){t.startTimePop=a},expression:"startTimePop"}},[e("van-datetime-picker",{attrs:{type:"time",title:" "},on:{cancel:function(a){t.startTimePop=!1},confirm:t.onConfirmStartTime}})],1)],1),e("div",{staticClass:"formItemVacation"},[e("van-field",{attrs:{"is-link":"",readonly:"",label:"休假结束时间",placeholder:"请选择"},on:{click:function(a){t.endTimePop=!0}},model:{value:t.endTime,callback:function(a){t.endTime=a},expression:"endTime"}}),e("van-popup",{attrs:{position:"bottom"},model:{value:t.endTimePop,callback:function(a){t.endTimePop=a},expression:"endTimePop"}},[e("van-datetime-picker",{attrs:{type:"time",title:" "},on:{cancel:function(a){t.endTimePop=!1},confirm:t.onConfirmEndTime}})],1)],1)]),e("div",{staticClass:"ruleFormVacation textarea_box"},[e("div",{staticClass:"textarea_title"},[t._v("休假原因：")]),e("van-field",{staticClass:"textarea_reason",attrs:{rows:"2",label:"",type:"textarea",placeholder:"请输入原因"},model:{value:t.reason,callback:function(a){t.reason=a},expression:"reason"}})],1),e("div",{staticClass:"ruleFormVacation"},[e("div",{staticClass:"formItemVacation"},[e("van-field",{staticClass:"text_handover",attrs:{label:"工作交接：",placeholder:"请输入"},model:{value:t.handOver,callback:function(a){t.handOver=a},expression:"handOver"}})],1)]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.ifUpload,expression:"ifUpload"}],staticClass:"ruleFormVacation"},[t._m(0),e("div",{staticClass:"imageItem"},[e("van-uploader",{attrs:{multiple:""},model:{value:t.fileList,callback:function(a){t.fileList=a},expression:"fileList"}})],1)])])]),e("div",{staticClass:"submit_btn"},[e("div",{staticClass:"sendBtn",on:{click:t.submitData}},[t._v("提交申请")])])],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"formItemVacation"},[e("div",{staticClass:"textarea_title box_frame-row"},[e("div",[t._v("图片上传")])])])}],o=(e("99af"),e("269c"),e("22ff")),s=e("8521"),c={name:"WriteExtention",data:function(){return{editList:[{id:0}],pickVacationType:!1,vacationType:"",Loop:"",startDate:"",startDatePop:!1,endDate:"",endDatePop:!1,startTime:"",endTime:"",endTimePop:!1,startTimePop:!1,ifOneDay:!1,reason:"",handOver:"",ifUpload:!1,imagePop:!1,iphonetype:"",maxDate:new Date,currentDate:new Date,daily:!1,vacationSelects:["年假","事假","婚假","产假","陪产假","病假","丧假","流产假"],fileList:[]}},methods:{onConfirmVacation:function(t,a){this.vacationType=t,this.pickVacationType=!1,a>1&&(this.ifUpload=!0)},onConfirmStartDate:function(t){this.startDatePop=!1,this.startDate="".concat(this.formatDate(t)),this.startDate===this.endDate?this.ifOneDay=!0:this.ifOneDay=!1},onConfirmEndDate:function(t){this.endDatePop=!1,this.endDate="".concat(this.formatDate(t)),this.startDate===this.endDate?this.ifOneDay=!0:this.ifOneDay=!1},onConfirmStartTime:function(t){this.startTimePop=!1,this.startTime=t},onConfirmEndTime:function(t){this.endTimePop=!1,this.endTime=t},formatDate:function(t){var a=t.getMonth()+1,e=t.getDate();return parseInt(a,10)<10&&(a="0".concat(a)),parseInt(e,10)<10&&(e="0".concat(e)),"".concat(t.getFullYear(),"-").concat(a,"-").concat(e)},submitData:function(){var t=[];Array.prototype.forEach.call(this.$refs.child,(function(a){var e={};e.taskId=parseInt(a.taskId,10),e.taskName=a.commision,e.projectId=a.projectId,e.projectName=a.projectTeam,e.workerInfo=a.workContent,e.startTime=a.startTime,e.endTime=a.endTime,t.push(e)})),this.$router.push({path:"/ApplyEnd",query:{pageend:2}})},sendData:function(t){var a=this;this.requestAxios({url:"",data:{workDate:this.startDate,dailyDetailList:t},method:"post"}).then((function(t){t.success?a.$router.push({path:"/ApplyEnd",query:{pageend:2}}):Object(o["a"])(s["a"],{},{content:'<div style="text-align:center">'.concat(t.message,'</div>\n                          <div style="text-align:center;margin-top:.5rem">请重新提交！</div>\n                          '),knowBtn:!0})})).catch((function(){}))}},mounted:function(){}},r=c,l=e("2877"),p=Object(l["a"])(r,i,n,!1,null,null,null);a["default"]=p.exports}}]);