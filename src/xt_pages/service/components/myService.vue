<template>
  <div class="my-service">
    <div class="page-title" v-if="isShowProbationPeriod">
      <img src="../../../assets/service/shoplogo_init.png" alt="logo" class="page-title-logo">
      <div class="page-title-info">
        <h2>{{subscibe.Org.org_name}}<span class="EC1_BG">试用版</span></h2>
        <p>您的血透管理处于试用期<span class="EC5">
        </span></p>
        <span class="buy-version" @click="buy">立即购买 </span>
      </div>
    </div>

    <div class="page-title" v-if="isShowFormal">
      <img src="../../../assets/service/shoplogo_init.png" alt="logo" class="page-title-logo">
      <div class="page-title-info">
        <h2>{{subscibe.Org.org_name}}<span class="EC1_BG">标准版</span></h2>
        <p>您正在使用标准版血透管理<span class="EC5">{{time}}</span></p>
        <!--<span class="buy-version">立即购买 </span>-->
      </div>
    </div>

    <div class="page-title" v-if="isZYShowFormal">
      <img src="../../../assets/service/shoplogo_init.png" alt="logo" class="page-title-logo">
      <div class="page-title-info">
        <h2>{{subscibe.Org.org_name}}<span class="EC1_BG">专业版</span></h2>
        <p>您正在使用专业版血透管理<span class="EC5">{{time}}</span></p>
        <!--<span class="buy-version">立即购买 </span>-->
      </div>
    </div>

    <div class="page-title" v-if="isShowYj">
      <img src="../../../assets/service/shoplogo_init.png" alt="logo" class="page-title-logo">
      <div class="page-title-info">
        <h2>{{subscibe.Org.org_name}}<span class="EC1_BG">永久版</span></h2>
        <p>您正在使用永久版血透管理<span class="EC5"></span></p>
        <!--<span class="buy-version">立即购买 </span>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {getServiceList} from "@/api/service"
  import timeDown from './timeDown.vue'
import {uParseTime} from "@/utils/tools";

  export default {
    components : {
      timeDown
    },
    created() {
      this.getMyService()

    },
    name: "MyService",
    data() {
      return {
        isShowProbationPeriod: true,
        isShowFormal: true,
        isShowYj:true,
        isZYShowFormal:true,
        time: '',
        flag: false,
        serviceTime: '',
        expiryTime: '',
        leftTime:'',

        subscibe:{

          Org:{},
        }
      };
    },
    methods: {
      getMyService: function () {
        getServiceList().then(response => {
          this.subscibe = response.data.data.subscibe
          if(this.subscibe.state == 1){
            this.isShowFormal = true;
            this.isShowProbationPeriod = false;
            this.isShowYj = false;
            this.isZYShowFormal = false;
             this.leftTime = response.data.data.subscibe.period_end - response.data.data.serviceTime
            if(this.leftTime <= 0){
              this.flag = true
              this.time = '(已过期)'
            }
          }else if(this.subscibe.state == 8){
            this.isShowFormal = false;
            this.isShowProbationPeriod = false;
            this.isShowYj = false;
            this.isZYShowFormal = true;
             this.leftTime = response.data.data.subscibe.period_end - response.data.data.serviceTime
            if(this.leftTime <= 0){
              this.flag = true
              this.time = '(已过期)'
            }
          }else if(this.subscibe.state == 2){
            this.isShowProbationPeriod = true;
            this.isShowFormal = false;
            this.isShowYj = false;
            this.isZYShowFormal = false;
           
          }else if(this.subscibe.state == 9){
            this.isShowProbationPeriod = false;
            this.isShowFormal = false;
            this.isShowYj = true;
            this.isZYShowFormal = false;
          }else {
            this.isShowProbationPeriod = false;
            this.isShowFormal = false;
            this.isShowYj = false;
            this.isZYShowFormal = false;
          }
        })
      },
      buy:function () {
        this.$router.push("/service/buy");

      },
      timeDown() {
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
  .my-service {
    padding: 10px;
    .page-title {
      background: white;
      box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.07),
      0px 0px 4px 0px rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      padding: 30px 20px;
      position: relative;
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      .page-title-logo {
        order: 1;
        width: 60px;
        height: 60px;
        margin-right: 10px;
        border-radius: 40px;
      }
      .page-title-info {
        order: 2;
        h2 {
          height: 28px;
          line-height: 28px;
          font-size: 20px;
          margin: 0;
          color: #353535;
          font-weight: normal;
          span {
            color: #fff;
            width: 44px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 12px;
            display: inline-block;
            position: relative;
            top: -2px;
            background: #409eff;
            margin: 0 0 0 12px;
          }
        }
        p {
          height: 20px;
          font-size: 14px;
          margin: 12px 0 0 0;
          color: #888;
          line-height: 20px;
          span {
            color: red;
          }
        }
        .buy-version {
          min-width: 100px;
          height: 36px;
          background: #409eff;
          border-radius: 2px;
          color: white;
          line-height: 20px;
          font-size: 14px;
          line-height: 36px;
          display: block;
          position: absolute;
          right: 20px;
          top: 50%;
          text-align: center;
          transform: translateY(-50%);
          padding: 0 15px;
          cursor: pointer;
        }
      }
    }
  }
</style>

