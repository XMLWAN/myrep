<template>
  <div>
    <el-form ref="form" :model="form" :inline="true" style="margin-top:5px;" >
      <el-input class="search" v-model="form.search"  />
      <el-button class="searchBtn" type="primary" icon="el-icon-search" @click="search" >搜索</el-button>
      <el-form-item label="推送 : "  >  
        <el-radio-group v-model="form.push">
          <el-radio v-for="item in pushOptions" :value="item.value" :key="item.value" :label="item.label">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button type="success">推送</el-button>
    </el-form>
    <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        border
        >
      <el-table-column
        type="selection"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        label="序号"
        prop="number"        
        align="center"        
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="dialysis"
        align="center"        
        label="透析号"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"        
        label="姓名"
        min-width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="frequency"
        align="center"        
        label="治疗频率"
        min-width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="scheduling"
        align="center"  
        min-width="180"      
        label="今日排班(是/否)"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      style="margin-top:10px;"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tablePush",
  data() {
    return {
      form: {
        push: "",
        search: ""
      },
      pushOptions:[
          {value:'1',label:'已推送'},
          {value:'2',label:'未推送'}
      ],
      tableData3: [
        {
          date: "2016-05-03",
          number: "1",
          dialysis: "1510412222",
          name: "王小虎",
          frequency: "10",
          scheduling: " 是 "
        },
        {
          date: "2016-05-03",
          number: "1",
          dialysis: "1510412222",
          name: "王小虎",
          frequency: "10",
          scheduling: " 是 "
        },
        {
          date: "2016-05-03",
          number: "1",
          dialysis: "1510412222",
          name: "王小虎",
          frequency: "10",
          scheduling: " 是 "
        },
        {
          date: "2016-05-03",
          number: "1",
          dialysis: "1510412222",
          name: "王小虎",
          frequency: "10",
          scheduling: " 是 "
        }
      ],
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style rel="stylesheet/css" lang="scss" scoped>
.search {
  width: 300px;
}
.searchBtn {
  margin: 0 20px 0 0;
}
</style>

