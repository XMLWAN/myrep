<template>
    <div class="app-container">
       <div class="service-box">
         <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的服务" name="first">
            </el-tab-pane>
            <el-tab-pane label="服务订购" name="second">
            </el-tab-pane>
            <el-tab-pane label="订购记录" name="third">订购记录</el-tab-pane>
            <el-tab-pane label="发票管理" name="invoice">
                <div class="invoice-apply" v-if="showApply">
                    <div class="apply-title">发票申请信息</div>
                    <p class="apply-p">亲爱的用户：</p>
                    <p class="apply-p">感谢使用我们的服务</p>
                    <br/>
                    <p class="apply-p2" >1、请仔细确认开票信息，一经确认，开票信息将无法修改，因客户原因导致发票信息有误，将无法重开；</p>
                    <p class="apply-p2" >2、发票将以纸质发票的形式，于申请后的10个工作日内寄出。</p>
                   

                    <el-form :model="invoiceForm" :rules="rules" ref="invoiceForm" label-width="100px" class="invoice-form" label-position="left">
                        
                        <el-form-item label="发票类型" prop="invoice_type">
                            <el-radio-group v-model="invoiceForm.invoice_type" :disabled="canApply?false:true" >
                            <el-radio v-for="item in [{id:1, name:'专票'}]" :key="item.id" :label="item.id">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <p class="item-title">基本信息</p>

                        <el-form-item label="发票抬头" prop="invoice_title">
                            <el-input v-model="invoiceForm.invoice_title" :disabled="canApply?false:true" ></el-input>
                        </el-form-item>
                        
                        <el-form-item label="发票金额" prop="invoice_amount_gross">
                            <el-col class="line" :span="12">
                                <el-input placeholder="请输入内容" v-model="invoiceForm.invoice_amount_gross" readonly :disabled="canApply?false:true" >
                                    <el-button slot="prepend" >总计</el-button>
                                    <el-button slot="append">元</el-button>
                                </el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="primary" @click="showDe">明细</el-button>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="收件人" prop="recipient">
                            <el-input v-model="invoiceForm.recipient" :disabled="canApply?false:true" ></el-input>
                        </el-form-item>

                        <el-form-item label="联系电话" prop="contact_phone">
                            <el-input v-model="invoiceForm.contact_phone" :disabled="canApply?false:true" ></el-input>
                        </el-form-item>

                        <el-form-item label="地址" prop="address">
                            <el-input v-model="invoiceForm.address" :disabled="canApply?false:true" ></el-input>
                        </el-form-item>

                        <el-form-item label="纳税识别号" prop="tax_identification_number">
                            <el-input v-model="invoiceForm.tax_identification_number" :disabled="canApply?false:true" ></el-input>
                        </el-form-item>

                        <p class="item-title">其他信息</p>
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="invoiceForm.remark" :disabled="canApply?false:true" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button :disabled="canApply?false:true" type="primary" @click="submitForm('invoiceForm')">申请发票</el-button>
                            <span style="color:red" v-if="canInfo && !canApply">{{canInfo}}</span>
                        </el-form-item>
                   </el-form>
                </div>
                <div class="invoice-apply" v-else>
                    <div class="apply-title">{{noInvoiceInfo}}</div>
                </div>
            </el-tab-pane>
         </el-tabs>
        </div>
        <el-dialog title="明细（显示可申请发票的订单）" :visible.sync="dialogTableVisible">
            
            <el-table
                :data="orderlist"
                border
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                label="ID"
                align="center"
                prop="id">
                </el-table-column>
                <el-table-column
                label="购买服务"
                align="center"            
                min-width="120"
                prop="serve_name">
                </el-table-column>
                <el-table-column
                prop="serve_duration"
                label="服务时长"
                align="center"            
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="created_time"
                align="center"              
                label="消费时间"
                min-width="120"
                show-overflow-tooltip>
                <template slot-scope="scope">{{uParseTime(scope.row.created_time, '{y}-{m}-{d}')}}</template>
                </el-table-column>
                <el-table-column
                prop="pay_type"
                align="center"              
                label="支付方式"
                min-width="120"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.pay_type==1">微信</span>
                    <span v-else-if="scope.row.pay_type==2">对公转账</span>
                    <span v-else>其他</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="payable_amount"
                align="center"              
                label="金额"
                min-width="120"
                show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.payable_amount}}元</template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import {GetApplies,ApplyInvoice} from '@/api/invoice';
