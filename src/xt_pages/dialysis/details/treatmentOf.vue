<template>
  <div class="plate-box">
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>
    <div class="plate " >   
      <ul>
        <li>
          <label>透后宣教 : </label>
          <span class="content">{{ mission }}</span>
        </li>
        <li>
          <label>透析小结 : </label>
          <span class="content">{{ dialysis_summary }}</span>
        </li>
      </ul>
    </div>
    <div class="middleLine"></div>
  </div>    
</template>

<script>
export default {
  name: "DialysisPrescription",
  data() {
    return {
      title: "治疗小结",
    };
  },
  props: {
    record: {
      type: Object,
    }
  },
  computed: {
    mission: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.mission
    },
    dialysis_summary: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.dialysis_summary
    },
  },
  methods: {
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>



