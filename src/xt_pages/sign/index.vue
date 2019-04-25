<template>
    <div class="app-container sign-and-weigh-box">
        <el-row :gutter="20">
            <el-col :span="7">
                <div class="title">患者列表</div>
                <div style="margin-bottom: 10px;">
                    <el-input v-model="queryParams.keywords" placeholder="姓名/透析号" style="width: 180px;" @change="changeSearch"></el-input>
                    <el-select v-model="queryParams.schedule_type" style="width: 100px;" @change="changeSearch">
                        <el-option v-for="item in shiftOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </div>
                <el-table :data="patients" :class="signAndWeighBoxPatients" style="width: 100%" border highlight-current-row :header-cell-style="{ backgroundColor: 'rgb(64, 158, 255)', color:'white'}" max-height="300"  @current-change="handleCurrentChange"> 
                    <el-table-column type="index" label="序号" min-width="20" align="center"></el-table-column>
                    <el-table-column prop="name" label="姓名" min-width="50" align="center" >
                        <template slot-scope="scope">
                            {{scope.row.name}}({{scope.row.dialysis_no}})
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="状态" min-width="30" align="center" >
                        <template slot-scope="scope">
                            <span v-if="scope.row.signin.id==0">未签到</span>
                            <span v-else-if="scope.row.dialysis_order.stage==2">已经下机</span>
                            <span v-else>已签到</span>
                        </template>
                    </el-table-column>
                </el-table>
            
                <el-table :data="schedules" style="width: 100%; margin:15px 0 0 0;" border highlight-current-row :header-cell-style="{ backgroundColor: 'rgb(64, 158, 255)', color:'white'}">
                    <el-table-column prop="shift" label="班次" min-width="30" align="center"></el-table-column>
                    <el-table-column prop="arrange" label="排班" min-width="30" align="center" ></el-table-column>
                    <el-table-column prop="sign" label="签到" min-width="30" align="center" ></el-table-column>
                    <el-table-column prop="weight" label="称重" min-width="50" align="center" >
                        <template slot-scope="scope">
                            {{scope.row.before}} / {{scope.row.after}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="17">
                <div class="title">患者信息</div>

                <el-form class="information" label-position="left">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="姓 名:" label-width="50px">
                                <el-input v-model="weigh_form.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="干体重(kg):" label-width="85px">
                                <el-input v-model="weigh_form.dry_weight" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="衣物重(kg):" label-width="85px">
                                <el-input v-model="weigh_form.clothes_weight"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div class="border"></div>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="透前称重(kg):" label-width="100px">
                                <el-input v-model="weigh_form.weigh_before"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="8">
                            <el-form-item label="目标脱水(kg):" label-width="100px">
                                <el-input v-model="weigh_form.dehydrated_weight" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="脱水百分比:" label-width="90px">
                                <el-input v-model="weigh_form.dehydrated_percent" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="透前体重(kg):" label-width="100px">
                                <el-input v-model="weigh_form.weight_before" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-form-item label="T(℃):" label-width="45px">
                                <el-input v-model="weigh_form.temperature_before"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="P(次/分):" label-width="70px">
                                <el-input v-model="weigh_form.pulse_rate_before"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="R(次/分):" label-width="70px">
                                <el-input v-model="weigh_form.respiratory_rate_before"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="BP(mmHg):" label-width="80px">
                                <el-input v-model="weigh_form.DBP_before" style="width: 70px"></el-input>
                                <span> / </span>
                                <el-input v-model="weigh_form.SBP_before" style="width: 70px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div class="border"></div>
                    
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="透后称重(kg):" label-width="100px">
                                <el-input v-model="weigh_form.weigh_after" :disabled="dialysis_stege==2?false:true"></el-input> 
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="体重减少(kg):" label-width="100px">
                                <el-input v-model="weigh_form.weight_reduce_after"  :disabled="dialysis_stege==2?false:true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="透后体重(kg):" label-width="100px">
                                <el-input v-model="weigh_form.weight_after"  :disabled="dialysis_stege==2?false:true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-form-item label="T(℃):" label-width="45px">
                                <el-input v-model="weigh_form.temperature_after"  :disabled="dialysis_stege==2?false:true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="P(次/分):" label-width="70px">
                                <el-input v-model="weigh_form.pulse_rate_after"  :disabled="dialysis_stege==2?false:true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="R(次/分):" label-width="70px">
                                <el-input v-model="weigh_form.respiratory_rate_after"  :disabled="dialysis_stege==2?false:true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="BP(mmHg):" label-width="80px">
                                <el-input v-model="weigh_form.DBP_after" style="width: 70px"  :disabled="dialysis_stege==2?false:true"></el-input>
                                <span> / </span>
                                <el-input v-model="weigh_form.SBP_after" style="width: 70px"  :disabled="dialysis_stege==2?false:true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <div class="border"></div>
                    
                    <el-row :gutter="20">
                        <el-col :span="23" align="right">
                            <el-button @click="submitSign" :disabled="weigh_form.choose?false:true" type="primary">保 存</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {fetchSignPatients,getPatientSign,SignWeigh} from '@/api/signandweigh';

export default {
  name: "sign",
  data() {
    return {
        signAndWeighBoxPatients:'sign-and-weigh-box-patients',
        queryParams:{
            keywords: '',
            schedule_type: '',
            need_schedule_type:0,
        },
        querySignParams:{
            patient_id:0,
            date_time:'',
        },
        weigh_form: {
            choose:false,
            name: '',
            dry_weight: '',
            clothes_weight: '',
            // 透前
            weigh_before: '',
            dehydrated_weight: '',
            dehydrated_percent: '',
            weight_before: '',
            temperature_before: '',
            pulse_rate_before: '',  // P 脉率
            respiratory_rate_before: '', // R 呼吸频率
            DBP_before: '', // 舒张压
            SBP_before: '', // 收缩压
            // 透后
            weigh_after: '',
            weight_reduce_after: '',
            weight_after: '',
            temperature_after: '',
            pulse_rate_after: '', // P 脉率
            respiratory_rate_after: '', // R 呼吸频率
            DBP_after: '', // 舒张压
            SBP_after: '', // 收缩压
        },
        shiftOptions:[
            { value:0, label:'全部' },
            { value:1, label:'上午' },
            { value:2, label:'下午' },
            { value:3, label:'晚上' },
        ],
        schedules: [{
            type:1,
            shift: "上午",
            arrange: 0,
            sign: 0,
            before:0,
            after:0,
        }, {
            type:2,
            shift: "下午",
            arrange: 0,
            sign: 0,
            before:0,
            after:0,
        }, {
            type:3,
            shift: "晚上",
            arrange: 0,
            sign: 0,
            before:0,
            after:0,
        }],
        patients: [],
        dialysis_stege:0,
    };
  },
  methods:{
      fetchSignPatients(){
          fetchSignPatients(this.queryParams).then(response=>{
              this.patients = [];
              if (response.data.state==1) {
                  this.patients = response.data.data.patients;
                  this.queryParams.schedule_type = response.data.data.schedule_type;
                  this.querySignParams.date_time = response.data.data.today;

                  if(this.queryParams.need_schedule_type == 1) {
                      var sl = this.schedules.length;
                      for (let index = 0; index < sl; index++) {
                          if(this.schedules[index].type in response.data.data.panel) {
                                this.schedules[index].arrange = response.data.data.panel[this.schedules[index].type].schedule;
                                this.schedules[index].sign = response.data.data.panel[this.schedules[index].type].sign;
                                this.schedules[index].before = response.data.data.panel[this.schedules[index].type].before;
                                this.schedules[index].after = response.data.data.panel[this.schedules[index].type].after;
                          }
                      }
                  }

              }
          });
      },
      getPatientSign(){
          getPatientSign(this.querySignParams).then(response=>{
              if (response.data.state==1) {
                  if (response.data.data.sign != null) {
                      var sign = response.data.data.sign;
                      this.weigh_form.dry_weight = sign.dry_weight;
                      this.weigh_form.clothes_weight = sign.clothes_weight;
                        // 透前
                      this.weigh_form.weigh_before = sign.weigh_before;
                      this.weigh_form.dehydrated_weight = sign.dehydrated_weight;
                      this.weigh_form.dehydrated_percent = sign.dehydrated_percent;
                      this.weigh_form.weight_before = sign.weight_before;
                      this.weigh_form.temperature_before = sign.temperature_before;
                      this.weigh_form.pulse_rate_before = sign.pulse_rate_before;  // P 脉率
                      this.weigh_form.respiratory_rate_before = sign.respiratory_rate_before; // R 呼吸频率
                      this.weigh_form.DBP_before = sign.DBP_before; // 舒张压
                      this.weigh_form.SBP_before = sign.SBP_before // 收缩压
                        // 透后
                      this.weigh_form.weigh_after = sign.weigh_after;
                      this.weigh_form.weight_reduce_after = sign.weight_reduce_after;
                      this.weigh_form.weight_after = sign.weight_after
                      this.weigh_form.temperature_after = sign.temperature_after;
                      this.weigh_form.pulse_rate_after = sign.pulse_rate_after; // P 脉率
                      this.weigh_form.respiratory_rate_after = sign.respiratory_rate_after; // R 呼吸频率
                      this.weigh_form.DBP_after = sign.DBP_after; // 舒张压
                      this.weigh_form.SBP_after = sign.SBP_after; // 收缩压
                      this.weigh_form.id=sign.id;
                  }
              }
          });
      },
      changeSearch(){
            this.queryParams.need_schedule_type = 0;
            this.fetchSignPatients();
      },
      handleCurrentChange(row, old){
            this.weigh_form = {
            id:0,
            choose:false,
            name: '',
            dry_weight: '',
            clothes_weight: '',
            // 透前
            weigh_before: '',
            dehydrated_weight: '',
            dehydrated_percent: '',
            weight_before: '',
            temperature_before: '',
            pulse_rate_before: '',  // P 脉率
            respiratory_rate_before: '', // R 呼吸频率
            DBP_before: '', // 舒张压
            SBP_before: '', // 收缩压
            // 透后
            weigh_after: '',
            weight_reduce_after: '',
            weight_after: '',
            temperature_after: '',
            pulse_rate_after: '', // P 脉率
            respiratory_rate_after: '', // R 呼吸频率
            DBP_after: '', // 舒张压
            SBP_after: '', // 收缩压
            patient_id: 0,
        };

          this.weigh_form.choose = true;
          this.weigh_form.name = row.name;
          if (row.alias.length>0) {
              this.weigh_form.name += "("+row.alias+")";
          }
          this.weigh_form.patient_id = row.id;
          this.querySignParams.patient_id = row.id;
          this.dialysis_stege = row.dialysis_order.stage;

          if (row.signin != null) {
               this.weigh_form.dry_weight = '' + row.signin.dry_weight;
               this.weigh_form.clothes_weight = '' + row.signin.clothing_weight;
                // 透前
                this.weigh_form.weigh_before = '' + row.signin.weighing_before;
                this.weigh_form.dehydrated_weight = '' + row.signin.target_dewatering;
            
                if (this.weigh_form.dry_weight == 0) {
                    this.weigh_form.dehydrated_percent  = '';
                }else {
                    var dehydrated_percent = ((this.weigh_form.dehydrated_weight/this.weigh_form.dry_weight) * 100).toFixed(2);
                    if (isNaN(dehydrated_percent)) {
                        this.weigh_form.dehydrated_percent  = '';
                    }else {
                        this.weigh_form.dehydrated_percent  = dehydrated_percent + "%";
                    }
                }

                this.weigh_form.weight_before = '' + row.signin.weight_before;
                this.weigh_form.temperature_before = '' + row.signin.temperature_before;
                this.weigh_form.pulse_rate_before = '' + row.signin.pulse_frequency_before;
                this.weigh_form.respiratory_rate_before = '' + row.signin.breathing_rate_before;
                this.weigh_form.DBP_before = '' + row.signin.diastolic_blood_pressure_before;
                this.weigh_form.SBP_before = '' + row.signin.systolic_blood_pressure_before;

                this.weigh_form.weigh_after = '' + row.signin.weighing_after;
                this.weigh_form.weight_reduce_after = '' + row.signin.weight_loss;
                this.weigh_form.weight_after = '' + row.signin.weight_after;
                this.weigh_form.temperature_after = '' + row.signin.temperature_after;
                this.weigh_form.pulse_rate_after = '' + row.signin.pulse_frequency_after;
                this.weigh_form.respiratory_rate_after = '' + row.signin.breathing_rate_after;
                this.weigh_form.DBP_after = '' + row.signin.diastolic_blood_pressure_after;
                this.weigh_form.SBP_after = '' + row.signin.systolic_blood_pressure_after;
                this.weigh_form.id = row.signin.id;
          }

      },
      submitSign(){
          SignWeigh(this.querySignParams, this.weigh_form).then(response=>{
              if(response.data.state==1){
                this.$message({
                    type: 'success',
                    message: '成功!'
                });


                var tlen = this.patients.length;
                for (let index = 0; index < tlen; index++) {
                    if (this.patients[index].id == this.querySignParams.patient_id) {
                        var signin = this.patients[index].signin;
                        this.patients[index].signin = response.data.data.sign;

                        if (this.patients[index].schedule.id>0 && (this.patients[index].schedule.schedule_type>=1 || this.patients[index].schedule.schedule_type <= 3)) {
                            var sl = this.schedules.length;
                            for (let j = 0; j < sl; j++) {
                                if(this.schedules[j].type == this.patients[index].schedule.schedule_type) {
                                    if(this.weigh_form.id <= 0) {
                                        this.schedules[j].sign ++;
                                    }
                                    if (signin.weigh_before_time==0 && response.data.data.sign.weigh_before_time>0) {
                                        this.schedules[j].before ++;
                                    }

                                    if(signin.weigh_time==0 && response.data.data.sign.weigh_time>0) {
                                        this.schedules[j].after ++;
                                    }

                                }
                            }
                        }
                        break;
                    }
                    
                }
                this.weigh_form.id = response.data.data.sign.id;

              }else {
                this.$message.error(response.data.msg);
                return false;
              }
          });
      }

  },
  watch:{
      "weigh_form.weigh_before":function () {
          this.weigh_form.weight_before = this.weigh_form.weigh_before - this.weigh_form.clothes_weight;
          this.weigh_form.dehydrated_weight = this.weigh_form.weigh_before - this.weigh_form.dry_weight  - this.weigh_form.clothes_weight;
          this.weigh_form.weight_before += '';
          this.weigh_form.dehydrated_weight += '';

          if (this.dialysis_stege == 2) {
              this.weigh_form.weight_reduce_after = this.weigh_form.weigh_before - this.weigh_form.weigh_after;
              this.weigh_form.weight_reduce_after += '';
          }
      },
      "weigh_form.weigh_after":function () {
          if (this.dialysis_stege == 2) {
              this.weigh_form.weight_reduce_after = this.weigh_form.weigh_before - this.weigh_form.weigh_after; 
              this.weigh_form.weight_reduce_after += '';
              
              this.weigh_form.weight_after = this.weigh_form.weigh_after - this.weigh_form.clothes_weight; 
              this.weigh_form.weight_after += '';
          }
      },
      "weigh_form.clothes_weight":function () {
          this.weigh_form.weight_before = this.weigh_form.weigh_before - this.weigh_form.clothes_weight;
          this.weigh_form.dehydrated_weight = this.weigh_form.weigh_before - this.weigh_form.dry_weight  - this.weigh_form.clothes_weight;
          this.weigh_form.weight_before += '';
          this.weigh_form.dehydrated_weight += '';

          if (this.dialysis_stege == 2) {
              
              this.weigh_form.weight_after = this.weigh_form.weigh_after - this.weigh_form.clothes_weight; 
              this.weigh_form.weight_after += '';
          }
      },
      "weigh_form.dry_weight":function () {
          this.weigh_form.dehydrated_weight = this.weigh_form.weigh_before - this.weigh_form.dry_weight  - this.weigh_form.clothes_weight;
          
          this.weigh_form.dehydrated_weight += '';
      },
      "weigh_form.dehydrated_weight":function () {
          if (this.weigh_form.dry_weight == 0) {
              this.weigh_form.dehydrated_percent  = '';
          }else {
                var dehydrated_percent = ((this.weigh_form.dehydrated_weight/this.weigh_form.dry_weight) * 100).toFixed(2);
                if (isNaN(dehydrated_percent)) {
                    this.weigh_form.dehydrated_percent  = '';
                }else {
                    this.weigh_form.dehydrated_percent  = dehydrated_percent + "%";
                }
          }
          
      },
      
  },
  created(){
      this.queryParams.schedule_type = -1;
      this.queryParams.need_schedule_type = 1;
      this.fetchSignPatients();
  }
};
</script>

<style rel="stylesheet/css" lang="scss" scoped>
.information {
    border: 1px #dcdfe6 solid;
    padding: 30px 20px 30px 20px;

    .border {
        border-bottom: 1px #dcdfe6 solid;
        margin: 0px 0 20px 0;
    }
}
.title {
    background:#409eff;
    height: 44px;
    line-height: 44px;
    padding: 0 0 0 10px;
    color: #fff;
    margin: 0 0 10px 0;
    // border-radius: 4px 4px 0 0;
}

.edit_separater {
    border-top: 1px solid rgb(233, 233, 233);
    margin-top: 15px;
    margin-bottom: 15px;
}

</style>

<style>
.sign-and-weigh-box .sign-and-weigh-box-patients .cell{
    font-size: 12px;
}

.sign-and-weigh-box .sign-and-weigh-box-patients .current-row>td{
    background: #6fb5fa;
}

</style>
