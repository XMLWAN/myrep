<template>
  <div class="app-container">
    <div class="buyStepIndex">
      <buy-steps :currentStep="2" ></buy-steps>
      <div title="选择支付方式" class="stepTwo">
        <div class="prompt-part">
          <div class="prompt_1">订单提交成功，请尽快付款！</div>
          <div class="prompt_2">请您在7天内完成支付，否则订单会被自动取消</div>
        </div>
        <div class="pay-price">
          应付金额：<span>{{price}}</span>元
        </div>
        <div class="option-list">
          <div :class="type==1?'option-item active':'option-item'">
            <div :class="type==1?'radio-input active-radio':'radio-input'" @click="WxCheck"></div>
            <div class="pay-way-icon">
              <img src="../../assets/service/icon_pay_wechat.svg"/>
            </div>
            微信支付
          </div>
          <div :class="type==2?'option-item active':'option-item'">
            <div :class="type==2?'radio-input active-radio':'radio-input'" @click="TransferCheck"></div>
            <div class="pay-way-icon">
              <img src="../../assets/service/ico_dg.jpg"/>
            </div>
            公对公转账
            <div class="del">
              <p>公司名称：深圳市健康互动科技有限公司</p>
              <p>银行账号：755926838810901</p>
              <p>开户行：招商银行高新园支行 </p>
              <div v-if="isShow">
              <p>线下汇款请直接向您在酷医云的专属账户汇款，系统会将汇款直接匹配到您的酷医云订单。各种方式的到账时间一般为：招行1-2天，跨行3-5天（具体到账时间以银行的实际到账时间为准）</p>
              <p>请务必在备注在备注中注明订单号: {{orderNumber}}</p>
              <p>如有任何疑问请立即联系客服</p>
              </div>
              <p>邮箱：service@shengws.com</p>
              <p>电话：0755-86526342</p>
            </div>
          </div>
        </div>
        <div class="footer-btn">
            <button class="btnMid btnBlue next-step" @click="next">下一步</button>
        </div>

      </div>


    </div>
  </div>
</template>


<script>
  import BuySteps from './components/buySteps'
  import {getOrderInfo} from "@/api/service"

  export default {
    name: "servicePay",

    created(){
      this.getOrderInfo()
    },
    data() {
      return {
        type: 1,
        orderNumber: '',
        isShow:false,
        price:'',
      };
    },
    methods: {
      WxCheck: function () {
        this.type = 1
        this.isShow= false

      },
      TransferCheck: function () {
        this.type = 2
        this.isShow= true
      },
      getOrderInfo:function () {
        let params = {
          'id': this.$route.query.id
        }
        getOrderInfo(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.$notify({
              title: "成功",
              message: response.data.data.msg,
              type: "success",
              duration: 2000
            });
            this.price  =  response.data.data.total
            this.orderNumber  =  response.data.data.orderNumber
          }
        })

      },next:function () {
        this.$router.push("/weChatPay?id="+this.$route.query.id+"&type="+this.type);
      }
    },
    components: {
      BuySteps
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    padding: 20px;
    background: #f6f8f9;
    min-height: calc(100vh - 84px);
    overflow: hidden;
    .buyStepIndex {
      background: #fff;
      color: #353535;
      padding: 10px 30px;
      font-size: 14px;
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

      .stepTwo {
        padding-top: 30px;
        position: relative;
        .prompt-part {
          line-height: 20px;
          font-size: 14px;
          .prompt_1 {
            height: 20px;
            color: #353535;
          }
          .prompt_2 {
            height: 20px;
            color: #888888;
            margin-top: 10px;
          }
        }
        .pay-price {
          position: absolute;
          top: 41px;
          right: 0;
          height: 28px;
          line-height: 28px;
          color: #353535;
          span {
            font-size: 20px;
            color: #fb6161;
          }
        }
        .option-list {
          margin-top: 30px;
          width: 100%;
          height: auto;
          .option-item {
            width: 100%;
            //   height: 90px;
            line-height: 90px;
            font-size: 16px;
            color: #353535;
            border-bottom: 1px solid #eeeeee;
            cursor: pointer;
            &.active {
              box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.07);
            }
            .radio-input {
              width: 14px;
              height: 14px;
              margin: 38px 20px 0 30px;
              border-radius: 7px;
              border: 1px solid #b2b2b2;
              float: left;
              &.active-radio {
                color: #2a75ed;
                position: relative;
                &:after {
                  position: absolute;
                  top: 1px;
                  left: 1px;
                  width: 10px;
                  height: 10px;
                  content: "";
                  border-radius: 5px;
                  background: #2a75ed;
                }
              }
            }
            .pay-way-icon {
              width: 24px;
              height: 24px;
              display: inline-block;
              margin: 33px 10px 0 0;
              float: left;
              img {
                width: 100%;
                height: 100%;
                float: left;
              }
            }
            .del {
              padding-left: 60px;
              p {
                padding: 0;
                margin: 0;
                font-size: 13px;
                line-height: 26px;

              }
            }
          }
        }
        .footer-btn {
          text-align: center;
          margin-top: 50px;
          .btnBlue {
            display: inline-block;
            width: 90px;
            height: 36px;
            padding: 0;
            text-align: center;
            line-height: 36px;
            border-radius: 2px;
            cursor: pointer;
            font-size: 14px;
            color: #fff;
            background: #409eff;
            border: none;
          }
        }
      }
    }
  }
</style>

