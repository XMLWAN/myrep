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
        <el-button @click="handleBack">返回</el-button>
      </el-row>
    </div>
    <el-row :gutter="12">
      <div class="title">出库记录
      </div>
      <el-table :data="WarehouseOutInfo.warehouseOutInfoDate" :class="signAndWeighBoxPatients" border
                v-loading="WarehouseOutInfo.loading"
      >
        <el-table-column
          type="selection"
        >
        </el-table-column>
        <el-table-column label="规格名称" align="center">
          <template slot-scope="scope">
            {{getSpecificationName(scope.row.good_id)}}
          </template>
        </el-table-column>
        <el-table-column label="物品类型" align="center">
          <template slot-scope="scope">
            {{getTypeName(scope.row.good_type_id)}}
          </template>
        </el-table-column>

        <el-table-column label="出库数量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="出库单价" align="center">
          <template slot-scope="scope">
            {{scope.row.price}}

          </template>
        </el-table-column>
        <el-table-column label="出库总价" align="center">
          <template slot-scope="scope">

            {{calculate(scope.row.price * scope.row.count) }}


          </template>
        </el-table-column>
        <el-table-column label="出库时间" align="center">
          <template slot-scope="scope">
            {{scope.row.WarehouseOut.warehouse_out_time | parseTime("{y}-{m}-{d}")}}

          </template>
        </el-table-column>
        <el-table-column label="出库单号" align="center">
          <template slot-scope="scope">
            {{scope.row.WarehouseOut.warehouse_out_order_number}}
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
    getAllStockOutList,
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


    },
    data() {
      return {
        total:0,
        multipleSelection: [],
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        start_time: '',
        end_time: '',
        goodType: [],
        goodInfo: [],
        WarehouseOutInfo: {
          loading: false,
          warehouseOutInfoDate: [],
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
        this.WarehouseOutInfo.warehouseOutInfoDate = []
        getAllStockOutList(Params).then(response => {
          if (response.data.state == 0) {
            this.WarehouseOutInfo.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.WarehouseOutInfo.loading = false
            this.total = response.data.data.total
            for (let i = 0; i < response.data.data.list.length; i++) {
              this.WarehouseOutInfo.warehouseOutInfoDate.push(response.data.data.list[i])
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
      } ,startTimeChange(val) {
        this.GetWarehouse();
      }, endTimeChange(val) {
        this.GetWarehouse();
      },calculate:function (val) {
        return Math.round(parseFloat(val)*100)/100
      },
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
