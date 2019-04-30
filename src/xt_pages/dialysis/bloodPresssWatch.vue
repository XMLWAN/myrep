<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-input style="width: 400px;" v-model="searchKey" class="filter-item"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>-->
    <div class="cell">
      <label class="title">
        <span class="name">{{ search_mode == 1 ? "日期查询" : "病人查询" }}</span> :
      </label>
      <el-date-picker
        v-show="search_mode == 1"
        v-model="time"
        prefix-icon="el-icon-date"
        @change="changeTime"
        :editable="false"
        style="width: 250px;"
        type="date"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions1"
        format="yyyy-MM-dd"
        value-format="timestamp"
      ></el-date-picker>
      <el-input
        v-show="search_mode == 2"
        v-model="patient_search_keyword"
        style="width: 250px;"
        placeholder="病人名字、透析号"
      >
        <el-button
          slot="append"
          style="background-color: #409EFF; color: white; border-radius: 0;"
          icon="el-icon-search"
          @click="searchPatientAction"
        ></el-button>
      </el-input>
      <el-button
        type="primary"
        @click="changeSearchMode"
      >{{ search_mode == 1 ? "改为病人查询" : "改为日期查询" }}</el-button>

      <el-button type="primary" :disabled="selecting_schs.length == 0" @click="batchPrintAction">打印</el-button>
    </div>
    <div class="cell clearfix">
      <label class="title">
        <span class="name">排班班次</span> :
      </label>
      <div class="time">
        <ul class>
          <li
            :class="item.value==schedulType?'active':''"
            @click="selectSchedulType(item.value)"
            v-for="item in schedulArr"
            :key="item.value"
          >{{item.label}}</li>
        </ul>
      </div>
    </div>
    <div class="cell clearfix">
      <label class="title">
        <span class="name">分区</span> :
      </label>
      <div class="time">
        <ul class>
          <li
            :class="item.id==partitionType?'active':''"
            @click="selectPartitionType(item.id)"
            v-for="item in partitionArr"
            :key="item.id"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>

    <el-table
      :data="SchedualPatientsTableData"
      style="width: 100%"
      v-loading="loading"
      @current-change="clickCurrent"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column prop="number" label="机号" align="center"></el-table-column>
      <el-table-column label="排班日期" prop="sch_time" align="center" width="120"></el-table-column>
      <el-table-column prop="dialysis_no" label="透析号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>

      <el-table-column prop="mode_name" label="透析模式" align="center"></el-table-column>

      <el-table-column prop="dialysis_before_weight" label="透前体重 (kg)" align="center"></el-table-column>
      <el-table-column prop="dialysis_after_weight" label="透后体重 (kg)" align="center"></el-table-column>
      <el-table-column label="透中血压">
        <el-table-column v-for="(item, index) in labelArr" :key="index" :label="item">
          <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
          <template slot-scope="scope">
            <!--<span>{{scope.row.bp[index].value}}</span>-->
            <span>{{getValue(scope.row.bp[index])}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :page-sizes="[10]"
      :page-size="10"
      background
      style="margin-top:20px;"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>


<script>
import { getSchedualPatient, GetAllZone } from "@/api/dialysis";
import { parseTime } from "@/utils";

export default {
  name: "Patient",
  data() {
    return {
      loading: false,
      time: "",

      search_mode: 1, // 搜索模式 1.日期搜索 2.病人搜索
      patient_search_keyword: "",

      SchedualPatientsTableData: [],
      active: true,
      schedulType: 0,
      schedulArr: [
        { value: 0, label: "全部" },
        { value: 1, label: "上午" },
        { value: 2, label: "下午" },
        { value: 3, label: "晚上" }
      ],

      partitionType: 0,

      labelArr: ["第1次", "第2次", "第3次", "第4次", "第5次", "第6次", "第7次"],

      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          },
          {
            text: "清空",
            onClick(picker) {
              picker.$emit("pick");
            }
          }
        ]
      },

      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        schedul_type: 0,
        partition_type: 0,
        schedul_time: "",
        keywords: ""
      },
      selecting_schs: [],
      partitionArr: []
    };
  },
  created() {
    var date = new Date();
    this.time = date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var nowDate = year + "-" + month + "-" + day;
    var date = new Date(nowDate + " 00:00:00");
    this.listQuery.schedul_time = date.getTime();
    this.getAllZone();
    this.getSchedualPatientList();
  },
  methods: {
    clickCurrent(val) {
      console.log(val);
      this.$router.push({
        path: "/dialysis/details",
        query: { patient_id: val.patient_id, date: val.sch_time_int }
      });
    },
    handleSelectionChange(val) {
      this.selecting_schs = val;
    },

    selectSchedulType(scheduleType) {
      // alert(scheduleType);/
      this.schedulType = scheduleType;
      this.listQuery.schedul_type = scheduleType;
      this.getSchedualPatientList();
    },
    selectPartitionType(partitionType) {
      this.partitionType = partitionType;
      this.listQuery.partition_type = partitionType;
      this.getSchedualPatientList();
    },

    changeTime() {
      console.log(this.time);
      this.listQuery.schedul_time = this.time;
      this.getSchedualPatientList();
    },
    getAllZone: function() {
      GetAllZone().then(response => {
        if (response.data.state == 0) {
          this.$message.error(response.data.msg);
          return false;
        } else {
          this.partitionArr = response.data.data.zone;
          this.partitionArr.unshift({ id: 0, name: "全部" });
        }
      });
    },
    getSchedualPatientList: function() {
      this.loading = true;
      if (this.search_mode == 1) {
        this.listQuery.keywords = "";
      } else {
        this.listQuery.schedul_time = "";
      }
      this.SchedualPatientsTableData = [];
      getSchedualPatient(this.listQuery).then(response => {
        if (response.data.state == 0) {
          this.loading = false;
          this.$message.error(response.data.msg);
          return false;
        } else {
          this.loading = false;
          this.total = response.data.data.total;
          // console.log(response.data.data)
          for (let i = 0; i < response.data.data.schedule.length; i++) {
            if (response.data.data.schedule[i].patient.id > 0) {
              let SchedualPatientsTable = {
                bp: []
              };

              SchedualPatientsTable["sch_id"] = response.data.data.schedule[i].id
              SchedualPatientsTable["sch_time_int"] =
                response.data.data.schedule[i].schedule_date;
              SchedualPatientsTable["sch_time"] = parseTime(
                response.data.data.schedule[i].schedule_date,
                "{y}-{m}-{d}"
              );
              SchedualPatientsTable["dialysis_no"] =
                response.data.data.schedule[i].patient.dialysis_no;
              SchedualPatientsTable["name"] =
                response.data.data.schedule[i].patient.name;
              SchedualPatientsTable["number"] =
                response.data.data.schedule[i].device_number.number;
              SchedualPatientsTable["gender"] =
                response.data.data.schedule[i].patient.gender;
              SchedualPatientsTable["source"] =
                response.data.data.schedule[i].patient.source;
              SchedualPatientsTable["patient_id"] =
                response.data.data.schedule[i].patient_id;
              SchedualPatientsTable["mode_name"] =
                response.data.data.schedule[i].treatment_mode.name;
              if (
                response.data.data.schedule[i].assessment_before_dislysis.id > 0
              ) {
                SchedualPatientsTable["dialysis_before_weight"] =
                  response.data.data.schedule[
                    i
                  ].assessment_before_dislysis.weight_before;
              }
              if (
                response.data.data.schedule[i].assessment_after_dislysis.id > 0
              ) {
                SchedualPatientsTable["dialysis_after_weight"] =
                  response.data.data.schedule[
                    i
                  ].assessment_after_dislysis.weight_after;
              }

              SchedualPatientsTable.bp = [];
              for (
                let a = 0;
                a < response.data.data.schedule[i].monitoring_record.length;
                a++
              ) {
                let bp = {};
                bp["value"] =
                  response.data.data.schedule[i].monitoring_record[
                    a
                  ].systolic_blood_pressure.toString() +
                  "/" +
                  response.data.data.schedule[i].monitoring_record[
                    a
                  ].diastolic_blood_pressure.toString();

                SchedualPatientsTable.bp.unshift(bp);
              }

              this.SchedualPatientsTableData.push(SchedualPatientsTable);
            }
          }
        }
      });
    },
    getValue: function(val) {
      if (val != undefined) {
        return val.value;
      } else {
        return "";
      }
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getSchedualPatientList();
    },
    changeSearchMode: function() {
      if (this.search_mode == 1) {
        this.search_mode = 2;
      } else {
        this.search_mode = 1;
      }
    },
    searchPatientAction: function() {
      this.listQuery.keywords = this.patient_search_keyword;
      console.log(this.patient_search_keyword);
      if (this.patient_search_keyword.length == 0) {
        return;
      }
      this.getSchedualPatientList();
    },
    batchPrintAction: function() {
      var sch_ids = []
      for (let index = 0; index < this.selecting_schs.length; index++) {
        sch_ids.push(this.selecting_schs[index].sch_id)
      }
      this.$store.dispatch("SetBatchPrintDialysisRecordIDs", sch_ids)
      this.$router.push({ path: "/dialysis/print/batch" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  // margin: 20px;
  font-size: 15px;
  .filter-container {
    padding-bottom: 5px;
  }
  .search-component {
    width: 500px;
    .searchBox {
      width: 300px;
      height: 36px;
      line-height: 36px;
      padding-left: 15px;
      border: 1px #dcdfe6 solid;
      border-right: none;
      outline: none;
      float: left;
      border-radius: 6px 0 0 6px;
      font-size: 14px;
      color: #333;
      background: #fff;
      box-shadow: 3px 3px 4px rgba(135, 135, 135, 0.05);
    }
    .searchBtn {
      background-color: #409eff;
      color: #fff;
      font-size: 15px;
      text-align: center;
      height: 36px;
      line-height: 36px;
      float: left;
      outline: none;
      width: 70px;
      border: none;
      border-radius: 0 6px 6px 0;
      font-family: "Microsoft Yahei";
      cursor: pointer;
    }
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
      }
    }
    .time {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      ul {
        padding: 0;
        margin: 0;
        li {
          float: left;
          list-style: none;
          cursor: pointer;
          padding: 3px 0;
          width: 70px;
          color: #606266;
          border-radius: 4px;
          margin: 0 10px 0 0;
          color: #409eff;
          border: 1px #409eff solid;
          text-align: center;
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
  .amount {
    font-weight: normal;
    padding: 10px 0 0 0;
    color: #606266;
    font-size: 14px;
    span {
      color: #ef2525;
      font-family: "Arial";
      padding: 0 2px;
    }
  }
}
</style>

