<template>

  <div class="app-container sign-and-weigh-box" style="background: white">


    <good-info-dailog :titles="goodInfo.goodInfoDialog.goodInfoTitle" :formValue="goodInfo.goodInfoDialog.formValue"
                      :visibility="goodInfo.goodInfoDialog.isVisibility"
                      :isCreated="goodInfo.goodInfoDialog.isCreated" v-on:dialog-comfirm="goodInfoDialogComfirm"
                      v-on:dialog-cancle="goodInfoDialogCancle"></good-info-dailog>


    <el-row :gutter="15">
      <el-col>


        <div>物品信息
          <el-button style="float: right;margin-bottom: 15px" type="primary" @click="showInfoDialog">新增物品信息</el-button>
        </div>

        <!--<div class="dataTitle"></div>-->



        <el-table :data="goodInfo.goodInfoData" :class="signAndWeighBoxPatients" style="width: 100%" border
                  v-loading="goodInfo.loading"
        >
          <el-table-column label="物品编码" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.good_code}}
            </template>
          </el-table-column>
          <el-table-column label="规格名称" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.specification_name}}

            </template>
          </el-table-column>

          <el-table-column label="进价" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.buy_price}}

            </template>
          </el-table-column>
          <el-table-column label="出货价" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.sell_price}}
            </template>
          </el-table-column>
          <el-table-column label="有效期预警" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.expiry_date_warn_day_count}}
            </template>
          </el-table-column>
          <el-table-column label="库存预警" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.stock_warn_count}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleGoodInfoEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleGoodInfoDelete(scope.$index, scope.row)">删除
              </el-button>
              <!--<el-button-->
                <!--size="mini"-->
                <!--type="primary"-->
                <!--@click="showGoodInfoDetails(scope.$index, scope.row)">详情-->
              <!--</el-button>-->
            </template>
          </el-table-column>

        </el-table>


      </el-col>


    </el-row>

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
  </div>
</template>

