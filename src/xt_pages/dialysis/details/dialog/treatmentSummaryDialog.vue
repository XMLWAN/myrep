<template>
  <el-dialog
    title="治疗小结"
    width="50%"
    :visible.sync="isVisibility"

  >
    <el-form :model="treatmentSummary">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="宣教知识：">
            <el-select @change="dialysisAfterTeachSelectChange" v-model="value">
              <el-option v-for="(item,index) in education" :label="item.text" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-input type="textarea" v-model="treatmentSummary.mission" :rows="4"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="透析小结：">
            <el-select @change="dialysisSummarySelectChange" v-model="value2">
              <el-option v-for="(item,index) in summary" :label="item.text" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-input type="textarea" v-model="treatmentSummary.dialysis_summary" :rows="4"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancle">取 消</el-button>
      <el-button type="primary" @click="handleComfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getDataConfig} from "@/utils/data";
  import {postTreatmentsummary} from "@/api/dialysis";
  import {uParseTime} from "@/utils/tools";



  export default {
    name: "treatmentSummaryDialog",

    props: {
      treatment_summary : { // 治疗小结
        type: Object,
        default: () => {
          return {id: 0}
        }
      }, patient: { // 患者信息
        type: Object,
        default: () => {
          return {id: 0}
        }
      },

    },
    data() {
      return {
        value:'',
        value2:'',

        isVisibility:false,
        record_date:'',
        education:[],
        summary:[],
        treatmentSummary:{
          mission: "",
          dialysis_summary: "",
          sj_nurse: "",
          zl_nurse: "",
          hd_nurse: "",
          xj_nurse: "",
          zl_doctor: ""
        },
      };
    },
    methods:{
      show() {
        this.isVisibility = true;
      },
      hide() {
        this.isVisibility = false;
      },
      dialysisAfterTeachSelectChange: function (values) {

        if (this.treatmentSummary.mission == "") {
          this.treatmentSummary.mission = values
        } else {
          if (this.treatmentSummary.mission.indexOf(values) == -1) {
            if (this.treatmentSummary.mission.charAt(this.treatmentSummary.mission.length - 1).indexOf('。') == -1) {
              this.treatmentSummary.mission = this.treatmentSummary.mission + "," + values

            } else {
              this.treatmentSummary.mission = this.treatmentSummary.mission + values

            }
          }
        }
      },  dialysisSummarySelectChange: function (values) {
        if (this.treatmentSummary.dialysis_summary == "") {
          this.treatmentSummary.dialysis_summary = values
        } else {
          if (this.treatmentSummary.dialysis_summary.indexOf(values) == -1) {
            if (this.treatmentSummary.dialysis_summary.charAt(this.treatmentSummary.dialysis_summary.length - 1).indexOf('。') == -1) {
              this.treatmentSummary.dialysis_summary = this.treatmentSummary.dialysis_summary + "," + values

            } else {
              this.treatmentSummary.dialysis_summary = this.treatmentSummary.dialysis_summary + "," + values
              this.treatmentSummary.dialysis_summary = this.treatmentSummary.dialysis_summary + values

            }
          }
        }

      },handleCancle:function () {
        this.isVisibility = false;

      },handleComfirm:function () {
        let ParamsQuery = this.treatmentSummary;
        ParamsQuery["patient"] = this.patient.id;
        ParamsQuery["record_date"] = this.record_date;
        postTreatmentsummary(ParamsQuery).then(response => {
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

            let summary_resp = response.data.data.summary;
            //prop
            var treatment_summary = this.treatment_summary;
            for( var index in summary_resp) {
              // treatment_summary[index] = summary_resp[index];
              this.$set(treatment_summary, index, summary_resp[index])
            }

            this.hide()
          }
        });


      }
    },watch: {
      isVisibility(val) {

      },
      "treatment_summary.id": function () {
        if (this.treatment_summary.id > 0) {
          for (var index in this.treatmentSummary) {
            this.treatmentSummary[index] = this.treatment_summary[index];
          }
        }
      },
    }, created() {
      this.education  = getDataConfig('education','education')
      this.summary  = getDataConfig('summary','summary')


      var date = this.$route.query && this.$route.query.date;
      this.record_date = uParseTime(date, '{y}-{m}-{d}');
    },
  }
</script>

<style scoped>

</style>
