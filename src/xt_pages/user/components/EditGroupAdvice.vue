<template>
  <div id="user-edit-group-advice">
    <el-dialog title="编辑医嘱" :visible.sync="groupEditFormVisible" width="700px" >
      <el-form ref="groupForm" :rules="groupRules" :model="groupForm" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="医嘱类型 :" required prop="advice_type">
              <el-select v-model="groupForm.advice_type" placeholder="请选择">
                <el-option
                  :label="item.label"
                  :key="item.value"
                  :value="item.value"
                  v-for="item in adviceTypeOptions"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间 :" required prop="start_time">
              <el-date-picker
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择时间"
                v-model="groupForm.start_time"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开嘱医生 :">
              <span>{{adminusername}} </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开嘱时间 :">
              <span>{{groupForm.advice_date}} </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="5">
            <el-button
              :disabled="$store.getters.xt_user.subscibe.state==3?true:false"
              type="primary"
              @click="openAdviceTemplate()"
            >选择医嘱模板
            </el-button>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="5">
            <el-button
              :disabled="$store.getters.xt_user.subscibe.state==3?true:false"
              type="primary"
              @click="openGroupAdvice(0)"
            >新增医嘱内容
            </el-button>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="5">
            <el-button
              :disabled="$store.getters.xt_user.subscibe.state==3?true:false"
              type="primary"
              @click="openDeleteGroupAdvice()"
            >删除医嘱内容
            </el-button>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="5">
            <el-button
              :disabled="$store.getters.xt_user.subscibe.state==3?true:false"
              type="primary"
              @click="openGroupAdvice(1)"
            >修改医嘱内容
            </el-button>
          </el-col>
          <!-- <el-col :span="1">&nbsp;</el-col>
          <el-col :span="4">
            <el-button
              :disabled="$store.getters.xt_user.subscibe.state==3?true:false"
              type="primary"
              @click="openGroupChild()"
            >添加子药内容</el-button>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              id="user-edit-advice-name-table"
              :data="groupForm.adviceNames"
              border
              fit
              highlight-current-row
              :row-class-name="groupClassName"
              @current-change="selectGroupAdvice"
              style="width: 100%"
              :row-key="getRowKey"
              ref="advicenametable"
              type="expand"
              default-expand-all
            >
              <el-table-column
                label="医嘱内容"
                property="advice_name"
                style="word-break: keep-all;white-space:nowrap;"
              ></el-table-column>
              <el-table-column
                label="规格"
                property="advice_desc"
              ></el-table-column>
              <!-- <el-table-column label="药品规格*数量" min-width="80" property="drug_spec" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.drug_spec!=0"
                  >{{scope.row.drug_spec}}{{scope.row.drug_spec_unit}}</span>
                  <span
                    v-if="scope.row.prescribing_number!=0"
                  >*{{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}</span>
                </template>
              </el-table-column> -->
              <el-table-column label="开药数量" min-width="80" property="prescribing_number" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.prescribing_number!=0"
                  >{{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}</span>
                </template>
              </el-table-column>
              <el-table-column label="单次用量" min-width="80" property="single_dose" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.single_dose!=0"
                  >{{scope.row.single_dose}}{{scope.row.single_dose_unit}}</span>
                </template>
              </el-table-column>
              <el-table-column label="给药途径" min-width="80" property="delivery_way" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.parent_row==0">{{scope.row.delivery_way}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="执行频率"
                min-width="80"
                property="execution_frequency"
                align="center"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.parent_row==0">{{scope.row.execution_frequency}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>

    </el-dialog>

    <el-dialog title="选择医嘱模板" :visible.sync="templateFormVisible" width="72%" :close-on-click-modal="false">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-table
            :data="adviceTemplates"
            ref="templatetable"
            border
            highlight-current-row
            @current-change="templateTableChange"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="模板名称">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="16">
          <el-table
            id='dialysis-update-select-template-table'
            :data="selectedTemp.list"
            border
            :span-method="spanselecttable"
            @select="selectAdvice"
            @selection-change="changeAdvice"
            @select-all="selectAllTemplateAdvice"
            row-key="row_key"
            ref="selecttemplatetable"
            style="width: 100%;margin-top: 10px;margin-bottom: 10px;"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="医嘱内容"
              property="advice_name"
              style="word-break: keep-all;white-space:nowrap;"
            ></el-table-column>
            <el-table-column
              label="规格"
              property="advice_desc"
            ></el-table-column>
            <el-table-column label="开药数量" min-width="80" property="prescribing_number" align="center">
              <template slot-scope="scope">
                  <span
                    v-if="scope.row.prescribing_number!=0"
                  >{{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单次用量" min-width="80" property="single_dose" align="center">
              <template slot-scope="scope">
                  <span
                    v-if="scope.row.single_dose!=0"
                  >{{scope.row.single_dose}}{{scope.row.single_dose_unit}}</span>
              </template>
            </el-table-column>
            <el-table-column label="给药途径" min-width="80" property="delivery_way" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.parent_row==0">{{scope.row.delivery_way}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="执行频率"
              min-width="80"
              property="execution_frequency"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.parent_row==0">{{scope.row.execution_frequency}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleDialog()">取消</el-button>
        <el-button
          :disabled="$store.getters.xt_user.subscibe.state==3?true:false"
          type="primary"
          @click="newAddTempForm()"
        >确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择医嘱模板" :visible.sync="oldTemplateFormVisible" width="700px">
      <el-form ref="templateForm" :rules="templateRules" :model="templateForm">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="id">
              <el-select
                v-model="templateForm.id"
                filterable
                clearable
                placeholder="请选择(输入可搜索)"
                style="width:100%"
              >
                <el-option
                  v-for="item in adviceTemplates"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="templateFormVisible = false">取消</el-button>
        <el-button
          :disabled="$store.getters.xt_user.subscibe.state==3?true:false"
          type="primary"
          @click="addTempForm('templateForm')"
        >确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="nameFormTitle" :visible.sync="nameFormVisible" width="700px">
      <el-form ref="nameForm" :rules="nameRules" :model="nameForm" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="医嘱内容 :" required prop="advice_name">
              <el-input v-model="nameForm.advice_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="规格 :" prop="advice_desc">
              <el-input v-model="nameForm.advice_desc"></el-input>
            </el-form-item>
            <!-- <el-form-item label="药品规格 :" prop="drug_spec">
              <el-col :span="8">
                <el-input v-model="nameForm.drug_spec"></el-input>
              </el-col>
              <el-col class="line" :span="2">&nbsp;</el-col>
              <el-col :span="14">
                <el-select
                  v-model="nameForm.drug_spec_unit"
                  filterable
                  clearable
                  allow-create
                  placeholder="选择"
                >
                  <el-option
                    v-for="item in unitsOption"
                    :key="item.id"
                    :label="item.name "
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单次用量 :" prop="single_dose">
              <el-col :span="8">
                <el-input v-model="nameForm.single_dose"></el-input>
              </el-col>
              <el-col class="line" :span="2">&nbsp;</el-col>
              <el-col :span="14">
                <el-select
                  v-model="nameForm.single_dose_unit"
                  filterable
                  clearable
                  allow-create
                  placeholder="选择"
                >
                  <el-option
                    v-for="item in unitsOption"
                    :key="item.id"
                    :label="item.name "
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开药数量 :" prop="prescribing_number">
              <el-col :span="8">
                <el-input v-model="nameForm.prescribing_number"></el-input>
              </el-col>
              <el-col class="line" :span="2">&nbsp;</el-col>
              <el-col :span="14">
                <el-select
                  v-model="nameForm.prescribing_number_unit"
                  filterable
                  clearable
                  allow-create
                  placeholder="选择"
                >
                  <el-option
                    v-for="item in unitsOption"
                    :key="item.id"
                    :label="item.name "
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="给药途径 :" prop="delivery_way">
              <el-select
                v-model="nameForm.delivery_way"
                filterable
                clearable
                allow-create
                :disabled="isChild"
                placeholder="请选择(输入可搜索)"
                style="width:90%"
              >
                <el-option
                  v-for="item in deliveryWayOptions"
                  :key="item.id"
                  :label="item.name "
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行频率 :" prop="execution_frequency">
              <el-select
                v-model="nameForm.execution_frequency"
                filterable
                clearable
                allow-create
                :disabled="isChild"
                placeholder="请选择(输入可搜索)"
                style="width:90%"
              >
                <el-option
                  v-for="item in executionFrequencyOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nameFormVisible = false">取消</el-button>
        <el-button
          :disabled="$store.getters.xt_user.subscibe.state==3?true:false"
          type="primary"
          @click="submitNameForm('nameForm')"
        >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {
    CreateDoctorAdvice,
    CreateGroupAdvice,
    DeleteDoctorAdvice,
    DeleteGroupAdvice,
    EditDoctorAdvice,
    getAdviceConfig,
    getDoctorAdviceList,
    StopDoctorAdvice
  } from "@/api/advice";


  export default {
    name: 'EditGroupAdvice',
    data() {
      return {
        editRowKey: 0,
        templateFormVisible: false,
        oldTemplateFormVisible: false,
        groupEditFormVisible: false,
        nameFormVisible: false,
        groupSelectRow: null,
        nameFormTitle: '',
        isChild: false,
        isEdit: false,
        groupRules: {
          advice_type: [{required: true, message: "请选择医嘱类型",},],
          advice_date: [{required: true, message: "请选择医嘱时间",},],
          start_time: [{required: true, message: "请选择开始时间",},],
          advice_name: [{required: true, message: "请填写医嘱内容",},],
          advice_doctor: [{required: true, message: "请选择开嘱医生",},],
        },
        nameRules: {
          advice_name: [{required: true, message: "请填写医嘱内容",},],
        },
        templateRules: {
          id: [{required: true, message: "请选择医嘱模板",},],
        },
        templateForm: {id: ''},
        nameForm: {
          advice_name: "",
          advice_desc: '',
          single_dose: "",
          single_dose_unit: "",
          drug_spec: "",
          drug_spec_unit: "",
          prescribing_number: "",
          prescribing_number_unit: "",
          delivery_way: "",
          execution_frequency: "",
          isEdit: 0,
          index: 0,
          id: 0,
          children: [],
        },
        submitGroupForm: {
          advice_type: "",
          advice_date: "",
          start_time: "",
          adviceNames: [],
          advice_doctor: "",
          remark: "",
          parent_id: 0,
        },
        selectedTemp: {'id': 0, name: '', org_id: 0, 'list': [], 'rows': []},
        selectedTemplate: [],
        allSelectedTemplate:[],

      }
    },
    props: {
      patientID: 0,
      adviceType: 0,
      adminusername: '',
      rowKey: 0,
      adviceTemplates: {
        type: Array,
        default: function () {
          return []
        }
      },
      groupFormVisible: false,
      groupForm: {
        advice_type: "",
        advice_date: "",
        start_time: "",
        adviceNames: [],
        advice_doctor: "",
        remark: "",
        parent_id: 0,
      },
      adviceTypeOptions: {
        type: Array,
        default: function () {
          return []
        }
      },
      deliveryWayOptions: {
        type: Array,
        default: () => []
      },
      unitsOption: {
        type: Array,
        default: function () {
          return []
        }
      },
      executionFrequencyOptions: {
        type: Array,
        default: function () {
          return []
        }
      },
      adviceTemplateMaps: {
        type: Object,
        default: function () {
          return {}
        }
      },
      adviceTableData: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    methods: {

      openDeleteGroupAdvice() {
        if (this.groupSelectRow === null) {
          this.$notify.error({
            title: "错误",
            message: "未选择要删除的医嘱内容"
          });
          return;
        }
        console.log(this.groupSelectRow)
        var content = ""
        if(this.groupSelectRow.children.length > 0){
          content = "确认删除此医嘱内容,包括它的子药？"
        }else{
          content = "确认删除此医嘱内容？"
        }
        var isChild = this.groupSelectRow.parent_row ? true : false;
        var title = isChild ? '删除子药内容' : '删除医嘱内容';
        var msg = isChild ? '确认删除此子药内容？' : content;
        this.$confirm(msg, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteDoctorAdvice(this.groupSelectRow.id).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.$notify({
                title: "成功",
                message: "医嘱已经删除",
                type: "success",
                duration: 2000
              });

              var ale = this.groupForm.adviceNames.length;
              var atle = this.adviceTableData.length;
              for (let index = atle - 1; index >= 0; index--) {
                if (this.adviceTableData[index].parent_id === this.groupSelectRow.id || this.adviceTableData[index].id === this.groupSelectRow.id) {
                  this.adviceTableData.splice(index, 1);
                }
              }
              if (isChild) {
                for (const index in this.groupForm.adviceNames) {
                  if (this.groupForm.adviceNames[index].row_key == this.groupSelectRow.parent_row) {
                    for (const j in this.groupForm.adviceNames[index].children) {
                      if (this.groupForm.adviceNames[index].children[j].row_key == this.groupSelectRow.row_key) {
                        this.groupForm.adviceNames[index].children.splice(j, 1);
                        this.$set(this.groupForm.adviceNames, index, this.groupForm.adviceNames[index]);
                        break;
                      }
                    }
                  }
                }
              } else {
                for (const index in this.groupForm.adviceNames) {
                  if (this.groupForm.adviceNames[index].row_key == this.groupSelectRow.row_key) {
                    this.groupForm.adviceNames.splice(index, 1);
                    break;
                  }
                }
              }
            }
          });

          if (isChild) {
            for (const index in this.groupForm.adviceNames) {
              if (this.groupForm.adviceNames[index].row_key == this.groupSelectRow.parent_row) {
                for (const j in this.groupForm.adviceNames[index].children) {
                  if (this.groupForm.adviceNames[index].children[j].row_key == this.groupSelectRow.row_key) {
                    this.groupForm.adviceNames[index].children.splice(j, 1);
                    this.$set(this.groupForm.adviceNames, index, this.groupForm.adviceNames[index]);
                    this.toggleRowExpansion();
                    break;
                  }
                }
              }
            }
          } else {
            for (const index in this.groupForm.adviceNames) {
              if (this.groupForm.adviceNames[index].row_key == this.groupSelectRow.row_key) {
                this.groupForm.adviceNames.splice(index, 1);
                this.toggleRowExpansion();
                break;
              }
            }
          }

        }).catch(() => {
        });
      },
      submitNameForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (_this.nameForm.isEdit) {
              var submitForm = {
                advice_type: _this.groupForm.advice_type,
                advice_date: _this.groupForm.advice_date,
                start_time: _this.groupForm.start_time,
                advice_name: _this.nameForm.advice_name,
                advice_desc: _this.nameForm.advice_desc,

                single_dose: '' + _this.nameForm.single_dose,
                single_dose_unit: _this.nameForm.single_dose_unit,
                drug_spec: '' + _this.nameForm.drug_spec,
                drug_spec_unit: _this.nameForm.drug_spec_unit,
                prescribing_number: '' + _this.nameForm.prescribing_number,
                prescribing_number_unit: _this.nameForm.prescribing_number_unit,
                delivery_way: _this.nameForm.delivery_way,
                execution_frequency: _this.nameForm.execution_frequency,
                isEdit: 0,
                id: 0,
                advice_doctor: "",
                remark: _this.groupForm.remark,
                parent_id: _this.groupSelectRow.parent_id,
                groupno: _this.groupForm.groupno,
              };
              EditDoctorAdvice(this.patientID, this.groupSelectRow.id, submitForm).then(response => {
                if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                } else {
                  this.$notify({
                    title: "成功",
                    message: "修改医嘱成功",
                    type: "success",
                    duration: 2000
                  });
                  var ale = _this.groupForm.adviceNames.length;
                  var atle = _this.adviceTableData.length;

                  for (let index = 0; index < atle; index++) {
                    if (_this.groupSelectRow.id == _this.adviceTableData[index].id) {
                      var advice = response.data.data.advice;
                      _this.adviceTableData[index].drug_spec = advice.drug_spec;
                      _this.adviceTableData[index].drug_spec_unit = advice.drug_spec_unit;
                      _this.adviceTableData[index].start_time = advice.start_time;
                      _this.adviceTableData[index].advice_name = advice.advice_name;
                      _this.adviceTableData[index].advice_desc = advice.advice_desc;
                      _this.adviceTableData[index].single_dose = advice.single_dose;
                      _this.adviceTableData[index].single_dose_unit = advice.single_dose_unit;
                      _this.adviceTableData[index].delivery_way = advice.delivery_way;
                      _this.adviceTableData[index].execution_frequency = advice.execution_frequency;
                      _this.adviceTableData[index].prescribing_number = advice.prescribing_number;
                      _this.adviceTableData[index].prescribing_number_unit = advice.prescribing_number_unit;
                      break;
                    }
                  }

                  if (_this.isChild) {
                    for (let index = 0; index < ale; index++) {
                      if (_this.groupSelectRow.parent_row == _this.groupForm.adviceNames[index].row_key) {
                        var cle = _this.groupForm.adviceNames[index].children.length
                        var children = _this.groupForm.adviceNames[index].children
                        for (let j = 0; j < ale; j++) {
                          if (_this.groupSelectRow.row_key == children[j].row_key) {
                            _this.groupForm.adviceNames[index].children[j].advice_name = _this.nameForm.advice_name;
                            _this.groupForm.adviceNames[index].children[j].advice_desc = _this.nameForm.advice_desc;
                            _this.groupForm.adviceNames[index].children[j].single_dose = '' + _this.nameForm.single_dose;
                            _this.groupForm.adviceNames[index].children[j].single_dose_unit = _this.nameForm.single_dose_unit;
                            _this.groupForm.adviceNames[index].children[j].drug_spec = '' + _this.nameForm.drug_spec;
                            _this.groupForm.adviceNames[index].children[j].drug_spec_unit = _this.nameForm.drug_spec_unit;
                            _this.groupForm.adviceNames[index].children[j].prescribing_number = '' + _this.nameForm.prescribing_number;
                            _this.groupForm.adviceNames[index].children[j].prescribing_number_unit = _this.nameForm.prescribing_number_unit;
                            _this.groupForm.adviceNames[index].children[j].delivery_way = _this.nameForm.delivery_way;
                            _this.groupForm.adviceNames[index].children[j].execution_frequency = _this.nameForm.execution_frequency;
                            _this.$set(_this.groupForm.adviceNames[index].children, j, _this.groupForm.adviceNames[index].children[j]);
                            break;
                          }
                        }
                      }
                    }
                  } else {
                    for (let index = 0; index < ale; index++) {
                      if (_this.groupSelectRow.row_key == _this.groupForm.adviceNames[index].row_key) {
                        _this.groupForm.adviceNames[index].advice_name = _this.nameForm.advice_name;
                        _this.groupForm.adviceNames[index].advice_desc = '' + _this.nameForm.advice_desc;
                        _this.groupForm.adviceNames[index].single_dose = '' + _this.nameForm.single_dose;
                        _this.groupForm.adviceNames[index].single_dose_unit = _this.nameForm.single_dose_unit;
                        _this.groupForm.adviceNames[index].drug_spec = '' + _this.nameForm.drug_spec;
                        _this.groupForm.adviceNames[index].drug_spec_unit = _this.nameForm.drug_spec_unit;
                        _this.groupForm.adviceNames[index].prescribing_number = '' + _this.nameForm.prescribing_number;
                        _this.groupForm.adviceNames[index].prescribing_number_unit = _this.nameForm.prescribing_number_unit;
                        _this.groupForm.adviceNames[index].delivery_way = _this.nameForm.delivery_way;
                        _this.groupForm.adviceNames[index].execution_frequency = _this.nameForm.execution_frequency;

                        _this.$set(_this.groupForm.adviceNames, index, _this.groupForm.adviceNames[index]);
                        break;
                      }
                    }
                  }
                }
              });

            } else {
              if (_this.isChild) {
                var submitForm = {
                  advice_type: _this.groupForm.advice_type,
                  advice_date: _this.groupForm.advice_date,
                  start_time: _this.groupForm.start_time,
                  advice_name: _this.nameForm.advice_name,
                  advice_desc: _this.nameForm.advice_desc,
                  single_dose: '' + _this.nameForm.single_dose,
                  single_dose_unit: _this.nameForm.single_dose_unit,
                  drug_spec: '' + _this.nameForm.drug_spec,
                  drug_spec_unit: _this.nameForm.drug_spec_unit,
                  prescribing_number: '' + _this.nameForm.prescribing_number,
                  prescribing_number_unit: _this.nameForm.prescribing_number_unit,
                  delivery_way: _this.nameForm.delivery_way,
                  execution_frequency: _this.nameForm.execution_frequency,
                  isEdit: 0,
                  id: 0,
                  advice_doctor: "",
                  remark: _this.groupForm.remark,
                  parent_id: _this.groupSelectRow.id,
                  groupno: _this.groupForm.groupno,
                };

                CreateDoctorAdvice(this.patientID, submitForm).then(response => {
                  if (response.data.state == 0) {
                    this.$message.error(response.data.msg);
                    return false;
                  } else {
                    this.$notify({
                      title: "成功",
                      message: "新增医嘱成功",
                      type: "success",
                      duration: 2000
                    });
                    if (_this.adviceType == _this.groupForm.advice_type || _this.adviceType == 0) {
                      var spliceIndex = -1;
                      for (let index = _this.adviceTableData.length - 1; ; index--) {
                        if (_this.adviceTableData[index].parent_id === _this.groupSelectRow.id) {
                          spliceIndex = index;
                          break;
                        } else if (_this.adviceTableData[index].id === _this.groupSelectRow.id) {
                          spliceIndex = index;
                          break;
                        }
                      }

                      if (spliceIndex > -1) {
                        spliceIndex += 1;
                        if (spliceIndex === _this.adviceTableData.length) {
                          _this.adviceTableData.push(response.data.data.advice);
                        } else {
                          _this.adviceTableData.splice(spliceIndex, 0, response.data.data.advice);
                        }
                      }
                      var ale = _this.groupForm.adviceNames.length;
                      for (let index = 0; index < ale; index++) {
                        if (_this.nameForm.parent_row == _this.groupForm.adviceNames[index].row_key) {
                          _this.editRowKey++;
                          _this.nameForm.row_key = _this.editRowKey;
                          _this.groupForm.adviceNames[index].children.push(_this.nameForm);
                          _this.$set(_this.groupForm.adviceNames, index, _this.groupForm.adviceNames[index]);
                          break;
                        }
                      }
                    }
                    // _this.resetForm(formName);
                    return false;
                  }
                });

              } else {
                _this.submitGroupForm = {
                  advice_type: _this.groupForm.advice_type,
                  advice_date: _this.groupForm.advice_date,
                  start_time: _this.groupForm.start_time,
                  adviceNames: [
                    {
                      advice_name: _this.nameForm.advice_name,
                      advice_desc: _this.nameForm.advice_desc,
                      single_dose: '' + _this.nameForm.single_dose,
                      single_dose_unit: _this.nameForm.single_dose_unit,
                      drug_spec: '' + _this.nameForm.drug_spec,
                      drug_spec_unit: _this.nameForm.drug_spec_unit,
                      prescribing_number: '' + _this.nameForm.prescribing_number,
                      prescribing_number_unit: _this.nameForm.prescribing_number_unit,
                      delivery_way: _this.nameForm.delivery_way,
                      execution_frequency: _this.nameForm.execution_frequency,
                      isEdit: 0,
                      id: 0,
                      children: [],
                      parent_row: 0,
                    }
                  ],
                  advice_doctor: "",
                  remark: _this.groupForm.remark,
                  parent_id: 0,
                };
                CreateGroupAdvice(_this.patientID, _this.groupForm.groupno, _this.submitGroupForm).then(response => {
                  if (response.data.state == 0) {
                    _this.$message.error(response.data.msg);
                    return false;
                  } else {
                    _this.$notify({
                      title: "成功",
                      message: "新增成功",
                      type: "success",
                      duration: 2000
                    });
                    if (_this.adviceType == _this.groupForm.advice_type || _this.adviceType == 0) {

                      // var alen = response.data.data.advices.length
                      // for (let index = alen-1; index >=0; index--) {
                      //   this.adviceTableData.unshift(response.data.data.advices[index]);
                      // }
                      // for (const index in response.data.data.advices) {
                      //   _this.adviceTableData.unshift(response.data.data.advices[index]);
                      // }
                      var groups = response.data.data.advices;
                      var childMap = {};
                      for (const index in groups) {
                        if (groups[index].parent_id == 0) {
                          continue;
                        }
                        if (false === (groups[index].parent_id in childMap)) {
                          childMap[groups[index].parent_id] = [];
                        }
                        childMap[groups[index].parent_id].push(groups[index]);
                      }


                      var parentArr = [];
                      for (const index in groups) {
                        if (groups[index].parent_id > 0) {
                          continue;
                        }
                        parentArr.push(groups[index]);
                      }

                      var groupNo = groups[0].groupno;
                      var newData = {groupNo: parentArr};
                      for (const index in _this.adviceTableData) {
                        if (_this.adviceTableData[index].groupno == groupNo) {
                          for (const i in parentArr) {
                            if (parentArr[i].id in childMap) {
                              for (const j in childMap[parentArr[i].id]) {
                                _this.adviceTableData.splice(index, 0, childMap[parentArr[i].id][j]);
                              }
                            }
                            _this.adviceTableData.splice(index, 0, parentArr[i]);
                          }
                          break;
                        }
                      }

                      for (const index in groups) {
                        if (groups[index].parent_id > 0) {
                          continue;
                        }
                        _this.editRowKey++;
                        var item = {
                          advice_name: groups[index].advice_name,
                          advice_desc: groups[index].advice_desc,
                          single_dose: '' + groups[index].single_dose,
                          single_dose_unit: groups[index].single_dose_unit,
                          drug_spec: '' + groups[index].drug_spec,
                          drug_spec_unit: groups[index].drug_spec_unit,
                          prescribing_number: '' + groups[index].prescribing_number,
                          prescribing_number_unit: groups[index].prescribing_number_unit,
                          delivery_way: groups[index].delivery_way,
                          execution_frequency: groups[index].execution_frequency,
                          isEdit: 0,
                          index: 0,
                          id: groups[index].id,
                          children: [],
                          parent_row: 0,
                          row_key: _this.editRowKey,
                        };
                        if (item.id in childMap) {
                          for (const key in childMap[item.id]) {
                            _this.editRowKey++;
                            var child = {
                              advice_name: childMap[item.id][key].advice_name,
                              advice_desc: childMap[item.id][key].advice_desc,
                              single_dose: '' + childMap[item.id][key].single_dose,
                              single_dose_unit: childMap[item.id][key].single_dose_unit,
                              drug_spec: '' + childMap[item.id][key].drug_spec,
                              drug_spec_unit: childMap[item.id][key].drug_spec_unit,
                              prescribing_number: '' + childMap[item.id][key].prescribing_number,
                              prescribing_number_unit: childMap[item.id][key].prescribing_number_unit,
                              delivery_way: childMap[item.id][key].delivery_way,
                              execution_frequency: childMap[item.id][key].execution_frequency,
                              isEdit: 0,
                              index: 0,
                              id: childMap[item.id][key].id,
                              children: [],
                              parent_row: item.row_key,
                              row_key: _this.editRowKey,
                            };
                            item.children.push(child);
                          }
                          _this.$set(item, 'children', item.children);
                        }
                        _this.groupForm.adviceNames.unshift(item);
                      }

                    }
                    _this.resetForm(formName);
                    return false;
                  }
                });

              }
            }
            _this.nameFormVisible = false;
          }
        });
      },

      openGroupChild() {
        if (this.groupSelectRow === null) {
          this.$notify.error({
            title: "错误",
            message: "未选择医嘱内容,无法添加子药"
          });
          return;
        } else if (this.groupSelectRow.parent_row > 0) {
          this.$notify.error({
            title: "错误",
            message: "子药不能添加子药"
          });
          return;
        }
        this.nameForm = {
          advice_name: "",
          advice_desc: "",
          single_dose: "",
          single_dose_unit: "",
          drug_spec: "",
          drug_spec_unit: "",
          prescribing_number: "",
          prescribing_number_unit: "",
          delivery_way: this.groupSelectRow.delivery_way,
          execution_frequency: this.groupSelectRow.execution_frequency,
          isEdit: 0,
          index: 0,
          children: [],
          parent_row: this.groupSelectRow.row_key,
          id: 0,
        };
        this.isChild = true;
        this.nameFormVisible = true;
        this.nameFormTitle = '添加子药内容';
      },
      openGroupAdvice(isEdit) {
        this.isChild = false;
        if (isEdit) {
          if (this.groupSelectRow === null) {
            this.$notify.error({
              title: "错误",
              message: "未选择要修改的医嘱内容"
            });
            return;
          }
          if (this.groupSelectRow.parent_row) {
            this.isChild = true;
          }

          this.nameForm = {
            advice_name: this.groupSelectRow.advice_name,
            advice_desc: this.groupSelectRow.advice_desc,
            single_dose: this.groupSelectRow.single_dose,
            single_dose_unit: this.groupSelectRow.single_dose_unit,
            drug_spec: this.groupSelectRow.drug_spec,
            drug_spec_unit: this.groupSelectRow.drug_spec_unit,
            prescribing_number: this.groupSelectRow.prescribing_number,
            prescribing_number_unit: this.groupSelectRow.prescribing_number_unit,
            delivery_way: this.isChild ? '' : this.groupSelectRow.delivery_way,
            execution_frequency: this.isChild ? '' : this.groupSelectRow.execution_frequency,
            isEdit: 1,
            index: this.groupSelectRow.index,
            id: this.groupSelectRow.id,
            children: [],
            parent_row: this.groupSelectRow.parent_row,
            // row_key:this.groupSelectRow.row_key,
          };
          this.nameFormTitle = '修改医嘱内容';
        } else {
          this.nameForm = {
            advice_name: "",
            advice_desc: "",
            single_dose: "",
            single_dose_unit: "",
            drug_spec: "",
            drug_spec_unit: "",
            prescribing_number: "",
            prescribing_number_unit: "",
            delivery_way: "",
            execution_frequency: "",
            isEdit: 0,
            index: 0,
            id: 0,
            children: [],
            parent_row: 0,
          };
          this.nameFormTitle = '添加医嘱内容';
        }
        this.nameFormVisible = true;

      },


      changeAdvice(selection) {
        this.selectedTemplate = selection;
      },
      selectAdvice(selection, row) {
        // this.selectedTemplate = [];
        var adviceArray = this.adviceTemplateMaps[this.selectedTemp.id].DoctorAdviceTemplate
        for (let y = 0; y < adviceArray.length; y++) {
          adviceArray[y].selection = false
        }
        if (selection.length > 0) {
          for (let y = 0; y < adviceArray.length; y++) {
            for (let i = 0; i < selection.length; i++) {
              if (adviceArray[y].id == selection[i].advice_id) {
                adviceArray[y].selection = true

              }
            }

          }
        }

        if (row.children.length > 0) {
          for (const index in row.children) {
            this.$refs.selecttemplatetable.toggleRowSelection(row.children[index]);
          }
        }

        //下面两步的作用是为了上选中的数据的输出顺序不变
        for (const index in this.selectedTemp.list) {
          this.$refs.selecttemplatetable.toggleRowSelection(this.selectedTemp.list[index]);
          if (this.selectedTemp.list[index].children.length > 0) {
            for (const j in this.selectedTemp.list[index].children) {
              this.$refs.selecttemplatetable.toggleRowSelection(this.selectedTemp.list[index].children[j]);
            }
          }
        }

        for (const index in this.selectedTemp.list) {
          this.$refs.selecttemplatetable.toggleRowSelection(this.selectedTemp.list[index]);
          if (this.selectedTemp.list[index].children.length > 0) {
            for (const j in this.selectedTemp.list[index].children) {
              this.$refs.selecttemplatetable.toggleRowSelection(this.selectedTemp.list[index].children[j]);
            }
          }
        }
      },
      spanselecttable({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 0) {
          const _row = this.selectedTemp.rows[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      calcselectedTemp() {
        var rowKeys = 0;
        for (const index in this.selectedTemp.list) {
          var pkey = rowKeys;
          this.selectedTemp.rows[rowKeys] = 1;
          if(this.selectedTemp.list[index].children.length>0) {
            for (const childindex in this.selectedTemp.list[index].children) {
              rowKeys++;
              this.selectedTemp.rows[pkey] += 1;
              this.selectedTemp.rows[rowKeys] = 0;
            }
          }
          rowKeys++;
          this.$nextTick(function () {
            if (this.selectedTemp.list[index].selection) {
              this.$refs.selecttemplatetable.toggleRowSelection(this.selectedTemp.list[index]);
            }
          })
        }
      },
      templateTableChange(currentRow, oldCurrentRow) {
        this.selectedTemp = {'id': 0, name: '', org_id: 0, 'list': [], 'rows': []};
        if (currentRow == null) {
          return false;
        }
        this.selectedTemp.id = currentRow.id;
        this.selectedTemp.name = currentRow.name;
        this.selectedTemp.org_id = currentRow.org_id;
        if (this.selectedTemp.id in this.adviceTemplateMaps) {
          var mapid = this.selectedTemp.id;
          var thisRowKey = 0;
          for (const index in this.adviceTemplateMaps[mapid].DoctorAdviceTemplate) {
            thisRowKey++;
            var item = {
              advice_name: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].advice_name,
              advice_desc: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].advice_desc,
              single_dose: '' + this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose,
              single_dose_unit: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose_unit,
              drug_spec: '' + this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec,
              drug_spec_unit: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec_unit,
              prescribing_number: '' + this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number,
              prescribing_number_unit: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number_unit,
              delivery_way: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].delivery_way,
              execution_frequency: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].execution_frequency,
              advice_id:this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].id,
              selection:this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].selection,
              isEdit: 0,
              id: 0,
              children: [],
              parent_row: 0,
              row_key: thisRowKey,
            }
            if ('children' in this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index] && this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children.length > 0) {
              var parentRow = thisRowKey;
              var children = this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children
              for (const key in children) {
                thisRowKey++
                var child = {
                  advice_id:children[key].id,
                  advice_name: children[key].advice_name,
                  advice_desc: children[key].advice_desc,
                  single_dose: '' + children[key].single_dose,
                  single_dose_unit: children[key].single_dose_unit,
                  drug_spec: '' + children[key].drug_spec,
                  drug_spec_unit: children[key].drug_spec_unit,
                  prescribing_number: '' + children[key].prescribing_number,
                  prescribing_number_unit: children[key].prescribing_number_unit,
                  delivery_way: children[key].delivery_way,
                  execution_frequency: children[key].execution_frequency,
                  isEdit: 0,
                  id: 0,
                  children: [],
                  parent_row: parentRow,
                  row_key: thisRowKey,
                }
                item.children.push(child);
              }
              this.$set(item, 'children', item.children);
            }

            this.selectedTemp.list.unshift(item);

          }
        }

      },
      newAddTempForm() {
        this.allSelectedTemplate = []
        var thisRowKey = 0;
        for (const indexs in this.adviceTemplateMaps) {
          let adviceTemplate = this.adviceTemplateMaps[indexs]
          for (const index in adviceTemplate.DoctorAdviceTemplate) {
            if (adviceTemplate.DoctorAdviceTemplate[index].selection) {
              thisRowKey++;
              var item = {
                advice_name: adviceTemplate.DoctorAdviceTemplate[index].advice_name,
                advice_desc: adviceTemplate.DoctorAdviceTemplate[index].advice_desc,
                single_dose: '' + adviceTemplate.DoctorAdviceTemplate[index].single_dose,
                single_dose_unit: adviceTemplate.DoctorAdviceTemplate[index].single_dose_unit,
                drug_spec: '' + adviceTemplate.DoctorAdviceTemplate[index].drug_spec,
                drug_spec_unit: adviceTemplate.DoctorAdviceTemplate[index].drug_spec_unit,
                prescribing_number: '' + adviceTemplate.DoctorAdviceTemplate[index].prescribing_number,
                prescribing_number_unit: adviceTemplate.DoctorAdviceTemplate[index].prescribing_number_unit,
                delivery_way: adviceTemplate.DoctorAdviceTemplate[index].delivery_way,
                execution_frequency: adviceTemplate.DoctorAdviceTemplate[index].execution_frequency,
                advice_id: adviceTemplate.DoctorAdviceTemplate[index].id,
                selection: adviceTemplate.DoctorAdviceTemplate[index].selection,
                isEdit: 0,
                id: 0,
                children: [],
                parent_row: 0,
                row_key: thisRowKey,
              }
              if ('children' in adviceTemplate.DoctorAdviceTemplate[index] && adviceTemplate.DoctorAdviceTemplate[index].children.length > 0) {
                var parentRow = thisRowKey;
                var children = adviceTemplate.DoctorAdviceTemplate[index].children
                for (const key in children) {
                  thisRowKey++
                  var child = {
                    advice_id: children[key].id,
                    advice_name: children[key].advice_name,
                    advice_desc: children[key].advice_desc,
                    single_dose: '' + children[key].single_dose,
                    single_dose_unit: children[key].single_dose_unit,
                    drug_spec: '' + children[key].drug_spec,
                    drug_spec_unit: children[key].drug_spec_unit,
                    prescribing_number: '' + children[key].prescribing_number,
                    prescribing_number_unit: children[key].prescribing_number_unit,
                    delivery_way: children[key].delivery_way,
                    execution_frequency: children[key].execution_frequency,
                    isEdit: 0,
                    id: 0,
                    children: [],
                    parent_row: parentRow,
                    row_key: thisRowKey,
                  }
                  item.children.push(child);
                  this.allSelectedTemplate.unshift(child)

                }
                this.$set(item, 'children', item.children);
              }
              this.allSelectedTemplate.unshift(item);
              adviceTemplate.DoctorAdviceTemplate[index].selection = false
            }
          }
        }



        var childMap = {};
        for (const index in this.allSelectedTemplate) {
          if (this.allSelectedTemplate[index].parent_row > 0) {
            if (!(this.allSelectedTemplate[index].parent_row in childMap)) {
              childMap[this.allSelectedTemplate[index].parent_row] = [];
            }
            childMap[this.allSelectedTemplate[index].parent_row].push(this.allSelectedTemplate[index]);
          }
        }

        this.submitGroupForm = {
          advice_type: this.groupForm.advice_type,
          advice_date: this.groupForm.advice_date,
          start_time: this.groupForm.start_time,
          adviceNames: [],
          advice_doctor: "",
          remark: this.groupForm.remark,
          parent_id: 0,
        };

        for (const index in this.allSelectedTemplate) {
          if (this.allSelectedTemplate[index].parent_row > 0) {
            continue;
          }
          this.editRowKey++;
          var item = {
            advice_name: this.allSelectedTemplate[index].advice_name,
            advice_desc: this.allSelectedTemplate[index].advice_desc,
            single_dose: '' + this.allSelectedTemplate[index].single_dose,
            single_dose_unit: this.allSelectedTemplate[index].single_dose_unit,
            drug_spec: '' + this.allSelectedTemplate[index].drug_spec,
            drug_spec_unit: this.allSelectedTemplate[index].drug_spec_unit,
            prescribing_number: '' + this.allSelectedTemplate[index].prescribing_number,
            prescribing_number_unit: this.allSelectedTemplate[index].prescribing_number_unit,
            delivery_way: this.allSelectedTemplate[index].delivery_way,
            execution_frequency: this.allSelectedTemplate[index].execution_frequency,
            isEdit: 0,
            id: 0,
            children: [],
            parent_row: 0,
            row_key: this.editRowKey,
          }
          if (this.allSelectedTemplate[index].children.length > 0) {
            if (this.allSelectedTemplate[index].row_key in childMap) {
              var parentRow = this.editRowKey;
              var children = childMap[this.allSelectedTemplate[index].row_key];
              for (const key in children) {
                this.editRowKey++
                var child = {
                  advice_name: children[key].advice_name,
                  advice_desc: children[key].advice_desc,
                  single_dose: '' + children[key].single_dose,
                  single_dose_unit: children[key].single_dose_unit,
                  drug_spec: '' + children[key].drug_spec,
                  drug_spec_unit: children[key].drug_spec_unit,
                  prescribing_number: '' + children[key].prescribing_number,
                  prescribing_number_unit: children[key].prescribing_number_unit,
                  delivery_way: children[key].delivery_way,
                  execution_frequency: children[key].execution_frequency,
                  isEdit: 0,
                  id: 0,
                  children: [],
                  parent_row: parentRow,
                  row_key: this.editRowKey,
                }
                item.children.push(child);
              }
              this.$set(item, 'children', item.children);
            }
          }
          this.submitGroupForm.adviceNames.unshift(item);
        }

        CreateGroupAdvice(this.patientID, this.groupForm.groupno, this.submitGroupForm).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.$notify({
              title: "成功",
              message: "新增成功",
              type: "success",
              duration: 2000
            });

            var groups = response.data.data.advices;
            var childMap = {};
            for (const index in groups) {
              if (groups[index].parent_id == 0) {
                continue;
              }
              if (false === (groups[index].parent_id in childMap)) {
                childMap[groups[index].parent_id] = [];
              }
              childMap[groups[index].parent_id].push(groups[index]);
            }
            var parentArr = [];
            for (const index in groups) {
              if (groups[index].parent_id > 0) {
                continue;
              }
              parentArr.push(groups[index]);
            }

            var groupNo = groups[0].groupno;
            var newData = {groupNo: parentArr};
            for (const index in this.adviceTableData) {
              if (this.adviceTableData[index].groupno == groupNo) {
                for (const i in parentArr) {
                  if (parentArr[i].id in childMap) {
                    for (const j in childMap[parentArr[i].id]) {
                      this.adviceTableData.splice(index, 0, childMap[parentArr[i].id][j]);
                    }
                  }
                  this.adviceTableData.splice(index, 0, parentArr[i]);
                }
                break;
              }
            }

            for (const index in groups) {
              if (groups[index].parent_id > 0) {
                continue;
              }
              this.editRowKey++;
              var item = {
                advice_name: groups[index].advice_name,
                advice_desc: groups[index].advice_desc,
                single_dose: '' + groups[index].single_dose,
                single_dose_unit: groups[index].single_dose_unit,
                drug_spec: '' + groups[index].drug_spec,
                drug_spec_unit: groups[index].drug_spec_unit,
                prescribing_number: '' + groups[index].prescribing_number,
                prescribing_number_unit: groups[index].prescribing_number_unit,
                delivery_way: groups[index].delivery_way,
                execution_frequency: groups[index].execution_frequency,
                isEdit: 0,
                index: 0,
                id: groups[index].id,
                children: [],
                parent_row: 0,
                row_key: this.editRowKey,
              };
              if (item.id in childMap) {
                for (const key in childMap[item.id]) {
                  this.editRowKey++;
                  var child = {
                    advice_name: childMap[item.id][key].advice_name,
                    advice_desc: childMap[item.id][key].advice_desc,
                    single_dose: '' + childMap[item.id][key].single_dose,
                    single_dose_unit: childMap[item.id][key].single_dose_unit,
                    drug_spec: '' + childMap[item.id][key].drug_spec,
                    drug_spec_unit: childMap[item.id][key].drug_spec_unit,
                    prescribing_number: '' + childMap[item.id][key].prescribing_number,
                    prescribing_number_unit: childMap[item.id][key].prescribing_number_unit,
                    delivery_way: childMap[item.id][key].delivery_way,
                    execution_frequency: childMap[item.id][key].execution_frequency,
                    isEdit: 0,
                    index: 0,
                    id: childMap[item.id][key].id,
                    children: [],
                    parent_row: item.row_key,
                    row_key: this.editRowKey,
                  };
                  item.children.push(child);
                }
                this.$set(item, 'children', item.children);
              }
              this.groupForm.adviceNames.unshift(item);
            }
            return false;
          }
        });
        this.templateFormVisible = false;
      },

      addTempForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (_this.templateForm.id in _this.adviceTemplateMaps) {
              _this.submitGroupForm = {
                advice_type: _this.groupForm.advice_type,
                advice_date: _this.groupForm.advice_date,
                start_time: _this.groupForm.start_time,
                adviceNames: [],
                advice_doctor: "",
                remark: _this.groupForm.remark,
                parent_id: 0,
              };
              var mapid = _this.templateForm.id;
              for (const index in _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate) {
                _this.editRowKey++;
                var item = {
                  advice_name: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].advice_name,
                  advice_desc: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].advice_desc,
                  single_dose: '' + _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose,
                  single_dose_unit: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose_unit,
                  drug_spec: '' + _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec,
                  drug_spec_unit: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec_unit,
                  prescribing_number: '' + _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number,
                  prescribing_number_unit: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number_unit,
                  delivery_way: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].delivery_way,
                  execution_frequency: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].execution_frequency,
                  isEdit: 0,
                  id: 0,
                  children: [],
                  parent_row: 0,
                  row_key: _this.editRowKey,
                }
                if ('children' in _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index] && _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children) {
                  var parentRow = _this.editRowKey;
                  var children = _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children
                  for (const key in children) {
                    _this.editRowKey++;
                    var child = {
                      advice_name: children[key].advice_name,
                      advice_desc: children[key].advice_desc,
                      single_dose: '' + children[key].single_dose,
                      single_dose_unit: children[key].single_dose_unit,
                      drug_spec: '' + children[key].drug_spec,
                      drug_spec_unit: children[key].drug_spec_unit,
                      prescribing_number: '' + children[key].prescribing_number,
                      prescribing_number_unit: children[key].prescribing_number_unit,
                      delivery_way: children[key].delivery_way,
                      execution_frequency: children[key].execution_frequency,
                      isEdit: 0,
                      id: 0,
                      children: [],
                      parent_row: parentRow,
                      row_key: _this.editRowKey,
                    }
                    item.children.push(child);
                  }
                  _this.$set(item, 'children', item.children);
                }

                _this.submitGroupForm.adviceNames.push(item);

              }

              CreateGroupAdvice(_this.patientID, _this.groupForm.groupno, _this.submitGroupForm).then(response => {
                if (response.data.state == 0) {
                  _this.$message.error(response.data.msg);
                  return false;
                } else {
                  _this.$notify({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                  });
                  if (_this.adviceType == _this.groupForm.advice_type || _this.adviceType == 0) {


                    // var alen = response.data.data.advices.length
                    // for (let index = alen-1; index >=0; index--) {
                    //   _this.adviceTableData.unshift(response.data.data.advices[index]);
                    // }
                    // for (const index in response.data.data.advices) {
                    //   _this.adviceTableData.unshift(response.data.data.advices[index]);
                    // }

                    var groups = response.data.data.advices;
                    var childMap = {};
                    for (const index in groups) {
                      if (groups[index].parent_id == 0) {
                        continue;
                      }
                      if (false === (groups[index].parent_id in childMap)) {
                        childMap[groups[index].parent_id] = [];
                      }
                      childMap[groups[index].parent_id].push(groups[index]);
                    }


                    var parentArr = [];
                    for (const index in groups) {
                      if (groups[index].parent_id > 0) {
                        continue;
                      }
                      parentArr.push(groups[index]);
                    }
                    var groupNo = groups[0].groupno;
                    var newData = {groupNo: parentArr};
                    for (const index in _this.adviceTableData) {
                      if (_this.adviceTableData[index].groupno == groupNo) {
                        for (const i in parentArr) {
                          if (parentArr[i].id in childMap) {
                            for (const j in childMap[parentArr[i].id]) {
                              _this.adviceTableData.splice(index, 0, childMap[parentArr[i].id][j]);
                            }
                          }
                          _this.adviceTableData.splice(index, 0, parentArr[i]);
                        }
                        break;
                      }
                    }

                    // for (const index in parentArr) {
                    //     if(parentArr[index].id in childMap) {
                    //         for (const j in childMap[parentArr[index].id]) {
                    //             _this.adviceTableData.unshift(childMap[parentArr[index].id][j]);
                    //         }
                    //     }
                    //     _this.adviceTableData.unshift(parentArr[index]);
                    // }


                    for (const index in groups) {
                      if (groups[index].parent_id > 0) {
                        continue;
                      }
                      _this.editRowKey++;
                      var item = {
                        advice_name: groups[index].advice_name,
                        advice_desc: groups[index].advice_desc,
                        single_dose: '' + groups[index].single_dose,
                        single_dose_unit: groups[index].single_dose_unit,
                        drug_spec: '' + groups[index].drug_spec,
                        drug_spec_unit: groups[index].drug_spec_unit,
                        prescribing_number: '' + groups[index].prescribing_number,
                        prescribing_number_unit: groups[index].prescribing_number_unit,
                        delivery_way: groups[index].delivery_way,
                        execution_frequency: groups[index].execution_frequency,
                        isEdit: 0,
                        index: 0,
                        id: groups[index].id,
                        children: [],
                        parent_row: 0,
                        row_key: _this.editRowKey,
                      };
                      if (item.id in childMap) {
                        for (const key in childMap[item.id]) {
                          _this.editRowKey++;
                          var child = {
                            advice_name: childMap[item.id][key].advice_name,
                            advice_desc: childMap[item.id][key].advice_desc,
                            single_dose: '' + childMap[item.id][key].single_dose,
                            single_dose_unit: childMap[item.id][key].single_dose_unit,
                            drug_spec: '' + childMap[item.id][key].drug_spec,
                            drug_spec_unit: childMap[item.id][key].drug_spec_unit,
                            prescribing_number: '' + childMap[item.id][key].prescribing_number,
                            prescribing_number_unit: childMap[item.id][key].prescribing_number_unit,
                            delivery_way: childMap[item.id][key].delivery_way,
                            execution_frequency: childMap[item.id][key].execution_frequency,
                            isEdit: 0,
                            index: 0,
                            id: childMap[item.id][key].id,
                            children: [],
                            parent_row: item.row_key,
                            row_key: _this.editRowKey,
                          };
                          item.children.push(child);
                        }
                        _this.$set(item, 'children', item.children);
                      }
                      _this.groupForm.adviceNames.unshift(item);
                    }

                  }
                  _this.resetForm(formName);
                  return false;
                }
              });
            }
            _this.templateFormVisible = false;
          }

        });
      },
      openAdviceTemplate() {
        this.templateForm = {id: ''};
        this.selectedTemp = {'id': 0, name: '', org_id: 0, 'list': [], 'rows': []};
        this.selectedTemplate = [];
        if (typeof (this.$refs.templatetable) != 'undefined') {
          this.$refs.templatetable.setCurrentRow(null);
        }
        this.templateFormVisible = true;
      }, selectAllTemplateAdvice(selection) {
        var adviceArray = this.adviceTemplateMaps[this.selectedTemp.id].DoctorAdviceTemplate
        for (let y = 0; y < adviceArray.length; y++) {
          adviceArray[y].selection = false
        }
        if (selection.length > 0) {
          for (let y = 0; y < adviceArray.length; y++) {
            for (let i = 0; i < selection.length; i++) {
              if (adviceArray[y].id == selection[i].advice_id) {
                adviceArray[y].selection = true
              }
            }
          }
        }
      },
      selectGroupAdvice(row) {
        this.groupSelectRow = row;
      },
      groupClassName({row, rowIndex}) {
        row.index = rowIndex;
      },
      getRowKey(row) {
        return row.row_key;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      open() {
        this.groupEditFormVisible = true;
        this.groupSelectRow = null;
        if (typeof (this.$refs.advicenametable) != 'undefined') {
          this.$refs.advicenametable.setCurrentRow(null);
        }
      },cancleDialog(){
        this.templateFormVisible = false
        for (const indexs in this.adviceTemplateMaps) {
          let adviceTemplate = this.adviceTemplateMaps[indexs]
          for (const index in adviceTemplate.DoctorAdviceTemplate) {
            adviceTemplate.DoctorAdviceTemplate[index].selection = false
          }
        }
      }
    },
    watch: {
      'rowKey': function () {
        this.editRowKey = this.rowKey;
      },
      'selectedTemp.list': function () {
        this.calcselectedTemp();
      },
    },

  }
</script>

<style>
  #user-edit-advice-name-table .expanded {
    display: table-row !important;
  }

  #user-edit-advice-name-table .el-table__expand-icon {
    -webkit-transform: rotate(90deg) !important;
    transform: rotate(90deg) !important;
  }

  #dialysis-update-select-template-table .el-table__row {
    display: table-row !important;
  }

  #dialysis-update-select-template-table .el-table__expand-icon {
    -webkit-transform: rotate(90deg) !important;
    transform: rotate(90deg) !important;
  }
</style>
