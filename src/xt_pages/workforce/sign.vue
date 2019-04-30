<template>
    <div class="app-container">
      <el-form ref="form"  :inline="true" :model="form" label-width="80px">
        <el-form-item label="选择日期: ">
          <el-date-picker
            v-model="form.data"
            type="date"
            suffix-icon="el-icon-date"
            clear-icon="el-icon-circle-close"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择时间 : ">
            <el-radio-group v-model="form.time">
              <el-radio v-for="item in timeOptions" :label="item.value" :value="item.value" :key="item.value" >{{item.label}}</el-radio>              
            </el-radio-group>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData3"
        show-summary
        border
        :summary-method="getSummaries"
        style="width: 100%">
        <el-table-column prop="number" label="序号" min-width="80" align='center'></el-table-column>
        <el-table-column prop="machine" label="透析机" min-width="80" align='center'></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="80" align='center'></el-table-column>
        <el-table-column prop="computerTime" label="上机时间" min-width="80" align='center'></el-table-column>
        <el-table-column prop="planeTime" label="下机时间" min-width="80" align='center'></el-table-column>
        <el-table-column prop="signState" label="签到状态" min-width="80" align='center'></el-table-column>
        <el-table-column prop="weight" label="体重（前/后）" min-width="80" align='center'></el-table-column>
        <el-table-column prop="mode" label="透析模式" min-width="80" align='center'></el-table-column>
        <el-table-column prop="next" label="下次透析" min-width="150" align='center'></el-table-column>
        <el-table-column prop="person" label="患者签名" min-width="80" align='center'></el-table-column>
        <el-table-column prop="nurse" label="治疗护士" min-width="80" align='center'></el-table-column>
        <el-table-column prop="doctor" label="治疗医生" min-width="180" align='center'>
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
    name:'sign',
    data() {
      return {
        form: {
          data: '',
          time:''
        },
        timeOptions: [
          { value: 1, label: "上午" },
          { value: 2, label: "下午" },
          { value: 3, label: "晚上" }],
        tableData3: [{
          number: '1',
          machine: '费森',
          name: '张三',
          computerTime: '8点',
          planeTime: '12点',
          signState: '已签到',
          weight:'92.0/',
          mode:'HDF',
          next:'周三',
          nurse:'翠花',
          doctor:'张麻子',
          person:''
        }, {
          number: '2',
          machine: '费森',
          name: '李四',
          computerTime: '8点',
          planeTime: '12点',
          signState: '已签到',
          weight:'92.0/',
          mode:'HDF',
          next:'周三',
          nurse:'翠花',
          doctor:'张麻子',
          person:'李四'          
        }]
      }
    },
     methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    }
}
</script>

<style rel="stylesheet/css" lang="scss" scoped>


</style>

