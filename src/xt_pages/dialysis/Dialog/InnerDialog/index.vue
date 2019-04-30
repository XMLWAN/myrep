<template>
  <el-dialog :title="titles" :visible.sync="visibility" >
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" >
      <el-checkbox v-for="(value,index) in values" :label="value.text" :key="index">{{value.text}}</el-checkbox>
    </el-checkbox-group>
    <el-input v-model="customData" type="textarea" :rows="6" placeholder="自定义"></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancle">取 消</el-button>
    <el-button type="primary" @click="comfirm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'InnerDialog',
    props:{
      visibility: {
        type: Boolean,
        default: false
      },
      values: {
        type: Array,
        default() {
          return []
        }
      },
      titles: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        checkedCities: [],
        customData: "",
        valueString:"",

      }
    },
    methods: {
      comfirm:function() {
        this.$emit('inner-dialog-comfirm', this.getValue());
      },
      cancle:function () {
        this.$emit('inner-dialog-cancle', false);
      },
      handleCheckedCitiesChange:function (value) {
        this.valueString = value
      },
      getValue:function () {
        if(this.customData.length > 0) {
          return this.valueString + "," + this.customData
        }else{
          return this.valueString
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../../../../static/css/tx_from.css';

</style>
