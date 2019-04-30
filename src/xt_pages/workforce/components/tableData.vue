<template>
  <div id="table_data">
    <el-table
        :max-height="tableHeight"
        :data="scheduleZone"
        :span-method="objectSpanMethod"
        @cell-click="clickThis"
        :summary-method="getSummaries"
        show-summary
        :row-class-name="rowClass"
        :cell-class-name="cellClass"
        sum-text="总数"
        style="width: 100%;cursor: pointer;">
        <el-table-column  prop="area" label="分区" width="80"  align="center" fixed></el-table-column>
        <el-table-column  prop="cut" label="机号" width="80"  align="center" fixed></el-table-column>
        <el-table-column   :label="'周一 (' + weekTitle[0] +')'" width="215" align="center" >
            <el-table-column prop="Mon_M" label="上"  width="70" align="center" >
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Mon_M"></schedule-item>
            </el-table-column>
            <el-table-column prop="Mon_A" label="下"  width="70" align="center"  >
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Mon_A"></schedule-item>
            </el-table-column>
            <el-table-column prop="Mon_N" label="晚"  width="70" align="center"  >
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Mon_N"></schedule-item>
            </el-table-column>
        </el-table-column>
        <el-table-column :label="'周二 (' + weekTitle[1] +')'" width="215" align="center" >
            <el-table-column prop="Tue_M" label="上"  width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Tue_M"></schedule-item>
            </el-table-column>
            <el-table-column prop="Tue_A" label="下"  width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Tue_A"></schedule-item>
            </el-table-column>
            <el-table-column prop="Tue_N" label="晚" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Tue_N"></schedule-item>
            </el-table-column>
        </el-table-column>
        <el-table-column :label="'周三 (' + weekTitle[2] +')'" width="215" align="center" >
            <el-table-column prop="Wed_M" label="上" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Wed_M"></schedule-item>
            </el-table-column>
            <el-table-column prop="Wed_A" label="下" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Wed_A"></schedule-item>
            </el-table-column>
            <el-table-column prop="Wed_N" label="晚" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Wed_N"></schedule-item>
            </el-table-column>
        </el-table-column>
        <el-table-column :label="'周四 (' + weekTitle[3] +')'" width="215" align="center" >
            <el-table-column prop="Thurs_M" label="上" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Thurs_M"></schedule-item>
            </el-table-column>
            <el-table-column prop="Thurs_A" label="下" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Thurs_A"></schedule-item>
            </el-table-column>
            <el-table-column prop="Thurs_N" label="晚"  width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Thurs_N"></schedule-item>
            </el-table-column>
        </el-table-column>
        <el-table-column :label="'周五 (' + weekTitle[4] +')'" width="215" align="center" >
            <el-table-column prop="Fri_M" label="上" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Fri_M"></schedule-item>
            </el-table-column>
            <el-table-column prop="Fri_A" label="下" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Fri_A"></schedule-item>
            </el-table-column>
            <el-table-column prop="Fri_N" label="晚" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Fri_N"></schedule-item>
            </el-table-column>
        </el-table-column>
        <el-table-column :label="'周六 (' + weekTitle[5] +')'" width="215" align="center" >
            <el-table-column prop="Sat_M" label="上" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Sat_M"></schedule-item>
            </el-table-column>
            <el-table-column prop="Sat_A" label="下"  width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Sat_A"></schedule-item>
            </el-table-column>
            <el-table-column prop="Sat_N" label="晚" width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Sat_N"></schedule-item>
            </el-table-column>
        </el-table-column>
        <el-table-column :label="'周日 (' + weekTitle[6] +')'" min-width="215" align="center" >
            <el-table-column prop="Sun_M" label="上" min-width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Sun_M"></schedule-item>
            </el-table-column>
            <el-table-column prop="Sun_A" label="下" min-width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Sun_A"></schedule-item>
            </el-table-column>
            <el-table-column prop="Sun_N" label="晚" min-width="70" align="center">
              <schedule-item slot-scope="scope" :schedule-detail="scope.row.Sun_N"></schedule-item>
            </el-table-column>
        </el-table-column>
        <el-table-column prop="total" label="总数" width="60" align="center" fixed="right"></el-table-column>
        <!-- <el-table-column prop="cut" label="机号" min-width="40" align="center" ></el-table-column>
        <el-table-column prop="area" label="分区" min-width="40" align="center" ></el-table-column> -->
      </el-table>

      <!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog {{weekTime}}</el-button> -->

      <el-dialog title="排班" :visible.sync="dialogTableVisible" width="1000px;" :v-model="dialog" >
        <div>
           <div class="cell clearfix">
            <label class="title"><span class="name">当前排班</span> : </label>
            <div class="time ">
              <ul class="">
                 <span class="current">日期 : {{currentData.schedule_date}} &nbsp;&nbsp; 班次 : {{currentData.type_name}} &nbsp;&nbsp; 病房 : {{currentData.zone_name}} &nbsp;&nbsp; 透析机 : {{currentData.bed_name}} </span>
              </ul>
            </div>
          </div>

          <div class="cell clearfix">
            <label class="title"><span class="name">患者搜索</span> : </label>
            <div class="time ">
              <ul class="">
                 <el-input size="medium" v-model="searchKey" placeholder="请输入搜索的内容" style="width:260px"> </el-input>
                 <el-button type="primary" icon="el-icon-search" @click="SubmitSearch">搜索</el-button>
              </ul>
            </div>
          </div>
          <div class="cell clearfix">
            <label class="title"><span class="name">排班</span> : </label>
            <div class="time ">
              <ul class="">
                <li v-for="item in schedulArr" @click="changeSearchSchedule(item.value)" :key="item.value" :class="patientQuery.schedule==item.value?'active':''"  >{{item.label}}</li>
              </ul>
            </div>
          </div>
          <!-- <div class="cell clearfix">
            <label class="title"><span class="name">标签</span> : </label>
            <div class="time ">
              <ul class="">
                <li v-for="item in tagArr" :key="item.value" >{{item.label}}</li>
              </ul>
            </div>
          </div> -->
          <div class="cell clearfix">
            <label class="title"><span class="name">传染病</span> : </label>
            <div class="time ">
              <ul class="">
                <li v-for="item in diseasesArr" @click="changeSearchContagion(item.value)" :key="item.value" :class="patientQuery.contagion==item.value?'active':''" >{{item.label}}</li>
              </ul>
            </div>
          </div>
        </div>
        <el-table ref="singleTable" :data="patients" border height="250" highlight-current-row @current-change="handleCurrentChange" :header-cell-style="{ backgroundColor: 'rgb(236, 245, 255)'}" >
          <el-table-column type="index" label="序号" width="89" align="center"> </el-table-column>
          <el-table-column property="dialysis_no" label="透析号" min-width="110" align="center" ></el-table-column>
          <el-table-column property="name" label="姓名" min-width="110" align="center" ></el-table-column>
          <el-table-column property="schedules" label="双周已排" min-width="80" align="center" >
            <template slot-scope="scope">
              <span>{{scope.row.schedules.length}}次</span>
            </template>
          </el-table-column>
          <el-table-column property="solutions" label="治疗频率" min-width="200" align="center" >
            <template slot-scope="scope">
              <span v-for="solution in scope.row.solutions" :key="solution.id" >{{solution.name}}({{solution.period}}{{solution.times}}) </span>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closePatientPanel()">取 消</el-button>
            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="setSchedule">确 定</el-button>
          </div>

      </el-dialog>
      <el-dialog
        title="调整排班"
        :visible.sync="tzDialogVisible"
        width="350px"
        center>
        <div style="width:100%;margin:0 auto">
          <el-radio-group v-model="tiaoZhengType" :class="tiaozhengclass" >
            <el-radio :label="1">取消排班</el-radio>
            <el-radio :label="2">调整机号</el-radio>
            <el-radio :label="3">调整模式</el-radio>
          </el-radio-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="tzDialogVisible = false;tiaoZhengType=1">取 消</el-button>
          <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitTiaoX">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="调整模式"
        :visible.sync="msDialogVisible"
        width="350px"
        center>
        <div style="width:100%;margin:0 auto">
          <el-form :model="changeSchedule" ref="changeSchedule" :rules="changeRules" >
            <el-form-item label="" prop="mode_id">
              <el-select v-model="changeSchedule.mode_id" placeholder="请选择" style="width:100%">
                <el-option
                :disabled="item.id == currentData.mode_id"
                  v-for="item in modeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="msDialogVisible = false">取 消</el-button>
          <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitTiaoZMS('changeSchedule')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="调整机号"
        :visible.sync="jhDialogVisible"
        width="400px"
        center>
        <div style="width:100%;margin:0 auto">
          <el-form :model="changeSchedule" ref="changeSchedule" :rules="changeRules" label-width="90px" label-position="left">
            <el-form-item label="排班日期">
              <el-input v-model="currentData.schedule_date" disabled></el-input>
            </el-form-item>
            <el-form-item label="班次" prop="schedule_type">
              <el-select v-model="changeSchedule.schedule_type" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in scheduleType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="病房" prop="partition_id">
              <el-select v-model="changeSchedule.partition_id" placeholder="请选择" style="width:100%" @change="changePartition">
                <el-option
                  v-for="item in partitions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="透析机" prop="bed_id">
              <el-select v-model="changeSchedule.bed_id" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in jihaos"
                  :key="item.id"
                  :label="item.number"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="jhDialogVisible = false">取 消</el-button>
          <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitTiaoZJH('changeSchedule')">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>

