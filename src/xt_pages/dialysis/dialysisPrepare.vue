<template>
  <div class="app-container">
     <el-form ref="form" :model="form" label-width="100px">
         <el-form-item label="查询日期 : " style="margin:0 0 10px  0;">
             <el-select v-model="form.region"  style="width:15%;float:left;margin:0 10px 0 0;">
                <el-option label="当天" value="1"></el-option>
                <el-option label="本周" value="2"></el-option>
                <el-option label="本月" value="3"></el-option>
                <el-option label="本年" value="4"></el-option>
                <el-option label="全部" value="5"></el-option>
                <el-option label="自定义" value="6"></el-option>
              </el-select>
             <el-date-picker v-model="time" type="daterange"  start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
         </el-form-item>
         <el-form-item label-width="0" style="margin:0 0 10px  0;" >
            <div class="cell">
                <label class="name">排班班次 : </label>
                <div class="type">
                  <ul>
                    <li>全天</li>
                    <li>上午</li>
                    <li>下午</li>
                    <li>晚上</li>
                  </ul>
                </div>
            </div>
         </el-form-item>
     </el-form>

    <el-tabs style="margin-right: -100px" @tab-click="handleClick">
      <el-tab-pane  name="first">        
         <span slot="label">透析耗材</span>
      </el-tab-pane>
      <el-tab-pane  name="second">
         <span slot="label">抗凝剂</span>
        
      </el-tab-pane>
      <el-tab-pane  name="third">
         <span slot="label">透析耗材</span>
         
      </el-tab-pane>
    </el-tabs>

    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      border
      >
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        label="序号"
        align="center"        
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="透析机"
        align="center"        
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="姓名"
        align="center"        
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="住院门诊号"
        align="center"        
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="血透器"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="血滤器"
        align="center"        
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="姓名"
        align="center"        
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="灌流器"
        align="center"        
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="透析液钙"
        align="center"        
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="上机换药包"
        align="center"        
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="下机换药包"
        align="center"        
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"      
        prop="address"
        label="内瘘穿刺包"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"      
        prop="address"
        label="穿刺针"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'dialysis-prepare',
    data() {
      return {
        value12: '',
        form: {
        day: "",
        time: "",
        region: "",
        radio2: ""
        },
        options: [{
            value: '选项1',
            label: '黄金糕'
        }]
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .cell {
  .name {
    float: left;
    width: 88px;
    text-align: right;
    color: #606266;
    height: 36px;
    line-height: 36px;
  }
  .type {
    float: left;
    ul {
      padding: 0;
      margin: 0;
      li {
        float: left;
        list-style-type: none;
        padding: 0 10px;
        border-radius: 6px;
        margin: 0 10px;
        height: 36px;
        line-height: 36px;
        color:#606266;
        &:hover{
          background: #409eff;
          color: #fff;
        }
      }
    }
  }
}
</style>
