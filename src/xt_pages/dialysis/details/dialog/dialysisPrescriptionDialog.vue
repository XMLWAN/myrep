<template>
  <el-dialog
    title="透析处方"
    :visible.sync="isVisibility"
    width="70%"
  >


    <el-form ref="dialysisPrescription" :model="dialysisPrescription" label-width="160px">
      <!-- <el-row :gutter="20"> -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="透析模式： ">
            <el-select v-model="dialysisPrescription.mode_id">
              <el-option v-for="item in treatment_mode" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="透析时长(h)： ">
            <el-input type="number" v-model="dialysisPrescription.dialysis_duration_hour"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="透析时长(min)： ">
            <el-input type="number" v-model="dialysisPrescription.dialysis_duration_minute"></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="血流量(ml/min)：">
            <el-input type="number" v-model="dialysisPrescription.blood_flow_volume"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="目标超滤量(ml)：">
            <el-input type="number" v-model="dialysisPrescription.target_ultrafiltration"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="透析液配方：">
            <!-- <el-input type="number" v-model="dialysisPrescription.dialysate_formulation"></el-input> -->
            <el-select v-model="dialysisPrescription.dialysate_formulation"  placeholder="请选择">
              <el-option v-for="(option, index) in dialysate_formulation_options" :key="index" :label="option.name" :value="option.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


      </el-row>

      <el-row :gutter="20">




        <el-col :span="8">
          <el-form-item label="透析液温度(°C)：">
            <el-input type="number" v-model="dialysisPrescription.dialysate_temperature"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="置换量(L)：">
            <el-input type="number" v-model="dialysisPrescription.replacement_total"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="抗凝剂：">
            <el-select v-model="dialysisPrescription.anticoagulant" placeholder="请选择" style="width:100%;"
                       @change="changeThisAnticoagulant">
              <el-option v-for="item in anticoagulantsConfit" :label="item.name" :key="item.id"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


      </el-row>


      <el-row :gutter="20">


        <el-col :span="8" v-if="anticoagulant.shouji != -1">
          <el-form-item :label="'首剂('+anticoagulant.shouji_unit+') : '">
            <el-input type="number" v-model="dialysisPrescription.anticoagulant_shouji"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" v-if="anticoagulant.weichi != -1">
          <el-form-item :label="'维持('+anticoagulant.weichi_unit+') : '" v-if="anticoagulant.weichi != -1">
            <el-input type="number" v-model="dialysisPrescription.anticoagulant_weichi"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="8" v-if="anticoagulant.zongliang != -1">
          <el-form-item :label="'总量('+anticoagulant.zongliang_unit+') : '">
            <el-input type="number" v-model="dialysisPrescription.anticoagulant_zongliang"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="8" v-if="anticoagulant.gaimingcheng != -1">
          <el-form-item label="钙名称 : ">
            <el-input v-model="dialysisPrescription.anticoagulant_gaimingcheng"
                      :disabled="anticoagulant.gaimingcheng==1?false:true" placeholder="钙名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="anticoagulant.gaijiliang != -1">
          <el-form-item label="钙剂量(ml/h) : ">
            <el-input type="number" v-model="dialysisPrescription.anticoagulant_gaijiliang"
                      :disabled="anticoagulant.gaijiliang==1?false:true" placeholder="钙剂量"></el-input>
          </el-form-item>
        </el-col>


      </el-row>


      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="钾(mmol/L)： ">
            <el-input type="number" v-model="dialysisPrescription.kalium"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="钠(mmol/L)：">
            <el-input type="number" v-model="dialysisPrescription.sodium"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="钙(mmol/L)：">
            <el-input type="number" v-model="dialysisPrescription.calcium"></el-input>
          </el-form-item>
        </el-col>


        <!--<el-col :span="8">-->
        <!--<el-form-item label="灌流器： ">-->
        <!--<el-select v-model="dialysisPrescription.perfusion_apparatus">-->
        <!--<el-option v-for="item in perfusion_apparatus" :label="item.name" :value="item.id"-->
        <!--:key="item.id"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->


      </el-row>

      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="碳酸氢盐(mmol/L)：">
            <el-input type="number" v-model="dialysisPrescription.bicarbonate"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="葡萄糖(mmol/L)：">
            <el-input type="number" v-model="dialysisPrescription.glucose"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="透析液流量(ml/min)：">
            <el-input type="number" v-model="dialysisPrescription.dialysate_flow"></el-input>
          </el-form-item>
        </el-col>


      </el-row>

      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="电导率(mS/cm)： ">
            <el-input type="number" v-model="dialysisPrescription.conductivity"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="透析器/灌流器">
            <el-input  v-model="dialysisPrescription.dialyzer_perfusion_apparatus"></el-input>
          </el-form-item>

        </el-col>






        <!--<el-col :span="8">-->
        <!--<el-form-item label="透析器：">-->
        <!--<el-select v-model="dialysisPrescription.dialyzer">-->
        <!--<el-option v-for="item in deviceList" :label="item.name" :value="item.id" :key="item.id"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->


      </el-row>


      <!--<el-row :gutter="20">-->

      <!--<el-col :span="8">-->
      <!--<el-form-item label="脱水量(L)：">-->
      <!--<el-input type="number"  v-model="dialysisPrescription.dewater_amount"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->

      <!--<el-col :span="8">-->
      <!--<el-form-item label="置换液(L)： ">-->
      <!--<el-input type="number"  v-model="dialysisPrescription.displace_liqui"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->


      <!--<el-col :span="8">-->
      <!--<el-form-item label="置换方式： ">-->
      <!--<el-select v-model="dialysisPrescription.region">-->
      <!--<el-option v-for="item in replacement_ways" :label="item.name" :value="item.id"-->
      <!--:key="item.id"></el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!---->


      <!--</el-row>-->

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注： ">
            <el-input type="textarea" v-model="dialysisPrescription.remark" :rows="5"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancle">取 消</el-button>
                <el-button type="primary" @click="handleCommit">确定</el-button>
                <el-button type="primary" @click="handleSolution">保存为长期处方</el-button>

    </span>
  </el-dialog>