import {getWeekPanels,getSchedules,getSchedulePatients,CreateSchedule,CancelSchedule,ChangeSchedule} from '@/api/schedule';
import ScheduleItem from './ScheduleItem';

let rowNumber = 0;
export default {
    name:'tableData',
    props: {
      weekTime: {
        type: String,
        default: "thisWeek"
      },
      scheduleZoneRowProp:{
        type:Array,
        dafault:[],
      },
      scheduleZoneProp:{
        type:Array,
        dafault:[],
      },
      partitionsProp:{
        type:Object,
        dafault:{},
      },

    },
    data() {
      return {
        rowClass:'table-row-new-class schedule-table-row',
        searchKey:'',
        tiaoZhengType:1,
        modeOptions:null,
        dialog:{
          tag:''
        },
        patients:[],
        toDay:'',
        schedulArr: [
          { value: 0, label: "不限" },
          { value: 2, label: "未排班" },
          { value: 1, label: "已排班" },
        ],
        tagArr:[
          { value: 1, label: "不限" },
          { value: 2, label: "透析记录" },
          { value: 3, label: "传染病" }
        ],
        diseasesArr:[
          { value: 0, label: "不限" },
        ],
        scheduleType:[
          {id:1, name:'上午'},{id:2, name:'下午'},{id:3, name:'晚上'},
        ],
        dialogTableVisible: false,
        tzDialogVisible:false,
        msDialogVisible:false,
        jhDialogVisible:false,
        scheduleZone:this.scheduleZoneProp,
        scheduleZoneRow:-1,
        partitions:[],
        jihaos:[],
        weekTitle:["","","","","","",""],
        weekDays:["","","","","","",""],
        currentData:{
          id:0,
          schedule_date:"",
          schedule_type:0,
          bed_id:0,
          partition_id:0,
          patient_id:0,
          schedule_week:0,
          mode_id:0,
          type_name:"",
          bed_name:"",

          partition_type:0,
          contagions:[],
          patient:"",
        },
        changeSchedule:{
          mode_id:'',
          schedule_type:"",
          partition_id:'',
          bed_id:'',
          schedule_week:'',
          partition_type:'',
        },
        patientQuery:{
          keywords:"",
          schedule:0,
          contagion:0,
        },

        tiaozhengclass:"tiaozhengclass",
        changeRules:{
          mode_id:[{required:true, message:"请选择模式", trigger:'blur'}],
          schedule_type:[{required:true, message:"请选择班次", trigger:'blur'}],
          partition_id:[{required:true, message:"请选择病房", trigger:'blur'}],
          bed_id:[{required:true, message:"请选择透析机", trigger:"blur"}],
        },

        weekday: 0,

        tableHeight: document.documentElement.clientHeight,
      }
    },

    watch:{
      weekTime:function(){
        var theType = this.weekType(this.weekTime);
        this.getSchedules(theType);
      },
      "scheduleZoneRow":function(){
        var theType = this.weekType(this.weekTime);
        this.getSchedules(theType);
      },
      tableHeight (val) {
        if(!this.timer) {
          this.tableHeight = val
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    },
    methods: {
      cellClass({ row, column, rowIndex, columnIndex }) {
          if (columnIndex == 0 || columnIndex == 1 || columnIndex == 23) {
              return ""
          } else {
            if(this.weekTime == 'lastWeek') {
              return "schedule-table-cell-disable"
            }else if (this.weekTime == 'thisWeek'){
              var weekday = Math.floor(((columnIndex - 2) / 3) + 1)
              if (weekday < this.weekday) {
                  return "schedule-table-cell-disable"
              }
            }
          }
          return ""
      },
      SubmitSearch(){
        this.patientQuery.keywords = this.searchKey;
        this.getSchedulePatients();
      },
      changeSearchContagion(id){
        this.patientQuery.contagion = id;
        this.getSchedulePatients();
      },
      changeSearchSchedule(id){
        this.patientQuery.schedule = id;
        this.getSchedulePatients();
      },
       getSummaries(param) {

        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0 || index === 25) {
            sums[index] = '总数';
            return;
          }
          if (index === 1 || index === 24) {
            sums[index] = data.length;
            return;
          }

          const values = data.map(item => item[column.property]);

          if (index === 23) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
            return;
          }

          sums[index] = values.reduce((prev, curr) => {

            if (typeof(curr['mode_id']) == 'undefined') {
              return prev;
            }
            const value = Number(curr['mode_id']);
            if (!isNaN(value) && value>0) {
              return prev + 1;
            } else {
              return prev;
            }
          }, 0);
          sums[index];

        });

        return sums;
       },
     objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        var that = this;
        var rowNum = 0;
        rowNumber = 0;
        var rutrnData = {};
        if (columnIndex === 0 || columnIndex == 25) {
          var rowLen = this.scheduleZoneRow.length;
          if (rowLen > 0) {
            for (let index = 0; index < rowLen; index++) {
              rowNum = this.scheduleZoneRow[index];
              rowNumber += rowNum;
              var f = rowNumber-rowNum;
              if (f == rowIndex ) {
                rutrnData = {
                  rowspan: rowNum,
                  colspan: 1
                };
                break;
              }else if (rowIndex < rowNumber) {
                rutrnData = {
                  rowspan: 0,
                  colspan: 0
                };
                break;
              }

            }
            return rutrnData;
          }
        }
      },
      handleCurrentChange(row){
        if (typeof(row) == "undefined" || row==null) {
          this.currentData.patient_id = 0;
          this.currentData.contagions = [];
        }else {
          this.currentData.patient_id = row.id;
          this.currentData.contagions = row.contagions;
        }
      },
      closePatientPanel(row){
        this.dialogTableVisible = false;
        this.$refs.singleTable.setCurrentRow(row);
        this.currentData.patient_id = 0;
      },
      getSchedules(weekType){
        getSchedules(weekType).then(response=>{
          if(response.data.state==1){
            this.weekTitle = response.data.data.weekTitle;
            this.weekDays = response.data.data.days;
            this.toDay = response.data.data.today;
            var theSchedules = response.data.data.schdules;
            var that = this;
            this.scheduleZone.forEach(function(zone, index){
              that.scheduleZone[index].Mon_M = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Mon_A = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Mon_N = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Tue_M = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Tue_A = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Tue_N = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Wed_M = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Wed_A = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Wed_N = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Thurs_M = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Thurs_A = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Thurs_N = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Fri_M = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Fri_A = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Fri_N = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Sat_M = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Sat_A = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Sat_N = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Sun_A = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Sun_N = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].Sun_M = {mode_id:0, mode_name:"", patient_id:0, patient:""};
              that.scheduleZone[index].total=0;



              if (response.data.data.schdules.length>0) {
                theSchedules.forEach(function(schedule, sindex){


                  if( zone.jihao_id == schedule.bed_id) {
                  // if(zone.zone_id == schedule.partition_id && zone.jihao_id == schedule.bed_id) {

                    var weekPath = that.weekPath(schedule.schedule_week, schedule.schedule_type);

                    if (weekPath.length==2) {

                      var weekPathKey = weekPath[0] + "_" + weekPath[1];
                      that.scheduleZone[index][weekPathKey] = {
                        schedule_id:schedule.id,
                        mode_id:schedule.mode_id,
                        patient_id: schedule.patient_id,
                        patient: schedule.patient,
                        patient_contagions: schedule.patient_contagions,
                        mode_name: typeof(that.modeOptions[schedule.mode_id]) == 'undefined' ? '' : that.modeOptions[schedule.mode_id].name,
                      };
                      that.scheduleZone[index].total +=1;
                    }

                  }
                });
              }
            });
          }else {
            this.$message.error("网络错误");
            return false;
          }
        });
      },
      getSchedulePatients(){
        getSchedulePatients(this.patientQuery).then(response=>{
          if (response.data.state==1) {
            this.patients = response.data.data.patients;
          }
        });
      },
      CancelSchedule(id){
        this.$confirm('确定要取消当前排班?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            CancelSchedule(id).then(response=>{
              if (response.data.state==0) {
                this.$message.error(response.data.msg);
                return false;
              }else {
                this.$message({
                  type: 'success',
                  message: '排班已取消!'
                });
                var that = this;
                var schedule = response.data.data.schedule;
                this.scheduleZone.forEach(function(zone, index){
                    if(zone.zone_id == schedule.partition_id && zone.jihao_id == schedule.bed_id) {
                      var weekPath = that.weekPath(schedule.schedule_week, schedule.schedule_type);
                      if (weekPath.length==2) {
                        var weekPathKey = weekPath[0] + "_" + weekPath[1];
                        that.scheduleZone[index][weekPathKey] = {
                          schedule_id:0,
                          mode_id:0,
                          patient_id: 0,
                          patient: "",
                          mode_name: '',
                        };

                        that.scheduleZone[index].total -=1;
                      }

                    }
                });
                this.tzDialogVisible = false;
              }
            });
        }).catch(() => {});
      },
      changeScheduleActon(formName){
        ChangeSchedule(this.currentData.id, this.changeSchedule).then(response=>{
          if (response.data.state==0) {
            this.$message.error(response.data.msg);
            return false;
          }else {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            var that = this;
            var schedule = response.data.data.schedule;
            this.scheduleZone.forEach(function(zone, index){
                if(zone.zone_id == schedule.partition_id && zone.jihao_id == schedule.bed_id) {
                  var weekPath = that.weekPath(schedule.schedule_week, schedule.schedule_type);
                  if (weekPath.length==2) {
                    var weekPathKey = weekPath[0] + "_" + weekPath[1];
                    that.scheduleZone[index][weekPathKey] = {
                      schedule_id:schedule.id,
                      mode_id:schedule.mode_id,
                      patient_id: schedule.patient_id,
                      patient: that.currentData.patient,
                      patient_contagions: that.currentData.contagions,
                      mode_name: typeof(that.modeOptions[schedule.mode_id]) == 'undefined' ? '' : that.modeOptions[schedule.mode_id].name,
                    };

                    that.scheduleZone[index].total +=1;
                  }
                }
                if(zone.zone_id == that.currentData.partition_id && zone.jihao_id == that.currentData.bed_id) {
                  var weekPath = that.weekPath(that.currentData.schedule_week, that.currentData.schedule_type);
                  if (weekPath.length==2) {
                    var weekPathKey = weekPath[0] + "_" + weekPath[1];
                    that.scheduleZone[index][weekPathKey] = {schedule_id:0,mode_id:0,patient_id: 0,patient: "",mode_name: "",patient_contagions:[]};

                    that.scheduleZone[index].total -=1;
                  }
                }

            });
            this.$refs[formName].resetFields();
            this.jhDialogVisible = false;
          }
        });
      },
      CreateSchedule(id, data){
        CreateSchedule(id, data).then(response=>{
          if(response.data.state==0) {
            this.$message.error(response.data.msg);
            return false;
          }else {
            this.$message({
              type: 'success',
              message: '排班成功!'
            });
            var that = this;
            var schedule = response.data.data.schedule;
            this.scheduleZone.forEach(function(zone, index){
                if(zone.zone_id == schedule.partition_id && zone.jihao_id == schedule.bed_id) {
                  var weekPath = that.weekPath(schedule.schedule_week, schedule.schedule_type);
                  if (weekPath.length==2) {
                    var weekPathKey = weekPath[0] + "_" + weekPath[1];
                    that.scheduleZone[index][weekPathKey] = {
                      schedule_id:schedule.id,
                      mode_id:schedule.mode_id,
                      patient_id: schedule.patient_id,
                      patient: schedule.patient,
                      patient_contagions: that.currentData.contagions,
                      mode_name: typeof(that.modeOptions[schedule.mode_id]) == 'undefined' ? '' : that.modeOptions[schedule.mode_id].name,
                    };

                    that.scheduleZone[index].total +=1;
                  }

                }
            });

            this.closePatientPanel();
          }
        });
      },
      clickThis(row, column, cell, event){
        var week = this.weekDay(column.property);
        if (week[0]==-1 || week[1]==-1) {
          return false;
        }
        if (this.toDay>this.weekDays[week[0]-1]) {
          return false;
        }


        this.currentData.schedule_date = this.weekDays[week[0]-1];
        this.currentData.schedule_type = week[1];
        this.currentData.bed_id = row.jihao_id;
        this.currentData.partition_id = row.zone_id;
        this.currentData.schedule_week = week[0];

        this.currentData.type_name = this.dayType(week[1]);
        this.currentData.zone_name = row.area;
        this.currentData.bed_name = row.cut;
        this.currentData.partition_type = row.zone_type;

        if (row[column.property].schedule_id>0) {
          this.currentData.mode_id = row[column.property].mode_id;
          this.currentData.id = row[column.property].schedule_id;
          this.currentData.patient_id = row[column.property].patient_id;
          this.currentData.patient = row[column.property].patient;
          this.currentData.contagions = row[column.property].patient_contagions;
          this.tiaoZhengType=1;
          this.tzDialogVisible = true;
        }else {
          this.currentData.mode_id = 1;
          this.currentData.id = 0;
          this.currentData.patient_id=0;
          this.currentData.patient = '';
          this.currentData.contagions = [];
          this.getSchedulePatients();
          this.dialogTableVisible = true;
        }

      },
      submitTiaoZJH(formName){
        this.$refs[formName].validate((valid)=>{
          if (valid) {
            var weekPath = this.weekPath(this.changeSchedule.schedule_week, this.changeSchedule.schedule_type);
            if (weekPath.length!=2) {
              this.$message.error("数据异常");
              return false;
            }
            var weekPathKey = weekPath[0] + "_" + weekPath[1];
            for(var index in this.scheduleZone) {
              if(this.scheduleZone[index].jihao_id == this.changeSchedule.bed_id  ) {
                if (this.scheduleZone[index][weekPathKey].mode_id>0) {
                  this.$message.error("选中的区域已经存在排班，不能再排班！");
                  return false;
                }
                this.changeSchedule.partition_type = this.scheduleZone[index].zone_type
                break;
              }
            }

            //可能
            //患者有传染病，与选择的机器类型（传染病）不匹配
            //患者没有传染病，但机器是某个传染病的专用透析器
            //机器的透析模式与患者不匹配


            if (this.currentData.contagions.length>0){
              var cflag = false;
              for(var index in this.currentData.contagions) {
                if(this.currentData.contagions[index].disease_id==this.changeSchedule.partition_type) {
                  cflag = true;
                }
              }
              if (!cflag) {
                this.$confirm('此患者有传染病，与此透析机不匹配，确定在此排班吗?', '提示', {confirmButtonText: '是',cancelButtonText: '否',type: 'warning'})
                .then(() => {
                  this.changeSchedule.change_action = "change_device";
                  this.changeScheduleActon(formName);
                }).catch(() => {
                });
              }else {
                this.changeSchedule.change_action = "change_device";
                this.changeScheduleActon(formName);
              }
            }else if (this.changeSchedule.partition_type > 1) {
              this.$confirm('此患者没有传染病，与此透析机不匹配，确定在此排班吗?', '提示', {confirmButtonText: '是',cancelButtonText: '否',type: 'warning'})
                .then(() => {
                  this.changeSchedule.change_action = "change_device";
                  this.changeScheduleActon(formName);
                }).catch(() => {
                });
            }else {
              this.changeSchedule.change_action = "change_device";
              this.changeScheduleActon(formName);
            }
          }
        });
      },
      submitTiaoZMS(formName){
        this.$refs[formName].validate((valid)=>{
          if (valid) {
            this.changeSchedule.change_action = "change_mode";
            ChangeSchedule(this.currentData.id, this.changeSchedule).then(response=>{
              if (response.data.state==0) {
                this.$message.error(response.data.msg);
                return false;
              }else {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                var that = this;
                var schedule = response.data.data.schedule;
                this.scheduleZone.forEach(function(zone, index){
                    if(zone.zone_id == schedule.partition_id && zone.jihao_id == schedule.bed_id) {
                      var weekPath = that.weekPath(schedule.schedule_week, schedule.schedule_type);
                      if (weekPath.length==2) {
                        var weekPathKey = weekPath[0] + "_" + weekPath[1];
                        that.scheduleZone[index][weekPathKey].mode_id = schedule.mode_id;
                        that.scheduleZone[index][weekPathKey].mode_name = typeof(that.modeOptions[schedule.mode_id]) == 'undefined' ? '' : that.modeOptions[schedule.mode_id].name;
                      }
                    }
                });
                this.$refs[formName].resetFields();
                this.msDialogVisible = false;
              }
            });
          }
        });
      },

      changePartition(value){
        if (typeof(this.partitions[value].jihaos) != 'undefined') {
            this.jihaos = this.partitions[value].jihaos;
          }else {
            this.jihaos = [];
          }
          this.changeSchedule.bed_id = "";
      },
      submitTiaoX(){

        if (this.tiaoZhengType==1) {
            this.$confirm('确定要取消当前排班?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
               this.CancelSchedule(this.currentData.id);
            }).catch(() => {});
        }

        switch (this.tiaoZhengType) {
          case 1:
            this.CancelSchedule(this.currentData.id);
            break;
          case 2:
            this.changeSchedule={
              mode_id:this.currentData.mode_id,
              schedule_type:this.currentData.schedule_type,
              partition_id:this.currentData.partition_id,
              bed_id:this.currentData.bed_id,
              schedule_week:this.currentData.schedule_week,
              partition_type:'',
            };

            if (typeof(this.partitions[this.currentData.partition_id].jihaos) != 'undefined') {
              this.jihaos = this.partitions[this.currentData.partition_id].jihaos;
            }else {
              this.jihaos = [];
            }

            this.tzDialogVisible = false;
            this.jhDialogVisible = true;
            break;
          case 3:
            this.changeSchedule={
              mode_id:'',
              schedule_type:"",
              partition_id:'',
              bed_id:'',
              schedule_week:'',
              partition_type:'',
            };
            this.tzDialogVisible = false;
            this.msDialogVisible = true;
            break;

          default:
            break;
        }
      },
      setSchedule(){
        var that = this;
        var submitFlag = true;
        if(this.currentData.patient_id <= 0) {
          this.$message.error("请先选择患者");
          return false;
        }


        if (this.currentData.schedule_date.length==0 || (this.currentData.schedule_type<1 || this.currentData.schedule_type>3) || this.currentData.bed_id<1 || this.currentData.partition_id<1 || (this.currentData.schedule_week <1 || this.currentData.schedule_week>7)) {
          this.$message.error("请先选择排班时间或机号");
          return false;
        }

        //可能
        //患者有传染病，与选择的机器类型（传染病）不匹配
        //患者没有传染病，但机器是某个传染病的专用透析器
        //机器的透析模式与患者不匹配


        if (this.currentData.contagions.length>0){
          var cflag = false;
          this.currentData.contagions.forEach(function(contagion){
            if(contagion.disease_id==that.currentData.partition_type) {
              cflag = true;
            }
          });
          if (!cflag) {
            this.$confirm('此患者有传染病，与此透析机不匹配，确定在此排班吗?', '提示', {confirmButtonText: '是',cancelButtonText: '否',type: 'warning'})
            .then(() => {
              this.CreateSchedule(this.currentData.patient_id, this.currentData);
            }).catch(() => {
            });
          }else {
            this.CreateSchedule(this.currentData.patient_id, this.currentData);
          }
        }else if (that.currentData.partition_type > 1) {
          this.$confirm('此患者没有传染病，与此透析机不匹配，确定在此排班吗?', '提示', {confirmButtonText: '是',cancelButtonText: '否',type: 'warning'})
            .then(() => {
              this.CreateSchedule(this.currentData.patient_id, this.currentData);
            }).catch(() => {
            });
        }else {
          this.CreateSchedule(this.currentData.patient_id, this.currentData);
        }


      },
      weekType(weekTime) {
        var theType = 2;
        switch (weekTime) {
          case 'lastWeek':
            theType = 1;
            break;
          case 'thisWeek':
            theType = 2;
            break;
          case 'nextWeek':
            theType = 3;
            break;
          case 'nextTwoWeek':
            theType = 4;
            break;
          default:
            theType = 2;
            break;
        }
        return theType;
      },
      dayType(theType) {
        var jType = "";
        switch (theType) {
          case 1:
          jType = "上午";
            break;
          case 2:
          jType = "下午";
            break;
          case 3:
          jType = "晚上";
            break;

          default:
            break;
        }
        return jType;

      },
      weekPath(week, schedule_type){
        var weekArr = {1:'Mon',2:'Tue',3:'Wed',4:'Thurs',5:'Fri',6:'Sat',7:"Sun"};
        var typeArr = {1:'M', 2:'A', 3:'N'};
        if (typeof(weekArr[week]) == "undefined" || typeof(typeArr[schedule_type]) == 'undefined') {
          return [];
        }
        return [weekArr[week], typeArr[schedule_type]];
      },
      weekDay(prop){
        var week = prop.split("_");
        if (week.length != 2) {
          return [-1,-1];
        }
        var w = -1;
        var n = -1;
        switch (week[0]) {
          case "Mon":
            w = 1;
            break;
          case "Tue":
            w = 2;
            break;
          case "Wed":
            w = 3;
            break;
          case "Thurs":
            w = 4;
            break;
          case "Fri":
            w = 5;
            break;
          case "Sat":
            w = 6;
            break;
          case "Sun":
            w = 7;
            break;
          default:
            w = -1;
            break;
        }
        switch (week[1]) {
          case "M":
            n = 1
            break;
          case "A":
            n = 2
            break;
          case "N":
            n = 3
            break;
          default:
          n = -1;
            break;
        }
        if (w==-1 || n ==-1) {
          return [-1, -1];
        }
        return [w, n];

      }
    },
    components:{
      ScheduleItem,
    },
    mounted() {
      // var theType = this.weekType(this.weekTime);
      // this.getSchedules(theType);
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          if (window.fullHeight < 200) {
            that.tableHeight = 200
          } else {
            that.tableHeight = window.fullHeight - 200
          }

        })()
      }
    },
    created(){
      rowNumber = 0;
      this.modeOptions = this.$store.getters.treatment_mode;

      this.partitions = this.partitionsProp;

      var contagions = this.$store.getters.contagions;
      if (contagions.length>0) {
        var that = this;
        contagions.forEach(function(citem){
          if (citem.type==2) {
            that.diseasesArr.push({value:citem.id, label:citem.name});
          }
        });
      }
      this.scheduleZoneRow = this.scheduleZoneRowProp;

      this.weekday = (new Date()).getDay()
      if (this.weekday == 0) {
          this.weekday = 7
      }
    }
}
</script>

