<template>
  <div>


    <div class="patient-menu">

      <el-autocomplete
        style="margin: 5px"
        popper-class="my-autocomplete"
        v-model="value"
        :fetch-suggestions="querySearchAsync"
        :trigger-on-focus="false"
        placeholder="病人名字或者透析号"
        @select="handleSelect"
       >
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
         >
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.name }}</div>
        </template>
      </el-autocomplete>



      <el-select v-model="selectID" style="margin-top:10px;text-align: center;" @change="changePatient"
                 placeholder="请选择">
        <el-option
          v-for="item in patientsList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo patient-center-menu">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>电子病历</span>
          </template>
          <router-link :to="'/patients/patient/'+this.id">
            <el-menu-item index="1-1">基本信息</el-menu-item>
          </router-link>
          <router-link :to="'/patients/patient/'+this.id+'/doctorAdvice'">
            <el-menu-item index="1-4">医嘱管理</el-menu-item>
          </router-link>
          <router-link :to="'/patients/course?id='+this.id">
            <el-menu-item index="1-2">病程管理</el-menu-item>
          </router-link>
          <router-link :to="'/patients/inspection?id='+this.id">
            <el-menu-item index="1-3">检验检查</el-menu-item>
          </router-link>
          <router-link :to="'/patients/rescue?id='+this.id">
            <el-menu-item index="1-5">抢救记录</el-menu-item>
          </router-link>
          <!-- <router-link :to="'/patients/patient/'+this.id+'/weight'">
              <el-menu-item  index="2-5">干体重</el-menu-item>
          </router-link> -->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>透析管理</span>
          </template>
          <router-link :to="'/patients/patient/'+this.id+'/dialysisSolution'">
            <el-menu-item index="2-1">长期透析处方</el-menu-item>
          </router-link>
          <router-link :to="'/patients/patient/'+this.id+'/dialysisRecord'">
            <el-menu-item index="2-2">透析记录</el-menu-item>
          </router-link>
          <router-link :to="'/patients/patient/'+this.id+'/scheduling'">
            <el-menu-item index="2-4">排班信息</el-menu-item>
          </router-link>
          <router-link :to="'/patients/patient/'+this.id+'/proeducation'">
            <el-menu-item index="2-5">宣教信息</el-menu-item>
          </router-link>
          <!-- <router-link :to="'/patients/patient/'+this.id+'/weight'">
              <el-menu-item  index="2-5">干体重</el-menu-item>
          </router-link> -->
        </el-submenu>
     
      </el-menu>
    </div>
    <div class="patient-app-container app-container">
      <span>姓名：{{currentPatient.name}} &nbsp;&nbsp; 性别：{{tranSex(currentPatient.gender)}} &nbsp;&nbsp; 年龄：{{tranAge(currentPatient.birthday)}} &nbsp;&nbsp; 透析号：{{currentPatient.dialysis_no}} </span>
    </div>
  </div>

</template>
<script>

  import {fetchAllList,PostSearch} from "@/api/patient";
  import {jsGetAge, uParseTime} from "@/utils/tools";

  export default {
    name: "patientSidebar",
    value:'',
    searchArray:[],
    props: {
      id: 0,
      defaultActive: {
        type: String,
        default: '1-1',
      },

    },
    data() {
      return {
        thedefaultActive: 1,
        patientsList: null,
        currentPatient: {},
        selectID: 0,
        keyword:'',
        value:'',
      }
    },
    methods: {
      changePatient(value) {
        console.log(value)
        this.$router.push("/patients/patient/" + value);
      },
      getList() {
        fetchAllList().then(response => {
          if (response.data.state == 1) {
            this.patientsList = response.data.data.patients;
            var len = this.patientsList.length;
            if (len > 0) {
              for (let index = 0; index < len; index++) {
                if (this.patientsList[index].id == this.id) {
                  this.currentPatient = this.patientsList[index];

                  this.selectID = this.patientsList[index].id;
                  this.$emit('tran-patient', this.currentPatient);
                  break;
                }
              }
            }
          }
        });
      },
      tranAge(birthday) {
        var birth = uParseTime(birthday, '{y}-{m}-{d}');
        return jsGetAge(birth, '-');
      },
      tranSex(gender) {
        var sex = "未知";
        switch (gender) {
          case 1:
            sex = "男"
            break;
          case 2:
            sex = "女"
            break;
          default:
            break;
        }
        return sex;
      },querySearchAsync(keyword,cb){
        let key = ""
        if(keyword != undefined){
          key = keyword
        }
        let searchArray = []
        PostSearch(key).then(response => {
          if (response.data.state == 1) {
            searchArray =response.data.data.patient
            cb(searchArray)
          }else{
            this.$message.error(response.data.msg);
            cb([])

          }

        });

      },handleSelect(val){
        this.$router.push("/patients/patient/" + val.id);


      }

    },
    created() {
      this.getList();
    },
  };
</script>

<style>

  .patient-menu {
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: relative;
    font-size: 0px;
    top: 0;
    float: left;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .patient-center-menu .el-icon-arrow-down:before {
    content: '';
  }

  .patient-app-container {
    margin-left: 180px;
    padding-left: 20px;
  }
</style>
