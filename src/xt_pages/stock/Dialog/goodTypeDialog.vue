<template>
  <el-dialog :title="titles" :visible.sync="visibility" :show-close="isClose" :close-on-click-modal="isClose"
             :close-on-press-escape="isClose">
    <el-form :rules="rules" ref="formValue" :model="formValue">
      <el-form-item label="类型名称:" prop="type_name">
        <el-input v-model="formValue.type_name"></el-input>
      </el-form-item>
      <el-form-item label="备注 : ">
        <el-input type="textarea" :row="5" v-model="formValue.remark"
                  placeholder="请输入内容">
        </el-input>
      </el-form-item>
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
    name: "goodTypeDialog",
    data() {
      return {
        isClose: false,

        resetForm: {
          remark: '',
          type_name: '',
        },
        rules: {
          type_name: [
            {required: true, message: '请输入类型名称', trigger: 'blur'},
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
      isCreated: {
        type: Number,
        default: 1,

      }
    },
    methods: {
      cancle: function (formName) {
        this.$emit('dialog-cancle');
        this.$refs[formName].resetFields();
      },
      comfirm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('dialog-comfirm', this.getValue());

          }
        });
      },
      getValue: function () {
        let form = {}
        form['type_name'] = this.formValue.type_name
        form['remark'] = this.formValue.remark
        form['isCreated'] = this.isCreated
        return form
      },
    },
    watch: {
      visibility(val) {
        !val && setTimeout(() => {
          this.$refs['formValue'].resetFields();
          this.formValue.remark = ''
          this.formValue.type_name = ''


        }, 0);
      }
    }
  }
</script>

<style scoped>

</style>
