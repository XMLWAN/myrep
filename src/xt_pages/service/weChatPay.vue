<template>
  <div class="app-container">
    <div class="buyStepIndex">
      <buy-steps :currentStep="3"></buy-steps>
      <div class="buy-step3" v-if="type == 1">
        <div class="title">微信扫码支付</div>
        <div class="shop"><span class="shop-key">订购机构：</span> <span class="shop-val">{{OrgName}}</span></div>
        <div class="price"><span class="price-key">应付金额：</span> <span class="price-val">{{price}}元</span></div>
        <div class="wechat">
          <div id="qrcode" class="wechat-qr">
          </div>


          <div class="wechat-right">
            <div class="wechat-tips">请使用微信扫码，支付成功后自动开通服务</div>
            <div class="wechat-btn_wrap">
              <span class="wechat-btn"><div @click="jump">我已完成支付</div></span>
            </div>
            <a href="javascript:void(0)" @click="$router.back(-1)" class="go-back-btn-1">&lt;选择其他支付方式</a>
          </div>
        </div>
      </div>

      <div class="buy-step3" v-if="type == 2">
        <div class="title">
          对公转账
        </div>
        <div class="shop">
          <span class="shop-key">订购机构：</span>
          <span class="shop-val">{{OrgName}}</span>
        </div>
        <div class="price">
          <span class="price-key">应付金额：</span>
          <span class="price-val">{{price}}元</span>
        </div>
        <div class="zz">
          <div class="zz-rect">
            <div class="zz-tips">
              您需要转账
              <span data-v-db8f6a5c="">{{price}}元</span>至以下帐户，转账成功后填写相应信息并提交审核
            </div>
            <div class="zz-item">
              <span class="zz-item_key">收款户名</span>
              <span class="zz-item_val">深圳市健康互动科技有限公司</span>
            </div>
            <div class="zz-item">
              <span class="zz-item_key">收款银行</span>
              <span class="zz-item_val">755926838810901</span>
            </div>
            <div class="zz-item">
              <span class="zz-item_key">银行账号</span>
              <span class="zz-item_val">招商银行高新园支行</span>
            </div>
          </div>
          <div class="zz-btn_wrap">
            <a href="javascript:void(0)" class="go-back-btn-2" @click="$router.back(-1)">&lt;选择其他支付方式</a>
            <span class="zz-btn" @click="comfirm">已转账汇款</span>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>


<script>
  import BuySteps from "./components/buySteps";
  import QRCode from 'qrcodejs2'
  import {getPayUrl, getOrderInfo, postOrderPayType} from "@/api/service"

  export default {
    name: "weChatPay",
    created() {
      this.type = this.$route.query.type
      if (this.type == 1) {
        this.GetPayUrl()
      } else {
        this.GetOrderInfo()
      }
    },
    data() {
      return {
        id: "",
        type: "",
        price: '',
        OrgName: '',
        payUrl:'',
      };
    },
    methods: {
      qrcode (){
        let qrcode = new QRCode('qrcode', {
          width: 100,
          height: 100, // 高度
          text: this.payUrl
        })
      },
      GetPayUrl: function () {
        let params = {
          'id': this.$route.query.id
        }
        getPayUrl(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.payUrl = response.data.data.payUrl
            this.price = response.data.data.price
            this.OrgName = response.data.data.OrgName

            this.qrcode()
          }
        })

      }, GetOrderInfo: function () {
        let params = {
          'id': this.$route.query.id
        }
        getOrderInfo(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.OrgName = response.data.data.OrgName
            this.price = response.data.data.total
          }
        })
      }, comfirm: function () {
        let params = {
          'id': this.$route.query.id
        }
        postOrderPayType(params).then(response => {
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
            this.$router.push("/service/completeOrder?type=" + this.type + "&id=" + this.$route.query.id);
          }
        })


      },jump:function () {
        this.$router.push("/service/completeOrder?type=" + this.type + "&id=" + this.$route.query.id);

      }


    },

    components: {
      BuySteps
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
      .buy-step3 {
        width: 600px;
        overflow: hidden;
        margin: 0 auto;
        .title {
          height: 28px;
          line-height: 28px;
          font-size: 20px;
          font-weight: bold;
          margin: 50px 0 30px;
          text-align: center;
          color: #888;
        }
        .shop {
          height: 20px;
          line-height: 20px;
          .shop-key {
            margin: 0 20px 0 0;
          }
          .shop-val {
            font-size: 14px;
          }
        }
        .price {
          height: 58px;
          line-height: 28px;
          margin: 16px 0 0;
          padding: 0 0 30px;
          border-bottom: 1px solid #eee;
          .price-key {
            margin: 0 20px 0 0;
          }
          .price-val {
            display: inline-block;
            height: 28px;
            color: #fb6161;
            vertical-align: top;
            font-size: 20px;
            font-weight: bold;
          }
        }
        .zz {
          .zz-rect {
            overflow: hidden;
            height: 192px;
            margin: 30px 0 20px;
            padding: 0 20px;
            background: #f6f8fa;
            .zz-tips {
              height: 25px;
              line-height: 25px;
              margin: 16px 0 20px;
              span {
                display: inline-block;
                height: inherit;
                font-size: 18px;
                vertical-align: top;
                color: #fb6161;
                margin: 0 5px;
                font-weight: bold;
              }
            }
            .zz-item {
              height: 20px;
              line-height: 20px;
              margin: 0 0 15px;
              .zz-item_val {
                margin: 0 0 0 30px;
                font-weight: bold;
              }
            }
          }
          .zz-btn_wrap {
            overflow: hidden;
            .go-back-btn-2 {
              height: 36px;
              line-height: 36px;
              display: inline-block;
              font-size: 14px;
              color: #2a75ed;
            }
            .zz-btn {
              float: right;
              width: 190px;
              height: 36px;
              line-height: 36px;
              text-align: center;
              background: #409eff;
              color: #fff;
              border-radius: 2px;
              cursor: pointer;
            }
          }
        }

        .wechat {
          display: flex;
          .wechat-qr {
            width: 200px;
            height: 200px;
            margin: 30px 50px 0 0;
          }
          .wechat-right {
            position: relative;
            .wechat-tips {
              height: 20px;
              line-height: 20px;
              margin: 30px 0 10px;
            }
            .wechat-btn_wrap {
              display: flex;
              justify-content: flex-start;
              height: 36px;
              .wechat-btn {
                width: 120px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                background: #409eff;
                color: #fff;
                border-radius: 2px;
                cursor: pointer;
              }
            }
            .go-back-btn-1 {
              height: 20px;
              font-size: 14px;
              color: #2a75ed;
              position: absolute;
              bottom: 0;
              left: 0;
            }
          }
        }
      }
    }
  }
</style>

