<template>
  <div class="app-container " >
    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="$router.push('/patients/patient/'+patientID+'/edit')" style="float:right;margin:0 0 6px 0;z-index:1;">修改</el-button>
    <el-button type="primary" @click="printThisInfo()" style="float:right;margin:0 6px 6px 0;z-index:1;">打印</el-button>
    <el-form ref="form" :rules="rules" :model="form" label-width="134px" class="clearfix" id="patient-info" >
      <div class="dataTitle">一般资料</div>
      <el-row >
        <el-col :span="4" align="center">
          <img width="100%" height="100%" v-if="form.avatar" :src="form.avatar" class="avatar">
          <el-form-item prop="avatar">
            <el-input v-model="form.avatar"  type="hidden" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" >
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="姓名 : "  class="is-required" prop="name" >
                  <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="性别 : " class="is-required" prop="gender" >
                  <el-radio-group v-model="form.gender">
                    <el-radio v-for="item in sexOptions" :key="item.value" :label="item.value" :value="item.value" disabled>{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号 : "  class="is-required" prop="idCardNo" >
                  <el-input v-model="form.idCardNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="透析号 : " class="is-required">
                  <el-input disabled v-model="form.dialysisNo" placeholder="填写或自动生成" style="width:110px;float:left;margin-right: 1%;" ></el-input> 
                  <el-button disabled type="primary">自动生成</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期 : "  class="is-required" prop="birth" >
                  <el-date-picker v-model="form.birth" type="date" disabled placeholder="选择日期" :suffix-icon="'el-icon-menu'" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col> 
            <el-col :span="8">
              <el-form-item label="本人电话: " class="is-required" prop="phone">
                <el-input v-model="form.phone" maxlength="20" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="家属电话: " prop="homeTelephone">
                <el-input v-model="form.homeTelephone" maxlength="20" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="患者来源 : " class="is-required" prop="source" >
                <el-radio-group v-model="form.source">
                  <el-radio v-for="item in sourceOptions" :key="item.value" :label="item.value" :value="item.value" disabled>{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="民族 : " prop="nation">
                <el-input v-model="form.nation" maxlength="30" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="籍贯 : " prop="native_place">
                <el-input v-model="form.native_place" maxlength="30" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="家庭住址 : " prop="homeAddress">
                <el-input v-model="form.homeAddress" disabled></el-input>
              </el-form-item>
            </el-col>
            
            <div v-show="!generic_info_fold">
            <el-col :span="8" >
              <el-form-item label="别名 : "  prop="alias" >
                  <el-input v-model="form.alias" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身高(cm) : "  prop="height">
                <el-input maxlength="5" v-model="form.height" disabled ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="婚姻状况 : " prop="maritalStatus">
                  <el-select v-model="form.maritalStatus"  placeholder="请选择婚姻状况" disabled>
                    <el-option v-for="item in maritalOptions" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="子女情况 : " style="width:80%;float:left;"  prop="children">
                  <el-input maxlength="5" v-model="form.children" disabled></el-input>              
                </el-form-item>
                <el-form-item label="孩 " style="width:20%;float:left;" label-width="50px">
                </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="住院(门诊)号 : " prop="admissionNumber" >
                  <el-input v-model="form.admissionNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="医保类型 : " prop="reimbursementWayID">
                  <el-select v-model="form.reimbursementWayID" disabled >
                    <el-option v-for="item in wayOptions" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医保号 : " prop="healthCareNo">
                <el-input v-model="form.healthCareNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="教育程度 : "  prop="educationOptions">
                <el-select v-model="form.education" disabled >
                  <el-option v-for="item in educationOptions" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" >
              <el-form-item label="亲友电话: " prop="relative_phone">
                <el-input v-model="form.relative_phone" maxlength="20" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" >
              <el-form-item label="亲友关系: " prop="relative_relations">
                <el-input v-model="form.relative_relations" maxlength="20" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职业 : "  prop="profession">
                <el-select v-model="form.profession" disabled >
                  <el-option v-for="item in professionOptions" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="工作单位 : " prop="work">
                <el-input v-model="form.work" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20" >
              <el-form-item label="单位地址 : " prop="unit_address">
                <el-input v-model="form.unit_address" disabled></el-input>
              </el-form-item>
            </el-col>
            </div>
            <el-col :span="24">
              <el-form-item>
                <el-button type="text" @click="generic_info_fold = !generic_info_fold">{{ generic_info_fold ? "更多资料" : "收起" }}<i class="el-icon--right" :class="generic_fold_icon"></i></el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="dataTitle">治疗信息</div>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="主诉 : " prop="patient_complains">
            <el-input type="textarea" :rows="3" v-model="form.patient_complains" resize="none" placeholder="" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="现病史 : " prop="present_history">
            <el-input type="textarea" :rows="3" v-model="form.present_history" resize="none" placeholder="" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="既往史 : " prop="past_history">
            <el-input type="textarea" :rows="3" v-model="form.past_history" resize="none" placeholder="" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="体格检查">
            <el-input v-model="form.temperature" style="width: 200px;" disabled>
              <template slot="prepend">体温:</template>
              <template slot="append">℃</template>
            </el-input>
            <el-input v-model="form.pulse" style="width: 220px;" disabled>
              <template slot="prepend">脉搏: </template>
              <template slot="append">次/分</template>
            </el-input>
            <el-input v-model="form.respiratory" style="width: 220px;" disabled>
              <template slot="prepend">呼吸: </template>
              <template slot="append">次/分</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-input v-model="form.sbp" style="width: 240px;" disabled>
              <template slot="prepend">收缩压:</template>
              <template slot="append">mmHg</template>
            </el-input>
            <el-input v-model="form.dbp" style="width: 240px;" disabled>
              <template slot="prepend">舒张压:</template>
              <template slot="append">mmHg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" prop="remark">
            <!-- <textarea v-model="form.remark" class="textarea" disabled></textarea> -->
            <el-input type="textarea" :rows="3" v-model="form.remark" resize="none" placeholder="" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="传染病 : " prop="contagions">
            <el-checkbox-group v-model="form.contagions">
              <el-checkbox v-for="item in contagionList" v-if="item.type==2" :label="item.id" :key="item.id" :value="item.id" disabled>{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col> 
        <el-col :span="24">
          <el-form-item label="慢性病 : " prop="diseases">
            <el-checkbox-group v-model="form.diseases">
              <el-checkbox v-for="item in checkDisease" :label="item.id" :key="item.id" :value="item.id"  disabled>{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="治疗状态(转归) : " class="is-required" prop="lapseto" >
            <el-radio-group v-model="form.lapseto">
              <el-radio v-for="item in lapsetoOptions" :key="item.value" :label="item.value" :value="item.value" disabled>{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="诊断 : " prop="diagnose">
            <!-- <textarea v-model="form.diagnose" class="textarea" disabled></textarea> -->
            <el-input type="textarea" :rows="3" v-model="form.diagnose" resize="none" placeholder="" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div v-show="!treat_info_fold">
      <el-col :span="6" >
        <el-form-item label="本院首次透析 : " prop="is_hospital_first_dialysis" >
          <el-radio-group v-model="form.is_hospital_first_dialysis" >
            <el-radio v-for="item in isHospitalFirstDialysisOptions" :key="item.value" :label="item.value" :value="item.value" disabled>{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="首次透析日期 : "  prop="firstDialysisDate">
            <el-date-picker v-model="form.firstDialysisDate" type="date" disabled format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6" >
        <el-form-item label="首次透析医院 : " prop="first_dialysis_hospital">
          <el-input v-model="form.first_dialysis_hospital" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24" >
        <el-form-item label="透析之前情况 : " prop="predialysis_condition">
          <el-checkbox-group v-model="form.predialysis_condition">
            <el-checkbox v-for="item in predialysisConditionOptions"  :label="item.label" :key="item.value" :value="item.label" disabled>{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col><el-col :span="6" >
        <el-form-item label="本院前透析频率 : " prop="pre_hospital_dialysis_frequency">
          <el-input v-model="form.pre_hospital_dialysis_frequency" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" >
        <el-form-item label="本院前透析次数 : " prop="pre_hospital_dialysis_times">
          <el-input v-model="form.pre_hospital_dialysis_times" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" >
        <el-form-item label="本院首次透析 : "  prop="hospital_first_dialysis_date">
            <el-date-picker v-model="form.hospital_first_dialysis_date" type="date"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"  disabled></el-date-picker>
        </el-form-item>
      </el-col>
      </div>
      <el-col :span="24">
        <el-form-item>
          <el-button type="text" @click="treat_info_fold = !treat_info_fold">{{ treat_info_fold ? "更多治疗信息" : "收起" }}<i class="el-icon--right" :class="treat_fold_icon"></i></el-button>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="登记人员 : ">
          <span>{{form.registrars}} </span>
        </el-form-item>
      </el-col>
    </el-form>
    <div style="display:none;">
      <div id="print-info-box" >
        <div class="print_main_content">
            <div class="order_title">
                方济医院血液透析门诊病历
            </div>
            <div>
                <table>
                    <thead>
                        <!-- 用 thead 规定好宽度 -->
                        <tr v-show="false">
                            <td width="5%"></td>
                            <td width="10%"></td>
                            <td width="5%"></td>
                            <td width="10%"></td>
                            <td width="5%"></td>
                            <td width="10%"></td>
                            <td width="5%"></td>
                            <td width="30%"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td valign="top"><div class="td_proj_title">姓名</div></td>
                            <td valign="top"><div class="td_proj_content">{{ patientPrint.name }}</div></td>
                            <td valign="top"><div class="td_proj_title">性别</div></td>
                            <td valign="top"><div class="td_proj_content">{{ patientPrint.gender }}</div></td>
                            <td valign="top"><div class="td_proj_title">年龄</div></td>
                            <td valign="top"><div class="td_proj_content">{{ patientPrint.age }}岁</div></td>
                            <td valign="top"><div class="td_proj_title">籍贯</div></td>
                            <td valign="top"><div class="td_proj_content td_align_left">{{ patientPrint.native_place }}</div></td>
                        </tr>
                        <tr>
                            <td valign="top"><div class="td_proj_title">职业</div></td>
                            <td valign="top"><div class="td_proj_content">{{ patientPrint.profession }}</div></td>
                            <td valign="top"><div class="td_proj_title">婚姻</div></td>
                            <td valign="top"><div class="td_proj_content">{{ patientPrint.marital_status }}</div></td>
                            <td valign="top"><div class="td_proj_title">透析号</div></td>
                            <td valign="top"><div class="td_proj_content">{{ patientPrint.dialysis_no }}</div></td>
                            <td valign="top"><div class="td_proj_title">身份证号</div></td>
                            <td valign="top"><div class="td_proj_content td_align_left">{{ patientPrint.id_card_no }}</div></td>
                        </tr>
                        <tr>
                            <td valign="top"><div class="td_proj_title">民族</div></td>
                            <td valign="top"><div class="td_proj_content">{{ patientPrint.nation }}</div></td>
                            <td valign="top"><div class="td_proj_title">电话</div></td>
                            <td valign="top" colspan="3"><div class="td_proj_content td_align_left">{{ patientPrint.phone }}</div></td>
                            <td valign="top"><div class="td_proj_title">备用电话</div></td>
                            <td valign="top"><div class="td_proj_content td_align_left">{{ patientPrint.home_telephone }}</div></td>
                        </tr>
                        <tr>
                            <td><div class="td_proj_title">地址</div></td>
                            <td colspan="7"><div class="td_proj_content td_align_left">{{ patientPrint.home_address }}</div></td>
                        </tr>
                        <tr>
                            <td><div class="td_proj_title">主诉</div></td>
                            <td colspan="7"><div class="td_proj_content td_align_left" v-html="patientPrint.patient_complains"></div></td>
                        </tr>
                        <tr>
                            <td><div class="td_proj_title">现<br/>病<br/>史</div></td>
                            <td colspan="7"><div class="td_proj_content td_align_left" v-html="patientPrint.past_history"></div></td>
                        </tr>
                        <tr>
                            <td><div class="td_proj_title">既<br/>往<br/>史</div></td>
                            <td colspan="7"><div class="td_proj_content td_align_left" v-html="patientPrint.present_history"></div></td>
                        </tr>
                        <tr>
                            <td colspan="8"><div class="td_proj_title">体格检查</div></td>
                        </tr>
                        <tr>
                            <td colspan="8">
                                <div class="td_proj_title">
                                    T {{ patientPrint.temperature }}℃&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    P {{ patientPrint.pulse }}次/分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    R {{ patientPrint.respiratory }}次/分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    BP {{ patientPrint.sbp }}/{{ patientPrint.dbp }} mmHg
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="8">
                                <div class="td_proj_content td_align_left" v-html="patientPrint.remark"></div>
                            </td>
                        </tr>
                        <tr>
                            <td><div class="td_proj_title">传<br/>染<br/>病</div></td>
                            <td colspan="7"><div class="td_proj_content td_align_left">{{ patientPrint.contagions }}</div></td>
                        </tr>
                        <tr>
                            <td><div class="td_proj_title">诊<br/>断</div></td>
                            <td colspan="7"><div class="td_proj_content td_align_left" v-html="patientPrint.diagnose"></div></td>
                        </tr>
                    </tbody>
                </table>
                <div class="print_footnote_panel">
                    <div class="proj"><span class="proj_title">日期：</span>{{ print_time }}</div>
                    <div class="proj"><span class="proj_title">医生签名：</span></div>
                </div>
            </div>
        </div>
      </div>
    </div>

  </div>  
</template>

<script>

import { getDataConfig } from "@/utils/data";
import { getToken } from "@/api/qiniu";
import {
  getFileExtension,
  isCardNo,
  jsGetAge,
  isPositiveInteger,
  dialysisAge,
  uParseTime
} from "@/utils/tools";
import {
  generateDialysisNo,
  createPatient,
  editPatient,
  fetchPatient
} from "@/api/patient";
import { fetchAllDoctorAndNurse,fetchAllAdminUsers } from "@/api/doctor";
import { getZones } from "@/api/device/device";
import print from "print-js";

const defaultForm = {
  avatar: "",
  patientType: "",
  dialysisNo: "",
  admissionNumber: "",
  source: "",
  lapseto:"",
  partition: "",
  bed: "",
  name: "",
  gender: "",
  nation: "",
  native_place: "",
  maritalStatus: "",
  idCardNo: "",
  birth: "",
  age: "",
  reimbursementWayID: "",
  healthCareNo: "",
  healthCareDueDate: "",
  height: "",
  blood: "",
  rh: "",
  healthCareDueAlertDate: "",
  education: "",
  profession: "",
  phone: "",
  homeTelephone: "",
  homeAddress: "",
  work: "",
  receivingDate: "",
  firstDialysisDate: "",
  dialysisAge: "",
  induction: "",
  initial: "",
  dialysisTotal: "",
  contagions: [],
  doctor: "",
  nurse: "",
  assessment: "",
  diseases: [],
  diagnose: "",
  registrars: "",

  patient_complains: "",
  present_history: "",
  past_history: "",
  temperature: "",
  pulse: "",
  respiratory: "",
  sbp: "",
  dbp: "",
};

export default {
  name: "patientDetail",
  components: {  },
 
  data() {
    return {
      generic_info_fold: true,
      treat_info_fold: true,

      orgname:'',
      adminusername:'',
      form: Object.assign({}, defaultForm),
      formSubmit: true,
      submitMethod: "",
      uploadData: { token: "", key: "" },
      dialogImageUrl: "",
      qiniuDomain: "https://images.shengws.com/",
      dialogVisible: false,
      typeOptions: null,
      styleOptions: null,
      sourceOptions: [{ value: 1, label: "门诊" }, { value: 2, label: "住院" }],
      lapsetoOptions: [{ value: 1, label: "留治" }, { value: 2, label: "转出" }],
      partitionOptions: [],
      sexOptions: [{ value: 1, label: "男" }, { value: 2, label: "女" }],
      isHospitalFirstDialysisOptions: [{ value: 1, label: "是" }, { value: 2, label: "否" }],
      predialysisConditionOptions: [{ value: 1, label: "腹膜透析" }, { value: 2, label: "肾移植" }],
      maritalOptions: null,
      wayOptions: null,
      educationOptions: null,
      professionOptions: null,
      inductionOptions: null,
      doctorOptions: null,
      nurseOptions: null,
      adminUserOptions:[],
      rhOptions: null,
      checkDisease: null,
      contagionList: null,
      loading: null,
      patientID: 0,
      patientPrint:{},
      print_time:'',

      rules: {
        avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
        patientType: [
          { required: true, message: "请选择患者类型", trigger: "blur" }
        ],
        dialysisNo: [
          { required: true, message: "请填写透析号", trigger: "blur" }
        ],
        admissionNumber: [
          { required: true, message: "请填写住院(门诊)号", trigger: "blur" }
        ],
        source: [
          { required: true, message: "请选择患者来源", trigger: "blur" }
        ],
        lapseto: [
          { required: true, message: "请选择治疗状态", trigger: "blur" }
        ],
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        idCardNo: [
          { required: true, message: "请填写身份证号", trigger: "blur" }
        ],
        birth: [{ required: true, message: "请填写生日", trigger: "blur" }]
      }
    };
  },
  computed: {
    generic_fold_icon: function() {
      return this.generic_info_fold ? "el-icon-arrow-down" : "el-icon-arrow-up"
    },
    treat_fold_icon: function() {
      return this.treat_info_fold ? "el-icon-arrow-down" : "el-icon-arrow-up"
    },
  },
  created() {
    this.styleOptions = this.$store.getters.patient_types;
    // this.partitionOptions = this.$store.getters.partitions;
    this.maritalOptions = getDataConfig("patient", "marital_options");
    this.wayOptions =  getDataConfig("patient", "reimbursement_ways");
    this.typeOptions = this.$store.getters.blood_types;
    this.rhOptions = this.$store.getters.rh;
    this.educationOptions = getDataConfig("patient", "education_types");
    this.professionOptions = getDataConfig("patient", "profession_options");
    this.inductionOptions = this.$store.getters.induction_options;
    this.contagionList = this.$store.getters.contagions;
    this.checkDisease = this.$store.getters.disease;

    var xtuser = this.$store.getters.xt_user;
    this.orgname = xtuser.org.org_name;
    this.adminusername = xtuser.user.user_name;

    this.fetchAllAdminUsers();

    const id = this.$route.params && this.$route.params.id;
    this.patientID = parseInt(id);
    if (isNaN(this.patientID) || this.patientID <= 0) {
      console.log("patient detail not had id");
      this.$notify.error({
        title: "错误",
        message: "无效的id"
      });
      this.$router.push("/patients/patients");
    }
    this.fetchPatient(id);
    this.getZones();
    var ptime = Math.round(new Date().getTime()/1000);
    // this.print_time = uParseTime(ptime, '{y}-{m}-{d} {h}:{i}');
    
  },
  methods: {
    printThisInfo() {
      var ptime = Math.round(new Date().getTime()/1000);
      this.print_time = uParseTime(ptime, '{y}年{m}月{d}日');
      
      const style = '@media print { .print_main_content { background-color: white; width:960px; margin:0 auto; padding: 0 0 20px 0; } .print_main_content .order_title { text-align: center; font-size: 23px; line-height: 50px; font-weight: 500; } .print_main_content table { width: 100%; border: 1px solid; border-collapse: collapse; padding: 2px; } .print_main_content table tbody tr td { border: 1px solid; text-align: center; padding: 10px 8px; } .td_proj_title { font-size: 18px; line-height: 25px; font-weight: 500; } .td_proj_content { font-size: 18px; line-height: 25px; } .td_align_left { text-align: left; } .print_footnote_panel { font-size: 17px; line-height: 40px; } .print_footnote_panel .proj { display: inline-block; width: 49%; } .print_footnote_panel .proj .proj_title { font-weight: 500;} }';
      
      setTimeout(() => {
        printJS({
          printable: "print-info-box",
          type: "html",
          style: style,
          scanStyles: false
        });
      }, 1);
    },
    getZones() {
      getZones().then(response => {
        if (response.data.state == 1) {
          this.partitionOptions = response.data.data.zones;
        }
      });
    },
    fetchPatient(id) {
      fetchPatient(id)
        .then(response => {
          console.log(response.data.data)
          if (response.data.state == 1) {
            this.$emit("tran-patient-info", response.data.data.patient);
            var patietInfo = response.data.data.patient;
            this.form.avatar = patietInfo.avatar;
            this.form.name = patietInfo.name;
            this.form.alias = patietInfo.alias;
            this.form.lapseto = patietInfo.lapseto;
            this.form.idCardNo = patietInfo.id_card_no;
            this.form.dialysisNo = patietInfo.dialysis_no;
            this.form.gender = patietInfo.gender;
            if (patietInfo.gender == 1 || patietInfo.gender == 2) {
              this.form.gender = patietInfo.gender;
            }
            this.form.nation = patietInfo.nation
            this.form.native_place = patietInfo.native_place
            this.form.birth = uParseTime(patietInfo.birthday, "{y}-{m}-{d}");
            this.form.height = patietInfo.height + "";
            // this.form.age = jsGetAge(this.form.birth, "-");
            if (patietInfo.marital_status > 0) {
              this.form.maritalStatus = patietInfo.marital_status;
            }
            this.form.children = patietInfo.children;
            this.form.admissionNumber = patietInfo.admission_number;
            if (patietInfo.reimbursement_way_id > 0) {
              this.form.reimbursementWayID = patietInfo.reimbursement_way_id;
            }
            this.form.healthCareNo = patietInfo.health_care_no;
            this.form.phone = patietInfo.phone;
            this.form.homeTelephone = patietInfo.home_telephone;
            this.form.relative_phone = patietInfo.relative_phone;
            this.form.relative_relations = patietInfo.relative_relations;
            this.form.homeAddress = patietInfo.home_address;
            this.form.work = patietInfo.work_unit;
            this.form.unit_address = patietInfo.unit_address;
            if (patietInfo.profession > 0) {
              this.form.profession = patietInfo.profession;
            }
            if (patietInfo.education_level > 0) {
              this.form.education = patietInfo.education_level;
            }
            if (patietInfo.source == 1 || patietInfo.source == 2) {
              this.form.source = patietInfo.source;
            }
            if (patietInfo.lapseto == 1 || patietInfo.lapseto == 2) {
              this.form.lapseto = patietInfo.lapseto;
            }
            if (patietInfo.is_hospital_first_dialysis == 1 || patietInfo.is_hospital_first_dialysis == 2) {
              this.form.is_hospital_first_dialysis = patietInfo.is_hospital_first_dialysis;
            }
            if (patietInfo.first_dialysis_date!=0) {
              this.form.firstDialysisDate = uParseTime(
                patietInfo.first_dialysis_date,
                "{y}-{m}-{d}"
              );
            }
            this.form.first_dialysis_hospital = patietInfo.first_dialysis_hospital;
            if(patietInfo.predialysis_condition.length>0) {
                this.form.predialysis_condition = patietInfo.predialysis_condition.split(',');
            }
            this.form.pre_hospital_dialysis_frequency = patietInfo.pre_hospital_dialysis_frequency;
            this.form.pre_hospital_dialysis_times = patietInfo.pre_hospital_dialysis_times;
            if (patietInfo.hospital_first_dialysis_date!=0) {
              this.form.hospital_first_dialysis_date = uParseTime(
                patietInfo.hospital_first_dialysis_date,
                "{y}-{m}-{d}"
              );
            }
            this.form.contagions = response.data.data.contagions;
            this.form.diseases = response.data.data.diseases;
            this.form.remark = patietInfo.remark;
            this.form.diagnose = patietInfo.diagnose;

            this.form.patient_complains = patietInfo.patient_complains
            this.form.present_history = patietInfo.present_history
            this.form.past_history = patietInfo.past_history
            this.form.temperature = patietInfo.temperature
            this.form.pulse = patietInfo.pulse
            this.form.respiratory = patietInfo.respiratory
            this.form.sbp = patietInfo.sbp
            this.form.dbp = patietInfo.dbp
            

            // this.form.initial = patietInfo.initial_dialysis + "";
            // this.form.dialysisTotal = patietInfo.total_dialysis + "";
            // this.form.assessment = patietInfo.evaluate;
            // if (patietInfo.patient_type > 0) {
            //   this.form.patientType = patietInfo.patient_type;
            // }
            // if (patietInfo.partition_id > 0) {
            //   this.form.partition = patietInfo.partition_id;
            // }
            // if (patietInfo.bed_id > 0) {
            //   this.form.bed = patietInfo.bed_id;
            // }
            // this.form.healthCareDueDate = uParseTime(
            //   patietInfo.health_care_due_date,
            //   "{y}-{m}-{d}"
            // );
            // if (patietInfo.blood_type > 0) {
            //   this.form.blood = patietInfo.blood_type;
            // }
            // if (patietInfo.rh > 0) {
            //   this.form.rh = patietInfo.rh;
            // }
            // this.form.healthCareDueAlertDate = uParseTime(
            //   patietInfo.health_care_due_alert_date,
            //   "{y}-{m}-{d}"
            // );
            // this.form.receivingDate = uParseTime(
            //   patietInfo.receiving_date,
            //   "{y}-{m}-{d}"
            // );
            // this.form.dialysisAge = dialysisAge(
            //   this.form.firstDialysisDate,
            //   "-"
            // );
            // if (patietInfo.induction_period > 0) {
            //   this.form.induction = patietInfo.induction_period;
            // }
            // if (patietInfo.attending_doctor_id > 0) {
            //   this.form.doctor = patietInfo.attending_doctor_id;
            // }
            // if (patietInfo.head_nurse_id > 0) {
            //   this.form.nurse = patietInfo.head_nurse_id;
            // }
            // if (patietInfo.registrars_id > 0) {
            //   this.form.registrars = patietInfo.registrars_id;
            // }
            


            var contagionsArr =  response.data.data.contagions;
            var diseasesArr =  response.data.data.diseases;
            this.patientPrint = patietInfo;

            var sourceLen = this.sourceOptions.length;
            for (let index = 0; index < sourceLen; index++) {
              if (this.sourceOptions[index].value==patietInfo.source) {
                this.patientPrint.source = this.sourceOptions[index].label;
                  break;
              }
            }
            var styleLen = this.styleOptions.length;
            for (let index = 0; index < styleLen; index++) {
              if (this.styleOptions[index].id==patietInfo.patient_type) {
                this.patientPrint.patient_type = this.styleOptions[index].name;
                  break;
              }
            }
            var partitionLen = this.partitionOptions.length;
            for (let index = 0; index < partitionLen; index++) {
              if (this.partitionOptions[index].id==patietInfo.partition_id) {
                this.patientPrint.partition_id = this.partitionOptions[index].name;
                  break;
              }
            }
            this.patientPrint.bed_id = patietInfo.bed_id>0?patietInfo.bed_id:'';
            if (patietInfo.gender==1) {
              this.patientPrint.gender = "男";
            }else if (patietInfo.gender==2) {
              this.patientPrint.gender = "女";
            }else {
              this.patientPrint.gender = "";
            }
            var maritalLen = this.maritalOptions.length;
            this.patientPrint.marital_status = ""
            for (let index = 0; index < maritalLen; index++) {
              if (this.maritalOptions[index].id==patietInfo.marital_status) {
                this.patientPrint.marital_status = this.maritalOptions[index].name;
                  break;
              }
            }
            this.patientPrint.birthday = uParseTime(patietInfo.birthday, "{y}-{m}-{d}");
            this.patientPrint.age = jsGetAge(this.patientPrint.birthday, "-");
            
            this.patientPrint.patient_complains = patietInfo.patient_complains.replace(/\n/g, "<br/>")
            this.patientPrint.present_history = patietInfo.present_history.replace(/\n/g, "<br/>")
            this.patientPrint.past_history = patietInfo.past_history.replace(/\n/g, "<br/>")
            this.patientPrint.remark = patietInfo.remark.replace(/\n/g, "<br/>")
            this.patientPrint.diagnose = patietInfo.diagnose.replace(/\n/g, "<br/>")
            if (typeof patietInfo.temperature == "number") {
              this.patientPrint.temperature = patietInfo.temperature.toFixed(1)
            }
            

            if (patietInfo.reimbursement_way_id > 0) {
              var wayLen = this.wayOptions.length;
              for (let index = 0; index < wayLen; index++) {
                if (this.wayOptions[index].id==patietInfo.reimbursement_way_id) {
                  this.patientPrint.reimbursement_way_id = this.wayOptions[index].name;
                  break;
                }
              }
            }else {
              this.patientPrint.reimbursement_way_id = "";
            }
            if (patietInfo.health_care_due_date != 0) {
              this.patientPrint.health_care_due_date = uParseTime(patietInfo.health_care_due_date, "{y}-{m}-{d}");
            }else {
              this.patientPrint.health_care_due_date = '';
            }
            if (patietInfo.blood_type > 0) {
              var typeLen = this.typeOptions.length;
              for (let index = 0; index < typeLen; index++) {
                if (this.typeOptions[index].id==patietInfo.blood_type) {
                  this.patientPrint.blood_type = this.typeOptions[index].name;
                  break;
                }
              }
            }else {
              this.patientPrint.blood_type = "";
            }
            if (patietInfo.rh > 0) {
              var rhLen = this.rhOptions.length;
              for (let index = 0; index < rhLen; index++) {
                if (this.rhOptions[index].id==patietInfo.rh) {
                  this.patientPrint.rh = this.rhOptions[index].name;
                  break;
                }
              }
            }else {
              this.patientPrint.rh = "";
            }
            if (patietInfo.health_care_due_alert_date != 0) {
              this.patientPrint.health_care_due_alert_date = uParseTime(patietInfo.health_care_due_alert_date, "{y}-{m}-{d}");
            }else {
              this.patientPrint.health_care_due_alert_date = '';
            }
            if (patietInfo.education_level > 0) {
              var eLen = this.educationOptions.length;
              for (let index = 0; index < eLen; index++) {
                if (this.educationOptions[index].id==patietInfo.education_level) {
                  this.patientPrint.education_level = this.educationOptions[index].name;
                  break;
                }
              }
            }else {
              this.patientPrint.education_level = "";
            }
            if (patietInfo.profession > 0) {
              var eLen = this.professionOptions.length;
              for (let index = 0; index < eLen; index++) {
                if (this.professionOptions[index].id==patietInfo.profession) {
                  this.patientPrint.profession = this.professionOptions[index].name;
                  break;
                }
              }
            }else {
              this.patientPrint.profession = "";
            }
            if (patietInfo.receiving_date != 0) {
              this.patientPrint.receiving_date = uParseTime(patietInfo.receiving_date, "{y}-{m}-{d}");
            }else {
              this.patientPrint.receiving_date = '';
            }
            if (patietInfo.first_dialysis_date != 0) {
              this.patientPrint.first_dialysis_date = uParseTime(patietInfo.first_dialysis_date, "{y}-{m}-{d}");
              this.patientPrint.dialysis_age = dialysisAge(this.patientPrint.first_dialysis_date);

            }else {
              this.patientPrint.first_dialysis_date = '';
              this.patientPrint.dialysis_age="";
            }
            if (patietInfo.induction_period > 0) {
              var eLen = this.inductionOptions.length;
              for (let index = 0; index < eLen; index++) {
                if (this.inductionOptions[index].id==patietInfo.induction_period) {
                  this.patientPrint.induction_period = this.inductionOptions[index].name;
                  break;
                }
              }
            }else {
              this.patientPrint.induction_period = '';
            }
            if (patietInfo.attending_doctor_id > 0) {
              var eLen = this.adminUserOptions.length;
              for (let index = 0; index < eLen; index++) {
                if (this.adminUserOptions[index].id==patietInfo.attending_doctor_id) {
                  this.patientPrint.attending_doctor_id = this.adminUserOptions[index].name;
                  break;
                }
              }
            }else {
              this.patientPrint.attending_doctor_id = '';
            }
            if (patietInfo.head_nurse_id > 0) {
              var eLen = this.adminUserOptions.length;
              for (let index = 0; index < eLen; index++) {
                if (this.adminUserOptions[index].id==patietInfo.head_nurse_id) {
                  this.patientPrint.head_nurse_id = this.adminUserOptions[index].name;
                  break;
                }
              }
            }else {
              this.patientPrint.head_nurse_id = '';
            }

            if (contagionsArr.length>0) {
              var contagionsIdArr = {};
              var alen = contagionsArr.length;
              for (let index = 0; index < alen; index++) {
                contagionsIdArr[contagionsArr[index]] = 1;
              }
              var printContagions = [];
              var clen = this.contagionList.length;
              for (let index = 0; index < clen; index++) {
                if(this.contagionList[index].id in contagionsIdArr) {
                  printContagions.push(this.contagionList[index].name)
                }
              }
              this.patientPrint.contagions = printContagions.join('、');
            }else {
              this.patientPrint.contagions = "";
            }

            if (diseasesArr.length>0) {
              var diseasesIdArr = {};
              var alen = diseasesArr.length;
              for (let index = 0; index < alen; index++) {
                diseasesIdArr[diseasesArr[index]] = 1;
              }
              var printDisease = [];
              var clen = this.checkDisease.length;
              for (let index = 0; index < clen; index++) {
                if(this.checkDisease[index].id in diseasesIdArr) {
                  printDisease.push(this.checkDisease[index].name)
                }
              }
              this.patientPrint.diseases = printDisease.join('、');
            }else {
              this.patientPrint.diseases = "";
            }

            
            if (patietInfo.registrars_id > 0) {
              var eLen = this.adminUserOptions.length;
              for (let index = 0; index < eLen; index++) {
                if (this.adminUserOptions[index].id==patietInfo.registrars_id) {
                  this.patientPrint.registrars = this.adminUserOptions[index].name;
                  this.form.registrars = this.adminUserOptions[index].name;
                  break;
                }
              }
            }else {
              this.patientPrint.registrars= '';
            }

            if (patietInfo.hospital_first_dialysis_date!=0) {
              this.patientPrint.hospital_first_dialysis_date = uParseTime(patietInfo.hospital_first_dialysis_date, "{y}-{m}-{d}");
            }else{
              this.patientPrint.hospital_first_dialysis_date = '';
            }

          } else {
            console.log("patient get err state");
            this.$notify.error({
              title: "错误",
              message: "网络异常"
            });
            this.$router.push("/patients/patients");
          }

          // this.postForm = response.data
          // // Just for test
          // this.postForm.title += `   Article Id:${this.postForm.id}`
          // this.postForm.content_short += `   Article Id:${this.postForm.id}`
        }).catch(err => {
          console.log("patient get err", err);
          this.$notify.error({
            title: "错误",
            message: "网络异常"
          });
          this.$router.push("/patients/patients");
        });
    },
    fetchAllDoctorAndNurse() {
      fetchAllDoctorAndNurse().then(response => {
        if (response.data.state == 1) {
          this.doctorOptions = response.data.data.doctors;
          this.nurseOptions = response.data.data.nursers;
        }
      });
    },
    fetchAllAdminUsers() {
      fetchAllAdminUsers().then(response => {
        if (response.data.state == 1) {
          this.adminUserOptions = response.data.data.users;
        }
      });
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dataTitle {
  color: #409eff;
  font-size: 16px;
  border-bottom: 1px #409eff solid;
  height: 36px;
  line-height: 30px;
  margin: 0 0 15px 0;
  // position: relative;
  padding: 0 0 6px 15px;
  &::before {
    position: absolute;
    left: 0;
    bottom: 10px;
    content: "";
    width: 2px;
    height: 20px;
    background: #409eff;
  }
}
.uploadHead {
  margin-top: 25%;
}
.uploadHeadBtn {
  width: 148px;
  margin-top: 10px;
}
.el-form {
  .el-col-6,
  .el-col-8 {
    width: 360px;
  }
  .el-form-item {
    margin-bottom: 17px !important;
    .el-select {
      width: 100%;
    }
    .el-date-editor.el-input {
      width: 100%;
    }
    .textarea {
      width: 100%;
      height: 70px;
      border-color: #dcdfe6;
      padding: 5px;
    }
  }
}

// #print-info-box .info_print {
//     width: 920px;
//     margin: 0 auto !important;
//     position: relative;
//     top: 0;
//     left: 0;
//     padding: 20px 30px;
// }
// #print-info-box .box-title {
//     text-align: center;
//     font-weight: 600;
//     font-size: 30px;
//     line-height: 80px;
//     margin-bottom: 20px;
// }

// #print-info-box .unit-title {
//     text-align: center;
//     line-height: 40px;
//     font-size: 20px;
//     font-weight: 400;
//     padding-top: 10px;
//     /* border: 1px solid #333; */
// }

// #print-info-box .unit-box {
//     padding: 15px;
// }

// #print-info-box .unit-box-item {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 4px 1em;
// }

// #print-info-box .unit-box-item-col3 {
//     width: 30%;
//     display: flex;
//     padding: 4px 0;
// }

// #print-info-box .unit-box-item-col4 {
//     width: 23%;
//     display: flex;
//     padding: 4px 0;
// }

// #print-info-box .item-value {
//     flex: 1;
//     border-bottom: 1px solid #333;
// }
</style>

<style scoped>
/* 打印表格的样式 */
.print_main_content {
    background-color: white;
    width:960px; 
    margin:0 auto;
    padding: 0 0 20px 0;
}
.print_main_content .order_title {
    text-align: center;
    font-size: 23px;
    line-height: 50px;
    font-weight: 500;
}
.print_main_content table {
    width: 100%;
    border: 1px solid;
    border-collapse: collapse;
    padding: 2px;
}
.print_main_content table tbody tr td {
    border: 1px solid;
    text-align: center;
    /* font-size: 17px; */
    padding: 10px 8px;
}
.td_proj_title {
    font-size: 18px;
    line-height: 25px;
    font-weight: 500;
}
.td_proj_content {
    font-size: 18px;
    line-height: 25px;
}
.td_align_left {
    text-align: left;
}
.print_footnote_panel {
    font-size: 17px;
    line-height: 40px;
}
.print_footnote_panel .proj {
    display: inline-block;
    width: 49%;
}
.print_footnote_panel .proj .proj_title {
    font-weight: 500;
}
</style>