<template>
  <div class="dialog_box">
    <el-dialog title="透析监测" :visible.sync="visible" width="80%" @close="reset">
      <div v-show="edit == false">
        <div class="txsj">
          <el-button round @click="newRecordAction">新增监测</el-button>
          <el-button round @click="modifyRecordAction">修改监测</el-button>
          <el-button round @click="deleteRecordAction">删除监测</el-button>

        </div>
        <el-table ref="table" :data="monitors" border highlight-current-row max-height="300"
                  @current-change="tableCurrentRowChange" style="width: 100%" :class="current_row_class">
          <el-table-column label="时间" align="center" width="144">
            <template slot-scope="scope">
              {{ getMonitorDate(scope.row) }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="血压(mmhg)" width="110">
            <template slot-scope="scope">
              {{scope.row.systolic_blood_pressure}}/{{scope.row.diastolic_blood_pressure}}
            </template>
          </el-table-column>
          <el-table-column prop="pulse_frequency" align="center" width="100" label="心率(次/分)">
          </el-table-column>
          <el-table-column prop="breathing_rate" align="center" label="呼吸(次/分)" width="100">
          </el-table-column>
          <el-table-column prop="blood_flow_volume" align="center" label="血流量(ml/min)" width="120">
          </el-table-column>
          <el-table-column prop="venous_pressure" align="center" label="静脉压(mmhg)" width="120">
          </el-table-column>
          <el-table-column prop="transmembrane_pressure" align="center" label="跨膜压(mmhg)" width="120">
          </el-table-column>
          <el-table-column prop="ultrafiltration_volume" align="center" label="超滤量(L)" width="110">
          </el-table-column>
          <el-table-column prop="sodium_concentration" align="center" label="钠浓度(mmol/L)" width="126">
          </el-table-column>
          <el-table-column prop="dialysate_temperature" align="center" label="透析液温度(℃)" width="120">
          </el-table-column>
          <el-table-column prop="replacement_rate" align="center" label="置换率(L/h)" width="120">
          </el-table-column>
          <el-table-column prop="displacement_quantity" align="center" label="置换量(L)" width="100">
          </el-table-column>
          <el-table-column prop="symptom" align="center" label="病情变化" width="130">
          </el-table-column>
          <el-table-column prop="dispose" align="center" label="处理" width="130">
          </el-table-column>
          <el-table-column prop="result" align="center" label="结果" width="130">
          </el-table-column>
        </el-table>
      </div>

      <div v-show="edit">
        <el-form ref="form" :model="form" label-width="130px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="监测时间：">
                <!-- {{ monitor_date_str }}
                <el-time-picker v-model="form.monitoring_time" :clearable="false" arrow-control :picker-options="{format: 'HH:mm'}" prefix-icon="" value-format="HH:mm" style="width: 60%;">
                </el-time-picker> -->
                <el-date-picker v-model="form.operate_time" type="datetime" prefix-icon="" style="width: 100%"
                                format="yyyy-MM-dd HH:mm" value-format="timestamp"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收缩压(mmhg)：">
                <el-input v-model="form.systolic_bp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="舒张压(mmhg)：">
                <el-input v-model="form.diastolic_bp"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="心率(次/分)：">
                <el-input v-model="form.pulse_frequency"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="呼吸频率(次/分)：">
                <el-input v-model="form.breathing_rated"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="血流量(ml/min)：">
                <el-input v-model="form.blood_flow_volume"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="静脉压(mmhg)：">
                <el-input v-model="form.venous_pressure"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="动脉压(mmhg)：">
                <el-input v-model="form.arterial_pressure"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="跨膜压(mmhg)：">
                <el-input v-model="form.transmembrane_pressure"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="超滤率(ml/h)">
                <el-input v-model="form.ultrafiltration_rate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="超滤量(L)：">
                <el-input v-model="form.ultrafiltration_volume"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="钠浓度(mmol/L)：">
                <el-input v-model="form.sodium_concentration"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="透析液温度(℃)：">
                <el-input v-model="form.dialysate_temperature"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="置换率(L/h)：">
                <el-input v-model="form.replacement_rate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="置换量(L)：">
                <el-input v-model="form.displacement_quantity"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="KT/V(在线)：">
                <el-input type="textarea" :rows="4" v-model="form.ktv"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="病情变化：">
                <el-select v-model="symptom_selecteds" style="width: 100%" :multiple="true" collapse-tags
                           @change="symptomSelectorChange">
                  <el-option v-for="(symptom, index) in symptom_options" :key="index" :label="symptom.name"
                             :value="symptom.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item>
                <el-input type="textarea" :rows="4" v-model="form.symptom" @blur="symptomTextareaBlur"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="处理：">
                <el-select v-model="dispose_selecteds" style="width: 100%" :multiple="true" collapse-tags
                           @change="disposeSelectorChange">
                  <el-option v-for="(dispose, index) in dispose_options" :key="index" :label="dispose.name"
                             :value="dispose.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item>
                <el-input type="textarea" :rows="4" v-model="form.dispose" @blur="disposeTextareaBlur"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="结果：">
                <el-select v-model="result_selecteds" style="width: 100%" :multiple="true" collapse-tags
                           @change="resultSelectorChange">
                  <el-option v-for="(result, index) in result_options" :key="index" :label="result.name"
                             :value="result.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item>
                <el-input type="textarea" :rows="4" v-model="form.result" @blur="resultTextareaBlur"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-row>
          <el-col :span="24">
            <div style="text-align: right;">
              <el-button @click="cancelEditAction">取 消</el-button>
              <el-button type="primary" @click="submitAction">确 定</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {parseTime} from '@/utils'
  import {getDataConfig} from "@/utils/data"
  import {editMonitor,postDelMonitorInfo} from "@/api/dialysis_record"

  export default {
    name: "MonitorDialog",
    data() {
      return {
        visible: false,
        edit: false,
        current_row_class: "current-box-class",

        patient_id: 0,
        schedule_date: 0,

        // monitoring_date: 0,

        form: {
          id: 0,
          monitoring_date: 0, // 监测日期
          // operate_date: 0, // 实际测量日期
          // monitoring_time: "", // 监测时间 HH:mm
          operate_time: 0,
          systolic_bp: "", // 收缩压
          diastolic_bp: "", // 舒张压
          pulse_frequency: "", // 心率
          breathing_rated: "", // 呼吸频率
          blood_flow_volume: "", // 血流量
          venous_pressure: "", // 静脉压
          transmembrane_pressure: "", // 跨膜压
          ultrafiltration_volume: "", // 超滤量
          ultrafiltration_rate: "", // 超滤率
          arterial_pressure: "", // 动脉压
          sodium_concentration: "", // 钠浓度
          dialysate_temperature: "", // 透析液温度
          replacement_rate: "", // 置换率
          displacement_quantity: "", // 置换量
          ktv: "", // KT/V
          symptom: "", // 病情变化
          dispose: "", // 处理
          result: "", // 结果
        },

        table_current_row: null,

        symptom_selecteds: [],
        symptom_options: getDataConfig("hemodialysis", "symptoms"),
        dispose_selecteds: [],
        dispose_options: getDataConfig("hemodialysis", "deals"),
        result_selecteds: [],
        result_options: getDataConfig("hemodialysis", "results"),
      }
    },
    props: {
      monitors: {
        type: Array,
      }
    },
    computed: {
      monitor_date_str: function () {
        return parseTime(this.form.monitoring_date, "{y}-{m}-{d}")
      }
    },
    created() {
      var date = this.$route.query.date
      var patient_id = this.$route.query.patient_id
      this.patient_id = patient_id
      this.schedule_date = date
      this.form.monitoring_date = date
      // this.form.operate_date = parseInt((new Date()).getTime() / 1000)
      // this.form.monitoring_time = parseTime(new Date(), "{h}:{i}")
      this.form.operate_time = (new Date()).getTime()
    },
    methods: {
      reset: function () {
        this.cancelEditAction()
      },
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      },
      getMonitorDate: function (monitor) {
        return parseTime(monitor.operate_time, "{y}-{m}-{d} {h}:{i}")
      },

      newRecordAction: function () {
        this.setEditMonitor(null)
        this.$refs.table.setCurrentRow(null)
        this.edit = true
      },
      modifyRecordAction: function () {
        if (this.table_current_row == null) {
          this.$message.error("请选择一条监测记录")
          return
        }
        this.setEditMonitor(this.table_current_row)
        this.$refs.table.setCurrentRow(null)
        this.edit = true
      },
      cancelEditAction: function () {
        this.setEditMonitor(null)
        this.$refs.table.setCurrentRow(null)
        this.edit = false
      },
      tableCurrentRowChange: function (currentRow) {
        this.table_current_row = currentRow
        // console.log("tableCurrentRowChange", currentRow)
      },
      setEditMonitor: function (monitor) {
        if (monitor == null || monitor == undefined) {
          this.form.id = 0
          // this.form.operate_date = parseInt((new Date()).getTime() / 1000)
          // this.form.monitoring_time = parseTime(new Date(), "{h}:{i}")
          this.form.operate_time = (new Date()).getTime()
          this.form.systolic_bp = ""
          this.form.diastolic_bp = ""
          this.form.pulse_frequency = ""
          this.form.breathing_rated = ""
          this.form.blood_flow_volume = ""
          this.form.venous_pressure = ""
          this.form.transmembrane_pressure = ""
          this.form.ultrafiltration_volume = ""
          this.form.ultrafiltration_rate = ""
          this.form.arterial_pressure = ""
          this.form.sodium_concentration = ""
          this.form.dialysate_temperature = ""
          this.form.replacement_rate = ""
          this.form.displacement_quantity = ""
          this.form.ktv = ""
          this.form.symptom = ""
          this.form.dispose = ""
          this.form.result = ""
          this.symptom_selecteds = []
          this.dispose_selecteds = []
          this.result_selecteds = []

        } else {
          this.form.id = monitor.id,
            // this.form.operate_date = monitor.operate_date
            // this.form.monitoring_time = monitor.monitoring_time
            this.form.operate_time = monitor.operate_time * 1000
          this.form.systolic_bp = monitor.systolic_blood_pressure
          this.form.diastolic_bp = monitor.diastolic_blood_pressure
          this.form.pulse_frequency = monitor.pulse_frequency
          this.form.breathing_rated = monitor.breathing_rate
          this.form.blood_flow_volume = monitor.blood_flow_volume
          this.form.venous_pressure = monitor.venous_pressure
          this.form.transmembrane_pressure = monitor.transmembrane_pressure
          this.form.ultrafiltration_volume = monitor.ultrafiltration_volume
          this.form.ultrafiltration_rate = monitor.ultrafiltration_rate
          this.form.arterial_pressure = monitor.arterial_pressure
          this.form.sodium_concentration = monitor.sodium_concentration
          this.form.dialysate_temperature = monitor.dialysate_temperature
          this.form.replacement_rate = monitor.replacement_rate
          this.form.displacement_quantity = monitor.displacement_quantity
          this.form.ktv = monitor.ktv
          this.form.symptom = monitor.symptom
          this.form.dispose = monitor.dispose
          this.form.result = monitor.result

          // 设置三个下拉框的值，直接调用事件偷懒
          this.symptomTextareaBlur()
          this.disposeTextareaBlur()
          this.resultTextareaBlur()
        }
      },

      submitAction: function () {
        // TODO loading
        var is_new = this.form.id == 0
        this.form.operate_time = parseInt(this.form.operate_time / 1000)
        this.form.systolic_bp = parseFloat(this.form.systolic_bp) == NaN ? 0 : parseFloat(this.form.systolic_bp)
        this.form.diastolic_bp = parseFloat(this.form.diastolic_bp) == NaN ? 0 : parseFloat(this.form.diastolic_bp)
        this.form.pulse_frequency = parseFloat(this.form.pulse_frequency) == NaN ? 0 : parseFloat(this.form.pulse_frequency)
        this.form.breathing_rated = parseFloat(this.form.breathing_rated) == NaN ? 0 : parseFloat(this.form.breathing_rated)
        this.form.blood_flow_volume = parseFloat(this.form.blood_flow_volume) == NaN ? 0 : parseFloat(this.form.blood_flow_volume)
        this.form.venous_pressure = parseFloat(this.form.venous_pressure) == NaN ? 0 : parseFloat(this.form.venous_pressure)
        this.form.transmembrane_pressure = parseFloat(this.form.transmembrane_pressure) == NaN ? 0 : parseFloat(this.form.transmembrane_pressure)
        this.form.ultrafiltration_volume = parseFloat(this.form.ultrafiltration_volume) == NaN ? 0 : parseFloat(this.form.ultrafiltration_volume)
        this.form.ultrafiltration_rate = parseFloat(this.form.ultrafiltration_rate) == NaN ? 0 : parseFloat(this.form.ultrafiltration_rate)
        this.form.arterial_pressure = parseFloat(this.form.arterial_pressure) == NaN ? 0 : parseFloat(this.form.arterial_pressure)
        this.form.sodium_concentration = parseFloat(this.form.sodium_concentration) == NaN ? 0 : parseFloat(this.form.sodium_concentration)
        this.form.dialysate_temperature = parseFloat(this.form.dialysate_temperature) == NaN ? 0 : parseFloat(this.form.dialysate_temperature)
        this.form.replacement_rate = parseFloat(this.form.replacement_rate) == NaN ? 0 : parseFloat(this.form.replacement_rate)
        this.form.displacement_quantity = parseFloat(this.form.displacement_quantity) == NaN ? 0 : parseFloat(this.form.displacement_quantity)
        this.form.ktv = parseFloat(this.form.ktv) == NaN ? 0 : parseFloat(this.form.ktv)
        this.form.monitoring_date = parseInt(this.form.monitoring_date);

        editMonitor(this.patient_id, this.schedule_date, this.form).then(rs => {
          var resp = rs.data
          if (resp.state == 1) {
            var monitor = resp.data.monitor
            if (is_new) {
              this.monitors.unshift(monitor)

            } else {
              for (let index = 0; index < this.monitors.length; index++) {
                const m = this.monitors[index];
                if (m.id == monitor.id) {
                  for (const key in monitor) {
                    m[key] = monitor[key]
                  }
                  break
                }
              }
            }
            this.reset()

          } else {
            this.$message.error(resp.msg)
          }
        })
      },

      symptomTextareaBlur: function () {
        if (this.form.symptom.length > 0) {
          this.symptom_selecteds = this.form.symptom.split(",")
        } else {
          this.symptom_selecteds = []
        }
      },
      symptomSelectorChange: function () {
        if (this.symptom_selecteds.length > 0) {
          this.form.symptom = this.symptom_selecteds.join(",") + ","
        } else {
          this.form.symptom = ""
        }
      },
      disposeTextareaBlur: function () {
        if (this.form.dispose.length > 0) {
          this.dispose_selecteds = this.form.dispose.split(",")
        } else {
          this.dispose_selecteds = []
        }
      },
      disposeSelectorChange: function () {
        if (this.dispose_selecteds.length > 0) {
          this.form.dispose = this.dispose_selecteds.join(",") + ","
        } else {
          this.form.dispose = ""
        }
      },
      resultTextareaBlur: function () {
        if (this.form.result.length > 0) {
          this.result_selecteds = this.form.result.split(",")
        } else {
          this.result_selecteds = []
        }
      },
      resultSelectorChange: function () {
        if (this.result_selecteds.length > 0) {
          this.form.result = this.result_selecteds.join(",") + ","
        } else {
          this.form.result = ""
        }
      }, deleteRecordAction: function () {

        if (this.table_current_row == null) {
          this.$message.error("请选择一条监测记录")
          return
        }

        this.$confirm('删除记录', '是否删除该监测记录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            patient_id: this.patient_id,
            record_id: this.table_current_row.id
          }

          postDelMonitorInfo(params).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              let record_id = response.data.data.record_id;
              for(let i = 0; i < this.monitors.length; i++){
                if(this.monitors[i].id == record_id){
                  this.monitors.splice(i,1);
                }
              }
            }
          });


        }).catch(() => {


        });
      }
    },
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

<
style >
.dialog_box .current-box-class .current-row > td {
  background: #6fb5fa;
  color: white;
  /* font-size: 12px; */
}

.dialog_box .current-box-class .current-row:hover > td {
  background: #6fb5fa;
  color: white;
  /* font-size: 12px; */
}
</style>

