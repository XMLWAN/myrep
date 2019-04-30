<template>
    <div>
        <div class="grid">
            <div class="list">
                <ul>
                    <li @click="showPrescription">
                        <img src="@/assets/record/1.png">
                        <p>透析处方</p>
                    </li>
                    <li @click="showAccepts">
                        <img src="@/assets/record/2.png">
                        <p>接诊评估</p>
                    </li>
                    <li @click="showAssessmentBefore">
                        <img src="@/assets/record/3.png">
                        <p>透前评估</p>
                    </li>
                    <li @click="showDoctorAdviceDialog">
                        <img src="@/assets/record/4.png">
                        <p>临时医嘱</p>
                    </li>
                    <li @click="showDoubleCheck">
                        <img src="@/assets/record/5.png">
                        <p>双人核对</p>
                    </li>
                </ul>
            </div>
            <div class="list">
                <ul>
                    <li @click="showComputerDialog">
                        <img src="@/assets/record/6.png" >
                        <p>透析上机</p>
                    </li>
                    <li @click="showMonitorDialog">
                        <img src="@/assets/record/7.png" >
                        <p>透析监测</p>
                    </li>
                    <li @click="showFinishDialog">
                        <img src="@/assets/record/8.png" >
                        <p>透析下机</p>
                    </li>
                    <li @click="showAssessmentAfterDialog">
                        <img src="@/assets/record/9.png" >
                        <p>透后评估</p>
                    </li>
                    <li @click="showrTeatmentSummary" >
                        <img src="@/assets/record/10.png" >
                        <p>治疗小结</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="middleLine"></div>

        <dialysis-prescription-dialog title="透析处方" ref="prescription" :patient="patient" :prescription="prescription" :solution="solution"></dialysis-prescription-dialog>

        <double-check-dialog title="双人核对" ref="doubleCheck" :patient="patient" :double_check="double_check" :admin_users="admin_users" ></double-check-dialog>

        <accepts-treatment-dialog title="接诊评估" ref="accepts" :patient="patient" :receiver_treatment_access="receiver_treatment_access"></accepts-treatment-dialog>

        <assessment-before-dislysis-dialog title="透前评估" ref="assessmentBefore" :patient="patient" :predialysis_evaluation="predialysis_evaluation"></assessment-before-dislysis-dialog>

        <treatment-summary-dialog title="治疗小结" ref="treatmentSummary" :patient="patient" :treatment_summary="treatment_summary"></treatment-summary-dialog>

        <doctor-advice-dialog title="临时医嘱" ref="doctor_advice" :doctor_advices="doctor_advices" :patient="patient" :admin_users="admin_users" :dialysis_order="dialysis_order"></doctor-advice-dialog>

        <computer-dialog title="透析上机" ref="computer_dialog" :dialysis_order="dialysis_order" :schedule="schedual" :admins="admin_users" :device_numbers="device_numbers"></computer-dialog>

        <monitor-dialog title="透析监测" ref="monitor_dialog" :monitors="monitor_records"></monitor-dialog>

        <finish-dialog title="透析下机" ref="finish_dialog" :dialysis_order="dialysis_order" :schedule="schedual" :admins="admin_users"></finish-dialog>

        <assessment-after-dislysis title="透后评估" ref="assessment_after_dislysis" :assessment_after_dislysis="assessment_after_dislysis" :patient="patient"  :dialysis_order="dialysis_order"></assessment-after-dislysis>
    </div>
</template>

<script>
import dialysisPrescriptionDialog from './dialog/dialysisPrescriptionDialog'
import doubleCheckDialog from './dialog/doubleCheckDialog'
import AssessmentAfterDislysis from './dialog/AssessmentAfterDislysis'
import acceptsTreatmentDialog from './dialog/acceptsTreatmentDialog'
import assessmentBeforeDislysisDialog from './dialog/assessmentBeforeDislysisDialog'
import MonitorDialog from "./dialog/monitor_dialog"
import DoctorAdviceDialog from "./dialog/DoctorAdviceDialog"
import treatmentSummaryDialog from "./dialog/treatmentSummaryDialog"
import ComputerDialog from "./dialog/computer_dialog"
import FinishDialog from "./dialog/finish_dialog"

export default {
    name: 'NavIgation',
    components: {
        dialysisPrescriptionDialog,
        doubleCheckDialog,
        AssessmentAfterDislysis,
        acceptsTreatmentDialog,
        assessmentBeforeDislysisDialog,
        treatmentSummaryDialog,
        MonitorDialog,
        DoctorAdviceDialog,
        ComputerDialog,
        FinishDialog
    },
    data() {
      return {

      }
    },
    props: {
      patient: { // 患者信息
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      schedual: { // 患者排班信息
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      prescription: { // 透析处方
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      solution: { // 透析方案
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      receiver_treatment_access: { // 接诊评估
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      predialysis_evaluation: { // 透前评估
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      doctor_advices: { // 临时医嘱
        type: Array,
        default: () => {
          return []
        }
      },
      double_check: { // 双人核对
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      assessment_after_dislysis: { // 透后评估
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      treatment_summary: { // 治疗小结
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      monitor_records: { // 透析监测
        type: Array,
        default: () => {
          return []
        }
      },
      dialysis_order: { // 透析记录
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      admin_users: { //系统用户列表
        type: Array,
        default: () => {
          return []
        }
      },
      devices: { // 设备
        type: Array,
        default: () => {
          return []
        }
      },
      device_numbers: { // 床位
        type: Array,
        default: () => {
          return []
        }
      },

      admin_user_map: { // {user_id: admin_user object}
        type: Object,
        default: () => {
          return {}
        }
      },
      device_map: { // {device_id: device object}
        type: Object,
        default: () => {
          return {}
        }
      },
      device_number_map: { // {device_number_id: device_number object}
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    methods:{
        showMonitorDialog: function() {
            this.$refs.monitor_dialog.show()
        },
        showAssessmentAfterDialog:function(){
            this.$refs.assessment_after_dislysis.show()
        },
        showDoctorAdviceDialog:function(){
            this.$refs.doctor_advice.show();
        },
        showComputerDialog: function() {
            this.$refs.computer_dialog.show()
        },
        showFinishDialog: function() {
            this.$refs.finish_dialog.show()
        },
        showPrescription: function () {
            this.$refs.prescription.show();
        },
        showAccepts:function () {
            this.$refs.accepts.show();
        },
        showAssessmentBefore:function () {
            this.$refs.assessmentBefore.show();
        },
        showDoubleCheck:function () {
            this.$refs.doubleCheck.show();
        },
        showrTeatmentSummary:function () {
            this.$refs.treatmentSummary.show();
        }
    }
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
  .grid {
  padding: 10px 0 20px 0;
  .list {
  ul {
  @include display-flex;
  @include align-items-center;
  @include text-align;
  @include justify-content-around;
  cursor: pointer;
  li {
  font-size: 12px;
  color: #5d6b7a;
  margin-top: 20px;

  p {
  height: 30px;
  line-height: 30px;
  color: #34495e;
  font-size: 14px;
  }
  img {
  width: 50px;
  height: 50px;
  }
  }
  }
  }
  }
  .txsj{
  text-align: center;
  margin-bottom: 20px;
  }
</style>

