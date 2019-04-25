<template>
  <el-dialog :show-close="isClose" :close-on-click-modal="isClose" :close-on-press-escape="isClose" :title="titles"
             :visible.sync="visibility">


    <el-form :form="form" label-width="130px">

      <el-form-item label="时间: ">
        <el-col :span="9">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.monitoring_date"  value-format="timestamp" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1"> -</el-col>
        <el-col :span="9">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.monitoring_time"
                          style="width: 100%;" format="HH:mm:ss" value-format="HH:mm"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="脉搏(次/分) : ">
        <input placeholder="" v-model="form.pulse_frequency" :style="{ width: inputWidth }" class="symptom">
      </el-form-item>
      <el-form-item label="呼吸(次/分) : ">
        <input placeholder="" v-model="form.breathing_rated" :style="{ width: inputWidth }" class="symptom">
      </el-form-item>

      <el-form-item label="血压(mmHg) : ">
        <!--<el-select v-model="form.blood_pressure_type" placeholder="请选择" style="width:130px;float:left;margin:0 6px 0 0;">-->
          <!--<el-option v-for="item in bloodList" :key="item.id" :label="item.text" :value="item.id"></el-option>-->
        <!--</el-select>-->
        <el-input v-model="form.systolic_blood_pressure" style="width:110px;" placeholder="请输入"></el-input>

        <span> / </span>
        <el-input v-model="form.diastolic_blood_pressure" style="width:110px;" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="血流量(ml/min) : ">
        <input placeholder="" v-model="form.blood_flow_volume" :style="{ width: inputWidth }" class="symptom">
      </el-form-item>

      <el-form-item :label="'静脉压' + '('+form.venous_pressure_unit+')' ">
        <input placeholder="" v-model="form.venous_pressure" :style="{ width: inputWidth }" class="symptom">
        <!--<el-button type="primary" icon="el-icon-sort" size="mini" class="tabIcon" @click="changeVenousPressureUnit"></el-button>-->
      </el-form-item>

      <el-form-item label="动脉压(mmhg) : ">
        <input placeholder="" v-model="form.arterial_pressure" :style="{ width: inputWidth }" class="symptom">
      </el-form-item>

      <el-form-item :label="'跨膜压' + '('+form.transmembrane_pressure_unit+')'">
        <input placeholder="" v-model="form.transmembrane_pressure" :style="{ width: inputWidth }" class="symptom">
        <!--<el-button type="primary" icon="el-icon-sort" size="mini" class="tabIcon" @click="changeTransmembranePressureUnit"></el-button>-->
      </el-form-item>

      <el-form-item label="超滤率(ml/h) : ">
        <input placeholder="" v-model="form.ultrafiltration_rate" :style="{ width: inputWidth }" class="symptom">

      </el-form-item>

      <el-form-item label="超滤量(L) : ">
        <input placeholder="" v-model="form.ultrafiltration_volume" :style="{ width: inputWidth }" class="symptom">
        <!--<el-button type="primary" icon="el-icon-sort" size="mini" class="tabIcon"></el-button>-->
      </el-form-item>

      <el-form-item label="钠浓度(mmol/L) : ">
        <input placeholder="" v-model="form.sodium_concentration" :style="{ width: inputWidth }" class="symptom">

      </el-form-item>

      <el-form-item label="透析液温度(℃) : ">
        <input placeholder="" v-model="form.dialysate_temperature" :style="{ width: inputWidth }" class="symptom">

      </el-form-item>

      <el-form-item label="置换率(ml/min) : ">
        <input placeholder="" v-model="form.replacement_rate" :style="{ width: inputWidth }" class="symptom">

      </el-form-item>

      <el-form-item label="置换量(L) : ">
        <input placeholder="" v-model="form.displacement_quantity" :style="{ width: inputWidth }" class="symptom">

      </el-form-item>

      <el-form-item label="KT/V(在线) : ">
        <input placeholder="" v-model="form.ktv" :style="{ width: inputWidth }" class="symptom">

      </el-form-item>

      <el-form-item label="症状 : ">
        <div @click="symptomClick">
          <input placeholder="请选择" :value="symptoms"   :style="{ width: inputWidth }"
                 class="symptom">
          <span class="arrow"></span>
        </div>

      </el-form-item>
      <el-form-item label="">
        <el-input type="textarea"  :value="symptoms"    :rows="5"
                  :style="{ width: inputWidth }"></el-input>
      </el-form-item>

      <el-form-item label="处理 : ">
        <div @click="dealClick">
          <input placeholder="请选择"  :value="deal"   :style="{ width: inputWidth }" class="symptom">
          <span class="arrow"></span>
        </div>

      </el-form-item>
      <el-form-item label="">
        <el-input type="textarea" :value="deal"   :rows="5"
                  :style="{ width: inputWidth }"></el-input>
      </el-form-item>

      <el-form-item label="结果 : ">
        <div @click="resultsClick">
          <input placeholder="请选择" :value="results"   :style="{ width: inputWidth }"
                 class="symptom">
          <span class="arrow"></span>
        </div>

      </el-form-item>
      <el-form-item label="">
        <el-input type="textarea" :value="results" :rows="5"
                  :style="{ width: inputWidth }"></el-input>
      </el-form-item>

      <!--<el-form-item label="监测护士 : ">-->
        <!--<el-select v-model="form.monitoring_nurse" placeholder="请选择">-->
          <!--<el-option v-for="(item, index) in nurseList" :label="item.name" :value="item.id"-->
                     <!--:key="index"></el-option>-->
        <!--</el-select>-->

        <!--<span class="arrow"></span>-->
      <!--</el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="comfirm">确 定</el-button>
      <el-button @click="cancle">取 消</el-button>
    </div>
  </el-dialog>
