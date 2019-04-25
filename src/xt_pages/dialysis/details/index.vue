<template>
    <div class="details-bg" v-loading.fullscreen.lock="loading">
        <div class="print"  >
            <!-- <el-button type="primary" @click="dialogFormVisible = true">长期医嘱</el-button> -->
            <!-- <el-button type="primary" @click="orders = true">临时医嘱</el-button> -->
            <el-button type="primary" @click="printOrder" icon="el-icon-printer">打印</el-button>
        </div>

        <nav-igation
        title="弹窗导航"
        :patient="patient"
        :schedual="schedual"
        :prescription="prescription"
        :solution="solution"
        :receiver_treatment_access="receiver_treatment_access"
        :predialysis_evaluation="predialysis_evaluation"
        :doctor_advices="doctor_advices"
        :double_check="double_check"
        :assessment_after_dislysis="assessment_after_dislysis"
        :treatment_summary="treatment_summary"
        :monitor_records="monitor_records"
        :dialysis_order="dialysis_order"
        :admin_users="admin_users"
        :devices="devices"
        :device_numbers="device_numbers"
        :admin_user_map="admin_user_map"
        :device_map="device_map"
        :device_number_map="device_number_map">
        </nav-igation>

        <basic-infor :patient="patient" :device_number="schedual.id == 0 ? '' : schedual.device_number.number" :steps="steps" title="基本信息"></basic-infor>

        <dialysis-prescription :prescription="prescription" :solution="solution" :device_map="device_map" title="透析处方"></dialysis-prescription>

        <!-- <past-data class="往期数据"></past-data> -->

        <accepts-assessment :record="receiver_treatment_access" title="接诊评估"></accepts-assessment>

        <assessment-before :record="predialysis_evaluation" ref="assessment_before" title="透前评估"></assessment-before>

        <stat-order ref="stat_order" :advices="doctor_advices" :doctor_map="admin_user_map" title="临时医嘱"></stat-order>

        <dialysis-computer ref="dialysis_computer" :record="dialysis_order" :admin_map="admin_user_map" :device_number_map="device_number_map" title="透析上机 " ></dialysis-computer>

        <double-check ref="double_check" :record="double_check" :admin_map="admin_user_map" title="双人核对 "></double-check>

        <dialysis-monitoring ref="monitoring" :monitores="monitor_records"  title="透析监测"></dialysis-monitoring>

        <el-dialog title="长期医嘱单" :visible.sync="dialogFormVisible"  width="960px">
            <div class="printForm">
                <h1 class="title">长期医嘱单  </h1>
                <div class="info">
                    <ul>
                        <li>
                            <span class="name" >姓名：</span>
                            <input type="text" class="InputBox">
                        </li>
                         <li>
                            <span class="name" >性别：</span>
                            <input type="text" class="InputBox">
                        </li>
                         <li>
                            <span class="name" >年龄：</span>
                            <input type="text" class="InputBox">
                        </li>
                         <li>
                            <span class="name" >科别：</span>
                            <input type="text" class="InputBox">
                        </li>
                         <li>
                            <span class="name" >床号：</span>
                            <input type="text" class="InputBox">
                        </li>
                        <li>
                            <span class="name" >住院号：</span>
                            <input type="text" class="InputBox">
                        </li>
                    </ul>
                </div>
                <table border="1" style="border:1px #999 solid;margin-top:20px;" bordercolorlight="#fff" bordercolordark="#fff" width="100%" cellpadding="0" cellspacing="0" class="printTable" >
                  <tbody>
                    <tr align="center">
                        <th style="width:20%;" colspan="2" align="center" >起始</th>
                        <th style="width:20%;" rowspan="2" align="center">医嘱</th>
                        <th style="width:8%;"  rowspan="2" align="center" >医师签名</th>
                        <th style="width:6%;" rowspan="2" align="center" >执行护士签名</th>
                        <th style="width:42%;" colspan="4" align="center" >停止</th>
                    </tr>
                    <tr align="center">
                        <th  align="center">日期</th>
                        <th  align="center">时间</th>
                        <th style="width:10%;" align="center">日期</th>
                        <th style="width:10%;" align="center">时间</th>
                        <th style="width:10%;" align="center">医师签名</th>
                        <th style="width:6%;" align="center">执行护士签名</th>
                    </tr>
                    <tr align="center">
                        <td>2018-90-09</td>
                        <td>2018-90-09</td>
                        <td>地方开发发地方开发发方发发发大渡岗</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                    </tr>
                    <tr align="center">
                        <td>2018-90-09</td>
                        <td>2018-90-09</td>
                        <td>地方开发发地方开发发方发发发大渡岗</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                    </tr>

                  </tbody>
                </table>
            </div>
        </el-dialog>

        <el-dialog title="临时医嘱单" :visible.sync="orders"  width="960px">
            <div class="printForm">
                <h1 class="title">临时医嘱单</h1>
                <div class="info">
                    <ul>
                        <li>
                            <span class="name" >姓名：</span>
                            <input type="text" class="InputBox">
                        </li>
                         <li>
                            <span class="name" >性别：</span>
                            <input type="text" class="InputBox">
                        </li>
                         <li>
                            <span class="name" >年龄：</span>
                            <input type="text" class="InputBox">
                        </li>
                         <li>
                            <span class="name" >科：</span>
                            <input type="text" class="InputBox">
                        </li>
                         <li>
                            <span class="name" >区：</span>
                            <input type="text" class="InputBox">
                        </li>
                        <li>
                            <span class="name" >房：</span>
                            <input type="text" class="InputBox">
                        </li>
                        <li>
                            <span class="name" >床：</span>
                            <input type="text" class="InputBox">
                        </li>
                        <li>
                            <span class="name" >住院号：</span>
                            <input type="text" class="InputBox">
                        </li>
                    </ul>
                </div>
                <table border="1" style="border:1px #999 solid;margin-top:20px;" bordercolorlight="#fff" bordercolordark="#fff" width="100%" cellpadding="0" cellspacing="0" class="printTable" >
                  <tbody>
                    <tr align="center">
                        <th style="width:10%;" align="center">日期</th>
                        <th style="width:10%;" align="center">时间</th>
                        <th style="width:10%;" align="center">医生签名</th>
                        <th style="width:40%;" align="center">医嘱内容</th>
                        <th style="width:10%;" align="center">执行时间</th>
                        <th style="width:10%;" align="center">护士签名</th>
                        <th style="width:10%;" align="center">金额</th>
                    </tr>
                    <tr align="center">
                        <td>2018-90-09</td>
                        <td>2018-90-09</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>888</td>
                    </tr>
                    <tr align="center">
                        <td>2018-90-09</td>
                        <td>2018-90-09</td>
                        <td>张三</td>
                        <td>张三</td>
                        <td>2018-90-09</td>
                        <td>张三</td>
                        <td>888</td>

                    </tr>

                  </tbody>
                </table>
            </div>
        </el-dialog>


        <dialysis-off ref="dialysis_off" :record="dialysis_order" :admin_map="admin_user_map" title="透析下机 "></dialysis-off>

        <assessment-after ref="assessment_after" :record="assessment_after_dislysis" title="透后评估" ></assessment-after>

        <treatment-of ref="treatment_of" :record="treatment_summary" title="治疗小结"></treatment-of>
    </div>
