<template>
    <div class="table-content">
        <div class="table-head clearfix">
                <a class="btnMid btnBlue" @click="openPiao" href="javascript:void(0)" style="width: 160px;">开具已勾选服务发票</a>
                <!-- <span >当前页面不展示老版本（包括成长版、专业版、老版本流量充值）订单，如需开具上述发票请点击此链接：</span>
                <a class="jbfp" href="" target="_blank" style="">开具老版本发票</a> -->
        </div>
        <el-table
            ref="multipleTable"
            :data="invoiceList"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            align="center"
            min-width="55">
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
    </div>
</template>


<script>
import {GetNoInvOrders} from '@/api/invoice';
import {uParseTime} from "@/utils/tools";
export default {
  name: "InvoiceList",
   data() {
      return {
        invoiceList: [],
        multipleSelection: []
      }
    },

    methods: {
      uParseTime(time, format) {
          return uParseTime(time, format);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      openPiao() {
        var mlen = this.multipleSelection.length;
        if(mlen==0) {
          this.$message.error("请先选择要开票的服务订单。");
          return false;
        }
        var idArr = [];
        for (let index = 0; index < mlen; index++) {
          idArr.push(this.multipleSelection[index].id);
        }
        idArr = idArr.join(",");
        this.$router.push('/service/invoice/apply?orders='+idArr);
        return false;
      },
      GetNoInvOrders() {
        GetNoInvOrders().then(response=>{
          this.invoiceList = [];
          if (response.data.state==1) {
            this.invoiceList = response.data.data.orders;
          }
        });
      },
      initData(){
        this.GetNoInvOrders();
      }
    }
};
</script>

<style  scoped>
.table-content {
  margin-top: 10px;
  font-size: 14px;
}
.table-head{
    margin-bottom: 20px;
}
.table-head span {
  margin-left: 20px;
  color: #999;
}
.table-head .jbfp {
  color: #2a75ed;
}
.btnMid {
  display: inline-block;
  width: 90px;
  height: 36px;
  padding: 0;
  text-align: center;
  line-height: 36px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
}
.btnBlue {
  color: #fff;
  background: #2a75ed;
  border: none;
}
a:active,
a:focus,
a:hover,
a:visited {
  color: #fff;
  outline: 0;
}
.btnBlue:focus,
.btnBlue:visited {
  color: #fff;
}
</style>

