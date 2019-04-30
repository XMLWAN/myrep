<template>

  <div class="app-container sign-and-weigh-box">

    <stock-out-dialog  :propForm="propForm"
                      :visibility="isVisibility"
                      v-on:dialog-comfirm="comfirm"
                      v-on:dialog-cancle="cancle"></stock-out-dialog>

    <div class="filter-container">
      <span>出库时间:</span>
      <el-date-picker v-model="warehousing_time" prefix-icon="el-icon-date" :editable="false" style="width: 196px;"
                      type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"></el-date-picker>


      <el-row style="float:right;">
        <!--<el-button @click="handleSave" type="primary">保存</el-button>-->
        <el-button @click="handleCancle" type="primary">返回</el-button>
        <el-button @click="handleCreate" type="primary">添加</el-button>
      </el-row>
    </div>



    <el-row >
      <el-col >
        <div class="title">出库列表
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


          <el-table-column label="出库数量" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.count}}

            </template>
          </el-table-column>

          <el-table-column label="物品单价" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.price}}

            </template>
          </el-table-column>
          <el-table-column label="物品总价" min-width="30" align="center">
            <template slot-scope="scope">
              {{calculate(scope.row.price*scope.row.count)}}
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
  import stockOutDialog from './Dialog/stockOutDialog'

  import {
    GetAllGoodInfo,
    GetAllGoodType,
    postWarehouseOut,
    getWarehouseOutInfoByOrdeNumber,
    modifyWarehouseOutInfo,
    deleteWarehouseOutInfo
  } from "@/api/stock";

  export default {
    components: {stockOutDialog},
    name: "stockOut",
    data() {
      return {
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        warehousing_time: '',
        adminUserOptions:null,
        warehousing_out_order:'',
        recordInfo: {
          recordData: [],
          stock_in_code: '',
          current_index:'',

        },
        total:'',

        //prop
        isVisibility:false,
        propForm:{
          goodType:[],
          goodInfo:[],
          title:'出库',
          formValue:{
            good_type_id:'',
            good_id:'',
            product_date:'',
            expiry_date:'',
            count:'',
            price:'',
            remark:'',
          },
          isCreated:1,

        },

        goodInfo: {
          loading: false,
          goodTypeData: [],
          type_code: '',
        }



      };
    },
    methods: {
      handleSave:function () {


      },handleCancle:function () {
        this.$confirm('是否放弃编辑返回上一页?', '放弃编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.recordInfo.recordData = []
          sessionStorage.removeItem("warehousing_out_orders")


          this.$router.back(-1)
        }).catch(() => {

        });

      },handleCreate:function () {
        this.propForm.formValue = {}
        this.propForm.isCreated = 1
        this.isVisibility = true


      },comfirm:function (val) {
        console.log(val)
        this.isVisibility = false
        if (val.isCreated == 2) { //修改

          val['warehousing_out_orders'] = sessionStorage.getItem("warehousing_out_orders")
          modifyWarehouseOutInfo(val).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.recordInfo.recordData[this.recordInfo.current_index].good_type_id = response.data.data.info.good_type_id
              this.recordInfo.recordData[this.recordInfo.current_index].good_id = response.data.data.info.good_id
              this.recordInfo.recordData[this.recordInfo.current_index].count = response.data.data.info.count
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

          console.log(sessionStorage.getItem("warehousing_out_orders"))

          if ( sessionStorage.getItem("warehousing_out_orders") === "undefined" || sessionStorage.getItem("warehousing_out_orders") == null) {

            this.warehousing_out_order = ''

          } else {

            this.warehousing_out_order = sessionStorage.getItem("warehousing_out_orders")
          }

          let tempArr = []
          tempArr.push(val)
          let params = {
            'stockOut': tempArr
          }
          postWarehouseOut(params, this.warehousing_time, this.warehousing_out_order).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {

              this.$notify({
                title: "成功",
                message: "出库成功",
                type: "success",
                duration: 2000
              });
              this.recordInfo.recordData.push(response.data.data.info)

              if ( sessionStorage.getItem("warehousing_out_orders") === "undefined" || sessionStorage.getItem("warehousing_out_orders") == null) {
                sessionStorage.setItem("warehousing_out_orders", response.data.data.warehousing_out_order)
              }


            }
          });


          // this.recordInfo.recordData.push(val)
        }
      },cancle:function () {
        this.isVisibility = false

      },GetAllGoodType:function () {
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


      },GetAllGoodInfo:function () {
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


      },typeName:function (good_type_id) {
        let name = ''
        for(let i = 0; i < this.propForm.goodType.length; i++){
          if(this.propForm.goodType[i].id == good_type_id){
            name = this.propForm.goodType[i].type_name
          }
        }
        return name


      },specificationName:function (good_info_id) {
        let name = ''
        for(let i = 0; i < this.propForm.goodInfo.length; i++){
          if(this.propForm.goodInfo[i].id == good_info_id){
            name = this.propForm.goodInfo[i].specification_name
          }
        }
        return name
      },handleEdit:function (index, row) {
        this.recordInfo.current_index = index
        for(let key in this.propForm.formValue){
          this.propForm.formValue[key] = row[key]
        }
        this.propForm.isCreated = 2
        this.isVisibility = true

      },handleDelete:function (index, row) {
        console.log(row)
        let params = {
          "id":row.id
        }

        this.$confirm('确认删除这条信息?', '删除物品信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWarehouseOutInfo(params).then(response => {
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

      },showDetails:function (index, row) {
        for(let key in this.propForm.formValue){
          this.propForm.formValue[key] = row[key]
        }
        this.propForm.isCreated = 3
        this.isVisibility = true

      },calculate:function (val) {
        return Math.round(parseFloat(val)*100)/100
      }, GetWarehouseOutInfoByOrdeNumber: function () {
        let params = {
          "warehousing_out_order": sessionStorage.getItem("warehousing_out_orders")
        }
        this.recordInfo.recordData = []
        getWarehouseOutInfoByOrdeNumber(params).then(response => {
          if (response.data.state != 0) {
            for (let i = 0; i < response.data.data.info.length; i++) {
              this.recordInfo.recordData.push(response.data.data.info[i])
            }
          }
        });

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
      this.GetWarehouseOutInfoByOrdeNumber()

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



</style>
