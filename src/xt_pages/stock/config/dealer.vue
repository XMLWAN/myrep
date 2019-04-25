<template>

  <div class="app-container sign-and-weigh-box" style="background: white">

    <manufacturer-or-dealer-dialog :titles="dealerDialog.titles" :formValue="dealerDialog.formValue"
                                   :visibility="dealerDialog.isVisibility"
                                   :type="dealerDialog.type" :isCreated="dealerDialog.isCreated"
                                   v-on:dialog-comfirm="manufacturerDialogComfirm"
                                   v-on:dialog-cancle="manufacturerDialogCancle"></manufacturer-or-dealer-dialog>

    <el-row>
      <el-col>
        <!--<el-button type="primary" style="float:right;"  @click="showDialog">新增经销商</el-button>-->

        <div>经销商
          <el-button style="float: right;margin-bottom: 15px" type="primary" @click="showDialog">新增经销商</el-button>
        </div>

        <!--<div class="dataTitle"></div>-->

        <!--<el-button style="float:right;margin-bottom: 10px" type="primary" @click="showDialog">新增经销商</el-button>-->

        <el-table :data="dealerData" :class="signAndWeighBoxPatients" style="width: 100%" border
                  v-loading="loading"
        >

          <el-table-column type="index" label="序号" min-width="20" align="center"></el-table-column>
          <el-table-column label="经销商编码" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.dealer_code}}
            </template>
          </el-table-column>
          <el-table-column label="经销商名称" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.dealer_name}}

            </template>
          </el-table-column>
          <el-table-column label="联系人" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.contact}}

            </template>
          </el-table-column>
          <el-table-column label="联系人电话" min-width="30" align="center">
            <template slot-scope="scope">
              {{scope.row.contact_phone}}

            </template>
          </el-table-column>
          <el-table-column label="联系地址" min-width="70" align="center">
            <template slot-scope="scope">
              {{scope.row.contact_address}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
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
              <!--<el-button-->
                <!--size="mini"-->
                <!--type="primary"-->
                <!--@click="showDetails(scope.$index, scope.row)">查看详情-->
              <!--</el-button>-->
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
    </el-row>
  </div>
</template>

<script>
  import manufacturerOrDealerDialog from '../Dialog/manufacturerOrDealerDialog'
  import {
    createDealer,
    modifyDealer,
    getDealersList,
    deleteDealer,
    GetDealer
  } from "@/api/stock";

  export default {
    components: {
      manufacturerOrDealerDialog
    },
    name: "dealer",
    data() {
      return {
        thedefaultActive:'1-2',
        signAndWeighBoxPatients: 'sign-and-weigh-box-patients',
        dealerData: [],
        total: 0,
        pageTotal: 0,
        pageSelect: 0,
        page: 1,
        limit: 7,

        loading:false,

        dealer_code: '',
        editId: '',
        editIndex:'',
        dealerDialog: {
          titles: '新增经销商',
          isVisibility: false,
          type: 1, //1.经销商 2.厂家
          isCreated: 1, //1.创建 2.编辑 3.查看详情
          formValue: {
            manufacturer_name: '',
            dealer_name: '',
            contact: '',
            contact_phone: '',
            platform_number: '',
            email: '',
            contact_address: '',
            remark: '',
          },
          resetForm: {
            manufacturer_name: '',
            dealer_name: '',
            contact: '',
            contact_phone: '',
            platform_number: '',
            email: '',
            contact_address: '',
            remark: '',
          },
        }


      };
    },
    methods: {
      handleEdit: function (index, row) {
        this.editId = row.id
        this.editIndex = index
        let params = {
          id: row.id
        }
        this.loading = true
        GetDealer(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            this.loading = false
            return false;
          } else {
            this.loading = false
            this.dealerDialog.formValue.dealer_name = response.data.data.dealer.dealer_name
            this.dealerDialog.formValue.contact = response.data.data.dealer.contact
            this.dealerDialog.formValue.contact_phone = response.data.data.dealer.contact_phone
            this.dealerDialog.formValue.platform_number = response.data.data.dealer.platform_number
            this.dealerDialog.formValue.email = response.data.data.dealer.email
            this.dealerDialog.formValue.contact_address = response.data.data.dealer.contact_address
            this.dealerDialog.formValue.remark = response.data.data.dealer.remark
            this.dealerDialog.isCreated = 2
            this.dealerDialog.isVisibility = true
            this.dealer_code = response.data.data.dealer.dealer_code

          }
        });

      },
      handleDelete: function (index, row) {


        this.$confirm('确认删除这条经销商信息?', '删除经销商信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: row.id
          }

          deleteDealer(params).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.dealerData.splice(index, 1);
              this.$notify({
                title: "成功",
                message: "经销商信息已经删除",
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
        GetDealer(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.dealerDialog.formValue.dealer_name = response.data.data.dealer.dealer_name
            this.dealerDialog.formValue.contact = response.data.data.dealer.contact
            this.dealerDialog.formValue.contact_phone = response.data.data.dealer.contact_phone
            this.dealerDialog.formValue.platform_number = response.data.data.dealer.platform_number
            this.dealerDialog.formValue.email = response.data.data.dealer.email
            this.dealerDialog.formValue.contact_address = response.data.data.dealer.contact_address
            this.dealerDialog.formValue.remark = response.data.data.dealer.remark
            this.dealerDialog.isCreated = 3
            this.dealerDialog.isVisibility = true
          }
        });
      },
      manufacturerDialogComfirm: function (val) {
        this.dealerDialog.isVisibility = false

        if (val.isCreated == 2) { //修改
          let params = {
            'dealer_name': val.dealer_name,
            'contact': val.contact,
            'contact_phone': val.contact_phone,
            'platform_number': val.platform_number,
            'email': val.email,
            'contact_address': val.contact_address,
            'remark': val.remark,
            'dealer_code': this.dealer_code,
            'id': this.editId
          }
          modifyDealer(params).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.dealerData[this.editIndex].dealer_name = response.data.data.dealer.dealer_name
              this.dealerData[this.editIndex].contact = response.data.data.dealer.contact
              this.dealerData[this.editIndex].contact_phone = response.data.data.dealer.contact_phone
              this.dealerData[this.editIndex].platform_number = response.data.data.dealer.platform_number
              this.dealerData[this.editIndex].email = response.data.data.dealer.email
              this.dealerData[this.editIndex].contact_address = response.data.data.dealer.contact_address
              this.dealerData[this.editIndex].remark = response.data.data.dealer.remark
              this.dealerData[this.editIndex].dealer_code = response.data.data.dealer.dealer_code
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });

            }
          });

        } else if (val.isCreated == 1) { //新增
          createDealer(val).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.dealerData.unshift(response.data.data.dealer)
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
      manufacturerDialogCancle: function () {
        this.dealerDialog.isVisibility = false
      },
      showDialog: function () {
        // this.manufacturerDialog.formValue = {}
        this.dealerDialog.formValue = Object.assign({}, this.dealerDialog.resetForm)
        this.dealerDialog.isVisibility = true
        this.dealerDialog.isCreated = 1

      }, handleSizeChange(val) {
        this.limit = val;
        this.getList();
      }, handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },getList(){
        let params = {
          'page':this.page,
          'limit':this.limit
        }
        this.loading = true
        getDealersList(params).then(response => {
          if (response.data.state == 0) {
            this.loading = false

            this.$message.error(response.data.msg);
            return false;
          } else {
            this.loading = false
            this.total = response.data.data.total
            this.dealerData = []
            for (let i = 0; i < response.data.data.dealer.length; i++) {
              this.dealerData.push(response.data.data.dealer[i])

            }
          }
        });

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
    line-height: 10px;
    margin: 0 0 10px 0;
    position: relative;
    padding: 0 0 6px 10px;
  &::before {
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