<script>

  import GoodInfoDailog from "../Dialog/goodInfoDailog";
  import {
    GetAllGoodType,
    createGoodInfo,
    modifyGoodInfo,
    deleteGoodInfo,
    GetGoodInfoByGoodId,
    GetGoodInfo,
    GetAllDeals,
    GetAllManufacturer,
    getGoodInfoList
  } from "@/api/stock";

  export default {
    components: {
      GoodInfoDailog,
    },
    name: "goodInfo",
    data() {
      return {
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        total: 0,
        pageTotal: 0,
        pageSelect: 0,
        page: 1,
        limit: 7,

        goodInfo: {
          loading: false,
          goodInfoData: [],
          good_code: '',
          editGoodId: '',
          editGoodIndex: '',
          goodInfoDialog: {
            goodInfoTitle: '新增物品信息',
            isCreated: 1, //1.创建 2.编辑 3.查看详情
            formValue: {
              good_id: '',
              specification_name: '',
              buy_price: '',
              sell_price: '',
              remark: '',
              manufacturer: '',
              good_type_id: '',
              dealer: '',
              expiry_date_warn_day_count: '',
              stock_warn_count: '',
              is_reuse: '2',
              dealers: [],
              manufacturers: [],
              goodType: [],
              goodUnit: [],
            },

            isVisibility: false,
          },

        },

      };
    },
    methods: {
     handleGoodInfoEdit: function (index, row) {

       this.getAllDealer()
       this.getAllManufacturer()
       this.getAllGoodType()
        this.goodInfo.editGoodId = row.id
        this.goodInfo.editGoodIndex = index

        let params = {
          id: row.id
        }
        GetGoodInfo(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            console.log(response.data.data.goodInfo)

            if(response.data.data.goodInfo.good_unit <= 0){
              this.goodInfo.goodInfoDialog.formValue.good_unit = ""
            }else{
              this.goodInfo.goodInfoDialog.formValue.good_unit = response.data.data.goodInfo.good_unit
            }


            if(response.data.data.goodInfo.manufacturer <= 0){
              this.goodInfo.goodInfoDialog.formValue.manufacturer = ""

            }else{
              this.goodInfo.goodInfoDialog.formValue.manufacturer = response.data.data.goodInfo.manufacturer

            }

            if(response.data.data.goodInfo.dealer <= 0){
              this.goodInfo.goodInfoDialog.formValue.dealer = ""
            }else{
              this.goodInfo.goodInfoDialog.formValue.dealer = response.data.data.goodInfo.dealer

            }



            this.goodInfo.goodInfoDialog.formValue.specification_name = response.data.data.goodInfo.specification_name
            this.goodInfo.goodInfoDialog.formValue.buy_price = response.data.data.goodInfo.buy_price
            this.goodInfo.goodInfoDialog.formValue.sell_price = response.data.data.goodInfo.sell_price
            this.goodInfo.goodInfoDialog.formValue.expiry_date_warn_day_count = response.data.data.goodInfo.expiry_date_warn_day_count
            this.goodInfo.goodInfoDialog.formValue.stock_warn_count = response.data.data.goodInfo.stock_warn_count
            this.goodInfo.goodInfoDialog.formValue.is_reuse = response.data.data.goodInfo.is_reuse.toString()
            this.goodInfo.goodInfoDialog.formValue.remark = response.data.data.goodInfo.remark
            this.goodInfo.goodInfoDialog.isCreated = 2
            this.goodInfo.goodInfoDialog.isVisibility = true
            this.goodInfo.good_code = response.data.data.goodInfo.good_code
            this.goodInfo.goodInfoDialog.formValue.good_id =response.data.data.goodInfo.good_type_id
          }
        });



      },
      handleGoodInfoDelete: function (index, row) {

        this.$confirm('确认删除这条物品信息?', '删除物品信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id
          }

          deleteGoodInfo(params).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.goodInfo.goodInfoData.splice(index, 1);
              this.$notify({
                title: "成功",
                message: "物品信息已经删除",
                type: "success",
                duration: 2000
              });
            }
          });
        }).catch(() => {
        });

      },
      showGoodInfoDetails: function (index, row) {
        let params = {
          id: row.id
        }
        GetGoodInfo(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.goodInfo.goodInfoDialog.formValue.specification_name = response.data.data.goodInfo.specification_name
            this.goodInfo.goodInfoDialog.formValue.good_unit = response.data.data.goodInfo.good_unit
            this.goodInfo.goodInfoDialog.formValue.buy_price = response.data.data.goodInfo.buy_price
            this.goodInfo.goodInfoDialog.formValue.sell_price = response.data.data.goodInfo.sell_price
            this.goodInfo.goodInfoDialog.formValue.manufacturer = response.data.data.goodInfo.manufacturer
            this.goodInfo.goodInfoDialog.formValue.dealer = response.data.data.goodInfo.dealer
            this.goodInfo.goodInfoDialog.formValue.expiry_date_warn_day_count = response.data.data.goodInfo.expiry_date_warn_day_count
            this.goodInfo.goodInfoDialog.formValue.stock_warn_count = response.data.data.goodInfo.stock_warn_count
            this.goodInfo.goodInfoDialog.formValue.is_reuse = response.data.data.goodInfo.is_reuse.toString()

            this.goodInfo.goodInfoDialog.formValue.remark = response.data.data.goodInfo.remark
            this.goodInfo.goodInfoDialog.isCreated = 3
            this.goodInfo.goodInfoDialog.isVisibility = true
          }
        });
      }, getList() {
        this.goodInfo.loading = true
        let params = {
          'page': this.page,
          'limit': this.limit
        }
        getGoodInfoList(params).then(response => {
          if (response.data.state == 0) {
            this.goodInfo.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.goodInfo.loading = false
            this.total = response.data.data.total
            this.goodInfo.goodInfoData = []
            for (let i = 0; i < response.data.data.list.length; i++) {
              this.goodInfo.goodInfoData.push(response.data.data.list[i])

            }
          }
        });

      }, tableRowClassName({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      onRowClick(row, event, column) {

        this.goodInfo.goodInfoData = []
        this.goodType.tableCurrentIndex = row.index;
        this.goodInfo.goodInfoDialog.formValue.good_id = row.id
        let params = {
          'id': row.id
        }
        this.goodInfo.loading = true
        GetGoodInfoByGoodId(params).then(response => {
          if (response.data.state == 0) {
            this.goodInfo.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.goodInfo.loading = false
            for (let i = 0; i < response.data.data.list.length; i++) {
              this.goodInfo.goodInfoData.push(response.data.data.list[i])
            }
          }
        });

      }, goodInfoDialogComfirm: function (val) {
        this.goodInfo.goodInfoDialog.isVisibility = false
        if (val.isCreated == 2) { //修改
          val['id'] = this.goodInfo.editGoodId
          val['good_code'] = this.goodInfo.good_code

          modifyGoodInfo(val).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.goodInfo.goodInfoData[this.goodInfo.editGoodIndex].specification_name = response.data.data.goodInfo.specification_name
              this.goodInfo.goodInfoData[this.goodInfo.editGoodIndex].good_unit = response.data.data.goodInfo.good_unit
              this.goodInfo.goodInfoData[this.goodInfo.editGoodIndex].buy_price = response.data.data.goodInfo.buy_price.toString()
              this.goodInfo.goodInfoData[this.goodInfo.editGoodIndex].sell_price = response.data.data.goodInfo.sell_price.toString()
              this.goodInfo.goodInfoData[this.goodInfo.editGoodIndex].expiry_date_warn_day_count = response.data.data.goodInfo.expiry_date_warn_day_count.toString()
              this.goodInfo.goodInfoData[this.goodInfo.editGoodIndex].stock_warn_count = response.data.data.goodInfo.stock_warn_count.toString()
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });

            }
          });

        } else if (val.isCreated == 1) { //新增
          createGoodInfo(val).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.goodInfo.goodInfoData.unshift(response.data.data.goodInfo)
              this.$notify({
                title: "成功",
                message: "新增成功",
                type: "success",
                duration: 2000
              });

            }
          });

        }

      },
      goodInfoDialogCancle: function () {
        this.goodInfo.goodInfoDialog.isVisibility = false

      }, showInfoDialog: function () {
        this.getAllDealer()
        this.getAllManufacturer()
        this.goodInfo.goodInfoDialog.formValue.goodType = []
        GetAllGoodType().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            for (let i = 0; i < response.data.data.goodType.length; i++) {
              this.goodInfo.goodInfoDialog.formValue.goodType.push(response.data.data.goodType[i])
            }
            if (this.goodInfo.goodInfoDialog.formValue.goodType.length <= 0) {
              this.$message.error("请先新增物品类型");
              return
            } else {
              this.goodInfo.goodInfoDialog.isVisibility = true
              this.goodInfo.goodInfoDialog.isCreated = 1
            }
          }
        });
        this.goodInfo.goodInfoDialog.formValue.good_id = ''
        this.goodInfo.goodInfoDialog.formValue.specification_name = ''
        this.goodInfo.goodInfoDialog.formValue.buy_price = ''
        this.goodInfo.goodInfoDialog.formValue.sell_price = ''
        this.goodInfo.goodInfoDialog.formValue.remark = ''
        this.goodInfo.goodInfoDialog.formValue.manufacturer = ''
        this.goodInfo.goodInfoDialog.formValue.good_type_id = ''
        this.goodInfo.goodInfoDialog.formValue.dealer = ''
        this.goodInfo.goodInfoDialog.formValue.expiry_date_warn_day_count = ''
        this.goodInfo.goodInfoDialog.formValue.stock_warn_count = ''
        this.goodInfo.goodInfoDialog.formValue.is_reuse = '2'


      }, getAllDealer: function () {
        this.goodInfo.goodInfoDialog.formValue.dealers = []
        GetAllDeals().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            for (let i = 0; i < response.data.data.dealer.length; i++) {
              this.goodInfo.goodInfoDialog.formValue.dealers.push(response.data.data.dealer[i])
            }
          }
        });
      }, getAllManufacturer: function () {
        this.goodInfo.goodInfoDialog.formValue.manufacturers = []
        GetAllManufacturer().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            for (let i = 0; i < response.data.data.manufacturer.length; i++) {
              this.goodInfo.goodInfoDialog.formValue.manufacturers.push(response.data.data.manufacturer[i])
            }
          }
        });
      }, getAllGoodType: function () {
        this.goodInfo.goodInfoDialog.formValue.goodType = []
        GetAllGoodType().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            for (let i = 0; i < response.data.data.goodType.length; i++) {
              this.goodInfo.goodInfoDialog.formValue.goodType.push(response.data.data.goodType[i])
            }
          }
        });
      }, handleSizeChange(val) {
        this.limit = val;
        this.getList();
      }, handleCurrentChange(val) {
        this.page = val;
        this.getList();
      }
    },
    created() {
      this.getList()
      // this.getAllDealer()
      // this.getAllManufacturer()
      // this.getAllGoodType()
      this.goodInfo.goodInfoDialog.formValue.goodUnit = this.$store.getters.good_unit

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
    height: 44px;
    line-height: 44px;
    padding: 0 0 0 10px;
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
