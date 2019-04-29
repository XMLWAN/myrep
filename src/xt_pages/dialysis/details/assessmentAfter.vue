<template>
  <div class="plate-box">
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>
    <div class="plate">
      <ul>
        <li>
          <label>透后体重 : </label>
          <span class="content" v-if="weight_after!='0'">{{ weight_after }}</span>
          <span class="unit" v-if="weight_after!='0'">kg</span>
        </li>
        <li>
          <label>收缩压 : </label>
          <span class="content" v-if="systolic_blood_pressure!='0'">{{ systolic_blood_pressure }}</span>
          <span class="unit" v-if="systolic_blood_pressure!='0'">mmhg</span>
        </li>
        <li>
          <label>实际超滤量: </label>
          <span class="content" v-if="actual_ultrafiltration!='0'">{{ actual_ultrafiltration }}</span>
          <span class="unit" v-if="actual_ultrafiltration!='0'">ml</span>
        </li>
        <li>
          <label>疑血 : </label>
          <span class="content">{{ cruor }}</span>
        </li>
        <li>
          <label>内瘘 : </label>
          <span class="content">{{ internal_fistula }}</span>
        </li>
        <li>
          <label>导管 : </label>
          <span class="content">{{ catheter }}</span>
        </li>
        <li>
          <label>穿刺处血肿 : </label>
          <span class="content">{{ puncture_point_haematoma_name }}</span>
        </li>
      
        <li v-show="patient_gose==3">
          <label>科室 : </label>
          <span class="content">{{ inpatient_department }}</span>
        </li>
        <!-- <li style="height: 0.6rem;">
          <label></label>
      </li> -->
      </ul>
      <ul>
        <li>
          <label>体重减少 : </label>
          <span class="content"  v-if="weight_loss!='0'">{{ weight_loss }}</span>
          <span class="unit" v-if="weight_loss!='0'">kg</span>
        </li>
        <li>
          <label>舒张压 : </label>
          <span class="content" v-if="diastolic_blood_pressure!='0'">{{ diastolic_blood_pressure }}</span>
          <span class="unit" v-if="diastolic_blood_pressure!='0'">mmhg</span>
        </li>
        <li>
          <label>实际置换量 : </label>
          <span class="content" v-if="actual_displacement!='0'">{{ actual_displacement }}</span>
          <span class="unit" v-if="actual_displacement!='0'">ml</span>
        </li>
        <li>
          <label>透后症状 : </label>
          <span class="content">{{ symptom_after_dialysis }}</span>
        </li>
        <li>
          <label>血管通路部位 : </label>
          <span class="content">{{ blood_access_part }}</span>
        </li>
        <li>
          <label>并发症: </label>
          <span class="content">{{ complication }}</span>
        </li>
        <li>
          <label>压迫后内瘘震颤: </label>
          <span class="content">{{ internal_fistula_tremor_ac_name }}</span>
        </li>
      
        <li v-show="patient_gose==3">
          <label>交待病房护士/患者/陪人观察内容 : </label>
          <span class="content">{{ observation_content }}</span>
        </li>
      </ul>
      <ul>
        <li>
          <label>体温 : </label>
          <span class="content" v-if="temperature!='0'">{{ temperature }}</span>
          <span class="unit" v-if="temperature!='0'">℃</span>
        </li>
        <li>
          <label>脉率 : </label>
          <span class="content" v-if="pulse_frequency!='0'">{{ pulse_frequency }}</span>
          <span class="unit" v-if="pulse_frequency!='0'">次/分</span>
        </li>
        <li>
          <label>实际治疗时长 : </label>
          <span class="content" v-if="actual_treatment_hour!='0'">{{ actual_treatment_hour }}时</span>
          <span class="content" v-if="actual_treatment_minute!='0'">{{ actual_treatment_minute }}分</span>
        </li>
        <li>
          <label>透析中入量: </label>
          <span class="content" v-if="dialysis_intakes_feed!='0'">{{ dialysis_intakes_feed }}</span>
        </li>
        <li>
          <label>血管通路操作: </label>
          <span class="content">{{ blood_access_opera }}</span>
        </li>
        <li>
          <label>拔针后穿刺点渗血: </label>
          <span class="content">{{ puncture_point_oozing_blood_name }}</span>
        </li>
        <li>
          <label>患者去向: </label>
          <span class="content">{{ patient_gose_name }}</span>
        </li>
        <li v-show="patient_gose==3">
          <label>其他观察内容 : </label>
          <span class="content">{{ observation_content_other }}</span>
        </li>
      </ul>
    </div>
    <div class="note">备注 : <span>{{ remark }}</span></div>
    <div class="middleLine"></div>
  </div>    
