<template>
  <div class="plate-box">
    <h2 class="DetailsTit"><span>{{title}}</span></h2>
    <div class="plate " >   
      <ul>
        <li>
          <label>透前体重 : </label>
          <span class="content">{{ weight_before }}</span>
          <span class="unit">kg</span>
        </li>
        <li>
          <label>收缩压 : </label>
          <span class="content">{{ systolic_blood_pressure }}</span>
          <span class="unit">mmhg</span>
        </li>
        <li>
          <label>前次透析后: </label>
          <span class="content">{{ last_post_dialysis }}</span>
          <span class="unit"></span>
        </li>
        <li>
          <label>导管 : </label>
          <span class="content">{{ catheter }}</span>
          <span class="unit"></span>
        </li>
      </ul>
      <ul>
        <li>
          <label>干体重 : </label>
          <span class="content">{{ dry_weight }}</span>
          <span class="unit">kg</span>
        </li>
        <li>
          <label>舒张压 : </label>
          <span class="content">{{ diastolic_blood_pressure }}</span>
          <span class="unit">mmhg</span>
        </li>
        <li>
          <label>透析期间 : </label>
          <span class="content">{{ dialysis_interphase }}</span>
          <span class="unit"></span>
        </li>
        <li>
          <label>合并症: </label>
          <span class="content">{{ complication }}</span>
          <span class="unit"></span>
        </li>
      </ul>
      <ul>
        <li>
          <label>体温 : </label>
          <span class="content">{{ temperature }}</span>
          <span class="unit">℃</span>
        </li>
        <li>
          <label>心率 : </label>
          <span class="content">{{ pulse_frequency }}</span>
          <span class="unit">次/分</span>
        </li>
        <li>
          <label>透析前症状 : </label>
          <span class="content">{{ symptom_before_dialysis }}</span>
          <span class="unit"></span>
        </li>
        <li>
          <label>出血</label>
          <span class="content">{{ is_hemorrhage ? hemorrhage + ";" + hemorrhage_other : "无" }}</span>
          <span class="unit"> </span>
        </li>
      </ul>
    </div>
    <div class="note">备注 : <span>{{ remark }}</span></div>
    <!-- <div class="note">处方医生 : {{doctor}}</div> -->
    <div class="middleLine"></div>
  </div>    
</template>

<script>
export default {
  name: "assessmentBefore",
  data() {
    return {
      title: "透前评估 ",
    };
  },
  props: {
    record: {
      type: Object
    }
  },
  computed: {
    weight_before: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.weight_before
    },
    systolic_blood_pressure: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.systolic_blood_pressure
    },
    last_post_dialysis: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.last_post_dialysis
    },
    
    dry_weight: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.dry_weight
    },
    diastolic_blood_pressure: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.diastolic_blood_pressure
    },
    dialysis_interphase: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.dialysis_interphase
    },
    catheter: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.catheter
    },

    temperature: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.temperature
    },
    pulse_frequency: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.pulse_frequency
    },
    symptom_before_dialysis: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.symptom_before_dialysis
    },
    complication: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.complication
    },
    internal_fistula: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.internal_fistula
    },
    is_hemorrhage: function() {
      if (this.record.id == 0) {
        return false
      }
      return this.record.is_hemorrhage == 1
    },
    hemorrhage: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.hemorrhage
    },
    hemorrhage_other: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.hemorrhage_other
    },
    
    remark: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.remark
    }
  },
  methods: {
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>



