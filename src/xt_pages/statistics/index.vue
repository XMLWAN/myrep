<template>
    <div class="app-container" v-loading="pageLoad">
        <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel" >
                    <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                    <div class="card-panel-text">患者总数</div>
                    <count-to :start-val="0" :end-val="patientCount" :duration="2600" class="card-panel-num"/>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel" >
                    <div class="card-panel-icon-wrapper icon-dialysis">
                    <svg-icon icon-class="form" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                    <div class="card-panel-text">今日透析数</div>
                    <count-to :start-val="0" :end-val="todayDialysisCount" :duration="3000" class="card-panel-num"/>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel" >
                    <div class="card-panel-icon-wrapper icon-money">
                    <svg-icon icon-class="form" class-name="card-panel-icon" />
                    </div>
                    <div class="card-panel-description">
                    <div class="card-panel-text">本周透析总数</div>
                    <count-to :start-val="0" :end-val="weekDialysisCount" :duration="3200" class="card-panel-num"/>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                <bar-chart title="传染病分布" v-if="diseaseFlag" :options="diseaseOptions" ref="disease_bar"/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper" >
                <pie-chart title="患者性别分布" v-if="genderFlag" :options="genderOptions"/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                <pie-chart title="年龄分布" v-if="ageFlag" :options="ageOptions"/>
                </div>
            </el-col>
        </el-row>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :options="modelLineOpstions" title="透析模式" v-if="modeLineFlag" />
        </el-row>

        
        <el-row >
        <el-table
            :data="modeTableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="时间">
            </el-table-column>
            <el-table-column
            prop="hd"
            label="HD">
            </el-table-column>
            <el-table-column
            prop="hdf"
            label="HDF">
            </el-table-column>
            <el-table-column
            prop="hdhp"
            label="HD+HP">
            </el-table-column>
            <el-table-column
            prop="hp"
            label="HP">
            </el-table-column>
            <el-table-column
            prop="total"
            label="总共">
            </el-table-column>
        </el-table>

        </el-row>

        
    </div>
</template>
<script>
import CountTo from "vue-count-to";
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import { fetchStatistics } from "@/api/statistics";
import {uParseTime} from "@/utils/tools";

