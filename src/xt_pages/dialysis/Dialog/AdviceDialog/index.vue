<template>
  <el-dialog   width="55%" :title="titles" :visible.sync="visibility">

    <el-form :inline="true" :model="formInline" class="demo-form-inline" :label-position="labelPosition"
             label-width="150px">
      <el-form-item label="医嘱类型">
        <el-input v-model="formInline.user"   readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="医嘱时间">
        <el-input v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-input placeholder="医生设定" v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="提醒日期">
        <el-input placeholder="医生设定" v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="开嘱医生">
        <el-input v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="医嘱名称">
        <el-input v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="医嘱内容">
        <el-input v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="单次用量">
        <el-input v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="开药数量">
        <el-input v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="给药途径">
        <el-input v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="执行频率">
        <el-input v-model="formInline.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="子药数量">
        <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      </el-form-item>
    </el-form>


    <span slot="footer" class="dialog-footer">

        <el-button @click="cancle">取 消</el-button>
    <el-button type="primary" @click="comfirm">确 定</el-button>
     </span>
  </el-dialog>
</template>

<script>
  const defalutList = [
    {text: '北京', done: false},
    {text: '上海', done: false},
    {text: '南京', done: false},
    {text: '西安', done: true},
    {text: '广东', done: true},
  ]
  export default {

    name: "AdviceDialog",
    props: {
      visibility: {
        type: Boolean,
        default: false
      }, titles: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        num1:"",
        filteredTodos: defalutList,
        isVisibiltyForDialog9:true,
        dialogTitle:"11",
        size:9,
        labelPosition: 'right',
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        customData:'',
        formValue: {
          transfusion: ""
        },
        formInline: {
          user: '',
          region: ''
        },
      }
    },
    methods:{
      listenToChildValue1:function(val){
      },
      clickEvent: function () {
        this.$emit('childValue', true);
      },


      handleChange:function () {


      }
    }
  }
</script>

<style scoped>

</style>
