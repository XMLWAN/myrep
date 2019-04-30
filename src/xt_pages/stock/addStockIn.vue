<template>

  <div class="app-container sign-and-weigh-box">

    <stock-in-dialog :propForm="propForm"
                     :visibility="isVisibility"
                     v-on:dialog-comfirm="comfirm"
                     v-on:dialog-cancle="cancle"></stock-in-dialog>

    <div class="filter-container">
      <span>入库时间:</span>
      <el-date-picker v-model="warehousing_time" prefix-icon="el-icon-date" :editable="false" style="width: 196px;"
                      type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"></el-date-picker>


      <el-row style="float:right;">
        <el-button @click="handleCancle" type="primary">返回</el-button>
        <el-button @click="handleCreate" type="primary">添加</el-button>
      </el-row>
    </div>


    <el-row>
      <el-col>
        <div class="title">入库列表
        </div>
        <div style="margin-bottom: 10px;">
        </div>
        <el-table :data="recordInfo.recordData" :class="signAndWeighBoxPatients" style="width: 100%" border
        >
          <el-table-column label="物品类型" min-width="30" align="center">
            <template slot-scope="scope">
              {{typeName(scope.row.good_type_id)}}
            </template>
          </el-table-column>
          <el-table-column label="规格名称" min-width="30" align="center">
            <template slot-scope="scope">
              {{specificationName(scope.row.good_id)}}
            </template>
          </el-table-column>
          <el-table-column label="批号" align="center" min-width="30">
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
          <el-table-column label="物品总价" min-width="30" align="center">
            <template slot-scope="scope">
              {{calculate(scope.row.price*scope.row.warehousing_count)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="70">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="showDetails(scope.$index, scope.row)">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>


    </el-row>

  </div>
</template>

<script>
  import stockInDialog from './Dialog/stockInDialog'
  import {uParseTime} from "@/utils/tools";

  import {
    GetAllGoodInfo,
    GetAllGoodType,
    postWarehouse,
    getWarehouseInfoByOrdeNumber,
    modifyWarehouseInfo,
    deleteWarehouseInfo
  } from "@/api/stock";

  export default {
    components: {stockInDialog},
    name: "stockIn",
    data() {
      return {
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        warehousing_time: '',
        adminUserOptions: null,

        recordInfo: {
          recordData: [],
          stock_in_code: '',
          current_index: '',
          warehousing_order: '',

        },
        total: '',

        //prop
        isVisibility: false,
        propForm: {
          goodType: [],
          goodInfo: [],
          title: '入库',
          formValue: {
            good_type_id: '',
            good_id: '',
            number: '',
            product_date: '',
            expiry_date: '',
            warehousing_count: '',
            price: '',
            remark: '',
            dealer: '',
            manufacturer: ''

          },
          isCreated: 1,

        },

        goodInfo: {
          loading: false,
          goodTypeData: [],
          type_code: '',
        }


      };
    },
    methods: {
      handleSave: function () {
        if (this.recordInfo.recordData.length <= 0) {
          this.$message.error('请添加入库信息');
          return
        }
        sessionStorage.removeItem("warehousing_orders")
        this.$router.back(-1)

      }, handleCancle: function () {
        this.$confirm('是否放弃编辑返回上一页?', '放弃编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem("warehousing_orders")
          this.$router.back(-1)
        }).catch(() => {

        });

      }, handleCreate: function () {
        this.propForm.formValue = {}
        this.propForm.isCreated = 1
        this.isVisibility = true


      }, comfirm: function (val) {
        this.isVisibility = false
        if (val.isCreated == 2) { //修改
          val['warehousing_order'] = sessionStorage.getItem("warehousing_orders")
          modifyWarehouseInfo(val).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.recordInfo.recordData[this.recordInfo.current_index].good_type_id = response.data.data.info.good_type_id
              this.recordInfo.recordData[this.recordInfo.current_index].good_id = response.data.data.info.good_id
              this.recordInfo.recordData[this.recordInfo.current_index].number = response.data.data.info.number
              this.recordInfo.recordData[this.recordInfo.current_index].product_date = response.data.data.info.product_date
              this.recordInfo.recordData[this.recordInfo.current_index].expiry_date = response.data.data.info.expiry_date
              this.recordInfo.recordData[this.recordInfo.current_index].warehousing_count = response.data.data.info.warehousing_count
              this.recordInfo.recordData[this.recordInfo.current_index].price = response.data.data.info.price
              this.recordInfo.recordData[this.recordInfo.current_index].remark = response.data.data.info.remark
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });
            }
          });


        } else if (val.isCreated == 1) { //添加


          if (sessionStorage.getItem("warehousing_orders") == null) {

            this.warehousing_order = ''
          } else {
            this.warehousing_order = sessionStorage.getItem("warehousing_orders")
          }
          console.log(this.warehousing_order)
          let tempArr = []
          tempArr.push(val)
          let params = {
            'stockIn': tempArr
          }
          postWarehouse(params, this.warehousing_time, this.warehousing_order).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {

              this.$notify({
                title: "成功",
                message: "入库成功",
                type: "success",
                duration: 2000
              });
              this.recordInfo.recordData.push(response.data.data.info)


              if (sessionStorage.getItem("warehousing_orders") == null) {
                sessionStorage.setItem("warehousing_orders", response.data.data.warehousing_order)
              }


            }
          });


        }
      }, cancle: function () {
        this.isVisibility = false

      }, GetAllGoodType: function () {
        GetAllGoodType().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            for (let i = 0; i < response.data.data.goodType.length; i++) {
              this.propForm.goodType.push(response.data.data.goodType[i])
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
              this.propForm.goodInfo.push(response.data.data.goodInfo[i])

            }
          }
        });


      }, typeName: function (good_type_id) {
        let name = ''
        for (let i = 0; i < this.propForm.goodType.length; i++) {
          if (this.propForm.goodType[i].id == good_type_id) {
            name = this.propForm.goodType[i].type_name
          }
        }
        return name


      }, specificationName: function (good_info_id) {
        let name = ''
        for (let i = 0; i < this.propForm.goodInfo.length; i++) {
          if (this.propForm.goodInfo[i].id == good_info_id) {
            name = this.propForm.goodInfo[i].specification_name
          }
        }
        return name
      }, handleEdit: function (index, row) {
        this.recordInfo.current_index = index
        for (let key in this.propForm.formValue) {
          this.propForm.formValue[key] = row[key]

        }

        this.propForm.formValue.expiry_date = uParseTime(row['expiry_date'], "{y}-{m}-{d}")
        this.propForm.formValue.product_date = uParseTime(row['product_date'], "{y}-{m}-{d}")


        this.propForm.isCreated = 2
        this.isVisibility = true

      }, handleDelete: function (index, row) {
        let params = {
          "id": row.id


        }

        this.$confirm('确认删除这条信息?', '删除物品信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWarehouseInfo(params).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              this.recordInfo.recordData.splice(index, 1)
            }
          });

        }).catch(() => {
        });

      }, showDetails: function (index, row) {
        for (let key in this.propForm.formValue) {
          this.propForm.formValue[key] = row[key]
        }
        this.propForm.formValue.expiry_date = uParseTime(row['expiry_date'], "{y}-{m}-{d}")
        this.propForm.formValue.product_date = uParseTime(row['product_date'], "{y}-{m}-{d}")

        this.propForm.isCreated = 3
        this.isVisibility = true

      }, calculate: function (val) {
        return Math.round(parseFloat(val) * 100) / 100
      }, GetWarehouseInfoByOrdeNumber: function () {
        let params = {
          "warehousing_order": sessionStorage.getItem("warehousing_orders")
        }
        this.recordInfo.recordData = []
        getWarehouseInfoByOrdeNumber(params).then(response => {
          if (response.data.state != 0) {
            for (let i = 0; i < response.data.data.info.length; i++) {
              this.recordInfo.recordData.push(response.data.data.info[i])
            }
          }
        });

      },getTime(val,temp){
        if(val != 0){
          return uParseTime(val, temp);
        }else{
          return "";
        }


      }
    },
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
      this.warehousing_time = endTime

      this.GetAllGoodType()
      this.GetAllGoodInfo()
      this.GetWarehouseInfoByOrdeNumber()

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
