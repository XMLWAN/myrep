<template>
  <el-dialog   append-to-body :show-close="isClose" :close-on-click-modal="isClose" :close-on-press-escape="isClose" :title="propsForm.titles" :visible.sync="propsForm.visibility"   >
    <el-checkbox-group v-model="checkedData"  >
      <el-checkbox v-for="item in propsForm.values" :label="item.name" :key="item.id"></el-checkbox>
    </el-checkbox-group>
    <el-input v-show="propsForm.isShowTextArea" v-model="customData"  type="textarea" :rows="6" placeholder="自定义"></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancle">取 消</el-button>
    <el-button type="primary" @click="comfirm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'MultiSelectBox',
    props:{
      propsForm:{
        type: Object,
      }
    },
    data() {
      return {
        checkedData: [],
        customData: "",
        valueString:this.propsForm.selected,
        isClose: false,
        typeValue:this.propsForm.type,
      }
    },
    methods: {
      comfirm:function() {
        let returnValue = {

        }
        returnValue['value'] = this.getValue()
        returnValue['type'] = this.propsForm.type;
        this.propsForm.type = ''
        this.$emit('dialog-comfirm', returnValue);
      },
      cancle:function () {
        this.propsForm.type = ''
        this.$emit('dialog-cancle');
      },

      getValue:function () {
        var returnData = []
        for(var index in this.checkedData) {
          returnData.push(this.checkedData[index])
        }
        if (this.customData != '') {
          var customData = this.customData.split(',')
          for(var index in customData) {
            returnData.push(customData[index])
          } 
        }
        return returnData;
        // if(this.propsForm.customData != undefined){
        //   this.propsForm.checkedData.push(this.propsForm.customData)
        //   return this.propsForm.checkedData
        // }else{
        //   return  this.propsForm.checkedData
        // }
      }

    },
    watch:{
      "propsForm.type":function(){
        this.checkedData = [];
        this.customData = '';

        if (this.propsForm.type=='') {
          return false;
        }
        if(typeof(this.propsForm.selected) != "string" || this.propsForm.selected=='') {
          this.checkedData = [];
        } else {
          var checkedData = this.propsForm.selected.split(',');
          var checkedDataObj = {};
          for(var index in checkedData) {
            checkedDataObj[checkedData[index]] = 1;
          }
          var readyDataObj = {};
          for(var index in this.propsForm.values) {
            if(this.propsForm.values[index].name in checkedDataObj) {
              this.checkedData.push(this.propsForm.values[index].name);
              readyDataObj[this.propsForm.values[index].name] = 1;
            } 
          }
          var addtion = []
          var addtionObj = {};
          for(var index in checkedData) {
            if(!(checkedData[index] in readyDataObj) && !(checkedData[index] in addtionObj) ) {
              addtion.push(checkedData[index]);
              addtionObj[checkedData[index]] = 1;
            }
          }
          this.customData = addtion.join(',');
        }
      }
    }
    

  }
</script>

<style scoped>
.el-checkbox {
    margin-left: 0px;
    margin-right: 30px;
}
</style>