<style rel="stylesheet/css" lang="scss" scoped>
.tiaozhengclass {
  display: block;
  margin: 0 auto;
}
.el-table tr {
  background-color: #111 !important;
}
.cell {
    margin: 0px 0 15px 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    // display: flex;
    -webkit-box-align: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;
    text-align: left;
    justify-content: flex-start;
    color: #333;
    .title {
      width: 80px;
      display: inline-block;
      font-weight: normal;
      color: #909399;
      padding: 6px 0;
      font-weight: 700;
      .name {
        width: 60px;
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        -moz-text-align-last: justify;
        -webkit-text-align-last: justify;
        display: inline-block;
        font-size: 15px;
        color: #606266;
      }
    }
    .time {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      ul {
        padding: 0;
        margin: 0;
        .current{
          display: block;
          line-height:36px;
        }
        li {
          float: left;
          list-style: none;
          cursor: pointer;
          padding: 5px 0;
          width: 70px;
          color: #606266;
          border-radius: 4px;
          margin: 0 10px 4px 0;
          color: #409eff;
          border: 1px #409eff solid;
          text-align:center;
          &:hover {
            background: #409eff;
            color: #fff;
          }
        }
        .active {
          background: #409eff;
          color: #fff;
        }
      }
    }
  }

</style>

<style>
.schedule-table-row {
  background: #fff !important;
}

.schedule-table-row:hover{
  background: #fff !important;
}
.schedule-table-row td:hover{
  background: rgb(88, 162, 236) !important;
}
.schedule-table-row td .cell{
  font-size: 12px;
  white-space:nowrap !important;
}
</style>

<style>
.schedule-table-cell-disable {
    background-color: rgb(245, 245, 245);
}
</style>

<style>
#table_data ::-webkit-scrollbar {
  height: 15px;
}
</style>
