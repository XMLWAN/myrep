<template>
  <div class="app-container">
    <el-button type="primary" style="float:right;margin:0 0 6px 0;">新增患者</el-button>
    <el-form ref="form" :rules="rules" :model="form" label-width="134px" class="clearfix" >
      <div class="dataTitle">一般资料</div>
     <el-row >
       
      <el-col :span="4" align="center">
        <el-upload  style="width:100%;"
          :data="uploadData"
          class="uploadHead"
          :multiple="false"
          action="https://upload.qiniup.com"
          :show-file-list="false"
          :on-error="handleAvatarError"
          :on-success="handleAvatarSuccess"
          list-type="picture-card"
          :before-upload="beforeAvatarUpload">
          <img width="100%" height="100%" v-if="imageUrl" :src="imageUrl" class="avatar">
          <i class="el-icon-plus" v-else></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-upload 
          :data="uploadData"
          :multiple="false"
          action="https://upload.qiniup.com"
          :show-file-list="false"
          :on-error="handleAvatarError"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <el-button class="uploadHeadBtn" type="primary" >上传头像</el-button>
        </el-upload>
        <el-form-item prop="avatar">
          <el-input v-model="form.avatar"  type="hidden" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="20" >
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="患者类型 : " class="is-required" prop="patientType">
              <el-select v-model="form.patientType"  placeholder="请选择患者类型">
                <el-option v-for="item in styleOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="透析号 : " class="is-required" prop="dialysisNo" >
                <el-input v-model="form.dialysisNo" placeholder="填写或自动生成" style="width:47%;float:left;margin-right: 1%;" ></el-input> 
                <el-button type="primary" @click="generatedialysisno">自动生成</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="住院(门诊)号 : " class="is-required" prop="admissionNumber" >
                <el-input v-model="form.admissionNumber"></el-input>
            </el-form-item>
          </el-col>
       </el-row>

       <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="患者来源 : " class="is-required" prop="source" >
              <el-radio-group v-model="form.source">
                <el-radio v-for="item in sourceOptions" :key="item.value" :label="item.value" :value="item.value" >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病区 : " >
              <el-select v-model="form.partition"  placeholder="请选择病区 ">
                <el-option v-for="item in partitionOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="床位 : "  >
              <el-input v-model="form.bed"></el-input>
            </el-form-item>
          </el-col>
       </el-row>

       <el-row :gutter="10">
         <el-col :span="8">
          <el-form-item label="姓名 : "  class="is-required" prop="name" >
              <el-input v-model="form.name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="性别 : " class="is-required" prop="gender" >
              <el-radio-group v-model="form.gender">
                <el-radio v-for="item in sexOptions" :key="item.value" :label="item.value" :value="item.value" >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="婚姻状况 : " >
              <el-select v-model="form.maritalStatus"  placeholder="请选择婚姻状况">
                <el-option v-for="item in maritalOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
        </el-col>
       </el-row>

       <el-row :gutter="10">
         <el-col :span="8">
          <el-form-item label="身份证号 : "  class="is-required" prop="idCardNo" >
              <el-input v-model="form.idCardNo" @blur="checkIdCardNo" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生日期 : "  class="is-required" prop="birth" >
              <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" :suffix-icon="'el-icon-menu'" @change="hadSelectBirth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col> 
        <el-col :span="8">
          <el-form-item label="年龄 : " >
              <el-input v-model="form.age" ></el-input>
          </el-form-item>
        </el-col>
       </el-row>

       <el-row :gutter="10">
        <el-col :span="8">
            <el-form-item label="报销方式 : " >
              <el-select v-model="form.reimbursementWayID"  >
                <el-option v-for="item in wayOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="医保号 : " >
              <el-input v-model="form.healthCareNo" ></el-input>              
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="医保到期日期 : " >
              <el-date-picker v-model="form.healthCareDueDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
        </el-col>
       </el-row>

       <el-row :gutter="10">
         <el-col :span="8">
            <el-form-item label="身高(cm) : " >
              <el-input maxlength="5" v-model="form.height" @change="checkHeight"></el-input>              
            </el-form-item>
        </el-col>
        <el-col :span="8" style="clearfix">
            <el-form-item label="血型 : " style="width:60%;float:left;">
              <el-select v-model="form.blood"  >
                <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="RH : " style="width:40%;float:left;" label-width="50px" >
              <el-select v-model="form.rh"  >
                <el-option v-for="item in rhOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="医保到期提醒日期 : " >
              <el-date-picker v-model="form.healthCareDueAlertDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
        </el-col>
       </el-row>
       
       <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="文化程度 : " >
              <el-select v-model="form.education"  >
                <el-option v-for="item in educationOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职业 : " >
              <el-select v-model="form.profession"  >
                <el-option v-for="item in professionOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
            
        </el-col>
       </el-row>
      
      <div class="dataTitle">联系方式</div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="电话（本人）: ">
            <el-input v-model="form.phone" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话（家属）: ">
            <el-input v-model="form.homeTelephone" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="家庭住址 : ">
            <el-input v-model="form.homeAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工作单位 : ">
            <el-input v-model="form.work"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="dataTitle">治疗信息</div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="接受日期 : " >
              <el-date-picker v-model="form.receivingDate" type="date"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="首次透析日期 : " >
              <el-date-picker v-model="form.firstDialysisDate" type="date"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="selectFirstDialysisDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="透析龄 : ">
            <el-input v-model="form.dialysisAge"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="诱导期 : " >
              <el-select v-model="form.induction"  >
                <el-option v-for="item in inductionOptions" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      
       <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="初始透析次数 : " >
              <el-input v-model="form.initial"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="透析总次数 : " >
              <el-input v-model="form.dialysisTotal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="传染病 : ">
            <el-checkbox-group v-model="form.contagions">
              <el-checkbox v-for="item in contagionList" :label="item.id" :key="item.id" :value="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col> 
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6">
           <el-form-item label="主治医生 : ">
              <el-select v-model="form.doctor"  >
                <el-option v-for="item in doctorOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
           </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="主管护士 : ">
              <el-select v-model="form.nurse"  >
                <el-option v-for="item in nurseOptions" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
           </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="跌倒评估 : "> 
               <el-input v-model="form.assessment"></el-input>
           </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="慢性病 : ">
            <el-checkbox-group 
              v-model="form.diseases"
             >
              <el-checkbox v-for="item in checkDisease" :label="item.id" :key="item.id" :value="item.id" >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="诊断 : ">
            <textarea v-model="form.diagnose" class="textarea"></textarea>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="登记人员 : ">
            <span>{{form.nurse}} 护士</span>
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-row >
         <el-col :span="24" align="center">
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">确定</el-button>
              <el-button>确定并继续新增</el-button>
              <el-button>取消</el-button>
            </el-form-item>
         </el-col>
      </el-row>
      
    </el-form>
  </div>  
