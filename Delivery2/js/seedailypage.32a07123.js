(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["seedailypage"],{2043:function(t,e,s){},"4ffc":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"box",staticStyle:{height:"100%"}},[s("nav-bar-top",{attrs:{title:"日报"},scopedSlots:t._u([{key:"right",fn:function(){return[s("div",[s("svg-icon",{attrs:{iconClass:"deletelist"},on:{click:function(e){t.showDelete=!t.showDelete}}})],1),s("div",{staticStyle:{"margin-left":"10px"}},[s("svg-icon",{attrs:{iconClass:"timelou"},on:{click:function(e){t.show=!0}}})],1)]},proxy:!0}])}),s("div",{staticClass:"home"},[s("van-pull-refresh",{staticStyle:{"min-height":"100%",background:"#e4e4e4"},on:{refresh:t.onRefresh},scopedSlots:t._u([{key:"pulling",fn:function(e){return[s("svg-icon",{style:{transform:"scale("+e.distance/80+")"},attrs:{iconClass:"Loading"}}),s("span",{staticClass:"refresh_text"},[t._v("加载")])]}},{key:"loosing",fn:function(){return[s("svg-icon",{attrs:{iconClass:"Loading"}}),s("span",{staticClass:"refresh_text"},[t._v("加载")])]},proxy:!0},{key:"loading",fn:function(){return[s("svg-icon",{attrs:{iconClass:"shuaxin"}}),s("span",{staticClass:"refresh_text"},[t._v("刷新")])]},proxy:!0}]),model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[s("no-content",{directives:[{name:"show",rawName:"v-show",value:t.ifNoContent,expression:"ifNoContent"}],attrs:{showNocontent:"0"}}),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.ifNoContent,expression:"!ifNoContent"}],staticClass:"home_padd"},[s("van-checkbox-group",{ref:"checkboxGroup",staticClass:"checkBoxGroup",attrs:{"icon-size":"25"},on:{change:t.getCheckIndex},model:{value:t.result,callback:function(e){t.result=e},expression:"result"}},t._l(t.commiList,(function(e,a){return s("div",{key:a,staticClass:"box_frame-row"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.showDelete,expression:"showDelete"}],staticClass:"checkBoxSel"},[s("van-checkbox",{attrs:{name:e.id}})],1),s("div",{staticClass:"daily_seebox",on:{click:function(e){return t.routeItem("/DailyDetail",a)}}},[s("div",{staticClass:"daily_seedate"},[t._v(" "+t._s(e.workDate)+" "+t._s(e.time))]),s("div",{staticClass:"daily_seecontent"},[s("div",{staticClass:"box_frame-row"},[s("span",{staticClass:"daily_seecontent_week"},[t._v("填报日期："+t._s(e.workDate))]),s("span",{staticClass:"daily_seecontent_state"},[t._v(t._s(e.status))])]),s("div",{staticClass:"text textEllipsis"},[t._v(" 任务："+t._s(e.taskName)+" ")]),s("div",{staticClass:"text textEllipsis"},[t._v(" 今日工作："+t._s(e.workerInfo)+" ")])])])])})),0)],1)],1),s("div",{staticClass:"home_pop"},[s("van-popup",{style:{width:"80%",height:"100%",background:"#d3d3d3"},attrs:{position:"right","get-container":".contentBox"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[s("div",{staticClass:"contentBox"},[s("div",{staticClass:"ruleForm"},[s("div",{staticClass:"formItem"},[s("van-field",{attrs:{"is-link":"",readonly:"",label:"开始时间",placeholder:"请选择"},on:{click:function(e){t.startTimePop=!0}},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),s("van-popup",{attrs:{position:"bottom"},model:{value:t.startTimePop,callback:function(e){t.startTimePop=e},expression:"startTimePop"}},[s("van-datetime-picker",{attrs:{type:"date","max-date":t.maxDate,title:" ",formatter:t.formatterD},on:{cancel:function(e){t.startTimePop=!1},confirm:t.onConfirmStartTime},model:{value:t.currentDate,callback:function(e){t.currentDate=e},expression:"currentDate"}})],1)],1),s("div",{staticClass:"formItem"},[s("van-field",{attrs:{"is-link":"",readonly:"",label:"结束时间",placeholder:"请选择"},on:{click:function(e){t.endTimePop=!0}},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}}),s("van-popup",{attrs:{position:"bottom"},model:{value:t.endTimePop,callback:function(e){t.endTimePop=e},expression:"endTimePop"}},[s("van-datetime-picker",{attrs:{type:"date","max-date":t.maxDate,title:" ",formatter:t.formatterD},on:{cancel:function(e){t.endTimePop=!1},confirm:t.onConfirmEndTime},model:{value:t.currentDateEnd,callback:function(e){t.currentDateEnd=e},expression:"currentDateEnd"}})],1)],1)]),s("div",{staticClass:"timeSelect_btn flex_evenly"},[s("div",{staticClass:"timeSelect_btn_cancel",on:{click:t.resetCheck}},[t._v("重置")]),s("div",{staticClass:"timeSelect_btn_confirm",on:{click:t.getSelectComm}},[t._v("确定")])])])])],1),s("div",{staticClass:"home_edit box_frame"},[s("div",[s("svg-icon",{attrs:{iconClass:"bu"},on:{click:function(e){return t.routeItem("/WriteDaily")}}})],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showDelete,expression:"showDelete"}],staticClass:"home_del"},[s("div",{staticClass:"box_frame-row"},[s("div",{staticClass:"delcheck",on:{click:t.checkAllBtn}},[s("van-checkbox",{attrs:{"icon-size":"25"},model:{value:t.checkedAll,callback:function(e){t.checkedAll=e},expression:"checkedAll"}},[t._v("全选")])],1),s("div",{staticClass:"del",on:{click:t.delDaily}},[t._v("删除")])])])],1)],1)},n=[],o=(s("99af"),s("ac1f"),s("1276"),s("0032")),i=(s("2043"),1),c="",r="",l=[],d={components:{SvgIcon:o["a"]},name:"SeeDaily",data:function(){return{ifNoContent:!1,commiList:[],isLoading:!1,show:!1,startDate:"",endDate:"",currentDate:new Date,currentDateEnd:new Date,maxDate:new Date,startTimePop:!1,endTimePop:!1,showDelete:!1,result:[],checkedAll:!1,isTrue:!1}},methods:{getListData:function(t,e){var s=this;this.requestAxios({url:"/workDaily/work-daily/getListByPage",data:{pageNum:i,pageSize:5,startDate:t,endDate:e},method:"post"}).then((function(t){t.data.records&&Array.prototype.forEach.call(t.data.records,(function(t){"0"===t.status?s.$set(t,"status","已提交"):s.$set(t,"status","已作废"),t.workDate&&(l.push(t.workDate),s.$set(t,"workDate",s.formatDateShow(t.workDate))),s.commiList.push(t)})),s.isTrue=!0})).catch((function(){}))},delDaily:function(){var t=this;this.requestAxios({url:"/workDaily/work-daily/del",data:{ids:this.result},method:"delete"}).then((function(e){e.success?(t.$toast("删除成功"),i=1,t.commiList=[],t.getListData("","")):t.$toast("删除失败，请重试！")})).catch((function(){}))},checkAllBtn:function(){this.checkedAll?this.$refs.checkboxGroup.toggleAll(!1):this.$refs.checkboxGroup.toggleAll(!0)},getCheckIndex:function(){this.checkedAll=this.result.length===this.commiList.length},formatterD:function(t,e){return"year"===t?"".concat(e,"年"):"month"===t?"".concat(e,"月"):"day"===t?"".concat(e,"日"):e},resetCheck:function(){this.startDate="",this.endDate="",this.currentDate=new Date},formatDateSend:function(t){var e=parseInt(t.getMonth()+1,10)<10?"0".concat(t.getMonth()+1):t.getMonth()+1,s=parseInt(t.getDate(),10)<10?"0".concat(t.getDate()):t.getDate(),a=(new Date).getFullYear();return"".concat(a,"-").concat(e,"-").concat(s)},formatDateShow:function(t){var e=t.split("-");return"".concat(e[0],"年").concat(e[1],"月").concat(e[2],"日")},onConfirmStartTime:function(t){this.startTimePop=!1,this.startDate="".concat(this.formatDateSend(t))},onConfirmEndTime:function(t){this.endTimePop=!1,this.endDate="".concat(this.formatDateSend(t))},getSelectComm:function(){this.show=!1,this.commiList=[],this.resetParams(this.startDate,this.endDate)},onRefresh:function(){var t=this;setTimeout((function(){t.commiList=[],t.isLoading=!1,t.resetParams("","")}),1e3)},resetParams:function(t,e){i=1,c=t,r=e,this.getListData(c,r)},routeItem:function(t,e){e>=0?this.$router.push({path:t,query:{id:JSON.stringify(this.commiList[e].id),date:JSON.stringify(this.commiList[e].workDate),formatDate:JSON.stringify(l[e])}}):this.$router.push(t)},handleScroll:function(){var t=this,e=document.documentElement.scrollTop||document.body.scrollTop,s=document.documentElement.clientHeight||document.body.clientHeight,a=document.documentElement.scrollHeight||document.body.scrollHeight;Math.ceil(e)+s===a&&this.isTrue&&(this.isTrue=!1,i+=1,setTimeout((function(){t.getListData(c,r)}),500))}},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll,!0)},created:function(){},mounted:function(){var t=this;this.$nextTick((function(){t.resetParams("",""),window.addEventListener("scroll",t.handleScroll,!0),1===t.$store.state.module3.changedaily&&(t.$toast("日报修改成功"),t.$store.state.module3.changedaily=0)}))},watch:{commiList:function(t){0===t.length?this.ifNoContent=!0:this.ifNoContent=!1}}},u=d,m=s("2877"),h=Object(m["a"])(u,a,n,!1,null,null,null);e["default"]=h.exports}}]);