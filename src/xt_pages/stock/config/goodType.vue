<template>

  <div class="app-container sign-and-weigh-box" style="background: white">
    <good-type-dialog :titles="goodType.goodTypeDialog.goodTypeTitle" :formValue="goodType.goodTypeDialog.formValue"
                      :visibility="goodType.goodTypeDialog.isVisibility"
                      :isCreated="goodType.goodTypeDialog.isCreated" v-on:dialog-comfirm="goodTypeDialogComfirm"
                      v-on:dialog-cancle="goodTypeDialogCancle"></good-type-dialog>


    <el-row :gutter="15">
      <el-col>

        <div>物品类型
          <el-button style="float: right;margin-bottom: 15px" type="primary" @click="showDialog">新增物品类型</el-button>
        </div>

        <!--<div class="dataTitle"></div>-->

        <div style="margin-bottom: 10px;">
        </div>
        <el-table :data="goodType.goodTypeData" :class="signAndWeighBoxPatients" style="width: 100%" border
                  highlight-current-row
                  @row-click="onRowClick"
                  :row-class-name="tableRowClassName"
                  v-loading="goodType.loading"
        >
          <el-table-column label="类型编码" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.type_code}}
            </template>
          </el-table-column>
          <el-table-column label="类型名称" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.type_name}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="70">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"

                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"

                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>

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

      <!--<el-col :span="14">-->
      <!--<div class="title">物品详细信息-->
      <!--<el-button @click="showInfoDialog" style="float: right" type="primary">新增物品信息</el-button>-->
      <!--</div>-->
      <!--<el-table :data="goodInfo.goodInfoData" :class="signAndWeighBoxPatients" style="width: 100%" border-->
      <!--v-loading="goodInfo.loading"-->
      <!--&gt;-->
      <!--<el-table-column label="物品编码" min-width="30" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.good_code}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="规格名称" min-width="30" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.specification_name}}-->

      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column label="进价" min-width="30" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.buy_price}}-->

      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="出货价" min-width="30" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.sell_price}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="有效期预警" min-width="30" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.expiry_date_warn_day_count}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="库存预警" min-width="30" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.stock_warn_count}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作" align="center" min-width="100">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--@click="handleGoodInfoEdit(scope.$index, scope.row)">编辑-->
      <!--</el-button>-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--type="danger"-->
      <!--@click="handleGoodInfoDelete(scope.$index, scope.row)">删除-->
      <!--</el-button>-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--type="primary"-->
      <!--@click="showGoodInfoDetails(scope.$index, scope.row)">详情-->
      <!--</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--</el-table>-->


      <!--</el-col>-->


    </el-row>
  </div>
</template>

<script>
  import goodTypeDialog from '../Dialog/goodTypeDialog'
  import {
    createGoodType,
    modifyGoodType,
    getGoodTypeList,
    deleteGoodType,
    GetGoodType,

    createGoodInfo,
    modifyGoodInfo,
    getGoodInfoList,
    deleteGoodInfo,
    GetGoodInfoByGoodId,
    GetGoodInfo,
    GetAllDeals,
    GetAllManufacturer,
    GetAllGoodType
  } from "@/api/stock";
  import GoodInfoDailog from "../Dialog/goodInfoDailog";

  export default {
    components: {
      goodTypeDialog
    },
    name: "goodType",
    data() {
      return {
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        total: 0,
        pageTotal: 0,
        pageSelect: 0,
        page: 1,
        limit: 7,

        goodType: {
          loading: false,
          goodTypeData: [],
          type_code: '',
          editInfoId: '',
          editInfoIndex: '',
          tableCurrentIndex: -1,
          goodTypeDialog: {
            goodTypeTitle: '新增物品类型',
            isCreated: 1, //1.创建 2.编辑 3.查看详情
            formValue: {
              type_name: '',
              remark: '',
            },
            isVisibility: false,
          },
        }
      };
    },
    methods: {
      handleEdit: function (index, row) {
        this.goodType.editTypeId = row.id
        this.goodType.editTypeIndex = index
        let params = {
          id: row.id
        }
        GetGoodType(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.goodType.goodTypeDialog.formValue.remark = response.data.data.goodType.remark
            this.goodType.goodTypeDialog.formValue.type_name = response.data.data.goodType.type_name
            this.goodType.goodTypeDialog.isCreated = 2
            this.goodType.goodTypeDialog.isVisibility = true
            this.goodType.type_code = response.data.data.goodType.type_code

          }
        });

      },
      handleDelete: function (index, row) {

        this.$confirm('确认删除这条物品类型?', '删除物品类型', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id
          }

          deleteGoodType(params).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.goodType.goodTypeData.splice(index, 1);
              this.goodType.tableCurrentIndex = -1
              this.$notify({
                title: "成功",
                message: "物品类型已经删除",
                type: "success",
                duration: 2000
              });
            }
          });
        }).catch(() => {
        });


      },
      showDetails: function (index, row) {
        let params = {
          id: row.id
        }
        GetGoodType(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.goodType.goodTypeDialog.formValue.type_name = response.data.data.goodType.type_name
            this.goodType.goodTypeDialog.formValue.remark = response.data.data.goodType.remark
            this.goodType.goodTypeDialog.isCreated = 3
            this.goodType.goodTypeDialog.isVisibility = true
          }
        });
      },


      goodTypeDialogComfirm: function (val) {
        this.goodType.goodTypeDialog.isVisibility = false

        if (val.isCreated == 2) { //修改
          let params = {
            'type_name': val.type_name,
            'remark': val.remark,
            'type_code': this.goodType.type_code,
            'id': this.goodType.editTypeId
          }


          modifyGoodType(params).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.goodType.goodTypeData[this.goodType.editTypeIndex].type_name = response.data.data.goodTypes.type_name
              this.goodType.goodTypeData[this.goodType.editTypeIndex].remark = response.data.data.goodTypes.remark
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });

            }
          });

        } else if (val.isCreated == 1) { //新增
          createGoodType(val).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.goodType.goodTypeData.unshift(response.data.data.goodTypes)
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
      goodTypeDialogCancle: function () {
        this.goodType.goodTypeDialog.isVisibility = false


      }, showDialog: function () {
        this.goodType.goodTypeDialog.isVisibility = true

      }, getList() {
        this.goodType.loading = true

        let params = {
          'page': this.page,
          'limit': this.limit
        }
        getGoodTypeList(params).then(response => {
          if (response.data.state == 0) {
            this.goodType.loading = false
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.goodType.loading = false
            this.total = response.data.data.total
            this.goodType.goodTypeData = []
            for (let i = 0; i < response.data.data.list.length; i++) {
              this.goodType.goodTypeData.push(response.data.data.list[i])

            }
          }
        });

      }, tableRowClassName({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      onRowClick(row, event, column) {
        this.goodType.tableCurrentIndex = row.index;

      },
      showInfoDialog: function () {


        if (this.goodType.tableCurrentIndex == -1) {
          this.$message.error("请先选择物品类型");
          return
        } else {
          this.getAllGoodType()
        }

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

  .dataTitle {
    color: #409eff;
    font-size: 16px;
    border-bottom: 1px #409eff solid;
    height: 36px;
    line-height: 30px;
    margin: 0 0 15px 0;
    position: relative;
    padding: 0 0 6px 15px;

  &
  ::before {
    position: absolute;
    left: 0;
    bottom: 10px;
    content: "";
    width: 2px;
    height: 20px;
    background: #409eff;
  }

  }
</style>
