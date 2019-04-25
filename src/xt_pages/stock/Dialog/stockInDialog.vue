<template>
  <el-dialog :title="propForm.title" :visible.sync="visibility" :show-close="isClose" :close-on-click-modal="isClose"
             :close-on-press-escape="isClose">

    <el-form  class="demo-form-inline" style="height: 300px"
              :rules="rules" :model="form" ref="form"
             label-width="140px">
      <el-col :span="size">
        <el-form-item label="物品类型:" prop="good_type_id">
          <el-select v-model="form.good_type_id" placeholder="请选择"     @change="goodTypeSelect"
          >
            <el-option
              v-for="item in tempGoodType"
              :key="item.id"
              :label="item.type_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>


      <el-col :span="size">
        <el-form-item label="规格名称:" prop="good_id">
          <el-select v-model="form.good_id" placeholder="请选择"  @change="goodInfoSelect">
            <el-option
              v-for="item in tempGoodInfo"

              :key="item.id"
              :label="item.specification_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="size">
        <el-form-item label="批号:" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
      </el-col>


      <el-col :span="size">
        <el-form-item label="生产日期:" prop="product_date">
          <el-date-picker v-model="form.product_date" prefix-icon="el-icon-date" :editable="false"
                          style="width: 173px;"
                          type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="size">

        <el-form-item label="有效日期:" prop="expiry_date">
          <el-date-picker v-model="form.expiry_date" prefix-icon="el-icon-date" :editable="false"
                          style="width: 173px;"
                          type="date" placeholder="选择日期时间" align="right" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>


      </el-col>


      <el-col :span="size">
        <el-form-item label="入库数量:" prop="warehousing_count">
          <el-input type="number" v-model="form.warehousing_count"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="size">
        <el-form-item label="物品单价:" prop="price">
          <el-input type="number"  v-model="form.price"></el-input>
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
    <el-button v-if="propForm.isCreated == 3" @click="cancle('form')">取 消</el-button>
    <el-button v-if="propForm.isCreated != 3 " @click="cancle('form')">取 消</el-button>
    <el-button v-if="propForm.isCreated != 3" type="primary" @click="comfirm('form')">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
  export default {
    name: "stockInDialog",
    data() {
      return {
        form:{
          good_type_id: '',
          good_id: '',
          number: '',
          product_date: '',
          expiry_date: '',
          warehousing_count: '',
          price: '',
          remark: '',
          dealer: '',
          manufacturer: '',
        },
        tempGoodType: [],
        tempGoodInfo: [],
        isClose: false,
        size: 11,
        isShow: true,
        rules: {
          good_id: [
            {required: true, message: '请选择物品类型', trigger: 'change'}
          ],
          good_type_id: [
            {required: true, message: '请选择规格名称', trigger: 'change'}
          ],
          number: [
            {required: true, message: '请输入批号', trigger: 'blur'}
          ],
          expiry_date: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          warehousing_count: [
            {required: true, message: '请选择入库数量', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请选择物品单价', trigger: 'blur'}
          ],


        }
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
      comfirm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('dialog-comfirm', this.getValue());

          }
        });
      },
      getValue: function () {
        let form = {}
        form['good_type_id'] = this.form.good_type_id
        form['good_id'] = this.form.good_id
        form['number'] = this.form.number
        form['product_date'] = this.form.product_date
        form['expiry_date'] = this.form.expiry_date
        form['warehousing_count'] = this.form.warehousing_count
        form['price'] = this.form.price
        if(this.form.remark == undefined){
          form['remark'] = ""
        }else{
          form['remark'] = this.form.remark
        }

        console.log(form['remark'])
        form['isCreated'] = this.propForm.isCreated
        for(let i = 0; i <this.propForm.goodInfo.length; i++){

          if(this.propForm.goodInfo[i].id == this.propForm.formValue.good_id){

            form['dealer'] = this.propForm.goodInfo[i].dealer
            form['manufacturer'] = this.propForm.goodInfo[i].manufacturer
          }
        }


        return form
      }, goodTypeSelect: function (id) {

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
        this.form.good_type_id = this.propForm.goodInfo[index].good_type_id
      }
    },
    watch: {
      visibility(val) {
        this.form = this.propForm.formValue
        this.tempGoodInfo = this.propForm.goodInfo
        this.tempGoodType = this.propForm.goodType
        if(!val) {
          this.form.good_type_id = ''
          this.form.good_id = ''
          this.form.number = ''
          this.form.product_date = ''
          this.form.expiry_date = ''
          this.form.warehousing_count = ''
          this.form.product_date = ''
          this.form.price = ''
          this.form.remark = ''

        }
        !val && setTimeout(() => {
          this.$refs['form'].resetFields();


        }, 0);
      }
    }
  }

</script>

<style scoped>

</style>
