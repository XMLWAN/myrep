<template>
  <section class="app-main-bg">
    <div class="home-page">
      <div class="search clearfix">
        <input type="text" class="search-input" placeholder="病人姓名/透析号" v-model="searchKey" >
        <button class="search-button" @click="clickSearch">搜索</button>
      </div>
      <div class="ui-step clearfix">
        <h2 class="ui-step-tit">病人透析治疗流程</h2>
        <ul class="ui-step-ul">
          <li v-for="(item, index) in steps" :key="index" class="ui-step-done">
            <div class="ui-step-number"><i /></div>
            <div class="ui-step-title">{{ item.title }}</div>
          </li>
        </ul>
      </div>
      <!-- <el-steps :active="5" align-center>
          <el-step  v-for="(item, index) in steps" :key="index" :title="item.title"></el-step>
      </el-steps> -->
      <div class="config-process">
        <h2 class="title">系统使用配置流程</h2>
        <ul class="process">
          <router-link v-for="(item, index) in process" tag="li" class="items" :key="index" :to="item.link">
              <img :src="item.imgUrl" >
              <p class="name">{{ item.name }}</p>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="main-r">
        <div class="res-widget">
          <ul>
            <li class="taocan-title clearfix">
              <div class="taocan-h2 ">{{subscibeBan.used}}</div>
              <div class="bar"></div>
              <div class="taocan-h1 ">{{subscibeBan.name}}</div>
            </li>
            <li class="taocan-item">
              <div class="ng-binding" :title="subscibeBan.desc">{{subscibeBan.desc}}</div>
            </li>
            <li class="taocan-item">
              <div class="ng-binding" :title="subscibeBan.detail">{{subscibeBan.detail}}</div>
            </li>
            <li class="taocan-item" v-if="this.subscibe.state==3 || this.subscibe.state==2 || leftTime<0">
              <div class="ng-binding" style="color:red" >如果您已经购买，请尝试重新登录刷新</div>
            </li>

            <li class="taocan-xufei">
              <div class="m-t-md" v-if="subscibeBan.leave"><div class="taocan-left-tip">{{subscibeBan.leave}}</div></div>
              <div class="taocan-leftday">
                <div class="taocan-left"></div>
                <div class="taocan-use clearfix" :style="subscibeBan.pce"></div>
              </div>
                <a class="btn clearfix" v-if="subscibeBan.pay_status" href="javascript:0" @click="openPay">立即购买</a>
            </li>
          </ul>
        </div>

        <!-- <div class="res-widget">
          <ul class="notice-widget">
            <li class="notice-title clearfix">
              <div class="pull-right"><a class="notice-more" href="">更多</a></div>
              <div class="bar"></div>
              <div class="notice-h1">公告</div>
            </li>
            <li class="notice-item">
              <div class="text-muted">9-18</div>
              <div class="text"><a href="">微商城分销数据等模块更新优化上线</a></div>
            </li>
              <li class="notice-item">
              <div class="text-muted">9-18</div>
              <div class="text"><a href="">微商城商品、装修模块功能更新优化上线</a></div>
            </li>
             <li>
              <li class="notice-item">
              <div class="text-muted">9-18</div>
              <div class="text"><a href="">微商城分销、装修、子账号管理等多个模块更新优化上线</a></div>
            </li>
          </ul>
        </div>

        <div class="res-widget">
          <ul class="notice-widget">
            <li class="notice-title clearfix">
              <div class="pull-right"><a class="notice-more" href="">更多</a></div>
              <div class="bar"></div>
              <div class="notice-h1">常见问题</div>
            </li>
            <li class="notice-item">
              <div class="text"><a href="">小程序授权绑定常见问题汇总</a></div>
            </li>
              <li class="notice-item">
              <div class="text"><a href="">店铺装修问题汇总</a></div>
            </li>
             <li>
              <li class="notice-item">
              <div class="text"><a href="">商品管理常见问题汇总</a></div>
            </li>
          </ul>
        </div> -->

    </div>
  </section>
