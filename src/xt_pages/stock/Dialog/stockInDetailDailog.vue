<template>
  <el-dialog :title="propForm.title" :visible.sync="visibility" :show-close="isClose" :close-on-click-modal="isClose"
             :close-on-press-escape="isClose">

    <el-table :data="propForm.stockInData" style="width: 100%" border
              highlight-current-row
              @row-click="onRowClick"
              :row-class-name="tableRowClassName"
              highlight-current-row
              v-loading="Warehouse.loading"
    >
      <el-table-column label="入库单号" min-width="40" align="center">
        <template slot-scope="scope">
          {{}}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" min-width="40" align="center">
        <template slot-scope="scope">
          {{}}
        </template>
      </el-table-column>
      <el-table-column label="物品批号" align="center" min-width="30">
        <template slot-scope="scope">
          {{}}
        </template>
      </el-table-column>

      <el-table-column label="入库数量" align="center" min-width="30">
        <template slot-scope="scope">
          {{}}
        </template>
      </el-table-column>

      <el-table-column label="库存数量" align="center" min-width="30">
        <template slot-scope="scope">
          {{}}
        </template>
      </el-table-column>

    </el-table>


    <span slot="footer" class="dialog-footer">
    <el-button  @click="cancle('formValue')">取 消</el-button>
  </span>
  </el-dialog>

</template>

<script>
  export default {
    name: "stockInDialog",
    data() {
      return {
        tempGoodType: [],
        tempGoodInfo: [],
        isClose: false,
        size: 11,
        isShow: true,
      }
    },
    props: {
      propForm: {
        type: Object
      },
      visibility: {
        type: Boolean,
        default: false
      },

    },
    methods: {
      cancle: function (formName) {
        this.$emit('dialog-cancle', this.getValue());
        this.$refs[formName].resetFields();
      },
      goodTypeSelect: function (id) {
        this.propForm.formValue.good_id = ''

        this.tempGoodInfo = []
        for (let i = 0; i < this.propForm.goodInfo.length; i++) {
          if (this.propForm.goodInfo[i].good_type_id == id) {
            this.tempGoodInfo.push(this.propForm.goodInfo[i])
          }
        }
      }, goodInfoSelect: function (id) {
        let index = 0;
        for (let i = 0; i < this.propForm.goodInfo.length; i++) {
          if (this.propForm.goodInfo[i].id == id) {
            index = i
          }
        }
        this.propForm.formValue.good_type_id = this.propForm.goodInfo[index].good_type_id
      }
    },
    watch: {
      visibility(val) {
        console.log(this.propForm.isCreated)
        this.tempGoodInfo = this.propForm.goodInfo
        this.tempGoodType = this.propForm.goodType
        !val && setTimeout(() => {
          this.$refs['formValue'].resetFields();


        }, 0);
      }
    }
  }

</script>

<style scoped>

</style>
