<template>
  <div class="app-container">
    <div class="service-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="厂家"  name="first">
          <manufacturer></manufacturer>
        </el-tab-pane>
        <el-tab-pane label="经销商" >
          <dealer></dealer>
        </el-tab-pane>
        <el-tab-pane label="物品类型" >
          <good-type></good-type>
        </el-tab-pane>
        <el-tab-pane label="物品信息" >
          <good-info></good-info>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Dealer from "./config/dealer";
  import Manufacturer from "./config/manufacturer";
  import GoodInfo from "./config/goodInfo";
  import GoodType from "./config/goodType";
  export default {
    name: "service",
    components: {
      GoodType,
      GoodInfo,
      Manufacturer,
      Dealer,
    },
    data() {
      return {
        activeName: "first"
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event, this.activeName);

        // switch (this.activeName) {
        //   case "invoice":
        //     this.$router.push("/service/invoice");
        //
        //     break;
        //   case "third":
        //     this.$router.push("/service/recordList");
        //     break;
        //
        //   default:
        //     break;
        // }
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

