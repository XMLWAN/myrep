<template>
  <div>
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>
      <div class="ui-step clearfix">
        <ul class="ui-step-ul">
          <li v-for="(step, index) in steps" :key="index" class="ui-step-done" :class="step.finish ? 'ui-step-done' : 'unfinished'">
            <div class="ui-step-number"><i /></div>
            <div class="ui-step-title">{{ step.title }}</div>
          </li>
        </ul>
      </div>
      <ul class="info clearfix">
        <li>  
          <label>姓名 : </label>
          <span>{{ patient.id == 0 ? "" : patient.name }}</span>
        </li>
        <li>
          <label>性别 : </label>
          <span>{{ patient.id == 0 ? "" : (patient.gender == 1 ? "男" : "女") }}</span>
        </li>
        <li>
          <label>出生 : </label>
          <span>{{ birthday }}</span>
        </li>
        <li>
          <label>透析号 : </label>
          <span>{{ patient.dialysis_no }}</span>
        </li>
        <li>
          <label>床位号 : </label>
          <span>{{ device_number }}</span>
        </li>
        <li>
          <label>来源 : </label>
          <span>{{ source }}</span>
        </li>
        <li>
          <label>住院号 : </label>
          <span>{{ patient.admission_number }}</span>
        </li>
    </ul>
    <div class="middleLine"></div>
  </div>
</template>

<script>
import { parseTime } from "@/utils"

export default {
  name: "BasicInfor",
  data() {
    return {
      title:'基本信息',
      // steps: [
      //   { title: "透析处方" },
      //   { title: "接诊评估" },
      //   { title: "透前评估" },
      //   { title: "临时医嘱" },
      //   { title: "透析上机" },
      //   { title: "双人查对" },
      //   { title: "透析监测" },
      //   { title: "透析下机" },
      //   { title: "透后评估" },
      //   { title: "治疗小结" }
      // ]
    };
  },
  props: {
    patient: {
      type: Object,
      default: function() {
        return { id: 0 }
      }
    },
    device_number: {
      type: String,
    },
    steps: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    birthday: function() {
      if (this.patient.id == 0) {
        return ""
      } else {
        return parseTime(this.patient.birthday, "{y}-{m}-{d}")
      }
    },
    source: function() {
      return this.patient.source == 1 ? "门诊" : "住院"
    },
  },
  methods: {
    stepState: function() {
      return parseInt((Math.random() * 1000) + "") % 2 == 1;
    },
  }
};
</script>

<style style="stylesheet/scss" lang="scss" scoped>
.ui-step {
  margin: 20px 30px 0 30px;
  padding: 5px 0 10px 0;
  zoom: 1;
  background: #fff;
  .ui-step-tit {
    font-size: 18px;
    text-align: center;
    color: #34495e;
    font-weight: 700;
    height: 50px;
    line-height: 50px;
  }
  .ui-step-ul {
    list-style: none;
    .ui-step-done {
      float: left;
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      width: 10%;
      &:before,
      &:after {
        position: absolute;
        left: 0;
        top: 21px;
        display: block;
        content: " ";
        content: " ";
        width: 50%;
        height: 1px;
        background: #409eff;
        z-index: 1;
      }
      &:after {
        left: 50%;
      }
      &:first-child:before,
      &:last-child::after {
        width: 0;
      }
      .ui-step-title {
        color: #34495e;
        font-size: 15px;
        font-weight: normal;
        line-height: 18px;
      }
      .ui-step-number {
        position: relative;
        display: inline-block;
        width: 22px;
        height: 22px;
        margin: 10px 0;
        line-height: 22px;
        background: #409eff;
        color: #fff;
        border-radius: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        z-index: 2;
        border: 1px #409eff solid;
        i {
          position: absolute;
          left: 4px;
          top: 6px;
          width: 12px;
          height: 6px;
          border: 2px #fff solid;
          color: #fff;
          z-index: 9;
          border-top: none;
          border-right: none;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
        }
      }
    }
    .unfinished {
      .ui-step-number {
        background: #fff;
        color: #fff;
        border: 1px $main-color solid;
        border-radius: 50%;
      }
    }
  }
}
.info {
    padding:20px 40px;  
    li {
      float: left;
      width: 25%;
      // margin: 0 1rem 0 0;
      font-size: 15px;
      height: 35px;
      line-height: 35px;
      color: #34495e;
    }
  }
</style>

