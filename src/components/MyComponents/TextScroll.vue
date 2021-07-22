<template>
  <div class="text-container">
    <!--mode="out-in"属性表示平滑的上一个内容先出，后一个内容在入-->
    <transition name="slide" mode="out-in">
      <div class="text textEllipsis" :key="text.id">{{ text.val }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TextScroll',
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      count: 0, // 当前索引
      intervalId: null, // 定时器ID
      playTime: 4000, // 定时器执行间隔
    };
  },
  computed: {
    text() {
      return {
        id: this.count,
        val: this.dataList[this.count],
      };
    },
  },
  created() {
    this.intervalId = setInterval(() => {
      // 定义定时器
      this.getText();
    }, this.playTime);
  },
  methods: {
    getText() {
      const len = this.dataList.length; // 获取数组长度
      if (len === 0) {
        return; // 当数组为空时，直接返回
      }
      if (this.count === len - 1) {
        // 当前为最后一个时
        this.count = 0; // 从第一个开始
      } else {
        this.count += 1; // 自增
      }
    },
  },
  destroyed() {
    clearInterval(this.intervalId); // 清除定时器
  },
};
</script>

<style scoped>
.slide-enter-active {
  transition: all 1s;
}
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter {
  /* transform: translateY(20px); */
}
.slide-leave-to {
  transform: translateY(-50px);
}
</style>