</template>

<script>
import NavIgation from "./NavIgation";
import BasicInfor from "./BasicInfor";
import DialysisPrescription from "./DialysisPrescription";
import PastData from "./pastData";
import AcceptsAssessment from "./acceptsAssessment";
import AssessmentBefore from "./assessmentBefore";
import StatOrder from "./statOrder";
import DialysisComputer from "./dialysisComputer";
import DoubleCheck from "./doubleCheck";
import DialysisMonitoring from "./dialysisMonitoring";
import DialysisOff from "./dialysisOff";
import AssessmentAfter from "./assessmentAfter";
import TreatmentOf from "./treatmentOf";
import OperationStaff from "./operationStaff";
import { getDialysisScheduleDetail } from "@/api/dialysis_record";
import { parseTime } from "@/utils";

export default {
  name: "index",
  components: {
    NavIgation,
    BasicInfor,
    DialysisPrescription,
    PastData,
    AcceptsAssessment,
    AssessmentBefore,
    StatOrder,
    DialysisComputer,
    DoubleCheck,
    DialysisMonitoring,
    DialysisOff,
    AssessmentAfter,
    TreatmentOf,
    OperationStaff
  },
  data() {
    return {
      dialogFormVisible: false,
      orders: false,
      loading: false,
      patient_id: 0,
      date: 0,

      patient: { id: 0 }, // 患者信息
      schedual: { id: 0 }, // 患者排班信息
      prescription: { id: 0 }, // 透析处方
      solution: { id: 0 }, // 透析方案
      receiver_treatment_access: { id: 0 }, // 接诊评估
      predialysis_evaluation: { id: 0 }, // 透前评估
      doctor_advices: [], // 临时医嘱
      double_check: { id: 0 }, // 双人核对
      assessment_after_dislysis: { id: 0 }, // 透后评估
      treatment_summary: { id: 0 }, // 治疗小结
      monitor_records: [], // 透析监测
      dialysis_order: { id: 0 }, // 透析记录
      admin_users: [], // 系统用户列表
      devices: [], // 设备
      device_numbers: [], // 床位号

      admin_user_map: {}, // {user_id: admin_user object}
      device_map: {}, // {device_id: device}
      device_number_map: {} // {device_number_id: device_number}
    };
  },
  created() {
    var patient_id = this.$route.query.patient_id;
    var date = this.$route.query.date;
    this.patient_id = patient_id;
    this.date = date;
    this.getScheduleDetail();
  },
  computed: {
    steps: function() {
      var steps = [
        { title: "透析处方", finish: false },
        { title: "接诊评估", finish: false },
        { title: "透前评估", finish: false },
        { title: "临时医嘱", finish: false },
        { title: "透析上机", finish: false },
        { title: "双人核对", finish: false },
        { title: "透析监测", finish: false },
        { title: "透析下机", finish: false },
        { title: "透后评估", finish: false },
        { title: "治疗小结", finish: false }
      ];

      steps[0].finish = this.prescription.id > 0;
      steps[1].finish = this.receiver_treatment_access.id > 0;
      steps[2].finish = this.predialysis_evaluation.id > 0;
      steps[3].finish = this.doctor_advices.length > 0;
      steps[4].finish = this.dialysis_order.id > 0;
      steps[7].finish =
        this.dialysis_order.id > 0 && this.dialysis_order.stage == 2;

      steps[5].finish = this.double_check.id > 0 && this.double_check.creater > 0 && this.double_check.modifier > 0 ;
      steps[6].finish = this.monitor_records.length > 0;
      steps[8].finish = this.assessment_after_dislysis.id > 0;
      steps[9].finish = this.treatment_summary.id > 0;

      return steps;
    }
  },
  methods: {
    didDelMonitor(record_id){
      var mrl  =   this.monitor_records.length
      for (let index = 0; index < mrl; index++){
        if (this.monitor_records[index].id == record_id) {
          console.log("11111")
          this.monitor_records.splice(index,1);
          break;
        }
      }
    },
    getScheduleDetail: function() {
      this.loading = true;
      var dateStr = parseTime(this.date, "{y}-{m}-{d}");
      getDialysisScheduleDetail(this.patient_id, dateStr).then(rs => {
        var resp = rs.data;
        if (resp.state == 1) {
          var patient = resp.data.patient; // 患者信息
          var schedual = resp.data.schedual; // 患者排班信息
          var prescription = resp.data.prescription; // 透析处方
          var solution = resp.data.solution; // 透析方案
          var receiver_treatment_access = resp.data.receiver_treatment_access; // 接诊评估
          var predialysis_evaluation = resp.data.predialysis_evaluation; // 透前评估
          var doctor_advices = resp.data.doctor_advices; // 临时医嘱
          var double_check = resp.data.double_check; // 双人核对
          var assessment_after_dislysis = resp.data.assessment_after_dislysis; // 透后评估
          var treatment_summary = resp.data.treatment_summary; // 治疗小结
          var monitor_records = resp.data.monitor_records; // 透析监测
          var dialysis_order = resp.data.dialysis_order; // 透析记录

          this.patient = patient;
          this.schedual = schedual == null ? { id: 0 } : schedual;
          this.prescription = prescription == null ? { id: 0 } : prescription;
          this.solution = solution == null ? { id: 0 } : solution;
          this.receiver_treatment_access =
            receiver_treatment_access == null
              ? { id: 0 }
              : receiver_treatment_access;
          this.predialysis_evaluation =
            predialysis_evaluation == null ? { id: 0 } : predialysis_evaluation;
          this.doctor_advices = doctor_advices == null ? [] : doctor_advices;
          this.double_check = double_check == null ? { id: 0 } : double_check;
          this.assessment_after_dislysis =
            assessment_after_dislysis == null
              ? { id: 0 }
              : assessment_after_dislysis;
          this.treatment_summary =
            treatment_summary == null ? { id: 0 } : treatment_summary;
          this.monitor_records = monitor_records == null ? [] : monitor_records;
          this.dialysis_order =
            dialysis_order == null ? { id: 0 } : dialysis_order;

          // this.$refs.stat_order.setAdvices(this.doctor_advices)
          // this.$refs.monitoring.setRecords(this.monitor_records)

          this.admin_users = resp.data.doctors;
          this.devices = resp.data.devices;
          this.device_numbers = resp.data.device_numbers;

          var device_map = {};
          for (let index = 0; index < this.devices.length; index++) {
            const device = this.devices[index];
            device_map[device.id] = device;
          }
          this.device_map = device_map;

          var admin_map = {};
          for (let index = 0; index < this.admin_users.length; index++) {
            const admin = this.admin_users[index];
            admin_map[admin.id] = admin;
          }
          this.admin_user_map = admin_map;

          var device_number_map = {};
          for (let index = 0; index < this.device_numbers.length; index++) {
            const device_number = this.device_numbers[index];
            device_number_map[device_number.id] = device_number;
          }
          this.device_number_map = device_number_map;
        } else {
          this.$message.error(resp.msg);
        }

        this.loading = false;
      });
    },
    printOrder() {
      var xtdate = parseTime(this.date, "{y}-{m}-{d}");
      this.$router.push(
        "/dialysis/print?xtdate=" + xtdate + "&xtno=" + this.patient.dialysis_no
      );
    }
  }
};
</script>

<style  style="stylesheet/scss" lang="scss" scoped>
.print {
  width: 100%;
  text-align: right;
  background: #f5f7fa;
  margin: 0 auto;
  padding: 10px 20px;
}
.printForm {
  .title {
    font-size: 30px;
    font-weight: 500;
    text-align: center;
    line-height: 60px;
  }
  .info {
    ul {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-justify-content: space-around;
      -moz-justify-content: space-around;
      -ms-justify-content: space-around;
      -o-justify-content: space-around;
      justify-content: space-around;
      li {
        display: flex;
        box-sizing: border-box;
        justify-content: space-around;
        .name {
        }
        .InputBox {
          padding: 0;
          border: none;
          border-bottom: 1px #e5e5e5 solid;
          width: 60px;
          outline: none;
        }
      }
    }
  }
  .printTable {
    tr {
      padding: 2px;
      th {
        padding: 6px 4px;
      }
      td {
        padding: 6px 4px;
      }
    }
  }
}
</style>

