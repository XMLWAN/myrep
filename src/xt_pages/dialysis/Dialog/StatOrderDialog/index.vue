<template>
    <div>
        <el-dialog title="临时医嘱" :visible.sync="statOrder" width="500px">
            <el-form :model="form">
                <el-form-item label="医嘱类型 : " :label-width="formLabelWidth">
                    <!-- <el-input v-model="form.name" auto-complete="off"></el-input> -->
                    <span>临时</span>
                </el-form-item>
                <el-form-item label="医嘱时间 : " :label-width="formLabelWidth">
                    <span>2018-09-08</span>
                </el-form-item>
                <el-form-item label="开始时间 : " :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="提醒日期 : " :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.remindDate" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="开嘱医生 : " :label-width="formLabelWidth">
                  <el-select v-model="form.doctor" >
                    <el-option v-for="item in doctorList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="医嘱名称 : " :label-width="formLabelWidth">
                  <el-select v-model="form.name" >
                      <el-option v-for="(item, index) in nameList" :label="item.label" :value="item.value" :key="index"></el-option>
                  </el-select>  
                </el-form-item>
                <el-form-item label="医嘱内容 : " :label-width="formLabelWidth">
                    <span>1g*8# 片剂</span>
                </el-form-item>
                <el-form-item label="单次用量 : " :label-width="formLabelWidth">
                    <el-input-number v-model="form.single" controls-position="right" @change="handleChange" ></el-input-number>
                    <span>g</span>
                </el-form-item> 
                <el-form-item label="开药数量 : " :label-width="formLabelWidth">
                    <el-input-number v-model="form.number" controls-position="right" @change="handleChange" ></el-input-number>
                    <span>瓶</span>
                </el-form-item> 
                <el-form-item label="给药途径 : " :label-width="formLabelWidth">
                  <el-select v-model="form.way" >
                      <el-option v-for="(item, index) in wayList" :label="item.label" :value="item.value" :key="index"></el-option>                      
                  </el-select>  
                </el-form-item>
                <el-form-item label="执行频率 : " :label-width="formLabelWidth">
                  <el-select v-model="form.frequency" >
                      <el-option v-for="(item, index) in frequencyList" :label="item.label" :value="item.value" :key="index"></el-option>                                           
                  </el-select>  
                </el-form-item>
                <el-form-item label="子药数量 : " :label-width="formLabelWidth">
                  <el-input-number v-model="form.child" @change="handleChangeChild" label="0"></el-input-number>
                </el-form-item>

                <el-form style="border-top: 1px solid #409eff;border-bottom: 1px solid #409eff;padding:22px 0 0 0;">
                  <el-form-item label="子药名称1 : " :label-width="formLabelWidth">
                     <el-select v-model="form.name" >
                        <el-option v-for="(item, index) in nameList" :label="item.label" :value="item.value" :key="index"></el-option>
                     </el-select>  
                  </el-form-item>
                  <el-form-item label="子药描述1 : " :label-width="formLabelWidth">
                    <span>1g*8# 片剂</span>
                  </el-form-item>
                  <el-form-item label="单次用量1 : " :label-width="formLabelWidth">
                    <el-input-number v-model="form.single" controls-position="right" @change="handleChange" ></el-input-number>
                    <span>g</span>
                </el-form-item> 
                <el-form-item label="开药数量1 : " :label-width="formLabelWidth">
                    <el-input-number v-model="form.number" controls-position="right" @change="handleChange" ></el-input-number>
                    <span>瓶</span>
                </el-form-item> 
              </el-form>

              <el-form style="border-top: 1px solid #409eff;border-bottom: 1px solid #409eff;padding:22px 0 0 0;">
                  <el-form-item label="子药名称2 : " :label-width="formLabelWidth">
                     <el-select v-model="form.name" >
                        <el-option v-for="(item, index) in nameList" :label="item.label" :value="item.value" :key="index"></el-option>
                     </el-select>  
                  </el-form-item>
                  <el-form-item label="子药描述2 : " :label-width="formLabelWidth">
                    <span>1g*8# 片剂</span>
                  </el-form-item>
                  <el-form-item label="单次用量2 : " :label-width="formLabelWidth">
                    <el-input-number v-model="form.single" controls-position="right" @change="handleChange" ></el-input-number>
                    <span>g</span>
                </el-form-item> 
                <el-form-item label="开药数量2 : " :label-width="formLabelWidth">
                    <el-input-number v-model="form.number" controls-position="right" @change="handleChange" ></el-input-number>
                    <span>瓶</span>
                </el-form-item> 
              </el-form>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="statOrder = false">确 定</el-button>
                <el-button @click="statOrder = false">取 消</el-button>                
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: "StatOrderDialog",
  data() {
    return {
      doctorList: [
        { value: "1", label: "张医生" },
        { value: "2", label: "王医生" },
        { value: "3", label: "柳医生" },
        { value: "4", label: "向医生" }
      ],
      nameList: [
        { value: "1", label: "阿莫西林克拉维酸阿莫西林克拉维酸钾片钾片" },
        { value: "2", label: "阿莫西林片" },
        { value: "3", label: "阿莫西林克拉维酸钾片" },
        { value: "4", label: "阿莫西林片" }
      ],
      wayList: [
        { value: "1", label: "导管冲洗" },
        { value: "2", label: "冲洗" }
      ],
      frequencyList: [
        { value: "1", label: "上午" },
        { value: "2", label: "下午" }
      ],
      form: {
        startDate: "",
        remindDate: "",
        doctor: "",
        single: "",
        number: false,
        way: [],
        frequency: "",
        desc: "",
        single: ""
      },
      formLabelWidth: "84px",
      statOrder: false
    };
  },
  methods: {
    _close: function(done) {
      this.clear();
      done();
    },
    clear: function() {},
    show() {
      this.clear();
      this.statOrder = true;
    },
    hide() {
      this.clear();
      this.statOrder = false;
    },
    handleChange(value) {
      console.log(value);
    },
    handleChangeChild(value) {
      console.log(value);
    }
  }
};
</script>

<style rel="stylesheet/css" lang="scss" scoped>
.child{
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
}
</style>

