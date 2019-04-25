<template>
  <el-dialog :show-close="isClose" :close-on-click-modal="isClose" :close-on-press-escape="isClose" :title="titles" :visible.sync="visibility"   >
    <el-checkbox-group v-model="checkedCities"  >
      <el-checkbox v-for="item in values" :label="item.name" :key="item.id"></el-checkbox>
    </el-checkbox-group>
    <el-input v-show="isShowTextArea" v-model="customData" :value="customContent" type="textarea" :rows="6" placeholder="自定义"></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancle">取 消</el-button>
    <el-button type="primary" @click="comfirm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'CheckBoxDialog',
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
      customContent: {
        type: String,
        default: "",
      },
      isShowTextArea: {
        type:Boolean,
        default: true,
      },
    },
    data() {
      return {
        checkedCities: [],
        customData: "",
        valueString:"",
        isClose: false

      }
    },
    methods: {
      comfirm:function() {
        let returnValue = {

        }
        returnValue['value'] = this.getValue()
        returnValue['title'] = this.titles
        this.$emit('dialog-comfirm', returnValue);
      },
      cancle:function () {
        this.$emit('dialog-cancle', this.titles);
      },

      getValue:function () {
        if(this.customData != ""){
          this.checkedCities.push(this.customData)
          return this.checkedCities
        }else{
          return  this.checkedCities
        }
      }

    }
  }
</script>

<style scoped>
  @import '../../../../../static/css/tx_from.css';

</style>
