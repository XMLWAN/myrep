<template>
  <div class="app-container">
    <div class="service-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的服务" name="first">
        </el-tab-pane>
        <el-tab-pane label="服务订购" name="second">
        </el-tab-pane>
        <el-tab-pane label="订购记录" name="third">
          <record-list></record-list>
        </el-tab-pane>
        <el-tab-pane label="发票管理" name="invoice">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import RecordList from "./recordList";
  export default {
    name: "serviceRecord",
    components: {
      RecordList
    },
    data() {
      return {
        activeName: "third"
      };
    },
    methods: {
      handleClick(tab, event) {

        switch (this.activeName) {
          case "invoice":
            this.$router.push("/service/invoice");

            break;
          case "third":
            this.$router.push("/service/serviceRecord");

            break;

          default:
            this.$router.push("/service");
            break;
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    padding: 20px;
    background: #f6f8f9;
    min-height: calc(100vh - 84px);
    overflow: hidden;
    .service-box {
      background: #fff;
      padding: 10px;
    }
  }
</style>

