<template>
  <el-dialog :title="titles" :visible.sync="visibility" :show-close="isClose" :close-on-click-modal="isClose"
             :close-on-press-escape="isClose">

    <el-form class="demo-form-inline" style="height: 300px"
             :rules="rules" :model="form" ref="form"
             label-width="140px">
      <el-col :span="size">
        <el-form-item label="物品类型:" prop="good_id">
          <el-select v-model="form.good_id" placeholder="请选择"
          >
            <el-option
              v-for="item in form.goodType"
              :key="item.id"
              :label="item.type_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="size">
        <el-form-item label="规格名称:" prop="specification_name">
          <el-input v-model="form.specification_name"></el-input>
        </el-form-item>
      </el-col>


      <el-col :span="size">
        <el-form-item label="单位:" prop="good_unit">

          <el-select v-model="good_unit" @change="changeSelected" placeholder="请选择">
            <el-option
              v-for="item in form.goodUnit"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>
      </el-col>

      <el-col :span="size">
        <el-form-item label="生产厂家:" prop="dealer">
          <el-select v-model="form.manufacturer" placeholder="请选择">
            <el-option
              v-for="item in form.manufacturers"
              :key="item.id"
              :label="item.manufacturer_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="size">
        <el-form-item label="经销商:" prop="manufacturer">
          <el-select v-model="form.dealer" placeholder="请选择">
            <el-option
              v-for="item in form.dealers"
              :key="item.id"
              :label="item.dealer_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>


      <el-col :span="size">
        <el-form-item label="进货价:" prop="buy_price">
          <el-input type="number" v-model="form.buy_price"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="size">
        <el-form-item label="出货价:" prop="sell_price">
          <el-input type="number" v-model="form.sell_price"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="size">
        <el-form-item label="有效期预警天数:" prop="expiry_date_warn_day_count">
          <el-input type="number" v-model="form.expiry_date_warn_day_count"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="size">
        <el-form-item label="库存预警数量:" prop="stock_warn_count">
          <el-input type="number" v-model="form.stock_warn_count"></el-input>
        </el-form-item>
      </el-col>


      <el-col :span="size">
        <el-form-item label="是否可复用:" prop="is_reuse">
          <el-radio v-model="form.is_reuse" label="1">可以</el-radio>
          <el-radio v-model="form.is_reuse" label="2">不可以</el-radio>
        </el-form-item>
      </el-col>


      <el-col>
        <el-form-item label="备注 : " prop="remark">
          <el-input type="textarea" :row="5" v-model="form.remark"
                    placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-col>

    </el-form>


    <span slot="footer" class="dialog-footer">
    <el-button v-if="isCreated == 3" @click="cancle('form')">取 消</el-button>
    <el-button v-if="isCreated != 3 " @click="cancle('form')">取 消</el-button>
    <el-button v-if="isCreated != 3" type="primary" @click="comfirm('form')">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>


  export default {
    name: "goodInfoDailog",
    data() {
      return {
        good_unit: '',
        isClose: false,
        size: 11,
        form: {
          good_id: '',
          specification_name: '',
          buy_price: '',
          sell_price: '',
          remark: '',
          manufacturer: '',
          dealer: '',
          expiry_date_warn_day_count: '',
          stock_warn_count: '',
          is_reuse: '2',
        },

        rules: {
          specification_name: [
            {required: true, message: '请输入规格名称', trigger: 'blur'},
          ],
          good_id: [
            {required: true, message: '请选择物品类型', trigger: 'change'}
          ]

        }
      }
    },
    props: {
      visibility: {
        type: Boolean,
        default: false
      },
      titles: {
        type: String,
        default: "",
      },
      formValue: {
        type: Object
      },
      isCreated: {
        type: Number,
        default: 1,

      }

    },
    methods: {
      cancle: function (formName) {

        this.$emit('dialog-cancle', this.getValue());

      },
      comfirm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('dialog-comfirm', this.getValue());
          }
        });
      },
      getValue: function () {
        let form = {}
        form['specification_name'] = this.form.specification_name
        form['good_unit'] = this.good_unit
        form['buy_price'] = this.form.buy_price
        form['sell_price'] = this.form.sell_price
        form['remark'] = this.form.remark
        form['manufacturer'] = this.form.manufacturer
        form['dealer'] = this.form.dealer
        form['expiry_date_warn_day_count'] = this.form.expiry_date_warn_day_count
        form['stock_warn_count'] = this.form.stock_warn_count
        form['is_reuse'] = this.form.is_reuse
        form['isCreated'] = this.isCreated
        form['good_id'] = this.form.good_id
        return form
      }, changeSelected: function (val) {

        console.log(val)
      }
    },
    watch: {
      visibility(val) {

        this.form = this.formValue
        this.good_unit = this.formValue.good_unit
        if(this.isCreated == 1){
          this.good_unit = ''
        }
      }
    }
  }

</script>

<style scoped>

</style>
