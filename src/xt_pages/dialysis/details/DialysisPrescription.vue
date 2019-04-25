<template>
  <div class="plate-box">
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>
    <div class="plate">   
      <ul>
        <li>
          <label>透析模式 : </label>
          <span class="content">{{ dialysis_mode }}</span>
        </li>
        <!-- <li>
          <label>灌流器 : </label>
          <span class="content">{{ perfusion_apparatus }}</span>
        </li> -->
        <li>
          <label>置换量 : </label>
          <span class="content">{{ replacement_total }}</span>
          <span class="unit">L</span>
        </li>
        <li>
          <label>首剂 : </label>
          <span class="content">{{ anticoagulant_shouji }}</span>
          <span class="unit">mg</span>
        </li>
        <li>
          <label>钾 : </label>
          <span class="content">{{ kalium }}</span>
          <span class="unit">mmol/L</span>
        </li>
        <li>
          <label>碳酸氢盐 : </label>
          <span class="content">{{ bicarbonate }}</span>
          <span class="unit">mmol/l</span>
        </li>
        <li>
          <label>透析液流量 : </label>
          <span class="content">{{ dialysate_flow }}</span>
          <span class="unit">ml/min</span>
        </li>
      </ul>
      <ul>
        <li>
          <label>透析时长 : </label>
          <span class="content">{{ dialysis_duration }}</span>
          <span class="unit">h</span>
        </li>
        <li>
          <label>血流量 : </label>
          <span class="content">{{ blood_flow_volume }}</span>
          <span class="unit">ml/min</span>
        </li>
        <!-- <li>
          <label>置换方式 : </label>
          <span class="content">{{ replacement_way }}</span>
        </li> -->
        <li>
          <label>维持 : </label>
          <span class="content">{{ anticoagulant_weichi }}</span>
          <span class="unit">mg/h</span>
        </li>
        <li>
          <label>钠 : </label>
          <span class="content">{{ sodium }}</span>
          <span class="unit">mmol/l</span>
        </li>
        <li>
          <label>葡萄糖 : </label>
          <span class="content">{{ glucose }}</span>
          <span class="unit">mmol/l</span>
        </li>
        <li>
          <label>透析液温度 : </label>
          <span class="content">{{ dialysate_temperature }}</span>
          <span class="unit">℃</span>
        </li>
      </ul>
      <ul>
        <!-- <li>
          <label>透析器 : </label>
          <span class="content">{{ dialyzer }}</span>
        </li> -->
        <li>
          <label>脱水量 : </label>
          <span class="content">{{ prescription_dewatering }}</span>
          <span class="unit">L</span>
        </li>
        <li>
          <label>抗疑剂 : </label>
          <span class="content">{{ anticoagulant }}</span>
        </li>
        <li>
          <label>总量: </label>
          <span class="content">{{ anticoagulant_zongliang }}</span>
          <span class="unit">mg</span>
        </li>
        <li>
          <label>钙: </label>
          <span class="content">{{ calcium }}</span>
          <span class="unit">mmol/l</span>
        </li>
        <li>
          <label>干体重 : </label>
          <span class="content">{{ dry_weight }}</span>
          <span class="unit">kg</span>
        </li>
        <li>
          <label>电导率 : </label>
          <span class="content">{{ conductivity }}</span>
          <span class="unit">mS/cm</span>
        </li>

        <li>
          <label>透析器/灌流器 : </label>
          <span class="content">{{ dialyzer_perfusion_apparatus }}</span>
        </li>
      </ul>
    </div>
    <div class="note">备注 : <span>{{ note }}</span></div>
    <!-- <div class="note">处方医生 : {{doctor}}</div> -->
    <div class="middleLine"></div>
  </div>
</template>

<script>
import { getDataConfig } from "@/utils/data"

