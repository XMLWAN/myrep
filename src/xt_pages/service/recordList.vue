<template>


  <div class="page-content">
    <div class="orderDetail" v-for="(item, index) in orderList" :key="index">
      <div class="order-state">
        <div class="state-one clearfix">
          <div class="state-info">
            <div class="text-icon-line">
              <div class="state-icon">
                <img src="../../assets/service/red_info_prompt.svg" alt="..."/>
              </div>
              <div class="state-text EC5" v-if="item.order_status == 1">
                订单状态：待支付
              </div>
              <div class="state-text EC5" v-if="item.order_status == 2">
                订单状态：已完成
              </div>
              <div class="state-text EC5" v-if="item.order_status ==3">
                订单状态：已取消
              </div>
            </div>
            <div class="remark-line" v-if="item.order_status==1">
              请在 {{item.OrderExpireTimeFormat}}前完成支付，以免订单超时取消
            </div>
          </div>
          <div class="order-operate">

            <div class="order-operate-btn">
              <button class="btnMid xeBtnDefault" @click="cancelOrder(item, index)" v-if="item.order_status==1">取消订单</button>
              <!-- <button class="btnMid btnOrange" v-if="item.pay_type==2 && item.order_status == 1 || item.order_status == 2"> -->
              <button class="btnMid btnOrange" @click="openHetong(item)" v-if="item.pay_type==2 && (item.order_status == 1 || item.order_status == 2) ">
                生成合同
              </button>
              <button class="btnMid btnOrange" @click="pay(item.id)" v-if="item.order_status == 1">立即支付</button>
            </div>
          </div>
        </div>
      </div>
      <div class="info-table">
        <div class="name">
          <!--<span>订购机构：{{OrgName}}</span>-->
          <span class="order-id">订单编号：{{item.order_number}}</span>
        </div>
        <div class="order-table">
          <div class="global-widget-loading"
               style="position: absolute; background: rgba(255, 255, 255, 0.9); display: none;">
            <div class="loading-content" style="top: 50%;">
              <svg viewbox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
              </svg>
              <p class="loadingText">加载中</p>
            </div>
          </div>
          <div class="main-table">
            <div class="table-header EC3">
              <div class="header-item">
                服务名称
              </div>
              <div class="header-item">
                服务时长
              </div>
              <div class="header-item">
                服务价格(元)
              </div>
            </div>
            <div class="table-body">
              <div class="table-body-row EC3 clearfix">
                <div class="body-item diy">
                  {{item.serve_name}}
                </div>
                <div class="body-item">
                  {{item.quantity*12}}个月 {{item.serve_duration}}
                </div>
                <div class="body-item">
                  {{item.price}}
                </div>
              </div>
            </div>
          </div>
          <div class="discount-detail">
            <div class="sale">
              折扣
              <span v-if="item.discountable_amount == 0">0.00</span>
              <span v-if="item.discountable_amount != 0">{{item.discountable_amount}}</span>

            </div>
          </div>
          <div class="pay-money-wrapper">
            <div class="pay-money">
              合计：
              <span>{{item.payable_amount}}元</span>
            </div>
          </div>
        </div>
      </div>
      <hr style="color: #cccccc"/>
    </div>
    <el-dialog title="填写甲方信息"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-form :model="hetongForm" :rules="rules" ref="hetongForm" class="demo-hetongForm">

        <div style="text-align: center;margin: 5px 10px;">输入的信息将自动填写入电子合同，确认后不可更改</div>
        <el-form-item label="" prop="company_title">
          <el-input v-model="hetongForm.company_title" placeholder="甲方公司抬头"></el-input>
        </el-form-item>
        <el-form-item label="" prop="company_address">
          <el-input type="textarea" v-model="hetongForm.company_address"  placeholder="甲方公司地址"></el-input>
        </el-form-item>
        <el-form-item label="" prop="contact">
          <el-input v-model="hetongForm.contact" placeholder="联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="contact_phone">
          <el-input v-model="hetongForm.contact_phone" placeholder="联系人电话"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="hetongForm.id?true:false" @click="submitForm('hetongForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {getOrderList,getHetong,createHetong,cancleOrder} from "@/api/service"

  export default {
    name: 'recordList',
    data() {
      return {
        orderList: [],
        hetongForm:{},
        centerDialogVisible:false,
        hetongForm:{
          company_title: '',
          company_address: '',
          contact: '',
          contact_phone: '',
          id:0,
          order_id:0,
          order_number:'',
        },
        rules: {
          company_title: [
            { required: true, message: '请输入公司抬头', trigger: 'blur' },
          ],
          company_address: [
            { required: true, message: '请输入公司地址', trigger: 'blur' },
          ],
          contact: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          ],
          contact_phone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' },
          ],

        }
      };
    },
    created() {
      this.type = this.$route.query.type
      this.GetOrderList()
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            createHetong(this.hetongForm.order_id, this.hetongForm).then(response=>{
              if(response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              }else {
                this.$notify({
                    title: "成功",
                    message: "成功生成合同",
                    type: "success",
                    duration: 2000
                });
                this.hetongForm.id = response.data.data.ht.id;
                this.hetongForm.order_number = response.data.data.ht.order_number;
              }
            });
          }
        });
      },
      openHetong(order){
        this.getHetong(order.id);
      },
      cancelOrder(order, index){
        this.$confirm('确定要取消订单号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancleOrder({id:order.id}).then(response=>{
            if (response.data.state==0) {
              this.$message.error(response.data.msg);
              return false
            }else {
              this.$notify({
                  title: "成功",
                  message: "订单已经取消",
                  type: "success",
                  duration: 2000
              });


              this.orderList[index].order_status = 3;

            }
          });
        }).catch(() => {

        });


      },
      getHetong(id){
        getHetong(id).then(response=>{
          if (response.data.state==1) {
            if (response.data.data.ht==null) {
              this.hetongForm={
                company_title: '',
                company_address: '',
                contact: '',
                contact_phone: '',
                id:0,
                order_id:id,
                order_number:'',
              };
            }else {
              this.hetongForm={
                company_title: response.data.data.ht.company_title,
                company_address: response.data.data.ht.company_address,
                contact: response.data.data.ht.contact,
                contact_phone: response.data.data.ht.contact,
                id:response.data.data.ht.id,
                order_id:response.data.data.ht.order_id,
                order_number:response.data.data.ht.order_number,
              };
            }
            this.centerDialogVisible = true;
          }else{
            this.$message.error(response.data.msg);
            return false;
          }
        }).catch(() => {
            this.$message.error("网络异常");
            return false;
        });
      },
      GetOrderList: function () {
        getOrderList().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.orderList = response.data.data.list


          }
        })
      }, formatDateTime: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      },pay:function (val) {
        this.$router.push("/payType?id="+val);
      }
    }

  }
