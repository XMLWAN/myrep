<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input   style="width: 400px;" v-model="searchKey" class="filter-item" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="search" >搜索</el-button>
      <!-- <el-button  class="filter-item" type="primary" style="float:right;" icon="el-icon-download" >批量导入</el-button> -->
      <!-- <el-button  type="primary" plain style="float:right;" icon="el-icon-download" >批量导入</el-button>       -->
      <el-button @click="$router.push({path:'/patients/create'})" class="filter-item" style="float:right;" type="primary" icon="el-icon-edit" >新增病人</el-button>
    </div>
  	<!-- <div class="search-component clearfix">
      <input type="text" class="searchBox" placeholder="姓名/首拼/透析号" v-model="searchVal">
      <button class="searchBtn">搜 索</button>
    </div> -->
    <div class="cell">
	    <label class="title"><span class="name">日期查询</span> : </label>
       <el-date-picker v-model="listQuery.start_time"  prefix-icon="el-icon-date" @change="changeTime" :editable="false" style="width: 196px;" type="date" placeholder="选择日期时间" align="right" :picker-options="pickerOptions1"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" > </el-date-picker>
       <span class="">-</span>
       <el-date-picker v-model="listQuery.end_time"  prefix-icon="el-icon-date" @change="changeTime" :editable="false" style="width: 196px;" type="date" placeholder="选择日期时间" align="right" :picker-options="pickerOptions1"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>       
    </div>
    <div class="cell clearfix">
	    <label class="title"><span class="name">排班班次</span> : </label>
	    <div class="time ">
        <ul class="">
          <li :class="item.value==schedulType?'active':''" @click='selectSchedulType(item.value)' v-for="item in schedulArr" :key="item.value" >{{item.label}}</li>
        </ul>
      </div>
    </div>
    <div class="cell clearfix">
	    <label class="title"><span class="name">状态</span> : </label>
	    <div class="time ">
        <ul class="">
          <li :class="item.value==systemType?'active':''" @click="selectSystemType(item.value)" v-for="item in systemArr" :key="item.value" >{{item.label}}</li>
        </ul>
      </div>
    </div>
    <div class="cell clearfix">
	    <label class="title"><span class="name">病人来源</span> : </label>
	    <div class="time ">
        <ul class="">
          <li :class="item.value==sourceType?'active':''" :style="item.source>0&&lapsetoType!=1?'display:none;':''" @click="selectLapseTo(item.value, item.source, item.lapseto)" v-for="item in sourceArr" :key="item.value" >{{item.label}}</li>
        </ul>
      </div>
    </div>
    <div class="cell clearfix">
	    <label class="title"><span class="name">其它查询</span> : </label>
        <el-select v-model="listQuery.contagion" clearable  placeholder="传染病" @change="changeOtherSearch">
          <el-option
            v-for="item in contagionList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
         </el-select>
         <el-select v-model="listQuery.reimbursement_way" clearable  placeholder="付费方式"  @change="changeOtherSearch">
          <el-option
            v-for="item in reimbursement_ways"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
         </el-select>
        <el-select
          v-model="listQuery.isscheduling"
          collapse-tags
          style="margin-left: 10px;"
          clearable
          placeholder="排班情况"  @change="changeOtherSearch">
          <el-option
            v-for="item in scheduling"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          v-model="listQuery.isprescription"
          collapse-tags
          style="margin-left:10px;"
          clearable
          placeholder="透析处方"  @change="changeOtherSearch">
          <el-option
            v-for="item in prescription"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="amount" >总<span>{{pageTotal}}</span>条 已选择{{pageSelect}}位患者</div>
      <el-table
        ref="multipleTable" :data="tableData" border fit highlight-current-row  style="width: 100%;margin-top: 10px;" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" label="全选" width="60px" align="center">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        </el-table-column> -->
        <el-table-column align="center" label="全选" width="60px" type="selection" ></el-table-column>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column  label="透析号" min-width="80" property="dialysis_no" align="center"></el-table-column>         
        <el-table-column  label="住院号" min-width="80"  property="admission_number" align="center"> </el-table-column>
        <el-table-column property="name" label="姓名" min-width="80" align="center"> 
          <template slot-scope="scope" >
            <router-link :to="'/patients/edit/'+scope.row.id" style="color:#409eff" >{{scope.row.name}}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="性别" min-width="80" align="center">
          <template slot-scope="scope" >
            <span v-if="scope.row.gender==1">男</span>
            <span v-else-if="scope.row.gender==2">女</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" min-width="80" align="center">
          <template slot-scope="scope" >
            <span v-if="scope.row.source==1">门诊</span>
            <span v-else-if="scope.row.source==2">住院</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column property="total_dialysis" label="透析次数" min-width="94" align="center"> </el-table-column>
        <el-table-column min-width="150" label="二维码" align="center">
          <template slot-scope="scope"  type="text">
            <a style="color:#409eff"  v-if="scope.row.binding_state==1" @click="openWechatBindDialog">已绑定</a>
            <a style="color:#409eff"  v-else @click="openWechatBindDialog">生成</a>
          </template>
        </el-table-column>
        <el-table-column  label="日期"  min-width="144" align="center">
          <template slot-scope="scope">
          <span>{{scope.row.created_time | parseTime('{y}-{m}-{d}')}}</span>
        </template>
        </el-table-column>
      </el-table>
      
      <!-- <pagi-nation title="分页"></pagi-nation> -->
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pate"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        background
        style="margin-top:20px;"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      

      <el-dialog
      title="微信绑定"
      :visible.sync="bindWechatDialog"
      width="30%"
      center>
      <img :src="wechatbindimg" width="100%" alt="" v-if="wechatbindimg" >
      <i class="el-icon-loading" v-else></i>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bindWechatDialog = false">关闭</el-button>
      </span>
    </el-dialog>

    </div> 
    
