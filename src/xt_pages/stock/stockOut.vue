<template>

  <div class="app-container sign-and-weigh-box">


    <div class="filter-container">
      <span>出库时间:</span>
      <el-date-picker v-model="start_time" prefix-icon="el-icon-date" :editable="false" style="width: 196px;"
                      type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd" @change="startTimeChange"></el-date-picker>
      <span class="">-</span>
      <el-date-picker v-model="end_time" prefix-icon="el-icon-date" :editable="false" style="width: 196px;"
                      type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd" @change="endTimeChange"></el-date-picker>

      <el-row style="float:right;">
        <el-button  type="primary"  @click="handleWarehouseOut">出库</el-button>
        <el-button type="info" @click="handleWarehouseOutReturn">出库退库</el-button>
        <el-button type="warning" @click="handleWarehouseOutReturnRecord">退库记录</el-button>
        <el-button type="danger" @click="handleWarehouseOutRecord">出库记录</el-button>
      </el-row>
    </div>


    <el-row :gutter="12">
      <el-col :span="8">
        <div class="title">出库记录
        </div>
        <div style="margin-bottom: 10px;">
        </div>
        <el-table :data="WarehouseOut.warehouseOutDate" :class="signAndWeighBoxPatients" style="width: 100%" border
                  highlight-current-row
                  @row-click="onRowClick"
                  :row-class-name="tableRowClassName"
                  highlight-current-row
                  v-loading="WarehouseOut.loading"
        >
          <el-table-column label="出库单号" min-width="40" align="center">
            <template slot-scope="scope">
              {{scope.row.warehouse_out_order_number}}
            </template>
          </el-table-column>
          <el-table-column label="出库时间" min-width="40" align="center">
            <template slot-scope="scope">
              {{ scope.row.warehouse_out_time | parseTime("{y}-{m}-{d}")}}

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
        <el-table :data="WarehouseOutInfo.warehouseOutInfoDate" :class="signAndWeighBoxPatients" style="width: 100%" border
                  v-loading="WarehouseOutInfo.loading"
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



          <el-table-column label="出库数量" min-width="30" align="center">
            <template slot-scope="scope">

              <span :class="scope.row.is_cancel == 1 ? 'count':''">{{scope.row.count}}</span>

            </template>
          </el-table-column>
          <el-table-column label="出库单价" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.price}}

            </template>
          </el-table-column>
          <el-table-column label="出库总价" min-width="30" align="center">
            <template slot-scope="scope">

              {{calculate(scope.row.price * scope.row.count) }}

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
    getWarehouseOutList,
    getWarehouseOutInfoList,
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

      this.GetWarehouseOut()
      this.GetAllGoodInfo()
      this.GetAllGoodType()
      this.fetchAllAdminUsers()

    },
    data() {
      return {
        page: 1,
        limit: 7,

        total: 0,
        pageTotal: 0,
        pageSelect: 0,
        adminUserOptions:[],
        multipleSelection:[],
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        start_time: '',
        end_time: '',
        goodType:[],
        goodInfo:[],
        WarehouseOut: {
          loading: false,
          warehouseOutDate: [],
          tableCurrentIndex:''
        },

        WarehouseOutInfo: {
          loading: false,
          warehouseOutInfoDate: [],
        }
      };
    },
    methods: {
      GetWarehouseOut:function () {
        // this.Warehouse.loading = true
        let Params = {
          page: this.page,
          limit: this.limit,
          start_time: this.start_time,
          end_time: this.end_time
        }
        this.WarehouseOut.warehouseOutDate = []
        this.WarehouseOutInfo.warehouseOutInfoDate = []

        getWarehouseOutList(Params).then(response => {
          if (response.data.state == 0) {

            this.WarehouseOut.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.total = response.data.data.total
            this.WarehouseOut.loading = false
            for (let i = 0; i < response.data.data.list.length; i++) {
              this.WarehouseOut.warehouseOutDate.push(response.data.data.list[i])
            }
          }
        });

      },tableRowClassName({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      onRowClick(row, event, column) {
        this.WarehouseOutInfo.warehouseOutInfoDate = []
        this.WarehouseOut.tableCurrentIndex = row.index;
        let params = {
          'id': row.id
        }
        this.WarehouseOutInfo.loading = true
        getWarehouseOutInfoList(params).then(response => {
          if (response.data.state == 0) {
            this.WarehouseOutInfo.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.WarehouseOutInfo.loading = false
            for (let i = 0; i < response.data.data.info.length; i++) {
              this.WarehouseOutInfo.warehouseOutInfoDate.push(response.data.data.info[i])
            }
          }
        });

      }, getXuserName(id){
        if (id<=0) {
          return "";
        }
        var name = "";
        console.log(this.adminUserOptions)
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


      },handleWarehouseOut:function () {
        sessionStorage.removeItem("warehousing_out_orders")
        this.$router.push({name:'addStockOut'});

      },handleWarehouseOutReturn:function () {

        if(this.multipleSelection.length <= 0){
          this.$message.error('请选择退库物品');
          return
        }

        let ids = []
        for (let i = 0; i < this.multipleSelection.length; i++){
          ids.push(this.multipleSelection[i].id)

        }
        this.$router.push({name:'cancelStock',query:{id:ids.join("&")}});


      },handleWarehouseOutReturnRecord:function () {

        this.$router.push({name:'cancelStockRecord'});

      },handleWarehouseOutRecord:function () {
        this.$router.push({name:'stockOutRecord'});

      },handleSelectionChange:function (val) {
        this.multipleSelection = val
      },calculate:function (val) {
        return Math.round(parseFloat(val)*100)/100
      }, startTimeChange(val) {
        this.GetWarehouseOut();
      }, endTimeChange(val) {
        this.GetWarehouseOut();
      }, handleSizeChange(val) {
        this.limit = val;
        this.GetWarehouseOut();
      }, handleCurrentChange(val) {
        this.page = val;
        this.GetWarehouseOut();
      },
    },
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
