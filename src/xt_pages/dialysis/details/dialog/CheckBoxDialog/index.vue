<template>
  <el-dialog append-to-body :show-close="isClose" :close-on-click-modal="isClose" :close-on-press-escape="isClose"
             :title="propsForm.titles" :visible.sync="propsForm.visibility">
    <el-checkbox-group v-model="propsForm.checkedCities">
      <el-checkbox v-for="(item, index) in propsForm.values" :label="item.name" :key="index"></el-checkbox>
    </el-checkbox-group>
    <el-input v-show="propsForm.isShowTextArea" v-model="propsForm.customData" type="textarea" :rows="6"
              placeholder="自定义"></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancle">取 消</el-button>
    <el-button type="primary" @click="comfirm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'CheckBoxDialog',
    props: {
      propsForm: {
        type: Object,
      }
    },
    data() {
      return {
        checkedCities: [],
        customData: "",
        valueString: "",
        isClose: false

      }
    },
    methods: {
      comfirm: function () {
        let returnValue = {}
        returnValue['value'] = this.getValue()
        returnValue['type'] = this.propsForm.type
        this.$emit('dialog-comfirm', returnValue);
      },
      cancle: function () {
        this.$emit('dialog-cancle');
      },

      getValue: function () {
        if (this.propsForm.customData.length > 0) {
          this.propsForm.checkedCities.push(this.propsForm.customData)
          return this.propsForm.checkedCities
        } else {
          return this.propsForm.checkedCities
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