export default {
  name: "Statistics",
  data() {
    return {
        pageLoad:true,
        patientCount:0,
        todayDialysisCount:0,
        weekDialysisCount:0,
        diseaseFlag:false,
        genderFlag:false,
        ageFlag:false,
        modeLineFlag:false,
        diseaseOptions:{
            xAxis:[],
            series:[],
        },
        genderOptions:{
            legend:[],
            series:[],
        },
        ageOptions:{
            legend:[],
            series:[],
        },
        modeTableData:[],
        modelLineOpstions:{
            xAxis:[],
            legend:["HD", "HDF", "HD+HP", "HP"],
            series:{
                "HD":[],
                "HDF":[],
                "HD+HP":[],
                "HP":[],
            },
        },
    };
  },
  methods: {
      fetchStatistics(){
          fetchStatistics().then(response=>{
              if(response.data.state==1) {
                  this.patientCount = response.data.data.patient_count;
                  this.todayDialysisCount = response.data.data.today_dialysis_count;
                  this.weekDialysisCount = response.data.data.week_daylysis_count;

                  var contagionList = this.$store.getters.contagions;
                  var contagionMap = {};
                  for (var index in contagionList) {
                      if (contagionList[index].type==1) {
                          continue;
                      }
                      contagionMap[contagionList[index].id] = contagionList[index].name;
                  }
                  var diseaseCounts = response.data.data.disease_counts;
                  var diseaseCountsMap = {};
                  for(var index in diseaseCounts) {
                      diseaseCountsMap[diseaseCounts[index].disease_id] = diseaseCounts[index];
                  }

                  for (var key in contagionMap) {
                      var item = {
                          disease_id: key, count: 0, name:contagionMap[key]
                      }
                      if (key in diseaseCountsMap) {
                          item.count = diseaseCountsMap[key].count;
                      }
                      this.diseaseOptions.xAxis.push(item.name);
                      this.diseaseOptions.series.push(item.count);

                  }

                  var genderCounts = response.data.data.gender_counts;
                  for (var index in genderCounts) {
                      var item = {
                          count: 0, name:""
                      }
                      item.count = genderCounts[index].count;
                      if (genderCounts[index].gender==1) {
                          item.name = "男";
                      }　else if (genderCounts[index].gender==2) {
                          item.name = "女";
                      }else {
                          item.name = "未知";
                      }
                      this.genderOptions.legend.push(item.name);
                      this.genderOptions.series.push({
                          value:item.count,name:item.name
                      });
                  }

                  var ageCount = response.data.data.age_counts;
                  for(var index in ageCount) {
                      var item = {count:ageCount[index].count, name:''};
                      switch (ageCount[index].age) {
                          case 10:
                              item.name = "10岁以下";
                              break;
                          case 20:
                              item.name = "10-20岁";
                              break;
                          case 30:
                              item.name = "20-30岁";
                              break;
                          case 40:
                              item.name = "30-40岁";
                              break;
                          case 50:
                              item.name = "40-50岁";
                              break;
                          case 60:
                              item.name = "50-60岁";
                              break;
                          case 70:
                              item.name = "60-70岁";
                              break;
                          case 80:
                              item.name = "70-80岁";
                              break;
                          case 90:
                              item.name = "80-90岁";
                              break;
                          case 100:
                              item.name = "90-100岁";
                              break;
                          default:
                              item.name = "其他";
                              break;
                      }
                      
                      this.ageOptions.legend.push(item.name);
                      this.ageOptions.series.push({
                          value:item.count,name:item.name
                      });
                  }

                  var modeOptions = this.$store.getters.treatment_mode;
                  var modeCounts = response.data.data.mode_counts;
                  var modeCountMap = {};
                  for(var index in modeCounts) {
                      var key = uParseTime(modeCounts[index].date, '{y}-{m}');
                      if (key in modeCountMap) {
                          modeCountMap[key][modeCounts[index].mode] = modeCounts[index];
                      }else {
                          modeCountMap[key] = {};
                          modeCountMap[key][modeCounts[index].mode] = modeCounts[index];
                      }
                  }

                  var thisDate = new Date()
                  var thisYear = thisDate.getFullYear()
             
                  for (let index = 1; index <= 12; index++) {
                      var month = index < 10 ? ('0' + index) : ('' + index);
                      this.modelLineOpstions.xAxis.push(thisYear + '-' + month);
                  }
                  for (var index in this.modelLineOpstions.xAxis) {
                      var hd = 0;
                      var hdf = 0;
                      var hdhp = 0;
                      var hp = 0;
                      for ( var key in modeCountMap) {

                          if(key == this.modelLineOpstions.xAxis[index]) {
                              
                              if (1 in modeCountMap[key]) {
                                hd = modeCountMap[key][1]["count"];
                              }
                              if (2 in modeCountMap[key]) {
                                hdf = modeCountMap[key][2]["count"];
                              }
                              if (3 in modeCountMap[key]) {
                                hdhp = modeCountMap[key][3]["count"];
                              }
                              if (4 in modeCountMap[key]) {
                                hp = modeCountMap[key][4]["count"];
                              }

                            var item = { date:'', hd:hd, hdf:hdf, hdhp: hdhp, hp:hp, total:0};
                            for (var kindex in modeCountMap[key]) {
                                item.total += modeCountMap[key][kindex]["count"];
                                item.date = uParseTime(modeCountMap[key][kindex]["date"], "{y}/{m}");
                            }
                            this.modeTableData.push(item);

                            continue;
                          }
                      }
                      
                    this.modelLineOpstions.series["HD"].push(hd);
                    this.modelLineOpstions.series["HDF"].push(hdf);
                    this.modelLineOpstions.series["HD+HP"].push(hdhp);
                    this.modelLineOpstions.series["HP"].push(hp);
                  }
                  
                  this.diseaseFlag = true;
                  this.genderFlag = true;
                  this.ageFlag = true;
                  this.modeLineFlag = true;
                  this.pageLoad = false;
              }
          }).catch(e=>{});
      }
  },
  created() {
      this.fetchStatistics();
  },
  watch: {},
  components: {
    CountTo,
    PieChart,
    BarChart,
    LineChart,
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-dialysis {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-dialysis {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
