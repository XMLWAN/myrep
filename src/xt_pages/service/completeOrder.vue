<template>
    <div class="app-container" >
        <div class="buyStepIndex">
           <buy-steps :currentStep="4"></buy-steps>
          <div v-if="type == 1">
           <div class="buy-step4" v-if="isSuccess == false">
             <div>
               <img src="../../assets/service/version_charge_fail.png"  class="step4-icon">
               <div class="step4-title">付款失败</div>
               <div class="step4-tips">未完成服务订购，请查看订单并重新支付</div>
               <div to="/servicePay"  class="step4-btn" @click="jump">查看订单</div>
             </div>
           </div>
           <div class="buy-step5" v-if="isSuccess == true">
             <div>
               <img src="../../assets/service/ico_succes.png"  class="step4-icon">
               <div class="step4-title">付款成功</div>
               <div class="step4-tips">完成服务订购，请查看订单并重新支付</div>
               <div to="/servicePay"  class="step4-btn" @click="jump">查看详情</div>
             </div>
           </div>
          </div>

           <div class="buy-step6" v-if="type == 2">
             <div>
               <img src="../../assets/service/ico_bank.png"  class="step6-icon">
               <div class="step4-title">请于三十天内完成转账，我们会尽快确认到账，为您开通服务</div>
               <div class="step4-tips">如果您有任何疑问，请立即联系客服。</div>
               <div class="step4-tips">邮箱：service@shengws.com</div>
               <div class="step4-tips">电话：0755-86526342</div>
               <button   class="step4-btn" @click="jump">查看详情</button>
             </div>
           </div>
        </div>
    </div>
</template>

<script>
import BuySteps from "./components/buySteps";
import { getOrderInfo} from "@/api/service"

export default {
  name: "completeOrder",
  data() {
    return {
      type:'',
      id:'',
      isSuccess:false,
    };
  },
  created(){
    this.type = this.$route.query.type
    this.id = this.$route.query.id
    this.GetOrderInfo()
  },
  components: {
    BuySteps
  },
  methods:{
    jump:function () {
      this.$router.push("/order?id=" + this.id+"&type="+this.type);
    }, GetOrderInfo: function () {
      let params = {
        'id': this.$route.query.id
      }
      getOrderInfo(params).then(response => {
        if (response.data.state == 0) {
          this.$message.error(response.data.msg);
          return false;
        } else {
          if (response.data.data.order.payment_transaction_id.length > 0){

            this.isSuccess = true
          }else{
            this.isSuccess = false
          }
        }
      })
    },

  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  padding: 20px;
  background: #f6f8f9;
  min-height: calc(100vh - 84px);
  overflow: hidden;
  .buyStepIndex {
    color: #353535;
    padding: 0 40px 30px;
    font-size: 14px;
    background: #fff;
    .buy-step4,
    .buy-step5,
    .buy-step6{
      text-align: center;
      .step4-icon {
        width: 80px;
        height: 80px;
        margin: 50px 0 10px;
      }
      .step6-icon {
        width: 110px;
        height: 110px;
        margin: 50px 0 10px;
      }
      .step4-title {
        height: 28px;
        line-height: 28px;
        font-size: 20px;
        font-weight: bold;
      }
      .step4-tips {
        height: 20px;
        line-height: 20px;
        color: #666;
        margin: 20px 0 36px;
      }
      .step4-btn {
        display: block;
        width: 100px;
        height: 36px;
        line-height: 36px;
        background: #409eff;
        color: #fff;
        border-radius: 2px;
        margin: 0 auto;
        cursor: pointer;
        text-decoration: none;
      }
    }
  }
}
</style>