</script>

<style scoped>
  .page-content {
    padding: 20px;
  }

  .orderDetail {
    padding: 10px;
  }

  .orderDetail .order-state {
    width: 100%;
    border-bottom: 1px solid #EEEEEE;
  }

  .orderDetail .info-table .name {
    height: 22px;
    line-height: 22px;
    margin: 30px 0 20px;
    font-size: 16px;
    color: #353535;
    display: flex;
    justify-content: space-between;
  }

  .orderDetail .info-table .name .order-id {
    font-size: 14px;
    color: #888888;
  }

  .orderDetail .info-table .order-table {
    position: relative;
  }

  .orderDetail .info-table .discount-detail {
    padding: 15px 10px;
    background: #f6f8fa;
  }

  .orderDetail .info-table .discount-detail .pay-money-wrapper {
    background: #f6f8fa;
  }

  .orderDetail .info-table .discount-detail div {
    margin: 10px 0;
  }

  .orderDetail .info-table .discount-detail .store-discount {
    display: flex;
    justify-content: flex-end;
  }

  .orderDetail .info-table .discount-detail .store-discount p {
    margin-bottom: 0;
  }

  .orderDetail .info-table .discount-detail .store-discount p:first-child {
    line-height: 36px;
  }

  .orderDetail .info-table .discount-detail .store-discount p:first-child span {
    display: inline-block;
    min-width: 190px;
    background: #eeeeee;
    border-radius: 2px;
    text-align: center;
    margin-left: 10px;
    color: #666;
    padding: 0 8px;
  }

  .orderDetail .info-table .discount-detail .store-discount p:last-child {
    line-height: 36px;
    margin-left: 50px;
    color: #888888;
  }

  .orderDetail .info-table .discount-detail .store-discount p:last-child span {
    display: inline-block;
    min-width: 25px;
  }

  .orderDetail .info-table .discount-detail .xiaoed {
    display: flex;
    justify-content: flex-end;
  }

  .orderDetail .info-table .discount-detail .xiaoed > span:last-child {
    margin-left: 50px;
    color: #888888;
    min-width: 105px;
  }

  .orderDetail .info-table .discount-detail .reduction > span:last-child {
    text-align: right;
  }

  .orderDetail .info-table .discount-detail .sale {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
  }

  .orderDetail .info-table .discount-detail .sale > span:last-child {
    margin-left: 50px;
    color: #888888;
    min-width: 105px;
    text-align: right;
  }

  .state-info {
    float: left;
  }

  .state-info .text-icon-line {
    height: 10px;
    line-height: 10px;
    height: 10px;
  }

  .state-icon {
    width: 18px;
    height: 18px;
    margin: 3px 10px 0 0;
    float: left;
  }

  .state-icon img {
    width: 100%;
    height: 100%;
    float: left;
  }

  .remark-line {
    height: 20px;
    line-height: 20px;
    padding-left: 28px;
    margin: 10px 0 20px;
    font-size: 14px;
    color: #888888;
  }

  .remark-line span {
    color: #333332;
  }

  .state-text {
    font-size: 18px;
    float: left;
    color: #ea5555;
  }

  .order-operate {
    float: right;
  }

  .price {
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #353535;
    text-align: right;
  }

  .price span {
    font-size: 20px;
    color: #FB6161;
  }

  .order-operate-btn {
    height: 36px;
    margin: 20px 0 26px;
  }

  .order-operate-btn button {
    float: left;
    display: inline-block;
    width: 90px;
    height: 36px;
    padding: 0;
    text-align: center;
    line-height: 36px;
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
    background: #fff;
    outline: medium;
    color: #666;
    border: 1px solid #e5e7eb;
  }

  .order-operate-btn button:hover {
    background: #edeeef;
  }

  /* .order-operate-btn button:first-child {
    margin-right: 20px;
  } */
  .order-operate-btn button:not(:last-child) {
    margin-right: 20px;
  }

  .cancel-btn {
    margin: 11px 0 20px;
  }

  .main-table {
    width: 100%;
    margin: 0 auto 0;
    border-bottom: 1px solid #eeeeee;
    position: relative;
  }

  .main-table .table-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 600;
    background-color: #f6f8fa;
    text-align: center;
  }

  .main-table .table-header .header-item {
    height: 40px;
    float: left;
    box-sizing: border-box;
  }

  .main-table .table-header .header-item:nth-child(1) {
    width: 33%;
  }

  .main-table .table-header .header-item:nth-child(2) {
    width: 33%;
  }

  .main-table .table-header .header-item:nth-child(3) {
    width: 33%;
  }

  .main-table .table-header .header-item:first-child {
    text-align: left;
    padding-left: 10px;
  }

  .main-table .table-header .header-item:last-child {
    text-align: right;
    padding-right: 10px;
  }

  .table-body {
    width: 100%;
    font-size: 14px;
  }

  .table-body .table-body-row {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eeeeee;
  }

  .table-body .table-body-row:last-child {
    border-bottom: none;
  }

  .table-body .table-body-row .body-item:first-child {
    text-align: left;
    padding-left: 10px;
  }

  .table-body .table-body-row .body-item:last-child {
    text-align: right;
    padding-right: 10px;
  }

  .table-body .table-body-row .body-item:nth-child(1) {
    width: 33%;
  }

  .table-body .table-body-row .body-item:nth-child(2) {
    width: 33%;
  }

  .table-body .table-body-row .body-item:nth-child(3) {
    width: 33%;
  }

  .table-body .table-body-row .body-item {
    float: left;
    box-sizing: border-box;
    text-align: center;
    position: relative;
  }

  .table-body .table-body-row .body-item i {
    font-size: 12px;
    color: #999;
    max-width: 230px;
    line-height: 15px;
    height: 60px;
    overflow: hidden;
    font-style: normal;
    display: inline-block;
    padding-top: 5px;
    margin-left: 10px;
  }

  .table-body .table-body-row .diy {
    display: flex;
  }

  .table-body .table-empty-text {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 16px;
    text-align: center;
    color: #5e7382;
  }

  .pay-money-wrapper {
    width: 100%;
    height: 68px;
  }

  .pay-money-wrapper .pay-money {
    float: right;
    width: 200px;
    height: 68px;
    line-height: 68px;
    text-align: right;
    padding-right: 10px;
    font-size: 14px;
    color: #353535;
  }

  .pay-money-wrapper .pay-money span {
    font-size: 20px;
    color: #353535;
  }

  .pay-money-wrapper .pay-money .orange {
    color: #FB6161;
  }

  .pay-money-wrapper .discount-price {
    border-bottom: 1px solid #EEEEEE;
  }

  .btnOrange {
    color: white !important;
    background: #FB6161 !important;
    border: none !important;
  }

  .btnOrange:hover {
    color: white;
    background: #ea5555;
  }

</style>
