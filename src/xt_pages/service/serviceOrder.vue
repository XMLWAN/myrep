<template>

  <div v-loading='loading'>
    <div v-if="!isShowProbationPeriod&&!isShowFormal&&!isShowYj" class="topHint">
      <div class="top-text">
        您未订购血透管理的服务<br>
        逾期未订购血透管理将无法正常使用，如有疑问，请咨询客服：0755-86526342
      </div>
    </div>

    <div v-if="isShowProbationPeriod" class="topHint">
      <div class="top-text">
        您的血透管理处于免费版，当前管理患者<span>{{this.subscibe.patients}}</span>位<br>
        逾期未订购血透管理将无法正常使用，如有疑问，请咨询客服：0755-86526342
      </div>
    </div>
    <div v-if="isShowFormal" class="topHint">
      <div class="top-text">
        您的血透管理处于标准版（<span>{{time}}</span>），当前管理患者<span>{{this.subscibe.patients}}</span>位<br>
        逾期未订购血透管理将无法正常使用，如有疑问，请咨询客服：0755-86526342
      </div>
    </div>
    <div v-if="isShowZYPanel" class="topHint">
      <div class="top-text">
        您的血透管理处于专业版（<span>{{time}}</span>），当前管理患者<span>{{this.subscibe.patients}}</span>位<br>
        逾期未订购血透管理将无法正常使用，如有疑问，请咨询客服：0755-86526342
      </div>
    </div>

    <div v-if="isShowYj" class="topHint">
      <div class="top-text">
        您的血透管理处于永久免费使用<br>
        逾期未订购血透管理将无法正常使用，如有疑问，请咨询客服：0755-86526342
      </div>
    </div>
    <!-- <div class="online-edu"> 
      <div class="online-header">
        <div class="header-desc">
          <h3>
            血透管理正式版
          </h3>
        </div>
      </div>
    </div> -->

    <div class="config-process">

      <ul class="process">
        <li  tag="li" class="items" >
          <div class="inner">
            <h2 class="name">免费版</h2>
            <p class="text">最多可管理100位患者</p>
            <span class="price size">免费使用</span>
            <!-- <span  @click="isSCRMClick = 1" v-if="isSCRMClick == 2" class="buy active">已选购</span> -->
            <span class="buy active">已开通</span>
          </div>
        </li>
        <li  tag="li" class="items" >
          <div class="inner">
            <h2 class="name">标准版</h2>
            <p class="text">最多可管理200位患者</p>
            <span class="price"><i>￥</i>6980<span class="year">/ 年</span></span>
            <!-- <span  @click="isWxClick = 1" v-if="isWxClick == 2" class="buy active">已选购</span> -->
            <!-- <span class="buy active">已开通</span> -->
            <!-- <span @click="selectXt(1)" v-if="isBZClick == 2" class="buy active">已选购</span> -->
            <span @click="selectXt(1)" class="buy " :class="bzactive||!bzflag?'active':''" >{{bztext}}</span>

          </div>
        </li>
        <li tag="li" class="items" >
          <div class="inner">
            <h2 class="name">专业版</h2>
            <p class="text">管理的患者数无限制</p>
            <span class="price"><i>￥</i>15800<span class="year">/ 年</span></span>
            <!-- <span class="price"><i>￥</i>23888<span class="year">/ 年</span></span> -->
            <!-- <span @click="selectXt(8)" v-if="isXTClick == 2" class="buy active">已选购</span>
            <span @click="selectXt(8)" v-if="isXTClick == 1" class="buy ">立即选购</span> -->
            
            <span @click="selectXt(8)" class="buy " :class="zyactive?'active':''" >{{zytext}}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="purchaseCart">
      <div class="content-part">
        <span>购买年数:</span>
        <el-input-number v-model="num1" @change="handleChange" :min="1" :max="1000" label="年"></el-input-number>
        <div class="total-price">
          合计：
          <span v-if="isXTClick == 2">{{totalPrice}} 元</span>
          <span v-if="isXTClick == 1">0元</span>

        </div>
        <button v-if="bzactive||zyactive" class="go-to-purchase" @click="jumpToNewUrl">去结算</button>
        <button v-if="!bzactive&&!zyactive" class="go-to-purchase2" @click="jumpToNewUrl" disabled>去结算</button>

      </div>
    </div>

  </div>
