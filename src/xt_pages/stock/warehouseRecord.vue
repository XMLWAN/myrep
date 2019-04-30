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
        <el-button @click="handleBack">返回</el-button>
      </el-row>
    </div>
    <el-row :gutter="12">
      <div class="title">入库记录
      </div>
      <el-table :data="WarehouseInfo.warehouseInfoDate" :class="signAndWeighBoxPatients" border
                v-loading="WarehouseInfo.loading"
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

        <el-table-column label="入库数量" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.warehousing_count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="入库单价" align="center">
          <template slot-scope="scope">
            {{scope.row.price}}

          </template>
        </el-table-column>
        <el-table-column label="入库总价" align="center">
          <template slot-scope="scope">
            {{calculate(scope.row.price * scope.row.warehousing_count)}}

          </template>
        </el-table-column>
        <el-table-column label="入库时间" align="center">
          <template slot-scope="scope">
            {{scope.row.Warehousing.warehousing_time | parseTime("{y}-{m}-{d}")}}

          </template>
        </el-table-column>
        <el-table-column label="入库单号" align="center">
          <template slot-scope="scope">
            {{scope.row.Warehousing.warehousing_order}}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRows(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>


      <el-pagination
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
  import {deleteStockInRecord, GetAllGoodInfo, GetAllGoodType, getAllWarehouseInfo} from "@/api/stock";

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
      GetWarehouse: function () {
        let Params = {
          page: this.page,
          limit: this.limit,
          start_time: this.start_time,
          end_time: this.end_time
        }
        this.WarehouseInfo.warehouseInfoDate = []
        getAllWarehouseInfo(Params).then(response => {
          if (response.data.state == 0) {
            this.WarehouseInfo.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.WarehouseInfo.loading = false
            this.total = response.data.data.total
            for (let i = 0; i < response.data.data.list.length; i++) {
              this.WarehouseInfo.warehouseInfoDate.push(response.data.data.list[i])
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
        this.GetWarehouse();
      }, handleCurrentChange(val) {
        this.page = val;
        this.GetWarehouse();
      }, calculate: function (val) {
        return Math.round(parseFloat(val) * 100) / 100
      }, startTimeChange: function () {
        this.GetWarehouse()
      }, endTimeChange: function () {
        this.GetWarehouse()

      },deleteRows:function (row) {
        let params = {
          record_id: row.id,
          good_id: row.good_id,
          order_number: row.Warehousing.warehousing_order,
        }
        deleteStockInRecord(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.$message.success(response.data.data.msg);

            for (let i = 0; i < this.WarehouseInfo.warehouseInfoDate.length; i++){
              console.log(this.WarehouseInfo.warehouseInfoDate[i].id)
              console.log(row.id)

              if (this.WarehouseInfo.warehouseInfoDate[i].id == row.id){
                this.WarehouseInfo.warehouseInfoDate.splice(i,1)
              }
            }

          }
        });

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
   border-radius: 4 px 4 px 0 0;
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
