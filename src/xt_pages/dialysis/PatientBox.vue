<template>
<div>
  <!-- <router-link to="/dialysis/details"> -->
    <div class="patient" v-for="schedule in schedules" :class="borderColor(schedule)"  @click="detailAction(schedule)" :key="schedule.id"> 
        <div class="kehu" >
          <div class="tx">
            <img :src="schedule.patient.avatar.length > 0 ? schedule.patient.avatar : '../../assets/home/analyze.png'" alt="">
            <div class="right">
               <h3 class="name">{{schedule.patient.name}}<span class="yc" v-show="isAbnormal(schedule)">异常</span></h3>
               <span class="num">{{ genderText(schedule) }} | {{ age(schedule) }} 岁</span>
            </div>
          </div>
          <div class="online" v-show="computeState(schedule) != 4" >
            <p :class="stateColor(schedule)">{{stateText(schedule)}}</p>
          </div>
        </div>
      <div class="function" :class="functionColor(schedule)" >
        <ul>
          <li><span class="iconfont">&#xe6f5;</span>班次 : {{timeTypeText(schedule)}}</li>
          <li><span class="iconfont">&#xe6de;</span>床位号 : {{schedule.device_number.number}}</li>
          <li><span class="iconfont">&#xe6f6;</span>透析模式 : {{$store.getters.treatment_mode[schedule.mode_id].name}}</li>
        </ul>
      </div>
    </div>
    <!-- </router-link> -->
</div>
</template>

<script>
import { parseTime } from "@/utils"

export default {
  name: "PatientBox",
  data() {
    return {
      patients: [
        {
          state: 2,
          yc: false,
          name: "张三",
          sex: "女",
          age: 90
        },
        {
          state: 3,
          yc: true,
          name: "张三",
          sex: "女",
          age: 90
        },
        {
          state: 4,
          yc: true,
          name: "张三",
          sex: "女",
          age: 90
        },
        {
          state: 1,
          yc: true,
          name: "张三",
          sex: "女",
          age: 90
        }
      ]
    };
  },
  props: {
    schedules: {
      type: Array,
    }
  },
  methods: {
    stateColor: function(schedual) {
      var state = this.computeState(schedual);
      if (state == 1) {
        return "blue";
      } else if (state == 2) {
        return "gray";
      } else if (state == 3) {
        return "red";
      } else {
        return "blue";
      }
    },
    functionColor: function(schedual) {
      var state = this.computeState(schedual);
      if (state == 1 || state == 3) {
        return "blue";
      } else if (state == 2) {
        return "gray";
      } else {
        return "blue";
      }
    },
    borderColor: function(schedual) {
      var yc = this.isAbnormal(schedual);
      if (yc == true) {
        return "red";
      } else {
        return "gray";
      }
    },
    stateText: function(schedual) {
      var state = this.computeState(schedual);
      if (state == 1) {
        return "已上机";
      } else if (state == 2) {
        return "已下机";
      } else if (state == 3) {
        return "监测中";
      } else {
        // return schedual.patient.gender == 1 ? "男" : "女"
        return "未上机";
      }
    },
    computeState: function(schedual) {
      if (schedual.dialysis_order == null) { // 未上机
        return 4
      } else if (schedual.dialysis_order.stage == 2) { // 已下机
        return 2
      } else if (schedual.dialysis_order.stage == 1 && schedual.monitoring_records != null && schedual.monitoring_records.length > 1) { // 监测中
        return 3
      } else {
        return 1
      }
    },
    
    orderState: function(schedual) {
      if (schedual.dialysis_order == null) { // 未上机
        return 4
      } else if (schedual.dialysis_order.stage == 2) { // 已下机
        return 2
      } else if (schedual.dialysis_order.stage == 1 && schedual.monitoring_records != null && schedual.monitoring_records.length > 1) { // 监测中
        return 3
      } else {
        return 1
      }
    },
    isAbnormal: function(schedual) {
      return false // schedual.yc;
    },
    timeTypeText: function(schedual) {
      if (schedual.schedule_type == 1) {
        return "上午"
      } else if (schedual.schedule_type == 2) {
        return "下午"
      } else {
        return "晚上"
      }
    },
    genderText: function(schedual) {
      if (schedual.patient.gender == 0) {
        return "未知"
      } else if (schedual.patient.gender == 1) {
        return "男"
      } else {
        return "女"
      }
    },
    age: function(schedual) {
      var now = new Date()
      var nowYear = parseTime(now, "{y}")
      var birthdayYear = parseTime(schedual.patient.birthday, "{y}")
      // console.log(nowYear)
      // console.log(birthdayYear)
      return nowYear - birthdayYear
    },
    detailAction: function(schedual) {
      var patient_id = schedual.patient_id
      var date = schedual.schedule_date
      this.$router.push({ path: "/dialysis/details", query: {patient_id: patient_id, date: date, patient_name: schedual.patient.name}})
    }
  }
};
</script>

<style style="stylesheet/scss" lang="scss" scoped>
.patient {
  border: 1px #e5e5ee solid;
  padding: 9px 0;
  margin: 0 0.8% 25px 0.8%;
  float: left;
  width: 31%;
  cursor: pointer;
  .function {
    padding: 15px 5px 0 5px;
    color: #7b8a97;
    ul {
      @include display-flex;
      @include align-items-center;
      @include text-align;
      @include justify-content-between;
      li {
        font-size: 13px;
        @include display-flex;
        @include align-items-center;
        .iconfont {
          margin: 0 5px 0 0;
          font-size: 18px;
        }
      }
    }
  }
  .blue {
    color: $main-color;
    .iconfont {
      color: $main-color;
    }
  }
  .kehu {
    @include display-flex;
    @include align-items-center;
    @include text-align;
    @include justify-content-between;
    border-bottom: 1px #e5e5e5 solid;
    padding: 0 0 10px 20px;
    .tx {
      @include display-flex;
      @include align-items-center;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        float: left;
        margin: 0 15px 0 0;
      }
      .right {
        float: left;
        text-align: left;
        .name {
          font-size: 15px;
          color: #34495e;
          font-weight: bold;
          height: 20px;
          line-height: 20px;
          .yc {
            background: #ff7979;
            color: #fff;
            height: 19px;
            line-height: 19px;
            font-size: 12px;
            width: 37px;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
            margin-left: 6px;
          }
        }
        .num {
          font-size:13px;
          color: #7b8a97;
        }
      }
    }

    .online {
      text-align: center;
      width: 50%;
      border-left: 1px #e5e5e5 solid;
      p {
        background: #c6cdd2;
        color: #fff;
        width:65px;
        height: 24px;
        line-height: 24px;
        border-radius: 4px;
        margin: 0 auto;
        font-size: 12px;
      }
      .blue {
        background: $main-color;
      }
      .red {
        background: #f18f68;
      }
      .green {
        background: #5bd18b;
      }
      .gray {
        background: #a8b3ba;
      }
      .lightGray {
        background: #c6cdd2;
      }
      .time {
        font-size: 26px;
        color: #34495e;
      }
    }
  }
}
.red {
  border: 1px #ff7979 solid;
}
</style>


