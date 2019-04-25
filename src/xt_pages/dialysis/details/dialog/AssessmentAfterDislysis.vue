<template>
    <div class="assessment-after-box">
        <el-dialog
            title="透后评估"
            :visible.sync="isVisibility"
            width="70%"
           >
            <el-form ref="form" :model="form" label-width="130px" >
              <!-- <el-row :gutter="20"> -->
                  <el-row :gutter="20">
                      <el-col :span="8">
                          <el-form-item  label="透后体重(kg): ">
                                <el-input v-model="form.weight_after"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                           <el-form-item  label="体重减少(kg): ">
                                <el-input v-model="form.weight_loss"></el-input>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                            <el-form-item  label="体温(℃): ">
                                <el-input v-model="form.temperature"></el-input>
                        </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20">
                      <el-col :span="8">
                          <el-form-item  label="收缩压(mmhg): ">
                                <el-input v-model="form.systolic_blood_pressure"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                           <el-form-item  label="舒张压(mmhg): ">
                                <el-input v-model="form.diastolic_blood_pressure"></el-input>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                           <el-form-item  label="脉率(次/分): ">
                                <el-input v-model="form.pulse_frequency"></el-input>
                           </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20">
                      <el-col :span="8">
                          <el-form-item  label="实际超滤量(L): ">
                                <el-input v-model="form.actual_ultrafiltration"></el-input>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                           <el-form-item  label="实际置换量(L): ">
                               <el-input v-model="form.actual_displacement"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item  label="实际治疗时长(时):">
                                <!-- <el-input v-model="form.actual_treatment_hour"></el-input> -->
                                <el-time-picker
                                    v-model="actualTreatmentHourShow"
                                    :picker-options="{
                                        selectableRange: '00:01:00 - 23:59:00'
                                    }"
                                    placeholder="透析时长"
                                    style="width:100%;"
                                    value-format="H:m"
                                    format="H:m"
                                    @change="selectActualTreatmentHour"
                                    >
                                </el-time-picker>
                        </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20">
                      <el-col :span="8">
                          <el-form-item  label="凝血: ">
                                <!-- <el-select v-model="form.cruor" >
                                    <el-option v-for="item in cruorOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                                 -->
                                <el-input v-model="form.cruor" readonly @focus="showDialog('1')"></el-input>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item  label="透后症状: ">
                                <el-input v-model="form.symptom_after_dialysis" readonly @focus="showDialog('2')"></el-input>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item  label="透析中入量: ">
                                  <el-input v-model="form.dialysis_intakes"></el-input>
                           </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20">

                      <el-col :span="8">
                          <el-form-item  label="内瘘: ">
                                  <el-input v-model="form.internal_fistula" readonly @focus="showDialog('3')"></el-input>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item  label="血管通路部位: ">
                                <el-select v-model="form.blood_access_part_id" >
                                    <el-option v-for="item in vascularAccessOptions" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                         <el-form-item  label="血管通路操作: ">
                                <el-select v-model="form.blood_access_part_opera_id" >
                                    <el-option v-for="item in vascularAccessDescOptions" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                           </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20">
                      <el-col :span="8">
                           <el-form-item  label="导管: ">
                                <el-input v-model="form.catheter" readonly @focus="showDialog('4')"></el-input>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item  label="并发症: ">
                                <el-input v-model="form.complication" readonly @focus="showDialog('5')"></el-input>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                           <el-form-item  label="拔针后穿刺点渗血: ">
                                <el-radio-group v-model="form.puncture_point_oozing_blood">
                                  <el-radio :label="1">有</el-radio>
                                  <el-radio :label="2">无</el-radio>
                                </el-radio-group>
                           </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row :gutter="20">
                      <el-col :span="8">
                           <el-form-item  label="穿刺处血肿: ">
                                <el-radio-group v-model="form.puncture_point_haematoma">
                                  <el-radio :label="1">有</el-radio>
                                  <el-radio :label="2">无</el-radio>
                                </el-radio-group>
                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                           <el-form-item  label="压迫后内瘘震颤: ">
                               <el-select v-model="form.internal_fistula_tremor_ac" >
                                    <el-option v-for="item in internalFistulaTremorAcOptions" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>

                           </el-form-item>
                      </el-col>
                      <el-col :span="8">
                           <el-form-item  label="患者去向: ">
                               <el-select v-model="form.patient_gose" >
                                    <el-option v-for="item in patientGoseOptions" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                           </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20" v-show="form.patient_gose==3">
                      <el-col :span="24">
                         <el-form-item label="科室: ">
                            <el-input v-model="form.inpatient_department" :rows="5"></el-input>
                         </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row :gutter="20" v-show="form.patient_gose==3">
                      <el-col :span="24">
                         <el-form-item label="交待观察内容: ">
                            <el-input placeholder="交待病房护士/患者/陪人观察内容" v-model="form.observation_content" :rows="5"  readonly @focus="showDialog('6')"></el-input>
                         </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row :gutter="20" v-show="form.patient_gose==3">
                      <el-col :span="24">
                         <el-form-item label="其他观察内容: " >
                            <el-input v-model="form.observation_content_other" :rows="5" ></el-input>
                         </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20">
                      <el-col :span="24">
                         <el-form-item label="备注: ">
                            <el-input type="textarea" v-model="form.remark" :rows="5"></el-input>
                         </el-form-item>
                      </el-col>
                  </el-row>
              <!-- </el-row> -->
            </el-form>

            <span slot="footer" class="dialog-footer" >
                <el-button @click="hide">取 消</el-button>
                <el-button type="primary" @click="submitForm" :loading="loading">确 定</el-button>
            </span>
        </el-dialog>


        <multi-select-box
        :propsForm="InnerDialogProps"
        v-on:dialog-comfirm="DialogComfirm"
        v-on:dialog-cancle="DialogCancle"
        ></multi-select-box>

    </div>
  </template>

