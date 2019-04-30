<template>

  <div class="app-container sign-and-weigh-box">


    <div class="filter-container">
      <span>出库退库:</span>
      <el-date-picker v-model="start_time" prefix-icon="el-icon-date" :editable="false" style="width: 196px;"
                      type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd" @change="startTimeChange"></el-date-picker>
      <span class="">-</span>
      <el-date-picker v-model="end_time" prefix-icon="el-icon-date" :editable="false" style="width: 196px;"
                      type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd" @change="endTimeChange"></el-date-picker>
      <el-row style="float:right;">
        <el-button @click="handleBack">返回</el-button>
      </el-row>

    </div>


    <el-row :gutter="12">
      <el-col :span="8">
        <div class="title">出库退库记录
        </div>
        <div style="margin-bottom: 10px;">
        </div>
        <el-table :data="cancelStock.cancelStockDate" :class="signAndWeighBoxPatients" style="width: 100%" border
                  @row-click="onRowClick"
                  :row-class-name="tableRowClassName"
                  highlight-current-row
                  v-loading="cancelStock.loading"
        >
          <el-table-column label="退库单号" min-width="40" align="center">
            <template slot-scope="scope">
              {{scope.row.order_number}}

            </template>
          </el-table-column>
          <el-table-column label="操作时间" min-width="40" align="center">
            <template slot-scope="scope">
              {{ scope.row.opera_time | parseTime("{y}-{m}-{d}")}}
            </template>
          </el-table-column>
          <el-table-column label="退库总量" align="center" min-width="30">
            <template slot-scope="scope">
              {{scope.row.total}}
            </template>
          </el-table-column>

          <el-table-column label="操作人" align="center" min-width="30">
            <template slot-scope="scope">
              {{getXuserName(scope.row.creater)}}
            </template>
          </el-table-column>


        </el-table>


        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[7]"
          :page-size="7"
          background
          style="margin-top:20px;"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>

      <el-col :span="16">
        <div class="title">物品详细信息
        </div>
        <el-table :data="cancelStockInfo.cancelStockInfoDate" :class="signAndWeighBoxPatients" style="width: 100%" border
                  v-loading="cancelStockInfo.loading"
                  @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="规格名称" min-width="30" align="center">
            <template slot-scope="scope">
              {{getSpecificationName(scope.row.good_id)}}
            </template>
          </el-table-column>
          <el-table-column label="物品类型" min-width="30" align="center">
            <template slot-scope="scope">
              {{getTypeName(scope.row.good_type_id)}}

            </template>
          </el-table-column>

          <el-table-column label="退库数量" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.count}}
            </template>
          </el-table-column>
          <el-table-column label="退库单价" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.price}}

            </template>
          </el-table-column>
          <el-table-column label="退库总价" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.price * scope.row.count }}
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {uParseTime} from "@/utils/tools";
  import { fetchAllDoctorAndNurse,fetchAllAdminUsers } from "@/api/doctor";
  import {
    getCancelStockList,
    getCancelStockInfoList,
    GetAllGoodInfo,
    GetAllGoodType,
  } from "@/api/stock";

  export default {
    name: "stockIn",
    created(){
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      if (parseInt(day) < 10) {
        day = "0" + day;
      }
      let endTime = year + '-' + month + '-' + day;
      this.end_time = endTime


      var year = new Date().getFullYear();
      var month = new Date().getMonth();
      var day = new Date().getDate();
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      if (parseInt(day) < 10) {
        day = "0" + day;
      }
      let startTime = year + '-' + month + '-' + day;
      this.start_time = startTime

      this.GetAllGoodInfo()
      this.GetAllGoodType()
      this.GetCancelStockList()
      this.fetchAllAdminUsers()

    },
    data() {
      return {
        adminUserOptions:[],
        multipleSelection: [],
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        start_time: '',
        end_time: '',
        goodType:[],
        goodInfo:[],

        cancelStock: {
          loading: false,
          cancelStockDate: [],
          tableCurrentIndex:''
        },

        cancelStockInfo: {
          loading: false,
          cancelStockInfoDate: [],
        },

      };
    },
    methods: {
      GetCancelStockList:function () {
        let Params = {
          page: this.page,
          limit: this.limit,
          start_time: this.start_time,
          end_time: this.end_time
        }
        this.cancelStock.cancelStockDate = []
        getCancelStockList(Params).then(response =>{
          if (response.data.state == 0) {
            this.cancelStock.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.cancelStock.loading = false
            this.total = response.data.data.total

            for (let i = 0; i < response.data.data.list.length; i++) {
              this.cancelStock.cancelStockDate.push(response.data.data.list[i])
            }
          }
        })
      },  tableRowClassName({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;

      }, onRowClick(row, event, column) {
        this.cancelStockInfo.cancelStockInfoDate = []
        this.cancelStock.tableCurrentIndex = row.index;
        let params = {
          'id': row.id
        }
        this.cancelStockInfo.loading = true
        getCancelStockInfoList(params).then(response => {
          if (response.data.state == 0) {
            this.cancelStockInfo.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.cancelStockInfo.loading = false
            for (let i = 0; i < response.data.data.info.length; i++) {
              this.cancelStockInfo.cancelStockInfoDate.push(response.data.data.info[i])
            }
          }
        });

      },getXuserName(id){
        if (id<=0) {
          return "";
        }
        var name = "";
        if (this.adminUserOptions==null || typeof(this.adminUserOptions.length) == "undefined") {
          return name;
        }
        var leng = this.adminUserOptions.length;
        if (leng==0) {
          return name;
        }
        for (let index = 0; index < leng; index++) {
          if (this.adminUserOptions[index].id == id) {
            name = this.adminUserOptions[index].name;
            break;
          }
        }
        return name;
      },fetchAllDoctorAndNurse() {
        fetchAllDoctorAndNurse().then(response => {
          if (response.data.state == 1) {
            this.doctorOptions = response.data.data.doctors;
          }
        });
      },
      fetchAllAdminUsers() {
        fetchAllAdminUsers().then(response => {
          if (response.data.state == 1) {
            this.adminUserOptions = response.data.data.users;
            var alen = this.adminUserOptions.length;
            for (let index = 0; index < alen; index++) {
              if (this.adminUserOptions[index].user_type==2) {
                this.doctorOptions.push(this.adminUserOptions[index]);
              }
            }
          }
        });
      },getSpecificationName:function (id) {
        let name = ''
        for (let i = 0; i< this.goodInfo.length; i++){
          if( this.goodInfo[i].id == id){
            name = this.goodInfo[i].specification_name
          }

        }

        return name

      },getTypeName:function (id) {
        let name = ''
        for (let i = 0; i< this.goodType.length; i++){
          if( this.goodType[i].id == id){
            name = this.goodType[i].type_name
          }
        }
        return name
      },GetAllGoodType:function () {
        GetAllGoodType().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            for (let i = 0; i < response.data.data.goodType.length; i++) {
              this.goodType.push(response.data.data.goodType[i])
            }
          }
        });


      },GetAllGoodInfo:function () {
        GetAllGoodInfo().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            for (let i = 0; i < response.data.data.goodInfo.length; i++) {
              this.goodInfo.push(response.data.data.goodInfo[i])
            }
          }
        });


      },handleSelectionChange:function (val) {
        this.multipleSelection = val
      },handleBack: function () {
        this.$router.go(-1)
      },startTimeChange(val) {
      this.GetWarehouse();
    }, endTimeChange(val) {
      this.GetWarehouse();
    }


    },
    watch: {
      $route() {
        if (this.$route.path == '/stock/in') {


        }

      }
    }
  };
</script>

<style rel="stylesheet/css" lang="scss" scoped>
  .information {
    border: 1px #dcdfe6 solid;
    padding: 30px 20px 30px 20px;

    .border {
      border-bottom: 1px #dcdfe6 solid;
      margin: 0px 0 20px 0;
    }
  }

  .title {
    background: #409eff;
    height: 44px;
    line-height: 44px;
    padding: 0 0 0 10px;
    color: #fff;
    margin: 0 0 10px 0;
    // border-radius: 4px 4px 0 0;
  }

  .edit_separater {
    border-top: 1px solid rgb(233, 233, 233);
    margin-top: 15px;
    margin-bottom: 15px;
  }

</style>

<style>
  .sign-and-weigh-box .sign-and-weigh-box-patients .cell {
    font-size: 12px;
  }

  .sign-and-weigh-box .sign-and-weigh-box-patients .current-row > td {
    background: #6fb5fa;
  }

  .count{
    color: #bd2c00;

  }

</style>