</template>
<script>
// import analyze from '../../assets/home/analyze.png'
// import equipment from '../../assets/home/equipment.png'
// import prescription from '../../assets/home/prescription.png'
// import record from '../../assets/home/record.png'
// import scheduling from '../../assets/home/scheduling.png'
// import sick from '../../assets/home/sick.png'
// import user from '../../assets/home/user.png'
import {GetServerTime} from '@/api/public';
import {GetPatientTotal} from '@/api/patient';
export default {
  name: "Home",
  data() {
    return {
      searchKey: "",
      patientTotal:0,
      steps: [
        { title: "透析处方" },
        { title: "接诊评估" },
        { title: "透前评估" },
        { title: "临时医嘱" },
        { title: "透析上机" },
        { title: "双人核对" },
        { title: "透析监测" },
        { title: "透析下机" },
        { title: "透后评估" },
        { title: "治疗小结" }
      ],
      process: [
        {
          imgUrl: require("../../assets/home/equipment.png"),
          name: "设备管理",
          link: "/device/main"
        },
        {
          imgUrl: require("../../assets/home/user.png"),
          name: "病人管理",
          link: "/patients/patients"
        },
        // { imgUrl: require('../../assets/home/sick.png'), name: '登记病人', link: '/patients/create' },
        // { imgUrl: require('../../assets/home/prescription.png'), name: '透析处方', link: '/dialysis/paper' },
        {
          imgUrl: require("../../assets/home/scheduling.png"),
          name: "病人排班",
          link: "/workforce/appointment"
        },
        {
          imgUrl: require("../../assets/home/record.png"),
          name: "透析记录",
          link: "/dialysis/dialysisrecord"
        },
        {
          imgUrl: require("../../assets/home/analyze.png"),
          name: "透析监控",
          link: "/dialysis/watch"
        }
      ],
      subscibe:{},
      subscibeBan:{
        used:'已使用0天',
        name:'免费版本',
        desc:'当前为免费版',
        detail:'可管理100位（含）以下患者',
        leave:'剩余0天',
        pay_status:false,
      },
      serverTime:0,
      leftTime:false,
    };
  },
  methods: {
    GetPatientTotal(){
      GetPatientTotal().then(response=>{
        if(response.data.state==1) {
          this.patientTotal = response.data.data.total;
        }else {
          this.$message.error(response.data.msg);
        }
      }).catch(e=>{

      });
    },
    clickSearch() {
      if (this.searchKey.length > 0) {
        this.$router.push("/patients/patients?keyword=" + this.searchKey);
      } else {
        this.$router.push("/patients/patients");
      }
    },
    openPay(){
      this.$router.push('/service/buy');
    },
    GetServerTime(){
      GetServerTime().then(response=>{
        if (response.data.state==1) {
          this.serverTime = response.data.data.timestamp;
        }else {
          this.serverTime = Math.round(new Date().getTime()/1000);
        }
      }).catch(() => {
        this.serverTime = Math.round(new Date().getTime()/1000);
      });
    },
    initSubscibe() {
      // state:1正版(标准),2试用(免费),3其他无效状态,8专业,9(永久免费)，标准版和专业版会过期
      var used = Math.ceil((this.serverTime - this.subscibe.period_start)/86400);

      var leave = "";
      var pce = '';

      var leaveTime = 0;

      switch (this.subscibe.state) {
        case 9:
          this.subscibeBan={
            used:'已使用'+used+'天',
            name:'永久版',
            desc:'当前为永久免费版本',
            detail:'该版本不会过期，并可使用所有功能',
            leave:'',
            pay_status:false,
            pce:"width:100%",
          };
          break;
        case 2:
          //免费版本不会过期，但有人数限制，免费版，可以管理20位（含）以下患者，当患者数过了20位，系统不能正常使用，达到18位时，要提醒购买,超过60位，要购买专业版
          pce = 0;
          if(this.patientTotal>200) {
            leave = "管理患者数已达"+this.patientTotal+"位，请购买专业版";
            pce = 100;
          }else if(this.patientTotal>100) {
            leave = "管理患者数已达"+this.patientTotal+"位，请购买标准版";
            pce = 100;
          }else if(this.patientTotal>=90) {
            leave = "管理患者数已达"+this.patientTotal+"位，建议购买标准版";
            pce = Math.round(this.patientTotal/100*100)
          }
          pce = "width:"+pce+"%";
          this.subscibeBan={
            used:'已使用'+used+'天',
            name:'免费版',
            desc:'当前为免费版',
            detail:'可管理100位（含）以下患者',
            leave:leave,
            pay_status:leave?true:false,
            pce:pce,
          };
          break;
        case 8:
          leaveTime = this.subscibe.period_end - this.serverTime;
          this.leftTime = leaveTime;
          if (leaveTime<0){
            leave = "已经过期";
            pce = "100";
          } else {
            leave = Math.floor(leaveTime/86400);
            leave = leave>30?"":'剩余'+leave+'天';
            pce = 100 - Math.round(leaveTime/(this.subscibe.period_end - this.subscibe.period_start)*100);
          }
          pce = "width:"+pce+"%";

          this.subscibeBan={
            used:'已使用'+used+'天',
            name:'专业版',
            desc:'当前为专业版',
            detail:'不限患者',
            leave:leave,
            pay_status:leave?true:false,
            pce:pce,
          };
          break;
        case 1:
          leaveTime = this.subscibe.period_end - this.serverTime;
          this.leftTime = leaveTime;
          if (leaveTime<0){
            leave = "已经过期";
            pce = "100";
          } else if(this.patientTotal>200) {
            leave = "管理患者数已达"+this.patientTotal+"位，请购买专业版";
            pce = "width:100%";
          } else if(this.patientTotal>=190) {
              leave = "管理患者数已达"+this.patientTotal+"位，建议购买专业版";
              pce = Math.round(this.patientTotal/200*100);
          } else {
            leave = Math.floor(leaveTime/86400);
            leave = leave>30?"":'剩余'+leave+'天，建议购买标准版';
            pce = 100 - Math.round(leaveTime/(this.subscibe.period_end - this.subscibe.period_start)*100);
          }
          pce = "width:"+pce+"%";

          this.subscibeBan={
            used:'已使用'+used+'天',
            name:'标准版',
            desc:'当前为标准版',
            detail:'可管理200位（含）以下患者',
            leave:leave,
            pay_status:leave?true:false,
            pce:pce,
          };
          break;

        default:
          this.subscibeBan={
            used:'',
            name:'未订阅服务',
            desc:'当前未订阅服务',
            detail:'无法使用血透系统',
            leave:"",
            pay_status:true,
            pce:"",
          };
          break;
      }
    },

  },
  created(){
    this.subscibe = this.$store.getters.xt_user.subscibe;
    this.GetPatientTotal();
    this.GetServerTime();
  },
  watch:{
    serverTime:function () {
      if(this.serverTime>0 && this.patientTotal>0) {
        this.initSubscibe();
      }
    },
    patientTotal:function () {
      if(this.serverTime>0 && this.patientTotal>0) {
        this.initSubscibe();
      }
    }
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main-bg {
  background: #f6f8f9;
  min-height: calc(100vh - 84px);
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px;
  .home-page {
    font-family: "Microsoft Yahei";
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    .search {
      margin: 0 auto;
      margin-top: 16px;
      width: 472px;
      .search-input {
        width: 400px;
        height: 42px;
        line-height: 42px;
        padding-left: 15px;
        border: 1px #ebeef0 solid;
        border-right: none;
        outline: none;
        float: left;
        border-radius: 6px 0 0 6px;
        font-size: 14px;
        color: #333;
        background: #fff;
        box-shadow: 3px 3px 4px rgba(135, 135, 135, 0.05);
      }
      .search-button {
        background-color: #409eff;
        color: #fff;
        font-size: 15px;
        text-align: center;
        height: 42px;
        line-height: 42px;
        float: left;
        outline: none;
        width: 70px;
        border: none;
        border-radius: 0 6px 6px 0;
        font-family: "Microsoft Yahei";
        cursor: pointer;
        -webkit-box-shadow: 3px 3px 4px rgba(135, 135, 135, 0.05);
        box-shadow: 3px 3px 4px rgba(135, 135, 135, 0.05);
      }
    }
    .ui-step {
      margin: 20px 6px 0 6px;
      padding: 10px 0 20px 0;
      zoom: 1;
      background: #fff;
      box-shadow: 0 4px 12px rgba(135, 135, 135, 0.15);
      .ui-step-tit {
        font-size: 18px;
        text-align: center;
        color: #34495e;
        font-weight: 700;
        height: 50px;
        line-height: 50px;
      }
      .ui-step-ul {
        list-style: none;
        .ui-step-done {
          float: left;
          position: relative;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          text-align: center;
          width: 10%;
          &:before,
          &:after {
            position: absolute;
            left: 0;
            top: 21px;
            display: block;
            content: " ";content: " ";
            width: 50%;
            height: 1px;
            background: #409eff;
            z-index: 1;
          }
          &:after {
            left: 50%;
          }
          &:first-child:before,
          &:last-child::after {
            width: 0;
          }
          .ui-step-title {
            color: #34495e;
            font-size: 13px;
            font-weight: normal;
            line-height: 18px;
          }
          .ui-step-number {
            position: relative;
            display: inline-block;
            width: 22px;
            height: 22px;
            margin: 10px 0;
            line-height: 22px;
            background: #409eff;
            color: #fff;
            border-radius: 100%;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            z-index: 2;
            border: 1px #409eff solid;
            i {
              position: absolute;
              left: 4px;
              top: 6px;
              width: 12px;
              height: 6px;
              border: 2px #fff solid;
              color: #fff;
              z-index: 9;
              border-top: none;
              border-right: none;
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
              -moz-transform: rotate(-45deg);
              -ms-transform: rotate(-45deg);
              -o-transform: rotate(-45deg);
            }
          }
        }
      }
    }
    .config-process {
      margin-top: 30px;
      .title {
        font-size: 18px;
        text-align: center;
        color: #34495e;
        font-weight: 700;
        height: 50px;
        line-height: 50px;
      }
      .process {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding-left: 0;
        .items {
          list-style: none;
          box-shadow: 0 4px 12px rgba(135, 135, 135, 0.15);
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          margin: 0 6px;
          background: #fff;
          padding: 22px 0 ;
          cursor: pointer;
          .name {
            font-size: 14px;
            color: #34495e;
            line-height: 24px;
          }
        }
      }
    }
  }
  .main-r {
    min-width: 290px;
    margin: 0 0 0 10px;
    .res-widget {
      min-height: 80px;
      background: #fff;
      padding: 10px 20px;
      margin-bottom: 15px;
      border-radius: 2px;
      // box-shadow: 0 0 4px 0 rgba(200, 200, 200, 0.5);
          -webkit-box-shadow: 0 4px 12px rgba(135, 135, 135, 0.15);
    box-shadow: 0 4px 12px rgba(135, 135, 135, 0.15);
      background-color: #fff;
      color: #34495e;
      font-size: 12px;
      ul {
        padding: 0;
        margin: 0;
        .taocan-title {
          font-weight: 700;
          padding: 10px 0;
          list-style: none;
          .taocan-h2 {
            font-weight: 400;
            float: right;
            font-size: 12px;
            color: gray;
          }
          .bar {
            display: inline-block;
            width: 3px;
            height: 14px;
            background-color: #2589ff;
            float: left;
            margin-top: 1px;
          }
          .taocan-h1 {
            padding-left: 5px;
            overflow: hidden;
            display: inline-block;
            font-size: 14px;
            font-weight: 700;
            float: left;
          }
        }

        .taocan-item {
          border-bottom: 1px solid #f1f1f1;
          padding: 10px 0;
          font-size: 12px;
        }
        .taocan-xufei {
          text-align: center;
          .m-t-md {
            margin-top: 20px;
            text-align: right;
            .taocan-left-tip {
              position: relative;
              font-size: 11px;
              border-radius: 1px;
              padding: 2px;
              display: inline-block;
              color: #ff7979;
              &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #ff7979;
                opacity: 0.2;
                border-radius: 1px;
              }
            }
          }
          .taocan-leftday {
            position: relative;
            height: 4px;
            margin: 5px 0 10px;
            .taocan-left {
              z-index: 1;
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              border-radius: 2px;
              background: #f2f2f6;
            }
            .taocan-use {
              max-width: 100%;
              position: absolute;
              left: 0;
              z-index: 2;
              top: 0;
              bottom: 0;
              border-radius: 2px;
              background: #ff7979;
              text-align: center;
            }
          }

          .btn {
            display: inline-block;
            margin-bottom: 0;
            font-weight: 400;
            text-align: center;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            white-space: nowrap;
            padding: 6px 12px;
            font-size: 12px;
            line-height: 1.3rem;
            border-radius: 4px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;
            background-color: #ff7979;
            border-color: #ff7979;
            color: #fff;
          }
        }
      }
      .notice-widget {
        .notice-title {
          font-weight: 700;
          padding: 10px 0;
          .pull-right {
            display: inline-block !important;
            float: right !important;
            .notice-more {
              color: #409eff !important;
              font-weight: 400 !important;
            }
          }
          .bar {
            display: inline-block;
            width: 3px;
            height: 14px;
            background-color: #2589ff;
            float: left;
          }
          .notice-h1 {
            padding-left: 5px;
            overflow: hidden;
            font-size: 14px;
          }
        }
        .notice-item {
          border-bottom: 1px solid #f1f1f1;
          padding: 10px 0;
          .text-muted {
            color: #9797a1 !important;
            display: inline-block !important;
            float: right !important;
            font-size: 12px;
            margin: 3px 0 0 0;
          }
          .text {
            a {
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .main-r {
    width: 16.66666667%;
  }
}
</style>
