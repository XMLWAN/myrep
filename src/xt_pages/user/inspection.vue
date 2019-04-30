<template>
  <div class="patient-container">
    <patient-sidebar :id="patientID" defaultActive="1-3" ></patient-sidebar>
    <div class="patient-app-container app-container" v-loading="pageLoading" element-loading-text="拼命加载中">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-table :data="projects" border style="width: 100%" highlight-current-row @current-change="handleCurrentChange" ref="singleTable" >
            <el-table-column label="检验检查项目">
              <el-table-column
                prop="project_name"
                label="检验项目"
                align="center">
              </el-table-column>
              <el-table-column
                prop="count"
                label="次数"
                width="80"
                align="center">
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="17" v-loading="itemLoading">
          <div class="filter-container" style="float:right">
            <el-button class="filter-item" type="primary" @click="openNew()" icon="el-icon-plus" :disabled="project?false:true">新增</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="openEdit()" :disabled="itemDate?false:true">修改</el-button>
            <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="deleteInspection()" :disabled="itemDate?false:true">删除</el-button>
          </div>
          <div class="filter-container" >
            <el-button class="filter-item" type="text" style="color:#000">{{itemName}} <span v-if="itemDate">（检查日期：{{itemDate}}）</span></el-button>
          </div>
          <el-table
            :data="items" border style="width: 100%" id="user-inspection-order"  >
         
            <el-table-column
              prop="item_name"
              label="检验项目"
              min-width="180">
              <template slot-scope="scope">
                {{scope.row.item_name}} {{scope.row.item_name_addition}}
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="结果"
              min-width="80">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
                <span v-if="scope.row.range_type==1">{{scope.row.value_direction}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="参考值"
              min-width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.range_type==1">{{scope.row.range_min}}~{{scope.row.range_max}}</span>
                <span v-else>{{scope.row.range_value}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              min-width="80">
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChangePage"
            :current-page="queryParams.page"
            :page-size="1"
            background
            style="margin-top:20px;"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="900px" id="user-inspection-form" v-loading="formLoading">
      <el-form :model="form"  ref="form" label-position="top">
        <el-row >
          <el-col :span="7" >
            <el-form-item label="检验日期" prop="inspect_date" :rules="[
                  { required: true, message: '请输入检验日期', trigger: 'blur' },
                ]" >
              <el-date-picker style="width:95%"
                v-model="form.inspect_date"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
                :readonly="form.method=='add'?false:true"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>

          <template v-for="(item, index) in form.formItem" >
            <el-col :span="7" :key="index">
              <el-form-item :label="item.item_name" v-if="item.range_type==1"  :key="item.item_id" :prop="'formItem.' + index + '.value'" 
             >
                <el-input placeholder="请填入" v-model="item.value" style="width:95%" type="number">
                  <template slot="append">{{item.unit}}</template>
                </el-input>
              </el-form-item> 
              <el-form-item :label="item.item_name" v-else :key="item.item_id" :prop="'formItem.' + index + '.value'"  
              >
                <el-select  v-model="item.value" placeholder="请选择" style="width:95%">
                  <el-option
                    v-for="(optionItem, oidex) in item.select_options"
                    :key="oidex"
                    :label="optionItem"
                    :value="optionItem">
                  </el-option>
                </el-select>
              </el-form-item> 
            </el-col>
            <el-col :span="1" :key="'form-col'+index">&nbsp;</el-col>
          </template>
          
        </el-row>
        
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="form.method=='add'" @click="submitNew('form')">确 定</el-button>
        <el-button type="primary" v-else @click="submitEdit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PatientSidebar from "./components/PatientSidebar";
import {fetchInspectionReference,CreatePatientInspection,fetchPatientInspections,EditPatientInspection,DeletePatientInspection} from "@/api/inspection";
import {uParseTime,isPositiveNumber} from "@/utils/tools";

export default {
  name: "Inspection",
  components: { PatientSidebar },
  data() {
    return {
      total:0,
      pageLoading:true,
      itemLoading:false,
      formLoading:false,
      itemDate:'',
      patientID: 0,
      panelClass: "patient-app-container",
      patientInfo: {
        id: 0
      },
      itemName:'请选择项目',
      formTitle:'',
      dialogFormVisible:false,
      form:{
        method:'add',
        project_id:0,
        inspect_date:'',
        formItem:[
          {id:0, value:''},
        ]
      },
      formItem:[],
      items:[],
      inspections:[],
      inspectionsMap:{},
      projects:[],
      project:null,
      queryParams:{
        patient:0,
        project_id:0,
        page:1
      },
    };
  },
  methods:{
    deleteInspection(){
      
      if(this.project == null || this.itemDate == "") {
        this.$message.error("请先选择删除删除的记录");
        return false;
      }
      
      this.$confirm('确认删除此记录?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        var params = {patient: this.patientID, date: this.itemDate, project_id: this.project.project_id};
          DeletePatientInspection(params).then(response=>{
              if(response.data.state==0) {
                  this.$message.error(response.data.msg);
                  return false;
              }else {
                this.$notify({
                    title: "成功",
                    message: "删除成功",
                    type: "success",
                    duration: 2000
                });
                
                for( var index in this.projects) {
                  if (this.projects[index].project_id == params.project_id) {
                    this.projects[index].count --;
                    break;
                  }
                }
                this.total -=1;
                this.itemDate = "";
                this.items = [];
                if(this.total > 0) {
                  this.queryParams.page = 1;
                  this.fetchPatientInspections(this.queryParams);
                }
              }
          });
      }).catch(() => { });
    },
    openEdit(){
      if(this.project == null) {
        this.$message.error("请先选择项目");
        return false;
      }
      
      this.form.method = "edit";
      this.formTitle = "修改" + this.project.project_name;
      this.form.project_id = this.project.project_id;
      this.form.inspect_date = this.itemDate;

      this.form.formItem = [];
      for(var index in this.project.inspection_reference){
        this.form.formItem.push({
          id:  (this.project.inspection_reference[index].id in this.inspectionsMap)? this.inspectionsMap[this.project.inspection_reference[index].id].id:0,
          project_id: this.project.inspection_reference[index].project_id,
          project_name: this.project.inspection_reference[index].project_name,
          item_id: this.project.inspection_reference[index].id,
          item: this.project.inspection_reference[index].item,
          item_name: this.project.inspection_reference[index].item_name,
          range_type: this.project.inspection_reference[index].range_type,
          value:(this.project.inspection_reference[index].id in this.inspectionsMap)? this.inspectionsMap[this.project.inspection_reference[index].id].inspect_value:"",
          select_options: this.project.inspection_reference[index].range_options.split(","),
          unit: this.project.inspection_reference[index].unit,
        });
      }

      this.dialogFormVisible = true;

    },
    openNew(){
      if(this.project == null) {
        this.$message.error("请先选择项目");
        return false;
      }
      this.form.method = "add";
      this.formTitle = "新增" + this.project.project_name;
      this.form.project_id = this.project.project_id;

      var today = new Date();
      this.form.inspect_date = uParseTime(today, '{y}-{m}-{d}');
      this.form.formItem = [];
      for(var index in this.project.inspection_reference){
        // var formItem = this.project.inspection_reference[index];
        // formItem["value"] = '';
        // if (formItem.range_type==2) {
        //   formItem["select_options"] = formItem.range_options.split(",");
        // } 
        this.form.formItem.push({
          id:    0,
          project_id: this.project.inspection_reference[index].project_id,
          project_name: this.project.inspection_reference[index].project_name,
          item_id: this.project.inspection_reference[index].id,
          item: this.project.inspection_reference[index].item,
          item_name: this.project.inspection_reference[index].item_name,
          range_type: this.project.inspection_reference[index].range_type,
          value:'',
          select_options: this.project.inspection_reference[index].range_options.split(","),
          unit: this.project.inspection_reference[index].unit,
        });
      }

      this.dialogFormVisible = true;
    },
    submitEdit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formLoading = true;
          if (this.form.formItem.length==0) {
            this.$message.error("未填写项目");
            return false;
          }
          for( var index in this.form.formItem) {
            this.form.formItem[index].value = '' + this.form.formItem[index].value;
          }
          EditPatientInspection(this.patientID, this.form).then(response=>{
            if (response.data.state==1) {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });
              this.itemDate = this.form.inspect_date;
              this.items=[];
              var inspections = response.data.data.inspections;
              this.inspections = response.data.data.inspections;
              if (inspections==null) {
                this.inspections = [];
                return false;
              }
              var inspectionsMap = {};
              this.inspectionsMap = {};
              for (var index in inspections) {
                inspectionsMap[inspections[index].item_id] = inspections[index];
                this.inspectionsMap[inspections[index].item_id] = inspections[index];
              }
              var items = this.project.inspection_reference;
              for(var index in items) {
                if (items[index].id in inspectionsMap) {
                  var item = {};
                  for(var key in items[index]) {
                    item[key] = items[index][key];
                  }
                  item.value = inspectionsMap[items[index].id].inspect_value;
                  item.value_direction = "";
                  if (item.range_type==1) {
                    var value = parseFloat(item.value);
                    var range_min = parseFloat(item.range_min);
                    var range_max = parseFloat(item.range_max);
                    if (value < range_min) {
                      item.value_direction = "↓";
                    }else if (value > range_max) {
                      item.value_direction = "↑";
                    }
                  }
                  this.items.push(item);
                }
              }
              
              this.resetForm(formName);
              this.dialogFormVisible = false;

            }else {
              this.$message.error(response.data.msg);
              return false;
            }
          }).catch(v=>{
            this.$message.error(v);
            return false;
          });
          this.formLoading = false;
          return false;
        } else {
          return false;
        }
      });
    },
    submitNew(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formLoading = true;
          if (this.form.formItem.length==0) {
            this.$message.error("未填写项目");
            return false;
          }
          for( var index in this.form.formItem) {
            this.form.formItem[index].value = '' + this.form.formItem[index].value;
          }
          CreatePatientInspection(this.patientID, this.form).then(response=>{
            if (response.data.state==1) {
              this.$notify({
                title: "成功",
                message: "新增成功",
                type: "success",
                duration: 2000
              });
              this.itemDate = this.form.inspect_date;
              this.items=[];
              for( var index in this.projects) {
                if (this.projects[index].project_id == this.form.project_id) {
                  this.projects[index].count ++;
                  break;
                }
              }
              this.total +=1;
              var inspections = response.data.data.inspections;
              this.inspections = response.data.data.inspections;
              if (inspections==null) {
                this.inspections = [];
                return false;
              }
              var inspectionsMap = {};
              this.inspectionsMap = {};
              for (var index in inspections) {
                inspectionsMap[inspections[index].item_id] = inspections[index];
                this.inspectionsMap[inspections[index].item_id] = inspections[index];
              }
              var items = this.project.inspection_reference;
              for(var index in items) {
                if (items[index].id in inspectionsMap) {
                  var item = {};
                  for(var key in items[index]) {
                    item[key] = items[index][key];
                  }
                  item.value = inspectionsMap[items[index].id].inspect_value;
                  item.value_direction = "";
                  if (item.range_type==1) {
                    var value = parseFloat(item.value);
                    var range_min = parseFloat(item.range_min);
                    var range_max = parseFloat(item.range_max);
                    if (value < range_min) {
                      item.value_direction = "↓";
                    }else if (value > range_max) {
                      item.value_direction = "↑";
                    }
                  }
                  this.items.push(item);
                }
              }
              
              this.resetForm(formName);
              this.dialogFormVisible = false;

            }else {
              this.$message.error(response.data.msg);
              return false;
            }
          }).catch(v=>{
            this.$message.error(v);
            return false;
          });
          this.formLoading = false;
          return false;
        } else {
          return false;
        }
      });
      
    },
    fetchInspectionReference(){
      fetchInspectionReference(this.patientID).then(response=>{
        if(response.data.state==1) {
          var reference = response.data.data.reference;
          this.projects = reference;
          this.pageLoading = false;
        }else {
          this.$message.error(response.data.msg);
          return false;
        }
      }).catch(v=>{
      });
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCurrentChange(row) {
      this.itemDate = '';
      this.form.method = 'add';
      if(typeof(row)=="undefined" || row==null) {
        this.project = null;
        this.items = [];
        this.itemName='请选择项目';
      }else {
        this.itemLoading = true;
        this.project = row;
        this.items = row.inspection_reference;
        this.itemName=row.project_name;

        this.queryParams.patient = this.patientID;
        this.queryParams.project_id = this.project.project_id;
        this.queryParams.page = 1;
        this.total = 0;
        this.fetchPatientInspections(this.queryParams);
      }
    },
    
    handleCurrentChangePage(val) {
        this.itemLoading = true;
      this.queryParams.page = val;
      this.fetchPatientInspections(this.queryParams);
    },
    fetchPatientInspections(params){
      this.items = [];
      fetchPatientInspections(params).then(response=>{
        if(response.data.state==1) {
          var inspections = response.data.data.inspections;
          this.total = response.data.data.total;
          this.itemDate = response.data.data.date;
          this.inspections = response.data.data.inspections;
          if (inspections==null) {
            this.inspections = [];
            return false;
          }
          var inspectionsMap = {};
          this.inspectionsMap = {};
          for (var index in inspections) {
            inspectionsMap[inspections[index].item_id] = inspections[index];
            this.inspectionsMap[inspections[index].item_id] = inspections[index];
          }
          var items = this.project.inspection_reference;
          for(var index in items) {
            if (items[index].id in inspectionsMap) {
              var item = {};
              for(var key in items[index]) {
                item[key] = items[index][key];
              }
              item.value = inspectionsMap[items[index].id].inspect_value;
              item.value_direction = "";
              if (item.range_type==1) {
                var value = parseFloat(item.value);
                var range_min = parseFloat(item.range_min);
                var range_max = parseFloat(item.range_max);
                if (value < range_min) {
                  item.value_direction = "↓";
                }else if (value > range_max) {
                  item.value_direction = "↑";
                }
              }
              this.items.push(item);
            }
          }
        }
      }).catch(v=>{});
      setTimeout(() => {
        this.itemLoading = false;
      }, 1000);
    },
  },
  created() {
    const id = this.$route.query && this.$route.query.id;
    this.patientID = parseInt(id);
    if (isNaN(this.patientID) || this.patientID <= 0) {
      this.$notify.error({
        title: "错误",
        message: "无效的id"
      });
      this.$router.push("/patients/patients");
    }

    this.fetchInspectionReference();
  }
};
</script>

<style >
#user-inspection-order td {
    border-bottom:0px !important;
    border-right: 0px !important;
}
#user-inspection-order th {
    border-right: 0px !important;
}
#user-inspection-form .el-form-item__content {
      line-height: 0 !important;
}
</style>


