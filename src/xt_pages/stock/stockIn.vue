<template>

  <div class="app-container sign-and-weigh-box">


    <div class="filter-container">
      <span>入库时间:</span>
      <el-date-picker v-model="start_time" prefix-icon="el-icon-date" :editable="false" style="width: 196px;"
                      type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd" @change="startTimeChange"></el-date-picker>
      <span class="">-</span>
      <el-date-picker v-model="end_time" prefix-icon="el-icon-date" :editable="false" style="width: 196px;"
                      type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd" @change="endTimeChange"></el-date-picker>

      <el-row style="float:right;">
        <el-button @click="handleWarehouse" type="primary">入库</el-button>
        <el-button @click="handleReturnSales" type="info">退货</el-button>
        <el-button @click="handleReturnSalesRecord" type="warning">退货记录</el-button>
        <el-button @click="handleWarehouseRecord" type="danger">入库记录</el-button>
      </el-row>
    </div>


    <el-row :gutter="12">
      <el-col :span="8">
        <div class="title">入库记录
        </div>
        <div style="margin-bottom: 10px;">
        </div>
        <el-table :data="Warehouse.warehouseDate" :class="signAndWeighBoxPatients" style="width: 100%" border
                  highlight-current-row
                  @row-click="onRowClick"
                  :row-class-name="tableRowClassName"
                  highlight-current-row
                  v-loading="Warehouse.loading"
        >
          <el-table-column label="入库单号" min-width="40" align="center">
            <template slot-scope="scope">
              {{scope.row.warehousing_order}}

            </template>
          </el-table-column>
          <el-table-column label="入库时间" min-width="40" align="center">
            <template slot-scope="scope">
              {{ scope.row.warehousing_time | parseTime("{y}-{m}-{d}")}}
              <!--<input/>-->
              <!--<span></span>-->
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
        <el-table :data="WarehouseInfo.warehouseInfoDate" :class="signAndWeighBoxPatients" style="width: 100%" border
                  v-loading="WarehouseInfo.loading"
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

          <el-table-column label="入库数量" min-width="30" align="center">
            <template slot-scope="scope">
              <span :class="scope.row.is_return == 1 ? 'count':''">{{scope.row.warehousing_count}}</span>
            </template>
          </el-table-column>
          <el-table-column label="入库单价" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.price}}

            </template>
          </el-table-column>
          <el-table-column label="入库总价" min-width="30" align="center">
            <template slot-scope="scope">
              {{calculate(scope.row.price*scope.row.warehousing_count)}}


            </template>
          </el-table-column>
          <el-table-column label="物品批号" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.number}}
            </template>
          </el-table-column>
          <el-table-column label="生产日期" min-width="30" align="center">
            <template slot-scope="scope" v-if="scope.row.product_date != 0">
              {{scope.row.product_date | parseTime("{y}-{m}-{d}")}}
            </template>
          </el-table-column>
          <el-table-column label="有效日期" min-width="30" align="center">
            <template slot-scope="scope">
              {{ scope.row.expiry_date | parseTime("{y}-{m}-{d}")}}

            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {uParseTime} from "@/utils/tools";
  import {fetchAllDoctorAndNurse, fetchAllAdminUsers} from "@/api/doctor";
  import {
    getWarehouseList,
    getWarehouseInfoList,
    GetAllGoodInfo,
    GetAllGoodType,
  } from "@/api/stock";

  export default {
    name: "stockIn",
    created() {
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
      this.GetWarehouse()
      this.GetAllGoodInfo()
      this.GetAllGoodType()
      this.fetchAllAdminUsers()

      sessionStorage.setItem("111","2222")


    },
    data() {
      return {
        page: 1,
        limit: 7,

        total: 0,
        pageTotal: 0,
        pageSelect: 0,
        adminUserOptions:[],
        multipleSelection: [],
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        start_time: '',
        end_time: '',
        goodType: [],
        goodInfo: [],
        Warehouse: {
          loading: false,
          warehouseDate: [],
          tableCurrentIndex: ''
        },

        WarehouseInfo: {
          loading: false,
          warehouseInfoDate: [],
        }
      };
    },
    methods: {
      GetWarehouse: function () {
        let Params = {
          page: this.page,
          limit: this.limit,
          start_time: this.start_time,
          end_time: this.end_time
        }
        this.Warehouse.warehouseDate = []
        getWarehouseList(Params).then(response => {
          if (response.data.state == 0) {

            this.Warehouse.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.Warehouse.loading = false
            this.total = response.data.data.total
            for (let i = 0; i < response.data.data.list.length; i++) {
              this.Warehouse.warehouseDate.push(response.data.data.list[i])
            }
          }
        });

      }, tableRowClassName({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      onRowClick(row, event, column) {
        this.WarehouseInfo.warehouseInfoDate = []
        this.Warehouse.tableCurrentIndex = row.index;
        let params = {
          'id': row.id
        }
        this.WarehouseInfo.loading = true
        getWarehouseInfoList(params).then(response => {
          if (response.data.state == 0) {
            this.WarehouseInfo.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.WarehouseInfo.loading = false
            for (let i = 0; i < response.data.data.info.length; i++) {
              this.WarehouseInfo.warehouseInfoDate.push(response.data.data.info[i])
            }
          }
        });

      }, getXuserName(id) {
        if (id <= 0) {
          return "";
        }
        var name = "";
        if (this.adminUserOptions == null || typeof(this.adminUserOptions.length) == "undefined") {
          return name;
        }
        var leng = this.adminUserOptions.length;
        if (leng == 0) {
          return name;
        }
        for (let index = 0; index < leng; index++) {
          if (this.adminUserOptions[index].id == id) {
            name = this.adminUserOptions[index].name;
            break;
          }
        }
        return name;
      }, fetchAllDoctorAndNurse() {
        fetchAllDoctorAndNurse().then(response => {
          if (response.data.state == 1) {
            this.doctorOptions = response.data.data.doctors;
          }
        });
      },
      fetchAllAdminUsers() {
        fetchAllAdminUsers().then(response => {
          console.log(response)
          if (response.data.state == 1) {
            this.adminUserOptions = response.data.data.users;
            var alen = this.adminUserOptions.length;
            for (let index = 0; index < alen; index++) {
              if (this.adminUserOptions[index].user_type == 2) {
                // this.doctorOptions.push(this.adminUserOptions[index]);
              }
            }
          }
        });
      }, getSpecificationName: function (id) {
        let name = ''
        for (let i = 0; i < this.goodInfo.length; i++) {
          if (this.goodInfo[i].id == id) {
            name = this.goodInfo[i].specification_name
          }

        }

        return name

      }, getTypeName: function (id) {
        let name = ''
        for (let i = 0; i < this.goodType.length; i++) {
          if (this.goodType[i].id == id) {
            name = this.goodType[i].type_name
          }
        }
        return name
      }, GetAllGoodType: function () {
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


      }, GetAllGoodInfo: function () {
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


      }, clicks: function () {
        console.log(this.WarehouseInfo.warehouseInfoDate)

      }, handleWarehouse: function () {
        sessionStorage.removeItem("warehousing_orders")
        this.$router.push({path: '/stock/in/add'})
      }, handleReturnSales: function () {
        // this.$router.push({path:'/patients/create'}
        if (this.multipleSelection.length <= 0) {
          this.$message.error('请选择退货物品');
          return
        }

        let ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)

        }
        this.$router.push({name: 'salesReturn', query: {id: ids.join("&")}});

      }, handleReturnSalesRecord: function () {
        this.$router.push({name: 'salesReutrnRecord'});

      }, handleWarehouseRecord: function () {
        this.$router.push({name: 'warehouseRecord'});


      }, handleSelectionChange: function (val) {
        this.multipleSelection = val
      }, handleSizeChange(val) {
        this.limit = val;
        this.GetWarehouse();
      }, handleCurrentChange(val) {
        this.page = val;
        this.GetWarehouse();
      }, startTimeChange(val) {
        this.GetWarehouse();
      }, endTimeChange(val) {
        this.GetWarehouse();
      }, calculate: function (val) {
        return Math.round(parseFloat(val) * 100) / 100
      }
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

  .count {
    color: #bd2c00;

  }

</style>
