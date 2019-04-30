<template>
  <div class="plate-box" >
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>
    <div style="width:100%;overflow:hildden;overflow-x:auto;">
    <table  class="table" style="">
      <tr>
        <th width="124px">时间</th>
        <th width="72px">血压(mmhg)</th>
        <th width="80px">心率(次/分)</th>
        <th width="110px">呼吸(次/分)</th>
        <th width="92px">血流量(ml/min)</th>  
        <th width="76px">静脉压(mmhg)</th>
        <th width="76px">跨膜压(mmhg)</th>
        <th width="76px">超滤量(L)</th>
        <th width="92px">钠浓度(mmol/L)</th>
        <th width="92px">透析液温度(℃)</th>
        <th width="92px">置换率(L/h)</th>
        <th width="92px">置换量(L)</th>        
        <th width="92px">病情变化</th>
        <th width="92px">处理</th>
        <th width="92px">结果</th>
      </tr>
      <tr v-for="(monitor, index) in monitores" :key="index">
        <td>{{ parseTime(monitor.operate_time, "{y}-{m}-{d} {h}:{i}") }}</td>
        <td>{{ monitor.systolic_blood_pressure?monitor.systolic_blood_pressure:'' }}/{{ monitor.diastolic_blood_pressure?monitor.diastolic_blood_pressure:'' }}</td>
        <td>{{ monitor.pulse_frequency?monitor.pulse_frequency:'' }}</td>
        <td>{{ monitor.breathing_rate?monitor.breathing_rate:'' }}</td>
        <td>{{ monitor.blood_flow_volume?monitor.blood_flow_volume:'' }}</td>
        <td>{{ monitor.venous_pressure?monitor.venous_pressure:'' }}</td>
        <td>{{ monitor.transmembrane_pressure?monitor.transmembrane_pressure:'' }}</td>
        <td>{{ monitor.ultrafiltration_volume?monitor.ultrafiltration_volume:'' }}</td>
        <td>{{ monitor.sodium_concentration?monitor.sodium_concentration:'' }}</td>
        <td>{{ monitor.dialysate_temperature?monitor.dialysate_temperature:'' }}</td>
        <td>{{ monitor.replacement_rate?monitor.replacement_rate:'' }}</td>
        <td>{{ monitor.displacement_quantity?monitor.displacement_quantity:'' }}</td>        
        <td>{{ monitor.symptom }}</td>
        <td>{{ monitor.dispose }}</td>
        <td>{{ monitor.result }}</td>
      </tr>
      </table>
     </div>
    <div class="middleLine"></div>     
  </div>    
</template>

<script>
import {parseTime} from "@/utils"

export default {
  name: "statOrder",
  data() {
    return {
      title: "透析监测 ",
    };
  },
  props: {
    monitores: {
      type: Array,
    }
  },
  methods: {
    parseTime(time, layout) {
      return parseTime(time, layout)
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.table {
  width: 1500px;
  overflow: auto;
  font-size: 14px;
  text-align: center;
  border: $border-color;
  padding-bottom: 2px;
  tr {
    padding: 0;
    margin: 0;
    padding: 10px 0;
    th {
      background: $main-color;
      border: none;
      color: #fff;
      padding: 0;
      margin: 0;
      height: 44px;
      font-weight: normal;
      padding: 18px 0;
    }
    td {
      background: #f0f5fa;
      border: none;
      padding: 18px 0;
    }
  }
}
</style>



