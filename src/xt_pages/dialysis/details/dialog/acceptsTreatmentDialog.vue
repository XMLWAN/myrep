<template>
  <el-dialog title="接诊评估"
             :visible.sync="isVisibility"

             width="50%">
    <el-form :model="receiveTreatmentAsses" label-width="80px">
      <el-form-item label="入室方式 : ">

        <el-radio v-model="receiveTreatmentAsses.way" label="1">步行</el-radio>
        <el-radio v-model="receiveTreatmentAsses.way" label="2">扶行</el-radio>
        <el-radio v-model="receiveTreatmentAsses.way" label="3">轮椅</el-radio>
        <el-radio v-model="receiveTreatmentAsses.way" label="4">平车</el-radio>
      </el-form-item>
      <el-form-item label="病人意识 : ">

        <el-radio v-model="receiveTreatmentAsses.consciousness" label="1">清醒</el-radio>
        <el-radio v-model="receiveTreatmentAsses.consciousness" label="2">嗜睡</el-radio>
        <el-radio v-model="receiveTreatmentAsses.consciousness" label="3">昏迷</el-radio>

      </el-form-item>
      <el-form-item label="病人食欲 : ">
        <el-radio v-model="receiveTreatmentAsses.appetite" label="1">正常</el-radio>
        <el-radio v-model="receiveTreatmentAsses.appetite" label="2">减退</el-radio>
        <el-radio v-model="receiveTreatmentAsses.appetite" label="3">恶心</el-radio>
        <el-radio v-model="receiveTreatmentAsses.appetite" label="4">呕吐</el-radio>
        <el-radio v-model="receiveTreatmentAsses.appetite" label="5">腹泻</el-radio>
      </el-form-item>
      <el-form-item label="病人情况 : ">
        <el-radio v-model="receiveTreatmentAsses.condition" label="1">住院</el-radio>
        <el-radio v-model="receiveTreatmentAsses.condition" label="2">门诊</el-radio>
        <el-radio v-model="receiveTreatmentAsses.condition" label="3">手术期</el-radio>
      </el-form-item>
      <el-form-item label="体位 : ">
        <el-radio v-model="receiveTreatmentAsses.posture" label="1">自动体位</el-radio>
        <el-radio v-model="receiveTreatmentAsses.posture" label="2">平卧位</el-radio>
        <el-radio v-model="receiveTreatmentAsses.posture" label="3">半卧位</el-radio>
        <el-radio v-model="receiveTreatmentAsses.posture" label="4">端坐位</el-radio>
        <el-radio v-model="receiveTreatmentAsses.posture" label="5">躁动不安</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancle">取 消</el-button>
      <el-button type="primary" @click="handleComfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {postAccepts} from "@/api/dialysis";
  import {uParseTime} from "@/utils/tools";

  export default {
    name: "acceptsTreatmentDialog",
    data() {
      return {
        isVisibility:false,
        record_date:'',
        receiveTreatmentAsses: {
          way: "1",
          consciousness: "1",
          appetite: "1",
          condition: "1",
          posture: "1",
        },
      };
    },
    methods:{
      show() {
        this.isVisibility = true;
      },
      hide() {
        this.isVisibility = false;
      },
      handleCancle:function () {
        this.isVisibility = false;

      },
      handleComfirm:function () {
        let ParamsQuery = this.receiveTreatmentAsses;
        ParamsQuery["patient"] = this.patient.id;
        ParamsQuery["record_date"] = this.record_date;
        postAccepts(ParamsQuery).then(response => {
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

            let receive_treatment_asses_resp = response.data.data.receiveTreatmentAsses;
            //prop
            var receiver_treatment_access = this.receiver_treatment_access;
            for( var index in receive_treatment_asses_resp) {
              // receiver_treatment_access[index] = receive_treatment_asses_resp[index];
              this.$set(receiver_treatment_access, index, receive_treatment_asses_resp[index])
            }
            this.hide()
          }
        });

      }
    },
    props: {
      receiver_treatment_access : { // 双人核对
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
    }, watch: {
      isVisibility(val) {

      },
      "receiver_treatment_access.id": function () {
        if (this.receiver_treatment_access.id > 0) {
          for (var index in this.receiveTreatmentAsses) {
            this.receiveTreatmentAsses[index] = this.receiver_treatment_access[index] + "";
          }
        }
      },
    }, created() {
      var date = this.$route.query && this.$route.query.date;
      this.record_date = uParseTime(date, '{y}-{m}-{d}');
    },

  }
</script>

<style scoped>

</style>
