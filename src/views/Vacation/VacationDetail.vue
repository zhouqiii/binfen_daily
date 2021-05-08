<template>
    <div class="box">
        <nav-bar-top title="休假申请详情"></nav-bar-top>
        <div class="home">
          <div class="home_detail_date" v-show="ifRefuse">
              <span>拒绝原因：</span>
              <span>{{getdate}}</span>
          </div>
          <div class="home_detail_content">
            <div class="ruleForm">
              <div class="formItem">
                  <div class="vacation_detail_title">休假类型:</div>
                  <div class="vacation_detail_sectitle">{{type}}</div>
              </div>
              <div class="formItem">
                  <div class="vacation_detail_title">休假日期:</div>
                  <div class="vacation_detail_sectitle">{{date}}</div>
              </div>
                <div class="formItem">
                  <div class="vacation_detail_title">休假时段:</div>
                  <div class="vacation_detail_sectitle">{{time}}</div>
              </div>
                <div class="formItem">
                  <div class="vacation_detail_title">休假原因:</div>
                  <div class="vacation_detail_sectitle">{{reason}}</div>
              </div>
              <div class="formItem">
                  <div class="vacation_detail_title">工作交接:</div>
                  <div class="vacation_detail_sectitle">{{worker}}</div>
              </div>
              <div class="formItem">
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
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { ImagePreview } from 'vant';
import pic1 from '../../assets/icons/pictest1.jpg';
import pic2 from '../../assets/icons/pictest2.jpg';
import '../../assets/css/style/vacationdetail.less';

export default {
  name: 'VacationDetail',
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
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
    getInfo() {
      if (this.$route.query.refuse > 0) {
        this.ifRefuse = true;
      } else {
        this.ifRefuse = false;
      }
    //   this.requestAxios({
    //     url: `/api/workDaily/findParam/${JSON.parse(this.$route.query.id)}`, // 修改为查看延迟申请详情接口
    //     method: 'post',
    //   })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch(() => {
    //     });
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
      a.download = Url.replace(/(.*\/)*([^.]+.*)/ig, '$2').split('?')[0];// 正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本
      // 代替方法。创建鼠标事件并初始化（后面这些参数我也不清楚，参考文档吧 https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent）
      const e = new MouseEvent('click', (true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null));
      a.dispatchEvent(e);
    // 释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）
    },

  },
  mounted() {
    this.getInfo();
  },
};
</script>
<style lang="less">
.van-image-preview__index{
    top:90%;
    left: 80%;
}
</style>
