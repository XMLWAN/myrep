<template>
    <div class="patient-container">
        <patient-sidebar :id="patientID" defaultActive="1-4" v-on:tran-patient="onTranPatient"></patient-sidebar>
        <div class="patient-app-container advice-container app-container">
            <div class="filter-container">
                <el-input   style="width: 400px;" v-model="listQuery.keywords" class="filter-item" />
                <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="changeKey" >搜索</el-button>
                <el-button  class="filter-item" style="float:right;" @click="printThisInfo()" :type="adviceType==1 || adviceType == 3?'primary':'warning'" icon="el-icon-printer" >打印医嘱</el-button>
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" class="filter-item" style="float:right;" @click="openNew" type="primary" icon="el-icon-plus" >新增医嘱</el-button>
            </div>
            <div class="cell clearfix">
                <label class="title"><span class="name">医嘱类型</span> : </label>
                <div class="time ">
                    <ul class="">
                    <li :class="item.value==adviceType?'active':''" @click='selectAdviceType(item.value)' v-for="item in adviceTypeArr" :key="item.value" >{{item.label}}</li>
                    </ul>
                </div>
            </div>
            <div class="cell clearfix">
                <label class="title"><span class="name">显示范围</span> : </label>
                <div class="time ">
                    <ul class="">
                    <li :class="item.value==stopType?'active':''" @click='selectStopType(item.value)' v-for="item in stopTypeArr" :key="item.value" >{{item.label}}</li>
                    </ul>
                </div>
            </div>
            <div class="cell">
                <label class="title"><span class="name">日期查询</span> : </label>
                <el-date-picker v-model="listQuery.start_time"  prefix-icon="el-icon-date" @change="changeTime" :editable="false" style="width: 196px;" type="date" placeholder="选择日期时间" align="right" :picker-options="pickerOptions"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" > </el-date-picker>
                <span class="">-</span>
                <el-date-picker v-model="listQuery.end_time"  prefix-icon="el-icon-date" @change="changeTime" :editable="false" style="width: 196px;" type="date" placeholder="选择日期时间" align="right" :picker-options="pickerOptions"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
            </div>
            <el-table @cell-click="clickuseradvicecell"  row-class-name="user-advice-table-row" :span-method="mergeSpan" ref="multipleTable" :data="adviceTableData" border fit highlight-current-row @select="selectAdvice" @selection-change="changeAdvice" style="width: 100%;margin-top: 10px;" >

                <el-table-column align="center" label="全选" width="60px" type="selection" fixed></el-table-column>
                <!--<el-table-column type="index" :index="indexMethod"  label="序号" width="60px" align="center"></el-table-column>-->
                <el-table-column  label="期效" width="60px" property="advice_type" align="center" fixed>
                    <template slot-scope="scope">
                        <span v-if="scope.row.advice_type==1">长嘱</span>
                        <span v-else-if="scope.row.advice_type==3">临嘱</span>
                        <span v-else></span>
                    </template>
                </el-table-column>
                <el-table-column  label="开始时间" width="180" property="start_time" align="center">
                <template slot-scope="scope">
                    <span v-if="isShowStartTime(scope.$index, scope.row)">{{scope.row.start_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
                    <span v-else></span>
                </template>
                </el-table-column>
                <el-table-column  label="医嘱内容" property="advice_name" width="180"  style="word-break: keep-all;white-space:nowrap;">
                    <template slot-scope="scope">
                    <el-dropdown trigger="click" v-if="scope.row.parent_id == 0">
                        <span class="el-dropdown-link" v-if="scope.row.parent_id == 0">
                            {{ scope.row.advice_name }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>

                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click.native="openEdit(scope.$index, scope.row)">修改医嘱</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.advice_type == 1" :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click.native="openStop(scope.$index, scope.row)">停止医嘱</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.advice_type == 3" :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click.native="openExec(scope.$index, scope.row)">执行医嘱</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.advice_type == 3" :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click.native="openCheck(scope.$index, scope.row)">核对医嘱</el-dropdown-item>
                            <el-dropdown-item :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click.native="openDelete(scope.$index, scope.row)">删除医嘱</el-dropdown-item>
                            <el-dropdown-item :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click.native="openNewChild(scope.$index, scope.row)">新增子药</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                      <el-dropdown trigger="click" v-if="scope.row.parent_id > 0">
                            <span class="el-dropdown-link" >
                                &emsp;&emsp;{{ scope.row.advice_name }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click.native="openEdit(scope.$index, scope.row)">修改医嘱</el-dropdown-item>
                          <el-dropdown-item :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click.native="openDelete(scope.$index, scope.row)">删除医嘱</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>

                </el-table-column>
                <!-- <el-table-column  label="药品规格*数量" width="180"  property="drug_spec" align="center">
                    <template slot-scope="scope" >
                        <span v-if="scope.row.drug_spec!=0">
                          {{scope.row.drug_spec}}{{scope.row.drug_spec_unit}}
                          </span>
                          <span v-if="scope.row.prescribing_number!=0">*{{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}</span>

                    </template>
                </el-table-column> -->
                <el-table-column  label="规格" width="180"  property="advice_desc" align="center">
                </el-table-column>
                <el-table-column  label="开药数量" width="180"  property="prescribing_number" align="center">
                    <template slot-scope="scope" >
                        <span v-if="scope.row.prescribing_number!=0">{{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="单次用量" width="180"  property="single_dose" align="center">
                    <template slot-scope="scope" >
                        <span v-if="scope.row.single_dose!=0">{{scope.row.single_dose}}{{scope.row.single_dose_unit}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="频率" width="180"  property="execution_frequency" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.parent_id==0">{{scope.row.execution_frequency}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="用法" width="180"  property="delivery_way" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.parent_id==0">{{scope.row.delivery_way}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="执行时间" width="180"  property="execution_time" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.execution_state==1"> {{scope.row.execution_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="终止时间" width="180"  property="stop_time" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.stop_state==1"> {{scope.row.stop_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="执行护士" width="180"  property="execution_staff" v-show="adviceType==3" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.parent_id==0">{{getXuserName(scope.row.execution_staff)}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="开嘱医生" width="180"  property="advice_doctor" align="center">
                    <template slot-scope="scope">
                        {{getXuserName(scope.row.advice_doctor)}}
                    </template>
                </el-table-column>

                <el-table-column label="开嘱时间" width="180"  property="created_time" align="center">
                    <template slot-scope="scope">
                        {{scope.row.created_time | parseTime("{y}-{m}-{d} {h}:{i}")}}
                    </template>
                </el-table-column>

                    <el-table-column label="校对护士" width="180"  property="checker"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.parent_id==0">{{getXuserName(scope.row.checker)}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="校对时间" width="180"  property="check_time" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.check_state==1">{{scope.row.created_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
                        </template>
                    </el-table-column>

                <!-- <template v-if="adviceType==3">
                    <el-table-column key="advice_doctor_3" label="开嘱医生" min-width="80"  property="advice_doctor" align="center">
                        <template slot-scope="scope">
                            {{getXuserName(scope.row.advice_doctor)}}
                        </template>
                     </el-table-column>
                    <el-table-column key="execution_time_3" label="执行时间" min-width="80"  property="execution_time" v-show="adviceType==3" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.execution_state==1&&scope.row.parent_id==0"> {{scope.row.execution_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column key="execution_staff_3" label="执行人员" min-width="80"  property="execution_staff" v-show="adviceType==3" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.parent_id==0">{{getXuserName(scope.row.execution_staff)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column key="checker_3" label="核对人员" min-width="80"  property="checker" v-show="adviceType==3" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.parent_id==0">{{getXuserName(scope.row.checker)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  key="remark_3" label="备注" min-width="80"  property="remark"  align="center"> </el-table-column>
                </template>
                <template v-if="adviceType==1">
                    <el-table-column key="advice_doctor_1" label="开嘱医生" min-width="80"  property="advice_doctor" align="center">
                        <template slot-scope="scope">
                            {{getXuserName(scope.row.advice_doctor)}}
                        </template>
                    </el-table-column>
                     <el-table-column key="advice_affirm_1" label="开嘱确认" min-width="80"  property="advice_affirm" v-show="adviceType==0" align="center"> </el-table-column>
                    <el-table-column key="stop_time_1" label="停止时间" min-width="80"  property="stop_time" v-show="adviceType==1" align="center">
                        <template slot-scope="scope">
                           <span v-if="scope.row.stop_state==1&&scope.row.parent_id==0"> {{scope.row.stop_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column key="stop_doctor_1" label="停嘱医生" min-width="80"  property="stop_doctor" v-show="adviceType==1" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.stop_state==1&&scope.row.parent_id==0">  {{getXuserName(scope.row.stop_doctor)}}</span>
                        </template>
                    </el-table-column>
                </template> -->
                  <el-table-column  label="操作" width="180" align="center"  fixed="right">
                      <template slot-scope="scope">
                        <el-button-group>
                          <el-button type="primary" size="mini" :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click="scope.row.groupno>0?openEditGroupAdvice(scope.row.groupno):openEdit(scope.$index, scope.row)" v-if="isShowStartTime(scope.$index, scope.row)">编辑</el-button>
                          <el-button type="danger" size="mini" :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click="scope.row.groupno>0?DeleteGroupAdvice(scope.row.groupno):openDelete(scope.$index, scope.row)" v-if="isShowStartTime(scope.$index, scope.row)">删除</el-button>
                        </el-button-group>
                      </template>
                  </el-table-column>
            </el-table>

            <el-dialog title="新增医嘱" :visible.sync="groupFormVisible" width="700px">
                <el-form ref="groupForm" :rules="groupRules" :model="groupForm" label-width="90px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="医嘱类型 :" required prop="advice_type">
                                <el-select v-model="groupForm.advice_type"  placeholder="请选择">
                                <el-option :label="item.label" :key="item.value"  :value="item.value" v-for="item in adviceTypeOptions"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">

                            <el-form-item label="开始时间 :" required prop="start_time">
                                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="选择时间" v-model="groupForm.start_time" ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="备注 :">
                        <el-input type="textarea" v-model="groupForm.remark"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开嘱医生 :" >
                                <span>{{adminusername}} </span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="开嘱时间 :" >
                                <span>{{groupForm.advice_date}} </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="openAdviceTemplate()">选择医嘱模板</el-button>
                        </el-col>
                        <el-col :span="1">
                          &nbsp;
                        </el-col>
                        <el-col :span="5">
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="openGroupAdvice(0)">新增医嘱内容</el-button>
                        </el-col>
                        <el-col :span="1">
                          &nbsp;
                        </el-col>
                        <el-col :span="5">
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="openDeleteGroupAdvice()">删除医嘱内容</el-button>
                        </el-col>
                        <el-col :span="1">
                          &nbsp;
                        </el-col>
                        <el-col :span="5">
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="openGroupAdvice(1)">修改医嘱内容</el-button>
                        </el-col>
                        <!-- <el-col :span="1">
                          &nbsp;
                        </el-col>
                        <el-col :span="4">
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="openGroupChild()">添加子药内容</el-button>
                        </el-col> -->
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                      <el-table id="user-advice-name-table" :data="groupForm.adviceNames" border fit highlight-current-row :row-class-name="groupClassName" @current-change="selectGroupAdvice" style="width: 100%;margin-top: 10px;margin-bottom: 10px;" :row-key="getRowKey" ref="advicenametable" :expand-row-keys="expandRowKeys" type="expand" default-expand-all>
                        <el-table-column  label="医嘱内容" property="advice_name" style="word-break: keep-all;white-space:nowrap;">

                        </el-table-column>
                        <!-- <el-table-column  label="药品规格*数量" min-width="80"  property="drug_spec" align="center">
                            <template slot-scope="scope" >
                                <span v-if="scope.row.drug_spec!=0">{{scope.row.drug_spec}}{{scope.row.drug_spec_unit}}</span>
                                <span v-if="scope.row.prescribing_number!=0">*{{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}</span>
                            </template>
                        </el-table-column> -->
                        <el-table-column  label="规格" min-width="80"  property="advice_desc" align="center">
                        </el-table-column>
                        <el-table-column  label="开药数量" min-width="80"  property="prescribing_number" align="center">
                            <template slot-scope="scope" >
                                <span v-if="scope.row.prescribing_number!=0">{{scope.row.prescribing_number}}{{scope.row.prescribing_number_unit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="单次用量" min-width="80"  property="single_dose" align="center">
                            <template slot-scope="scope" >
                                <span v-if="scope.row.single_dose!=0">{{scope.row.single_dose}}{{scope.row.single_dose_unit}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="给药途径" min-width="80"  property="delivery_way" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.parent_row==0">{{scope.row.delivery_way}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="执行频率" min-width="80"  property="execution_frequency" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.parent_row==0">{{scope.row.execution_frequency}}</span>
                            </template>
                        </el-table-column>

                    </el-table>
                      </el-col>
                    </el-row>

                </el-form>
                <div slot="footer" class="dialog-footer">
                        <el-button :disabled="$store.getters.xt_user.subscibe.state==3 || groupForm.adviceNames.length == 0?true:false" type="primary" @click="submitgroupAdvice('groupForm')">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="选择医嘱模板"  :close-on-click-modal="false" :visible.sync="templateFormVisible" width="72%">
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
                        id='user-advice-select-template-table'
                        :data="selectedTemp.list"
                        border
                        :span-method="spanselecttable"
                        @select="selectTemplateAdvice"
                        @selection-change="changeTemplateAdvice"
                        @select-all="selectAllTemplateAdvice"
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
                    >确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="选择医嘱模板" :visible.sync="oldTemplateFormVisible" width="700px">
                <el-form ref="templateForm" :rules="templateRules" :model="templateForm" >
                    <el-row>
                        <el-col :span="24">
                            <el-form-item prop="id" >
                                <el-select v-model="templateForm.id"  filterable clearable  placeholder="请选择(输入可搜索)" style="width:100%" >
                                <el-option
                                v-for="item in adviceTemplates"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id" >
                                </el-option>
                            </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                        <el-button  @click="templateFormVisible = false">取消</el-button>
                        <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="addTempForm('templateForm')">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog :title="nameFormTitle" :visible.sync="nameFormVisible" width="700px">
                <el-form ref="nameForm" :rules="nameRules" :model="nameForm" label-width="90px">
                    <el-row>
                        <el-col :span="12">
                          <el-form-item label="医嘱内容 :" required prop="advice_name">
                            <el-input v-model="nameForm.advice_name"  ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="规格 :"  prop="advice_desc">
                            <el-input v-model="nameForm.advice_desc"  ></el-input>
                          </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-form-item label="药品规格 :" prop="drug_spec" >
                                <el-col :span="8">
                                    <el-input v-model="nameForm.drug_spec"></el-input>
                                </el-col>
                                 <el-col class="line" :span="2">&nbsp;</el-col>
                                <el-col :span="14">
                                    <el-select v-model="nameForm.drug_spec_unit"  filterable clearable allow-create  placeholder="选择" >
                                        <el-option v-for="item in unitsOption" :key="item.id" :label="item.name " :value="item.name">
                                        </el-option>
                                    </el-select>

                                </el-col>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="单次用量 :" prop="single_dose" >
                                <el-col :span="8">
                                    <el-input v-model="nameForm.single_dose"></el-input>
                                </el-col>
                                 <el-col class="line" :span="2">&nbsp;</el-col>
                                <el-col :span="14">
                                    <el-select v-model="nameForm.single_dose_unit"  filterable clearable allow-create  placeholder="选择" >
                                        <el-option v-for="item in unitsOption" :key="item.id" :label="item.name " :value="item.name">
                                        </el-option>
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
                                    <el-select v-model="nameForm.prescribing_number_unit"  filterable clearable allow-create  placeholder="选择" >
                                        <el-option v-for="item in unitsOption" :key="item.id" :label="item.name " :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="给药途径 :" prop="delivery_way">
                                <el-select v-model="nameForm.delivery_way"  filterable clearable allow-create  :disabled='isChild' placeholder="请选择(输入可搜索)" style="width:90%" >
                                    <el-option
                                    v-for="item in deliveryWayOptions"
                                    :key="item.id"
                                    :label="item.name "
                                    :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="执行频率 :" prop="execution_frequency">
                                 <el-select v-model="nameForm.execution_frequency"  filterable clearable allow-create :disabled='isChild' placeholder="请选择(输入可搜索)" style="width:90%" >
                                    <el-option
                                    v-for="item in executionFrequencyOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                        <el-button  @click="nameFormVisible = false">取消</el-button>
                        <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitNameForm('nameForm')">确 定</el-button>
                </div>
            </el-dialog>

            <edit-group-advice :adviceTemplates="adviceTemplates" :groupFormVisible="groupEditFormVisible" :groupForm="groupForm" :adviceTypeOptions="adviceTypeOptions" :executionFrequencyOptions="executionFrequencyOptions" :adminusername="adminusername" :unitsOption="unitsOption" :deliveryWayOptions="deliveryWayOptions" :rowKey="rowKey" :adviceTemplateMaps="adviceTemplateMaps" :patientID="patientID" :adviceType="adviceType" :adviceTableData="adviceTableData" ref="editGroupForm"></edit-group-advice>

            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="700px">
                <el-form ref="adviceForm" :rules="adviceRules" :model="adviceForm" label-width="90px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="医嘱类型 :" required prop="advice_type">
                                <el-select v-model="adviceForm.advice_type" :disabled="isEdit||adviceForm.parent_id>0?true:false"  placeholder="请选择">
                                <el-option :label="item.label" :key="item.value"  :value="item.value" v-for="item in adviceTypeOptions"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="开嘱时间 :" required prop="advice_date" >
                                <el-date-picker type="date" readonly format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="adviceForm.advice_date"  style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="开始时间 :" required prop="start_time">
                        <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="选择时间" v-model="adviceForm.start_time" style="width:50%" :disabled="adviceForm.parent_id==0?false:true" ></el-date-picker>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                          <el-form-item label="医嘱内容 :" required prop="advice_name">
                            <el-input v-model="adviceForm.advice_name" ></el-input>
                            <!--<el-select v-model="adviceForm.advice_name" @change="changeAdviceName" filterable clearable allow-create placeholder="请选择(输入可搜索)" style="width:50%" >-->
                                <!--<el-option-->
                                <!--v-for="item in adviceTemplates"-->
                                <!--:key="item.id"-->
                                <!--:label="item.advice_name"-->
                                <!--:value="item.id"-->
                                <!--&gt;-->
                                <!--<span >{{ item.advice_name }}</span>-->
                                <!--<span >{{ item.advice_spec }}</span>-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        </el-form-item>
                      </el-col>

                        <el-col :span="12">
                            <el-form-item label="药品规格 :" prop="drug_spec" >
                                <el-col :span="8">
                                    <el-input v-model="adviceForm.drug_spec"></el-input>
                                </el-col>
                                 <el-col class="line" :span="2">&nbsp;</el-col>
                                <el-col :span="14">
                                    <el-select v-model="adviceForm.drug_spec_unit"  filterable clearable allow-create  placeholder="选择" >
                                        <el-option v-for="item in unitsOption" :key="item.id" :label="item.name " :value="item.name">
                                        </el-option>
                                    </el-select>

                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="单次用量 :" prop="single_dose" >
                                <el-col :span="8">
                                    <el-input v-model="adviceForm.single_dose"></el-input>
                                </el-col>
                                 <el-col class="line" :span="2">&nbsp;</el-col>
                                <el-col :span="14">
                                    <!-- <el-input v-model="adviceForm.single_dose_unit" ></el-input> -->

                                    <el-select v-model="adviceForm.single_dose_unit"  filterable clearable allow-create  placeholder="选择" >
                                        <el-option v-for="item in unitsOption" :key="item.id" :label="item.name " :value="item.name">
                                        </el-option>
                                    </el-select>

                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="开药数量 :" prop="prescribing_number">
                                <el-col :span="8">
                                    <el-input v-model="adviceForm.prescribing_number"></el-input>
                                </el-col>
                                 <el-col class="line" :span="2">&nbsp;</el-col>
                                <el-col :span="14">
                                    <el-select v-model="adviceForm.prescribing_number_unit"  filterable clearable allow-create  placeholder="选择" >
                                        <el-option v-for="item in unitsOption" :key="item.id" :label="item.name " :value="item.name">
                                        </el-option>
                                    </el-select>

                                    <!-- <el-input v-model="adviceForm.prescribing_number_unit" ></el-input> -->
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="给药途径 :" prop="delivery_way">
                                <el-select v-model="adviceForm.delivery_way" :disabled="adviceForm.parent_id==0?false:true" filterable clearable allow-create  placeholder="请选择(输入可搜索)" style="width:90%" >
                                    <el-option
                                    v-for="item in deliveryWayOptions"
                                    :key="item.id"
                                    :label="item.name "
                                    :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="执行频率 :" prop="execution_frequency">
                                 <el-select v-model="adviceForm.execution_frequency" :disabled="adviceForm.parent_id==0?false:true" filterable clearable allow-create  placeholder="请选择(输入可搜索)" style="width:90%" >
                                    <el-option
                                    v-for="item in executionFrequencyOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="备注 :">
                        <el-input type="textarea" v-model="adviceForm.remark"></el-input>
                    </el-form-item>

                    <el-form-item label="开嘱医生 :" >
                        <span>{{adminusername}} </span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <template v-if="isEdit">
                        <el-button  @click="dialogFormVisible = false">取消</el-button>
                        <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitEditAdvice('adviceForm')">确 定</el-button>
                    </template>
                    <template v-else>
                        <el-button  @click="dialogFormVisible = false" v-if="adviceForm.parent_id>0">取 消</el-button>
                        <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitNewAdvice('adviceForm', 're')" v-if="adviceForm.parent_id==0">继 续</el-button>
                        <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitNewAdvice('adviceForm', 'on')">确 定</el-button>

                    </template>
                </div>
            </el-dialog>
            <el-dialog title="停止医嘱" :visible.sync="dialogStopFormVisible" width="600px">
                <el-form ref="stopForm" :model="stopForm" :rules="stopRules" label-width="90px">
                    <el-form-item label="停止时间 :" required prop="stop_time">
                        <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="选择时间" v-model="stopForm.stop_time" style="width:50%"  ></el-date-picker>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitStopAdvice('stopForm')">确 定</el-button>
                    <el-button type="primary" @click="dialogStopFormVisible = false">取消</el-button>
                </div>
            </el-dialog>

            <el-dialog title="执行医嘱" :visible.sync="execTimeDialogVisible" width="600px">
                <el-form ref="execForm" :model="execForm" :rules="execRules" label-width="90px">
                    <el-form-item label="执行时间 :" required prop="exec_time">
                        <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"  placeholder="选择时间" v-model="execForm.exec_time" style="width:50%"  ></el-date-picker>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitExecAdvice('execForm')">确 定</el-button>
                    <el-button type="primary" @click="execTimeDialogVisible = false">取消</el-button>
                </div>
            </el-dialog>
        </div>

        <div style="display:none">
            <div class="printForm" id="printCQadvice">
                <h2 class="hospital_title">{{orgname}}</h2>
                <h1 class="title">长期医嘱单  </h1>
                <div class="info">
                    <ul>
                        <li>
                            <span class="name" >姓名：</span>
                            <!-- <input type="text" class="InputBox" v-model="currentPatient.name"> -->
                            <span class="InputBox" >&nbsp;{{currentPatient.name}}</span>
                        </li>
                         <li>
                            <span class="name" >性别：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;{{tranSex(currentPatient.gender)}}</span>
                        </li>
                         <li>
                            <span class="name" >年龄：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;{{tranAge(currentPatient.birthday)}}岁</span>
                        </li>
                         <li>
                            <span class="name" >科别：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </li>
                         <li>
                            <span class="name" >透析号：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;&nbsp;&nbsp;{{currentPatient.dialysis_no}}&nbsp;&nbsp;</span>
                        </li>

                    </ul>
                </div>
                <table border="1" style="border:1px #999 solid;margin-top:20px;" bordercolorlight="#fff" bordercolordark="#fff" width="100%" cellpadding="0" cellspacing="0" class="printTable" >
                  <tbody>
                    <tr align="center">
                        <th style="width:20%;" colspan="2" align="center" >起始</th>
                        <th style="width:20%;" rowspan="2" align="">医嘱</th>
                        <th style="width:8%;"  rowspan="2" align="center" >医师签名</th>
                        <th style="width:6%;" rowspan="2" align="center" >执行护士签名</th>
                        <th style="width:42%;" colspan="4" align="center" >停止</th>
                    </tr>
                    <tr align="center">
                        <th  align="center">日期</th>
                        <th  align="center">时间</th>
                        <th style="width:10%;" align="center">日期</th>
                        <th style="width:10%;" align="center">时间</th>
                        <th style="width:10%;" align="center">医师签名</th>
                        <th style="width:6%;" align="center">执行护士签名</th>
                    </tr>
                    <tr align="center" v-for="(advice, index) in cqtableData" :key="advice.id">
                        <td>
                            <span v-if="isShowCQStartTime(index, advice)">{{advice.start_time | parseTime("{y}-{m}-{d}")}}</span>
                        </td>
                        <td>
                            <span v-if="isShowCQStartTime(index, advice)">{{advice.start_time | parseTime("{h}:{i}")}}</span>
                        </td>
                        <td style="text-align:left">
                                <span v-if="advice.parent_id>0">▲</span>
                                <span >{{advice.advice_name }}</span>
                                <span >{{advice.advice_desc}}</span>
                                <!-- <span v-if="advice.drug_spec">{{advice.drug_spec}}{{advice.drug_spec_unit}}</span> -->
                                <span v-if="advice.prescribing_number">*{{advice.prescribing_number}}{{advice.prescribing_number_unit}}</span>
                                <span v-if="advice.single_dose">单次用量 {{advice.single_dose}}{{advice.single_dose_unit}}</span>
                                <span >{{advice.delivery_way}}</span>
                                <span >{{advice.execution_frequency}}</span>
                        </td>
                        <td>
                            <div v-if="isShowCQStartTime(index, advice)">
                                <span v-if="setAdminUserES(advice.advice_doctor) == ''">{{getXuserName(advice.advice_doctor)}}</span>
                                <img class="es-img" :src="setAdminUserES(advice.advice_doctor)" alt="" srcset="" v-else>
                            </div>
                         </td>
                        <td>
                        </td>
                        <td>
                            <span v-if="advice.stop_state==1&&isShowCQStartTime(index, advice)">{{advice.stop_time | parseTime("{y}-{m}-{d}")}}</span>
                        </td>
                        <td>
                            <span v-if="advice.stop_state==1&&isShowCQStartTime(index, advice)">{{advice.stop_time | parseTime("{h}:{i}")}}</span>
                        </td>
                        <td>
                            <div v-if="isShowCQStartTime(index, advice)">
                                <span v-if="setAdminUserES(advice.stop_doctor) == ''">{{getXuserName(advice.stop_doctor)}}</span>
                                <img class="es-img" :src="setAdminUserES(advice.stop_doctor)" alt="" srcset="" v-else>
                            </div>
                        </td>
                        <td></td>
                    </tr>

                  </tbody>
                </table>
            </div>
        </div>
        <div style="display:none">
            <div class="printForm" id="printLSadvice">
                <h2 class="hospital_title">{{orgname}}</h2>
                <h1 class="title">临时医嘱单</h1>
                <div class="info">
                    <ul>
                        <li>
                            <span class="name" style="width:50px;" >姓名：</span>
                            <!-- <input type="text" class="InputBox" v-model="currentPatient.name"> -->
                            <span class="InputBox" >&nbsp;{{currentPatient.name}}</span>
                        </li>
                         <li>
                            <span class="name" style="width:50px;" >性别：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;{{tranSex(currentPatient.gender)}}</span>
                        </li>
                         <li>
                            <span class="name" style="width:50px;" >年龄：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;{{tranAge(currentPatient.birthday)}}岁</span>
                        </li>
                         <li>
                            <span class="name" style="width:30px;" >科：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </li>
                         <li>
                            <span class="name" style="width:30px;" >区：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </li>
                        <li>
                            <span class="name" style="width:30px;" >房：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </li>
                        <li>
                            <span class="name" style="width:30px;" >床：</span>
                            <!-- <input type="text" class="InputBox"> -->
                            <span class="InputBox" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </li>
                        <li>
                            <span class="name" style="width:70px;" >透析号：</span>
                            <span class="InputBox" >&nbsp;{{currentPatient.dialysis_no}}&nbsp;&nbsp;&nbsp;</span>

                            <!-- <input type="text" class="InputBox"> -->
                        </li>
                    </ul>
                </div>
                <table border="1" style="border:1px #999 solid;margin-top:20px;" bordercolorlight="#fff" bordercolordark="#fff" width="100%" cellpadding="0" cellspacing="0" class="printTable" >
                  <tbody>
                    <tr align="center">
                        <th style="width:10%;" align="center">日期</th>
                        <th style="width:10%;" align="center">时间</th>
                        <th style="width:10%;" align="center">医生签名</th>
                        <th style="width:40%;" align="" >医嘱内容</th>
                        <th style="width:10%;" align="center">执行时间</th>
                        <th style="width:10%;" align="center">护士签名</th>
                    </tr>
                    <tr align="center" v-for="advice in lstableData" :key="advice.id">
                        <td>
                            <span v-if="advice.parent_id==0">{{advice.start_time | parseTime("{y}-{m}-{d}")}}</span>
                        </td>
                        <td>
                            <span v-if="advice.parent_id==0">{{advice.start_time | parseTime("{h}:{i}")}}</span>
                        </td>
                        <td>
                            <div v-if="isShowCQStartTime(index, advice)">
                                <span v-if="setAdminUserES(advice.advice_doctor) == ''">{{getXuserName(advice.advice_doctor)}}</span>
                                <img class="es-img" :src="setAdminUserES(advice.advice_doctor)" alt="" srcset="" v-else>
                            </div>
                         </td>
                        <td style="text-align:left">
                            <span v-if="advice.parent_id>0">▲</span>
                                <span >{{advice.advice_name }}</span>
                                <span >{{advice.advice_desc}}</span>
                                <!-- <span v-if="advice.drug_spec">{{advice.drug_spec}}{{advice.drug_spec_unit}}</span> -->
                                <span v-if="advice.prescribing_number">*{{advice.prescribing_number}}{{advice.prescribing_number_unit}}</span>
                                <span v-if="advice.single_dose">单次用量 {{advice.single_dose}}{{advice.single_dose_unit}}</span>
                                <span >{{advice.delivery_way}}</span>
                                <span >{{advice.execution_frequency}}</span>
                        </td>
                        <td>
                            <span v-if="advice.execution_time!=0" >{{advice.execution_time| parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                        </td>
                        <td>

                            <div v-if="isShowCQStartTime(index, advice)">
                                <span v-if="setAdminUserES(advice.execution_staff) == ''">{{getXuserName(advice.execution_staff)}}</span>
                                <img class="es-img" :src="setAdminUserES(advice.execution_staff)" alt="" srcset="" v-else>
                            </div>
                        </td>


                    </tr>

                  </tbody>
                </table>
            </div>
        </div>

        <div style="display:none;">
            <div id="printCQadvice_fq" class="advice-order">
                <div class="ls-title">{{orgname}}</div>
                <div class="ls-type">长期医嘱单</div>
                <div class="ls-name">
                    <div>姓名：<span class="item-value">{{currentPatient.name}}</span></div>
                    <div>透析号：<span class="item-value">{{currentPatient.dialysis_no}}</span></div>
                </div>
                <table cellspacing="0" cellpadding="0" border="1" class="el-table__body" style="width: 100%;">
                    <tbody>
                        <tr style="text-align:center;">
                            <td colspan="3">
                                开始
                            </td>
                            <td colspan="2">
                                停止
                            </td>
                            <td rowspan="2">
                                备注
                            </td>
                        </tr>
                        <tr style="text-align:center;">
                            <td>时间</td>
                            <td style="max-width:50%">医嘱</td>
                            <td>医生</td>
                            <td>时间</td>
                            <td>医生</td>
                        </tr>
                        <tr v-for="(advice, index) in cqtableData" :key="advice.id">
                            <td>
                                <span v-if="isShowCQStartTime(index, advice)">{{advice.start_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
                                <span v-else></span>
                            </td>
                            <td>

                                <span >{{advice.advice_name }}</span>
                                <span >{{advice.advice_desc}}</span>
                                <span v-if="advice.single_dose">{{advice.single_dose}}{{advice.single_dose_unit}}</span>
                                <span v-if="advice.prescribing_number">*{{advice.prescribing_number}}{{advice.prescribing_number_unit}}</span>
                                <span >{{advice.delivery_way}}</span>
                                <span >{{advice.execution_frequency}}</span>
                            </td>
                            <td><span v-if="advice.parent_id==0" >{{getXuserName(advice.advice_doctor)}}</span>
                            </td>
                            <td>
                                <span v-if="advice.stop_state==1&&advice.parent_id==0">{{advice.stop_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
                                <span v-else></span>
                            </td>
                            <td>
                                <span v-if="advice.stop_state==1&&advice.parent_id==0">{{getXuserName(advice.stop_doctor)}}</span>
                                <span v-else></span>
                            </td>
                            <td>
                                {{advice.remark}}
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
        <div style="display:none;">
            <div id="printLSadvice_fq" class="advice-order">
                <div class="ls-title">{{orgname}}</div>
                <div class="ls-type">临时医嘱单</div>
                <div class="ls-name">
                    <div>姓名：<span class="item-value">{{currentPatient.name}}</span></div>
                    <div>透析号：<span class="item-value">{{currentPatient.dialysis_no}}</span></div>
                </div>
                <table cellspacing="0" cellpadding="0" border="1" class="el-table__body" style="width: 100%;">
                    <thead>
                        <th>时间</th>
                        <th>医嘱</th>
                        <th>医生</th>
                        <th>执行护士</th>
                        <th>执行时间</th>
                    </thead>
                    <tbody>
                        <tr v-for="(advice, index) in lstableData" :key="advice.id">
                            <td>
                                <span v-if="isShowLSStartTime(index, advice)">{{advice.start_time | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
                                <span v-else></span>
                            </td>
                            <td>

                                <span >{{advice.advice_name }}</span>
                                <span >{{advice.advice_desc}}</span>
                                <span v-if="advice.single_dose">{{advice.single_dose}}{{advice.single_dose_unit}}</span>
                                <span v-if="advice.drug_spec">{{advice.drug_spec}}{{advice.drug_spec_unit}}</span>
                                <span v-if="advice.prescribing_number">*{{advice.prescribing_number}}{{advice.prescribing_number_unit}}</span>
                                <span >{{advice.delivery_way}}</span>
                                <span >{{advice.execution_frequency}}</span>
                            </td>
                            <td><span v-if="advice.parent_id==0" >{{getXuserName(advice.advice_doctor)}}</span>
                            </td>
                            <td><span v-if="advice.parent_id==0" >{{getXuserName(advice.execution_staff)}}</span>
                            </td>
                            <td><span v-if="advice.execution_time!=0" >{{advice.execution_time| parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>
<script>

import PatientSidebar from './components/PatientSidebar';
import EditGroupAdvice from './components/EditGroupAdvice';
import { fetchAllDoctorAndNurse,fetchAllAdminUsers } from "@/api/doctor";
import { getAdviceConfig,CreateDoctorAdvice,getDoctorAdviceList,EditDoctorAdvice,StopDoctorAdvice, StopGroupAdvice, ExecGroupAdvice, CheckGroupAdvice, DeleteDoctorAdvice, CreateGroupAdvice, DeleteGroupAdvice} from "@/api/advice";
import {uParseTime,jsGetAge} from "@/utils/tools";
import print from "print-js";
import {getDataConfig} from '@/utils/data';

let rowIndex = 1;
let rowKey = 0;

export default {
    name:'doctorAdvice',

    data(){
        return {
          rowKey:0,
          nameFormTitle:'',
            adminusername:'',
            aminuserid:0,
            orgname:'',
            tempArr:[],
            currentPatient:{},
            currentIndex:-1,
            dialogTitle:"新增",
            dialogFormVisible:false,
            groupEditFormVisible:false,
            nameFormVisible:false,
            templateFormVisible:false,
            oldTemplateFormVisible:false,
            dialogStopFormVisible: false,
            execTimeDialogVisible:false,
            groupFormVisible:false,
            isEdit:false,
            isChild:false,
            searchKey:"",
            pickerOptions: {
                shortcuts: [
                {
                    text: "今天",
                    onClick(picker) {
                    picker.$emit("pick", new Date());
                    }
                },
                {
                    text: "昨天",
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit("pick", date);
                    }
                },
                {
                    text: "一周前",
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", date);
                    }
                },
                {
                    text:"清空",
                    onClick(picker) {
                    picker.$emit("pick");
                    }
                }
                ]
            },
            adviceType: 0,
            adviceTypeArr: [
                { value: 0, label: "全部" },
                { value: 1, label: "长期" },
                { value: 3, label: "临时" },
            ],
            adviceTypeOptions: [
                { value: 1, label: "长期" },
                { value: 3, label: "临时" },
            ],
            stopType: 0,
            stopTypeArr: [
                { value: 0, label: "全部" },
                { value: 2, label: "未停止" },
                { value: 1, label: "已停止" },
            ],
            adviceTableData:[],
            doctorOptions:[],
            adminUserOptions:null,
            adviceTemplates:[],
            adviceTemplateMaps:{},
            drugOptions:[],
            deliveryWayOptions:[],
            executionFrequencyOptions:[],
            unitsOption:[],
            templateForm:{id:''},
            adviceForm:{
                advice_type:"",
                advice_date:"",
                start_time:"",
                advice_name:"",
                advice_desc:"",
                single_dose:"",
                single_dose_unit:"",
                prescribing_number:"",
                prescribing_number_unit:"",
                delivery_way:"",
                execution_frequency:"",
                advice_doctor:"",
                remark:"",
                parent_id:0,
            },
            nameForm:{
                advice_name:"",
                single_dose:"",
                single_dose_unit:"",
                drug_spec:"",
                drug_spec_unit:"",
                prescribing_number:"",
                prescribing_number_unit:"",
                delivery_way:"",
                execution_frequency:"",
                isEdit:0,
                index:0,
                id:0,
                children:[],
            },
            groupForm:{
                advice_type:"",
                advice_date:"",
                start_time:"",
                adviceNames:[],
                advice_doctor:"",
                remark:"",
                parent_id:0,
            },
            stopForm:{
                id:0,
                stop_time:"",
                stop_reason:"",
            },
            execForm:{
                exec_time:"",
                groupno:"",
            },
            templateRules:{
              id:[{required: true, message:"请选择医嘱模板", },],
            },
            adviceRules:{
                advice_type:[{required: true, message:"请选择医嘱类型", },],
                advice_date:[{required: true, message:"请选择开嘱时间", },],
                start_time:[{required: true, message:"请选择开始时间", },],
                advice_name:[{required: true, message:"请填写医嘱内容", },],
                advice_doctor:[{required: true, message:"请选择开嘱医生",},],
            },
            nameRules:{
                advice_name:[{required: true, message:"请填写医嘱内容", },],
            },
            groupRules:{
                advice_type:[{required: true, message:"请选择医嘱类型", },],
                advice_date:[{required: true, message:"请选择开嘱时间", },],
                start_time:[{required: true, message:"请选择开始时间", },],
                advice_name:[{required: true, message:"请填写医嘱内容", },],
                advice_doctor:[{required: true, message:"请选择开嘱医生",},],
            },
            stopRules:{
                stop_time:[{required: true, message:"请选择停止时间", },],
            },
            execRules:{
                exec_time:[{required: true, message:"请选择时间", },],
            },
            listQuery:{
                start_time:"",
                end_time:"",
                advice_type:0,
                stop_state:"",
                keywords:"",
                id:0
            },
            lstableData:[],
            cqtableData:[],
            groupSelectRow:null,
            expandRowKeys:[],
            operators:[],
            operatorMaps: {},
            selectedTemp:{'id':0,name:'',org_id:0,'list':[], 'rows':[]},
            selectedTemplate:[],
            allSelectedTemplate:[],

        }
    },
    methods:{
        clickuseradvicecell(row, column, cell, event){
        },
        onTranPatient:function (tranPatient) {
            this.currentPatient = tranPatient;
        },
        submitEditAdvice(formName){
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    EditDoctorAdvice(this.patientID, this.adviceForm.id, this.adviceForm).then(response=>{
                        if (response.data.state==0) {
                            this.$message.error(response.data.msg);
                            return false;
                        }else {
                            this.$notify({
                                title: "成功",
                                message: "修改医嘱成功",
                                type: "success",
                                duration: 2000
                            });
                            this.dialogFormVisible = false;
                            this.resetForm(formName);
                            var advice = response.data.data.advice;
                          this.adviceTableData[this.currentIndex].drug_spec = advice.drug_spec;
                          this.adviceTableData[this.currentIndex].drug_spec_unit = advice.drug_spec_unit;
                          this.adviceTableData[this.currentIndex].start_time = advice.start_time;
                            this.adviceTableData[this.currentIndex].advice_name = advice.advice_name;
                            this.adviceTableData[this.currentIndex].advice_desc = advice.advice_desc;
                            this.adviceTableData[this.currentIndex].single_dose = advice.single_dose;
                            this.adviceTableData[this.currentIndex].single_dose_unit = advice.single_dose_unit;
                            this.adviceTableData[this.currentIndex].delivery_way = advice.delivery_way;
                            this.adviceTableData[this.currentIndex].execution_frequency = advice.execution_frequency;
                            this.adviceTableData[this.currentIndex].prescribing_number = advice.prescribing_number;
                            this.adviceTableData[this.currentIndex].prescribing_number_unit = advice.prescribing_number_unit;
                            this.adviceTableData[this.currentIndex].advice_doctor = advice.advice_doctor;
                            this.adviceTableData[this.currentIndex].remark = advice.remark;
                            this.currentIndex = -1;
                            return false;
                        }
                    });
                }
            });
        },
        submitgroupAdvice(formName){
          this.$refs[formName].validate((valid) => {
                if(valid) {
                    var submitForm = {
                        advice_type: this.groupForm.advice_type,
                        advice_date: this.groupForm.advice_date,
                        start_time:this.groupForm.start_time,
                        adviceNames:[],
                        advice_doctor:this.groupForm.advice_doctor,
                        remark:this.groupForm.remark,
                        parent_id:this.groupForm.parent_id,
                    };

                    var adviceNames = [];
                    for (const index in this.groupForm.adviceNames) {
                        adviceNames.unshift(this.groupForm.adviceNames[index]);
                    }
                    submitForm.adviceNames = adviceNames;
                    CreateGroupAdvice(this.patientID, 0, submitForm).then(response=>{
                        if (response.data.state==0) {
                            this.$message.error(response.data.msg);
                            return false;
                        }else {
                            this.$notify({
                                title: "成功",
                                message: "新增成功",
                                type: "success",
                                duration: 2000
                            });

                            if (this.adviceType == this.groupForm.advice_type || this.adviceType==0) {
                                var childMap = {};
                                for (const index in response.data.data.advices) {
                                    if(response.data.data.advices[index].parent_id==0) {
                                        continue;
                                    }
                                    if(false === (response.data.data.advices[index].parent_id in childMap)) {
                                        childMap[response.data.data.advices[index].parent_id] = [];
                                    }
                                    childMap[response.data.data.advices[index].parent_id].unshift(response.data.data.advices[index]);
                                }
                                var parentArr = [];
                                for (const index in response.data.data.advices) {
                                    if(response.data.data.advices[index].parent_id>0) {
                                        continue;
                                    }
                                    parentArr.push(response.data.data.advices[index]);
                                }

                                for (const index in parentArr) {
                                    if(parentArr[index].id in childMap) {
                                        for (const j in childMap[parentArr[index].id]) {
                                            this.adviceTableData.unshift(childMap[parentArr[index].id][j]);
                                        }
                                    }
                                    this.adviceTableData.unshift(parentArr[index]);
                                }
                            }

                            this.resetForm(formName);
                            this.groupFormVisible = false;
                            return false;
                        }
                    });
                }
            });
        },
        submitNewAdvice(formName, action){
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    CreateDoctorAdvice(this.patientID, this.adviceForm).then(response=>{
                        if (response.data.state==0) {
                            this.$message.error(response.data.msg);
                            return false;
                        }else {
                            this.$notify({
                                title: "成功",
                                message: "新增医嘱成功",
                                type: "success",
                                duration: 2000
                            });
                            if (action != 're') {
                                this.dialogFormVisible = false;
                            }
                            if (this.adviceType == this.adviceForm.advice_type || this.adviceType==0) {
                                if (this.adviceForm.parent_id > 0) {
                                    var spliceIndex = -1;
                                    for (let index = this.adviceTableData.length-1; ; index--) {
                                        if(this.adviceTableData[index].parent_id ===  this.adviceForm.parent_id) {
                                            spliceIndex = index;
                                            break;
                                        }else if (this.adviceTableData[index].id === this.adviceForm.parent_id) {
                                            spliceIndex = index;
                                            break;
                                        }
                                    }

                                    if (spliceIndex > -1) {
                                        spliceIndex += 1;
                                        if (spliceIndex === this.adviceTableData.length) {
                                            this.adviceTableData.push(response.data.data.advice);
                                        }else {
                                            var swapData = this.adviceTableData.splice(spliceIndex);
                                            this.adviceTableData.push(response.data.data.advice);
                                            this.adviceTableData = this.adviceTableData.concat(swapData);
                                        }
                                    }

                                }else {
                                    this.adviceTableData.unshift(response.data.data.advice);
                                }
                            }
                            this.resetForm(formName);
                            this.currentIndex = -1;
                            return false;
                        }
                    });
                }
            });
        },
        submitStopAdvice(formName){
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    // StopDoctorAdvice(this.stopForm.id, this.stopForm).then(response=>{
                    StopGroupAdvice(this.stopForm.groupno, this.stopForm).then(response=>{
                        if(response.data.state==0) {
                            this.$message.error(response.data.msg);
                            return false;
                        }else {
                            this.$notify({
                                title: "成功",
                                message: "医嘱已经停止",
                                type: "success",
                                duration: 2000
                            });
                            // this.stopResetData(this.stopForm.id);
                            var atlen = this.adviceTableData.length;
                            for (let index = atlen-1; index >=0; index--) {
                                if (this.adviceTableData[index].groupno == this.stopForm.groupno) {
                                    this.adviceTableData.splice(index, 1)
                                }
                            }
                            this.dialogStopFormVisible = false;
                        }
                    });
                }
            });
        },

        submitExecAdvice(formName){
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    ExecGroupAdvice(this.execForm.groupno, this.execForm.exec_time).then(response=>{
                        if(response.data.state==0) {
                            this.$message.error(response.data.msg);
                            return false;
                        }else {
                            this.$notify({
                                title: "成功",
                                message: "医嘱已经执行",
                                type: "success",
                                duration: 2000
                            });
                            var atlen = this.adviceTableData.length;
                            for (const index in this.adviceTableData) {
                                if (this.adviceTableData[index].groupno == this.execForm.groupno) {
                                    this.adviceTableData[index].execution_time = response.data.data.advice.execution_time;
                                    this.adviceTableData[index].execution_staff = response.data.data.advice.execution_staff;
                                    this.adviceTableData[index].execution_state = 1;
                                }
                            }
                            this.execTimeDialogVisible = false;
                        }
                    });
                }
            });
        },
        openAdviceTemplate(){
            this.templateForm={id:''};
            this.selectedTemp = {'id':0,name:'',org_id:0,'list':[],'rows':[]};
            this.selectedTemplate = [];
            if (typeof(this.$refs.templatetable) != 'undefined') {
            this.$refs.templatetable.setCurrentRow(null);
            }
            this.templateFormVisible = true;
        },
        openGroupChild(){
          if(this.groupSelectRow === null) {
            this.$notify.error({
              title: "错误",
              message: "未选择医嘱内容,无法添加子药"
            });
            return;
          }else if(this.groupSelectRow.parent_row>0) {
            this.$notify.error({
              title: "错误",
              message: "子药不能添加子药"
            });
            return;
          }
          this.nameForm = {
                advice_name:"",
                single_dose:"",
                single_dose_unit:"",
                drug_spec:"",
                drug_spec_unit:"",
                prescribing_number:"",
                prescribing_number_unit:"",
                delivery_way:this.groupSelectRow.delivery_way,
                execution_frequency:this.groupSelectRow.execution_frequency,
                isEdit:0,
                index:0,
                children:[],
                parent_row:this.groupSelectRow.row_key,
                id:0,
            };
            this.isChild = true;
            this.nameFormVisible = true;
            this.nameFormTitle = '添加子药内容';
        },
        openGroupAdvice(isEdit){
            this.isChild = false;
          if(isEdit) {
            if(this.groupSelectRow === null) {
              this.$notify.error({
                title: "错误",
                message: "未选择要修改的医嘱内容"
              });
              return;
            }
            if(this.groupSelectRow.parent_row) {
              this.isChild = true;
            }

            this.nameForm = {
              advice_name:this.groupSelectRow.advice_name,
              advice_desc:this.groupSelectRow.advice_desc,
              single_dose:this.groupSelectRow.single_dose,
              single_dose_unit:this.groupSelectRow.single_dose_unit,
              drug_spec:this.groupSelectRow.drug_spec,
              drug_spec_unit:this.groupSelectRow.drug_spec_unit,
              prescribing_number:this.groupSelectRow.prescribing_number,
              prescribing_number_unit:this.groupSelectRow.prescribing_number_unit,
              delivery_way:this.isChild?'':this.groupSelectRow.delivery_way,
              execution_frequency:this.isChild?'':this.groupSelectRow.execution_frequency,
              isEdit:1,
              index:this.groupSelectRow.index,
              id:this.groupSelectRow.id,
              children:[],
              parent_row:this.groupSelectRow.parent_row,
                // row_key:this.groupSelectRow.row_key,
            };
          this.nameFormTitle = '修改医嘱内容';
          }else {
            this.nameForm = {
                advice_name:"",
                advice_desc:"",
                single_dose:"",
                single_dose_unit:"",
                drug_spec:"",
                drug_spec_unit:"",
                prescribing_number:"",
                prescribing_number_unit:"",
                delivery_way:"",
                execution_frequency:"",
                isEdit:0,
                index:0,
                id:0,
                children:[],
                parent_row:0,
            };
            this.nameFormTitle = '添加医嘱内容';
          }
          this.nameFormVisible = true;

        },
        openDeleteGroupAdvice() {
            if(this.groupSelectRow === null) {
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

            var isChild = this.groupSelectRow.parent_row?true:false;
            var title = isChild?'删除子药内容':'删除医嘱内容';
            var msg = isChild?'确认删除此子药内容？':content;
            this.$confirm(msg, title, {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                if(isChild) {
                  for (const index in this.groupForm.adviceNames) {
                    if(this.groupForm.adviceNames[index].row_key == this.groupSelectRow.parent_row) {
                      for (const j in this.groupForm.adviceNames[index].children) {
                        if(this.groupForm.adviceNames[index].children[j].row_key == this.groupSelectRow.row_key) {
                            this.groupForm.adviceNames[index].children.splice(j,1);
                            this.$set(this.groupForm.adviceNames,index, this.groupForm.adviceNames[index]);
                            this.toggleRowExpansion();
                            break;
                        }
                      }
                    }
                  }
                }else {
                  for (const index in this.groupForm.adviceNames) {
                    if(this.groupForm.adviceNames[index].row_key == this.groupSelectRow.row_key) {
                        this.groupForm.adviceNames.splice(index,1);
                        this.toggleRowExpansion();
                        break;
                    }
                  }
                }

              }).catch(() => { });
        },
        DeleteGroupAdvice(groupno) {
            this.$confirm('确认删除这组医嘱?', '医嘱删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    DeleteGroupAdvice(groupno).then(response=>{
                        if(response.data.state==0) {
                            this.$message.error(response.data.msg);
                            return false;
                        }else {
                            this.$notify({
                                title: "成功",
                                message: "医嘱已经删除",
                                type: "success",
                                duration: 2000
                            });

                            var resetTableData = this.adviceTableData;
                            this.adviceTableData = [];
                            var that = this;
                            for (const key in resetTableData) {
                              if (resetTableData[key].groupno != groupno) {
                                    that.adviceTableData.push(resetTableData[key]);
                                }
                            }
                        }
                    });
                }).catch(() => { });
        },
        openDelete(index, row) {
            this.$confirm('确认删除此条医嘱?', '医嘱删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    DeleteDoctorAdvice(row.id).then(response=>{
                        if(response.data.state==0) {
                            this.$message.error(response.data.msg);
                            return false;
                        }else {
                            this.$notify({
                                title: "成功",
                                message: "医嘱已经删除",
                                type: "success",
                                duration: 2000
                            });
                            this.deleteResetData(index,row);
                        }
                    });
                }).catch(() => { });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        changeTime(){
            this.getList();
        },
        changeKey() {
            this.getList();
        },

        openExec(index, row){
            if (row.stop_state == 1 || row.execution_state == 1) {
                this.$message.error("所选医嘱已停止或执行");
                return false;
            }

            this.execForm = {
                exec_time:"",
                groupno:row.groupno,
            };
            this.execTimeDialogVisible = true;
            this.currentIndex = index;
        },
        openCheck(index, row){
            if (row.check_state == 1) {
                this.$message.error("所选医嘱已核对");
                return false;
            }
            if (row.execution_state != 1) {
                this.$message.error("所选医嘱未执行，无法核对");
                return false;
            }
            if (row.execution_staff > 0 && row.execution_staff == this.$store.getters.xt_user.user.id) {
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
                    CheckGroupAdvice(row.groupno).then(response => {
                        if (response.data.state == 0) {
                            this.$message.error(response.data.msg);
                            return false;
                        } else {
                            this.$notify({
                                title: "成功",
                                message: "核对成功",
                                type: "success",
                                duration: 2000
                            });

                            var atlen = this.adviceTableData.length;
                            for (const index in this.adviceTableData) {
                                if (this.adviceTableData[index].groupno == row.groupno) {
                                    this.adviceTableData[index].checker = response.data.data.advice.checker;
                                    this.adviceTableData[index].check_time = response.data.data.advice.check_time;
                                    this.adviceTableData[index].check_state = 1;
                                }
                            }
                        }
                    });
                }).catch(() => {
            });
        },
        openStop(index, row){
            if (row.stop_state == 1 || row.execution_state == 1) {
                this.$message.error("所选医嘱已停止！");
                return false;
            }

            this.stopForm = {
                id:row.parent_id>0 ? row.parent_id : row.id,
                stop_time:"",
                stop_reason:"",
                groupno:row.groupno,
            };
            this.currentIndex = index;
            this.dialogStopFormVisible = true;
        },
        openNew(){
            var theDate = new Date();
            var year = theDate.getFullYear();
            var month = theDate.getMonth() + 1;
            var dat = theDate.getDate();
            month = month<10? "0"+month:month;
            dat = dat<10? "0"+dat:dat;
            var adviceDate = year + "-" + month + "-" + dat;
            // this.groupForm.advice_date = adviceDate;
            this.groupForm={
                advice_type:"",
                advice_date:adviceDate,
                start_time:"",
                adviceNames:[],
                advice_doctor:"",
                remark:"",
                parent_id:0,
            };
            this.rowKey=0;
            this.groupFormVisible = true;
        },
        openEditGroupAdvice(groupno){
          var groups = [];
          this.rowKey=0;
          for (const index in this.adviceTableData) {
            if (groupno == this.adviceTableData[index].groupno) {
              groups.push(this.adviceTableData[index]);
            }
          }
          if(groups.length==0) {
            return false;
          }
          this.groupForm={
              advice_type:groups[0].advice_type,
              advice_date:uParseTime(groups[0].advice_date, '{y}-{m}-{d}'),
              start_time:uParseTime(groups[0].start_time, '{y}-{m}-{d} {h}:{i}:{s}'),
              adviceNames:[],
              advice_doctor:"",
              remark:groups[0].remark,
              groupno:groupno,
          };

          var childMap = {};
          for (const index in groups) {
            if(groups[index].parent_id==0) {
              continue;
            }
            if(false === (groups[index].parent_id in childMap)) {
                childMap[groups[index].parent_id] = [];
            }
            childMap[groups[index].parent_id].push(groups[index]);
          }

          for (const index in groups) {
            if(groups[index].parent_id>0) {
              continue;
            }
            this.rowKey++;
            var item = {
              advice_name:groups[index].advice_name,
              advice_desc:groups[index].advice_desc,
              single_dose:'' + groups[index].single_dose,
              single_dose_unit:groups[index].single_dose_unit,
              drug_spec:'' + groups[index].drug_spec,
              drug_spec_unit:groups[index].drug_spec_unit,
              prescribing_number:'' + groups[index].prescribing_number,
              prescribing_number_unit:groups[index].prescribing_number_unit,
              delivery_way:groups[index].delivery_way,
              execution_frequency:groups[index].execution_frequency,
              isEdit:0,
              index:0,
              id:groups[index].id,
              children:[],
              parent_row:0,
              row_key:this.rowKey,
            };
            if(item.id in childMap) {
              for (const key in childMap[item.id]) {
                this.rowKey++;
                var child = {
                  advice_name:childMap[item.id][key].advice_name,
                  advice_desc:childMap[item.id][key].advice_desc,
                  single_dose:'' + childMap[item.id][key].single_dose,
                  single_dose_unit:childMap[item.id][key].single_dose_unit,
                  drug_spec:'' + childMap[item.id][key].drug_spec,
                  drug_spec_unit:childMap[item.id][key].drug_spec_unit,
                  prescribing_number:'' + childMap[item.id][key].prescribing_number,
                  prescribing_number_unit:childMap[item.id][key].prescribing_number_unit,
                  delivery_way:childMap[item.id][key].delivery_way,
                  execution_frequency:childMap[item.id][key].execution_frequency,
                  isEdit:0,
                  index:0,
                  id:childMap[item.id][key].id,
                  children:[],
                  parent_row:item.row_key,
                  row_key:this.rowKey,
                };
                item.children.push(child);
              }
              this.$set(item, 'children', item.children);
            }
            this.groupForm.adviceNames.push(item);
          }

          this.$refs.editGroupForm.open();
        },

        openEdit(index,row){
            this.currentIndex = index;
            this.dialogTitle = "修改医嘱",
            this.isEdit = true;

            if (row.stop_state == 1 || row.execution_state == 1) {
                this.$message.error("所选医嘱已停止,不能修改！");
                return false;
            }
            // if (row.advice_doctor != this.aminuserid) {
            //     this.$message.error("不能修改非本人添加的医嘱！");
            //     return false;
            // }


          this.setAdviceForm(row);
            this.dialogFormVisible = true;
        },
        openNewChild(index, row){
            this.currentIndex = index;
            this.dialogTitle = "新增子药"
            this.isEdit = false;
            if (row.stop_state == 1 || row.execution_state == 1) {
                this.$message.error("所选医嘱已停止");
                return false;
            }
            this.adviceForm = {
                advice_type:row.advice_type,
                advice_date:uParseTime(row.advice_date, '{y}-{m}-{d}'),
                start_time:uParseTime(row.start_time, '{y}-{m}-{d} {h}:{i}:{s}'),
                advice_name:"",
                advice_desc:"",
                single_dose:"",
                single_dose_unit:"",
                drug_spec:"",
                drug_spec_unit:"",
                prescribing_number:"",
                prescribing_number_unit:"",
                delivery_way:row.delivery_way,
                execution_frequency: row.execution_frequency,
                advice_doctor:row.advice_doctor,
                remark:"",
                parent_id:row.parent_id>0?row.parent_id:row.id,
            };
            this.dialogFormVisible = true;

        },
        changeAdviceName(key){
            if (key in this.adviceTemplateMaps) {
                this.adviceForm.advice_name = this.adviceTemplateMaps[key].advice_name;
                this.adviceForm.advice_desc = this.adviceTemplateMaps[key].advice_desc;
                this.adviceForm.single_dose_unit = this.adviceTemplateMaps[key].single_dose_unit;
                this.adviceForm.single_dose = this.adviceTemplateMaps[key].single_dose + "";
                this.adviceForm.prescribing_number_unit = this.adviceTemplateMaps[key].prescribing_number_unit;
                this.adviceForm.prescribing_number = this.adviceTemplateMaps[key].prescribing_number + "";
                this.adviceForm.delivery_way = this.adviceTemplateMaps[key].delivery_way;
                this.adviceForm.execution_frequency = this.adviceTemplateMaps[key].execution_frequency;
            }
        },
        indexMethod(index){
            if (index===0) {
                rowIndex = 1;
            }
            var row = this.adviceTableData[index];
            if (row.parent_id > 0) {
              return "";
            }else if(index>0 && row.groupno>0 && row.groupno == this.adviceTableData[index-1].groupno) {
              return '';
            }
            return rowIndex ++;
        },
        isShowStartTime(index, row) {
            if (row.parent_id > 0) {
              return false;
            }else if(index>0 && row.groupno>0 && row.groupno == this.adviceTableData[index-1].groupno) {
              return false;
            }
            return true;
        },
        isShowCQStartTime(index, row) {
            if (row.parent_id > 0) {
              return false;
            }else if(index>0 && row.groupno>0 && row.groupno == this.cqtableData[index-1].groupno) {
              return false;
            }
            return true;
        },
        isShowLSStartTime(index, row) {
            if (row.parent_id > 0) {
              return false;
            }else if(index>0 && row.groupno>0 && row.groupno == this.lstableData[index-1].groupno) {
              return false;
            }
            return true;
        },
        selectAdviceType(type){
            this.adviceType = type;
            this.listQuery.advice_type = type;
            this.getList();
        },
        selectStopType(type){
            this.stopType = type;
            this.listQuery.stop_state = type;
            this.getList();
        },
        deleteResetData(index, row) {
            if (row.parent_id>0) {
                this.adviceTableData.splice(index,1);
            }else {
                var resetTableData = this.adviceTableData;
                this.adviceTableData = [];
                var that = this;
                resetTableData.forEach(function(item, itemindex){
                    if (item.id != row.id && item.parent_id != row.id) {
                        that.adviceTableData.push(item);
                    }
                });
            }
        },
        stopResetData(id) {
            var resetTableData = this.adviceTableData;
            this.adviceTableData = [];
            var that = this;
            resetTableData.forEach(function(item, index){
                if (item.id != id && item.parent_id != id) {
                    that.adviceTableData.push(item);
                }
            });
        },
        fetchAllDoctorAndNurse() {
            fetchAllDoctorAndNurse().then(response => {
                if (response.data.state == 1) {
                this.doctorOptions = response.data.data.doctors;
                }
            });
        },
        fetchAllAdminUsers() {
            fetchAllAdminUsers().then(response => {
                if (response.data.state == 1) {
                    this.adminUserOptions = response.data.data.users;
                    var alen = this.adminUserOptions.length;
                    for (let index = 0; index < alen; index++) {
                        if (this.adminUserOptions[index].user_type==2) {
                            this.doctorOptions.push(this.adminUserOptions[index]);
                        }
                    }
                }
            });
        },

        getAdviceConfig() {
            getAdviceConfig().then(response => {
                if (response.data.state == 1) {

                    this.deliveryWayOptions = response.data.data.drugways === null ? [] : response.data.data.drugways;
                    this.executionFrequencyOptions = response.data.data.efs === null ? [] : response.data.data.efs;
                    this.adviceTemplates = response.data.data.advice_templates === null ? [] : response.data.data.advice_templates;

                    var templateLen = this.adviceTemplates.length;
                    for (let index = 0; index < templateLen; index++) {
                        if(!this.adviceTemplates[index].DoctorAdviceTemplate) {
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
                          if(DoctorAdviceTemplate[key].parent_id == 0) {
                            datMap[DoctorAdviceTemplate[key].id] = DoctorAdviceTemplate[key];
                          }
                        }

                        for (const key in DoctorAdviceTemplate) {
                          if(DoctorAdviceTemplate[key].parent_id in datMap) {
                            if('children' in datMap[DoctorAdviceTemplate[key].parent_id]){
                              datMap[DoctorAdviceTemplate[key].parent_id].children.push(DoctorAdviceTemplate[key]);
                            }else {
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
        },
        getDoctorName(doctorid){
            if (doctorid<=0) {
                return "";
            }
            var name = "";
            if (this.doctorOptions==null || typeof(this.doctorOptions.length) == "undefined") {
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
        },
        getXuserName(id){
            if (id<=0) {
                return "";
            }
            var name = "";
            if (this.adminUserOptions==null || typeof(this.adminUserOptions.length) == "undefined") {
                return name;
            }
            var leng = this.adminUserOptions.length;
            if (leng==0) {
                return name;
            }
            for (let index = 0; index < leng; index++) {
                if (this.adminUserOptions[index].id == id) {
                    name = this.adminUserOptions[index].name;
                    break;
                }
            }
            return name;
        },
        setAdviceForm(row) {
            this.adviceForm={
                advice_type:row.advice_type,
                advice_date: uParseTime(row.advice_date, '{y}-{m}-{d}'),
                start_time: uParseTime(row.start_time, '{y}-{m}-{d} {h}:{i}:{s}'),
                advice_name: row.advice_name,
                advice_desc: row.advice_desc,
                drug_spec: row.drug_spec!=0?row.drug_spec:"",
                drug_spec_unit: row.drug_spec_unit,
                single_dose: row.single_dose!=0?row.single_dose:"",
                single_dose_unit: row.single_dose_unit,
                prescribing_number: row.prescribing_number!=0?row.prescribing_number:"",
                prescribing_number_unit:row.prescribing_number_unit,
                delivery_way: row.delivery_way,
                execution_frequency: row.execution_frequency,
                advice_doctor: row.advice_doctor,
                remark: row.remark,
                id:row.id,
                parent_id:row.parent_id,
            };
        },
        getList(){
            getDoctorAdviceList(this.listQuery).then(response=>{
                if (response.data.state == 1) {
                    this.adviceTableData = response.data.data.advices;
                    this.operators = response.data.data.operators;
                    if (this.operators.length > 0) {
                        var operatorsLen = this.operators.length;
                        for (var index = 0; index < operatorsLen; index++) {
                            this.$set(this.operatorMaps, this.operators[index].creator, this.operators[index]);
                        }
                    }

                }else {
                    this.adviceTableData = [];
                }

                this.handleSpanTempArr()
            });
        },
        changeAdvice(selection) {
            if (this.adviceType == 3) {
                this.lstableData = selection;
            }else if(this.adviceType == 1) {
                this.cqtableData = selection;
            }

        },
        groupClassName({row, rowIndex}){
          row.index = rowIndex;
          // row.row_key = rowIndex+1;
        },
        getRowKey(row){
          return row.row_key;
        },
        getMaxRowKey(){
          return this.rowKey;
        },
        selectGroupAdvice(row){
          this.groupSelectRow = row;
        },
        selectAdvice(selection, row) {
            if (this.adviceType!=3) {
                this.lstableData = [];
            }else if(this.adviceType != 1) {
                this.cqtableData = [];
            }
            this.$refs.multipleTable.toggleRowSelection(row);
            var dlen = this.adviceTableData.length;
            if (row.parent_id>0) {
                for (let index = 0; index < dlen; index++) {
                    if (this.adviceTableData[index].id == row.parent_id || this.adviceTableData[index].parent_id == row.parent_id) {
                        this.$refs.multipleTable.toggleRowSelection(this.adviceTableData[index]);
                    }
                }
            }else {
                for (let index = 0; index < dlen; index++) {
                    if (this.adviceTableData[index].parent_id == row.id  ||  this.adviceTableData[index].id == row.id  ||  this.adviceTableData[index].groupno == row.groupno) {
                        this.$refs.multipleTable.toggleRowSelection(this.adviceTableData[index]);
                    }
                }
            }

        },
        printThisInfo() {
            if(this.adviceType==1) {
                if (this.cqtableData.length==0) {
                    this.$message.error("请勾选需要打印的医嘱!");
                    return false
                }
                const style = '@media print {.printForm{width:960px}  .printForm .hospital_title{font-size:20px;font-weight:400;text-align:center;letter-spacing:5px}.printForm .title{font-size:30px;font-weight:500;text-align:center}.printForm .title{font-size:30px;font-weight:500;text-align:center}.printForm .info ul{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;align-items:center;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;-webkit-justify-content:space-around;-moz-justify-content:space-around;-ms-justify-content:space-around;-o-justify-content:space-around;justify-content:space-around}.printForm .info ul li{display:flex;box-sizing:border-box;justify-content:space-around}.printForm .info ul li .InputBox{padding:0;border:0;border-bottom:1px #e5e5e5 solid;outline:0;width: 80px;}.printForm .printTable tr{padding:2px}.printForm .printTable tr>th{padding:6px 4px}.printForm .printTable tr>td{padding:6px 4px} .es-img {height: 25px;}';

                setTimeout(() => {
                    printJS({
                    printable: "printCQadvice",
                    type: "html",
                    style: style,
                    scanStyles: false
                    });
                }, 1);
            }else if (this.adviceType == 3) {
                if (this.lstableData.length==0) {
                    this.$message.error("请勾选需要打印的医嘱!");
                    return false
                }
                const style = '@media print {.printForm{width:960px} .printForm .hospital_title{font-size:20px;font-weight:400;text-align:center;letter-spacing:5px}.printForm .title{font-size:30px;font-weight:500;text-align:center}.printForm .title{font-size:30px;font-weight:500;text-align:center}.printForm .info ul{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;align-items:center;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;-webkit-justify-content:space-around;-moz-justify-content:space-around;-ms-justify-content:space-around;-o-justify-content:space-around;justify-content:space-around}.printForm .info ul li{display:flex;box-sizing:border-box;justify-content:space-around}.printForm .info ul li .InputBox{padding:0;border:0;border-bottom:1px #e5e5e5 solid;outline:0;width: 80px;}.printForm .printTable tr{padding:2px}.printForm .printTable tr>th{padding:6px 4px}.printForm .printTable tr>td{padding:6px 4px} .es-img {height: 25px;}';

                setTimeout(() => {
                    printJS({
                    printable: "printLSadvice",
                    type: "html",
                    style: style,
                    scanStyles: false
                    });
                }, 1);


            }else {
                this.$message.error("请先将医嘱类型切换到长期或临时，将勾选需要打印的医嘱!");
                return false
            }

        },
        cellClassName({row, column, rowIndex, columnIndex}){
            return 'ls-table-row';
        },
        tranAge(birthday) {
            var birth = uParseTime(birthday, '{y}-{m}-{d}');
            return jsGetAge(birth,'-');
        }, changeTemplateAdvice(selection) {
          this.selectedTemplate = selection;

        },selectAllTemplateAdvice(selection){
        var adviceArray = this.adviceTemplateMaps[this.selectedTemp.id].DoctorAdviceTemplate
        for (let y = 0; y < adviceArray.length; y++) {
          adviceArray[y].selection = false
        }
        if(selection.length > 0) {
          for (let y = 0; y < adviceArray.length; y++) {
            for (let i = 0; i < selection.length; i++) {
              if (adviceArray[y].id == selection[i].advice_id) {
                adviceArray[y].selection = true

              }
            }

          }
        }



      }, selectTemplateAdvice(selection, row) {

          var adviceArray = this.adviceTemplateMaps[this.selectedTemp.id].DoctorAdviceTemplate
          for (let y = 0; y < adviceArray.length; y++) {
            adviceArray[y].selection = false
          }
          if(selection.length > 0) {
              for (let y = 0; y < adviceArray.length; y++) {
                for (let i = 0; i < selection.length; i++) {
                  if (adviceArray[y].id == selection[i].advice_id) {
                    adviceArray[y].selection = true

                  }
                }

            }
          }


            if (row.children.length>0) {
              for (const index in row.children) {
                this.$refs.selecttemplatetable.toggleRowSelection(row.children[index]);
              }
            }

            //下面两步的作用是为了上选中的数据的输出顺序不变
            for (const index in this.selectedTemp.list) {
              this.$refs.selecttemplatetable.toggleRowSelection(this.selectedTemp.list[index]);
              if (this.selectedTemp.list[index].children.length>0) {
                for (const j in this.selectedTemp.list[index].children) {
                  this.$refs.selecttemplatetable.toggleRowSelection(this.selectedTemp.list[index].children[j]);
                }
              }
            }

            for (const index in this.selectedTemp.list) {
              this.$refs.selecttemplatetable.toggleRowSelection(this.selectedTemp.list[index]);
              if (this.selectedTemp.list[index].children.length>0) {
                for (const j in this.selectedTemp.list[index].children) {
                  this.$refs.selecttemplatetable.toggleRowSelection(this.selectedTemp.list[index].children[j]);
                }
              }
            }
        },
        spanselecttable({ row, column, rowIndex, columnIndex }) {
          if(columnIndex==0) {
            const _row = this.selectedTemp.rows[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
              rowspan: _row,
              colspan: _col
            }
          }
        },
        calcselectedTemp(){
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
        templateTableChange(currentRow, oldCurrentRow){
          this.selectedTemp = {'id':0,name:'',org_id:0,'list':[],'rows':[]};
          if (currentRow == null) {
            return false;
          }

          this.selectedTemp.id = currentRow.id;
          this.selectedTemp.name = currentRow.name;
          this.selectedTemp.org_id = currentRow.org_id;
          if(this.selectedTemp.id in this.adviceTemplateMaps) {

            var mapid = this.selectedTemp.id;
            var thisRowKey = 0;
            for (const index in this.adviceTemplateMaps[mapid].DoctorAdviceTemplate) {

              thisRowKey++;
              var item = {
                advice_name: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].advice_name,
                advice_desc: this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].advice_desc,
                single_dose:''+this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose,
                single_dose_unit:this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose_unit,
                drug_spec:''+this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec,
                drug_spec_unit:this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec_unit,
                prescribing_number:''+this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number,
                prescribing_number_unit:this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number_unit,
                delivery_way:this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].delivery_way,
                execution_frequency:this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].execution_frequency,
                advice_id:this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].id,
                selection:this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].selection,
                isEdit:0,
                id:0,
                children:[],
                parent_row:0,
                row_key:thisRowKey,
              }
              if ('children' in this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index] && this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children.length>0) {
                  var parentRow = thisRowKey;
                  var children = this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children
                  for (const key in children) {
                    thisRowKey++
                    var child = {
                      advice_id:children[key].id,
                      advice_name:children[key].advice_name,
                      advice_desc:children[key].advice_desc,
                      single_dose:''+children[key].single_dose,
                      single_dose_unit:children[key].single_dose_unit,
                      drug_spec:''+children[key].drug_spec,
                      drug_spec_unit:children[key].drug_spec_unit,
                      prescribing_number:''+children[key].prescribing_number,
                      prescribing_number_unit:children[key].prescribing_number_unit,
                      delivery_way:children[key].delivery_way,
                      execution_frequency:children[key].execution_frequency,
                      isEdit:0,
                      id:0,
                      children:[],
                      parent_row: parentRow,
                      row_key:thisRowKey,
                    }
                    item.children.push(child);
                  }
                this.$set(item, 'children', item.children);
              }

              this.selectedTemp.list.unshift(item);

            }
          }


        },
        newAddTempForm(){
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
            if (this.allSelectedTemplate[index].parent_row>0) {
              if(!(this.allSelectedTemplate[index].parent_row in childMap) ) {
                childMap[this.allSelectedTemplate[index].parent_row] = [];
              }
              childMap[this.allSelectedTemplate[index].parent_row].push(this.allSelectedTemplate[index]);
            }
          }


          for (const index in this.allSelectedTemplate) {
            if (this.allSelectedTemplate[index].parent_row>0) {
              continue;
            }
            this.rowKey++;
            var item = {
              advice_name: this.allSelectedTemplate[index].advice_name,
              advice_desc: this.allSelectedTemplate[index].advice_desc,
              single_dose:''+this.allSelectedTemplate[index].single_dose,
              single_dose_unit:this.allSelectedTemplate[index].single_dose_unit,
              drug_spec:''+this.allSelectedTemplate[index].drug_spec,
              drug_spec_unit:this.allSelectedTemplate[index].drug_spec_unit,
              prescribing_number:''+this.allSelectedTemplate[index].prescribing_number,
              prescribing_number_unit:this.allSelectedTemplate[index].prescribing_number_unit,
              delivery_way:this.allSelectedTemplate[index].delivery_way,
              execution_frequency:this.allSelectedTemplate[index].execution_frequency,
              isEdit:0,
              id:0,
              children:[],
              parent_row:0,
              row_key:this.rowKey,
            }

            if(this.allSelectedTemplate[index].children.length > 0){
              if (this.allSelectedTemplate[index].row_key in childMap) {
                var parentRow = this.rowKey;
                var children = childMap[this.allSelectedTemplate[index].row_key];
                for (const key in children) {
                  this.rowKey++
                  var child = {
                    advice_name:children[key].advice_name,
                    advice_desc:children[key].advice_desc,
                    single_dose:''+children[key].single_dose,
                    single_dose_unit:children[key].single_dose_unit,
                    drug_spec:''+children[key].drug_spec,
                    drug_spec_unit:children[key].drug_spec_unit,
                    prescribing_number:''+children[key].prescribing_number,
                    prescribing_number_unit:children[key].prescribing_number_unit,
                    delivery_way:children[key].delivery_way,
                    execution_frequency:children[key].execution_frequency,
                    isEdit:0,
                    id:0,
                    children:[],
                    parent_row: parentRow,
                    row_key:this.rowKey,
                  }
                  item.children.push(child);
                }
                this.$set(item, 'children', item.children);
              }
            }
            this.groupForm.adviceNames.push(item);
          }
          this.templateFormVisible=false;
          //清除数据源的选中记录





        },
        addTempForm(formName){
          var _this = this;
          this.$refs[formName].validate((valid) => {
              if(valid) {
                if(_this.templateForm.id in _this.adviceTemplateMaps) {
                  var mapid = _this.templateForm.id;
                  for (const index in _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate) {
                    this.rowKey++;
                    var item = {
                      advice_name: _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].advice_name,
                      advice_desc:''+_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].advice_desc,
                      single_dose:''+_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose,
                      single_dose_unit:_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].single_dose_unit,
                      drug_spec:''+_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec,
                      drug_spec_unit:_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].drug_spec_unit,
                      prescribing_number:''+_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number,
                      prescribing_number_unit:_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].prescribing_number_unit,
                      delivery_way:_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].delivery_way,
                      execution_frequency:_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].execution_frequency,
                      parent_id:_this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].parent_id,
                      isEdit:0,
                      id:0,
                      children:[],
                      parent_row:0,
                      row_key:this.rowKey,
                    }
                    if ('children' in _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index] && _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children) {
                        var parentRow = this.rowKey;
                        var children = _this.adviceTemplateMaps[mapid].DoctorAdviceTemplate[index].children
                        for (const key in children) {
                          this.rowKey++
                          var child = {
                            advice_name:children[key].advice_name,
                            advice_desc:children[key].advice_desc,
                            single_dose:''+children[key].single_dose,
                            single_dose_unit:children[key].single_dose_unit,
                            drug_spec:''+children[key].drug_spec,
                            drug_spec_unit:children[key].drug_spec_unit,
                            prescribing_number:''+children[key].prescribing_number,
                            prescribing_number_unit:children[key].prescribing_number_unit,
                            delivery_way:children[key].delivery_way,
                            execution_frequency:children[key].execution_frequency,
                            isEdit:0,
                            id:0,
                            children:[],
                            parent_row: parentRow,
                            row_key:this.rowKey,
                          }
                          item.children.push(child);
                        }
                      _this.$set(item, 'children', item.children);
                    }

                    _this.groupForm.adviceNames.unshift(item);

                    // _this.groupForm.adviceNames.unshift(item);

                    _this.toggleRowExpansion();
                  }
                }
                _this.templateFormVisible = false;
              }

          });
        },
        submitNameForm(formName){
          var _this = this;
          this.$refs[formName].validate((valid) => {
              if(valid) {
                if(_this.nameForm.isEdit) {
                  var ale = _this.groupForm.adviceNames.length;
                  if(_this.isChild) {
                    for (let index = 0; index < ale; index++) {
                      if(_this.groupSelectRow.parent_row == _this.groupForm.adviceNames[index].row_key) {
                        var cle = _this.groupForm.adviceNames[index].children.length
                        var children = _this.groupForm.adviceNames[index].children
                        for (let j = 0; j < ale; j++) {
                          if(_this.groupSelectRow.row_key == children[j].row_key) {
                            _this.groupForm.adviceNames[index].children[j].advice_name = _this.nameForm.advice_name;
                            _this.groupForm.adviceNames[index].children[j].advice_desc = _this.nameForm.advice_desc;
                            _this.groupForm.adviceNames[index].children[j].single_dose = ''+_this.nameForm.single_dose;
                            _this.groupForm.adviceNames[index].children[j].single_dose_unit = _this.nameForm.single_dose_unit;
                            _this.groupForm.adviceNames[index].children[j].drug_spec = ''+_this.nameForm.drug_spec;
                            _this.groupForm.adviceNames[index].children[j].drug_spec_unit = _this.nameForm.drug_spec_unit;
                            _this.groupForm.adviceNames[index].children[j].prescribing_number = ''+_this.nameForm.prescribing_number;
                            _this.groupForm.adviceNames[index].children[j].prescribing_number_unit = _this.nameForm.prescribing_number_unit;
                            _this.groupForm.adviceNames[index].children[j].delivery_way = _this.nameForm.delivery_way;
                            _this.groupForm.adviceNames[index].children[j].execution_frequency = _this.nameForm.execution_frequency;

                            _this.$set(_this.groupForm.adviceNames[index].children, j, _this.groupForm.adviceNames[index].children[j]);
                            _this.toggleRowExpansion();
                            break;
                          }
                        }
                      }
                    }
                  }else {
                    for (let index = 0; index < ale; index++) {
                      if(_this.groupSelectRow.row_key == _this.groupForm.adviceNames[index].row_key) {
                        _this.groupForm.adviceNames[index].advice_name = _this.nameForm.advice_name;
                        _this.groupForm.adviceNames[index].advice_desc = _this.nameForm.advice_desc;
                        _this.groupForm.adviceNames[index].single_dose = ''+_this.nameForm.single_dose;
                        _this.groupForm.adviceNames[index].single_dose_unit = _this.nameForm.single_dose_unit;
                        _this.groupForm.adviceNames[index].drug_spec = ''+_this.nameForm.drug_spec;
                        _this.groupForm.adviceNames[index].drug_spec_unit = _this.nameForm.drug_spec_unit;
                        _this.groupForm.adviceNames[index].prescribing_number = ''+_this.nameForm.prescribing_number;
                        _this.groupForm.adviceNames[index].prescribing_number_unit = _this.nameForm.prescribing_number_unit;
                        _this.groupForm.adviceNames[index].delivery_way = _this.nameForm.delivery_way;
                        _this.groupForm.adviceNames[index].execution_frequency = _this.nameForm.execution_frequency;

                        _this.$set(_this.groupForm.adviceNames, index, _this.groupForm.adviceNames[index]);
                        _this.toggleRowExpansion();
                        break;
                      }
                    }
                  }

                }else {
                  if(_this.isChild) {
                    _this.rowKey ++;
                    _this.nameForm.row_key = _this.rowKey;

                    var ale = _this.groupForm.adviceNames.length;
                    for (let index = 0; index < ale; index++) {
                      if(_this.nameForm.parent_row == _this.groupForm.adviceNames[index].row_key) {
                        _this.groupForm.adviceNames[index].children.push(_this.nameForm);
                        _this.$set(_this.groupForm.adviceNames, index, _this.groupForm.adviceNames[index]);
                        // _this.$refs.advicenametable.doLayout();

                        _this.toggleRowExpansion();
                        break;
                      }
                    }
                  }else {
                    _this.rowKey ++;
                    _this.nameForm.row_key = _this.rowKey;
                    _this.groupForm.adviceNames.push(_this.nameForm);
                    _this.toggleRowExpansion();

                  }
                }
                _this.nameFormVisible = false;
              }
          });
        },

        setAdminUserES(id) {
            if (id == 0) {
            return ''
            }
            if (id in this.operatorMaps) {
            return this.operatorMaps[id].url;
            } else {
            return '';
            }
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
        },
        load(tree, treeNode, resolve) {
        },
        toggleRowExpansion(){
          for (const index in this.groupForm.adviceNames) {
            this.$refs.advicenametable.toggleRowExpansion(this.groupForm.adviceNames[index], true);
          }
        }, handleSpanTempArr() {
        this.tempArr = []

        for (let i = 0; i < this.adviceTableData.length; i++) {
          if (i === 0) {
            this.tempArr.push(1);
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (this.adviceTableData[i].groupno === this.adviceTableData[i - 1].groupno) {
              this.tempArr[this.pos] += 1;
              this.tempArr.push(0);
            } else {
              this.tempArr.push(1);
              this.pos = i;
            }
          }
        }


        // let sameRowArr = [], sIdx = 0;
        // this.adviceTemplates.forEach((item, index) => {
        //   item.index = index
        //   if (index === 0) {
        //     sameRowArr.push([index])
        //   } else {
        //     if (item.template_id === this.adviceTemplates[index - 1].template_id) {
        //       sameRowArr[sIdx].push(index)
        //     } else {
        //       sIdx = sIdx + 1;
        //       sameRowArr.push([index])
        //     }
        //   }
        // })
        // this.sameRowArr = sameRowArr;


      }, mergeSpan({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex >=9) {
          const _row = this.tempArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
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
    watch:{
        'adviceTableData':function(){
            this.handleSpanTempArr();
        },
        'selectedTemp.list':function(){
            this.calcselectedTemp();
        },
    },
    components:{
        PatientSidebar,
        EditGroupAdvice
    },
    created(){
        const id = this.$route.params && this.$route.params.id;
        this.patientID = parseInt(id);
        if (isNaN(this.patientID) || this.patientID <= 0) {
            this.$notify.error({
            title: "错误",
            message: "无效的id"
            });
            this.$router.push('/patients/patients');
        }
        this.listQuery.id = this.patientID;

        var nowDate = new Date();
        var nowYear = nowDate.getFullYear()
        var nowMonth = nowDate.getMonth() + 1
        var nowDay = nowDate.getDate()

        this.listQuery.end_time = nowYear + "-" + (nowMonth < 10 ? '0' + nowMonth: nowMonth) +  "-" + (nowDay < 10 ? '0' + nowDay : nowDay);

        nowDate.setMonth(nowDate.getMonth()-1);
        nowYear = nowDate.getFullYear()
        nowMonth = nowDate.getMonth() + 1
        nowDay = nowDate.getDate()

        this.listQuery.start_time = nowYear + "-" + (nowMonth < 10 ? '0' + nowMonth: nowMonth) +  "-" + (nowDay < 10 ? '0' + nowDay : nowDay);


        // this.fetchAllDoctorAndNurse();
        this.fetchAllAdminUsers();
        this.getAdviceConfig();
        this.getList();

        var xtuser = this.$store.getters.xt_user;
        this.orgname = xtuser.org.org_name;
        this.adminusername = xtuser.user.user_name;
        this.aminuserid = xtuser.user.id;
        this.unitsOption = getDataConfig('hemodialysis','units');
    }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.printForm {
    width: 960px;
}
.printForm .hospital_title{
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    letter-spacing:5px;
}
.printForm .title {
    font-size: 30px;
    font-weight: 500;
    text-align: center;
}

.printForm .title {
    font-size: 30px;
    font-weight: 500;
    text-align: center;
}

.printForm .info ul {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-justify-content: space-around;
      -moz-justify-content: space-around;
      -ms-justify-content: space-around;
      -o-justify-content: space-around;
      justify-content: space-around;
}
.printForm .info ul li {
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
}
.printForm .info ul li .InputBox {
    padding: 0;
    border: none;
    border-bottom: 1px #e5e5e5 solid;
    outline:none;
    width: 80px;
}
.printForm .printTable tr{
    padding:2px;
}
.printForm .printTable tr>th{
    padding:6px 4px;
}
.printForm .printTable tr>td{
    padding:6px 4px;
 }

  .es-img {
    height: 25px;
  }


.advice-container{
    font-size: 15px;
  .filter-container {
    padding-bottom: 5px;
  }
  .search-component {
    width: 500px;
    .searchBox {
      width: 300px;
      height: 36px;
      line-height: 36px;
      padding-left: 15px;
      border: 1px #dcdfe6 solid;
      border-right: none;
      outline: none;
      float: left;
      border-radius: 6px 0 0 6px;
      font-size: 14px;
      color: #333;
      background: #fff;
      box-shadow: 3px 3px 4px rgba(135, 135, 135, 0.05);
    }
    .searchBtn {
      background-color: #409eff;
      color: #fff;
      font-size: 15px;
      text-align: center;
      height: 36px;
      line-height: 36px;
      float: left;
      outline: none;
      width: 70px;
      border: none;
      border-radius: 0 6px 6px 0;
      font-family: "Microsoft Yahei";
      cursor: pointer;
    }
  }
  .cell {
    margin: 0px 0 15px 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    // display: flex;
    -webkit-box-align: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;
    text-align: left;
    justify-content: flex-start;
    color: #333;
    .title {
      width: 80px;
      display: inline-block;
      font-weight: normal;
      color: #909399;
      padding: 6px 0;
      font-weight: 700;
      .name {
        width: 60px;
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        -moz-text-align-last: justify;
        -webkit-text-align-last: justify;
        display: inline-block;
      }
    }
    .time {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      ul {
        padding: 0;
        margin: 0;
        li {
          float: left;
          list-style: none;
          cursor: pointer;
          padding: 6px 10px;
          color: #606266;
          border-radius: 4px;
          margin: 0 4px 0 0;
          &:hover {
            background: #409eff;
            color: #fff;
          }
        }
        .active {
          background: #409eff;
          color: #fff;
        }
      }
    }
  }
  .amount {
    font-weight: normal;
    padding: 10px 0 0 0;
    color: #606266;
    font-size: 14px;
    span {
      color: #ef2525;
      font-family: "Arial";
      padding: 0 2px;
    }
  }
  .el-dropdown-link {
      cursor: pointer;
  }
}

.advice-order .ls-title{
    text-align: center;
    font-weight: 600;
    font-size: 30px;
    line-height: 80px;
    margin-bottom: 20px;
}
.advice-order .ls-type{
    text-align: center;
    margin-bottom: 20px;
}
.advice-order .ls-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 2em;
}
</style>
<style>
.advice-order .el-table__body{
    border: 1px solid #333;
}
.advice-order .el-table__body td{
    border: 1px solid #333;
}
.advice-order .item-value { flex: 1; border-bottom: 1px solid #333; }
.advice-order th, .advice-order td {
    padding: 5px 10px;
}
#user-advice-name-table .expanded {
  display: table-row !important;
}
#user-advice-name-table .el-table__expand-icon {
  -webkit-transform: rotate(90deg) !important;
  transform: rotate(90deg) !important;
}

.user-advice-table-row:hover>td{
  background: #fff !important;
}
.user-advice-table-row td:hover{
  background: #fff !important;
}
#user-advice-select-template-table .el-table__row {
  display: table-row !important;
}
#user-advice-select-template-table .el-table__expand-icon {
  -webkit-transform: rotate(90deg) !important;
  transform: rotate(90deg) !important;
}
</style>

