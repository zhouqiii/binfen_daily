<template>
    <div>
      <div class="home_editBox_content" >
        <div class="ruleForm">
            <div class="formItem">
              <van-field
                v-model="projectTeam"
                is-link
                readonly
                label="项目组"
                placeholder="请选择"
                @click="showPickerTeam = true"
              />
              <van-popup v-model="showPickerTeam" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="teamSelects"
                    @cancel="showPickerTeam = false"
                    @confirm="onConfirmTeam"
                />
              </van-popup>
            </div>
            <div class="formItem">
              <van-collapse v-model="activeNames">
                <van-collapse-item title="任务" name="1">
                  <template #value>
                    {{commision}}
                  </template>
                  <div v-for="(item,index) in commiList" :key="index">
                    <div>
                      <van-radio-group v-model="radio"
                      >
                        <van-cell :title="item.title"
                          clickable @click="getCommi(index,item.title)"
                        >
                          <template #right-icon>
                            <van-radio :name="index"/>
                          </template>
                        </van-cell>
                      </van-radio-group>
                    </div>
                  </div>
                </van-collapse-item>
              </van-collapse>
            </div>
            <div class="formItem">
                <van-field
                    v-model="startTime"
                    is-link
                    readonly
                    label="开始时间"
                    placeholder="请选择"
                    @click="startTimeHM = true"
                />
                <van-popup v-model="startTimeHM" position="bottom">
                    <van-datetime-picker
                        v-model="currentStart"
                        type="time"
                        title=" "
                        @confirm='onConfirmStartHM'
                    />
                </van-popup>
            </div>
            <div class="formItem">
                <van-field
                    v-model="endTime"
                    is-link
                    readonly
                    label="结束时间"
                    placeholder="请选择"
                    @click="endTimeHM  = true"
                />
                <van-popup v-model="endTimeHM" position="bottom">
                    <van-datetime-picker
                        v-model="currentEnd"
                        type="time"
                        title=" "
                        @confirm='onConfirmEndHM'
                    />
                </van-popup>
            </div>
            <div class="formItem">
              <div class="workTitle">今日工作</div>
              <van-field
                class="textareaEdit"
                style="height:4.5rem;text-align:left"
                v-model="workContent"
                rows="2"
                type="textarea"
                placeholder="请输入工作内容(最少10个字)"
              />
            </div>
        </div>
      </div>
    </div>
</template>
<script>

export default {
  name: 'ExtenWorkInfo',
  data() {
    return {
      projectTeam: '', // 项目组
      showPickerTeam: false, // 项目组picker
      teamSelects: ['BCSP', '运动专区', '缤纷生活', 'DCDS'],
      showPickerHour: false,
      hourSelects: ['2小时', '4小时', '6小时', '8小时'],
      activeNames: ['0'],
      commiList: '',
      radio: 0,
      commiListAll: [[{ title: '哈哈哈啦哈哈哈哈哈啦哈哈哈哈啦哈哈啦哈啦哈啦哈啦哈哈啦哈哈啦哈啦哈啦哈啦' }, { title: 'aklla' }], [{ title: 'akalj啦哈啦哈啦哈啦哈哈啦哈哈啦哈啦哈啦哈啦' }, { title: '击杀拉拉裤手机卡案例' }], [{ title: 'jjjjjjjjjjjj' }, { title: 'aklla' }], [{ title: '亲亲亲亲亲亲群群群群群' }, { title: '击杀拉拉裤手机卡案例' }]],
      commision: '',
      workContent: '',
      show: true,
      startTime: '', // 开始时间
      startTimeHM: false, // 开始时间pop
      currentStart: '18:30', // pop默认时间
      currentEnd: '21:30', // pop默认时间
      endTime: '',
      endTimeHM: false,
    };
  },
  methods: {
    // 项目组确定按钮
    onConfirmTeam(value, index) {
      this.commiList = this.commiListAll[index];
      this.commision = this.commiList[0].title;
      this.projectTeam = value;
      this.showPickerTeam = false;
    },
    // 开始时间确定按钮
    onConfirmStartHM(val) {
      this.startTime = val;
      this.startTimeHM = false;
    },
    // 结束时间确定按钮
    onConfirmEndHM(val) {
      this.endTime = val;
      this.endTimeHM = false;
    },
    getCommi(index, val) {
      this.commision = val;
    },
  },
};
</script>
<style lang="less" scoped>
.home_editBox_content{
        margin-top: .5rem;
        border-radius: .5rem;
        background: #ffffff;
        padding: .5rem;
        .ruleForm{
          padding: 0;
          .workTitle{
            line-height: 2rem;
            line-height: 2rem;
          }
        }
      }
</style>
