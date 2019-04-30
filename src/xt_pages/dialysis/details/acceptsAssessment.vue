<template>
  <div class="plate-box">
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>
    <div class="plate " >   
      <ul>
        <li>
          <label>入室方式 : </label>
          <span class="content">{{ way }}</span>
        </li>
        <li>
          <label>病人情况 : </label>
          <span class="content">{{ condition }}</span>
        </li>
      </ul>
      <ul>
        <li>
          <label>病人意识 : </label>
          <span class="content">{{ consciousness }}</span>
        </li>
        <li>
          <label>体位 : </label>
          <span class="content">{{ posture }}</span>
        </li>
      </ul>
      <ul>
        <li>
          <label>病人食欲 : </label>
          <span class="content">{{ appetite }}</span>
        </li>
        <li style="height: 30px;">
          <label> </label>
          <span class="content"> </span>
        </li>
      </ul>
    </div>
    <!-- <div class="note">处方医生 : {{doctor}}</div> -->
    <div class="middleLine"></div>

  </div>    
</template>

<script>
export default {
  name: "AcceptsAssessment",
  data() {
    return {
      title: "接诊评估 ",

      ways: {
        "1": "步行",
        "2": "扶行",
        "3": "轮椅",
        "4": "平车",
      },
      conditions: {
        "1": "住院",
        "2": "门诊",
        "3": "手术期",
      },
      consciousnesses: {
        "1": "清醒",
        "2": "嗜睡",
        "3": "昏迷",
      },
      appetites: {
        "1": "正常",
        "2": "减退",
        "3": "恶心",
        "4": "呕吐",
        "5": "腹泻",
      },
      postures: {
        "1": "自动体位",
        "2": "平卧位",
        "3": "半卧位",
        "4": "端坐位",
        "5": "躁动不安",
      }
    };
  },
  props: {
    record: {
      type: Object
    }
  },
  computed: {
    way: function() {
      if (this.record.id == 0) {
        return ""
      } else {
        return this.ways[this.record.way] == undefined ? "" : (this.ways[this.record.way] + "")
      }
    },
    condition: function() {
      if (this.record.id == 0) {
        return ""
      } else {
        return this.conditions[this.record.condition] == undefined ? "" : this.conditions[this.record.condition] + ""
      }
    },
    consciousness: function() {
      if (this.record.id == 0) {
        return ""
      } else {
        return this.consciousnesses[this.record.consciousness] == undefined ? "" : this.consciousnesses[this.record.consciousness] + ""
      }
    },
    appetite: function() {
      if (this.record.id == 0) {
        return ""
      } else {
        return this.appetites[this.record.appetite] == undefined ? "" : this.appetites[this.record.appetite] + ""
      }
    },
    posture: function() {
      if (this.record.id == 0) {
        return ""
      } else {
        return this.postures[this.record.posture] == undefined ? "" : this.postures[this.record.posture] + ""
      }
    }
  },
  methods: {
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>



