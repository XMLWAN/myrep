<template>
  <el-dialog :title="propForm.title" :visible.sync="visibility" :show-close="isClose" :close-on-click-modal="isClose"
             :close-on-press-escape="isClose">

    <el-form :model="propForm.formValue" class="demo-form-inline" style="height: 300px"
             :rules="rules" :v-model="propForm.formValue" ref="formValue"
             label-width="140px">
      <el-col :span="size">
        <el-form-item label="物品类型:" prop="good_type_id">
          <el-select v-model="propForm.formValue.good_type_id" placeholder="请选择" @change="goodTypeSelect"
          >
            <el-option
              v-for="item in tempGoodType"
              :key="item.id"
              :label="item.type_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>


      <el-col :span="size">
        <el-form-item label="规格名称:" prop="good_id">
          <el-select v-model="propForm.formValue.good_id" placeholder="请选择" @change="goodInfoSelect">
            <el-option
              v-for="item in tempGoodInfo"
              :key="item.id"
              :label="item.specification_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="size">
        <el-form-item label="库存数量:">
          <el-input type="number" v-model="warehouse_count" :disabled="isDisabled"></el-input>
        </el-form-item>
      </el-col>


      <el-col :span="size">
        <el-form-item label="出库数量:" prop="count">
          <el-input type="number" v-model="propForm.formValue.count"></el-input>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="备注 : " prop="remark">
          <el-input type="textarea" :row="5" v-model="propForm.formValue.remark"
                    placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-col>
    </el-form>


    <span slot="footer" class="dialog-footer">
    <el-button v-if="propForm.isCreated == 3" @click="cancle('formValue')">取 消</el-button>
    <el-button v-if="propForm.isCreated != 3 " @click="cancle('formValue')">取 消</el-button>
    <el-button v-if="propForm.isCreated != 3" type="primary" @click="comfirm('formValue')">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
  import {
    GetAllGoodInfo,
    GetAllGoodType,
    getWarehouseInfoCountByGoodId,
    getWarehouseInfoByGoodTypeId,
  } from "@/api/stock";

  export default {
    name: "stockOutDialog",
    data() {
      var checkCount = (rule, value, callback) => {
        if (parseInt(value) > this.warehouse_count) {
          return callback(new Error('出库数量不能大于库存数量'));
        }
        if (value < 0) {
          return callback(new Error('出库数量不能为负数'));
        }

      };


      return {
        remark:'',
        isDisabled: true,
        warehouse_count: '',
        tempGoodType: [],
        tempGoodInfo: [],
        isClose: false,
        size: 11,
        isShow: true,
        rules: {
          good_id: [
            {required: true, message: '请选择物品类型', trigger: 'change'}
          ],
          good_type_id: [
            {required: true, message: '请选择规格名称', trigger: 'change'}
          ],
          count: [
            {required: true, message: '请输入出库数量', trigger: 'blur'},
            {validator: checkCount, trigger: 'blur'},
            // {validator: checkIsInt, trigger: 'blur'}

          ]
        }
      }
    },
    props: {
      propForm: {
        type: Object
      },
      visibility: {
        type: Boolean,
        default: false
      },

    },
    methods: {

      cancle: function (formName) {
        this.$emit('dialog-cancle', this.getValue());
        this.$refs[formName].resetFields();
      },
      comfirm: function (formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        this.$emit('dialog-comfirm', this.getValue());

        // }
        // });
      },
      getValue: function () {
        console.log(this.remark)
        let form = {}
        form['good_type_id'] = this.propForm.formValue.good_type_id
        form['good_id'] = this.propForm.formValue.good_id
        form['product_date'] = this.propForm.formValue.product_date
        form['expiry_date'] = this.propForm.formValue.expiry_date
        form['warehousing_count'] = this.warehouse_count
        form['count'] = this.propForm.formValue.count
        form['price'] = this.propForm.formValue.price
        if(typeof this.propForm.formValue.remark == 'undefined'){
          form['remark'] = this.remark
        }else{
          form['remark'] = this.propForm.formValue.remark

        }
        form['isCreated'] = this.propForm.isCreated
        for (let i = 0; i < this.propForm.goodInfo.length; i++) {
          if (this.propForm.goodInfo[i].id == this.propForm.formValue.good_id) {
            form['dealer'] = this.propForm.goodInfo[i].dealer
            form['manufacturer'] = this.propForm.goodInfo[i].manufacturer
          }
        }
        return form
      }, goodTypeSelect: function (id) {
        this.propForm.formValue.good_id = ''

        this.tempGoodInfo = []
        for (let i = 0; i < this.propForm.goodInfo.length; i++) {
          if (this.propForm.goodInfo[i].good_type_id == id) {
            this.tempGoodInfo.push(this.propForm.goodInfo[i])
          }
        }
        let params = {
          "good_type_id": id
        }
        getWarehouseInfoByGoodTypeId(params).then(response => {
          if (response.data.state == 0) {
            this.warehouse_count = ''
            this.tempGoodInfo = []
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.warehouse_count = ''

          }
        })

      }, goodInfoSelect: function (id) {
        let index = 0;
        for (let i = 0; i < this.propForm.goodInfo.length; i++) {
          if (this.propForm.goodInfo[i].id == id) {
            index = i
          }
        }
        this.propForm.formValue.good_type_id = this.propForm.goodInfo[index].good_type_id
        let params = {
          "good_id": this.propForm.goodInfo[index].id

        }
        getWarehouseInfoCountByGoodId(params).then(response => {
          if (response.data.state == 0) {
            this.warehouse_count = ''
            this.propForm.formValue.good_type_id = ''
            this.$message.error(response.data.msg);

            return false;
          } else {
            this.warehouse_count = ''
            this.warehouse_count = response.data.data.warehousing_count
            this.propForm.formValue.price = response.data.data.price
          }
        })
      }
    },
    watch: {
      visibility(val) {

        this.tempGoodInfo = this.propForm.goodInfo
        this.tempGoodType = this.propForm.goodType
        if(this.propForm.isCreated == 2 ||this.propForm.isCreated == 3) {
          let params = {
            "good_id": this.propForm.formValue.good_id
          }
          getWarehouseInfoCountByGoodId(params).then(response => {
            if (response.data.state == 0) {
              this.warehouse_count = ''
              this.propForm.formValue.good_type_id = ''
              this.$message.error(response.data.msg);

              return false;
            } else {
              this.warehouse_count = ''
              this.warehouse_count = response.data.data.warehousing_count
              this.propForm.formValue.price = response.data.data.price
            }
          })
        }else{
          this.warehouse_count = ''


        }


        !val && setTimeout(() => {
          this.$refs['formValue'].resetFields();


        }, 0);
      }
    }
  }

</script>

<style scoped>

</style>
