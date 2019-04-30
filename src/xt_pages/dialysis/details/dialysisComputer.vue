<template>
  <div class="plate-box">
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>    
    <div class="plate " >   
      <ul>
        <li>
          <label>上机床位 : </label>
          <span class="content">{{ device_number }}</span>
        </li>
        <li>
          <label>上机护士 : </label>
          <span class="content">{{ nurse }}</span>
        </li>
        <li>
          <label>状态 : </label>
          <span class="content">{{ stage }}</span>
        </li>
      </ul>
    </div>
    <div class="middleLine"></div>
  </div>    
</template>

<script>
export default {
  name: "DialysisComputer",
  data() {
    return {
      title: "透析上机 ",
    };
  },
  props: {
    record: {
      type: Object,
    },
    admin_map: {
      type: Object,
    },
    device_number_map: {
      type: Object,
    }
  },
  computed: {
    device_number: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.device_number_map[this.record.bed_id] == null ? "" : this.device_number_map[this.record.bed_id].number
    },
    nurse: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.admin_map[this.record.start_nurse] == null ? "" : this.admin_map[this.record.start_nurse].name
    },
    stage: function() {
      if (this.record.id == 0) {
        return "未上机"
      }
      return this.record.stage == 1 ? "已上机" : "已下机"
    }
  },
  methods: {
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>