<script>
import { getDataConfig } from "@/utils/data";
import MultiSelectBox from "./MultiSelectBox";
import {postAssessmentAfterDislysis} from "@/api/dialysis"
import {uParseTime} from "@/utils/tools";

export default {
  name: "AssessmentAfterDislysis",
  props: {
    assessment_after_dislysis : { // 透后评估
        type: Object,
        default: () => {
            return {id: 0}
        }
    },
    dialysis_order : { // 透析记录
        type: Object,
        default: () => {
            return {id: 0}
        }
    },
    patient : { // 患者信息
        type: Object,
        default: () => {
            return {id: 0}
        }
    },
  },
  data() {
    return {
        loading:false,
        record_date:'',
        isVisibility:false,

        actualTreatmentHourShow: new Date(2018, 1, 1, 3, 0),
        cruorOptions: [],
        symptomsOptions:[],
        internalFistulaOptions:[],
        vascularAccessOptions:[],
        vascularAccessDescOptions:[],
        catheterOptions:[],
        complicationOptions:[],
        internalFistulaTremorAcOptions:[],
        patientGoseOptions:[],
        observationContentOptions:[],


        isVisibiltyForCruorDialog: false,
        dialogCruorTitle:'凝血',

        InnerDialogProps: {
            values: [],
            visibility: false,
            isShowTextArea: true,
            customContent: '',
            titles: '',
            type:'', //不同弹框类型，用来匹配数据
        },

        form: {
            weight_after:'',
            weight_loss:'',
            temperature:'',
            systolic_blood_pressure:'',
            diastolic_blood_pressure:'',
            pulse_frequency:'',
            actual_ultrafiltration:'',
            actual_displacement:'',
            actual_treatment_hour:'',
            actual_treatment_minute:'',
            cruor:'',
            symptom_after_dialysis:'',
            dialysis_intakes:'',
            internal_fistula:'',
            blood_access_part_id:'',
            blood_access_part_opera_id:'',
            catheter:'',
            complication:'',
            puncture_point_oozing_blood:2,
            puncture_point_haematoma:2,
            internal_fistula_tremor_ac:'',
            patient_gose:'',
            inpatient_department:'',
            observation_content:'',
            observation_content_other:'',
            remark:'',
            dialysis_order_id:0,
        }
    };
  },
  watch: {
    "assessment_after_dislysis.id":function () {
        if(this.assessment_after_dislysis.id>0) {
            for(var index in this.form) {
                this.form[index] = this.assessment_after_dislysis[index];
            }


          if(this.assessment_after_dislysis['blood_access_part_id'] == 0){
            this.form['blood_access_part_id'] = ''
          }
          if(this.assessment_after_dislysis['blood_access_part_opera_id'] == 0){
            this.form['blood_access_part_opera_id'] = ''
          }
          if(this.assessment_after_dislysis['internal_fistula_tremor_ac'] == 0){
            this.form['internal_fistula_tremor_ac'] = ''

          }
          if(this.assessment_after_dislysis['patient_gose'] == 0){
            this.form['patient_gose'] = ''


          }

        }
    },
    "dialysis_order.id":function () {
        this.form["dialysis_order_id"] = this.assessment_after_dislysis["dialysis_order_id"];
    },
    "form.patient_gose":function(){
        if(this.form.patient_gose.patient_gose != 3) {
            this.form.inpatient_department = '';
            this.form.observation_content = '';
            this.form.observation_content_other = '';
        }
    }
  },
  methods: {
    submitForm(){
        this.loading = true;
        let ParamsQuery = {};

        if (!(this.patient.id > 0)) {
            this.$message.error("没有选择患者");
            this.loading = false;
            return false;
        }
        if (this.record_date.length != 10) {
            this.$message.error("无效的日期");
            this.loading = false;
            return false;
        }

        ParamsQuery["patient"] = this.patient.id;
        ParamsQuery["record_date"] = this.record_date;

        let data = {};
        data["weight_after"] = this.form.weight_after?parseFloat(this.form.weight_after):0;
        data["weight_loss"] = this.form.weight_loss?parseFloat(this.form.weight_loss):0;
        data["temperature"] = this.form.temperature?parseFloat(this.form.temperature):0;
        data["systolic_blood_pressure"] = this.form.systolic_blood_pressure?parseFloat(this.form.systolic_blood_pressure):0;
        data["diastolic_blood_pressure"] = this.form.diastolic_blood_pressure?parseFloat(this.form.diastolic_blood_pressure):0;
        data["pulse_frequency"] = this.form.pulse_frequency?parseFloat(this.form.pulse_frequency):0;
        data["actual_ultrafiltration"] = this.form.actual_ultrafiltration?parseFloat(this.form.actual_ultrafiltration):0;
        data["actual_displacement"] = this.form.actual_displacement?parseFloat(this.form.actual_displacement):0;
        data["actual_treatment_hour"] = this.form.actual_treatment_hour?parseFloat(this.form.actual_treatment_hour):0;
        data["actual_treatment_minute"] = this.form.actual_treatment_minute?parseFloat(this.form.actual_treatment_minute):0;
        data["cruor"] = this.form.cruor;
        data["symptom_after_dialysis"] = this.form.symptom_after_dialysis;
        data["dialysis_intakes"] = this.form.dialysis_intakes?parseFloat(this.form.dialysis_intakes):0;
        data["internal_fistula"] = this.form.internal_fistula;
        data["blood_access_part_id"] = this.form.blood_access_part_id?parseFloat(this.form.blood_access_part_id):0;
        data["blood_access_part_opera_id"] = this.form.blood_access_part_opera_id?parseFloat(this.form.blood_access_part_opera_id):0;
        data["catheter"] = this.form.catheter;
        data["complication"] = this.form.complication;
        data["puncture_point_oozing_blood"] = this.form.puncture_point_oozing_blood?parseFloat(this.form.puncture_point_oozing_blood):0;
        data["puncture_point_haematoma"] = this.form.puncture_point_haematoma?parseFloat(this.form.puncture_point_haematoma):0;
        data["internal_fistula_tremor_ac"] = this.form.internal_fistula_tremor_ac?parseFloat(this.form.internal_fistula_tremor_ac):0;
        data["patient_gose"] = this.form.patient_gose?parseFloat(this.form.patient_gose):0;
        data["inpatient_department"] = this.form.inpatient_department;
        data["observation_content"] = this.form.observation_content;
        data["observation_content_other"] = this.form.observation_content_other;
        data["remark"] = this.form.remark;
        data["dialysis_order_id"] = this.form.dialysis_order_id?parseFloat(this.form.dialysis_order_id):0;


        postAssessmentAfterDislysis(ParamsQuery, data).then(response => {
            this.loading = false;
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

                var assement = response.data.data.AssessmentAfterDislysis;
                var assessment_after_dislysis = this.assessment_after_dislysis;
                for( var index in assement) {
                    // assessment_after_dislysis[index] = assement[index];
                    this.$set(assessment_after_dislysis, index, assement[index])
                }
                this.hide();

            }
        }).catch(v=>{
            this.loading = false;
        });


    },
    showDialog:function(val){
        this.InnerDialogProps.visibility = true
        switch(val) {
            case '1':
                this.InnerDialogProps.values = this.cruorOptions
                this.InnerDialogProps.titles = '凝血'
                this.InnerDialogProps.type = 'cruor'
                this.InnerDialogProps.selected = this.form.cruor
                this.InnerDialogProps.isShowTextArea = true
                break
            case '2':
                this.InnerDialogProps.values = this.symptomsOptions
                this.InnerDialogProps.titles = '透后症状'
                this.InnerDialogProps.type = 'symptom_after_dialysis'
                this.InnerDialogProps.selected = this.form.symptom_after_dialysis
                this.InnerDialogProps.isShowTextArea = true
                break
            case '3':
                this.InnerDialogProps.values = this.internalFistulaOptions
                this.InnerDialogProps.titles = '内瘘'
                this.InnerDialogProps.type = 'internal_fistula'
                this.InnerDialogProps.selected = this.form.internal_fistula
                this.InnerDialogProps.isShowTextArea = true
                break
            case '4':
                this.InnerDialogProps.values = this.catheterOptions
                this.InnerDialogProps.titles = '导管'
                this.InnerDialogProps.type = 'catheter'
                this.InnerDialogProps.selected = this.form.catheter
                this.InnerDialogProps.isShowTextArea = true
                break
            case '5':
                this.InnerDialogProps.values = this.complicationOptions
                this.InnerDialogProps.titles = '并发症'
                this.InnerDialogProps.type = 'complication'
                this.InnerDialogProps.selected = this.form.complication
                this.InnerDialogProps.isShowTextArea = true
                break
            case '6':
                this.InnerDialogProps.values = this.observationContentOptions
                this.InnerDialogProps.titles = '交待病房护士/患者/陪人观察内容'
                this.InnerDialogProps.type = 'observation_content'
                this.InnerDialogProps.selected = this.form.observation_content
                this.InnerDialogProps.isShowTextArea = false
                break
        }
    },
    selectActualTreatmentHour(val) {
      var valTime = val.split(":");
      this.form.actual_treatment_hour = valTime[0];
      this.form.actual_treatment_minute = valTime[1];
    },
    DialogComfirm:function (val) {
        this.InnerDialogProps.visibility = false
        switch (val.type) {
            case 'cruor':
                this.form.cruor = val.value.join(',');
                break;
            case 'symptom_after_dialysis':
                this.form.symptom_after_dialysis = val.value.join(',');
                break;
            case 'internal_fistula':
                this.form.internal_fistula = val.value.join(',');
                break;
            case 'catheter':
                this.form.catheter = val.value.join(',');
                break;
            case 'complication':
                this.form.complication = val.value.join(',');
                break;
            case 'observation_content':
                this.form.observation_content = val.value.join(',');
                break;

            default:
                break;
        }
        console.log(val);
    },
    DialogCancle: function (val) {
        this.InnerDialogProps.visibility = false
    },

    show() {
        this.isVisibility = true;
    },

    hide() {
        this.isVisibility = false;
    }
  },
  created() {
    this.cruorOptions = getDataConfig("hemodialysis", "cruor");
    this.symptomsOptions = getDataConfig('hemodialysis','symptoms');
    this.internalFistulaOptions = getDataConfig('hemodialysis','internal_fistula')
    this.vascularAccessOptions = getDataConfig('hemodialysis','vascular_access')
    this.vascularAccessDescOptions = getDataConfig('hemodialysis','vascular_access_desc')
    this.catheterOptions = getDataConfig('hemodialysis','catheter')
    this.complicationOptions = getDataConfig('hemodialysis','complication')
    this.internalFistulaTremorAcOptions = this.$store.getters.internal_fistula_tremor_ac;
    this.patientGoseOptions = this.$store.getters.patient_gose;
    this.observationContentOptions = this.$store.getters.observation_content;

    console.log(this.patient)

    var date = this.$route.query && this.$route.query.date;
    this.record_date = uParseTime(date, '{y}-{m}-{d}');

  },
  components: {
    MultiSelectBox
  }
};
</script>

<style scoped>
</style>