</template>

<script>

  import {postPrescription, postSoulution} from "@/api/dialysis";
  import {getDataConfig} from '@/utils/data'
  import {uParseTime} from "@/utils/tools";


  export default {
    name: "dialysisPrescriptionDialog",
    props: {

      prescription: { // 透析处方
        type: Object,
        default: () => {
          return {id: 0}
        }
      },

      solution: { // 长期处方
        type: Object,
        default: () => {
          return {id: 0}
        }
      },

      dialysis_order: { // 透析记录
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      patient: { // 患者信息
        type: Object,
        default: () => {
          return {id: 0}
        }
      },

      devices: {
        type: Array,
        default: function () {
          return new Array();
        }
      }

    },
    data() {
      return {
        isVisibility: false,
        isShowTime: false,
        isClose: false,
        isShow: false,
        record_date: '',
        time: '',
        treatment_mode: [],
        deviceList: [],
        replacement_ways: [],
        anticoagulantsConfit: {},
        dialysate_formulation_options: [],

        dialysisPrescription: {
          replacement_total: "",
          mode_id: "",
          dialysis_duration: "",
          dialysis_duration_hour: "",
          dialysis_duration_minute: "",
          mode_name: "",
          dialyzer: "",
          perfusion_apparatus: "",
          blood_flow_volume: "",
          dewater_amount: "",
          displace_liqui: "",
          replacement_way: "",
          anticoagulant: "",
          anticoagulant_shouji: "",
          anticoagulant_weichi: "",
          anticoagulant_zongliang: "",
          anticoagulant_gaimingcheng: "",
          anticoagulant_gaijiliang: "",
          kalium: "",
          sodium: "",
          calcium: "",
          bicarbonate: "",
          glucose: "",
          dry_weight: "",
          dialysate_flow: "",
          dialysate_temperature: "",
          target_ultrafiltration: "",
          dialysate_formulation: "",
          conductivity: "",
          doctor: "",
          remark: "",
          dialyzer_perfusion_apparatus:"",
        },

        anticoagulant: {
          id: 0,
          name: "",
          type: 1,
          shouji: 1,
          weichi: 1,
          zongliang: 1,
          gaimingcheng: -1,
          gaijiliang: -1,
          shouji_unit: "mg",
          weichi_unit: "mg/h",
          zongliang_unit: "mg",
          gaimingcheng_unit: "",
          gaijiliang_unit: ""
        }

      }
    },
    methods: {
      show() {
        this.isVisibility = true;
      },
      hide() {
        this.isVisibility = false;
      },
      changeThisAnticoagulant: function (val) {
        var thismode = parseInt(val);
        if (isNaN(thismode) || thismode <= 0) {
          return false;
        }
        if (typeof(this.anticoagulantsConfit[thismode]) == 'undefined' || this.anticoagulantsConfit[thismode] == null) {
          return false;
        }
        this.anticoagulant = this.anticoagulantsConfit[thismode];

      }, handleCommit: function () {
        if (this.patient.id <= 0) {
          this.$message.error("没有选择患者")
          this.loading = false
          return
        }

        let ParamsQuery = this.dialysisPrescription;
        ParamsQuery["patient"] = this.patient.id;
        ParamsQuery["record_date"] = this.record_date;

        postPrescription(ParamsQuery).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.$notify({
              title: "成功",
              message: "提交成功",
              type: "success",
              duration: 2000
            });

            let prescription_resp = response.data.data.prescription;
            var prescription = this.prescription;
            for (var index in prescription_resp) {
              // prescription[index] = prescription_resp[index];
              this.$set(prescription, index, prescription_resp[index])
            }
            this.hide()
          }
        });


      }, handleCancle: function () {
        this.hide()

      }, handleSolution: function () {
        if (this.patient.id <= 0) {
          this.$message.error("没有选择患者")
          this.loading = false
          return
        }
        let ParamsQuery = this.dialysisPrescription;
        ParamsQuery["patient"] = this.patient.id;
        ParamsQuery["record_date"] = this.record_date;
        postSoulution(ParamsQuery).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.$notify({
              title: "成功",
              message: "提交成功",
              type: "success",
              duration: 2000
            });
            let prescription_resp = response.data.data.prescription;
            let solution_resp = response.data.data.solution;
            var prescription = this.prescription;
            var solution = this.solution;
            for (var index in prescription_resp) {
              // prescription[index] = prescription_resp[index];
              this.$set(prescription, index, prescription_resp[index])
            }
            for (var index in solution_resp) {
              // solution[index] = solution_resp[index];
              this.$set(solution, index, solution_resp[index])
            }

            this.hide()
          }
        });
      }
    },
    created() {

      this.treatment_mode = this.$store.getters.treatment_mode
      this.perfusion_apparatus = getDataConfig('hemodialysis', 'perfusion_apparatus')
      this.replacement_ways = getDataConfig('hemodialysis', 'replacement_ways')
      this.dialysate_formulation_options = getDataConfig("hemodialysis", "dialysate_formulation")
      this.anticoagulantsConfit = this.$store.getters.anticoagulants_confit
      this.dialysisList = this.devices

      var date = this.$route.query && this.$route.query.date;
      this.record_date = uParseTime(date, '{y}-{m}-{d}');
    },
    watch: {
      isVisibility(val) {

      },
      "prescription.id": function () {
        if (this.prescription.id > 0) {
          for (var index in this.dialysisPrescription) {
            this.dialysisPrescription[index] = this.prescription[index];
          }

          // console.log(this.prescription['dialysate_formulation'])

          if(this.prescription['dialysate_formulation'] == 0){
            this.dialysisPrescription['dialysate_formulation'] = ''
          }

          // else{
          //   this.dialysisPrescription['dialysate_formulation']  = this.prescription['dialysate_formulation']
          //
          // }
          //
          //
          if(this.prescription['anticoagulant'] == 0){
            this.dialysisPrescription['anticoagulant'] = ''
          }
          // else{
          //   this.dialysisPrescription['anticoagulant']  = this.prescription['anticoagulant']
          //
          // }

        }
      },
      "solution.id": function () {
        if (this.solution.id > 0) {
          if (this.prescription != null && typeof(this.prescription.id) != 'undefined' && this.prescription.id > 0) {
            for (const key in this.prescription) {
              this.dialysisPrescription[key] = this.prescription[key];
            }
            if(this.prescription['dialysate_formulation'] == 0){
              this.dialysisPrescription['dialysate_formulation'] = ''
            }

            // else{
            //   this.dialysisPrescription['dialysate_formulation']  = this.prescription['dialysate_formulation']+''
            //
            // }
            //
            //
            if(this.prescription['anticoagulant'] == 0){
              this.dialysisPrescription['anticoagulant'] = ''
            }
            //
            // else{
            //   this.dialysisPrescription['anticoagulant']  = this.prescription['anticoagulant']+''
            //
            // }

          } else if (this.solution != null && typeof this.solution.id != 'undefined' && this.solution.id) {
            for (const key in this.solution) {
              this.dialysisPrescription[key] = this.solution[key];
            }

            if(this.solution['dialysate_formulation'] == 0){
              this.dialysisPrescription['dialysate_formulation'] = ''
            }
            // else{
            //   this.dialysisPrescription['dialysate_formulation']  = this.solution['dialysate_formulation']+''
            //
            // }

            if(this.solution['anticoagulant'] == 0){
              this.dialysisPrescription['anticoagulant'] = ''
            }



          }
        }
      },
    }
  }


</script>

<style scoped>

</style>
