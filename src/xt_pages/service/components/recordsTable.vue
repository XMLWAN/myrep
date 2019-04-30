<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="invoiceList"
            border
            tooltip-effect="dark"
            style="width: 100%"
            >
            <el-table-column
            label="申请时间"
            align="center"            
            min-width="120"
            prop="created_time">
            </el-table-column>
            <el-table-column
            prop="invoice_title"
            label="发票抬头"
            align="center"            
            min-width="120">
            </el-table-column>
            <el-table-column
            prop="invoice_type"
            align="center"              
            label="发票类型"
            min-width="120"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="invoice_amount_gross"
            align="center"              
            label="金额（元）"
            min-width="120"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="recipient"
            align="center"              
            label="联系人"
            min-width="120"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="contact_phone"
            align="center"              
            label="电话"
            min-width="120"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="invoice_status"
            align="center"              
            label="状态"
            min-width="120"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.invoice_status==1">申请</span>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {GetInvoices} from '@/api/invoice';
export default {
  name: "RecordsTable",
  data() {
    return {
      invoiceList: [],
    };
  },
  methods: {
      GetInvoices() {
        GetInvoices().then(response=>{
          this.invoiceList = [];
          if (response.data.state==1) {
            this.invoiceList = response.data.data.invoices;
          }
        });
      },
      initData(){
        this.GetInvoices();
      }
  }
};
</script>

<style scoped>
</style>
