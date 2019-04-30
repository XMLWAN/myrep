<template>
  <el-dialog
    title="透前评估"
    :visible.sync="isVisibility"

    width="70%"
  >

    <!--<check-box-dialog-->
    <!--:propsForm="InnerDialogProps"-->
    <!--v-on:dialog-comfirm="innerDialogComfirm"-->
    <!--v-on:dialog-cancle="innerDialogCancle"-->
    <!--&gt;</check-box-dialog>-->

    <multi-select-box
      :propsForm="InnerDialogProps"
      v-on:dialog-comfirm="innerDialogComfirm"
      v-on:dialog-cancle="innerDialogCancle"
    ></multi-select-box>


    <el-form ref="assessmentBeforeDislysis" :model="assessmentBeforeDislysis" label-width="125px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="透前体重(kg)： ">
            <el-input type="number" v-model="assessmentBeforeDislysis.weight_before"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="干体重(kg)：">
            <el-input type="number" v-model="assessmentBeforeDislysis.dry_weight"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="体温(℃)：">
            <el-input type="number" v-model="assessmentBeforeDislysis.temperature"></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="内瘘: ">
            <el-input v-model="assessmentBeforeDislysis.internal_fistula" readonly
                      @focus="showInnerDialog('7')"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="内瘘皮肤情况: ">
            <el-input v-model="assessmentBeforeDislysis.internal_fistula_skin" readonly
                      @focus="showInnerDialog('8')"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="导管： ">
            <el-input v-model="assessmentBeforeDislysis.catheter" @focus="showInnerDialog('4')"></el-input>
          </el-form-item>
        </el-col>


        <!--<el-col :span="8">-->
        <!--<el-form-item label="附加物重(kg)： ">-->
        <!--<el-input type="number" v-model="assessmentBeforeDislysis.additional_weight"></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->

      </el-row>


      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="导管打折： ">
            <el-select v-model="assessmentBeforeDislysis.catheter_bend">
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="收缩压(mmhg)： ">
            <el-input type="number" v-model="assessmentBeforeDislysis.systolic_blood_pressure"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="舒张压(mmhg)： ">
            <el-input type="number" v-model="assessmentBeforeDislysis.diastolic_blood_pressure"></el-input>
          </el-form-item>
        </el-col>


      </el-row>


      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="脉率(次/分)：">
            <el-input type="number" v-model="assessmentBeforeDislysis.pulse_frequency"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">

          <el-form-item label="血管通路部位： ">
            <el-select v-model="assessmentBeforeDislysis.blood_access_part_id">
              <el-option v-for="item in blood_access_part" :label="item.name" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="血管通路操作： ">
            <el-select v-model="assessmentBeforeDislysis.blood_access_part_opera_id">
              <el-option v-for="item in blood_access_part_opera" :label="item.name" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


      </el-row>


      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="并发症： ">
            <el-input v-model="assessmentBeforeDislysis.complication" @focus="showInnerDialog('5')"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="前次透析后：">
            <el-input v-model="assessmentBeforeDislysis.last_post_dialysis" @focus="showInnerDialog('1')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="透析期间： ">

            <el-input v-model="assessmentBeforeDislysis.dialysis_interphase" @focus="showInnerDialog('2')">></el-input>


          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="透析前症状： ">
            <el-input v-model="assessmentBeforeDislysis.symptom_before_dialysis"
                      @focus="showInnerDialog('3')"></el-input>

          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="出血： ">
            <el-select v-model="assessmentBeforeDislysis.is_hemorrhage">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" v-if="assessmentBeforeDislysis.is_hemorrhage == 1">
          <el-form-item label="出血选项： ">
            <div>
              <el-input v-model="assessmentBeforeDislysis.hemorrhage" @focus="showInnerDialog('6')"></el-input>
            </div>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="8" v-if="assessmentBeforeDislysis.is_hemorrhage == 1">
          <el-form-item label="其他出血情况： ">
            <el-input v-model="assessmentBeforeDislysis.hemorrhage_other"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注： ">
            <el-input type="textarea" v-model="assessmentBeforeDislysis.remark" :rows="5"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancle">取 消</el-button>
                <el-button type="primary" @click="handleComfirm">确 定</el-button>
            </span>
  </el-dialog>


</template>

