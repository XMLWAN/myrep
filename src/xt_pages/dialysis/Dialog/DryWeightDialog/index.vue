<template>
  <el-dialog :show-close="isClose" :close-on-click-modal="isClose" :close-on-press-escape="isClose" :title="titles" :visible.sync="visibility" >
    <el-form label-width="80px">
    <el-form-item label="干体重">
      <el-input style="width: 200px" v-model="AdjustWeight.weight" ></el-input>
    </el-form-item>

    <!--<el-form-item label="医生">-->
      <!--&lt;!&ndash;<el-select v-model="AdjustWeight.doctor" placeholder="请选择">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-option v-for="(item, index) in doctorList" :label="item.name"&ndash;&gt;-->
                   <!--&lt;!&ndash;:value="item.id" :key="item.id"></el-option>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
    <!--</el-form-item>-->
    <el-form-item label="备注">
      <el-input style="width: 200px" v-model="AdjustWeight.remark"  ></el-input>
    </el-form-item>

    <label>近6次干体重调整记录</label>
    <el-table :data="weightList" style="width: 100%;margin:30px 0 0 0;"
              border highlight-current-row
              :header-cell-style="{ backgroundColor: 'rgb(64, 158, 255)',color:'white' }">
      <el-table-column prop="date" label="日期" min-width="30" align="center">
        <template slot-scope="scope">
          <span >{{scope.row.created_time | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="干体重" min-width="30" align="center"></el-table-column>
      <el-table-column prop="doctor" label="医生" min-width="30" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" min-width="50" align="center"></el-table-column>
    </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancle">取 消</el-button>
    <el-button type="primary" @click="comfirm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'DryWeightDialog',
    props:{
      visibility: {
        type: Boolean,
        default: false
      },
      titles: {
        type: String,
        default: "",
      },
      doctorList: {
        type: Array,
        default() {
          return []
        }
      },
      weightList: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        AdjustWeight:{
          weight:"",
          doctor:"",
          remark:"",
        },
        isClose: false

      }
    },
    methods: {
      comfirm:function() {
        let returnValue = {

        }
        returnValue['value'] = this.getValue()
        returnValue['title'] = this.titles
        this.$emit('dialog-comfirm', returnValue);
      },
      cancle:function () {
        this.$emit('dialog-cancle', this.titles);
      },

      getValue:function () {
        return this.AdjustWeight
      }


    },
    computed:{
      doctorName:function () {


      }

    }
  }
</script>