</template>

<script>

  import {getProduct} from "@/api/service"

  export default {
    name: "ServiceOrder",
    created() {
      this.getProduct()

    },
    data() {
      return {
        loading:true,
        bzactive:false,
        bztext:'立即选购',
        bzflag:false,

        zyactive:false,
        zytext:'立即选购',
        isWxClick:1,
        isXTClick:2,
        isBZClick:2,
        isSCRMClick:1,
        flag: false,
        time:'',
        isShowProbationPeriod: false,
        isShowFormal: false,
        isShowZYPanel:false,
        isShowYj: false,
        leftTime:'',
        num1: 1,
        price:'',
        original_price:'',
        totalPrice:'',
        subscibe:{
          created_time: 0,
          id: 0,
          org_id: 0,
          patients: 0,
          period_end: 0,
          period_end_time: "0",
          period_start: 0,
          period_start_time: "0",
          state: 0,
          status: 0,
          updated_time: 0,
        },
        products: [

        ],
        productsMap:{},
        selectProduct:{},
      };
    },
    methods:{
      getProduct:function () {
        getProduct().then(response => {
          
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
          }else {
            this.subscibe = response.data.data.subscibe;
            if(this.subscibe.patients>60) {
              this.bzflag = false; //可否购买
              this.bztext = '无法选购';
            }else {
              this.bzflag = true;
              this.bztext = '立即选购';
            }

            if(this.subscibe.state == 1){//标准版
              this.isShowFormal = true
              this.isShowProbationPeriod = false
              this.isShowZYPanel = false;
              this.isShowYj = false;
              this.leftTime = response.data.data.subscibe.period_end - response.data.data.serviceTime
              if(this.leftTime < 0){
                this.flag = true
                this.time="已过期"
              }
            }else if(this.subscibe.state == 8){//专业版
              this.isShowProbationPeriod = false;
              this.isShowFormal = false;
              this.isShowZYPanel = true;
              this.isShowYj = false;
              this.leftTime = response.data.data.subscibe.period_end - response.data.data.serviceTime
              if(this.leftTime < 0){
                this.flag = true
                this.time="已过期"
              }
            }else if(this.subscibe.state == 2){//试用版
              this.isShowProbationPeriod = true
              this.isShowFormal = false
              this.isShowZYPanel = false;
              this.isShowYj = false;
              this.leftTime = response.data.data.subscibe.period_end - response.data.data.serviceTime
              if(this.leftTime < 0){
                this.flag = true
                this.time="已过期"
              }
            }if(this.subscibe.state == 9){//永乐免费版
              this.isShowProbationPeriod = false
              this.isShowFormal = false
              this.isShowZYPanel = false;
              this.isShowYj = true;
            }
            for(let i = 0; i < response.data.data.products.length; i++){
              this.products.unshift(response.data.data.products[i]);
              this.productsMap[response.data.data.products[i]['edition']] = response.data.data.products[i];
              // this.price = response.data.data.products[0].price
              // this.original_price = response.data.data.products[0].original_price
            }
          }

          
          this.loading = false;
          
        })

      },timeDown() {
        let leftTime =   this.leftTime
        let d = parseInt(leftTime / (24 * 60 * 60))
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
        let m = this.formate(parseInt(leftTime / 60 % 60))
        let s = this.formate(parseInt(leftTime % 60))
        if (leftTime <= 0) {
          this.flag = true
        }else {
          this.time = d + '天' + h + '小时' + m + '分' + s + '秒'
        }
      }, formate(time) {
        if (time >= 10) {
          return time
        } else {
          return `0${time}`
        }
      },
      handleChange:function (val) {
        this.totalPrice = this.price * val
      },
      jumpToNewUrl:function () {
        this.$router.push("/servicePay?amount="+this.num1+'&serve_id='+this.selectProduct['id']);
      },
      selectXt(type) {
        if(type==1 && this.bzflag) {

          if(!(type in this.productsMap)) {
            this.$message.error("没有此服务，无法订购");
            return false;
          }

          this.bzactive = true;
          this.bztext = '已选购';
          this.zyactive = false;
          this.zytext = '立即选购';

          this.selectProduct = this.productsMap[type];
          this.price = this.selectProduct['price'];
          this.totalPrice = this.price;
          this.num1 = 1;
          // this.isXTClick = 2;
          // this.isBZClick = 1;
        }else if(type==8) {
          if(!(type in this.productsMap)) {
            this.$message.error("没有此服务，无法订购");
            return false;
          }
          this.bzactive = false;
          this.bztext = this.bzflag?'立即选购':'无法选购';
          this.zyactive = true;
          this.zytext = '已选购';
          this.selectProduct = this.productsMap[type];
          this.price = this.selectProduct['price'];
          this.totalPrice = this.price;
          this.num1 = 1;
        }else {
          this.selectProduct = {};
        }
      }
    },
    mounted() {
      let time = setInterval(() => {
        if (this.flag == true) {
          clearInterval(time)
        }
        this.leftTime = this.leftTime - 1
        this.timeDown()
      }, 1000)

    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @mixin ellipsis {
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ::-webkit-scrollbar-track-piece {
    background: #e5e5e5;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ffffff;
    border-radius: 20px;
  }

  .topHint {
    padding: 0 10px;
    .top-text {
      width: 100%;
      line-height: 24px;
      background: rgba(255, 184, 94, 0.1);
      border: 1px solid #ffdeb4;
      border-radius: 2px;
      margin-top: 20px;
      padding: 10px;
      margin-bottom: 40px;
      font-size: 14px;
      color: #353535;
      span {
        color: #fb6161;
      }
    }
  }

  .online-edu {
    padding: 0 10px 30px 10px;
    .online-header {
      color: #fff;
      background: linear-gradient(90deg, #2abdb8, #2e99ce);
      text-align: center;
      border-radius: 4px;
      height: 50px;
      line-height: 50px;
      .header-desc {
        h3 {
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
  }

  .header-price {
    padding: 20px 0 40px;
    background: #fff;
    border-radius: 4px;
    .price-view {
      text-align: center;
      h5 {
        color: #303133;
        span {
          font-size: 20px;
          font-weight: normal;
        }
      }
      p {
        color: #eee;
        margin-top: 10px;
        font-size: 14px;
        color: #888;
      }
    }
    .buy {
      margin-top: 15px;
      p {
        width: 210px;
        margin: 0 auto;
        cursor: pointer;
        font-size: 14px;
        padding: 10px 15px;
        text-align: center;
        border-radius: 4px;
        background: linear-gradient(90deg, #2abdb8, #2e99ce);
        color: #fff;
      }
    }
  }

  .config-process {
    width: 100%;
    padding-bottom: 60px;
    .process {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: flex-start;
      -ms-flex-align: flex-start;
      align-items: flex-start;
      padding-left: 0;
      width: 90%;
      margin: 0 auto;
      // height: 480px;
      // text-align: center;
      .items {
        list-style: none;
        box-shadow: 4px 4px 12px rgba(135, 135, 135, 0.15);
        margin: 0 10px;
        background: #fff;
        cursor: pointer;
        flex: 1;
        padding-bottom: 30px;
        .inner {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          flex-direction: column;
          .name {
            font-size: 18px;
            color: #34495e;
            background: #e9f8f8;
            height:50px;
            line-height: 50px;
            border-top: 3px #2abdb8 solid;
            margin: 0;
            text-align: center;
            font-weight: bold;

          }
          .text {
            height: 166px;
            line-height: 22px;
            margin: 0;
            padding:  20px;
            display: flex;
            font-size: 15px;
            color: #353535;
          }
          .price{
            font-size: 32px;
            color: #383838;
            text-align: center;
            margin: 20px 0 10px 0;
            height: 36px;
            line-height: 36px;
            i{
              font-size:20px;
            }
            .year{
              font-size:18px;
              color: #999999;
              margin-left: 4px;
            }
          }
          .size{
            font-size:15px;
            color: #2abdb8;
          }
          .buy{
            font-size: 14px;
            text-align:center;
            width: 162px;
            height: 44px;
            line-height: 44px;
            color: #2abdb8;
            margin: 0 auto;
            border-radius: 30px;
            background: -webkit-gradient(linear, left top, right top, from(#2abdb8), to(#2e99ce));
            background: linear-gradient(90deg, #2abdb8, #2e99ce);
            color: #fff;
            &.active{
              background: #e9f8f8;
              color: #2abdb8;
            }
          }

        }
      }
    }
  }

  .purchaseCart {
    height: 60px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #eeeeee;
    padding-left: 160px;
    background-color: #ffffff;
    .content-part {
      height: 100%;
      width: 100%;
      padding-right: 40px;
      text-align: right;

      .chosen-service {
        display: inline-block;
        height: 60px;
        line-height: 60px;
        position: relative;
        margin-right: 30px;
        cursor: pointer;
        span {
          color: #fb6161;
        }
        .triangle {
          position: absolute;
          top: 25px;
          right: -15px;
          height: 0;
          width: 0;
          display: inline-block;
          border-bottom: 6px solid #c1c4ca;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
        }
      }
      .total-price {
        display: inline-block;
        height: 60px;
        line-height: 60px;
        margin-right: 50px;
        span {
          color: #fb6161;
        }
      }
      .go-to-purchase {
        width: 86px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #ffffff;
        border: none;
        border-radius: 2px;
        text-align: center;
        user-select: none;
        background: #fb6161;
      }

      .go-to-purchase2 {
        width: 86px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #ffffff;
        border: none;
        border-radius: 2px;
        text-align: center;
        user-select: none;
        background: grey;
      }
    }
    .chosen-list-box {
      position: absolute;
      bottom: 65px;
      right: 45px;
      width: 510px;
      height: 300px;
      background: #fff;
      box-shadow: 0px 0 12px 0px rgba(0, 0, 0, 0.07),
      0px 0px 4px 0px rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      .box-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        background: #f5f7fa;
        border-radius: 2px;
        .close-icon {
          width: 16px;
          height: 16px;
          float: right;
          margin: 17px 0 0;
          cursor: pointer;
          display: inline-block;
          background: url(../../assets/service/icon_Pop-ups_close.svg) center no-repeat;
        }
      }
      .chosen-list {
        height: 240px;
        width: 100%;
        padding: 10px 0 0 0;
        overflow-y: scroll;
        .service-item {
          height: 60px;
          width: 100%;
          margin-bottom: 10px;
          padding: 10px 0 10px 20px;
          line-height: 40px;
          font-size: 14px;
          position: relative;
          cursor: pointer;
          div {
            @include ellipsis;
            &.image {
              width: 40px;
              height: 40px;
              margin-right: 10px;
              img {
                width: 100%;
                height: 100%;
                float: left;
              }
            }
            &.name {
              color: #353535;
              width: 290px;
            }
            &.price {
              color: #353535;
              width: 130px;
            }
          }
          .delete-icon {
            display: none;
            width: 12px;
            height: 12px;
            position: absolute;
            top: 24px;
            right: 20px;
            background: url(../../assets/service/delete.png) center no-repeat;
          }
          &:hover {
            background: #f5f7fa;
            .delete-icon {
              display: block;
            }
          }
        }
      }
    }
  }
</style>

