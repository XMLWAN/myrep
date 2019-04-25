<template>
  <div class="plate-box">
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>
    <div class="plate">   
      <ul>
        <li>
          <label>下机护士 : </label>
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
      title: "透析下机 ",
    };
  },
  props: {
    record: {
      type: Object
    },
    admin_map: {
      type: Object,
    },
  },
  computed: {
    stage: function() {
      if (this.record.id == 0) {
        return "未上机"
      }
      return this.record.stage == 1 ? "未下机" : "已下机"
    },
    nurse: function() {
      if (this.record.id == 0) {
        return "-"
      } else if (this.record.stage == 1) {
        return "-"
      } else {
        return this.admin_map[this.record.finish_nurse] == null ? "" : this.admin_map[this.record.finish_nurse].name
      }
    },
  },
  methods: {
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>



