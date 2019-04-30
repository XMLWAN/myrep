<template>
  <div class="app-container " v-loading="pageLoad">
    <el-button :disabled="$store.getters.xt_user.subscibe.state==3||!subscibeFlag?true:false" type="primary" v-if="this.isEdit==false" @click="resetForm('form')" style="float:right;margin:0 0 6px 0;z-index:1;" icon="el-icon-plus" size="mini">新增患者</el-button>
    <el-form ref="form" :rules="rules" :model="form" label-width="134px" class="clearfix" >
      <div class="dataTitle">一般资料</div>
      <el-row >
       
        <el-col :span="4" align="center">
          <el-upload  style="width:100%;"
          :disabled="$store.getters.xt_user.subscibe.state==3||!subscibeFlag?true:false"
            :data="uploadData"
            class="uploadHead"
            :multiple="false"
            action="https://upload.qiniup.com"
            :show-file-list="false"
            :on-error="handleAvatarError"
            :on-success="handleAvatarSuccess"
            list-type="picture-card"
            :before-upload="beforeAvatarUpload">
            <img width="100%" height="100%" v-if="form.avatar" :src="form.avatar" class="avatar">
            <i class="el-icon-plus" v-else></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-upload 
          :disabled="$store.getters.xt_user.subscibe.state==3||!subscibeFlag?true:false"
            :data="uploadData"
            :multiple="false"
            action="https://upload.qiniup.com"
            :show-file-list="false"
            :on-error="handleAvatarError"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <el-button :disabled="$store.getters.xt_user.subscibe.state==3||!subscibeFlag?true:false" class="uploadHeadBtn" type="primary" >上传头像</el-button>
          </el-upload>
          <el-form-item prop="avatar">
            <el-input v-model="form.avatar"  type="hidden" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="form-table" >
          <el-row :gutter="10">
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="姓名 : "  class="is-required" prop="name" >
                  <el-input v-model="form.name" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
                <el-form-item label="性别 : " class="is-required" prop="gender" >
                  <el-radio-group v-model="form.gender" @change="changeGender">
                    <el-radio v-for="item in sexOptions" :key="item.value" :label="item.value" :value="item.value" >{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="身份证号 : "  class="is-required" prop="idCardNo" >
                  <el-input v-model="form.idCardNo" @blur="checkIdCardNo" ></el-input>
              </el-form-item>
            </el-col>
            <template v-if="this.isEdit">
              <!-- <el-col  :span="8" :style="isEdit?'width:360px':''">
                <el-form-item label="患者类型 : " class="is-required" >
                  <el-select v-model="form.patientType"  placeholder="请选择患者类型" disabled >
                    <el-option v-for="item in styleOptions" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="8" :style="isEdit?'width:360px':''">
                <el-form-item label="透析号 : " class="is-required">
                    <el-input disabled v-model="form.dialysisNo" placeholder="填写或自动生成" style="width:110px;float:left;margin-right: 1%;" ></el-input> 
                    <el-button disabled type="primary">自动生成</el-button>
                </el-form-item>
              </el-col>
            </template>
            <template v-else>
              <!-- <el-col :span="8" >
                <el-form-item label="患者类型 : " class="is-required" prop="patientType">
                  <el-select v-model="form.patientType"  placeholder="请选择患者类型"  >
                    <el-option v-for="item in styleOptions" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="8" >
                <el-form-item label="透析号 : " class="is-required" prop="dialysisNo" >
                    <el-input v-model="form.dialysisNo" placeholder="填写或自动生成" style="width:180px;float:left;margin-right: 1%;" ></el-input> 
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3||!subscibeFlag?true:false" type="primary" @click="generatedialysisno">自动生成</el-button>
                </el-form-item>
              </el-col>
            </template>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="出生日期 : "  class="is-required" prop="birth" >
                  <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" :suffix-icon="'el-icon-menu'" @change="hadSelectBirth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col> 
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="本人电话 : " class="is-required" prop="phone">
                <el-input v-model="form.phone" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="家属电话 : " prop="homeTelephone">
                <el-input v-model="form.homeTelephone" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="患者来源 : " class="is-required" prop="source" >
                <el-radio-group v-model="form.source">
                  <el-radio v-for="item in sourceOptions" :key="item.value" :label="item.value" :value="item.value" >{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="民族 : " prop="nation">
                <el-input v-model="form.nation" maxlength="30"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="籍贯 : " prop="native_place">
                <el-input v-model="form.native_place" maxlength="30"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20" >
              <el-form-item label="家庭住址 : " prop="homeAddress">
                <el-input v-model="form.homeAddress"></el-input>
              </el-form-item>
            </el-col>

            <div v-show="!generic_info_fold">
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="别名 : "  prop="alias" >
                  <el-input v-model="form.alias" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
                <el-form-item label="身高(cm) : "  prop="height">
                  <el-input maxlength="5" v-model="form.height" @change="checkHeight"></el-input>              
                </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
                <el-form-item label="婚姻状况 : " prop="maritalStatus">
                  <el-select v-model="form.maritalStatus"  placeholder="请选择婚姻状况">
                    <el-option v-for="item in maritalOptions" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" style="clearfix" :style="isEdit?'width:360px':''">
                <el-form-item label="子女情况 : " style="width:80%;float:left;"  prop="children">
                  <el-input maxlength="5" v-model="form.children" ></el-input>              
                </el-form-item>
                <el-form-item label="孩 " style="width:20%;float:left;" label-width="50px">
                </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="住院(门诊)号 : " prop="admissionNumber" >
                  <el-input v-model="form.admissionNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
                <el-form-item label="医保类型 : " prop="reimbursementWayID">
                  <el-select v-model="form.reimbursementWayID"  >
                    <el-option v-for="item in wayOptions" :key="item.id" :label="item.name" :value="item.id"/>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
                <el-form-item label="医保号 : " prop="healthCareNo">
                  <el-input v-model="form.healthCareNo" ></el-input>              
                </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="教育程度 : "  prop="educationOptions">
                <el-select v-model="form.education"  >
                  <el-option v-for="item in educationOptions" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="亲友电话 : " prop="relative_phone">
                <el-input v-model="form.relative_phone" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="亲友关系 : " prop="relative_relations">
                <el-input v-model="form.relative_relations" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="isEdit?'width:360px':''">
              <el-form-item label="职业 : "  prop="profession">
                <el-select v-model="form.profession"  >
                  <el-option v-for="item in professionOptions" :key="item.id" :label="item.name" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="20" >
              <el-form-item label="工作单位 : " prop="work">
                <el-input v-model="form.work"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20" >
              <el-form-item label="单位地址 : " prop="unit_address">
                <el-input v-model="form.unit_address"></el-input>
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
            <el-input type="textarea" :rows="3" v-model="form.patient_complains" resize="none" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="现病史 : " prop="present_history">
            <el-input type="textarea" :rows="3" v-model="form.present_history" resize="none" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="既往史 : " prop="past_history">
            <el-input type="textarea" :rows="3" v-model="form.past_history" resize="none" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="体格检查">
            <el-input v-model="form.temperature" style="width: 200px;">
              <template slot="prepend">体温:</template>
              <template slot="append">℃</template>
            </el-input>
            <el-input v-model="form.pulse" style="width: 220px;">
              <template slot="prepend">脉搏: </template>
              <template slot="append">次/分</template>
            </el-input>
            <el-input v-model="form.respiratory" style="width: 220px;">
              <template slot="prepend">呼吸: </template>
              <template slot="append">次/分</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item>
            <el-input v-model="form.sbp" style="width: 240px;">
              <template slot="prepend">收缩压:</template>
              <template slot="append">mmHg</template>
            </el-input>
            <el-input v-model="form.dbp" style="width: 240px;">
              <template slot="prepend">舒张压:</template>
              <template slot="append">mmHg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" prop="remark">
            <el-input type="textarea" :rows="3" v-model="form.remark" resize="none" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="传染病 : " prop="contagions">
            <el-checkbox-group v-model="form.contagions">
              <el-checkbox v-for="item in contagionList" v-if="item.type==2" :label="item.id" :key="item.id" :value="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col> 
        <el-col :span="24" >
          <el-form-item label="慢性病 : " prop="diseases">
            <el-checkbox-group  v-model="form.diseases" >
              <el-checkbox v-for="item in checkDisease" :label="item.id" :key="item.id" :value="item.id" >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" :style="isEdit?'width:360px':''">
          <el-form-item label="治疗状态(转归) : " class="is-required" prop="lapseto" >
            <el-radio-group v-model="form.lapseto">
              <!-- <el-radio :disabled="isEdit" v-for="item in lapsetoOptions" :key="item.value" :label="item.value" :value="item.value" >{{item.label}}</el-radio> -->
              <el-radio :disabled="isEdit" v-for="item in lapsetoOptions" :key="item.value" :label="item.value" :value="item.value" >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="诊断 : " prop="diagnose">
            <el-input type="textarea" :rows="3" v-model="form.diagnose" resize="none" placeholder=""></el-input>
          </el-form-item>
        </el-col>

        <div v-show="!treat_info_fold">
        <el-col :span="6" :style="isEdit?'width:360px':''">
            <el-form-item label="本院首次透析 : " prop="is_hospital_first_dialysis" >
              <el-radio-group v-model="form.is_hospital_first_dialysis">
                <el-radio v-for="item in isHospitalFirstDialysisOptions" :key="item.value" :label="item.value" :value="item.value" >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :span="6" :style="isEdit?'width:360px':''">
          <el-form-item label="首次透析日期 : "  prop="firstDialysisDate">
              <el-date-picker v-model="form.firstDialysisDate" type="date"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="selectFirstDialysisDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" :style="isEdit?'width:360px':''">
          <el-form-item label="首次透析医院 : " prop="first_dialysis_hospital">
            <el-input v-model="form.first_dialysis_hospital"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="透析之前情况 : " prop="predialysis_condition">
            <el-checkbox-group v-model="form.predialysis_condition">
              <el-checkbox v-for="item in predialysisConditionOptions"  :label="item.label" :key="item.value" :value="item.label">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col> 
        <el-col :span="6" :style="isEdit?'width:360px':''">
          <el-form-item label="本院前透析频率 : " prop="pre_hospital_dialysis_frequency">
            <el-input v-model="form.pre_hospital_dialysis_frequency"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :style="isEdit?'width:360px':''">
          <el-form-item label="本院前透析次数 : " prop="pre_hospital_dialysis_times">
            <el-input v-model="form.pre_hospital_dialysis_times"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :style="isEdit?'width:360px':''">
          <el-form-item label="本院首次透析 : "  prop="hospital_first_dialysis_date">
              <el-date-picker v-model="form.hospital_first_dialysis_date" type="date"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
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
            <span>{{adminusername}} </span>
          </el-form-item>
        </el-col>

        <el-col :span="24" align="center">
          <el-form-item>
            <el-button type="primary" :disabled="$store.getters.xt_user.subscibe.state==3||!subscibeFlag?true:false" @click="onSubmit('form')">确定</el-button>
            <el-button v-if="this.isEdit==false" @click="onReSubmit('form')" :disabled="$store.getters.xt_user.subscibe.state==3||!subscibeFlag?true:false">确定并继续新增</el-button>
            <el-button @click="$router.back(-1)">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form>
  </div>  
</template>

<script>
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
  fetchPatient,
  GetPatientTotal,
} from "@/api/patient";
// import { fetchAllDoctorAndNurse } from "@/api/doctor";
import { getDataConfig } from "@/utils/data";

const defaultForm = {
  avatar: "https://images.shengws.com/201809182128111.png",
  name: "",
  alias:'',
  idCardNo: "",
  dialysisNo: "",
  gender: "",
  birth: "",
  nation: "",
  native_place: "",
  height: "",
  maritalStatus: "",
  children:'',
  admissionNumber: "",
  reimbursementWayID: "",
  healthCareNo: "",
  phone: "",
  homeTelephone: "",
  relative_phone: "",
  relative_relations: "",
  lapseto:"",
  homeAddress: "",
  work: "",
  unit_address: "",
  profession: "",
  education: "",
  source: "",
  is_hospital_first_dialysis: "",
  firstDialysisDate: "",
  first_dialysis_hospital: "",
  predialysis_condition:[],
  pre_hospital_dialysis_frequency:"",
  pre_hospital_dialysis_times:"",
  hospital_first_dialysis_date:"",
  contagions: [],
  diseases: [],
  remark:"",
  diagnose: "",
//  patientType: "",
//   partition: "",
//   bed: "",
//   age: "",
//   healthCareDueDate: "",
//   blood: "",
//   rh: "",
//   healthCareDueAlertDate: "",
//   receivingDate: "",
//   dialysisAge: "",
//   induction: "",
//   initial: "",
//   dialysisTotal: "",
//   doctor: "",
//   nurse: "",
//   assessment: "",

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
  name: "patientForm",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value.length==0) {
        return callback(new Error('本人电话不能为空'));
      }
      if (!value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        return callback(new Error('请填写正确的电话（手机号码）'));
      }
      callback();
    };
    var checkFamilyPhone = (rule, value, callback) => {
      if (value.length==0) {
        return callback(new Error('家属电话不能为空'));
      }
      if (!value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        return callback(new Error('请填写正确的电话（手机号码）'));
      }
      callback();
    };

    return {
      generic_info_fold: true,
      treat_info_fold: true,

      patientTotal:0,
      pageLoad:true,
      avatarFlag:false,
      subscibeFlag:false,
      orgname:'',
      adminusername:'',
      form: Object.assign({}, defaultForm),
      formSubmit: true,
      submitMethod: "",
      uploadData: { token: "", key: "" },
      dialogImageUrl: "",
      qiniuDomain: "https://images.shengws.com/",
      dialogVisible: false,
      // typeOptions: null,
      // styleOptions: null,
      sourceOptions: [{ value: 1, label: "门诊" }, { value: 2, label: "住院" }],
      lapsetoOptions: [{ value: 1, label: "留治" }, { value: 2, label: "转出" }],

      // partitionOptions: null,
      sexOptions: [{ value: 1, label: "男" }, { value: 2, label: "女" }],
      isHospitalFirstDialysisOptions: [{ value: 1, label: "是" }, { value: 2, label: "否" }],
      predialysisConditionOptions: [{ value: 1, label: "腹膜透析" }, { value: 2, label: "肾移植" }],
      maritalOptions: null,
      wayOptions: null,
      educationOptions: null,
      professionOptions: null,
      // inductionOptions: null,
      // doctorOptions: null,
      // nurseOptions: null,
      // rhOptions: null,
      checkDisease: null,
      contagionList: null,
      loading: null,
      submitMsg: "",
      patientID: 0,

      subscibe:{},
      rules: {
        avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
        patientType: [{ required: true, message: "请选择患者类型", trigger: "blur" }],
        dialysisNo: [{ required: true, message: "请填写透析号", trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        source: [{ required: true, message: "请选择患者来源", trigger: "blur" }],
        lapseto: [{ required: true, message: "请选择治疗状态", trigger: "blur" }],
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        idCardNo: [{ required: true, message: "请填写身份证号", trigger: "blur" }],
        birth: [{ required: true, message: "请填写生日", trigger: "blur" }],
        // homeTelephone: [{ validator: checkFamilyPhone, trigger: "blur" }],
        // homeAddress: [{ required: true, message: "请填写住址", trigger: "blur" }],
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
    // this.styleOptions = this.$store.getters.patient_types;
    // this.partitionOptions = this.$store.getters.partitions;
    this.maritalOptions = getDataConfig("patient", "marital_options");
    this.wayOptions =  getDataConfig("patient", "reimbursement_ways");
    // this.typeOptions = this.$store.getters.blood_types;
    // this.rhOptions = this.$store.getters.rh;
    this.educationOptions = getDataConfig("patient", "education_types");
    this.professionOptions = getDataConfig("patient", "profession_options");
    // this.inductionOptions = this.$store.getters.induction_options;
    this.contagionList = this.$store.getters.contagions;
    this.checkDisease = this.$store.getters.disease;

    this.subscibe = this.$store.getters.xt_user.subscibe;
    this.GetPatientTotal();
    

    // this.fetchAllDoctorAndNurse();
    this.pageLoad = false;
    
    var xtuser = this.$store.getters.xt_user;
    this.orgname = xtuser.org.org_name;
    this.adminusername = xtuser.user.user_name;


    if (this.isEdit) {
      this.submitMsg = "修改患者信息成功";
      const id = this.$route.params && this.$route.params.id;
      this.patientID = parseInt(id);
      if (isNaN(this.patientID) || this.patientID <= 0) {
        this.$notify.error({
          title: "错误",
          message: "无效的id"
        });
        this.$router.back(-1);
      }
      this.fetchPatient(id);
      this.avatarFlag = true;
    } else {
      this.submitMsg = "新增患者成功";
      this.form = Object.assign({}, defaultForm);
    }
  },
  methods: {
    
    GetPatientTotal(){
      GetPatientTotal().then(response=>{
        if(response.data.state==1) {
          this.patientTotal = response.data.data.total;
          if((this.subscibe.state==2 && this.patientTotal>=20)||(this.subscibe.state==1 && this.patientTotal>=60)){
            this.$alert('患者数已达到当前服务版本病人数，需要升级到更高的版本', '提示', {
              confirmButtonText: '确定',
              showClose:false,
              callback: action => {
                this.$router.push('/service/buy');
              }
            });
          }else {
            this.subscibeFlag = true;
          }
    
        }else {
          this.$message.error(response.data.msg);
        }
      }).catch(e=>{

      });
    },

    changeGender(value){
      if (this.avatarFlag) {
        return false;
      }
      if (value==1) {
        this.form.avatar = "https://images.shengws.com/201809182128111.png";
      }else if (value==2) {
        this.form.avatar = "https://images.shengws.com/201809182128222.png";
      }else {
        
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onReSubmit(formName) {
      this.submitForm(formName, "renew");
    },
    onSubmit(formName) {
      this.submitForm(formName, "redict");
    },
    submitForm(formName, action) {
      if (!this.formSubmit) {
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formSubmit = false;
          if (this.isEdit) {
            editPatient(this.patientID, this.form)
              .then(response => {
                if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  this.formSubmit = true;
                  return false;
                } else {
                  this.formSubmit = false;
                  this.$notify({
                    title: "成功",
                    message: this.submitMsg,
                    type: "success",
                    duration: 2000
                  });
                  this.$refs[formName].resetFields();
                  if (action !== "renew") {
                    this.$router.back(-1);
                  }
                  this.formSubmit = true;
                  return false;
                }
              })
              .catch(err => {
                this.$message.error("网络异常");
                this.formSubmit = true;
                return false;
              });
          } else {
            createPatient(this.form)
              .then(response => {
                if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  this.formSubmit = true;
                  return false;
                } else {
                  this.formSubmit = false;
                  this.$notify({
                    title: "成功",
                    message: this.submitMsg,
                    type: "success",
                    duration: 2000
                  });
                  this.$refs[formName].resetFields();
                  this.$store.dispatch('SetSubscibePatients');
                  var sub = this.$store.getters.xt_user.subscibe;
                  console.log(sub);
                  if (action !== "renew") {
                    this.$router.back(-1);
                  }
                  return false;
                }
              })
              .catch(err => {
                this.$message.error("网络异常");
                this.formSubmit = true;
                return false;
              });
          }
        } else {
          this.formSubmit = true;
          return false;
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarError(err, file, fileList) {
      this.$message.error(err);
      this.loading.close();
      return false;
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = this.qiniuDomain + res.url;
      this.avatarFlag = true;
      this.loading.close();
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      var fileType = file.type;
      const isJPG = fileType.indexOf("image") > -1;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("只能上传图片");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }

      var date = new Date();
      var ext = getFileExtension(file.name);
      var key =
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        "/" +
        date.getHours() +
        "/" +
        date.getMinutes() +
        "/" +
        date.getSeconds() +
        "/" +
        "_s_" +
        file.uid +
        "." +
        ext;
      this.loading = this.$loading({
        lock: true,
        text: "上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      const _self = this;
      return new Promise((resolve, reject) => {
        getToken()
          .then(response => {
            const token = response.data.data.uptoken;
            _self._data.uploadData.token = token;
            _self._data.uploadData.key = key;
            resolve(true);
          })
          .catch(err => {
            console.log(err);
            reject(false);
            this.loading.close();
          });
      });
    },
    generatedialysisno() {
      generateDialysisNo().then(response => {
        this.form.dialysisNo = response.data.data.no + "";
      });
    },
    checkIdCardNo() {
      if (!isCardNo(this.form.idCardNo)) {
        this.$message.error("身份证号码信息有误!");
        this.form.birth = "";
        return false;
      }
      var thisLen = this.form.idCardNo.length;
      var birth = "";
      if (thisLen == 15) {
        birth = "19" + this.form.idCardNo.substr(6, 6);
      } else {
        birth = this.form.idCardNo.substr(6, 8);
      }
      this.form.birth =
        birth.substr(0, 4) +
        "-" +
        birth.substr(4, 2) +
        "-" +
        birth.substr(6, 2);

      this.form.age = jsGetAge(this.form.birth, "-");
    },
    hadSelectBirth() {
      this.form.age = jsGetAge(this.form.birth, "-");
    },
    checkHeight() {
      if (!isPositiveInteger(this.form.height)) {
        this.$message.error("身高请填写正整数!");
        return false;
      }
    },
    selectFirstDialysisDate() {
      this.form.dialysisAge = dialysisAge(this.form.firstDialysisDate);
    },
    fetchPatient(id) {
      fetchPatient(id)
        .then(response => {
          if (response.data.state == 1) {
            this.$emit("tran-patient-info", response.data.data.patient);
            var patietInfo = response.data.data.patient;
            this.form.avatar = patietInfo.avatar;
            this.form.name = patietInfo.name;
            this.form.alias = patietInfo.alias;
            this.form.idCardNo = patietInfo.id_card_no;
            this.form.dialysisNo = patietInfo.dialysis_no;
            this.form.gender = patietInfo.gender;
            if (patietInfo.gender == 1 || patietInfo.gender == 2) {
              this.form.gender = patietInfo.gender;
            }
            this.form.birth = uParseTime(patietInfo.birthday, "{y}-{m}-{d}");
            this.form.nation = patietInfo.nation
            this.form.native_place = patietInfo.native_place
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
          } else {
            this.$notify.error({
              title: "错误",
              message: "网络异常"
            });
            this.$router.back(-1);
          }

          // this.postForm = response.data
          // // Just for test
          // this.postForm.title += `   Article Id:${this.postForm.id}`
          // this.postForm.content_short += `   Article Id:${this.postForm.id}`
        })
        .catch(err => {
          this.$notify.error({
            title: "错误",
            message: "网络异常"
          });
          this.$router.back(-1);
        });
    },
    // fetchAllDoctorAndNurse() {
      // fetchAllDoctorAndNurse().then(response => {
      //   if (response.data.state == 1) {
          // this.doctorOptions = response.data.data.doctors;
          // this.nurseOptions = response.data.data.nursers;
      //   }
      // });
    // }
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
.el-form{
    .el-col-6,.el-col-8{
    width: 430px;
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
</style>