</template>


<script>
  export default {
    name: "AddMonitor",
    props: {
      visibility: {
        type: Boolean,
        default: false
      },
      values: {
        type: Array,
        default() {
          return []
        }
      },
      titles: {
        type: String,
        default: "",
      },
      symptoms: {
        type: String,
        default: "",
      },
      deal: {
        type: String,
        default: "",
      },
      results: {
        type: String,
        default: "",
      },
      nurseList: {
        type: Array,
        default() {
          return []
        }
      },
      form:{
        type: Object,
        default() {
          return {}
        }
      }
    },

    data() {
      return {
        isClose:false,
        Visible: true,
        formLabelWidth: "130px",
        inputWidth: "370px",
        bloodList: [
          {id: 1, text: '上肢', value: 1},
          {id: 2, text: '下肢', value: 2},
          {id: 3, text: '拒测', value: 3},
          {id: 4, text: '测不出来', value: 4},
        ],
        // form: {
        //   monitoring_date: "",
        //   monitoring_time: "",
        //   pulse_frequency: "",
        //   breathing_rated: "",
        //   blood_pressure_type: "",
        //   systolic_blood_pressure: "",
        //   diastolic_blood_pressure: "",
        //   blood_flow_volume: "",
        //   venous_pressure: "",
        //   arterial_pressure:"",
        //   transmembrane_pressure: "",
        //   Transme: "",
        //   ultrafiltration_rate: "",
        //   ultrafiltration_volume: "",
        //   sodium_concentration: "",
        //   dialysate_temperature: "",
        //   replacement_rate: "",
        //   displacement_quantity: "",
        //   ktv: "",
        //   monitoring_nurse: "",
        //   venous_pressure_unit:"mmhg",
        //   transmembrane_pressure_unit:"mmhg",
        //
        // },

      };
    },
    methods: {
      comfirm: function () {
        let returnValue = {

        }
        returnValue['value'] = this.getValue()
        console.log(this.getValue())
        returnValue['title'] = this.titles
        this.$emit('dialog-comfirm', returnValue);
      },
      cancle: function () {
        this.$emit('dialog-cancle', this.titles);
      },

      getValue: function () {
        this.form['symptom'] = this.symptoms
        this.form['dispose'] = this.deal
        this.form['results'] = this.results
        return this.form
      },
      symptomClick:function () {
        this.$emit('symptom-click');

      },
      dealClick:function () {
        this.$emit('deal-click');

      },
      resultsClick:function () {
        this.$emit('result-click');

      },
      changeVenousPressureUnit:function () {

        if(this.form.venous_pressure_unit == 'mmhg'){
          this.form.venous_pressure_unit = 'kpa'
        }else{
          this.form.venous_pressure_unit = 'mmhg'
        }
      },
      changeTransmembranePressureUnit:function () {

        if(this.form.transmembrane_pressure_unit == 'mmhg'){
          this.form.transmembrane_pressure_unit = 'kpa'
        }else{
          this.form.transmembrane_pressure_unit = 'mmhg'
        }
      },

    }
  };
</script>

<style rel="stylesheet/css" lang="scss" scoped>
  .symptom::-webkit-input-placeholder {
    color: #c0c4cc;
  }

  .symptom {
    border: none;
    border-bottom: 1px solid #dcdfe6;
    outline: none;
    height: 36px;
    line-height: 36px;
    padding: 0 0 0 15px;
    position: relative;
    cursor: pointer;
  }

  .arrow::before {
    content: "";
    width: 8px;
    height: 8px;
    border-left: 2px solid #dcdfe6;
    border-bottom: 2px solid #dcdfe6;
    transform: rotate(225deg);
    -webkit-transform: rotate(225deg);
    position: absolute;
    right: 64px;
    top: 16px;
    position: absolute;
  }

  .tabIcon {
    content: "";
    width: auto;
    height: auto;
    position: absolute;
    right: 60px;
    top: 2px;
    position: absolute;
  }
</style>

