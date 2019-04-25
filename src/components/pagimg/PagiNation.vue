<template>
 <el-pagination
      background
      style="margin:10px 0 0 0;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
</template>

<script>
export default {
    data() {
      return {
        pagination: 1,
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
}
</script>

<style>

</style>

