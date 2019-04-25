<template>
  <div class="doctor-advice-box">
    <el-dialog
      :title="title"
      :visible.sync="isVisibility"
      width="72%"
      @close="resetDialog"
    >
      <div class="txsj" v-show="showAdvicePanel">
        <el-button  round @click="openGroupFrom" :loading="deleLoading">新增医嘱</el-button>

        <el-button v-if="currentRow != null" round @click="execAdvice" :loading="deleLoading">执行医嘱</el-button>
        <el-button v-else disabled round @click="execAdvice" :loading="deleLoading">执行医嘱</el-button>

        <el-button v-if="currentRow != null" round @click="checkAdvice" :loading="deleLoading">医嘱核对</el-button>
        <el-button v-else disabled round @click="checkAdvice" :loading="deleLoading">医嘱核对</el-button>

        <el-button v-if="groupSelectRow != null" round @click="openEditGroupAdvice" :loading="deleLoading">修改医嘱</el-button>
        <el-button v-else disabled round @click="openEditGroupAdvice" :loading="deleLoading">修改医嘱</el-button>


        <el-button  v-if="groupSelectRow != null"   round @click="openDeleteGroupAdvice" :loading="deleLoading">删除医嘱</el-button>
        <el-button v-else disabled round @click="openDeleteGroupAdvice" :loading="deleLoading">修改医嘱</el-button>

        <!--<el-button round @click="openNewChild" :loading="deleLoading">新增子药</el-button>-->
      </div>
      <!-- 医嘱列表 -->
      <!--&lt;!&ndash;:header-cell-style="{ backgroundColor: 'rgb(64, 158, 255)', color: 'white'}"&ndash;&gt;@current-change="selectRow"-->
      <el-table :data="doctor_advices" border style="width: 100%" v-show="showAdvicePanel"
                ref="advices_list" :row-class-name="tableRowClassName" :span-method="mergeSpan"
                @row-click="cellMouseEnter"
      >
        <el-table-column prop="date" label="开嘱医生" align="center" min-width="26px">
          <template slot-scope="scope">
            <span v-if="isShowStartTime(scope.$index, scope.row)">{{getXuserName(scope.row.advice_doctor)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="start_time" label="开始时间" align="center" min-width="35px">
          <template slot-scope="scope">
            <span v-if="isShowStartTime(scope.$index, scope.row)">{{scope.row.start_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
          </template>



        </el-table-column>
        <el-table-column prop="advice_name" min-width="50px" label="医嘱内容">
          <template slot-scope="scope">

            <el-dropdown trigger="click" v-if="scope.row.parent_id == 0">

              <span class="el-dropdown-link">{{getAdviceContent(scope.row,1)}}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <!--<span>{{scope.row.advice_name }}</span>-->
              <!--<span>{{scope.row.advice_desc}}</span>-->
              <!--<span v-if="scope.row.single_dose">{{scope.row.single_dose}}{{scope.row.single_dose_unit}}</span>-->
              <!--<span v-if="scope.row.drug_spec">{{scope.row.drug_spec}}{{scope.row.drug_spec_unit}}</span>-->
              <!--<span v-if="scope.row.prescribing_number">* {{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}</span>-->
              <!--<span>{{scope.row.delivery_way}}</span>-->
              <!--<span>{{scope.row.execution_frequency}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>-->



              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="openEdit(scope.$index, scope.row)">修改医嘱</el-dropdown-item>
                <el-dropdown-item @click.native="openDelete(scope.$index, scope.row)">删除医嘱</el-dropdown-item>
                <el-dropdown-item @click.native="openNewChildTwo(scope.$index, scope.row)">新增子药</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>


            <el-dropdown trigger="click" v-if="scope.row.parent_id > 0">
              <span class="el-dropdown-link">&emsp;{{getAdviceContent(scope.row,2)}}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="openEdit(scope.$index, scope.row)">修改子药
                </el-dropdown-item>
                <el-dropdown-item
                  @click.native="openDelete(scope.$index, scope.row)">删除子药
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>










          </template>
        </el-table-column>
        <el-table-column prop="execution_time" align="center" min-width="30px" label="执行时间">
          <template slot-scope="scope">
            <span v-if="scope.row.execution_time!=0">{{scope.row.start_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="execution_staff" align="center" min-width="30px" label="执行护士">
          <template slot-scope="scope">
            <span v-if="scope.row.parent_id==0">{{getXuserName(scope.row.execution_staff)}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="checker" min-width="30px" align="center" label="核对人员">
          <template slot-scope="scope">
            <span v-if="scope.row.parent_id==0">{{getXuserName(scope.row.checker)}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作" min-width="20" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="primary" size="mini"-->
                       <!--@click="scope.row.groupno>0?openEditGroupAdvice(scope.row.groupno):openEdit(scope.$index, scope.row)"-->
                       <!--v-if="isShowStartTime(scope.$index, scope.row)">编辑-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <!-- 医嘱列表 end -->

      <!-- 医嘱表单 -->
      <el-form ref="form" :model="form" label-width="100px" v-show="showAdviceForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="医嘱类型：">
              <el-input value="临时" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="医嘱时间：">
              <el-input v-model="form.advice_date" readonly></el-input>
              <!-- <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间：">
              <el-date-picker format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"
                              placeholder="选择日期" v-model="form.start_time" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="医嘱名称：">
              <el-input v-model="form.advice_name"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="给药途径：">
              <el-select v-model="form.delivery_way" :disabled="form.parent_id==0?false:true" filterable
                         placeholder="请选择(输入可搜索)">
                <el-option v-for="item in deliveryWayOptions" :key="item.id" :label="item.name " :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执行频率：">
              <el-select v-model="form.execution_frequency" :disabled="form.parent_id==0?false:true" filterable
                         placeholder="请选择(输入可搜索)">
                <el-option v-for="item in executionFrequencyOptions" :key="item.id" :label="item.name "
                           :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="药品规格：">
              <el-input v-model="form.drug_spec" style="width: 40%;"></el-input>
              <el-select v-model="form.drug_spec_unit" style="width: 56%;" filterable placeholder="选择">
                <el-option v-for="item in unitsOption" :key="item.id" :label="item.name " :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="医嘱内容：">
                <el-input v-model="form.advice_desc"></el-input>
            </el-form-item> -->
          </el-col>
          <el-col :span="8">
            <el-form-item label="单次用量：">
              <el-input v-model="form.single_dose" style="width: 40%;"></el-input>
              <el-select v-model="form.single_dose_unit" style="width: 56%;" filterable placeholder="选择">
                <el-option v-for="item in unitsOption" :key="item.id" :label="item.name " :value="item.name">
                </el-option>
              </el-select>

              <!-- <el-input v-model="form.single_dose_unit" style="width: 40%;"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开药数量：">
              <el-input v-model="form.prescribing_number" style="width: 40%;"></el-input>
              <el-select v-model="form.prescribing_number_unit" style="width: 56%;" filterable placeholder="选择">
                <el-option v-for="item in unitsOption" :key="item.id" :label="item.name " :value="item.name">
                </el-option>
              </el-select>
              <!-- <el-input v-model="form.prescribing_number_unit" style="width: 40%;"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-show="showAdviceForm">
        <el-button @click="hideForm">取 消</el-button>
        <el-button type="primary" v-if="form.id==0" @click="submitAdvice" :loading="loading">确 定</el-button>
        <el-button type="primary" v-else @click="submitEditAdvice" :loading="loading">确 定</el-button>
      </div>
      <!-- 医嘱表单 end -->


    </el-dialog>
    <el-dialog
      title="选择执行时间"
      :visible.sync="execTimeDialogVisible"
      width="30%"
      @close="closeTimePanel"

      :show-close="isClose"
      :close-on-click-modal="isClose"
      :close-on-press-escape="isClose"

      center>
      <el-date-picker
        v-model="execTime"
        format="yyyy-MM-dd HH:mm:00"
        value-format="yyyy-MM-dd HH:mm:00"
        type="datetime"
        placeholder="选择执行时间"
        style="width:100%"
      >
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
                <el-button @click="closeTimePanel" :loading="exceLoading">取 消</el-button>
                <el-button type="primary" @click="submitExce" :loading="exceLoading">确 定</el-button>
            </span>
    </el-dialog>

    <add-group-advice :adviceTemplates="adviceTemplates" :executionFrequencyOptions="executionFrequencyOptions"
                      :unitsOption="unitsOption" :deliveryWayOptions="deliveryWayOptions"
                      :adviceTemplateMaps="adviceTemplateMaps" :patientID="patient.id" :adviceTableData="doctor_advices"
                      :recordDate="record_date" ref="addGroupForm"></add-group-advice>

    <edit-group-advice :adviceTemplates="adviceTemplates" :executionFrequencyOptions="executionFrequencyOptions"
                       :unitsOption="unitsOption" :deliveryWayOptions="deliveryWayOptions"
                       :adviceTemplateMaps="adviceTemplateMaps" :patientID="patient.id"
                       :adviceTableData="doctor_advices" :recordDate="record_date"
                       ref="editGroupForm" v-on:add-new-order="addNewOrder" :admin_users="admin_users"></edit-group-advice>
  </div>
</template>

<script>
  import AddGroupAdvice from './adviceDialog/AddGroupAdvice';
  import EditGroupAdvice from './adviceDialog/EditGroupAdvice';
  import {uParseTime} from "@/utils/tools";
  import {
    CheckDoctorAdvice,
    CreateDoctorAdvice,
    CreateGroupAdvice,
    DeleteDoctorAdvice,
    DeleteGroupAdvice,
    EditDoctorAdvice,
    ExecDoctorAdvice,
    getAdviceConfig
  } from "@/api/advice";
  import {getDataConfig} from '@/utils/data';

  export default {
    name: "DoctorAdviceDialog",
    props: {
      dialysis_order: {
        // 透析记录
        type: Object,
        default: () => {
          return {id: 0};
        }
      },
      patient: {
        // 患者信息
        type: Object,
        default: () => {
          return {id: 0};
        }
      },
      doctor_advices: {
        type: Array
      },
      admin_users: { //系统用户列表
        type: Array,
        default: () => {
          return []
        }
      },
    },
    data() {
      return {
        tempArr: [],
        execTimeDialogVisible: false,
        currentBoxClass: 'current-box-class',
        isClose: false,
        isShow: false,
        loading: false,
        sameRowArr: [],
        hoverOrderArr: [],
        isVisibility: false,
        record_date: "",
        deleLoading: false,
        exceLoading: false,
        execTime: '',
        current_group_index: -1,
        title: '临时医嘱',
        showAdviceForm: false,
        showAdvicePanel: true,
        showNameForm: false,
        showGroupForm: false,
        showTemplateForm: false,
        current_template_id: -1,
        adviceTemplates: [],
        adviceTemplateMaps: {},
        deliveryWayOptions: [],
        executionFrequencyOptions: [],
        unitsOption: [],
        // admin_users: [],

        templateRules: {
          id: [{required: true, message: "请选择医嘱模板",},],
        },
        nameRules: {
          advice_name: [{required: true, message: "请填写医嘱内容",},],
        },
        form: {
          id: 0,
          advice_type: 2,
          advice_date: "",
          start_time: "",
          advice_name: "",
          advice_desc: "",
          single_dose: "",
          single_dose_unit: "",
          prescribing_number: "",
          prescribing_number_unit: "",
          delivery_way: "",
          execution_frequency: "",
          advice_doctor: "",
          remark: "",
          parent_id: 0
        },
        nameForm: {
          advice_name: "",
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
        },
        groupForm: {
          advice_type: 2,
          advice_date: "",
          start_time: "",
          adviceNames: [],
          advice_doctor: "",
          remark: "",
          parent_id: 0,
        },
        adviceList: [],
        currentIndex: -1,
        currentRow: null,
        groupSelectRow: null,

        templateForm: {id: ''},
      };
    },
    watch: {
      "assessment_after_dislysis.id": function () {
        if (this.assessment_after_dislysis.id > 0) {
          for (var index in this.form) {
            this.form[index] = this.assessment_after_dislysis[index];
          }
        }
      },
      "dialysis_order.id": function () {
        this.form["dialysis_order_id"] = this.dialysis_order.id;
      },
      "doctor_advices": function () {
        this.handleSpanTempArr()
        this.hoverOrderArr = []
        this.handleStyle()
      }

    },
    methods: {

      submitEditAdvice() {

        if (this.form.advice_name.length == 0) {
          this.$message.error("请填写医嘱名称");
          return
        }
        if (this.form.start_time.length == 0) {
          this.$message.error("请选择开始时间");
          return
        }
        if (!(this.patient.id > 0)) {
          this.$message.error("没有选择患者");
          return false;
        }
        EditDoctorAdvice(this.patient.id, this.form.id, this.form).then(response => {
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

            this.showAdviceForm = false;
            this.showAdvicePanel = true;
            var advice = response.data.data.advice;
            this.doctor_advices[this.currentIndex].drug_spec = advice.drug_spec;
            this.doctor_advices[this.currentIndex].drug_spec_unit = advice.drug_spec_unit;
            this.doctor_advices[this.currentIndex].start_time = advice.start_time;
            this.doctor_advices[this.currentIndex].advice_name = advice.advice_name;
            this.doctor_advices[this.currentIndex].advice_desc = advice.advice_desc;
            this.doctor_advices[this.currentIndex].single_dose = advice.single_dose;
            this.doctor_advices[this.currentIndex].single_dose_unit = advice.single_dose_unit;
            this.doctor_advices[this.currentIndex].delivery_way = advice.delivery_way;
            this.doctor_advices[this.currentIndex].execution_frequency = advice.execution_frequency;
            this.doctor_advices[this.currentIndex].prescribing_number = advice.prescribing_number;
            this.doctor_advices[this.currentIndex].prescribing_number_unit = advice.prescribing_number_unit;
            this.doctor_advices[this.currentIndex].advice_doctor = advice.advice_doctor;
            this.doctor_advices[this.currentIndex].remark = advice.remark;
            this.currentIndex = -1;
            return false;
          }
        });
      },

      submitGroupAdvice() {
        if (this.groupForm.start_time.length == 0) {
          this.$message.error("请选择开始时间");
          return
        }
        CreateGroupAdvice(this.patient.id, this.groupForm).then(response => {
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
            this.currentIndex = -1;
            this.currentRow = null;
            this.setCurrent();
            this.hideGroupForm();
            for (const index in response.data.data.advices) {
              this.doctor_advices.unshift(response.data.data.advices[index]);
            }
            this.groupForm = {
              advice_type: 2,
              advice_date: "",
              start_time: "",
              adviceNames: [],
              advice_doctor: "",
              remark: "",
              parent_id: 0,
            };
            return false;
          }
        });
      },
      submitTempForm() {
        var _this = this;
        if (this.templateForm.id.length == 0) {
          this.$message.error("请选择医嘱模板");
          return
        }
        if (_this.templateForm.id in _this.adviceTemplateMaps) {
          var mapid = _this.templateForm.id;
          for (const index in _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate) {
            var item = {
              advice_name: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].advice_name,
              single_dose: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose,
              single_dose_unit: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose_unit,
              drug_spec: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec,
              drug_spec_unit: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec_unit,
              prescribing_number: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number,
              prescribing_number_unit: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number_unit,
              delivery_way: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].delivery_way,
              execution_frequency: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].execution_frequency,
              isEdit: 0,
              index: 0,
            }
            _this.groupForm.adviceNames.push(item);
          }
        }
        this.title = "新增医嘱";
        this.showTemplateForm = false;
        this.showGroupForm = true;

      },
      openAdviceTemplate() {
        this.templateForm = {id: ''};
        this.title = "选择医嘱模板";
        this.showTemplateForm = true;
        this.showGroupForm = false;
      },
      submitNameForm() {
        if (this.nameForm.advice_name.length == 0) {
          this.$message.error("请填写医嘱名称");
          return
        }
        if (this.nameForm.isEdit) {
          this.groupForm.adviceNames[this.nameForm.index].advice_name = this.nameForm.advice_name;
          this.groupForm.adviceNames[this.nameForm.index].single_dose = this.nameForm.single_dose;
          this.groupForm.adviceNames[this.nameForm.index].single_dose_unit = this.nameForm.single_dose_unit;
          this.groupForm.adviceNames[this.nameForm.index].drug_spec = this.nameForm.drug_spec;
          this.groupForm.adviceNames[this.nameForm.index].drug_spec_unit = this.nameForm.drug_spec_unit;
          this.groupForm.adviceNames[this.nameForm.index].prescribing_number = this.nameForm.prescribing_number;
          this.groupForm.adviceNames[this.nameForm.index].prescribing_number_unit = this.nameForm.prescribing_number_unit;
          this.groupForm.adviceNames[this.nameForm.index].delivery_way = this.nameForm.delivery_way;
          this.groupForm.adviceNames[this.nameForm.index].execution_frequency = this.nameForm.execution_frequency;
        } else {
          this.groupForm.adviceNames.push(this.nameForm);
        }


        this.title = "新增医嘱";
        this.showNameForm = false;
        this.showGroupForm = true;

      },
      groupClassName({row, rowIndex}) {
        row.index = rowIndex;
      },
      selectGroupAdvice(row) {
        this.groupSelectRow = row;
      },
      openDeleteGroupAdvice() {
        if (this.groupSelectRow === null) {
          this.$notify.error({
            title: "错误",
            message: "未选择要删除的医嘱内容"
          });
          return;
        }
        this.DeleteGroupAdvice(this.groupSelectRow.groupno)

        // this.$confirm('确认删除些条医嘱内容?', '删除医嘱内容', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   this.groupForm.adviceNames.splice(this.groupSelectRow.index, 1);
        // }).catch(() => {
        // });
      },
      openAdviceName(isEdit) {
        if (isEdit) {
          if (this.groupSelectRow === null) {
            this.$notify.error({
              title: "错误",
              message: "未选择要修改的医嘱内容"
            });
            return;
          }
          this.nameForm = {
            advice_name: this.groupSelectRow.advice_name,
            single_dose: this.groupSelectRow.single_dose,
            single_dose_unit: this.groupSelectRow.single_dose_unit,
            drug_spec: this.groupSelectRow.drug_spec,
            drug_spec_unit: this.groupSelectRow.drug_spec_unit,
            prescribing_number: this.groupSelectRow.prescribing_number,
            prescribing_number_unit: this.groupSelectRow.prescribing_number_unit,
            delivery_way: this.groupSelectRow.delivery_way,
            execution_frequency: this.groupSelectRow.execution_frequency,
            isEdit: 1,
            index: this.groupSelectRow.index,
          };
        } else {
          this.nameForm = {
            advice_name: "",
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
          };
        }

        this.title = "新增医嘱内容";
        this.showNameForm = true;
        this.showGroupForm = false;
      },
      tableRowClassName({row, rowIndex}) {
        // if (row.stop_state == 1 || row.execution_state == 1) {
        //     return 'stoped-row';
        // }
        // return 'success-rows'
        row.index = rowIndex
        let arr = this.hoverOrderArr
        for (let i = 0; i < arr.length; i++) {
          if (rowIndex == arr[i]) {
            return 'success-row'

          }
        }
      },
      changeAdviceName(key) {
        if (key in this.adviceTemplateMaps) {
          this.form.advice_name = this.adviceTemplateMaps[key].advice_name;
          this.form.advice_desc = this.adviceTemplateMaps[key].advice_desc;
          this.form.single_dose_unit = this.adviceTemplateMaps[key].single_dose_unit;
          this.form.single_dose = this.adviceTemplateMaps[key].single_dose + "";
          this.form.prescribing_number_unit = this.adviceTemplateMaps[key].prescribing_number_unit;
          this.form.prescribing_number = this.adviceTemplateMaps[key].prescribing_number + "";
          this.form.delivery_way = this.adviceTemplateMaps[key].delivery_way;
          this.form.execution_frequency = this.adviceTemplateMaps[key].execution_frequency;
        }
      },
      submitExce() {
        if (this.currentRow == null) {
          this.$message.error("请先选择要执行的医嘱！");
          return false;
        }
        if (this.execTime.length == 0) {
          this.$message.error("请选择执行时间！");
          return false;
        }
        this.exceLoading = true;

        ExecDoctorAdvice(this.patient.id, this.currentRow.id, this.execTime).then(response => {
          if (response.data.state == 0) {
            this.$message.error("执行失败！");
            this.exceLoading = false;
            return false;
          } else {
            this.$notify({
              title: "成功",
              message: "执行医嘱成功",
              type: "success",
              duration: 2000
            });
            var exid = response.data.data.advice.id;
            if (response.data.data.advice.parent_id > 0) {
              exid = response.data.data.advice.parent_id;
            }
            // if (this.currentRow.parent_id > 0) {
            //     exid = this.currentRow.parent_id;
            // }
            this.currentRow.execution_state = 1;
            this.currentRow.execution_staff = response.data.data.advice.execution_staff;
            this.currentRow.execution_time = response.data.data.advice.execution_time;
            var alen = this.doctor_advices.length;

            for (var index in this.doctor_advices) {
              if (this.doctor_advices[index].id == exid || this.doctor_advices[index].parent_id == exid) {
                this.doctor_advices[index].execution_state = 1;
                this.doctor_advices[index].execution_staff = response.data.data.advice.execution_staff;
                this.doctor_advices[index].execution_time = response.data.data.advice.execution_time;
                // this.doctor_advices[index].checker = response.data.data.advice.checker;
                break;
              }
            }
            this.execTimeDialogVisible = false;
            return false;
          }
        }).catch(() => {
          this.exceLoading = false;
        });
        ;
      },
      submitAdvice() {
        if (this.form.advice_name.length == 0) {
          this.$message.error("请填写医嘱名称");
          return
        }
        if (this.form.start_time.length == 0) {
          this.$message.error("请选择开始时间");
          return
        }
        if (!(this.patient.id > 0)) {
          this.$message.error("没有选择患者");
          return false;
        }

        CreateDoctorAdvice(this.patient.id, this.form).then(response => {
          this.loading = false;
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

            this.currentIndex = -1;
            this.currentRow = null;
            this.setCurrent();
            this.hideForm();

            if (this.form.parent_id > 0) {
              var spliceIndex = -1;
              for (let index = this.doctor_advices.length - 1; ; index--) {
                if (this.doctor_advices[index].parent_id === this.form.parent_id) {
                  spliceIndex = index;
                  break;
                } else if (this.doctor_advices[index].id === this.form.parent_id) {
                  spliceIndex = index;
                  break;
                }
              }
              if (spliceIndex > -1) {
                spliceIndex += 1;
                if (spliceIndex === this.doctor_advices.length) {
                  this.doctor_advices.push(response.data.data.advice);
                } else {
                  var swapData = this.doctor_advices.splice(spliceIndex);
                  this.doctor_advices.push(response.data.data.advice);
                  for (var index in swapData) {
                    this.doctor_advices.push(swapData[index]);// = this.doctor_advices.concat(swapData);
                  }

                }
              }
            } else {
              this.doctor_advices.unshift(response.data.data.advice);
            }
            // this.$emit("new_create", response.data.data.advice);
            return false;
          }
        }).catch(v => {
          this.loading = false;
        });
      },openNewChildTwo(index, row){
        this.currentRow = row
        if (this.currentRow == null) {
          this.$message.error("请先选择要新增子药的医嘱！");
          return false;
        }
        if (this.currentRow.stop_state == 1 || this.currentRow.execution_state == 1) {
          this.$message.error("所选医嘱已停止或执行");
          return false;
        }

        this.title = "新增子药";
        this.showAdviceForm = true;
        this.showAdvicePanel = false;


        this.form = {
          id: 0,
          advice_type: 2,
          advice_date: this.record_date,
          start_time: uParseTime(
            this.currentRow.start_time,
            "{y}-{m}-{d} {h}:{i}:{s}"
          ),
          advice_name: "",
          drug_spec: '',
          drug_spec_unit: "",
          single_dose: "",
          single_dose_unit: "",
          prescribing_number: "",
          prescribing_number_unit: "",
          delivery_way: this.currentRow.delivery_way,
          execution_frequency: this.currentRow.execution_frequency,
          advice_doctor: "",
          remark: "",
          parent_id: this.currentRow.id
        };


      },

      openNewChild() {
        if (this.currentRow == null) {
          this.$message.error("请先选择要新增子药的医嘱！");
          return false;
        }
        if (this.currentRow.stop_state == 1 || this.currentRow.execution_state == 1) {
          this.$message.error("所选医嘱已停止或执行");
          return false;
        }

        this.title = "新增子药";
        this.showAdviceForm = true;
        this.showAdvicePanel = false;


        this.form = {
          id: 0,
          advice_type: 2,
          advice_date: this.record_date,
          start_time: uParseTime(
            this.currentRow.start_time,
            "{y}-{m}-{d} {h}:{i}:{s}"
          ),
          advice_name: "",
          drug_spec: '',
          drug_spec_unit: "",
          single_dose: "",
          single_dose_unit: "",
          prescribing_number: "",
          prescribing_number_unit: "",
          delivery_way: this.currentRow.delivery_way,
          execution_frequency: this.currentRow.execution_frequency,
          advice_doctor: "",
          remark: "",
          parent_id: this.currentRow.id
        };
      },

      openEdit(index, row) {

        if (row.stop_state == 1 || row.execution_state == 1) {
          this.$message.error("所选医嘱已停止或执行");
          return false;
        }

        this.title = row.parent_id > 0 ? "编辑子药" : '编辑医嘱';
        this.showAdviceForm = true;
        this.showAdvicePanel = false;
        this.currentIndex = index;

        this.form = {
          id: row.id,
          advice_type: 2,
          advice_date: uParseTime(
            row.advice_date,
            "{y}-{m}-{d}"
          ),
          start_time: uParseTime(
            row.start_time,
            "{y}-{m}-{d} {h}:{i}:{s}"
          ),
          advice_name: row.advice_name,
          drug_spec: '' + row.drug_spec,
          drug_spec_unit: row.drug_spec_unit,
          single_dose: '' + row.single_dose,
          single_dose_unit: row.single_dose_unit,
          prescribing_number: '' + row.prescribing_number,
          prescribing_number_unit: row.prescribing_number_unit,
          delivery_way: row.delivery_way,
          execution_frequency: row.execution_frequency,
          advice_doctor: row.advice_doctor,
          remark: row.remark,
          parent_id: row.parent_id,
        };
      },

      openEditGroupAdvice() {
        if (this.groupSelectRow === null) {
          this.$notify.error({
            title: "错误",
            message: "未选择要修改的医嘱内容"
          });
          return;
        }

        this.$refs.editGroupForm.open(this.groupSelectRow.groupno);
      },


      openGroupFrom() {
        this.$refs.addGroupForm.open();

        // this.title="新增医嘱";

        // this.showGroupForm = true;
        // this.showAdviceForm = false;
        // this.showAdvicePanel = false;
        // this.$refs.advices_list.setCurrentRow(null);

        // this.currentIndex = -1;
        // this.currentRow = null;

        // this.groupForm.advice_date = this.record_date;
        // this.form = {
        //     id: 0,
        //     advice_type: 2,
        //     advice_date: this.record_date,
        //     start_time: "",
        //     advice_name: "",
        //     advice_desc: "",
        //     single_dose: "",
        //     single_dose_unit: "",
        //     prescribing_number: "",
        //     prescribing_number_unit: "",
        //     delivery_way: "",
        //     execution_frequency: "",
        //     advice_doctor: "",
        //     remark: "",
        //     parent_id: 0
        // };
      },
      checkAdvice() {
        console.log(this.$store.getters.xt_user)
        if (this.currentRow == null) {
          this.$message.error("请先选择要核对的医嘱！");
          return false;
        }
        if (this.currentRow.check_state == 1) {
          this.$message.error("所选医嘱已核对");
          return false;
        }

        if (this.currentRow.execution_staff > 0 && this.currentRow.execution_staff == this.$store.getters.xt_user.user.id) {
          this.$message.error("核对与执行不能是同一人");

          return false;
        }

        this.$confirm('确认提交核对?', '医嘱核对', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.deleLoading = true;
          CheckDoctorAdvice(this.patient.id, this.currentRow.id).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);

              this.deleLoading = false;
              return false;
            } else {
              this.$notify({
                title: "成功",
                message: "核对成功",
                type: "success",
                duration: 2000
              });

              var exid = response.data.data.advice.id;
              if (response.data.data.advice.parent_id > 0) {
                exid = response.data.data.advice.parent_id;
              }
              // if (this.currentRow.parent_id > 0) {
              //     exid = this.currentRow.parent_id;
              // }
              this.currentRow.check_state = 1;
              this.currentRow.check_time = response.data.data.advice.check_time;
              this.currentRow.checker = response.data.data.advice.checker;
              var alen = this.doctor_advices.length;

              for (var index in this.doctor_advices) {
                if (this.doctor_advices[index].id == exid || this.doctor_advices[index].parent_id == exid) {
                  this.doctor_advices[index].check_state = 1;
                  this.doctor_advices[index].check_time = response.data.data.advice.check_time;
                  this.doctor_advices[index].checker = response.data.data.advice.checker;
                  // break;
                }
              }

              this.deleLoading = false;
            }
          });
        }).catch(() => {
          this.deleLoading = false;
        });

      },
      execAdvice() {
        if (this.currentRow == null) {
          this.$message.error("请先选择要执行的医嘱！");
          return false;
        }

        if (this.currentRow.stop_state == 1 || this.currentRow.execution_state == 1) {
          this.$message.error("所选医嘱已停止或执行");
          return false;
        }

        if (this.currentRow.checker > 0 && this.currentRow.checker == this.$store.getters.xt_user.user.id) {
          this.$message.error("核对与执行不能是同一人");
          return false;
        }

        this.execTimeDialogVisible = true;
        this.deleLoading = true;
      },

      DeleteGroupAdvice(groupno) {
        this.$confirm('确认删除这组医嘱?', '医嘱删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteGroupAdvice(groupno).then(response => {
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

              var alen = this.doctor_advices.length;
              for (let index = alen - 1; index >= 0; index--) {
                if (this.doctor_advices[index].groupno === groupno) {
                  this.doctor_advices.splice(index, 1);
                }
              }
            }
          });
        }).catch(() => {
        });
        this.handleSpanTempArr()

      },
      openDelete(index, row) {
        this.currentRow = row;
        this.$confirm('确认删除此条医嘱?', '医嘱删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.deleLoading = true;
          DeleteDoctorAdvice(this.currentRow.id).then(response => {
            this.deleLoading = false;
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
              this.deleteResetData(this.currentRow);
              this.currentRow = null;
              this.setCurrent();
            }
          });
        }).catch(() => {
          this.deleLoading = false;
        });



      },
      deleteAdvice() {
        if (this.currentRow == null) {
          this.$message.error("请先选择要删除的医嘱！");
          return false;
        }
        this.$confirm('确认删除此条医嘱?', '医嘱删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.deleLoading = true;
          DeleteDoctorAdvice(this.currentRow.id).then(response => {
            this.deleLoading = false;
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
              this.deleteResetData(this.currentRow);
              this.currentRow = null;
              this.setCurrent();
            }
          });
        }).catch(() => {
          this.deleLoading = false;
        });
      },

      deleteResetData(row) {
        if (row.parent_id > 0) {
          for (var index in this.doctor_advices) {
            if (this.doctor_advices[index].id == row.id) {
              this.doctor_advices.splice(index, 1);
              break;
            }
          }
        } else {
          var spliceIndex = -1;
          var splitNums = 0;
          for (var index in this.doctor_advices) {
            if (this.doctor_advices[index].id == row.id) {
              spliceIndex = index;
              splitNums++;
            } else if (this.doctor_advices[index].parent_id == row.id) {
              splitNums++;
            }
          }
          this.doctor_advices.splice(spliceIndex, splitNums);


        }
      },
      selectRow(row) {
        this.currentRow = row;
      },
      getAdviceConfig() {
        getAdviceConfig().then(response => {
          if (response.data.state == 1) {
            this.deliveryWayOptions = response.data.data.drugways === null ? [] : response.data.data.drugways;
            this.executionFrequencyOptions = response.data.data.efs === null ? [] : response.data.data.efs;
            this.adviceTemplates = response.data.data.advice_templates === null ? [] : response.data.data.advice_templates;

            var templateLen = this.adviceTemplates.length;
            for (let index = 0; index < templateLen; index++) {
              if (!this.adviceTemplates[index].DoctorAdviceTemplate) {
                continue;
              }
              var DoctorAdviceTemplate = this.adviceTemplates[index].DoctorAdviceTemplate
              for(let i = 0; i < DoctorAdviceTemplate.length; i++){
                DoctorAdviceTemplate[i].selection = false
              }

              var item = this.adviceTemplates[index];
              item.DoctorAdviceTemplate = [];
              var datMap = {};
              for (const key in DoctorAdviceTemplate) {
                if (DoctorAdviceTemplate[key].parent_id == 0) {
                  datMap[DoctorAdviceTemplate[key].id] = DoctorAdviceTemplate[key];
                }
              }

              for (const key in DoctorAdviceTemplate) {
                if (DoctorAdviceTemplate[key].parent_id in datMap) {
                  if ('children' in datMap[DoctorAdviceTemplate[key].parent_id]) {
                    datMap[DoctorAdviceTemplate[key].parent_id].children.push(DoctorAdviceTemplate[key]);
                  } else {
                    datMap[DoctorAdviceTemplate[key].parent_id].children = [];
                    datMap[DoctorAdviceTemplate[key].parent_id].children.push(DoctorAdviceTemplate[key]);
                  }
                }
              }
              for (const key in datMap) {
                item.DoctorAdviceTemplate.push(datMap[key]);
              }

              this.$set(this.adviceTemplateMaps, this.adviceTemplates[index].id, item);
            }
          }
        });

        this.handleSpanTempArr()
        this.handleStyle()
      },
      getXuserName(id) {
        if (id <= 0) {
          return "";
        }
        var name = "";
        if (
          this.admin_users == null ||
          typeof this.admin_users.length == "undefined"
        ) {
          return name;
        }
        var leng = this.admin_users.length;
        if (leng == 0) {
          return name;
        }
        for (let index = 0; index < leng; index++) {
          if (this.admin_users[index].id == id) {
            name = this.admin_users[index].name;
            break;
          }
        }
        return name;
      },addNewOrder(){
        this.$refs.addGroupForm.open();
      },
      show() {
        this.isVisibility = true;
      },
      hide() {
        this.isVisibility = false;
      },
      hideForm() {
        this.title = "临时医嘱";
        this.showGroupForm = false;
        this.showAdviceForm = false;
        this.showAdvicePanel = true;
      },
      hideNameForm() {
        this.title = "新增医嘱";
        this.showGroupForm = true;
        this.showNameForm = false;
      },
      hideTemplateForm() {
        this.title = "新增医嘱";
        this.showGroupForm = true;
        this.showTemplateForm = false;
      },
      hideGroupForm() {
        this.title = "临时医嘱";
        this.showAdviceForm = false;
        this.showGroupForm = false;
        this.showAdvicePanel = true;
      },
      resetDialog() {
        this.hoverOrderArr =[]
        this.title = "临时医嘱";
        this.showAdviceForm = false;
        this.showGroupForm = false;
        this.showAdvicePanel = true;
        this.currentRow = null;
        this.groupSelectRow = null;
        this.setCurrent();
      },
      closeTimePanel() {
        this.execTimeDialogVisible = false;
        this.deleLoading = false;
        this.exceLoading = false;
        this.execTime = '';
      },
      setCurrent(row) {
        this.$refs.advices_list.setCurrentRow(row);
      },
      isShowStartTime(index, row) {
        if (row.parent_id > 0) {
          return false;
        } else if (index > 0 && row.groupno > 0 && row.groupno == this.doctor_advices[index - 1].groupno) {
          return false;
        }
        return true;
      }, mergeSpan({row, column, rowIndex, columnIndex}) {
        if (columnIndex != 2) {
          const _row = this.tempArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }, handleSpanTempArr() {
        this.tempArr = []

        for (let i = 0; i < this.doctor_advices.length; i++) {
          if (i === 0) {
            this.tempArr.push(1);
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (this.doctor_advices[i].groupno === this.doctor_advices[i - 1].groupno) {
              this.tempArr[this.pos] += 1;
              this.tempArr.push(0);
            } else {
              this.tempArr.push(1);
              this.pos = i;
            }
          }
        }

      }, cellMouseEnter: function (row, column, event) {
        this.currentRow = row;
        this.groupSelectRow = row;
        this.sameRowArr.forEach((arr, i) => {
          if (arr.indexOf(row.index) != -1) {
            this.hoverOrderArr = arr
          }
        })
      }, cellMouseLeave: function (row, column, cell, event) {
        this.hoverOrderArr = []
      }, handleStyle() {

        let sameRowArr = [], sIdx = 0;

        this.doctor_advices.forEach((item, index) => {
          item.index = index
          if (index === 0) {
            sameRowArr.push([index])
          } else {
            if (item.groupno === this.doctor_advices[index - 1].groupno) {
              sameRowArr[sIdx].push(index)
            } else {
              sIdx = sIdx + 1;
              sameRowArr.push([index])
            }
          }
        })

        this.sameRowArr = sameRowArr;

      },getAdviceContent(row,isChild){
        let tempSingleDoseDesc = ""
        let tempDrugSpecDesc = ""
        let tempPrescribingNumberDesc = ""

        if(row.single_dose){
          tempSingleDoseDesc ="  "+row.single_dose + "" + row.single_dose_unit
        }
        // if(row.drug_spec){
        //   tempDrugSpecDesc = "  "+row.drug_spec + "" + row.drug_spec_unit
        // }
        if(row.prescribing_number){
          tempPrescribingNumberDesc = "*"+row.prescribing_number + "" + row.prescribing_number_unit
        }

        if(isChild == 1){ //不是子药

          return row.advice_name + row.advice_desc+tempDrugSpecDesc+tempPrescribingNumberDesc+ ' 单次用量 ' +tempSingleDoseDesc+" "+row.delivery_way+" "+row.execution_frequency

        }else{ //是子药


          return row.advice_name + row.advice_desc+tempDrugSpecDesc+tempPrescribingNumberDesc+' 单次用量 ' +tempSingleDoseDesc
        }


      }

    },
    created() {
      var date = this.$route.query && this.$route.query.date;
      this.record_date = uParseTime(date, "{y}-{m}-{d}");

      this.form.advice_date = this.record_date;
      this.getAdviceConfig();
      this.unitsOption = getDataConfig('hemodialysis', 'units');


    },
    components: {
      AddGroupAdvice,
      EditGroupAdvice
    }
  };
</script>


<style>
  @import "../../../../../static/css/table_row.css";

  .txsj {
    text-align: center;
    margin-bottom: 20px;
  }

</style>


<!--<style scoped>-->

<!--.txsj{-->
<!--text-align: center;-->
<!--margin-bottom: 20px;-->
<!--}-->
<!--</style>-->


<!--<style rel="stylesheet/scss" lang="scss"  >-->
<!--.row-class-active {-->
<!--background: #badcff;-->
<!--}-->

<!--.doctor-advice-box .current-box-class .current-row>td{-->
<!--background: #6fb5fa;-->
<!--color:#fff;-->
<!--}-->
<!--.doctor-advice-box .current-box-class .current-row:hover>td{-->
<!--background: #6fb5fa;-->
<!--}-->
<!--// .doctor-advice-box .current-box-class .stoped-row>td{-->
<!--//     background: #c9c9c9;-->
<!--//     color:#000;-->
<!--// }-->
<!--// .doctor-advice-box .current-box-class .stoped-row:hover>td{-->
<!--//     background: #c9c9c9;-->
<!--// }-->

<!--</style>-->
