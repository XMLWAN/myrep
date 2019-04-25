<template>

  <div class="app-container sign-and-weigh-box">

    <div class="filter-container">
      <span>入库退货时间:</span>
      <el-date-picker v-model="return_time" prefix-icon="el-icon-date" :editable="false" style="width: 196px;"
                      type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"></el-date-picker>

      <el-row style="float:right;">
        <el-button @click="handleSave" type="primary">确定</el-button>
      </el-row>
    </div>


    <el-row>
      <el-col>
        <div class="title">入库退货列表</div>
        <div style="margin-bottom: 10px;"></div>
        <el-table :data="salesReturnTableData" :class="signAndWeighBoxPatients" style="width: 100%" border
        >
          <el-table-column label="入库单号" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.warehousing_order}}
            </template>
          </el-table-column>

          <el-table-column label="规格名称" align="center" min-width="30">
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
              {{scope.row.warehousing_count}}

            </template>
          </el-table-column>

          <el-table-column label="入库单价" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.price}}

            </template>
          </el-table-column>

          <el-table-column label="退货数量" min-width="30" align="center">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.return_count" @blur="handleBlur(scope.$index, scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="30">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>

  </div>
</template>

<script>
  import {uParseTime} from "@/utils/tools";

  import {
    GetAllGoodInfo,
    GetAllGoodType,
    postSalesReturn,
    getWarehouseInfo
  } from "@/api/stock";

  export default {
    name: "stockIn",
    data() {
      return {
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        return_time: '',
        adminUserOptions: null,
        salesReturnTableData: [],
        total: '',
        isVisibility: false,
        goodInfo: [],
        goodType: [],
        isClick: false,
        OrderNumber:'',
      };
    },
    methods: {
      GetWarehouse:function () {
        let params ={
          ids:this.$route.query.id
        }
        getWarehouseInfo(params).then(response =>{
          if(response.data.state == 0){
              this.$message.error(response.data.msg)
              return false
          }else{
            this.salesReturnTableData = []
            for (let i = 0; i < response.data.data.info.length; i++) {
              let salesReturnInfo = {}
              this.OrderNumber = response.data.data.info[i].Warehousing.warehousing_order
              salesReturnInfo['id'] = response.data.data.info[i].id
              salesReturnInfo['warehousing_order'] = response.data.data.info[i].Warehousing.warehousing_order
              salesReturnInfo['good_id'] = response.data.data.info[i].good_id
              salesReturnInfo['good_type_id'] = response.data.data.info[i].good_type_id
              salesReturnInfo['warehousing_count'] = response.data.data.info[i].warehousing_count
              salesReturnInfo['price'] = response.data.data.info[i].price
              salesReturnInfo['return_count'] = ''
              salesReturnInfo['return_total'] = ''
              this.salesReturnTableData.push(salesReturnInfo)
            }

          }
        })
      },
      GetAllGoodType: function () {
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
      }, handleDelete: function (index, row) {
        this.$confirm('确认删除这条退货信息?', '删除退货信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.salesReturnTableData.splice(index, 1)
        }).catch(() => {
        });

      }, handleBlur: function (index, row) {
        if (this.salesReturnTableData[index].return_count == '') {
          this.$message.error('退货数量不能为空');
          return
        }
        // if (this.salesReturnTableData[index].return_count > this.salesReturnTableData[index].warehousing_count) {
        //   this.salesReturnTableData[index].return_count = ''
        //   this.$message.error('退货数量不能大于入库数量');
        //   return
        // }
      }, handleSave: function () {

        let total = 0
        let ids = []
        if(this.salesReturnTableData.length <= 0){
          this.$message.error('请新增退货的物品');
          return
        }

        for (let i = 0; i < this.salesReturnTableData.length; i++) {
          // if (this.salesReturnTableData[i].return_count > this.salesReturnTableData[i].warehousing_count) {
          //   this.$message.error('退货数量不能大于入库数量');
          //   return
          // }
          if (this.salesReturnTableData[i].return_count == '') {
            this.$message.error('退货数量不能为空');
            return
          }
          ids.push(this.salesReturnTableData[i].id)
          total = total + parseInt(this.salesReturnTableData[i].return_count)
        }




        let params = {
          'salesReturn':this.salesReturnTableData
        }
        postSalesReturn(params,this.return_time,total,ids.join("-"),this.OrderNumber).then(response=>{
          if (response.data.state==0) {
            this.$message.error(response.data.msg);
            return false;
          }else {
            this.$notify({
              title: "成功",
              message: "退货成功",
              type: "success",
              duration: 2000
            });
            this.$router.back(-1)
          }
        });

      }

    },
    mounted() {
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
      this.return_time = endTime

      this.GetAllGoodType()
      this.GetAllGoodInfo()
      this.GetWarehouse()


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

</style>