</template>

<script>
export default {
  name: "DialysisPrescription",
  data() {
    return {
      title: "透后评估 ",
    };
  },
  props: {
    record: {
      type: Object,
    }
  },
  computed: {
    weight_after: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.weight_after
    },
    systolic_blood_pressure: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.systolic_blood_pressure
    },
    actual_ultrafiltration: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.actual_ultrafiltration
    },
    cruor: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.cruor
    },
    internal_fistula: function(){
      if (this.record==null || this.record.id == "") {
        return "-"
      }
      return this.record.internal_fistula;
    },
    weight_loss: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.weight_loss
    },
    inpatient_department:function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.inpatient_department
    },
    patient_gose:function() {
      if (this.record.id == 0) {
        return 0
      }
      return this.record.patient_gose
    },
    diastolic_blood_pressure: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.diastolic_blood_pressure
    },
    actual_displacement: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.actual_displacement
    },
    symptom_after_dialysis: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.symptom_after_dialysis
    },
    blood_access_part:function(){
      if (this.record.id == 0) {
        return "-"
      }
      let vascular_access =  this.$store.getters.vascular_access;
      let valen = vascular_access.length
      let name = '-';

      for (var index in vascular_access) {
        if (vascular_access[index].id == this.record.blood_access_part_id) {
          name = vascular_access[index].name;
          break;
        }
      }
      return name
    },
    puncture_point_oozing_blood_name:function(){
      
      if (this.record.id == 0) {
        return "-"
      }
      switch (this.record.puncture_point_oozing_blood) {
        case 1:
          return '有'
          break;
        case 2:
          return '无'
          break
      
        default:
          return '-'
          break;
      }
    },
    patient_gose_name: function(){
      if (this.record.id == 0) {
        return "-"
      }
      switch (this.record.patient_gose) {
        case 1:
          return '离院'
          break;
        case 2:
          return '留观'
          break
        case 3:
          return '住院'
          break
      
        default:
          return '-'
          break;
      }
    },
    blood_access_opera:function(){
      if (this.record.id == 0) {
        return "-"
      }
      let vascular_access =  this.$store.getters.vascular_access_desc;
      let name = '-';
      for (var index in vascular_access) {
        if (vascular_access[index].id == this.record.blood_access_part_opera_id) {
          name = vascular_access[index].name;
          break;
        }
      }
      return name
    },
    catheter: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.catheter
    },
    puncture_point_haematoma_name: function(){
      if (this.record.id == 0) {
        return "-"
      }
      switch (this.record.puncture_point_haematoma) {
        case 1:
          return '有'
          break;
        case 2:
          return '无'
          break
        default:
          return '-'
          break;
      }
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
    actual_treatment_hour: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.actual_treatment_hour
    },
    actual_treatment_minute: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.actual_treatment_minute
    },
    dialysis_intakes_feed: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.dialysis_intakes
    },
    observation_content_other:function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.observation_content_other
    },
    observation_content:function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.observation_content
    },
    complication: function() {
      if (this.record.id == 0) {
        return "-"
      }
      return this.record.complication
    },
    internal_fistula_tremor_ac_name: function() {
      if (this.record.id == 0) {
        return "-"
      }
      switch (this.record.internal_fistula_tremor_ac) {
        case 1:
          return '存在'
          break;
        case 2:
          return '减弱'
          break;
        case 3:
          return '无';
          break
        default:
          return '-'
          break;
      }
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



