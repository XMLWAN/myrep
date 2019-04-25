<template>
  <el-dialog :visible.sync="visibility"  :show-close="isClose" :close-on-click-modal="isClose" :close-on-press-escape="isClose">
    <el-form>
      <el-form-item label="进食(L):">
        <el-input type="number" v-model="formValue.eats" ></el-input>
      </el-form-item>
      <el-form-item label="输液(L):">
        <el-input type="number" v-model="formValue.transfusion" ></el-input>
      </el-form-item>
      <el-form-item label="输血(L):">
        <el-input type="number" v-model="formValue.bloodTransfusion" ></el-input>
      </el-form-item>
      <el-form-item label="冲管(L):">
        <el-input type="number" v-model="formValue.washPipe" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancle">取 消</el-button>
    <el-button type="primary" @click="comfirm">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
    export default {
        name: "index",
        data(){
         return{
           isClose: false,
         }
        },
        props:{
          visibility: {
            type: Boolean,
            default: false
          },
          formValue:{
            type: Object
          }
        },
        methods:{
          getValue:function () {
            return this.formValue.eats + this.formValue.transfusion + this.formValue.bloodTransfusion+this.formValue.washPipe
          },
          comfirm:function(){
            this.$emit('input-dialog-comfirm',  this.getValue());
          },
          cancle:function () {
            this.$emit('input-dialog-cancle', this.titles);

          }
        }
    }
</script>

<style scoped>

</style>
