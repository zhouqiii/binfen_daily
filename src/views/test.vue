<template>
    <div>
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
</template>
<script>

export default {
  name: 'Test',
  data() {
    return {
      projectTeam: '',
      showPickerTeam: false,
      teamSelects: ['1', '2'],
    };
  },
  methods: {
    onConfirmTeam(value) {
      this.projectTeam = value;
      this.showPickerTeam = false;
    },
  },
};
</script>
