<template>

       <div  class="buy-steps">
                <span  class="buy-steps_item buy-steps_item-in"  >1.确认订单信息</span>
                <span  class="buy-steps_line">- - - - -</span>
                <span  :class="currentStep==2||currentStep==3||currentStep==4?'buy-steps_item buy-steps_item-in':'buy-steps_item'">2.选择支付方式</span>
                <span  class="buy-steps_line">- - - - -</span>
                <span  :class="currentStep==3||currentStep==4?'buy-steps_item buy-steps_item-in':'buy-steps_item'">3.确认付款</span>
                <span  class="buy-steps_line">- - - - -</span>
                <span  :class="currentStep==4?'buy-steps_item buy-steps_item-in':'buy-steps_item'">4.完成订购</span>
           </div>

</template>


<script>
export default {

  name: "BuySteps",
  props: {
    currentStep: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {

    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.buy-steps {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      border-bottom: 1px solid #eee;
      .buy-steps_item {
        color: #888888;
      }
      .buy-steps_item-in {
        color: #353535;
      }
      .buy-steps_line {
        margin: 0 20px;
      }
    }

</style>

