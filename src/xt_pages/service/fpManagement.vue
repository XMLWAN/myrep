<template>
    <div class="content">
        <p class="help">
            温馨提示：如信息无误，我们会在10个工作日内完成开具与邮寄，请耐心等待。       
        </p>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="待开票" name="invoice-list">
               <invoice-list ref="invoiceList"></invoice-list>
            </el-tab-pane>
            <el-tab-pane label="开票记录" name="records-table">
               <records-table ref="recordsTable"></records-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import InvoiceList from "./components/invoiceList";
import RecordsTable from "./components/recordsTable";
export default {
    name:'FpManagement',
    components: {
        InvoiceList,
        RecordsTable
    },
    data() {
      return {
        activeName: 'invoice-list'
      };
    },
    methods: {
        initData() {
            switch (this.activeName) {
                case "invoice-list":
                    this.$refs.invoiceList.initData();
                    break;
            
                default:
                    this.$refs.recordsTable.initData();
                    break;
            }
        },
        handleClick(tab, event) {
            this.initData();
        }
    },
    mounted(){
        this.initData();
    }
  };

</script>

<style scoped>

</style>

