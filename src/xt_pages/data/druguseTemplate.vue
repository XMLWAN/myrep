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
            >{{$t('table.add')}}
            </el-button>
          </div>
          <el-table
            :data="adviceTemplates"
            border
            fit

            @cell-mouse-leave="cellMouseLeave"
            @cell-mouse-enter="cellMouseEnter"
            :row-class-name="tableRowClassNames"
            :span-method="merge"
            style="width: 100%;min-height:500px;"
          >
            <el-table-column
              prop="id"
              label="模版名称"
              width="100">
              <template slot-scope="scope">
                <span v-if="isShow(scope.$index, scope.row)">{{scope.row.name}}</span>
                <span v-else></span>
              </template>
            </el-table-column>

            <el-table-column
              prop="amount1"
              label="医嘱内容">
              <template slot-scope="scope">

                <el-dropdown trigger="click" v-if="scope.row.parent_id == 0">
                            <span class="el-dropdown-link" v-if="scope.row.parent_id == 0">
                                {{scope.row.advice_name}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="openEdit(scope.$index, scope.row)">修改医嘱</el-dropdown-item>
                    <el-dropdown-item @click.native="openDelete(scope.$index, scope.row)">删除医嘱</el-dropdown-item>
                    <el-dropdown-item @click.native="openNewChild(scope.$index, scope.row)">新增子药</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>


                <el-dropdown trigger="click" v-if="scope.row.parent_id > 0">
                            <span class="el-dropdown-link">
                                &emsp;&emsp;{{ scope.row.advice_name }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="openEdit(scope.$index, scope.row)">修改子药
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="openDeleteChild(scope.$index, scope.row)">删除子药
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>


              </template>
            </el-table-column>

            <el-table-column
              prop="amount1"
              align="center"
              label="规格">
              <template slot-scope="scope">
                <!-- {{drugDesc(scope.row)}} -->
                {{scope.row.advice_desc}}
              </template>
            </el-table-column>

            <el-table-column
              prop="amount2"
              width="90"
              align="center"
              label="开药数量">
              <template slot-scope="scope" v-if="scope.row.prescribing_number != ''">
                <span>{{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}</span>

              </template>
            </el-table-column>

            <el-table-column
              prop="amount2"
              width="90"
              align="center"
              label="单次用量">
              <template slot-scope="scope" v-if="scope.row.single_dose != ''">
                <span>{{scope.row.single_dose}}{{scope.row.single_dose_unit}}</span>

              </template>
            </el-table-column>
            <el-table-column
              prop="amount3"
              align="center"

              label="使用频率">
              <template slot-scope="scope" v-if="scope.row.parent_id == 0">
                <span>{{scope.row.execution_frequency}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="amount3"
              align="center"

              label="给药途径">
              <template slot-scope="scope" v-if="scope.row.parent_id == 0">
                <span>{{scope.row.delivery_way}}</span>
              </template>
            </el-table-column>


            <el-table-column
              align="center"
              label="操作"
              width="150"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  v-if="isShow(scope.$index, scope.row)"
                  @click="handleUpdateAdviceTemplate(scope.row, scope.$index)"
                >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteAdviceTemplate(scope.row, scope.$index)"
                > 删除
                </el-button>
              </template>
            </el-table-column>

          </el-table>


          <!--增删改查都是本地处理的dialog-->
          <el-dialog title="新增医嘱模版" :visible.sync="templateTableVisible" width="700px" :close-on-click-modal="false">
            <div>
              <el-form ref="form" :model="form" :rule="formRules" label-width="100px">
                <el-form-item label="模版名称" style="width: 300px" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-form>
              <div class="txsj" style="text-align: center;margin-bottom: 30px">
                <el-button round @click="newRecordAction">新增医嘱内容</el-button>
                <el-button round @click="deleteRecordAction">删除医嘱内容</el-button>
                <el-button round @click="modifyRecordAction">修改医嘱内容</el-button>
              </div>
              <el-table
                ref="table" :data="adviceTableData"
                border
                highlight-current-row
                max-height="300"

                :row-class-name="tableRow"
                @row-click="onRowClick"
                style="width: 100%">
                <el-table-column label="医嘱内容" align="center" width="144">
                  <template slot-scope="scope">
                    {{scope.row.advice_name}}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="规格">
                  <template slot-scope="scope">
                    <!-- {{drugDescTwo(scope.row)}} -->
                    {{scope.row.advice_desc}}
                  </template>
                </el-table-column>
                <el-table-column prop="prescribing_number" align="center" label="开药数量">
                  <template slot-scope="scope" v-if="scope.row.prescribing_number != ''">
                    {{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}
                  </template>
                </el-table-column>
                <el-table-column prop="single_dose" align="center" label="单次用量">
                  <template slot-scope="scope" v-if="scope.row.single_dose != ''">
                    {{scope.row.single_dose}}{{scope.row.single_dose_unit}}
                  </template>

                </el-table-column>
                <el-table-column prop="breathing_rate" align="center" label="给药途径">
                  <template slot-scope="scope">

                    {{scope.row.delivery_way}}
                  </template>

                </el-table-column>
                <el-table-column prop="blood_flow_volume" align="center" label="执行频率">
                  <template slot-scope="scope">
                    {{scope.row.execution_frequency}}
                  </template>
                </el-table-column>

              </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelTableHandle">取消</el-button>
              <el-button type="primary" @click="submitTableTemplate('form')">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog :title="dialogTitle" :visible.sync="templateFormVisible" width="700px">
            <el-form
              ref="templateForm"
              :rules="templateRules"
              :model="templateForm"
              label-width="90px"
            >

              <el-row>
                <el-col :span="12">
                  <el-form-item :label="advice_content_name" required prop="advice_name">
                    <el-input v-model="templateForm.advice_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">

                  <el-form-item label="规格" prop="advice_desc">
                    <el-input v-model="templateForm.advice_desc"></el-input>
                  </el-form-item>


                  <!-- <el-form-item label="药品规格 :" prop="drug_spec">
                    <el-col :span="8">
                      <el-input v-model="templateForm.drug_spec"  ></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="14">
                      <el-select
                        v-model="templateForm.drug_spec_unit"
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
                <el-col :span="12" v-if="!isAddChild">
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
              </el-row>
              <el-row>

                <el-col :span="12" v-if="!isAddChild">
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
              <el-button @click="cancelHandle('templateForm')">取消</el-button>
              <el-button type="primary" @click="submitTemplate('templateForm')">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog :title="editDialogTitle" :visible.sync="templateEditFormVisible" width="700px">
            <el-form
              ref="templateFormEdit"
              :rules="templateEditRules"
              :model="templateFormEdit"
              label-width="90px"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="edit_advice_name" required prop="advice_name">
                    <el-input v-model="templateFormEdit.advice_name"></el-input>
                  </el-form-item>

                </el-col>
                <el-col :span="12">
                  <el-form-item label="规格" prop="advice_desc">
                    <el-input v-model="templateFormEdit.advice_desc"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="药品规格 :" prop="drug_spec">
                    <el-col :span="8">
                      <el-input v-model="templateFormEdit.drug_spec"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="14">
                      <el-select
                        v-model="templateFormEdit.drug_spec_unit"
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
                <el-col :span="12">
                  <el-form-item label="单次用量 :" prop="single_dose">
                    <el-col :span="8">
                      <el-input v-model="templateFormEdit.single_dose"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="14">
                      <el-select
                        v-model="templateFormEdit.single_dose_unit"
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
                      <el-input v-model="templateFormEdit.prescribing_number"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="14">
                      <el-select
                        v-model="templateFormEdit.prescribing_number_unit"
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
                <el-col :span="12" v-if="templateFormEdit.parent_id == 0">
                  <el-form-item label="给药途径 :" prop="delivery_way">
                    <el-select
                      v-model="templateFormEdit.delivery_way"
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
              </el-row>
              <el-row>

                <el-col :span="12" v-if="templateFormEdit.parent_id == 0">
                  <el-form-item label="执行频率 :" prop="execution_frequency">
                    <el-select
                      v-model="templateFormEdit.execution_frequency"
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
              <el-button @click="cancelEditHandle">取消</el-button>
              <el-button type="primary" @click="submitEditTemplate('templateFormEdit')">确 定</el-button>
            </div>
          </el-dialog>


          <!--增删改查都请求网络类型的dialog-->
          <el-dialog title="编辑医嘱模版" :visible.sync="templateTableTwoVisible" width="800px">
            <div>
              <el-form ref="form" :model="form" :rule="formRules" label-width="100px">
                <el-form-item label="模版名称" style="width: 300px" prop="name">
                  <el-input v-model="form.name" ></el-input>
                </el-form-item>
              </el-form>


              <div class="txsj" style="text-align: center;margin-bottom: 30px">
                <el-button round @click="newRecordActionTwo">新增医嘱内容</el-button>
                <!--<el-button round @click="deleteRecordActionTwo">删除医嘱内容</el-button>-->
                <!--<el-button round @click="modifyRecordActionTwo">修改医嘱内容</el-button>-->
              </div>


              <el-table ref="table" :data="adviceTableDataTwo" border highlight-current-row max-height="300">
                <el-table-column label="医嘱内容">
                  <template slot-scope="scope">
                    <span v-if="scope.row.parent_id == 0">{{scope.row.advice_name}}</span>
                    <span v-if="scope.row.parent_id > 0"> &emsp;{{scope.row.advice_name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="规格">
                  <template slot-scope="scope">
                    <!-- {{drugDesc(scope.row)}} -->
                    {{scope.row.advice_desc}}
                  </template>
                </el-table-column>
                <el-table-column prop="prescribing_number" align="center" label="开药数量">
                  <template slot-scope="scope" v-if="scope.row.prescribing_number != ''">
                    {{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}
                  </template>
                </el-table-column>
                <el-table-column prop="pulse_frequency" align="center" label="单次用量">
                  <template slot-scope="scope" v-if="scope.row.single_dose != ''">
                    {{scope.row.single_dose}}{{scope.row.single_dose_unit}}
                  </template>

                </el-table-column>
                <el-table-column prop="breathing_rate" align="center" label="给药途径">
                  <template slot-scope="scope">
                    <span v-if="scope.row.parent_id == 0">{{scope.row.delivery_way}}</span>


                  </template>

                </el-table-column>
                <el-table-column prop="blood_flow_volume" align="center" label="执行频率">
                  <template slot-scope="scope">
                    <span v-if="scope.row.parent_id == 0">{{scope.row.delivery_way}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelTableHandleTwo">取消</el-button>
              <el-button type="primary" @click="modifyTemplateName">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="新增医嘱" :visible.sync="templateFormTwoVisible" width="700px">
            <el-form
              ref="templateForm"
              :rules="templateEditRules"
              :model="templateForm"
              label-width="90px"
            >
              <el-form-item label="医嘱内容 :" required prop="advice_name">
                <el-input v-model="templateForm.advice_name" style="width:50%"></el-input>
              </el-form-item>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="规格 :" required prop="advice_desc">
                    <el-input v-model="templateForm.advice_desc"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="药品规格 :" prop="drug_spec">
                    <el-col :span="8">
                      <el-input v-model="templateForm.drug_spec"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="14">
                      <el-select
                        v-model="templateForm.drug_spec_unit"
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
              </el-row>
              <el-row>

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
              <el-button @click="cancelHandleTwo">取消</el-button>
              <el-button type="primary" @click="submitTemplateTwo('templateForm')">确 定</el-button>
            </div>
          </el-dialog>
          <!--<el-dialog title="编辑医嘱" :visible.sync="templateEditFormTwoVisible" width="700px">-->
          <!--<el-form-->
          <!--ref="templateFormEdit"-->
          <!--:rules="templateEditRules"-->
          <!--:model="templateFormEdit"-->
          <!--label-width="90px"-->
          <!--&gt;-->
          <!--<el-form-item label="医嘱名称 :" required prop="advice_name">-->
          <!--<el-input v-model="templateFormEdit.advice_name" style="width:50%"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-row>-->
          <!--<el-col :span="12">-->
          <!--<el-form-item label="药品规格 :" prop="drug_spec">-->
          <!--<el-col :span="8">-->
          <!--<el-input v-model="templateFormEdit.drug_spec"></el-input>-->
          <!--</el-col>-->
          <!--<el-col class="line" :span="2">&nbsp;</el-col>-->
          <!--<el-col :span="14">-->
          <!--<el-select-->
          <!--v-model="templateFormEdit.drug_spec_unit"-->
          <!--filterable-->
          <!--clearable-->
          <!--allow-create-->
          <!--placeholder="选择"-->
          <!--&gt;-->
          <!--<el-option-->
          <!--v-for="item in unitsOption"-->
          <!--:key="item.id"-->
          <!--:label="item.name "-->
          <!--:value="item.name"-->
          <!--&gt;</el-option>-->
          <!--</el-select>-->
          <!--</el-col>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
          <!--<el-form-item label="单次用量 :" prop="single_dose">-->
          <!--<el-col :span="8">-->
          <!--<el-input v-model="templateFormEdit.single_dose"></el-input>-->
          <!--</el-col>-->
          <!--<el-col class="line" :span="2">&nbsp;</el-col>-->
          <!--<el-col :span="14">-->
          <!--<el-select-->
          <!--v-model="templateFormEdit.single_dose_unit"-->
          <!--filterable-->
          <!--clearable-->
          <!--allow-create-->
          <!--placeholder="选择"-->
          <!--&gt;-->
          <!--<el-option-->
          <!--v-for="item in unitsOption"-->
          <!--:key="item.id"-->
          <!--:label="item.name "-->
          <!--:value="item.name"-->
          <!--&gt;</el-option>-->
          <!--</el-select>-->
          <!--</el-col>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
          <!--<el-form-item label="开药数量 :" prop="prescribing_number">-->
          <!--<el-col :span="8">-->
          <!--<el-input v-model="templateFormEdit.prescribing_number"></el-input>-->
          <!--</el-col>-->
          <!--<el-col class="line" :span="2">&nbsp;</el-col>-->
          <!--<el-col :span="14">-->
          <!--<el-select-->
          <!--v-model="templateFormEdit.prescribing_number_unit"-->
          <!--filterable-->
          <!--clearable-->
          <!--allow-create-->
          <!--placeholder="选择"-->
          <!--&gt;-->
          <!--<el-option-->
          <!--v-for="item in unitsOption"-->
          <!--:key="item.id"-->
          <!--:label="item.name "-->
          <!--:value="item.name"-->
          <!--&gt;</el-option>-->
          <!--</el-select>-->
          <!--</el-col>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
          <!--<el-form-item label="给药途径 :" prop="delivery_way">-->
          <!--<el-select-->
          <!--v-model="templateFormEdit.delivery_way"-->
          <!--filterable-->
          <!--clearable-->
          <!--allow-create-->
          <!--placeholder="请选择(输入可搜索)"-->
          <!--style="width:90%"-->
          <!--&gt;-->
          <!--<el-option-->
          <!--v-for="item in drugways"-->
          <!--:key="item.id"-->
          <!--:label="item.name "-->
          <!--:value="item.name"-->
          <!--&gt;</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row>-->

          <!--<el-col :span="12">-->
          <!--<el-form-item label="执行频率 :" prop="execution_frequency">-->
          <!--<el-select-->
          <!--v-model="templateFormEdit.execution_frequency"-->
          <!--clearable-->
          <!--allow-create-->
          <!--filterable-->
          <!--placeholder="请选择(输入可搜索)"-->
          <!--style="width:90%"-->
          <!--&gt;-->
          <!--<el-option-->
          <!--v-for="item in executionFrequencyOptions"-->
          <!--:key="item.id"-->
          <!--:label="item.name"-->
          <!--:value="item.name"-->
          <!--&gt;</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--</el-form>-->
          <!--<div slot="footer" class="dialog-footer">-->
          <!--<el-button @click="cancelEditHandleTwo">取消</el-button>-->
          <!--<el-button type="primary" @click="submitEditTemplateTwo('templateFormEdit')">确 定</el-button>-->
          <!--</div>-->
          <!--</el-dialog>-->


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
            >{{$t('table.add')}}
            </el-button>
          </div>

          <el-table
            :data="drugways"
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
                >{{$t('table.edit')}}
                </el-button>
                <el-button
                  v-show="scope.row.org_id!=0"
                  size="mini"
                  type="danger"
                  @click="handleDeleteDrugWay(scope.row, scope.$index)"
                >{{$t('table.delete')}}
                </el-button>
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
            >{{$t('table.add')}}
            </el-button>
          </div>

          <el-table
            :data="executionFrequencyOptions"
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
                >{{$t('table.edit')}}
                </el-button>
                <el-button
                  v-show="scope.row.org_id!=0"
                  size="mini"
                  type="danger"
                  @click="handleDeleteEF(scope.row, scope.$index)"
                >{{$t('table.delete')}}
                </el-button>
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


<style>
  @import "../../../static/css/table_row.css";

  .tab-container {
    margin: 30px;
  }


</style>


<script>
  import {
    CreateAdviceTemplate,
    CreateDrugDic,
    CreateDrugWay,
    CreateExecutionFrequency,
    CreateSingleAdviceTemplate,
    CreateSubAdvice,
    DeleteAdviceTemplate,
    DeleteDrugDic,
    DeleteDrugWay,
    DeleteExecutionFrequency,
    DeleteParentAdviceTemplate,
    getAdviceConfig,
    getAllAdviceTemplate,
    postAdviceTemplate,
    UpdateAdviceTemplate,
    UpdateDrugDic,
    UpdateDrugWay,
    UpdateExecutionFrequency,
    updateTemplateName,
  } from "@/api/advice";

  import {getDataConfig} from '@/utils/data';

  export default {
    name: "tab",
    components: {},
    data() {
      return {
        rowIndex: -1,
        current_template_id: 0,
        currentObject: {},
        tempArr: [],
        sameRowArr: [],
        advice_content_name: "",
        table_current_index: -1,
        adviceTableData: [],
        templateName: "",
        adviceTableDataTwo: [],
        table_current_index_two: -1,
        currentIndex: -1,
        isEdit: false,
        dialogTitle: "",
        isAddChild: false,
        parent_id: 0,
        editDialogTitle: "编辑医嘱",
        drugdicFormVisible: false,
        drugwayFormVisible: false,
        templateFormVisible: false,
        templateTableTwoVisible: false,
        templateEditFormVisible: false,
        edit_advice_name: "",
        templateTableVisible: false,
        templateFormTwoVisible: false,
        templateEditFormTwoVisible: false,
        efFormVisible: false,
        activeName: "drugdic",
        hoverOrderArr: [],
        createdTimes: 0,
        drugdics: [],
        adviceTemplates: [],
        current_template_name: "",
        editForm: {
          name: ""

        },

        drugways: [],
        executionFrequencyOptions: [],
        drugdicRules: {
          name: [{required: true, message: "请填写医嘱内容"}]
        },
        formRules: {
          name: [
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        },


        drugwayRules: {
          name: [{required: true, message: "请填写给药途径"}]
        },
        efRules: {
          name: [{required: true, message: "请填写执行频率"}]
        },
        templateRules: {
          advice_name: [{required: true, message: "请填写医嘱内容"}]
        },
        templateEditRules: {
          advice_name: [{required: true, message: "请填写医嘱内容"}]
        },
        templateForm: {
          drug_spec: "",
          drug_spec_unit: "",
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

        templateFormEdit: {
          drug_spec: "",
          drug_spec_unit: "",
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
        form: {
          name: "",

        },
        drugwayForm: {
          name: "",
          id: 0
        },
        efForm: {
          name: "",
          id: 0
        },

        drugforms: [
          {lable: 1, name: "胶囊"},
          {lable: 2, name: "注射剂"},
          {lable: 3, name: "片剂"},
          {lable: 4, name: "注射液"},
          {lable: 5, name: "栓剂"},
          {lable: 6, name: "膏"},
          {lable: 7, name: "颗粒剂"},
          {lable: 8, name: "粉剂"},
          {lable: 9, name: "口服液"},
          {lable: 10, name: "干混悬剂"},
          {lable: 11, name: "丸剂"},
          {lable: 12, name: "气雾剂"},
          {lable: 13, name: "内服溶液"},
          {lable: 14, name: "外用溶液"},
          {lable: 15, name: "软膏剂"},
          {lable: 16, name: "胶剂"}
        ]
      };
    },
    created() {
      this.getAdviceConfig();
      this.unitsOption = getDataConfig('hemodialysis', 'units');

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
      cancelHandle(formName) {
        this.table_current_index = -1
        this.resetForm(formName);
        if (this.isAddChild) {
          this.templateFormVisible = false;
        } else {
          this.templateFormVisible = false;
          this.templateTableVisible = true;
        }
      },
      handleCreateTemplate() {
        this.templateTableVisible = true;
      },
      newRecordAction() {
        this.dialogTitle = "新增医嘱内容"
        this.advice_content_name = "医嘱内容"
        this.isEdit = false;
        this.parent_id = 0;
        this.isAddChild = false
        this.templateFormVisible = true;

      }, deleteRecordAction: function () {
        if (this.table_current_index == -1) {
          this.$message.error("请选择一条医嘱记录")
          return
        }
        this.$confirm('删除记录', '是否删除该医嘱记录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.adviceTableData.splice(this.table_current_index, 1)
          this.table_current_index = -1
        }).catch(() => {
        });
      }, tableRow({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      onRowClick(row, event, column) {
        this.table_current_index = row.index;
      }, modifyRecordAction: function () {

        if (this.table_current_index == -1) {
          this.$message.error("请选择一条医嘱记录")
          return
        }

        this.isEdit = true;

        let adviceTable = this.adviceTableData[this.table_current_index]

        for (var index in adviceTable) {
          this.templateForm[index] = adviceTable[index];
        }
        this.templateFormVisible = true;
        this.templateTableVisible = false
        this.dialogTitle = "编辑医嘱内容"
        this.advice_content_name = "医嘱内容"
      }, cancelTableHandle: function () {
        this.$confirm('放弃编辑', '是否放弃编辑,已编辑的数据将无法恢复', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.adviceTableData = []
          this.form.name = ""
          this.templateFormVisible = false;
          this.templateTableVisible = false
        }).catch(() => {
        });
      }, submitTableTemplate(formName) {

        if (this.adviceTableData.length <= 0) {
          this.$message.error("至少添加一条医嘱信息")
          return
        }

        let params = {
          'data': this.adviceTableData
        }
        postAdviceTemplate(params, this.form.name).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {

            this.$notify({
              title: "成功",
              message: "添加模版成功",
              type: "success",
              duration: 2000
            });

            var template = response.data.data.template
            if (template.DoctorAdviceTemplate.length > 0) {
              for (let i = 0; i < template.DoctorAdviceTemplate.length; i++) {

                let object = {}
                let DoctorAdviceTemplate = template.DoctorAdviceTemplate[i]
                for (const key in DoctorAdviceTemplate) {
                  object[key] = DoctorAdviceTemplate[key];
                }
                object["name"] = template.name
                object["isNoSub"] = 2
                this.adviceTemplates.unshift(object)
              }
            }
            this.handleSpanTempArr()

            this.form.name = ""
            this.adviceTableData = []
            this.templateFormVisible = false
            this.templateTableVisible = false
          }
        });


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
          .catch(() => {
          });
      },
      handleDeleteAdviceTemplate(row, index) {
        this.$confirm("确认删除此医嘱模板?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            DeleteParentAdviceTemplate(row.template_id).then(response => {
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

                // console.log(this.adviceTemplates.length)
                // for(let i = 0;i < this.adviceTemplates.length; i++){
                //   if(this.adviceTemplates[i].template_id == row.template_id){
                //     this.adviceTemplates.splice(i,1);
                //   }
                // }
                this.getAdviceConfig()
              }
            });
          })
          .catch(() => {
          });
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
      submitTemplate(formName) {
        this.$refs[formName].validate(valid => {
          this.templateForm.single_dose = parseFloat(this.templateForm.single_dose);
          this.templateForm.prescribing_number = parseFloat(this.templateForm.prescribing_number);

          if (isNaN(this.templateForm.single_dose)) {
            this.templateForm.single_dose = 0;
          }
          if (isNaN(this.templateForm.prescribing_number)) {
            this.templateForm.prescribing_number = 0;
          }
          if (valid) {
            let templateFormTwo = {}
            templateFormTwo.template_id = this.current_template_id
            templateFormTwo.advice_name = this.templateForm.advice_name
            templateFormTwo.advice_desc = this.templateForm.advice_desc
            templateFormTwo.drug_spec = this.templateForm.drug_spec
            templateFormTwo.drug_spec_unit = this.templateForm.drug_spec_unit
            templateFormTwo.single_dose = this.templateForm.single_dose
            templateFormTwo.single_dose_unit = this.templateForm.single_dose_unit
            templateFormTwo.prescribing_number = this.templateForm.prescribing_number
            templateFormTwo.prescribing_number_unit = this.templateForm.prescribing_number_unit
            templateFormTwo.delivery_way = this.templateForm.delivery_way
            templateFormTwo.execution_frequency = this.templateForm.execution_frequency
            templateFormTwo.parent_id = this.parent_id


            if (this.isAddChild) {
              CreateSubAdvice(templateFormTwo).then(response => {
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

                  var spliceIndex = -1;
                  for (let index = this.adviceTemplates.length - 1; ; index--) {
                    if (this.adviceTemplates[index].parent_id === templateFormTwo.parent_id) {
                      spliceIndex = index;
                      break;
                    } else if (this.adviceTemplates[index].id === templateFormTwo.parent_id) {
                      spliceIndex = index;
                      break;
                    }
                  }

                  if (spliceIndex > -1) {
                    spliceIndex += 1;
                    if (spliceIndex === this.adviceTemplates.length) {
                      let template = response.data.data.template
                      template['isNoSub'] = 2
                      this.adviceTemplates.push(template);
                    } else {
                      let template = response.data.data.template
                      template['isNoSub'] = 2
                      var swapData = this.adviceTemplates.splice(spliceIndex);
                      this.adviceTemplates.push(template);
                      this.adviceTemplates = this.adviceTemplates.concat(swapData);
                    }
                  }
                  this.handleSpanTempArr()
                  this.templateFormVisible = false;
                  this.resetForm(formName);
                  return false;
                }
              });

            } else {

              let templateFormTwo = {}
              templateFormTwo.advice_name = this.templateForm.advice_name
              templateFormTwo.advice_desc = this.templateForm.advice_desc
              templateFormTwo.drug_spec = this.templateForm.drug_spec
              templateFormTwo.drug_spec_unit = this.templateForm.drug_spec_unit
              templateFormTwo.single_dose = this.templateForm.single_dose
              templateFormTwo.single_dose_unit = this.templateForm.single_dose_unit
              templateFormTwo.prescribing_number = this.templateForm.prescribing_number
              templateFormTwo.prescribing_number_unit = this.templateForm.prescribing_number_unit
              templateFormTwo.delivery_way = this.templateForm.delivery_way
              templateFormTwo.execution_frequency = this.templateForm.execution_frequency
              templateFormTwo.parent_id = this.parent_id

              if (this.isEdit) {
                for (let i = 0; i < this.adviceTableData.length; i++) {
                  if (i == this.table_current_index) {
                    this.adviceTableData[i].advice_name = templateFormTwo.advice_name
                    this.adviceTableData[i].advice_desc = templateFormTwo.advice_desc
                    this.adviceTableData[i].drug_spec = templateFormTwo.drug_spec
                    this.adviceTableData[i].drug_spec_unit = templateFormTwo.drug_spec_unit
                    this.adviceTableData[i].single_dose = templateFormTwo.single_dose
                    this.adviceTableData[i].single_dose_unit = templateFormTwo.single_dose_unit
                    this.adviceTableData[i].prescribing_number = templateFormTwo.prescribing_number
                    this.adviceTableData[i].prescribing_number_unit = templateFormTwo.prescribing_number_unit
                    this.adviceTableData[i].delivery_way = templateFormTwo.delivery_way
                    this.adviceTableData[i].execution_frequency = templateFormTwo.execution_frequency
                  }
                }
              } else {

                this.adviceTableData.unshift(templateFormTwo)
              }
              this.templateFormVisible = false;
              this.templateTableVisible = true;
            }

            this.$refs[formName].resetFields();


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
          .catch(() => {
          });
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
          .catch(() => {
          });
      },

      getAdviceConfig() {
        this.adviceTemplates = []
        getAdviceConfig().then(response => {
          if (response.data.state == 1) {
            this.drugways = response.data.data.drugways;
            this.executionFrequencyOptions = response.data.data.efs;
            this.drugdics = response.data.data.drugs;
            let len = response.data.data.advice_templates.length

            for (let i = 0; i < len; i++) {

              //对于空医嘱模版的处理
              if (response.data.data.advice_templates[i] != null && response.data.data.advice_templates[i].DoctorAdviceTemplate.length == 0) {
                let object = {}
                object["name"] = response.data.data.advice_templates[i].name
                object["isNoSub"] = 1
                object["template_id"] = response.data.data.advice_templates[i].id
                this.adviceTemplates.push(object)
              }

              //非空模版的处理
              for (let y = 0; y < response.data.data.advice_templates[i].DoctorAdviceTemplate.length; y++) {
                if (response.data.data.advice_templates[i].id == response.data.data.advice_templates[i].DoctorAdviceTemplate[y].template_id) {
                  let object = {}
                  let DoctorAdviceTemplate = response.data.data.advice_templates[i].DoctorAdviceTemplate[y]
                  for (const key in DoctorAdviceTemplate) {
                    object[key] = DoctorAdviceTemplate[key];
                  }
                  object["isNoSub"] = 2
                  object["name"] = response.data.data.advice_templates[i].name
                  this.adviceTemplates.push(object)
                }
              }
            }

            //处理单元格合并的数据
            this.handleSpanTempArr()

          }
        });
      }, isShow(index, row) {
        if (index > 0 && row.name == this.adviceTemplates[index - 1].name) {
          return false;
        }
        return true;
      }, cancelEditHandle() {
        this.templateEditFormVisible = false;
      }, submitEditTemplate(formName) {
        this.$refs[formName].validate(valid => {
          this.templateFormEdit.single_dose = parseFloat(this.templateFormEdit.single_dose);
          this.templateFormEdit.prescribing_number = parseFloat(this.templateFormEdit.prescribing_number);

          if (isNaN(this.templateFormEdit.single_dose)) {
            this.templateFormEdit.single_dose = 0;
          }
          if (isNaN(this.templateFormEdit.prescribing_number)) {
            this.templateFormEdit.prescribing_number = 0;
          }
          if (valid) {
            UpdateAdviceTemplate(this.templateFormEdit.id, this.templateFormEdit).then(
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
                  this.templateEditFormVisible = false;
                  this.resetForm(formName);
                  var template = response.data.data.template;
                  this.adviceTemplates[this.currentIndex].advice_name = template.advice_name;
                  this.adviceTemplates[this.currentIndex].advice_desc = template.advice_desc;
                  this.adviceTemplates[this.currentIndex].drug_spec = template.drug_spec;
                  this.adviceTemplates[this.currentIndex].drug_spec_unit = template.drug_spec_unit;
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
          }
        });
      }, drugDesc(row) {
        if (row.isNoSub == 2) {
          if (row.drug_spec.length <= 0) {
            return ""
          } else {
            if (row.prescribing_number == 0) {
              return row.drug_spec + "" + row.drug_spec_unit
            } else {
              return row.drug_spec + "" + row.drug_spec_unit + " * " + row.prescribing_number + row.prescribing_number_unit
            }
          }
        }
      }, drugDescTwo(row) {
        if (row.drug_spec.length <= 0) {
          return ""
        } else {
          if (row.prescribing_number == 0) {
            return row.drug_spec + "" + row.drug_spec_unit
          } else {
            return row.drug_spec + "" + row.drug_spec_unit + " * " + row.prescribing_number + row.prescribing_number_unit
          }
        }

      }, newRecordActionTwo() {
        this.templateFormTwoVisible = true

      }, deleteRecordActionTwo() {
        if (this.table_current_index_two == -1) {
          this.$message.error("请选择一条医嘱记录")
          return
        }
        this.$confirm('删除记录', '是否删除该医嘱记录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = this.adviceTableDataTwo[this.table_current_index_two].id
          let template_id = this.adviceTableDataTwo[this.table_current_index_two].template_id

          DeleteAdviceTemplate(id, template_id).then(response => {
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

              for (let i = 0; i < this.adviceTemplates.length; i++) {
                console.log(this.adviceTemplates[i].id)
                if (this.adviceTemplates[i].id == this.adviceTableDataTwo[this.table_current_index_two].id) {
                  this.adviceTemplates.splice(i, 1)
                }
              }
              this.adviceTableDataTwo.splice(this.table_current_index_two, 1)

              this.table_current_index_two = -1
            }
          });


        }).catch(() => {
        });


      }, modifyRecordActionTwo() {
        if (this.table_current_index_two == -1) {
          this.$message.error("请选择一条医嘱记录")
          return
        }

        this.templateFormEdit = {
          drug_spec: this.adviceTableDataTwo[this.table_current_index_two].drug_spec,
          drug_spec_unit: this.adviceTableDataTwo[this.table_current_index_two].drug_spec_unit,
          advice_name: this.adviceTableDataTwo[this.table_current_index_two].advice_name,
          advice_desc: this.adviceTableDataTwo[this.table_current_index_two].advice_desc,
          single_dose: this.adviceTableDataTwo[this.table_current_index_two].single_dose,
          single_dose_unit: this.adviceTableDataTwo[this.table_current_index_two].single_dose_unit,
          prescribing_number: this.adviceTableDataTwo[this.table_current_index_two].prescribing_number,
          prescribing_number_unit: this.adviceTableDataTwo[this.table_current_index_two].prescribing_number_unit,
          delivery_way: this.adviceTableDataTwo[this.table_current_index_two].delivery_way,
          execution_frequency: this.adviceTableDataTwo[this.table_current_index_two].execution_frequency,
          id: this.adviceTableDataTwo[this.table_current_index_two].id,
        };
        this.templateEditFormTwoVisible = true;


      }, tableRowClassNameTwo({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      onRowClickTwo(row, event, column) {
        this.table_current_index_two = row.index;
      }, cancelHandleTwo() {
        this.templateFormTwoVisible = false

      }, submitTemplateTwo(formName) {
        this.templateForm['template_id'] = this.current_template_id
        CreateSingleAdviceTemplate(this.templateForm).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {

            let source = response.data.data.template
            let objects = {}
            for (let keys in source) {
              objects[keys] = source[keys]
            }
            objects["name"] = this.current_template_name
            objects["isNoSub"] = 2

            this.adviceTableDataTwo.unshift(response.data.data.template);
            // this.adviceTemplates.unshift(objects)
            // this.handleSpanTempArr()

            this.getAdviceConfig()
            this.resetForm(formName);
            this.templateFormTwoVisible = false

            this.$notify({
              title: "成功",
              message: "添加成功",
              type: "success",
              duration: 2000
            });

            return false;
          }
        });

      }, cancelTableHandleTwo() {
        this.templateTableTwoVisible = false
        this.adviceTableDataTwo = []
      }, cancelEditHandleTwo() {
        this.templateEditFormTwoVisible = false
      }, submitEditTemplateTwo(formName) {
        this.$refs[formName].validate(valid => {
          this.templateFormEdit.single_dose = parseFloat(this.templateFormEdit.single_dose);
          this.templateFormEdit.prescribing_number = parseFloat(this.templateFormEdit.prescribing_number);

          if (isNaN(this.templateFormEdit.single_dose)) {
            this.templateFormEdit.single_dose = 0;
          }
          if (isNaN(this.templateFormEdit.prescribing_number)) {
            this.templateFormEdit.prescribing_number = 0;
          }
          if (valid) {
            UpdateAdviceTemplate(this.templateFormEdit.id, this.templateFormEdit).then(
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
                  this.templateEditFormTwoVisible = false;
                  this.resetForm(formName);
                  var template = response.data.data.template;
                  this.adviceTableDataTwo[this.table_current_index_two].advice_name = template.advice_name;
                  this.adviceTableDataTwo[this.table_current_index_two].advice_desc = template.advice_desc;
                  this.adviceTableDataTwo[this.table_current_index_two].drug_spec = template.drug_spec;
                  this.adviceTableDataTwo[this.table_current_index_two].drug_spec_unit = template.drug_spec_unit;
                  this.adviceTableDataTwo[this.table_current_index_two].single_dose = template.single_dose;
                  this.adviceTableDataTwo[this.table_current_index_two].single_dose_unit = template.single_dose_unit;
                  this.adviceTableDataTwo[this.table_current_index_two].delivery_way = template.delivery_way;
                  this.adviceTableDataTwo[this.table_current_index_two].execution_frequency = template.execution_frequency;
                  this.adviceTableDataTwo[this.table_current_index_two].prescribing_number = template.prescribing_number;
                  this.adviceTableDataTwo[this.table_current_index_two].prescribing_number_unit = template.prescribing_number_unit;


                  for (let i = 0; i < this.adviceTemplates.length; i++) {
                    if (this.adviceTemplates[i].id == this.adviceTableDataTwo[this.table_current_index_two].id) {
                      this.adviceTemplates[i].advice_name = template.advice_name;
                      this.adviceTemplates[i].advice_desc = template.advice_desc;
                      this.adviceTemplates[i].drug_spec = template.drug_spec;
                      this.adviceTemplates[i].drug_spec_unit = template.drug_spec_unit;
                      this.adviceTemplates[i].single_dose = template.single_dose;
                      this.adviceTemplates[i].single_dose_unit = template.single_dose_unit;
                      this.adviceTemplates[i].delivery_way = template.delivery_way;
                      this.adviceTemplates[i].execution_frequency = template.execution_frequency;
                      this.adviceTemplates[i].prescribing_number = template.prescribing_number;
                      this.adviceTemplates[i].prescribing_number_unit = template.prescribing_number_unit;

                    }
                  }
                  return false;
                }
              }
            );
          }
        });
      }, merge({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 7) {
          const _row = this.tempArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }, tableRowClassNames({row, rowIndex}) {
        let arr = this.hoverOrderArr
        for (let i = 0; i < arr.length; i++) {
          if (rowIndex == arr[i]) {
            return 'success-row'
          }
        }
      }, cellMouseEnter: function (row, column, cell, event) {

        if (column.label == "模版名称") {
          this.sameRowArr.forEach((arr, i) => {
            if (arr.indexOf(row.index) != -1) {
              this.hoverOrderArr = arr
            }
          })


        } else if (column.label == "操作") {
          this.sameRowArr.forEach((arr, i) => {
            if (arr.indexOf(row.index) != -1) {
              this.hoverOrderArr = arr
            }
          })


        } else {

          this.hoverOrderArr = []


        }


      }, cellMouseLeave: function (row, column, cell, event) {
        this.hoverOrderArr = []
      }, openEdit(index, row) {
        this.hoverOrderArr = []
        this.currentIndex = index
        this.templateFormEdit.drug_spec_unit = row.drug_spec_unit
        this.templateFormEdit.drug_spec = row.drug_spec
        this.templateFormEdit.advice_desc = row.advice_desc
        this.templateFormEdit.advice_name = row.advice_name
        this.templateFormEdit.delivery_way = row.delivery_way
        this.templateFormEdit.execution_frequency = row.execution_frequency
        this.templateFormEdit.prescribing_number = row.prescribing_number
        this.templateFormEdit.prescribing_number_unit = row.prescribing_number_unit
        this.templateFormEdit.single_dose = row.single_dose
        this.templateFormEdit.single_dose_unit = row.single_dose_unit
        this.templateFormEdit.id = row.id
        this.templateFormEdit.parent_id = row.parent_id
        this.templateEditFormVisible = true
        if (row.parent_id > 0) {
          this.editDialogTitle = "编辑子药"
          this.edit_advice_name = "子药名称"
        } else {

          this.editDialogTitle = "编辑医嘱"
          this.edit_advice_name = "医嘱内容"


        }

      }, openDelete(index, row) {
        this.hoverOrderArr = []

        this.$confirm('删除记录', '是否删除该医嘱', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = row.id
          let template_id = row.template_id
          let parent_id = row.parent_id
          DeleteAdviceTemplate(id, template_id, parent_id).then(response => {
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

              if (row.parent_id > 0) { //删除子医嘱
                this.adviceTemplates.splice(index, 1)
              } else { //如果医嘱下面包含子医嘱，删除医嘱和子医嘱
                //删除子医嘱
                for (let i = 0; i < this.adviceTemplates.length; i++) {
                  if (this.adviceTemplates[i].parent_id == row.id) {
                    this.adviceTemplates.splice(i--, 1)
                  }
                }
                //删除医嘱
                this.adviceTemplates.splice(index, 1)


                //当该模版下没有医嘱的时候，创建一个空模版
                let count = 0 //用于计数
                for (let i = 0; i < this.adviceTemplates.length; i++) {
                  if (this.adviceTemplates[i].template_id == row.template_id) {
                    count = count + 1
                  }
                }
                if (count == 0) {
                  let object = {}
                  object["name"] = row.name
                  object["isNoSub"] = 1
                  object["template_id"] = row.template_id
                  this.adviceTemplates.splice(index, 0, object)
                }
              }

              //处理单元格合并的数据
              this.handleSpanTempArr()


            }
          });
        }).catch(() => {
        });
      }, openDeleteChild(index, row) {
        this.hoverOrderArr = []

        this.$confirm('删除子药', '是否删除该子药', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = row.id
          let template_id = row.template_id
          let parent_id = row.parent_id
          DeleteAdviceTemplate(id, template_id, parent_id).then(response => {
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

              if (row.parent_id > 0) { //删除子医嘱
                this.adviceTemplates.splice(index, 1)
              } else { //如果医嘱下面包含子医嘱，删除医嘱和子医嘱
                //删除子医嘱
                for (let i = 0; i < this.adviceTemplates.length; i++) {
                  if (this.adviceTemplates[i].parent_id == row.id) {
                    this.adviceTemplates.splice(i--, 1)
                  }
                }
                //删除医嘱
                this.adviceTemplates.splice(index, 1)


                //当该模版下没有医嘱的时候，创建一个空模版
                let count = 0 //用于计数
                for (let i = 0; i < this.adviceTemplates.length; i++) {
                  if (this.adviceTemplates[i].template_id == row.template_id) {
                    count = count + 1
                  }
                }
                if (count == 0) {
                  let object = {}
                  object["name"] = row.name
                  object["isNoSub"] = 1
                  object["template_id"] = row.template_id
                  this.adviceTemplates.splice(index, 0, object)
                }
              }

              //处理单元格合并的数据
              this.handleSpanTempArr()


            }
          });
        }).catch(() => {
        });


      },
      openNewChild(index, row) {
        this.hoverOrderArr = []

        this.current_template_id = row.template_id
        this.parent_id = row.id
        this.isAddChild = true;
        this.isEdit = false;
        this.templateFormVisible = true;
        this.dialogTitle = "新增子药"
        this.advice_content_name = "子药名称"

      }, deleteRecordAction: function () {
        if (this.table_current_index == -1) {
          this.$message.error("请选择一条医嘱记录")
          return
        }
        this.$confirm('删除记录', '是否删除该医嘱记录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.adviceTableData.splice(this.table_current_index, 1)
          this.table_current_index = -1

        }).catch(() => {
        });

      }, handleSpanTempArr() {
        this.tempArr = []

        for (let i = 0; i < this.adviceTemplates.length; i++) {
          if (i === 0) {
            this.tempArr.push(1);
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (this.adviceTemplates[i].template_id === this.adviceTemplates[i - 1].template_id) {
              this.tempArr[this.pos] += 1;
              this.tempArr.push(0);
            } else {
              this.tempArr.push(1);
              this.pos = i;
            }
          }
        }


        let sameRowArr = [], sIdx = 0;
        this.adviceTemplates.forEach((item, index) => {
          item.index = index
          if (index === 0) {
            sameRowArr.push([index])
          } else {
            if (item.template_id === this.adviceTemplates[index - 1].template_id) {
              sameRowArr[sIdx].push(index)
            } else {
              sIdx = sIdx + 1;
              sameRowArr.push([index])
            }
          }
        })
        this.sameRowArr = sameRowArr;


      }, handleUpdateAdviceTemplate(row, index) {
        this.current_template_id = row.template_id
        this.current_template_name = row.name
        this.form.name = row.name
        this.templateTableTwoVisible = true;
        this.adviceTableDataTwo = []
        for (let i = 0; i < this.adviceTemplates.length; i++) {
          if (this.adviceTemplates[i].template_id == row.template_id) {
            this.adviceTableDataTwo.push(this.adviceTemplates[i]);
          }
        }
      }, modifyTemplateName() {
        let params = {
          template_name: this.form.name,
          template_id: this.current_template_id,
        }
        updateTemplateName(params).then(response => {
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
            this.templateTableTwoVisible = false;

            for (let i = 0; i < this.adviceTemplates.length; i++) {
                if(this.adviceTemplates[i].template_id == this.current_template_id){
                  this.adviceTemplates[i].name = response.data.data.template_name
                }
            }
          }
        });
      }
    }
  };
</script>
