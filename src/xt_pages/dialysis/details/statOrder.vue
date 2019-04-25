<template>
   <div class="plate-box">
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>
    <table class="table">
      <tr>
        <th width="12%">开嘱医生</th>
        <th width="18%">开始时间</th>
        <th width="31%">医嘱内容</th>
        <th width="18.6%">执行时间</th>
        <th width="10.5%">执行护士</th>
        <th width="9.4%">核对护士</th>
      </tr>
      <tr v-for="(advice, index) in advices" :key="index" :value="advice.value">
        <td>
          <span v-if="isShowStartTime(index, advice)">{{ doctor_map[advice.advice_doctor] != undefined ? doctor_map[advice.advice_doctor].name : "" }}</span>
        </td>
        <td>
          <span v-if="isShowStartTime(index, advice)">{{ parseTime(advice.start_time, "{y}-{m}-{d} {h}:{i}") }}</span>
        </td>
        <td class="advice-name-td">
          <span v-if="advice.parent_id>0">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span >&nbsp;{{advice.advice_name }}</span>
          <span >{{advice.advice_desc}}</span>
          <!-- <span v-if="advice.drug_spec">{{advice.drug_spec}}{{advice.drug_spec_unit}}</span> -->
          <span v-if="advice.prescribing_number">* {{advice.prescribing_number}}{{advice.prescribing_number_unit}}</span>
          <span v-if="advice.single_dose">单次用量 {{advice.single_dose}}{{advice.single_dose_unit}}</span>
          <span >{{advice.delivery_way}}</span>
          <span >{{advice.execution_frequency}}</span>
        </td>
        <td>{{ parseTime(advice.execution_time, "{y}-{m}-{d} {h}:{i}") }}</td>
        <td>{{ advice.execution_staff != 0 ? (doctor_map[advice.execution_staff] != undefined ? doctor_map[advice.execution_staff].name : "") : "" }}</td>
        <td>{{ advice.checker != 0 ? (doctor_map[advice.checker] != undefined ? doctor_map[advice.checker].name : "") : "" }}</td>
      </tr>
      <tr v-if="advices.length == 0">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <div class="middleLine"></div>
  </div>
</template>

<script>
import { parseTime } from "@/utils"

export default {
  name: "statOrder",
  data() {
    return {
      title: "临时医嘱 ",
      tableDate: []
    };
  },
  props: {
    advices: {
      type: Array,
    },
    doctor_map: {
      type: Object,
    }
  },
  methods: {

    isShowStartTime(index, row) {
        if (row.parent_id > 0) {
          return false;
        }else if(index>0 && row.groupno>0 && row.groupno == this.advices[index-1].groupno) {
          return false;
        }
        return true;
    },
    parseTime(time, layout) {
      if (time == 0) {
        return ""
      }
      return parseTime(time, layout)
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table {
  width: 100%;
  overflow: hidden;
  font-size: 15px;
  text-align: center;
  border: $border-color;
  tr {
    padding: 0;
    margin: 0;
    padding: 10px 0;
    .advice-name-td{
      text-align: left;
    };
    th {
      background: $main-color;
      border: none;
      color: #fff;
      padding: 0;
      margin: 0;
      height: 44px;
      line-height: 44px;
      font-weight: normal;
    }
    td {
      background: #f0f5fa;
      border: none;
      padding: 18px 0;
    }
  }
}
</style>