<script>
  import multiSelectBox from './MultiSelectBox'
  import {getDataConfig} from '@/utils/data'
  import {postAssessmentBeforeDislysis} from "@/api/dialysis"

  import {uParseTime} from "@/utils/tools";

  export default {
    components: {
      multiSelectBox,
    },
    name: "assessment-after-dislysis-dialog",
    data() {
      return {
        isVisibility: false,
        actualTreatmentHourShow: new Date(2018, 1, 1, 3, 0),
        record_date: '',
        cruorOptions: [],
        last_dialysis_after: [],
        dialysis_interphase: [],
        symptom_before_dialysis: [],
        catheter: [],
        complication: [],
        hemorrhage: [],
        blood_access_part: [],
        blood_access_part_opera: [],
        internal_fistula: [],
        internal_fistula_skin: [],
        isVisibiltyForCruorDialog: false,
        assessmentBeforeDislysis: {
          catheter_bend: '',
          internal_fistula_skin: '',
          weight_before: '',
          additional_weight: '',
          temperature: '',
          dry_weight:'',
          systolic_blood_pressure: '',
          diastolic_blood_pressure: '',
          symptom_before_dialysis: '',
          pulse_frequency: '',
          last_post_dialysis: '',
          dialysis_interphase: '',
          catheter: '',
          complication: '',
          remark: '',
          blood_access_part_id: '',
          blood_access_part_opera_id: '',
          internal_fistula: '',
          is_hemorrhage: '',
          hemorrhage: "",
          hemorrhage_other: "",
        },
        // InnerDialogProps: {
        //   checkedCities: [],
        //   values: [],
        //   visibility: false,
        //   isShowTextArea: true,
        //   customData: '',
        //   titles: '',
        //   type: '', //不同弹框，用来匹配数据
        // }

        InnerDialogProps: {
          values: [],
          visibility: false,
          isShowTextArea: true,
          customContent: '',
          titles: '',
          type: '', //不同弹框类型，用来匹配数据
        },


      };
    },
    props: {

      predialysis_evaluation: { // 透前评估
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
    },
    methods: {
      show() {
        this.isVisibility = true;
      },
      hide() {
        this.isVisibility = false;
      },
      showInnerDialog: function (val) {
        this.InnerDialogProps.visibility = true
        switch (val) {
          case '1': //前次透析后

            this.InnerDialogProps.values = this.last_dialysis_after
            this.InnerDialogProps.titles = '前次透析后'
            this.InnerDialogProps.type = 'last_dialysis_after'
            this.InnerDialogProps.selected = this.assessmentBeforeDislysis.last_post_dialysis
            this.InnerDialogProps.isShowTextArea = true

            break
          case '2': //透析期间

            this.InnerDialogProps.values = this.dialysis_interphase
            this.InnerDialogProps.titles = '透析期间'
            this.InnerDialogProps.type = 'dialysis_interphase'
            this.InnerDialogProps.selected = this.assessmentBeforeDislysis.dialysis_interphase
            this.InnerDialogProps.isShowTextArea = true
            break


            break
          case '3': //透析前症状

            this.InnerDialogProps.values = this.symptom_before_dialysis
            this.InnerDialogProps.titles = '透析期间'
            this.InnerDialogProps.type = 'symptom_before_dialysis'
            this.InnerDialogProps.selected = this.assessmentBeforeDislysis.symptom_before_dialysis
            this.InnerDialogProps.isShowTextArea = true
            break


          case '4': //导管

            this.InnerDialogProps.values = this.catheter
            this.InnerDialogProps.titles = '导管'
            this.InnerDialogProps.type = 'catheter'
            this.InnerDialogProps.selected = this.assessmentBeforeDislysis.catheter
            this.InnerDialogProps.isShowTextArea = true
            break


            break
          case '5': //并发症

            this.InnerDialogProps.values = this.complication
            this.InnerDialogProps.titles = '并发症'
            this.InnerDialogProps.type = 'complication'
            this.InnerDialogProps.selected = this.assessmentBeforeDislysis.complication
            this.InnerDialogProps.isShowTextArea = true


            break

          case '6': //出血选项

            this.InnerDialogProps.values = this.hemorrhage
            this.InnerDialogProps.titles = '出血选项'
            this.InnerDialogProps.type = 'hemorrhage'
            this.InnerDialogProps.selected = this.assessmentBeforeDislysis.hemorrhage
            this.InnerDialogProps.isShowTextArea = false


            break
          case '7': //内瘘

            this.InnerDialogProps.values = this.internal_fistula
            this.InnerDialogProps.titles = '内瘘'
            this.InnerDialogProps.type = 'internal_fistula'
            this.InnerDialogProps.selected = this.assessmentBeforeDislysis.internal_fistula
            this.InnerDialogProps.isShowTextArea = false


            break
          case '8': //内瘘皮肤情况
            this.InnerDialogProps.values = this.internal_fistula_skin
            this.InnerDialogProps.titles = '内瘘皮肤情况'
            this.InnerDialogProps.type = 'internal_fistula_skin'
            this.InnerDialogProps.selected = this.assessmentBeforeDislysis.internal_fistula_skin
            this.InnerDialogProps.isShowTextArea = false

            break

        }

      }, innerDialogComfirm: function (val) {
        this.InnerDialogProps.visibility = false
        switch (val.type) {
          case 'last_dialysis_after':
            this.assessmentBeforeDislysis.last_post_dialysis = val.value.join(',')
            break
          case 'dialysis_interphase':
            this.assessmentBeforeDislysis.dialysis_interphase = val.value.join(',')

            break
          case 'symptom_before_dialysis':
            this.assessmentBeforeDislysis.symptom_before_dialysis = val.value.join(',')

            break
          case 'catheter':
            this.assessmentBeforeDislysis.catheter = val.value.join(',')

            break
          case 'complication':
            this.assessmentBeforeDislysis.complication = val.value.join(',')

            break
          case 'hemorrhage':
            this.assessmentBeforeDislysis.hemorrhage = val.value.join(',')
            break
          case 'internal_fistula':
            this.assessmentBeforeDislysis.internal_fistula = val.value.join(',')
            break
          case 'internal_fistula_skin':
            this.assessmentBeforeDislysis.internal_fistula_skin = val.value.join(',')
            break

        }


      }, innerDialogCancle: function () {
        this.InnerDialogProps.visibility = false
      }, handleComfirm: function () {
        let ParamsQuery = this.assessmentBeforeDislysis;
        ParamsQuery["patient"] = this.patient.id;
        ParamsQuery["record_date"] = this.record_date;
        postAssessmentBeforeDislysis(ParamsQuery).then(response => {
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

            let assessment_before_dislysis_resp = response.data.data.assessmentBeforeDislysis;
            //prop
            var predialysis_evaluation = this.predialysis_evaluation;
            for (var index in assessment_before_dislysis_resp) {
              // predialysis_evaluation[index] = assessment_before_dislysis_resp[index];
              this.$set(predialysis_evaluation, index, assessment_before_dislysis_resp[index])
            }
            this.hide()
          }
        });

      }, handleCancle: function () {
        this.isVisibility = false

      },

    },
    created() {
      this.last_dialysis_after = getDataConfig('hemodialysis', 'last_dialysis_after')
      this.dialysis_interphase = getDataConfig('hemodialysis', 'dialysis_duration')
      this.symptom_before_dialysis = getDataConfig('hemodialysis', 'dialysis_before')
      this.catheter = getDataConfig('hemodialysis', 'catheter')
      this.complication = getDataConfig('hemodialysis', 'complication')
      this.hemorrhage = getDataConfig('hemodialysis', 'hemorrhage')
      this.internal_fistula = getDataConfig('hemodialysis', 'internal_fistula')
      this.blood_access_part = getDataConfig('hemodialysis', 'vascular_access')
      this.blood_access_part_opera = getDataConfig('hemodialysis', 'vascular_access_desc')
      this.internal_fistula_skin = getDataConfig('hemodialysis', 'internal_fistula_skin')
      var date = this.$route.query && this.$route.query.date;
      this.record_date = uParseTime(date, '{y}-{m}-{d}');

    }, watch: {
      isVisibility(val) {

      },
      "predialysis_evaluation.id": function () {
        if (this.predialysis_evaluation.id > 0) {
          for (var index in this.assessmentBeforeDislysis) {
            this.assessmentBeforeDislysis[index] = this.predialysis_evaluation[index];

          }
          // this.assessmentBeforeDislysis['catheter_bend'] = this.predialysis_evaluation['catheter_bend'].toString()
          // this.assessmentBeforeDislysis['is_hemorrhage'] = this.predialysis_evaluation['is_hemorrhage'].toString()
          if(this.predialysis_evaluation['catheter_bend'] == 0){
            this.assessmentBeforeDislysis['catheter_bend'] = ''
          }else{
            this.assessmentBeforeDislysis['catheter_bend']  = this.predialysis_evaluation['catheter_bend']+''
          }
          if(this.predialysis_evaluation['is_hemorrhage'] == 0){
            this.assessmentBeforeDislysis['is_hemorrhage'] = ''
          }else{
            this.assessmentBeforeDislysis['is_hemorrhage']  = this.predialysis_evaluation['is_hemorrhage']+''
          }
          if(this.predialysis_evaluation['blood_access_part_id'] == 0){
            this.assessmentBeforeDislysis['blood_access_part_id'] = ''
          }
          if(this.predialysis_evaluation['blood_access_part_opera_id'] == 0){
            this.assessmentBeforeDislysis['blood_access_part_opera_id'] = ''
          }
          if(this.predialysis_evaluation['weight_before'] == 0){
            this.assessmentBeforeDislysis['weight_before'] = ''
          }
          if(this.predialysis_evaluation['dry_weight'] == 0){
            this.assessmentBeforeDislysis['dry_weight'] = ''
          }
          if(this.predialysis_evaluation['temperature'] == 0){
            this.assessmentBeforeDislysis['temperature'] = ''
          }
          if(this.predialysis_evaluation['systolic_blood_pressure'] == 0){
            this.assessmentBeforeDislysis['systolic_blood_pressure'] = ''
          }
          if(this.predialysis_evaluation['diastolic_blood_pressure'] == 0){
            this.assessmentBeforeDislysis['diastolic_blood_pressure'] = ''
          }
          if(this.predialysis_evaluation['pulse_frequency'] == 0){
            this.assessmentBeforeDislysis['pulse_frequency'] = ''
          }
          if(this.predialysis_evaluation['pulse_frequency'] == 0){
            this.assessmentBeforeDislysis['pulse_frequency'] = ''
          }
        }
      },
    }
  }


</script>

<style scoped>

</style>
