<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input   style="width: 400px;" v-model="searchKey" class="filter-item" placeholder="病人姓名/透析号"/>
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="search" >搜索</el-button>
      <!-- <el-button  class="filter-item" type="primary" style="float:right;" icon="el-icon-download" >批量导入</el-button> -->
      <!-- <el-button  type="primary" plain style="float:right;" icon="el-icon-download" >批量导入</el-button>       -->
      <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click="$router.push({path:'/patients/create'})" class="filter-item" style="float:right;" type="primary" icon="el-icon-edit" >新增病人</el-button>
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
    <!-- <div class="cell clearfix">
	    <label class="title"><span class="name">病人来源</span> : </label>
	    <div class="time ">
        <ul class="">
          <li :class="item.value==sourceType?'active':''" :style="item.source>0&&lapsetoType!=1?'display:none;':''" @click="selectLapseTo(item.value, item.source, item.lapseto)" v-for="item in sourceArr" :key="item.value" >{{item.label}}</li>
        </ul>
      </div>
    </div> -->
    <div class="cell clearfix">
	    <label class="title"><span class="name">转归情况</span> : </label>
	    <div class="time ">
        <ul class="">
          <li :class="item.lapseto==lapsetoType?'active':''"  @click="selectLapseTo( item.lapseto)" v-for="item in lapsetoArr" :key="item.value" >{{item.label}}</li>
        </ul>
      </div>
    </div>
    <div class="cell clearfix">
	    <label class="title"><span class="name">病人来源</span> : </label>
	    <div class="time ">
        <ul class="">
          <li :class="item.source==sourceType?'active':''" @click="selectSource(item.source)" v-for="item in sourceArr" :key="item.value" >{{item.label}}</li>
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
            <router-link :to="'/patients/patient/'+scope.row.id" style="color:#409eff" >{{scope.row.name}}</router-link>
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
        <!-- <el-table-column min-width="150" label="二维码" align="center">
          <template slot-scope="scope"  type="text">
            <a style="color:#409eff"  v-if="scope.row.binding_state==1" @click="openWechatBindDialog">已绑定</a>
            <a style="color:#409eff"  v-else @click="openWechatBindDialog">生成</a>
          </template>
        </el-table-column> -->
        <el-table-column  label="日期"  min-width="144" align="center">
          <template slot-scope="scope">
          <span>{{scope.row.created_time | parseTime('{y}-{m}-{d}')}}</span>
        </template>
        </el-table-column>
        <el-table-column  label="转归" align="center">
          <template slot-scope="scope">
          <span>{{LapsetoInfo(scope.row)}}</span>
        </template>
        </el-table-column>
        <el-table-column  label="操作" align="center">
          <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="OpenSetLapseto(scope.row, scope.$index)">转归</el-button>
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
    <el-dialog title="转归" :visible.sync="LapsetoDialogVisible">
      <el-form :model="lapsetoForm" :rules="lapsetoRules" ref="lapsetoForm" >
        <el-form-item label="治疗状态（转归）" prop="lapseto_type" required> 
          <el-radio-group v-model="lapsetoForm.lapseto_type">
              <el-radio v-for="item in lapsetoOptions" :key="item.value" :label="item.value" :value="item.value" >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="转归时间" prop="lapseto_time" required>
          <el-date-picker
            v-model="lapsetoForm.lapseto_time"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="LapsetoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditLapseto()">确 定</el-button>
      </div>
    </el-dialog>

    </div> 
    
</template>


<script>
import { fetchList,EditLapseto } from "@/api/patient";

export default {
  name: "Patient",
  data() {
    return {
      lapsetoRules: {
        lapseto_type: [
          { required: true, message: '请选择治疗状态' },
        ],
        lapseto_time: [
          { required: true, message: '请选择转归时间' },
        ],
      },
      currentIndex:-1,
      LapsetoDialogVisible:false,
      checkAll: false,
      isIndeterminate: true,
      wechatbindimg:"",
      active: true,
      schedulType: 0,
      lapsetoForm:{
        lapseto_type:0,
        lapseto_time:'',
        patient_id:0,
      },
      schedulArr: [
        { value: 0, label: "全部" },
        { value: 1, label: "上午" },
        { value: 2, label: "下午" },
        { value: 3, label: "晚上" }
      ],
      lapsetoOptions: [{ value: 1, label: "留治" }, { value: 2, label: "转出" }],
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
        // { value: 1, label: "转出", source: 0, lapseto: 2 },
        // { value: 2, label: "留治", source: 0, lapseto: 1 },
        { value: 3, label: "门诊", source: 1, lapseto: 1 },
        { value: 4, label: "住院", source: 2, lapseto: 1 }
      ],
      lapsetoArr: [
        { value: 0, label: "全部", source: 0, lapseto: 0 },
        { value: 1, label: "转出", source: 0, lapseto: 2 },
        { value: 2, label: "留治", source: 0, lapseto: 1 },
        // { value: 3, label: "门诊", source: 1, lapseto: 1 },
        // { value: 4, label: "住院", source: 2, lapseto: 1 }
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
      patient:null,
    };
  },
  created() {
    this.getList();
    this.contagionList = this.$store.getters.contagions;
    this.reimbursement_ways = this.$store.getters.reimbursement_ways;

    const keyword = this.$route.query && this.$route.query.keyword;
    if (typeof(keyword)=="string" && keyword.length>0){
      this.listQuery.keywords = keyword;
      this.searchKey = keyword;
    }
  },
  methods: {
    EditLapseto(){
      EditLapseto(this.lapsetoForm.patient_id, this.lapsetoForm).then(response=>{
        if(response.data.state==1) {
          this.$notify({
            title: "成功",
            message: "转归设置完成",
            type: "success",
            duration: 2000
          });
          this.tableData[this.currentIndex].lapseto = this.lapsetoForm.lapseto_type;
          this.currentIndex = -1;
          this.LapsetoDialogVisible = false;

        }else {
          this.$message.error(response.data.msg);
        }
      });
    },
    OpenSetLapseto(row, index){
      this.patient = row;
      this.currentIndex = index;
      this.lapsetoForm.lapseto_time = '';
      this.lapsetoForm.lapseto_type = row.lapseto;
      this.lapsetoForm.patient_id = row.id;
      this.LapsetoDialogVisible = true;
    },
    LapsetoInfo(row) {
      if(typeof(row.lapseto) == "undefined" || (row.lapseto != 1 && row.lapseto != 2)) {
        return '未设置';
      } else if (row.lapseto ==1 ) {
        return '留治';
      }else {
        return '转出';
      }
    },
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
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
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
    selectLapseTo(lapseto) {
      this.lapsetoType = lapseto;
      this.listQuery.lapseto = lapseto; 
      this.getList();
    },
    selectSource(source) {
      this.sourceType = source;
      this.listQuery.source = source; 
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
          padding: 6px 10px;
          color: #606266;
          border-radius: 4px;
          margin: 0 4px 0 0;
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