</template>


<script>
import { fetchList } from "@/api/patient";
import pagiNation from '@/components/pagimg/pagiNation'

export default {
  name: "Patient",
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      wechatbindimg:"",
      active: true,
      schedulType: 0,
      schedulArr: [
        { value: 0, label: "全部" },
        { value: 1, label: "上午" },
        { value: 2, label: "下午" },
        { value: 3, label: "晚上" }
      ],
      systemType: 0,
      systemArr: [
        { value: 0, label: "全部" },
        { value: 1, label: "已绑定" },
        { value: 2, label: "未绑定" }
      ],
      sourceType: 0,
      sourceID: 0,
      lapsetoType: 0,
      sourceArr: [
        { value: 0, label: "全部", source: 0, lapseto: 0 },
        { value: 1, label: "转出", source: 0, lapseto: 2 },
        { value: 2, label: "留治", source: 0, lapseto: 1 },
        { value: 3, label: "门诊", source: 1, lapseto: 1 },
        { value: 4, label: "住院", source: 2, lapseto: 1 }
      ],
      scheduling: [
        {
          value: 1,
          label: "已排班"
        },
        {
          value: 2,
          label: "未排班"
        }
      ],
      prescription: [
        {
          value: 1,
          label: "有处方"
        },
        {
          value: 2,
          label: "无处方"
        }
      ],
      tableData: null,
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
            text:"清空",
            onClick(picker) {
              picker.$emit("pick");
            }
          }
        ]
      },
      searchKey: "",
      // value2: '',
      total: 0,
      pageTotal: 0,
      pageSelect: 0,
      listQuery: {
        page: 1,
        limit: 10,
        schedul_type: 0,
        binding_state: 0,
        lapseto: 0,
        source: 0,
        start_time: "",
        end_time: "",
        keywords: "",
        contagion: "",
        reimbursement_way:'',
        isscheduling:"",
        isprescription:"",
      },
      multipleSelection: [],
      bindWechatDialog: false,
      contagionList:[],
      reimbursement_ways:[],
    };
  },
  created() {
    this.getList();
    this.contagionList = this.$store.getters.contagions;
    this.reimbursement_ways = this.$store.getters.reimbursement_ways;
  },
  methods: {
    openWechatBindDialog(){
      this.bindWechatDialog = true;
    },
    handleCheckAllChange(val) {
      console.log(val);
      console.log(this.checkAll);
      console.log(this.isIndeterminate);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.pageSelect = this.multipleSelection.length;
    },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    changeCategoryId(categoryId) {
      this.categoryId = categoryId;
    },
    selectSchedulType(scheduleType) {
      // alert(scheduleType);/
      this.schedulType = scheduleType;
      this.listQuery.schedul_type = scheduleType;
      this.getList();
    },
    selectSystemType(systemType) {
      this.systemType = systemType;
      this.listQuery.binding_state = systemType;
      this.getList();
    },
    selectLapseTo(sourceType, sourceID, lapseto) {
      this.sourceType = sourceType;
      this.sourceID = sourceID;
      this.lapsetoType = lapseto;
      this.listQuery.source = sourceID;
      this.listQuery.lapseto = lapseto; 
      this.getList();
    },
    changeTime(){
      this.getList();
    },
    search(){
      this.listQuery.keywords = this.searchKey;
      this.getList();
    },
    changeOtherSearch(){
      this.getList();
    },
    getList() {
      fetchList(this.listQuery).then(response => {
        if (response.data.state == 0) {
          this.$message.error(response.data.msg);
          return false;
        } else {
          this.tableData = response.data.data.patients;
          this.pageTotal = this.tableData.length;
          this.total = response.data.data.total;
        }
      });
    },
    
  //  components:{
  //    pagiNation
  //  }
  }
}
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

