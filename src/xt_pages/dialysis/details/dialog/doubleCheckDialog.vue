<template>
  <el-dialog title="双人核对"
             :visible.sync="isVisibility"

             width="50%">

    <el-form :inline="true" class="demo-form-inline" :model="doubleReview" label-width="110px">
      <el-form-item label="透析物品核查 : ">
        <el-radio v-model="doubleReview.dialysis_item_check" label="1">正确</el-radio>
        <el-radio v-model="doubleReview.dialysis_item_check" label="2">错误</el-radio>
      </el-form-item>
      <el-form-item label="差错描述 : " label-width="80px">
        <el-input v-model="doubleReview.dialysis_item_desc"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true" class="demo-form-inline" :model="doubleReview" label-width="110px">
      <el-form-item label="透析参数核查 : ">
        <el-radio v-model="doubleReview.dialysis_parameter_check" label="1">正确</el-radio>
        <el-radio v-model="doubleReview.dialysis_parameter_check" label="2">错误</el-radio>
      </el-form-item>
      <el-form-item label="差错描述 : " label-width="80px">
        <el-input v-model="doubleReview.dialysis_parameter_desc"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true" class="demo-form-inline" :model="doubleReview" label-width="110px">
      <el-form-item label="血管通路核查 : ">

        <el-radio v-model="doubleReview.vascular_access_verification" label="1">正确</el-radio>
        <el-radio v-model="doubleReview.vascular_access_verification" label="2">错误</el-radio>

      </el-form-item>
      <el-form-item label="差错描述 : " label-width="80px">
        <el-input v-model="doubleReview.vascular_access_desc"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true" class="demo-form-inline" :model="doubleReview" label-width="110px">
      <el-form-item label="管道连接核查 : ">
        <el-radio v-model="doubleReview.pipeline_connection_check" label="1">正确</el-radio>
        <el-radio v-model="doubleReview.pipeline_connection_check" label="2">错误</el-radio>
      </el-form-item>
      <el-form-item label="差错描述 : " label-width="80px">
        <el-input v-model="doubleReview.pipeline_connection_desc"></el-input>
      </el-form-item>
    </el-form>



    <el-form :inline="true" class="demo-form-inline" :model="doubleReview" label-width="110px">
      <p style="margin-left: 13px;margin-top: 10px" v-if="doubleReview.creater != 0">{{getFirstCheckDesc()}}</p>
      <p style="margin-left: 13px;margin-top: 10px" v-if="doubleReview.modifier != 0">{{getScondCheckDesc()}}</p>
    </el-form>



    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancle">取 消</el-button>
      <el-button type="primary" @click="handleComfirm">确 定</el-button>
    </div>
  </el-dialog>


</template>

<script>
  import {postDoubleCheck} from "@/api/dialysis";
  import {uParseTime} from "@/utils/tools";

  export default {
    name: "doubleCheckDialog",
    data() {
      return {
        isVisibility: false,

        isClose: false,
        doubleReview: {
          dialysis_item_check: "1",
          dialysis_parameter_check: "1",
          vascular_access_verification: "1",
          pipeline_connection_check: "1",
          dialysis_item_desc: "",
          dialysis_parameter_desc: "",
          vascular_access_desc: "",
          pipeline_connection_desc: "",
          collator: "",

          creater: 0,
          modifier: 0,
          created_time: 0,
          updated_time: 0,
        },

        record_date: ""
      };
    }, methods: {
      show() {
        this.isVisibility = true;
      },
      hide() {
        this.isVisibility = false;
      },
      handleCancle: function () {
        this.isVisibility = false;

      }, handleComfirm: function () {

        if (this.patient.id <= 0) {
          this.$message.error("没有选择患者")
          return
        }

        let ParamsQuery = this.doubleReview;
        ParamsQuery["patient"] = this.patient.id;
        ParamsQuery["record_date"] = this.record_date;
        postDoubleCheck(ParamsQuery).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.$notify({
              title: "成功",
              message: "提交成功",
              type: "success",
              duration: 2000
            });
            this.doubleReview.created_time =   response.data.data.doubleCheck.created_time
            this.doubleReview.creater =  response.data.data.doubleCheck.creater
            this.doubleReview.updated_time =  response.data.data.doubleCheck.updated_time
            this.doubleReview.modifier =   response.data.data.doubleCheck.modifier


            let doublecheck_resp = response.data.data.doubleCheck;
            var doubleCheck = this.double_check;
            for (var index in doublecheck_resp) {
              // doubleCheck[index] = doublecheck_resp[index];
              this.$set(doubleCheck, index, doublecheck_resp[index])
            }
            this.hide()
          }
        });

      }, getFirstCheckDesc: function () {
        let time = uParseTime(this.doubleReview.created_time, "{y}-{m}-{d}  {h}:{i}")
        if (this.doubleReview.creater <= 0) {
          return "";
        }

        var desc = "";
        if (this.admin_users == null || typeof this.admin_users == "undefined") {
          return "";
        }

        var leng = this.admin_users.length;
        if (leng == 0) {
          return "";
        }

        for (let index = 0; index < leng; index++) {
          if (this.admin_users[index].id == this.doubleReview.creater) {
            let name = this.admin_users[index].name;
            desc = "首次核对人员:"+name +"  首次核对时间:"+time
            break;
          }
        }
        return desc;

      }, getScondCheckDesc: function () {

        let time = uParseTime(this.doubleReview.updated_time, "{y}-{m}-{d} {h}:{i}")
        if (this.doubleReview.modifier <= 0) {
          return "";
        }
        var desc = "";
        if (this.admin_users == null || typeof this.admin_users.length == "undefined") {
          return desc;
        }
        var leng = this.admin_users.length;
        if (leng == 0) {
          return desc;
        }
        for (let index = 0; index < leng; index++) {
          if (this.admin_users[index].id == this.doubleReview.modifier) {
            let name = this.admin_users[index].name;
            desc = "第二次核对人员:"+name +"  第二次核对时间:"+time
            break;
          }
        }
        return desc;

      }


    },
    props: {
      admin_users: { //系统用户列表
        type: Array,
        default: () => {
          return []
        }
      },

      double_check: { // 双人核对
        type: Object,
        default: () => {
          return {id: 0}
        }
      },
      patient: { // 患者信息
        type: Object,
        default: () => {
          return {id: 0}
        }
      },

    },
    watch: {
      isVisibility(val) {

      }, "double_check.id": function () {
        if (this.double_check.id > 0) {
          for (var index in this.doubleReview) {
            this.doubleReview[index] = this.double_check[index] + "";
          }
          this.doubleReview.created_time =   this.double_check['created_time']
          this.doubleReview.creater =  this.double_check['creater']
          this.doubleReview.updated_time =  this.double_check['updated_time']
          this.doubleReview.modifier =   this.double_check['modifier']


          console.log( this.doubleReview)



        } else {
          this.dialysis_item_check = "1"
          this.dialysis_parameter_check = "1"
          this.vascular_access_verification = "1"
          this.pipeline_connection_check = "1"

        }
      },

    },
    created() {
      var date = this.$route.query && this.$route.query.date;
      this.record_date = uParseTime(date, '{y}-{m}-{d}');
    },

  }
</script>

<style scoped>

</style>