export default {
  name: "DialysisPrescription",
  data() {
    return {
      title: "透析处方",
      perfusion_apparatus_map: {},
      replacement_way_map: {},
    };
  },
  props: {
    prescription: {
      type: Object,
    },
    solution: {
      type: Object,
    },
    device_map: {
      type: Object,
    }
  },
  computed: {
    dialysis_mode: function() {
      var mode = this.getValueStr("mode_id", "mode_id")
      if (mode.length == 0) {
        return ""
      }
      if (this.$store.getters.treatment_mode[mode] != undefined) {
        return this.$store.getters.treatment_mode[mode].name
      }
      return ""
    },
    perfusion_apparatus: function() {
      var v = this.getValueStr("perfusion_apparatus", "perfusion_apparatus")
      if (v.length == 0) {
        return ""
      }
      if (this.perfusion_apparatus_map[v] != undefined) {
        return this.perfusion_apparatus_map[v].name
      }
      return ""
    },
    replacement_total: function() {
      var v = this.getValueStr("replacement_total", "replacement_total")
      return v.length == 0 ? "0" : v
    },
    anticoagulant_shouji: function() {
      var v = this.getValueStr("anticoagulant_shouji", "anticoagulant_shouji")
      return v.length == 0 ? "0" : v
    },
    kalium: function() {
      var v = this.getValueStr("kalium", "kalium")
      return v.length == 0 ? "0" : v
    },
    bicarbonate: function() {
      var v = this.getValueStr("bicarbonate", "bicarbonate")
      return v.length == 0 ? "0" : v
    },
    dialysate_flow: function() {
      var v = this.getValueStr("dialysate_flow", "dialysate_flow")
      return v.length == 0 ? "0" : v
    },
    dialysis_duration: function() {
      var v = this.getValueStr("dialysis_duration", "dialysis_duration")
      return v.length == 0 ? "0" : v
    },
    blood_flow_volume: function() {
      var v = this.getValueStr("blood_flow_volume", "blood_flow_volume")
      return v.length == 0 ? "0" : v
    },
    replacement_way: function() {
      var v = this.getValueStr("replacement_way", "replacement_way")
      if (v.length == 0) {
        return ""
      }
      if (this.replacement_way_map[v] != undefined) {
        return this.replacement_way_map[v].name
      }
      return ""
    },
    anticoagulant_weichi: function() {
      var v = this.getValueStr("anticoagulant_weichi", "anticoagulant_weichi")
      return v.length == 0 ? "0" : v
    },
    sodium: function() {
      var v = this.getValueStr("sodium", "sodium")
      return v.length == 0 ? "0" : v
    },
    glucose: function() {
      var v = this.getValueStr("glucose", "glucose")
      return v.length == 0 ? "0" : v
    },
    dialysate_temperature: function() {
      var v = this.getValueStr("dialysate_temperature", "dialysate_temperature")
      return v.length == 0 ? "0" : v
    },
    dialyzer: function() {
      var v = this.getValueStr("dialyzer", "hemodialysis_machine")
      if (v.length == 0) {
        return ""
      }
      if (this.device_map[v] != undefined) {
        return this.device_map[v].name
      }
      return ""
    },
    prescription_dewatering: function() {
      var v = this.getValueStr("prescription_dewatering", "dewater")
      return v.length == 0 ? "0" : v
    },
    anticoagulant: function() {
      var v = this.getValueStr("anticoagulant", "anticoagulant")
      if (v.length == 0) {
        return ""
      }
      if (this.$store.getters.anticoagulants_confit[v] != undefined) {
        return this.$store.getters.anticoagulants_confit[v].name
      }
      return ""
    },
    anticoagulant_zongliang: function() {
      var v = this.getValueStr("anticoagulant_zongliang", "anticoagulant_zongliang")
      return v.length == 0 ? "0" : v
    },
    calcium: function() {
      var v = this.getValueStr("calcium", "calcium")
      return v.length == 0 ? "0" : v
    },
    dry_weight: function() {
      var v = this.getValueStr("dry_weight", "dry_weight")
      return v.length == 0 ? "0" : v
    },
    conductivity: function() {
      var v = this.getValueStr("conductivity", "conductivity")
      return v.length == 0 ? "0" : v
    },
    dialyzer_perfusion_apparatus:function(){
      return this.getValueStr("dialyzer_perfusion_apparatus", "dialyzer_perfusion_apparatus")

    },
    note: function() {
      return this.getValueStr("remark", "remark")
    }
  },
  created() {
    var perfusion_apparatus = getDataConfig("hemodialysis", "perfusion_apparatus")
    var map = {}
    for (let index = 0; index < perfusion_apparatus.length; index++) {
      const p = perfusion_apparatus[index];
      map[p.id] = p
    }
    this.perfusion_apparatus_map = map

    var replacement_ways = getDataConfig("hemodialysis", "replacement_ways")
    var replacement_way_map = {}
    for (let index = 0; index < replacement_ways.length; index++) {
      const r = replacement_ways[index];
      replacement_way_map[r.id] = r
    }
    this.replacement_way_map = replacement_way_map
  },
  methods: {
    getValueStr(pkey, skey) {
      if (this.prescription.id == 0 && this.solution.id == 0) {
        return ""
      } else if (this.prescription.id != 0) {
        if (this.prescription[pkey] == null || this.prescription[pkey] == undefined) {
          return ""
        }
        return this.prescription[pkey] + ""
      } else {
        if (this.solution[skey] == null || this.solution[skey] == undefined) {
          return ""
        }
        return this.solution[skey] + ""
      }
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>