import {uParseTime} from "@/utils/tools";


export default {
  name: "invoiceApply",
  data() {
    return {
      activeName: "invoice",
      orders: '',
      showApply:true,
      noInvoiceInfo:"",
      canApply:false,
      canInfo:"",
      orderlist:[],
      invoice:{},
      dialogTableVisible:false,

      invoiceForm: {
          orders:'',
          invoice_type: 1,
          invoice_title: '',
          invoice_amount_gross: '',
          recipient: '',
          contact_phone: '',
          address: '',
          tax_identification_number: '',
          remark: ''
        },
        rules: {
          invoice_type: [
            { required: true, message: '请选择类型', trigger: 'blur' },
          ],
          invoice_title: [
            { required: true, message: '请填写发票抬头', trigger: 'blur' },
          ],
          invoice_amount_gross: [
            { required: true, message: '请填写发票金额', trigger: 'blur' }
          ],
          recipient: [
            { required: true, message: '请填写收件人', trigger: 'blur' }
          ],
          contact_phone: [
            { required: true, message: '请填写联系电话', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请填写地址', trigger: 'blur' }
          ],
          tax_identification_number: [
            { required: true, message: '请填写纳税识别号', trigger: 'blur' }
          ],
        }
    };
  },
  methods: {
      showDe(){
          this.dialogTableVisible = true;
      },
      uParseTime(time, format) {
          return uParseTime(time, format);
      },
    handleClick(tab, event) {
      switch (this.activeName) {
        case "invoice":
          this.$router.push("/service/invoice");
          break;
      
        case "first":
          this.$router.push("/service");
          break;
      
        case "second":
          this.$router.push("/service?second");
          break;
      
        case "third":
          this.$router.push("/service?third");
          break;
      }
    },
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.invoiceForm.invoice_amount_gross = parseFloat(this.invoiceForm.invoice_amount_gross);
            ApplyInvoice(this.orders, this.invoiceForm).then(response=>{
                if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                }else {
                    this.$notify({
                        title: "成功",
                        message: "成功申请发票",
                        type: "success",
                        duration: 2000
                    });
                    this.$router.push("/service/invoice");
                    return false;
                }
            })
          } 
        });
    },
    GetApplies(orders){
        GetApplies(orders).then(response=>{
            if (response.data.state==0) {
                this.showApply = false;
                this.noInvoiceInfo = "数据异常";
                return false;
            }else {
                var data = response.data.data;
                if (data.nos.length==0) {
                    this.showApply = false;
                    this.noInvoiceInfo = "无法开票，所选择的订单可能存在：订单未支付、订单不存在、已开票";
                    return false;
                }
                this.orderlist = data.nos;
                var payable_amount = 0;
                this.orders = [];
                for (let index = 0; index < data.nos.length; index++) {
                    payable_amount += data.nos[index].payable_amount;
                    this.orders.push(data.nos[index].id);
                }

                this.orders = this.orders.join(',');
                this.invoiceForm = {
                    orders:this.orders,
                    invoice_type: 1,
                    invoice_title: "",
                    invoice_amount_gross: "" + payable_amount,
                    recipient: "",
                    contact_phone: "",
                    address: "",
                    tax_identification_number: "",
                    remark: ""
                };
                this.showApply = true;
                this.noInvoiceInfo = "";
                this.canApply = true;
                this.canInfo = "";
                return false;
            }
        })
    }
  },
  created(){
    this.orders = this.$route.query && this.$route.query.orders;
    var reg = /^(\d+[,])*(\d+)$/;

    if (this.orders.length == 0 || !reg.test(this.orders)) {
        this.showApply = false;
        this.noInvoiceInfo = "请先选择对应订单";
    }else {
        
        this.GetApplies(this.orders);
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
  .invoice-apply{
    padding: 5px 50px;
    .apply-p {
        font-size: 14px;
        color: #5e6d82;
        line-height: 1em;
    }
    .apply-p2 {
        font-size: 14px;
        color: #5e6d82;
        line-height: 0.5em;
    }
    .apply-title {
        font-size:20px;
        font-weight: 600;
        text-align: center;
        margin: 10px 0;
    }
    .invoice-form {
        margin-top: 50px;   
        .item-title{
            font-size: 14px;
            font-weight: 600;
            border-left: 5px solid #409EFF;
            padding-left: 10px;
            margin-bottom: 20px;
        }
    }
  }
}
</style>

