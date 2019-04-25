<template>

  <div class="app-container sign-and-weigh-box">

    <el-row :gutter="12">
      <div class="title">库存列表
      </div>
      <el-table :data="WarehouseInfo.warehouseInfoDate" :class="signAndWeighBoxPatients" border
                v-loading="WarehouseInfo.loading"
      >

        <el-table-column label="物品编码" align="center">
          <template slot-scope="scope">
            {{scope.row.good_code}}
          </template>
        </el-table-column>
        <el-table-column label="规格名称" align="center">
          <template slot-scope="scope">

            <span>{{scope.row.specification_name}}</span>

          </template>
        </el-table-column>
        <el-table-column label="入库数量" align="center" >
          <template slot-scope="scope">
            <span @click="showStockInDetailDialog(scope.row.good_id)" style="color: blue">{{stockInCount(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="入库退货" align="center">
          <template slot-scope="scope">
            <span @click="showSaleReturnDetailDialog(scope.row)" style="color: red">{{salesReturnCount(scope.row)}}</span>

          </template>
        </el-table-column>
        <el-table-column label="实际入库" align="center">
          <template slot-scope="scope">
            {{stockInCount(scope.row) - salesReturnCount(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column label="出库数量" align="center">
          <template slot-scope="scope">
            <span @click="showStockOutDetailDialog(scope.row.good_id)" style="color: blue">{{stockOutCount(scope.row)}}</span>

          </template>
        </el-table-column>
        <el-table-column label="出库退库" align="center">
          <template slot-scope="scope">
            <span @click="showCancelStockDetailDialog(scope.row)"  style="color: red">{{cancelStockCount(scope.row)}}</span>

          </template>
        </el-table-column>
        <el-table-column label="实际出库" align="center">
          <template slot-scope="scope">
            {{stockOutCount(scope.row) - cancelStockCount(scope.row)}}
          </template>
        </el-table-column>

        <el-table-column label="剩余库存" align="center">
          <template slot-scope="scope" >
            <span  style="color: red">{{(stockInCount(scope.row) - salesReturnCount(scope.row) - stockOutCount(scope.row)) + cancelStockCount(scope.row)}}</span>
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

    </el-row>
  </div>
</template>

<script>
  import {uParseTime} from "@/utils/tools";
  import {
    getAllStockQueryList,
    GetAllGoodInfo,
    GetAllGoodType,
  } from "@/api/stock";

  export default {
    name: "stockIn",
    created() {
      this.GetAllStockQuery()
      this.GetAllGoodInfo()
      this.GetAllGoodType()
    },
    data() {
      return {
        total: 0,
        multipleSelection: [],
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        start_time: '',
        end_time: '',
        page: 1,
        limit: 7,
        goodType: [],
        goodInfo: [],
        WarehouseInfo: {
          loading: false,
          warehouseInfoDate: [],
        }
      };
    },
    methods: {
      GetAllStockQuery: function () {
        let Params = {
          page: this.page,
          limit: this.limit,
        }
        this.WarehouseInfo.loading = true

        this.WarehouseInfo.warehouseInfoDate = []
        getAllStockQueryList(Params).then(response => {
          if (response.data.state == 0) {
            this.WarehouseInfo.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.WarehouseInfo.loading = false
            this.total = response.data.data.total
            for (let i = 0; i < response.data.data.list.length; i++) {
              if(response.data.data.list[i].query_warehousing_info.length > 0){
                this.WarehouseInfo.warehouseInfoDate.push(response.data.data.list[i])
              }else{
                this.total = this.total -1
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
      }, handleBack: function () {
        this.$router.go(-1)
      }, handleSizeChange(val) {
        this.limit = val;
        this.GetAllStockQuery();
      }, handleCurrentChange(val) {
        this.page = val;
        this.GetAllStockQuery();
      }, calculate: function (val) {
        return Math.round(parseFloat(val) * 100) / 100
      }, startTimeChange: function () {
        this.GetAllStockQuery()
      }, endTimeChange: function () {
        this.GetAllStockQuery()

      },stockInCount:function (row) {
        let total = 0
        for(let i = 0; i < row.query_warehousing_info.length; i++ ){
          total =   total+  row.query_warehousing_info[i].warehousing_count
        }
        return total

      },salesReturnCount:function (row) {
        let total = 0
        for(let i = 0; i < row.query_sales_return_info.length; i++ ){
          total = total + row.query_sales_return_info[i].count
        }
        return total

      },stockOutCount:function (row) {
        let total = 0
        for(let i = 0; i < row.query_warehouseout_info.length; i++ ){
          total =   total+  row.query_warehouseout_info[i].count
        }
        return total

      },cancelStockCount:function (row) {
        let total = 0
        for(let i = 0; i < row.query_cancel_stock_info.length; i++ ){
          total =   total+  row.query_cancel_stock_info[i].count
        }
        return total
      },showStockInDetailDialog:function (val) {


      },showSaleReturnDetailDialog:function () {


      },showStockOutDetailDialog:function () {


      },showCancelStockDetailDialog:function () {


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

  .count {
    color: #bd2c00;

  }

</style>
