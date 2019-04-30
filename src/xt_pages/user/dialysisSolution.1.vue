<template>
  <div class="patient-container">
   <patient-sidebar :id="patientID" defaultActive="2-1"></patient-sidebar>
   <div class="patient-app-container app-container">
    <div class="Total">
      <!-- <div class="plan" >透析计划</div> -->
      <table-title title="透析计划"></table-title>
      <div class="sum">
        <!-- <span>透析总频率:<el-input :value="totalrate" disabled style="width:180px"></el-input></span> -->
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="openNew">新增计划</el-button>
      </div> 
    </div> 
    <el-table ref="solutionTable" :data="tableData" border fit highlight-current-row 
     @current-change="tableCurrentChange"
     style="width: 100%">
      <el-table-column
      type="index" 
        align="center"
        label="序号"
        min-width="60">
      </el-table-column>
       <el-table-column
        prop="mode_name"
        align="center"
        label="透析模式"
        min-width="50">
        <template slot-scope="scope" >
            <span v-if="scope.row.parent_id === 0" >{{scope.row.mode_name}}</span>
            <span v-else >--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="period"
        label="频率"
        align="center"
        min-width="50">
        <template slot-scope="scope" >
            <span v-if="scope.row.parent_id === 0" >{{scope.row.period}}{{scope.row.times}}</span>
            <span v-else >--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="处方名" 
        align="center"
        min-width="50">
        <template slot-scope="scope" >
            <span >{{scope.row.name}}{{scope.row.sub_name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="doctor"
        label="医生"
        align="center"
        min-width="110">
        <template slot-scope="scope" >
            <span >{{getDoctorName(scope.row.doctor)}}</span>
        </template>

     </el-table-column>
     
     <el-table-column
        prop="updated_time"
        align="center"
        label="更新日期"
        min-width="60">
        <template slot-scope="scope">
          <span>{{scope.row.updated_time | parseTime('{y}-{m}-{d}')}}</span>
        </template>
     </el-table-column>
     <el-table-column
        prop="state"
        label="状态"
        align="center"
        min-width="40">
        <template slot-scope="scope" >
            <span v-if="scope.row.initiate_mode==1">启用</span>
            <span v-else-if="scope.row.initiate_mode==2">停用</span>
            <span v-else>未知</span>
          </template>
     </el-table-column>
     <el-table-column label="操作" align="center" min-width="140">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="openEdit(scope.$index, scope.row)" v-if="scope.row.parent_id===0">编辑</el-button>
          
        <el-button
          size="mini"
          type="primary"
          @click="openChildEdit(scope.$index, scope.row)" v-else>编辑</el-button>

        <el-button
          size="mini"
          type="success"
          @click="openNewChild(scope.$index, scope.row)" v-if="scope.row.parent_id===0">新增</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
   </el-table>
  <div style="margin-top:30px;">
    <div class="Total">
      <div class="sure">
        <el-button type="text" v-if="solution_detail.affirm_state==1" size="small" icon="el-icon-success">已确认</el-button> 
        <el-button type="text" v-else size="small" style="color:#E6A23C"  icon="el-icon-error">未确认</el-button> 

        <el-button type="primary" :disabled="solution_detail.id>0?false:true" @click="submitSolution('solution_detail')" size="small" icon="el-icon-check">确认</el-button>

      </div>
      <div class="plan">
        <span>透析处方名:{{current_solution.name}}{{current_solution.sub_name}}</span>
        <span>频率:{{current_solution.period}}{{current_solution.times}}</span>
        <span>医生:{{getDoctorName(current_solution.doctor)}}</span>
      </div>
    </div> 
    <el-form ref="solution_detail" :model="solution_detail"  class="form-table" label-width="160px" style="padding-top:22px;">
     <el-row :gutter="20"  > 
        <el-col style="" :span="6"  >
          <el-form-item label="透析时长（h）:">
            <el-input v-model="solution_detail.dialysis_duration"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="" :span="6" >
          <el-form-item label="置换方式:" >
            <el-select v-model="solution_detail.replacement_way" :disabled="current_model.replacement_way==1?false:true" >
              <el-option v-for="item in replacementWays"  :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="" :span="6" >
          <el-form-item label="收费套餐:">
            <el-select v-model="solution_detail.mode_id" disabled >
              <el-option v-for="item in modeOptions"  :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col style="" :span="6" >
          <el-form-item label="血流量:">
            <el-input v-model="solution_detail.blood_flow_volume" :disabled="current_model.blood_flow_volume==1?false:true"></el-input>
          </el-form-item>
        </el-col>
      <el-col style="" :span="6">
         <el-form-item label="血透器:">
            <el-select v-model="solution_detail.hemodialysis_machine" placeholder="" :disabled="current_model.hemodialysis_machine==1?false:true">
              <el-option v-for="item in hemodialysis_machines"  :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
      </el-col>
      <el-col style="" :span="6">
        <el-form-item label="血滤器:" >
            <el-select v-model="solution_detail.blood_filter" placeholder="" :disabled="current_model.blood_filter==1?false:true">
              <el-option v-for="item in blood_filters"  :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
      </el-col>
      <el-col style="" :span="6">
        <el-form-item label="灌流器:">
            <el-select v-model="solution_detail.perfusion_apparatus" placeholder=""  :disabled="current_model.perfusion_apparatus==1?false:true">
              <el-option v-for="item in perfusion_apparatus"  :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
      </el-col>
      <el-col style="" :span="6">
        <el-form-item label="透析液流量（ml/min）: " :disabled="current_model.dialysate_flow==1?false:true">
            <el-input v-model="solution_detail.dialysate_flow"></el-input>
        </el-form-item>
      </el-col>
        <el-col style="" :span="6">
          <el-form-item label="钾（mmol/L）: ">
            <el-input v-model="solution_detail.kalium" :disabled="current_model.kalium==1?false:true"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="" :span="6">
          <el-form-item label="钠（mmol/L）: ">
            <el-input v-model="solution_detail.sodium" :disabled="current_model.sodium==1?false:true"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="" :span="6">
          <el-form-item label="钙（mmol/L）: ">
            <el-input v-model="solution_detail.calcium" :disabled="current_model.calcium==1?false:true"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="" :span="6" >
           <el-form-item label="碳酸氢根（mmol/L）: ">
             <el-input v-model="solution_detail.bicarbonate" :disabled="current_model.bicarbonate==1?false:true"></el-input>
           </el-form-item>
        </el-col>
       
        <el-col style="" :span="6">
          <el-form-item label="抗凝剂:">
            <el-select v-model="solution_detail.anticoagulant" @change="changeThisAnticoagulant" >
              <el-option v-for="item in anticoagulantsConfit"  :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
        </el-col>
        <el-col style="" :span="6" v-if="anticoagulant.shouji != -1">
            <el-form-item :label="'首剂（'+anticoagulant.shouji_unit+'）: '">
             <el-input v-model="solution_detail.anticoagulant_shouji" :disabled="anticoagulant.shouji==1?false:true"></el-input>
            </el-form-item>
        </el-col>
        <el-col style="" :span="6" v-if="anticoagulant.weichi != -1">
            <el-form-item :label="'维持（'+anticoagulant.weichi_unit+'）: '">
             <el-input v-model="solution_detail.anticoagulant_weichi" :disabled="anticoagulant.weichi==1?false:true"></el-input>
            </el-form-item>
        </el-col>
        <el-col style="" :span="6"  v-if="anticoagulant.zongliang != -1">
            <el-form-item :label="'总量（'+anticoagulant.zongliang_unit+'）: '">
             <el-input v-model="solution_detail.anticoagulant_zongliang" :disabled="anticoagulant.zongliang==1?false:true" ></el-input>
            </el-form-item>
        </el-col>
        <el-col style="" :span="6"  v-if="anticoagulant.gaimingcheng != -1">
            <el-form-item :label="'钙（'+anticoagulant.gaimingcheng_unit+'）: '">
             <el-input v-model="solution_detail.anticoagulant_gaimingcheng" :disabled="anticoagulant.gaimingcheng==1?false:true" placeholder="钙名称" ></el-input>
            </el-form-item>
        </el-col>
        <el-col style="" :span="6"  v-if="anticoagulant.gaijiliang != -1">
            <el-form-item >
             <el-input v-model="solution_detail.anticoagulant_gaijiliang" :disabled="anticoagulant.gaijiliang==1?false:true"  placeholder="钙剂量"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>  

  </div>

  <el-dialog
    :title="isEdit?'编辑透析方案':'新增透析方案'"
    :visible.sync="dialogVisible"
    width="700px">
    <el-form ref="addPlan" :model="addPlan" :rules="addPlanRules" label-width="85px">
      <el-row :gutter="20"> 
        <el-col style="" :span="12"  >
            <el-form-item label="透析模式:" prop="mode">
              <el-select v-model="addPlan.mode" @change="addPlanModeChange" :disabled="isEdit?true:false" >
                <el-option v-for="item in modeOptions"  :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col style="" :span="12"  >
            <el-form-item label="频率:" prop="type">
              <el-radio-group v-model="addPlan.type">
                <el-radio v-for="item in timeOptions" @change="addPlanTypeChange"  :label="item.value" :key="item.value" :value="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-col>

      </el-row>

      
      
      <el-form-item label="周期:" prop="period" >
        <el-select v-model="addPlan.period" >
          <el-option v-for="item in periodOptions"  :label="item.label" :key="item.value" :value="item.value"></el-option>                    
        </el-select>
      </el-form-item>
      <el-form-item label="次数:" prop="times" >
        <el-select v-model="addPlan.times" >
          <el-option v-for="item in numOptions"  :label="item.label" :key="item.value" :value="item.value"></el-option>                    
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" prop="initiate_mode" >
        <el-select v-model="addPlan.initiate_mode" >
          <el-option v-for="item in stateOptions"  :label="item.label" :key="item.value" :value="item.value"></el-option>                              
        </el-select>
      </el-form-item>
      <el-form-item label="医生:" prop="doctor">
          <el-select v-model="addPlan.doctor" >
          <el-option v-for="item in doctorOptions"  :label="item.name" :key="item.id" :value="item.id"></el-option>                                        
        </el-select>
      </el-form-item>
      
      <el-form-item label="首次透析:" prop="first_dialysis" v-if="addPlan.type==2">
        <el-date-picker v-model="addPlan.first_dialysis" type="date" placeholder="选择日期" :suffix-icon="'el-icon-menu'" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
     </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="submitEditSolution('addPlan')" v-if="isEdit">确 定</el-button>
        <el-button type="primary" @click="submitNewSolution('addPlan')" v-else>确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
  </el-dialog>
  
  <el-dialog :title="isChildEdit?'编辑子方案':'新增子方案'" width="40%" :visible.sync="dialogFormVisible" >
    <el-form :model="childPlan" ref="childPlan" :rules="addChildPlanRules" :label-width="formLabelWidth" >
      <el-form-item label="透析模式:"  >
        <el-input v-model="childPlan.mode" :disabled="true" style="width:40%;"></el-input>
      </el-form-item>
      <el-form-item label="频率:"  >
        <el-input v-model="childPlan.frequency" :disabled="true" style="width:40%;" ></el-input>
      </el-form-item>
      <el-form-item label="处方名:" prop="sub_name" >
        <el-input v-model="childPlan.name" :disabled="true" style="width:19%;" ></el-input>
        <el-input v-model="childPlan.sub_name" placeholder="请输入数字" style="width:19%;" :disabled="isChildEdit?true:false" ></el-input>
      </el-form-item>
      <el-form-item label="状态:" prop="initiate_mode" >
        <el-select v-model="childPlan.initiate_mode" >
          <el-option v-for="item in stateOptions"  :label="item.label" :key="item.value" :value="item.value"></el-option>                                                  
        </el-select>
      </el-form-item>
      <el-form-item label="医生:" prop="doctor" >
        <el-select v-model="childPlan.doctor" >
          <el-option v-for="item in doctorOptions"  :label="item.name" :key="item.id" :value="item.id"></el-option>                                                         
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" @click="submitEditChildSolution('childPlan')" v-if="isChildEdit">确 定</el-button>
      <el-button type="primary" @click="submitNewChildSolution('childPlan')" v-else>确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import tableTitle from "./components/tableTitle";
import PatientSidebar from './components/PatientSidebar';
import { fetchAllDoctorAndNurse } from "@/api/doctor";
import {createPatientDialysisSolution,fetchPatientDialysisSolutions,editPatientDialysisSolution,createChildPatientDialysisSolution,editChildPatientDialysisSolution,editDialysisSolutionDetail,deleteDialysisSolution} from "@/api/patient";
import {uParseTime,calculateAnticoagulantZL} from "@/utils/tools";

const periodWeek = [
  { value: "每周", label: "每周" },
  { value: "两周", label: "两周" },
  { value: "三周", label: "三周" },
  { value: "四周", label: "四周" },
];
const periodDay = [
  { value: "2天", label: "2天" },
  { value: "3天", label: "3天" },
  { value: "4天", label: "4天" },
  { value: "5天", label: "5天" },
  { value: "10天", label: "10天" },
  { value: "15天", label: "15天" },
  { value: "30天", label: "30天" },
];
const numOptionsWeek = [
  { value: "1次", label: "1次" }, 
  { value: "2次", label: "2次" },
  { value: "3次", label: "3次" },
  { value: "4次", label: "4次" },
  { value: "5次", label: "5次" },
  { value: "6次", label: "6次" },
  { value: "7次", label: "7次" },
];
const numOptionsDay = [
  { value: "1次", label: "1次" }, 
];

export default {
  name: "Dialysis",
  data() {
    var checkFirstDialysis = (rule, value, callback)=>{
      if (this.addPlan.type == 2 && !value) {
        return callback(new Error('请选择首次透析！'));
      }
      callback();
    };
    var checkSubName = (rule, value, callback)=>{
      var pattern = /^\d*$/
      if (!pattern.test(value)) {
        return callback(new Error('只填写0-9的数字'));
      }
      callback();
    };
    return {
      isEdit:false,
      isChildEdit:false,
      totalrate:"无/两周一次",
      patientID:0,
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      formInputWidth: "80px",
      total:0,
      tableData: null,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      addPlan: {
        mode:"",
        mode_name:"",
        sub_name:"",
        id:0,
        parent_id:0,
        type: "",
        period: "",
        times: "",
        initiate_mode:"",
        doctor: "",
        first_dialysis:"",
      },
      childPlan: {
        mode: "",
        frequency: "",
        name: "",
        parent_id:0,
        sub_name: "",
        initiate_mode: "",
        doctor: ""
      },
      modeOptions: null,
      anticoagulantsSet: {
        type:1,
      },
      replacementWays: null,
      anticoagulantsConfit: null,
      timeOptions: [
        { value: 1, label: "按周" },
        { value: 2, label: "按日" }
      ],
      periodOptions: periodWeek,
      numOptions: numOptionsWeek,
      stateOptions: [
        { value: 1, label: "启用" },
        { value: 2, label: "停用" }
      ],
      doctorOptions: null,
      current_index:-1,
      addPlanRules:{
        mode:[{ required: true, message: "请选择透析模式", trigger: "blur" }],
        type:[{ required: true, message: "请选择频率", trigger: "blur" }],
        period:[{ required: true, message: "请选择周期", trigger: "blur" }],
        times:[{ required: true, message: "请选择次数", trigger: "blur" }],
        initiate_mode:[{ required: true, message: "请选择状态", trigger: "blur" }],
        doctor:[{ required: true, message: "请选择医生", trigger: "blur" }],
        first_dialysis:[{ validator: checkFirstDialysis, trigger: "blur" }],
      },
      addChildPlanRules:{
        sub_name:[{ required: true, message: "请填写处方名", trigger: "blur" },{validator:checkSubName,trigger:"blur"}],
        initiate_mode:[{ required: true, message: "请选择状态", trigger: "blur" }],
        doctor:[{ required: true, message: "请选择医生", trigger: "blur" }],
      },
      current_model:{id:0, name:"",dialysis_duration:2, replacement_way:2,hemodialysis_machine:2,blood_filter:2,perfusion_apparatus:2,blood_flow_volume:2,dialysate_flow:2,kalium:2,sodium:2,calcium:2,bicarbonate:2},
      current_solution:{
        id:0,
        name:"",
        sub_name:"",
        period:"",
        times:"",
        doctor:0,
      },
      anticoagulant:{id:0, name:"", type:1, shouji:1, weichi:1, zongliang:1, gaimingcheng:-1, gaijiliang:-1, shouji_unit:"mg", weichi_unit:"mg/h", zongliang_unit:"mg", gaimingcheng_unit:"", gaijiliang_unit:""},
      blood_filters:null,
      perfusion_apparatus:null,
      hemodialysis_machines:null,
      solution_detail:{
        id:0,
        affirm_state:0,
        dialysis_duration:"",
        replacement_way:"",
        mode_id:"",
        blood_flow_volume:"",
        hemodialysis_machine:"",
        blood_filter:"",
        perfusion_apparatus:"",
        dialysate_flow:"",
        kalium:"",
        sodium:"",
        calcium:"",
        bicarbonate:"",
        anticoagulant:"",
        anticoagulant_shouji:"",
        anticoagulant_weichi:"",
        anticoagulant_zongliang:"",
        anticoagulant_gaimingcheng:"",
        anticoagulant_gaijiliang:"",
      },
    };
  },
  watch:{
    "solution_detail.dialysis_duration":function(){
      this.solution_detail.anticoagulant_zongliang=calculateAnticoagulantZL(this.anticoagulantsSet.type,
      this.solution_detail.anticoagulant_shouji,
      this.solution_detail.dialysis_duration,
      this.solution_detail.anticoagulant_weichi
      );
    },
    "solution_detail.anticoagulant_shouji":function(){
      this.solution_detail.anticoagulant_zongliang=calculateAnticoagulantZL(this.anticoagulantsSet.type,
      this.solution_detail.anticoagulant_shouji,
      this.solution_detail.dialysis_duration,
      this.solution_detail.anticoagulant_weichi
      );
    },
    "solution_detail.anticoagulant_weichi":function(){
      this.solution_detail.anticoagulant_zongliang=calculateAnticoagulantZL(this.anticoagulantsSet.type,
      this.solution_detail.anticoagulant_shouji,
      this.solution_detail.dialysis_duration,
      this.solution_detail.anticoagulant_weichi
      );
    },
  },
  components: {
    tableTitle,PatientSidebar
  },
  methods: {
    tableCurrentChange(current){
      if (typeof(current)=='undefined' || current == null) {
        this.current_solution={
          id:0,
          name:"",
          sub_name:"",
          period:"",
          times:"",
          doctor:0,
        };
        this.solution_detail={
          id:0,
          affirm_state:0,
          dialysis_duration:"",
          replacement_way:"",
          mode_id:"",
          blood_flow_volume:"",
          hemodialysis_machine:"",
          blood_filter:"",
          perfusion_apparatus:"",
          dialysate_flow:"",
          kalium:"",
          sodium:"",
          calcium:"",
          bicarbonate:"",
          anticoagulant:"",
          anticoagulant_shouji:"",
          anticoagulant_weichi:"",
          anticoagulant_zongliang:"",
          anticoagulant_gaimingcheng:"",
          anticoagulant_gaijiliang:"",
        };
        return;
      }
      this.current_solution = current;
      this.setCurrentMode(current.mode_id);
      this.solution_detail={
        id:this.current_solution.id,
        affirm_state:this.current_solution.affirm_state,
        dialysis_duration:this.current_solution.dialysis_duration!=0?this.current_solution.dialysis_duration:"",
        replacement_way:this.current_solution.replacement_way != 0?this.current_solution.replacement_way:"",
        mode_id:this.current_solution.mode_id,
        blood_flow_volume:this.current_solution.blood_flow_volume != 0?this.current_solution.blood_flow_volume:"",
        hemodialysis_machine:this.current_solution.hemodialysis_machine!=0?this.current_solution.hemodialysis_machine:"",
        blood_filter:this.current_solution.blood_filter!=0?this.current_solution.blood_filter:"",
        perfusion_apparatus:this.current_solution.perfusion_apparatus!=0?this.current_solution.perfusion_apparatus:"",
        dialysate_flow:this.current_solution.dialysate_flow!=0?this.current_solution.dialysate_flow:"",
        kalium:this.current_solution.kalium!=0?this.current_solution.kalium:"",
        sodium:this.current_solution.sodium!=0?this.current_solution.sodium:"",
        calcium:this.current_solution.calcium!=0?this.current_solution.calcium:"",
        bicarbonate:this.current_solution.bicarbonate!=0?this.current_solution.bicarbonate:"",
        anticoagulant:this.current_solution.anticoagulant!=0?this.current_solution.anticoagulant:"",
        anticoagulant_shouji:this.current_solution.anticoagulant_shouji!=0?this.current_solution.anticoagulant_shouji:"",
        anticoagulant_weichi:this.current_solution.anticoagulant_weichi!=0?this.current_solution.anticoagulant_weichi:"",
        anticoagulant_zongliang:this.current_solution.anticoagulant_zongliang!=0?this.current_solution.anticoagulant_zongliang:"",
      };

    },
    handleDelete(index, row) {
      if (row.use_state==1) {
        this.$message.error("方案已被使用，不能删除");
        return false;
      }
      this.$confirm('确定删除'+row.name+row.sub_name+'方案吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDialysisSolution(row.id).then(response=>{
          if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              } else {
                this.$notify({
                  title: "成功",
                  message: "修改方案成功",
                  type: "success",
                  duration: 2000
                });
                // this.tableData.splice(index,1);
                if (row.parent_id>0) {
                  this.tableData.splice(index,1);
                }else {
                    var resetTableData = this.tableData;
                    this.tableData = [];
                    var that = this;
                    resetTableData.forEach(function(item, itemindex){
                        if (item.id != row.id && item.parent_id != row.id) {
                            that.tableData.push(item);
                        }
                    });
                }
                
              }
        });
      });
    },
    submitSolution(formName){
      editDialysisSolutionDetail(this.patientID, this.solution_detail.id, this.solution_detail).then(response=>{
        if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.$notify({
                title: "成功",
                message: "修改方案成功",
                type: "success",
                duration: 2000
              });
              var thisSolution = response.data.data.solution;
              var spliceIndex = -1;
 
              for (let index = this.tableData.length-1; ; index--) {
                if(this.tableData[index].id === thisSolution.id) {
                  spliceIndex = index;
                  break;
                }
              }

              if (spliceIndex > -1) {
                var newIndex = spliceIndex + 1;
                if (newIndex === this.tableData.length) {
                  this.tableData.pop();
                  this.tableData.push(thisSolution);
                }else {
                  var swapData = this.tableData.splice(newIndex);
                  this.tableData.pop();
                  this.tableData.push(thisSolution);
                  this.tableData = this.tableData.concat(swapData);
                }
              }
              this.solution_detail.affirm_state = thisSolution.affirm_state;
              this.$refs.solutionTable.setCurrentRow(this.tableData[spliceIndex]);
            }
      });
    },
    submitEditChildSolution(formName){
      this.$refs[formName].validate(valid=>{
        if(valid) {
          var editData = {
            initiate_mode: this.childPlan.initiate_mode,
            doctor:this.childPlan.doctor
          }
          editChildPatientDialysisSolution(this.patientID, this.childPlan.id, editData).then(response=>{
            if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                } else {
                  this.$notify({
                    title: "成功",
                    message: "修改方案成功",
                    type: "success",
                    duration: 2000
                  });
                  this.$refs[formName].resetFields();
                  this.dialogFormVisible = false;
                  this.tableData[this.current_index].doctor = response.data.data.solution.doctor;
                  this.tableData[this.current_index].updated_time = response.data.data.solution.updated_time;
                  this.tableData[this.current_index].initiate_mode = response.data.data.solution.initiate_mode;
                  this.current_index = -1;
                  return false;
                }
          });
        }
      });
    },
    submitNewChildSolution(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid) {
          var createData = {
            parent_id: this.childPlan.parent_id,
            sub_name: this.childPlan.sub_name,
            initiate_mode: this.childPlan.initiate_mode,
            doctor:this.childPlan.doctor
          }
          createChildPatientDialysisSolution(this.patientID,createData).then(response=>{
            if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                } else {
                  this.$notify({
                    title: "成功",
                    message: "创建方案成功",
                    type: "success",
                    duration: 2000
                  });
                  this.$refs[formName].resetFields();
                  var spliceIndex = -1;
 
                  for (let index = this.tableData.length-1; ; index--) {
                    if(this.tableData[index].parent_id === createData.parent_id) {
                      spliceIndex = index;
                      break;
                    }else if (this.tableData[index].id === createData.parent_id) {
                      spliceIndex = index;
                      break;
                    }
                  }

                  if (spliceIndex > -1) {
                    spliceIndex += 1;
                    if (spliceIndex === this.tableData.length) {
                      this.tableData.push(response.data.data.solution);
                    }else {
                      var swapData = this.tableData.splice(spliceIndex);
                      this.tableData.push(response.data.data.solution);
                      this.tableData = this.tableData.concat(swapData);
                    }
                  } 
                  this.dialogFormVisible = false;
                  return false;
                }
          });
        }
      });

    },
    submitEditSolution(formName){
      this.$refs[formName].validate(valid=>{
        if(valid) {
          editPatientDialysisSolution(this.patientID,this.addPlan.id, this.addPlan).then(response=>{
            if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                } else {
                  this.$notify({
                    title: "成功",
                    message: "修改方案成功",
                    type: "success",
                    duration: 2000
                  });
                  this.$refs[formName].resetFields();

                  this.dialogVisible = false;
                  this.tableData[this.current_index].period = response.data.data.solution.period;
                  this.tableData[this.current_index].times = response.data.data.solution.times;
                  this.tableData[this.current_index].doctor = response.data.data.solution.doctor;
                  this.tableData[this.current_index].updated_time = response.data.data.solution.updated_time;
                  this.tableData[this.current_index].initiate_mode = response.data.data.solution.initiate_mode;

                  this.current_index = -1;
                  return false;
                }
          });
        }
      });
    },
    submitNewSolution(formName){
      this.$refs[formName].validate(valid=>{
        if(valid) {
          createPatientDialysisSolution(this.patientID,this.addPlan).then(response=>{
            if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                } else {
                  this.$notify({
                    title: "成功",
                    message: "创建方案成功",
                    type: "success",
                    duration: 2000
                  });
                  this.$refs[formName].resetFields();

                  this.dialogVisible = false;
                  this.tableData.push(response.data.data.solution);
                  return false;
                }
          });
        }
      });

    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    openEdit(index, row) {
      this.current_index = index;
      
      this.addPlan.id = row.id
      this.addPlan.mode = row.mode_id
      this.addPlan.mode_name = row.mode_name
      this.addPlan.parent_id = row.parent_id
      this.addPlan.type = row.type
      this.addPlan.period = row.period
      this.addPlan.times = row.times
      this.addPlan.initiate_mode = row.initiate_mode
      this.addPlan.doctor = row.doctor
      this.addPlan.first_dialysis = uParseTime(row.first_dialysis, "{y}-{m}-{d}");
     
      this.addPlanTypeChange();
      this.dialogVisible = true;
      this.isEdit=true;
    },
    openNew(){
      this.current_index = -1;
      this.addPlan = {
        mode:"",
        mode_name:"",
        id:0,
        type: 1,
        period: "",
        times: "",
        initiate_mode:"",
        doctor: "",
        first_dialysis:"",
      };
      this.addPlanTypeChange();
     
      this.dialogVisible = true;
      this.isEdit=false;
    },
    openNewChild(index, row){
      this.childPlan = {
        mode: row.mode_name,
        frequency: row.period + row.times,
        name: row.name,
        parent_id:row.id,
        sub_name: "",
        initiate_mode: "",
        doctor: ""
      }
      this.isChildEdit = false;
      this.dialogFormVisible = true;
    },
    openChildEdit(index, row) {
      this.childPlan = {
        mode: row.mode_name,
        frequency: row.period + row.times,
        name: row.name,
        parent_id:row.parent_id,
        id:row.id,
        sub_name: row.sub_name,
        initiate_mode: row.initiate_mode,
        doctor: row.doctor
      }
      this.current_index = index;
      this.isChildEdit = true;
      this.dialogFormVisible = true;
    },
    fetchAllDoctorAndNurse() {
      fetchAllDoctorAndNurse().then(response => {
        if (response.data.state == 1) {
          this.doctorOptions = response.data.data.doctors;
        }
      });
    },
    fetchPatientDialysisSolutions(){
      fetchPatientDialysisSolutions(this.patientID).then(response=>{
        if (response.data.state == 1) {
          this.tableData = response.data.data.solutions;
        } 
      });
    },
    addPlanTypeChange(){
      if (this.addPlan.type == 1) {
        this.periodOptions = periodWeek;
        this.numOptions = numOptionsWeek;

      }else {
        this.addPlan.type == 2;
        this.periodOptions = periodDay;
        this.numOptions = numOptionsDay;
      }

    },
    changeThisAnticoagulant(){
      var thismode = parseInt(this.solution_detail.anticoagulant);
      if (isNaN(thismode) || thismode <=0) {
        return false;
      }
      if (typeof(this.anticoagulantsConfit[thismode]) == 'undefined' || this.anticoagulantsConfit[thismode]==null) {
        return false;
      }
      this.anticoagulant = this.anticoagulantsConfit[thismode];
    },

    addPlanModeChange(){
      var thismode = parseInt(this.addPlan.mode);
      if (isNaN(thismode) || thismode <=0) {
        return false;
      }
      if (typeof(this.modeOptions[thismode]) == 'undefined' || this.modeOptions[thismode]==null) {
        return false;
      }
      // this.current_model = this.modeOptions[thismode];
      this.addPlan.mode_name = this.modeOptions[thismode].name;
    },
    setCurrentMode(id){
      if (typeof(this.modeOptions[id]) == 'undefined' || this.modeOptions[id]==null) {
        return false;
      }
      this.current_model = this.modeOptions[id];
    },
    getDoctorName(doctorid){
      var name = "";
      if (this.doctorOptions==null) {
        return name;
      }
      if (typeof(this.doctorOptions.length) == "undefined") {
        return name;
      }
      var leng = this.doctorOptions.length;
      if (leng==0) {
         return name;
      }

      for (let index = 0; index < leng; index++) {
        if (this.doctorOptions[index].id == doctorid) {
          name = this.doctorOptions[index].name;
          break;
        }
      }

      return name;

    }
  }, 
  created(){
    const id = this.$route.params && this.$route.params.id;
    this.patientID = parseInt(id);
    if (isNaN(this.patientID) || this.patientID <= 0) {
        this.$notify.error({
          title: "错误",
          message: "无效的id"
        });
        this.$router.back(-1);
      }
    
    this.modeOptions = this.$store.getters.treatment_mode;
    this.anticoagulantsSet = this.$store.getters.anticoagulants_set;
    this.replacementWays = this.$store.getters.replacement_ways;
    this.anticoagulantsConfit = this.$store.getters.anticoagulants_confit;
    this.blood_filters = this.$store.getters.blood_filters;
    this.perfusion_apparatus = this.$store.getters.perfusion_apparatus;
    this.hemodialysis_machines = this.$store.getters.hemodialysis_machines;
    
    
    this.fetchAllDoctorAndNurse();
    this.fetchPatientDialysisSolutions();

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.Total {
  .sure {
    float: right;
    margin: 5px 10px 0 0;
  }
  .plan {
    font-size: 15px;
    color: #6caef7;
    background: #ecf5ff;
    height: 42px;
    line-height: 42px;
    border: 1px #ebeef5 solid;
    width: 100%;
    padding-left: 15px;
    span {
      margin: 0 20px 0 0;
    }
  }
  .sum {
    border: 1px #ebeef5 solid;
    border-top: none;
    border-bottom: none;
    padding: 10px 0 10px 15px;
    font-size: 15px;
    color: #909399;
  }
}
.form-table {
  border: 1px #ebeef5 solid;
  padding-bottom: 20px;
  .el-col-6{
    width: 380px;
  }
  .el-row {
    margin: 0 !important;
    .el-form-item {
      margin-bottom: 12px;
      .el-form-item__content {
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>