</template>

<script>
import { getToken } from "@/api/qiniu";
import { getFileExtension,isCardNo,jsGetAge,isPositiveInteger,dialysisAge } from '@/utils/tools';
import { generateDialysisNo,createPatient } from '@/api/patient';

export default {
  data() {
    return {
      formSubmit:true,
      uploadData:{token:'',key:''},
      imageUrl: "https://ubmcmm.baidustatic.com/media/v1/0f000a-WueD1p8fNOLDxM6.jpg",
      dialogImageUrl: "",
      qiniuDomain:'https://images.shengws.com/',
      dialogVisible: false,
      form: {
        avatar:'https://ubmcmm.baidustatic.com/media/v1/0f000a-WueD1p8fNOLDxM6.jpg',
        patientType: '',
        dialysisNo: "",
        admissionNumber: "",
        source: "",
        partition: "",
        bed: "",
        name: "",
        gender: "",
        maritalStatus: "",
        idCardNo: "",
        birth: "",
        age: "",
        reimbursementWayID: "",
        healthCareNo: "",
        healthCareDueDate: "",
        height: "",
        blood: "",
        rh:"",
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
        contagions:[],
        doctor: "",
        nurse: "",
        assessment: "",
        diseases: [],
        diagnose:'',
        registrars:"",
      },
      typeOptions: null,
      styleOptions: null,
      sourceOptions: [
        { value: 1, label: "门诊" },
        { value: 2, label: "住院" }
      ],
      partitionOptions: null,
      sexOptions: [{ value: 1, label: "男" }, { value: 2, label: "女" }],
      maritalOptions: null,
      wayOptions: null,
      educationOptions: null,
      professionOptions: null,
      inductionOptions: null,
      doctorOptions: [
        { value: 1, label: "张三" },
        { value: 2, label: "李四" },
        { value: 3, label: "王五" },
        { value: 4, label: "麻子" }
      ],
      nurseOptions: [
        { value: 1, label: "张三" },
        { value: 2, label: "张三" },
        { value: 3, label: "李四" },
        { value: 4, label: "王五" }
      ],
      rhOptions: null,
      checkDisease: null,
      contagionList: null,
      loading:null,

      rules:{
        avatar:[
          { required: true, message: '请上传头像', trigger: 'blur' },
        ],
        patientType:[
          { required: true, message: '请选择患者类型', trigger: 'blur' },
        ],
        dialysisNo:[
          { required: true, message: '请填写透析号', trigger: 'blur' },
        ],
        admissionNumber:[
          { required: true, message: '请填写住院(门诊)号', trigger: 'blur' },
        ],
        source:[
          { required: true, message: '请选择患者来源', trigger: 'blur' },
        ],
        name:[
          { required: true, message: '请填写姓名', trigger: 'blur' },
        ],
        gender:[
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        idCardNo:[
          { required: true, message: '请填写身份证号', trigger: 'blur' },
        ],
        birth:[
          { required: true, message: '请填写生日', trigger: 'blur' },
        ] 
      }
    };
  },
  created(){
    this.styleOptions = this.$store.getters.patient_types;
    this.partitionOptions = this.$store.getters.partitions;
    this.maritalOptions = this.$store.getters.marital_options;
    this.wayOptions = this.$store.getters.reimbursement_ways;
    this.typeOptions = this.$store.getters.blood_types;
    this.rhOptions = this.$store.getters.rh;
    this.educationOptions = this.$store.getters.education_types;
    this.professionOptions = this.$store.getters.profession_options;
    this.inductionOptions = this.$store.getters.induction_options;
    this.contagionList = this.$store.getters.contagions;
    this.checkDisease = this.$store.getters.disease;
    
  },
  methods: {
    onSubmit(formName) {
      if (!this.formSubmit) {
        return false;
      }
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formSubmit = false;
            createPatient(this.form).then(response => {
              if (response.data.state==0) {
                this.$message.error(response.data.msg);
                this.formSubmit = true;
                return false;
              }else {
                this.formSubmit = false;

                this.$notify({
                  title: '成功',
                  message: '新增患者成功',
                  type: 'success',
                  duration: 2000
                })
                
                this.$refs[formName].resetFields();
                this.$router.push({path:"/patients/patient"});
                return false;
              }
            }).catch(err => {
              this.$message.error("网络异常");
              this.formSubmit = true;
              return false;
            })
          } else {
            this.formSubmit = true;
            return false;
          }
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarError(err, file, fileList){
      this.$message.error(err);
      this.loading.close();
      return false;
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = this.qiniuDomain + res.url;
      this.form.avatar = this.qiniuDomain + res.url;
      this.loading.close();
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      var fileType = file.type
      const isJPG = fileType.indexOf("image")>-1;
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
      var key = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/"  + date.getHours() + "/"  + date.getMinutes() + "/"  + date.getSeconds() + "/" + "_s_" + file.uid + "." + ext;
      this.loading = this.$loading({
          lock: true,
          text: '上传中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      
      const _self = this
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          const token = response.data.data.uptoken
          _self._data.uploadData.token = token
          _self._data.uploadData.key = key
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
          this.loading.close();
        })
      })

    },
    generatedialysisno(){
      generateDialysisNo().then(response => {
        this.form.dialysisNo = response.data.data.no + '';
      })
    },
    checkIdCardNo(){
      if(!isCardNo(this.form.idCardNo)){
        this.$message.error("身份证号码信息有误!");
        this.form.birth = '';
        return false
      }
      var thisLen = this.form.idCardNo.length;
      var birth = '';
      if (thisLen==15) {
        birth = "19"+this.form.idCardNo.substr(6,6);
      }else {
        birth = this.form.idCardNo.substr(6,8);
      }
      this.form.birth = birth.substr(0,4)+'-'+birth.substr(4,2)+'-'+birth.substr(6,2);

      this.form.age = jsGetAge(this.form.birth,'-');
    },
    hadSelectBirth(){
      this.form.age = jsGetAge(this.form.birth,'-');
    },
    checkHeight() {
      if (!isPositiveInteger(this.form.height)) {
        this.$message.error("身高请填写正整数!");
        return false
      }
    },
    selectFirstDialysisDate(){
      this.form.dialysisAge = dialysisAge(this.form.firstDialysisDate);
    }
  },
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
  position: relative;
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
    border-radius: 4px;
  }
}
</style>

