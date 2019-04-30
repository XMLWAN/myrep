<template>
    <div class="app-container">
       <div class="service-box">
         <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的服务" name="first">
                <my-service></my-service>
            </el-tab-pane>
            <el-tab-pane label="服务订购" name="second">
                <service-order></service-order>
            </el-tab-pane>
            <el-tab-pane label="订购记录" name="third">
            </el-tab-pane>
            <el-tab-pane label="发票管理" name="invoice">发票管理</el-tab-pane>
         </el-tabs>
         </div>
    </div>
</template>

<script>
import MyService from "./components/myService";
import OrderRecord from "./orderRecord";
import ServiceOrder from "./serviceOrder";
import ServicePay from "./servicePay";
export default {
  name: "service",
  components: {
    MyService,
    ServiceOrder,

  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event, this.activeName);

      switch (this.activeName) {
        case "invoice":
          this.$router.push("/service/invoice");

          break;
        case "third":
          this.$router.push("/service/recordList");
          break;

        default:
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

