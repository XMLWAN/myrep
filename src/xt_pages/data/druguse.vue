<template>
  <div class="tab-container">
    <el-tabs type="border-card">
      <el-tab-pane label="医嘱模板">
        <div class="app-container">
          <div class="filter-container">
            <el-button
              class="filter-item"
              style="margin-left: 10px;"
              @click="handleCreateTemplate"
              type="primary"
              icon="el-icon-edit"
            >{{$t('table.add')}}</el-button>
          </div>

          <el-table
            :data="adviceTemplates"
            v-loading="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%;min-height:500px;"
          >
            <el-table-column align="center" label="医嘱名称">
              <template slot-scope="scope">
                <span>{{scope.row.advice_name}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="医嘱内容">
              <template slot-scope="scope">
                <span>{{scope.row.advice_desc}}</span>
              </template>
            </el-table-column> -->
            <el-table-column align="center" label="单次用量">
              <template slot-scope="scope">
                <span>{{scope.row.single_dose}} {{scope.row.single_dose_unit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开药数量">
              <template slot-scope="scope">
                <span>{{scope.row.prescribing_number}} {{scope.row.prescribing_number_unit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="给药途径">
              <template slot-scope="scope">
                <span>{{scope.row.delivery_way}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="执行频率">
              <template slot-scope="scope">
                <span>{{scope.row.execution_frequency}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('table.actions')"
              width="230"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleUpdateAdviceTemplate(scope.row, scope.$index)"
                >{{$t('table.edit')}}</el-button>
                <el-button
                  v-if="scope.row.status!='deleted'"
                  size="mini"
                  type="danger"
                  @click="handleDeleteAdviceTemplate(scope.row, scope.$index)"
                >{{$t('table.delete')}}</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog :title="dialogTitle" :visible.sync="templateFormVisible" width="700px">
            <el-form
              ref="templateForm"
              :rules="templateRules"
              :model="templateForm"
              label-width="90px"
            >
              <el-form-item label="医嘱名称 :" required prop="advice_name">
                <el-input v-model="templateForm.advice_name" style="width:50%"></el-input>
              </el-form-item>
              <!-- <el-form-item label="医嘱内容 :" prop="advice_desc">
                <el-input v-model="templateForm.advice_desc" style="width:50%"></el-input>
              </el-form-item> -->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单次用量 :" prop="single_dose">
                    <el-col :span="8">
                      <el-input v-model="templateForm.single_dose"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="14">
                      <el-select
                        v-model="templateForm.single_dose_unit"
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
                      <el-input v-model="templateForm.prescribing_number"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="14">
                      <el-select
                        v-model="templateForm.prescribing_number_unit"
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
                      v-model="templateForm.delivery_way"
                      filterable
                      clearable
                      allow-create
                      placeholder="请选择(输入可搜索)"
                      style="width:90%"
                    >
                      <el-option
                        v-for="item in drugways"
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
                      v-model="templateForm.execution_frequency"
                      clearable
                      allow-create
                      filterable
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
              <el-button @click="templateFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submitTemplate('templateForm')">确 定</el-button>
            </div>
          </el-dialog>

          <el-dialog :title="dialogTitle" :visible.sync="drugdicFormVisible" width="700px">
            <el-form
              ref="drugdicForm"
              :rules="drugdicRules"
              :model="drugdicForm"
              label-width="90px"
            >
              <el-form-item label="医嘱名称 :" required prop="name">
                <el-input v-model="drugdicForm.name" style="width:50%" placeholder="如：阿莫西林"></el-input>
              </el-form-item>
              <el-form-item label="医嘱内容 :" prop="spec">
                <el-input v-model="drugdicForm.spec" style="width:50%" placeholder="如：10克x9袋"></el-input>
              </el-form-item>
              <el-form-item label="医嘱类型 :" prop="form">
                <el-select
                  v-model="drugdicForm.form"
                  clearable
                  allow-create
                  filterable
                  placeholder="请选择(输入可搜索)"
                >
                  <el-option
                    :label="item.name"
                    :key="item.label"
                    :value="item.name"
                    v-for="item in drugforms"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单次单位 :" prop="spec_unit">
                    <el-select
                      v-model="drugdicForm.spec_unit"
                      clearable
                      allow-create
                      filterable
                      placeholder="选择(输入可搜索)"
                    >
                      <el-option
                        v-for="item in unitsOption"
                        :key="item.label"
                        :label="item.name "
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="开药单位 :" prop="form_unit">
                    <el-select
                      v-model="drugdicForm.form_unit"
                      clearable
                      allow-create
                      filterable
                      placeholder="选择(输入可搜索)"
                    >
                      <el-option
                        v-for="item in unitsOption"
                        :key="item.label"
                        :label="item.name "
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="drugdicFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submitDrugDic('drugdicForm')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="给药途径">
        <div class="app-container">
          <div class="filter-container">
            <el-button
              class="filter-item"
              style="margin-left: 10px;"
              @click="handleCreateDrugWay"
              type="primary"
              icon="el-icon-edit"
            >{{$t('table.add')}}</el-button>
          </div>

          <el-table
            :data="drugways"
            v-loading="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%;min-height:500px;"
          >
            <el-table-column align="center" label="名称">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('table.actions')"
              width="230"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button type="text" size="mini" v-show="scope.row.org_id==0" disabled>系统设定</el-button>
                <el-button
                  v-show="scope.row.org_id!=0"
                  type="primary"
                  size="mini"
                  @click="handleUpdateDrugWay(scope.row, scope.$index)"
                >{{$t('table.edit')}}</el-button>
                <el-button
                  v-show="scope.row.org_id!=0"
                  size="mini"
                  type="danger"
                  @click="handleDeleteDrugWay(scope.row, scope.$index)"
                >{{$t('table.delete')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :title="dialogTitle" :visible.sync="drugwayFormVisible" width="700px">
            <el-form
              ref="drugwayForm"
              :rules="drugwayRules"
              :model="drugwayForm"
              label-width="90px"
            >
              <el-form-item label="给药途径 :" required prop="name">
                <el-input v-model="drugwayForm.name" placeholder="给药途径"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="drugwayFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submitDrugWay('drugwayForm')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="执行频率">
        <div class="app-container">
          <div class="filter-container">
            <el-button
              class="filter-item"
              style="margin-left: 10px;"
              @click="handleCreateEF"
              type="primary"
              icon="el-icon-edit"
            >{{$t('table.add')}}</el-button>
          </div>

          <el-table
            :data="executionFrequencyOptions"
            v-loading="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%;min-height:500px;"
          >
            <el-table-column align="center" label="名称">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('table.actions')"
              width="230"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button type="text" size="mini" v-show="scope.row.org_id==0" disabled>系统设定</el-button>
                <el-button
                  v-show="scope.row.org_id!=0"
                  type="primary"
                  size="mini"
                  @click="handleUpdateEF(scope.row, scope.$index)"
                >{{$t('table.edit')}}</el-button>
                <el-button
                  v-show="scope.row.org_id!=0"
                  size="mini"
                  type="danger"
                  @click="handleDeleteEF(scope.row, scope.$index)"
                >{{$t('table.delete')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :title="dialogTitle" :visible.sync="efFormVisible" width="700px">
            <el-form ref="efForm" :rules="efRules" :model="efForm" label-width="90px">
              <el-form-item label="执行频率 :" required prop="name">
                <el-input v-model="efForm.name" placeholder="执行频率"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="efFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submitEF('efForm')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getAdviceConfig,
  CreateDrugDic,
  UpdateDrugDic,
  DeleteDrugDic,
  CreateDrugWay,
  UpdateDrugWay,
  DeleteDrugWay,
  CreateExecutionFrequency,
  UpdateExecutionFrequency,
  DeleteExecutionFrequency,
  CreateAdviceTemplate,
  UpdateAdviceTemplate,
  DeleteAdviceTemplate
} from "@/api/advice";

export default {
  name: "tab",
  components: {},
  data() {
    return {
      currentIndex: -1,
      isEdit: false,
      dialogTitle: "",
      drugdicFormVisible: false,
      drugwayFormVisible: false,
      templateFormVisible: false,
      efFormVisible: false,
      listLoading: true,
      activeName: "drugdic",
      createdTimes: 0,
      drugdics: [],
      adviceTemplates:[],
      drugways: [],
      executionFrequencyOptions: [],
      drugdicRules: {
        name: [{ required: true, message: "请填写医嘱名称" }]
      },
      drugwayRules: {
        name: [{ required: true, message: "请填写给药途径" }]
      },
      efRules: {
        name: [{ required: true, message: "请填写执行频率" }]
      },
      templateRules: {
        advice_name: [{ required: true, message: "请填写医嘱名称" }]
      },
      templateForm: {
        advice_name: "",
        advice_desc: "",
        single_dose: "",
        single_dose_unit: "",
        prescribing_number: "",
        prescribing_number_unit: "",
        delivery_way: "",
        execution_frequency: "",
        id: 0
      },
      drugdicForm: {
        name: "",
        spec: "",
        spec_unit: "",
        form: "",
        form_unit: "",
        id: 0
      },
      drugwayForm: {
        name: "",
        id: 0
      },
      efForm: {
        name: "",
        id: 0
      },
      unitsOption: [
        { lable: 1, name: "盒" },
        { lable: 2, name: "支" },
        { lable: 3, name: "瓶" },
        { lable: 4, name: "片" },
        { lable: 5, name: "袋" },
        { lable: 6, name: "g" },
        { lable: 7, name: "mg" },
        { lable: 8, name: "u" },
        { lable: 9, name: "ml" },
        { lable: 10, name: "枚" },
        { lable: 11, name: "粒" },
        { lable: 12, name: "μg" },
        { lable: 13, name: "iu" },
        { lable: 14, name: "包" },
        { lable: 15, name: "丸" }
      ],
      drugforms: [
        { lable: 1, name: "胶囊" },
        { lable: 2, name: "注射剂" },
        { lable: 3, name: "片剂" },
        { lable: 4, name: "注射液" },
        { lable: 5, name: "栓剂" },
        { lable: 6, name: "膏" },
        { lable: 7, name: "颗粒剂" },
        { lable: 8, name: "粉剂" },
        { lable: 9, name: "口服液" },
        { lable: 10, name: "干混悬剂" },
        { lable: 11, name: "丸剂" },
        { lable: 12, name: "气雾剂" },
        { lable: 13, name: "内服溶液" },
        { lable: 14, name: "外用溶液" },
        { lable: 15, name: "软膏剂" },
        { lable: 16, name: "胶剂" }
      ]
    };
  },
  created() {
    this.getAdviceConfig();
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1;
    },
    handleUpdateDrugDic(row, index) {
      this.currentIndex = index;
      this.drugdicForm = {
        name: row.name,
        spec: row.spec,
        spec_unit: row.spec_unit,
        form: row.form,
        form_unit: row.form_unit,
        id: row.id
      };

      this.drugdicFormVisible = true;
      this.dialogTitle = "编辑医嘱模版";
      this.isEdit = true;
    },
    handleCreateDrugDic() {
      this.drugdicForm = {
        name: "",
        spec: "",
        spec_unit: "",
        form: "",
        form_unit: "",
        id: 0
      };
      this.drugdicFormVisible = true;
      this.dialogTitle = "新增医嘱模版";
      this.isEdit = false;
    },
    handleCreateTemplate() {
      this.templateForm = {
        advice_name: "",
        advice_desc: "",
        single_dose: "",
        single_dose_unit: "",
        prescribing_number: "",
        prescribing_number_unit: "",
        delivery_way: "",
        execution_frequency: "",
        id: 0
      };
      this.templateFormVisible = true;
      this.dialogTitle = "新增医嘱模版";
      this.isEdit = false;
    },
    handleUpdateAdviceTemplate(row, index){
      this.templateForm = {
        advice_name: row.advice_name,
        advice_desc: row.advice_desc,
        single_dose: row.single_dose,
        single_dose_unit: row.single_dose_unit,
        prescribing_number: row.prescribing_number,
        prescribing_number_unit: row.prescribing_number_unit,
        delivery_way: row.delivery_way,
        execution_frequency: row.execution_frequency,
        id: row.id,
      };
      this.templateFormVisible = true;
      this.dialogTitle = "编辑医嘱模版";
      this.isEdit = true;
      this.currentIndex = index;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleDeleteDrugDic(row, index) {
      this.$confirm("确认删除此医嘱模板?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteDrugDic(row.id).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.$notify({
                title: "成功",
                message: "医嘱模板已经删除",
                type: "success",
                duration: 2000
              });
              this.drugdics.splice(index, 1);
            }
          });
        })
        .catch(() => {});
    },
    handleDeleteAdviceTemplate(row, index) {
      this.$confirm("确认删除此医嘱模板?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteAdviceTemplate(row.id).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.$notify({
                title: "成功",
                message: "医嘱模板已经删除",
                type: "success",
                duration: 2000
              });
              this.adviceTemplates.splice(index, 1);
            }
          });
        })
        .catch(() => {});
    },
    submitDrugDic(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            UpdateDrugDic(this.drugdicForm.id, this.drugdicForm).then(
              response => {
                if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                } else {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success",
                    duration: 2000
                  });
                  this.drugdicFormVisible = false;
                  this.resetForm(formName);
                  var drugdic = response.data.data.drugdic;
                  this.drugdics[this.currentIndex].name = drugdic.name;
                  this.drugdics[this.currentIndex].spec = drugdic.spec;
                  this.drugdics[this.currentIndex].spec_unit =
                    drugdic.spec_unit;
                  this.drugdics[this.currentIndex].form = drugdic.form;
                  this.drugdics[this.currentIndex].form_unit =
                    drugdic.form_unit;
                  this.drugdics[this.currentIndex].updated_time =
                    drugdic.updated_time;
                  this.currentIndex = -1;
                  return false;
                }
              }
            );
          } else {
            CreateDrugDic(this.drugdicForm).then(response => {
              if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              } else {
                this.$notify({
                  title: "成功",
                  message: "添加成功",
                  type: "success",
                  duration: 2000
                });
                this.drugdicFormVisible = false;
                this.resetForm(formName);
                this.drugdics.unshift(response.data.data.drugdic);
                return false;
              }
            });
          }
        }
      });
    },
    submitTemplate(formName){
      this.$refs[formName].validate(valid => {
        this.templateForm.single_dose = parseFloat(this.templateForm.single_dose);
        this.templateForm.prescribing_number = parseFloat(this.templateForm.prescribing_number);

        if(isNaN(this.templateForm.single_dose)) {
          this.templateForm.single_dose = 0;
        }
        if(isNaN(this.templateForm.prescribing_number)) {
          this.templateForm.prescribing_number = 0;
        }
        if (valid) {
          if (this.isEdit) {
            UpdateAdviceTemplate(this.templateForm.id, this.templateForm).then(
              response => {
                if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                } else {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success",
                    duration: 2000
                  });
                  this.templateFormVisible = false;
                  this.resetForm(formName);
                  var template = response.data.data.template;
                  this.adviceTemplates[this.currentIndex].advice_name = template.advice_name;
                  this.adviceTemplates[this.currentIndex].advice_desc = template.advice_desc;
                  this.adviceTemplates[this.currentIndex].single_dose = template.single_dose;
                  this.adviceTemplates[this.currentIndex].single_dose_unit = template.single_dose_unit;
                  this.adviceTemplates[this.currentIndex].delivery_way = template.delivery_way;
                  this.adviceTemplates[this.currentIndex].execution_frequency = template.execution_frequency;
                  this.adviceTemplates[this.currentIndex].prescribing_number = template.prescribing_number;
                  this.adviceTemplates[this.currentIndex].prescribing_number_unit = template.prescribing_number_unit;
                  this.currentIndex = -1;
                  return false;
                }
              }
            );
          } else {
            CreateAdviceTemplate(this.templateForm).then(response => {
              if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              } else {
                this.$notify({
                  title: "成功",
                  message: "添加成功",
                  type: "success",
                  duration: 2000
                });
                this.templateFormVisible = false;
                this.resetForm(formName);
                this.adviceTemplates.unshift(response.data.data.template);
                return false;
              }
            });
          }
        }
      });
    },
    handleCreateDrugWay() {
      this.drugwayForm = {
        name: "",
        id: 0
      };
      this.drugwayFormVisible = true;
      this.dialogTitle = "新增给药途径";
      this.isEdit = false;
    },
    handleUpdateDrugWay(row, index) {
      this.currentIndex = index;
      this.drugwayForm = {
        name: row.name,
        id: row.id
      };

      this.drugwayFormVisible = true;
      this.dialogTitle = "编辑给药途径";
      this.isEdit = true;
    },
    submitDrugWay(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            UpdateDrugWay(this.drugwayForm.id, this.drugwayForm).then(
              response => {
                if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                } else {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success",
                    duration: 2000
                  });
                  this.drugwayFormVisible = false;
                  this.resetForm(formName);
                  var drugway = response.data.data.drugway;
                  this.drugways[this.currentIndex].name = drugway.name;
                  this.drugways[this.currentIndex].updated_time =
                    drugway.updated_time;
                  this.currentIndex = -1;
                  return false;
                }
              }
            );
          } else {
            CreateDrugWay(this.drugwayForm).then(response => {
              if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              } else {
                this.$notify({
                  title: "成功",
                  message: "添加成功",
                  type: "success",
                  duration: 2000
                });
                this.drugwayFormVisible = false;
                this.resetForm(formName);
                this.drugways.unshift(response.data.data.drugway);
                return false;
              }
            });
          }
        }
      });
    },
    handleDeleteDrugWay(row, index) {
      this.$confirm("确认删除此给药途径?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteDrugWay(row.id).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.$notify({
                title: "成功",
                message: "给药途径已经删除",
                type: "success",
                duration: 2000
              });
              this.drugways.splice(index, 1);
            }
          });
        })
        .catch(() => {});
    },
    handleCreateEF() {
      this.efForm = {
        name: "",
        id: 0
      };
      this.efFormVisible = true;
      this.dialogTitle = "新增执行频率";
      this.isEdit = false;
    },
    handleUpdateEF(row, index) {
      this.currentIndex = index;
      this.efForm = {
        name: row.name,
        id: row.id
      };

      this.efFormVisible = true;
      this.dialogTitle = "编辑执行频率";
      this.isEdit = true;
    },
    submitEF(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            UpdateExecutionFrequency(this.efForm.id, this.efForm).then(
              response => {
                if (response.data.state == 0) {
                  this.$message.error(response.data.msg);
                  return false;
                } else {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success",
                    duration: 2000
                  });
                  this.efFormVisible = false;
                  this.resetForm(formName);
                  var ef = response.data.data.ef;
                  this.executionFrequencyOptions[this.currentIndex].name =
                    ef.name;
                  this.executionFrequencyOptions[
                    this.currentIndex
                  ].updated_time = ef.updated_time;
                  this.currentIndex = -1;
                  return false;
                }
              }
            );
          } else {
            CreateExecutionFrequency(this.efForm).then(response => {
              if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              } else {
                this.$notify({
                  title: "成功",
                  message: "添加成功",
                  type: "success",
                  duration: 2000
                });
                this.efFormVisible = false;
                this.resetForm(formName);
                this.executionFrequencyOptions.unshift(response.data.data.ef);
                return false;
              }
            });
          }
        }
      });
    },
    handleDeleteEF(row, index) {
      this.$confirm("确认删除此执行频率?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteExecutionFrequency(row.id).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.$notify({
                title: "成功",
                message: "执行频率已经删除",
                type: "success",
                duration: 2000
              });
              this.executionFrequencyOptions.splice(index, 1);
            }
          });
        })
        .catch(() => {});
    },
    getAdviceConfig() {
      getAdviceConfig().then(response => {
        if (response.data.state == 1) {
          this.drugways = response.data.data.drugways;
          this.executionFrequencyOptions = response.data.data.efs;
          this.drugdics = response.data.data.drugs;
          this.adviceTemplates = response.data.data.advice_templates;
          this.listLoading = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
