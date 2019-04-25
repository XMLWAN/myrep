<template>
  <el-dialog :title="titles" :visible.sync="visibility" :show-close="isClose" :close-on-click-modal="isClose"
             :close-on-press-escape="isClose">


    <el-form :model="formValue" :rules="rules" ref="formValue" class="demo-form-inline"
             :label-position="labelPosition"
             label-width="100px">


      <el-col v-if="type == 1">
        <el-form-item label="经销商名称:" prop="dealer_name">
          <el-input v-model="formValue.dealer_name"></el-input>
        </el-form-item>
      </el-col>

      <el-col v-if="type == 2">
        <el-form-item label="厂家名称:" prop="manufacturer_name">
          <el-input v-model="formValue.manufacturer_name"></el-input>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="联系人:" >
          <el-input v-model="formValue.contact"></el-input>
        </el-form-item>
      </el-col>


      <el-col>
        <el-form-item label="联系电话:" >
          <el-input v-model="formValue.contact_phone" type="number"></el-input>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="联系地址">
          <el-input v-model="formValue.contact_address"></el-input>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="QQ/微信">
          <el-input v-model="formValue.platform_number"></el-input>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item label="Email">
          <el-input v-model="formValue.email"></el-input>
        </el-form-item>
      </el-col>


      <el-col>

        <el-form-item label="备注 : ">
          <el-input type="textarea" :row="5" v-model="formValue.remark"
                    placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-col>

    </el-form>


    <span slot="footer" class="dialog-footer">
    <el-button v-if="isCreated == 3" @click="cancle('formValue')">取 消</el-button>
    <el-button v-if="isCreated != 3 " @click="cancle('formValue')">取 消</el-button>
    <el-button v-if="isCreated != 3" type="primary" @click="comfirm('formValue')">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
  export default {
    name: "manufacturerOrDealerDialog",

    data() {
      // var checkPhone = (rule, value, callback) => {
      //   if(!(/^1[34578]\d{9}$/.test(value))){
      //     return callback(new Error('请输入正确的手机号码'));
      //   }
      //
      // };


      return {
        labelPosition: 'right',
        isClose: false,
        form: {
          manufacturer_name: '',
          dealer_name: '',
          contact: '',
          contact_phone: '',
          platform_number: '',
          email: '',
          contact_address: '',
          remark: '',

        },
        resetForm:{
          manufacturer_name: '',
          dealer_name: '',
          contact: '',
          contact_phone: '',
          platform_number: '',
          email: '',
          contact_address: '',
          remark: '',
        },
        rules: {
          manufacturer_name: [
            {required: true, message: '请输入厂家名称', trigger: 'blur'},
          ],
          dealer_name: [
            {required: true, message: '请输入经销商名称', trigger: 'blur'},
          ],

        }
      }
    },
    props: {
      visibility: {
        type: Boolean,
        default: false
      },
      titles: {
        type: String,
        default: "",
      },
      formValue: {
        type: Object
      },
      type: {
        type: Number,
        default: 1,

      },
      isCreated: {
        type: Number,
        default: 1,

      }
    },
    methods: {
      cancle: function (formName) {
        this.$emit('dialog-cancle', this.getValue());
        this.$refs['formValue'].resetFields();
      },
      comfirm: function (formName) {
        this.$refs['formValue'].validate((valid) => {
          if (valid) {
            let value = {}
            value = this.getValue()
            this.$emit('dialog-comfirm', value);
            this.form = Object.assign({}, this.resetForm)

          }
        });
      },
      getValue: function () {
        let form = {}
        form = this.formValue
        form['title'] = this.titles
        form['type'] = this.type
        form['isCreated'] = this.isCreated
        return form
      },
    },

  }
</script>

<style scoped>

</style>
