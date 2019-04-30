<template>
  <div id="user-edit-group-advice">
    <el-dialog title="新增医嘱" :visible.sync="groupAddFormVisible" width="700px">
      <el-form ref="groupForm" :rules="groupRules" :model="groupForm" label-width="90px">

        <el-row>
          <el-col :span="12">
            <el-form-item label="医嘱类型 :" required prop="advice_type">
              <el-input value="临时" disabled></el-input>
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

        <el-form-item label="备注 :">
          <el-input type="textarea" v-model="groupForm.remark"></el-input>
        </el-form-item>

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

        <el-row style="margin-bottom: 20px;margin-top: 20px">
          <el-col :span="5">
            <!--<el-button-->
            <!--:disabled="$store.getters.xt_user.subscibe.state==3?true:false"-->
            <!--type="primary"-->
            <!--@click="openAdviceTemplate()"-->
            <!--&gt;选择医嘱模板</el-button>-->

            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" round
                       @click="openAdviceTemplate()">选择医嘱模板
            </el-button>


          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="5">
            <!--<el-button-->
            <!--:disabled="$store.getters.xt_user.subscibe.state==3?true:false"-->
            <!--type="primary"-->
            <!--@click="openGroupAdvice(0)"-->
            <!--&gt;新增医嘱内容</el-button>-->

            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" round
                       @click="openGroupAdvice(0)">新增医嘱内容
            </el-button>

          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="5">
            <!--<el-button-->
            <!--:disabled="$store.getters.xt_user.subscibe.state==3?true:false"-->
            <!--type="primary"-->
            <!--@click="openGroupAdvice(1)"-->
            <!--&gt;修改医嘱内容</el-button>-->

            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" round
                       @click="openGroupAdvice(1)">修改医嘱内容
            </el-button>

          </el-col>

          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="5">
            <!--<el-button-->
            <!--:disabled="$store.getters.xt_user.subscibe.state==3?true:false"-->
            <!--type="primary"-->
            <!--@click="openDeleteGroupAdvice()"-->
            <!--&gt;删除医嘱内容</el-button>-->

            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" round
                       @click="openDeleteGroupAdvice()">删除医嘱内容
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
              style="width: 100%;margin-top: 10px;margin-bottom: 10px;"
              :row-key="getRowKey"
              ref="advicenametable"

            >
              <el-table-column
                label="医嘱名称"
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
                    vf-i="scope.row.prescribing_number!=0"
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
      <div slot="footer" class="dialog-footer">
        <el-button
          :disabled="$store.getters.xt_user.subscibe.state==3 || groupForm.adviceNames.length == 0?true:false"
          type="primary"
          @click="submitgroupAdvice('groupForm')"
        >确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择医嘱模板" :close-on-click-modal="false"  :visible.sync="templateFormVisible" width="72%">
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
            id='dialysis-add-select-template-table'
            :data="selectedTemp.list"
            border
            :span-method="spanselecttable"
            @select="selectAdvice"
            @select-all="selectAllTemplateAdvice"
            @selection-change="changeAdvice"
            row-key="row_key"
            ref="selecttemplatetable"
            style="width: 100%"
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

    <el-dialog title="选择医嘱模板" :visible.sync="oldTemplateFormVisible" width="700px" >
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
    name: 'AddGroupAdvice',
    data() {
      return {
        editRowKey: 0,
        oldTemplateFormVisible: false,
        templateFormVisible: false,
        groupAddFormVisible: false,
        nameFormVisible: false,
        groupSelectRow: null,
        nameFormTitle: '',
        isChild: false,
        isEdit: false,
        adminusername: '',
        groupRules: {
          advice_type: [{required: true, message: "请选择医嘱类型",},],
          advice_date: [{required: true, message: "请选择医嘱时间",},],
          start_time: [{required: true, message: "请选择开始时间",},],
          advice_name: [{required: true, message: "请填写医嘱名称",},],
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
        groupForm: {
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
        allSelectedTemplate: [],

      }
    },
    props: {
      patientID: 0,
      adviceType: 0,
      rowKey: 0,
      adviceTemplates: {
        type: Array,
        default: function () {
          return []
        }
      },
      recordDate: '',
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

      submitgroupAdvice(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var submitForm = {
              advice_type: this.groupForm.advice_type,
              advice_date: this.groupForm.advice_date,
              start_time: this.groupForm.start_time,
              adviceNames: [],
              advice_doctor: this.groupForm.advice_doctor,
              remark: this.groupForm.remark,
              parent_id: this.groupForm.parent_id,
            };

            var adviceNames = [];
            for (const index in this.groupForm.adviceNames) {
              adviceNames.unshift(this.groupForm.adviceNames[index]);
            }
            submitForm.adviceNames = adviceNames;
            CreateGroupAdvice(this.patientID, 0, submitForm).then(response => {
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

                var childMap = {};
                for (const index in response.data.data.advices) {
                  if (response.data.data.advices[index].parent_id == 0) {
                    continue;
                  }
                  if (false === (response.data.data.advices[index].parent_id in childMap)) {
                    childMap[response.data.data.advices[index].parent_id] = [];
                  }
                  childMap[response.data.data.advices[index].parent_id].unshift(response.data.data.advices[index]);
                }
                var parentArr = [];
                for (const index in response.data.data.advices) {
                  if (response.data.data.advices[index].parent_id > 0) {
                    continue;
                  }
                  parentArr.push(response.data.data.advices[index]);
                }

                for (const index in parentArr) {
                  if (parentArr[index].id in childMap) {
                    for (const j in childMap[parentArr[index].id]) {
                      this.adviceTableData.unshift(childMap[parentArr[index].id][j]);
                    }
                  }
                  this.adviceTableData.unshift(parentArr[index]);
                }

                // var alen = response.data.data.advices.length
                // for (let index = alen-1; index >=0; index--) {
                //   this.adviceTableData.unshift(response.data.data.advices[index]);
                // }

                this.resetForm(formName);
                this.groupAddFormVisible = false;
                return false;
              }
            });
          }
        });
      },

      openDeleteGroupAdvice() {
        if (this.groupSelectRow === null) {
          this.$notify.error({
            title: "错误",
            message: "未选择要删除的医嘱内容"
          });
          return;
        }
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

        }).catch(() => {
        });
      },
      submitNameForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (_this.nameForm.isEdit) {
              var ale = _this.groupForm.adviceNames.length;
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
                    _this.groupForm.adviceNames[index].advice_desc = _this.nameForm.advice_desc;
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
            } else {
              if (_this.isChild) {
                _this.editRowKey++;
                _this.nameForm.row_key = _this.editRowKey;

                var ale = _this.groupForm.adviceNames.length;
                for (let index = 0; index < ale; index++) {
                  if (_this.nameForm.parent_row == _this.groupForm.adviceNames[index].row_key) {
                    _this.groupForm.adviceNames[index].children.push(_this.nameForm);
                    _this.$set(_this.groupForm.adviceNames, index, _this.groupForm.adviceNames[index]);
                    break;
                  }
                }
              } else {

                _this.editRowKey++;
                _this.nameForm.row_key = _this.editRowKey;
                _this.groupForm.adviceNames.push(_this.nameForm);
              }
            }
            _this.nameFormVisible = false;
          }
        });
        console.log(_this.groupForm.adviceNames)
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
            single_dose: this.groupSelectRow.single_dose!=0?this.groupSelectRow.single_dose:'',
            single_dose_unit: this.groupSelectRow.single_dose_unit,
            drug_spec: this.groupSelectRow.drug_spec!=0?this.groupSelectRow.drug_spec:'',
            drug_spec_unit: this.groupSelectRow.drug_spec_unit,
            prescribing_number: this.groupSelectRow.prescribing_number!=0?this.groupSelectRow.prescribing_number:'',
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

        console.log(selection)

        var adviceArray = this.adviceTemplateMaps[this.selectedTemp.id].DoctorAdviceTemplate
        console.log(adviceArray)
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

        console.log(adviceArray)


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
          if (this.selectedTemp.list[index].children.length > 0) {
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
              selection: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].selection,
              advice_id: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].id,

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

          this.groupForm.adviceNames.push(item);
        }
        this.templateFormVisible = false;
      },
      addTempForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if (_this.templateForm.id in _this.adviceTemplateMaps) {
              var mapid = _this.templateForm.id;
              for (const index in _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate) {
                this.editRowKey++;
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
                  row_key: this.editRowKey,
                }
                if ('children' in _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index] && _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children) {
                  var parentRow = this.editRowKey;
                  var children = _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children
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
                  _this.$set(item, 'children', item.children);
                }

                _this.groupForm.adviceNames.unshift(item);

              }
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
        this.groupAddFormVisible = true;
        this.groupSelectRow = null;
        if (typeof (this.$refs.advicenametable) != 'undefined') {
          this.$refs.advicenametable.setCurrentRow(null);
        }
        this.editRowKey = 0;
        this.groupForm = {
          advice_type: 2,
          advice_date: this.recordDate,
          start_time: "",
          adviceNames: [],
          advice_doctor: "",
          remark: "",
          parent_id: 0,
        }
        var xtuser = this.$store.getters.xt_user;
        // this.orgname = xtuser.org.org_name;
        this.adminusername = xtuser.user.user_name;
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
      }, cancleDialog() {
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
      'selectedTemp.list': function () {
        this.calcselectedTemp();
      },
    },

  }
</script>

<style>
  #user-edit-advice-name-table .el-table__row {
    display: table-row !important;
  }

  #user-edit-advice-name-table .el-table__expand-icon {
    -webkit-transform: rotate(90deg) !important;
    transform: rotate(90deg) !important;
  }

  #dialysis-add-select-template-table .el-table__row {
    display: table-row !important;
  }

  #dialysis-add-select-template-table .el-table__expand-icon {
    -webkit-transform: rotate(90deg) !important;
    transform: rotate(90deg) !important;
  }
</style>

