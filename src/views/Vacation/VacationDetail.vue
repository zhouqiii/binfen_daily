<template>
  <div class="box">
    <nav-bar-top title="休假申请详情"></nav-bar-top>
    <div class="home" v-if="info">
      <div class="home_detail_date" v-if="info.remark">
        <span>拒绝原因：</span>
        <span>{{ info.remark }}</span>
      </div>
      <div class="home_detail_content">
        <div class="ruleFormVacation">
          <div class="formItemVacation box_frame-row">
            <div class="vacation_detail_title">休假类型</div>
            <div class="vacation_detail_sectitle">
              <span v-if="info.vacationType == '0'">年假</span>
              <span v-if="info.vacationType == '1'">事假</span>
              <span v-if="info.vacationType == '2'">婚假</span>
              <span v-if="info.vacationType == '3'">产假</span>
              <span v-if="info.vacationType == '4'">陪产假</span>
              <span v-if="info.vacationType == '5'">病假</span>
              <span v-if="info.vacationType == '6'">丧假</span>
            </div>
          </div>
          <div class="formItemVacation box_frame-row">
            <div class="vacation_detail_title">休假日期</div>
            <div class="vacation_detail_sectitle">
              {{ info.vacationStartDate }} 至 {{ info.vacationEndDate }}
            </div>
          </div>
          <div class="formItemVacation box_frame-row">
            <div class="vacation_detail_title">休假时段</div>
            <div class="vacation_detail_sectitle">
              {{ info.vacationStartTime }}-{{ info.vacationEndTime }}
            </div>
          </div>
          <div class="formItemVacation box_frame-row">
            <div class="vacation_detail_title">工作交接</div>
            <div class="vacation_detail_sectitle">{{ info.workHandover }}</div>
          </div>
          <div class="formItemVacation box_frame-row">
            <div class="vacation_detail_title">审批人</div>
            <div class="vacation_detail_sectitle">{{ info.projectManager }}</div>
          </div>
          <div class="formItemVacation">
            <div class="vacation_detail_title">休假原因</div>
            <div class="vacation_detail_content">{{ info.vacationReason }}</div>
          </div>
          <!-- <div class="formItemVacation">
                <div class="vacation_detail_title">图片上传:</div>
                <div class="vacation_detail_img box_frame-row">
                    <div v-for="(item,index) in imgList" :key="index" class="imageDiv">
                        <img :src='item' alt="" @click="getImg(item)"/>
                    </div>
                    <div>
                      <van-image-preview v-model="show" :images="images">
                        <template v-slot:index>
                          <div class="down">
                            <img src='../../assets/icons/xiazaiFFF.png' alt=""
                                @click="download"
                            />
                          </div>
                        </template>
                      </van-image-preview>
                    </div>
                </div>
              </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getVacationDetail } from '@/api/user';
import { ImagePreview } from 'vant';
import pic1 from '../../assets/icons/pictest1.jpg';
import pic2 from '../../assets/icons/pictest2.jpg';

export default {
  name: 'VacationDetail',
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      info: {},
      getdate: '请假理由不充分，需重新填写',
      type: '事假',
      date: '4 月 22 日~4月 24 日',
      time: '8:30~10:30',
      reason: '家中有事，需休假2天，也可远程支持，望准！',
      worker: '已转交给李四负责',
      ifRefuse: false,
      imgList: [pic1, pic2, pic1, pic2],
      show: false,
      images: [],
    };
  },
  methods: {
    getVacationDetail(id) {
      getVacationDetail(id)
        .then((res) => {
          this.info = res.data;
          console.log('getVacationDetail res', res);
        })
        .catch((err) => {
          console.log('getVacationDetail err', err);
        });
    },
    // 图片放大预览
    getImg(val) {
      this.images = [];
      this.images.push(val);
      this.show = true;
    },
    // 图片下载
    download() {
      const Url = this.images[0]; // 图片路径，也可以传值进来
      const a = document.createElement('a');
      a.href = Url; // 把路径赋到a标签的href上
      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, '$2').split('?')[0]; // 正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本
      // 代替方法。创建鼠标事件并初始化（后面这些参数我也不清楚，参考文档吧 https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent）
      const e = new MouseEvent(
        'click',
        (true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null),
      );
      a.dispatchEvent(e);
      // 释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）
    },
  },
  mounted() {
    const { id } = this.$route.query;
    this.getVacationDetail(id);
  },
};
</script>
<style lang="less">
.van-image-preview__index {
  top: 90%;
  left: 80%;
}
</style>
<style scoped lang="less">
@import url('../../assets/css/style/vacationdetail.less');
</style>
