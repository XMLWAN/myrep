<template>
  <div class="app-container">
    <el-container style="border: 1px solid #eee">

      <el-container>
        <el-main>
          <check-box-dialog :titles="dialogFistulaTitle" :values="DialysisBeforeAssesGuiltyData" :visibility="isVisibiltyForFistulaDialog"
                            v-on:dialog-comfirm="fistulaDialogComfirm" v-on:dialog-cancle="fistulaDialogCancle"></check-box-dialog>


          <check-box-dialog :titles="dialogPipeTitle" :values="dialysisBeforeAssesCatheterData" :visibility="isVisibiltyForPipeDialog"
                            v-on:dialog-comfirm="pipeDialogComfirm" v-on:dialog-cancle="pipeDialogCancle"></check-box-dialog>



          <check-box-dialog :titles="dialogDialysisBeforeAssesGuiltyTitle" :values="DialysisBeforeAssesGuiltyData"
                            :visibility="isVisibiltyForDialysisBeforeAssesGuiltyDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>
          <check-box-dialog :titles="dialogDialysisBeforeAssesCatheterTitle" :values="dialysisBeforeAssesCatheterData"
                            :visibility="isVisibiltyForDialysisBeforeAssesCatheterDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>



          <!--透前评估-->
          <check-box-dialog :titles="dialogDialysisIntervalTitle" :values="dialysisIntervalData"
                            :visibility="isVisibiltyForDialysisIntervalDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>
          <check-box-dialog :titles="dialogAfterTheLastDialysisTitle" :values="afterTheLastDialysiData"
                            :visibility="isVisibiltyForAfterTheLastDialysisDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>
          <check-box-dialog :titles="dialogPreExistingSymptomsTitle" :values="preExistingSymptomsData"
                            :visibility="isVisibiltyForPreExistingSymptomsDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>
          <check-box-dialog :titles="dialogDialysisBeforeAssesGuiltyTitle" :values="DialysisBeforeAssesGuiltyData"
                            :visibility="isVisibiltyForDialysisBeforeAssesGuiltyDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>
          <check-box-dialog :titles="dialogDialysisBeforeAssesCatheterTitle" :values="dialysisBeforeAssesCatheterData"
                            :visibility="isVisibiltyForDialysisBeforeAssesCatheterDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>
          <check-box-dialog :titles="dialogDialysisBeforeAssesComplicationsTitle"
                            :values="dialysisBeforeAssesComplicationsData"
                            :visibility="isVisibiltyForDialysisBeforeAssesComplicationsDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>
          <!--透后评估-->
          <check-box-dialog :titles="dialogCruorTitle" :values="cruorData" :visibility="isVisibiltyForCruorDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>

          <check-box-dialog :titles="dialogSymptomsAfterDialysiTitle" :values="symptomsAfterDialysiData"
                            :visibility="isVisibiltyForSymptomsAfterDialysiDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>


          <check-box-dialog :titles="dialogComplicationsTitle" :values="complicationsData"
                            :visibility="isVisibiltyForcomplicationsDialog"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"></check-box-dialog>

          <check-box-dialog :titles="dialogSymptomsTitle" :values="symptomsArray"
                            :visibility="isVisibiltyForSymptomsDialog"
                            :isShowTextArea="false" v-on:dialog-comfirm="DialogComfirm"
                            v-on:dialog-cancle="DialogCancle" append-to-body></check-box-dialog>


          <check-box-dialog :titles="dialogDealTitle" :values="dealArray" :visibility="isVisibiltyForDealDialog"
                            :isShowTextArea="false" v-on:dialog-comfirm="DialogComfirm"
                            v-on:dialog-cancle="DialogCancle" append-to-body></check-box-dialog>


          <check-box-dialog :titles="dialogResultsTitle" :values="resultsArray"
                            :visibility="isVisibiltyForResultsDialog" :isShowTextArea="false"
                            v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"
                            append-to-body></check-box-dialog>


          <!--干体重-->
          <dry-weight-dialog :titles="dialogAdjustWeightTitle" :doctorList="doctorList"
                             :weightList="weightList"
                             :visibility="isVisibiltyAdjustDryWeightDialog"
                             v-on:dialog-comfirm="DialogComfirm"
                             v-on:dialog-cancle="DialogCancle"></dry-weight-dialog>


          <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="40%">
            <el-form ref="adviceForm" :rules="adviceRules" :model="adviceForm" label-width="90px">
              <el-row>
                <el-col :span="15">
                  <el-form-item label="医嘱类型 :" required prop="advice_type">
                    <el-select v-model="adviceForm.advice_type" :disabled="isEdit||adviceForm.parent_id>0?true:false"
                               placeholder="请选择">
                      <el-option :label="item.label" :value="item.value"
                                 v-for="item in adviceTypeArr" :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="15">
                  <el-form-item label="医嘱时间 :" required prop="advice_date">
                    <el-date-picker type="date" readonly format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                    placeholder="选择日期" v-model="adviceForm.advice_date"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="开始时间 :" required prop="start_time">
                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择时间" v-model="adviceForm.start_time" style="width:50%"
                                :disabled="adviceForm.parent_id==0?false:true"></el-date-picker>
              </el-form-item>
              <el-form-item label="医嘱名称 :" required prop="advice_name">
                <el-select v-model="adviceForm.advice_name" @change="changeAdviceName" filterable
                           placeholder="请选择(输入可搜索)" style="width:50%">
                  <el-option
                    v-for="item in drugOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <span>{{ item.name }}</span>
                    <span>{{ item.spec }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="医嘱内容 :" prop="advice_desc">
                <el-input v-model="adviceForm.advice_desc" style="width:50%"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="15">
                  <el-form-item label="单次用量 :" prop="single_dose">
                    <el-col :span="11">
                      <el-input v-model="adviceForm.single_dose"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="6">
                      <el-input v-model="adviceForm.single_dose_unit"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="15">
                  <el-form-item label="开药数量 :" prop="prescribing_number">
                    <el-col :span="11">
                      <el-input v-model="adviceForm.prescribing_number"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="6">
                      <el-input v-model="adviceForm.prescribing_number_unit"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15">
                  <el-form-item label="给药途径 :" prop="delivery_way">
                    <el-select v-model="adviceForm.delivery_way" :disabled="adviceForm.parent_id==0?false:true"
                               filterable placeholder="请选择(输入可搜索)" style="width:90%">
                      <el-option
                        v-for="item in deliveryWayOptions"
                        :key="item.id"
                        :label="item.name "
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="15">
                  <el-form-item label="执行频率 :" prop="execution_frequency">
                    <el-select v-model="adviceForm.execution_frequency" :disabled="adviceForm.parent_id==0?false:true"
                               filterable placeholder="请选择(输入可搜索)" style="width:90%">
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

              <!--<el-form-item label="开嘱医生 :" prop="advice_doctor" required>-->
              <!--<el-input v-model="advice_doctor"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>-->
              <el-form-item label="子药数量 : ">
                <el-input-number :disabled="$store.getters.xt_user.subscibe.state==3?true:false" v-model="adviceForm.num" @change="handleChangeChild" :min="0"
                                 label="0"></el-input-number>
              </el-form-item>

              <el-form v-show="lastValue != 0">
                <el-form
                  v-for="item in SubAdvice"
                  :key="item.id"
                >
                  <el-form-item
                    :label="item.labelName "
                  >
                    <el-select v-model="item.subAdivceForm.advice_name"
                               @change="changeSubAdviceName(item.subAdivceForm.advice_name,item.subAdivceForm)"
                               filterable
                               placeholder="请选择(输入可搜索)" style="width:50%">
                      <el-option
                        v-for="item in drugOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                        <span>{{ item.name }}</span>
                        <span>{{ item.spec }}</span>
                      </el-option>
                    </el-select>

                  </el-form-item>

                  <el-form-item
                    :label="item.labeldesc"
                  >
                    <el-input style="width: 250px" v-model="item.subAdivceForm.advice_desc"
                              readonly="readonly"></el-input>

                  </el-form-item>
                  <el-form-item
                    :label="item.sigle"
                  >

                    <el-col :span="11">
                      <el-input v-model="item.subAdivceForm.single_dose"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="6">
                      <el-input v-model="item.subAdivceForm.single_dose_unit"></el-input>
                    </el-col>

                  </el-form-item>
                  <el-form-item
                    :label="item.num"
                  >
                    <el-col :span="11">
                      <el-input v-model="item.subAdivceForm.prescribing_number"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="6">
                      <el-input v-model="item.subAdivceForm.prescribing_number_unit"></el-input>
                    </el-col>


                  </el-form-item>

                </el-form>

              </el-form>


            </el-form>
            <div slot="footer" class="dialog-footer">
              <template v-if="isEdit">
                <el-button type="primary" :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click="submitEditAdvice('adviceForm')">确 定</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
              </template>
              <template v-else>
                <el-button type="primary" :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click="submitNewAdvice('adviceForm')">确 定</el-button>
                <!--<el-button type="primary" @click="submitNewAdvice('adviceForm', 're')" v-if="adviceForm.parent_id==0">继 续</el-button>-->
                <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
              </template>
            </div>
          </el-dialog>
          <el-dialog :title="dialogTitle" :visible.sync="dialogFormExecutionVisible" width="40%">
            <el-form ref="adviceForm" :rules="adviceRules" :model="adviceForm" label-width="90px">

              <el-form-item label="医嘱内容 :" required>
              </el-form-item>
              <el-input style="margin-bottom: 20px" type="textarea" :rows="4" v-model="executionForm.content"
                        readonly="readonly"></el-input>
              <el-form-item label="执行时间 :" required prop="start_time">
                <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择时间" v-model="executionForm.execution_time" style="width:50%"
                ></el-date-picker>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <template>
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitExecuteAdvice">确 定</el-button>
                <el-button type="primary" @click="dialogFormExecutionVisible = false">取消</el-button>
              </template>
            </div>
          </el-dialog>

          <!--//透析监测-->
          <add-monitor :titles="dialogMonitorTitle" :symptoms="symptomsData" :deal="dealData" :results="resultsData"
                       :visibility="isVisibiltyForMonitorDialog" :form="MonitorForm"
                       :nurseList="nurseList" v-on:dialog-comfirm="DialogComfirm" v-on:dialog-cancle="DialogCancle"
                       v-on:symptom-click="showInnerDialog('symptom')" v-on:deal-click="showInnerDialog('deal')"
                       v-on:result-click="showInnerDialog('result')"></add-monitor>


          <form-dialog :titles="dialogDialysateVolumeTitle" :formValue="dialysateVolumeData"
                       :visibility="isVisibiltyForDialysateVolumeDialog"
                       v-on:form-dialog-comfirm="FormDialogComfirm"
                       v-on:form-dialog-cancle="FormDialogCancle"></form-dialog>


          <el-form :model="userInfo" class="demo-form-inline" label-width="104px">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="透析日期 : " >
                  <el-date-picker
                    style="width:200px"
                    v-model="dialysisTime"
                    type="date"
                    @change="schedualPickTime"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="性别 : ">
                  <el-input v-model="userInfo.gender" :disabled="true"></el-input>
                </el-form-item>

              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名 : ">
                  <el-input v-model="userInfo.userName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="机号 : ">
                  <el-input v-model="userInfo.bed" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年龄 : ">
                  <el-input v-model="userInfo.age" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="来源 : ">
                  <el-radio v-model="radio" label="1" readonly="readonly">{{userInfo.label}}</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="透析号 : ">
                  <el-input v-model="userInfo.dialysisNumber" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="">
                  <el-button type="primary" @click="printOrder">打印</el-button>
                </el-form-item>

              </el-col>

            </el-row>

          </el-form>

          <div class="border"></div>
          <p class="title">透析处方</p>
          <el-row>
            <el-col :span="23">

              <el-form :model="dialysisPrescription" class="demo-form-inline"
                       :label-position="labelPosition"
                       label-width="148px">

                <el-col :span="size">
                  <el-form-item label="透析模式 : ">
                    <el-select v-model="dialysisPrescription.dialysisMode" placeholder="请选择" style="width:100%;"
                               @change="changeDialysisMode">
                      <el-option v-for="item in modeOptions " :label="item.name" :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="size">
                  <el-form-item label="透析时长(h) : ">
                    <!-- <el-input v-model="dialysisPrescription.dialysisTime"></el-input> -->
                    <el-time-picker
                      v-model="dialysisTimeShow"
                      :picker-options="{
                        selectableRange: '00:01:00 - 23:59:00'
                      }"
                      placeholder="透析时长"
                      style="width:100%;"
                      value-format="H:m"
                      format="H:m"
                      @change="selectDialysisPrescriptionDialysisTime"
                      >
                    </el-time-picker>
                  </el-form-item>
                </el-col>


                <el-col :span="size">
                  <el-form-item label="透析机 : ">
                    <el-select v-model="dialysisPrescription.machine" style="width:100%;" placeholder="请选择"
                               @change="changeDialysisMachine">
                      <el-option v-for="item in deviceList" :label="item.name"
                                 :value="item.id" :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!--<el-col :span="size">-->
                <!--<el-form-item label="机型 : ">-->
                <!--<el-input placeholder="请选择透析机" v-model="dialysisPrescription.machineType"-->
                <!--:disabled="true"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->

                <el-col :span="size">
                  <el-form-item label="灌流器 : ">
                    <el-select v-model="dialysisPrescription.hemoperfusion" style="width:100%;"
                               placeholder="请选择">

                      <el-option v-for="item in perfusionApparatus " :label="item.name" :value="item.id"
                                 :key="item.id"></el-option>

                    </el-select>
                  </el-form-item>
                </el-col>


                <!--<el-col :span="size">-->
                <!--<el-form-item label="血透器 : ">-->
                <!--<el-select v-model="dialysisPrescription.hemodialysisDevice" placeholder="请选择" style="width:100%"-->
                <!--@change="changeDialysisMode"-->
                <!--:disabled="treatmentMode.hemodialysis_machine==1?false:true">-->
                <!--<el-option v-for="item in hemodialysisMachines " :label="item.name" :value="item.id"-->
                <!--:key="item.id"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <el-col :span="size">
                  <el-form-item label="血流量(ml/min) : ">
                    <el-input v-model="dialysisPrescription.bloodFlow"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="size">
                  <el-form-item label="脱水量(L) : ">
                    <el-input v-model="dialysisPrescription.targetDewateringAmount"></el-input>
                  </el-form-item>
                </el-col>


                <!--<el-col :span="size">-->
                <!--<el-form-item label="目标脱水量(L) : ">-->
                <!--<el-input v-model="dialysisPrescription.targetDewateringAmount "></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="size">-->
                <!--<el-form-item label="处方脱水量(L) : ">-->
                <!--<el-input placeholder="医生设定" v-model="dialysisPrescription.prescriptionDehydration"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->


                <el-col :span="size">
                  <el-form-item label="置换液(L) : ">
                    <el-input v-model="dialysisPrescription.displaceLiqui"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="size">
                  <el-form-item label="置换方式 : ">

                    <el-select v-model="dialysisPrescription.displacesMethod" placeholder="请选择" style="width:100%;"
                               @change="changeDialysisMode">
                      <el-option v-for="item in replacementWays " :label="item.name" :value="item.id"
                                 :key="item.id"></el-option>
                    </el-select>


                  </el-form-item>
                </el-col>


                <el-col :span="size">
                  <el-form-item label="抗凝剂 : ">
                    <el-select v-model="dialysisPrescription.anticoagulant" placeholder="请选择" style="width:100%;"
                               @change="changeThisAnticoagulant">
                      <el-option v-for="item in anticoagulantsConfit" :label="item.name" :key="item.id"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>


                <el-col :span="size" v-if="anticoagulant.shouji != -1">
                  <el-form-item :label="'首剂('+anticoagulant.shouji_unit+') : '">
                    <el-input v-model="dialysisPrescription.firstDose"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item :label="'维持('+anticoagulant.weichi_unit+') : '" v-if="anticoagulant.weichi != -1">
                    <el-input v-model="dialysisPrescription.maintenance"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size" v-if="anticoagulant.zongliang != -1">
                  <el-form-item :label="'总量('+anticoagulant.zongliang_unit+') : '">
                    <el-input v-model="dialysisPrescription.total"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="size" v-if="anticoagulant.gaimingcheng != -1">
                  <el-form-item label="钙名称 : ">
                    <el-input v-model="dialysisPrescription.gaimingcheng"
                              :disabled="anticoagulant.gaimingcheng==1?false:true" placeholder="钙名称"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="size" v-if="anticoagulant.gaijiliang != -1">
                  <el-form-item label="钙剂量(ml/h) : ">
                    <el-input v-model="dialysisPrescription.gaijiliang"
                              :disabled="anticoagulant.gaijiliang==1?false:true" placeholder="钙剂量"></el-input>
                  </el-form-item>
                </el-col>


                <!--<el-col :span="size">-->
                <!--<el-form-item label="置换总量 : ">-->
                <!--<el-input v-model="dialysisPrescription.displacesTotal"-->
                <!--:disabled="treatmentMode.dialysis_duration==1?false:true"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->


                <!--<el-col :span="size">-->
                <!--<el-form-item label="血滤器 : ">-->
                <!--<el-select v-model="dialysisPrescription.bloodFilterDevice" style="width:100%;"-->
                <!--:disabled="treatmentMode.blood_filter==1?false:true" placeholder="请选择">-->

                <!--<el-option v-for="item in bloodFilters " :label="item.name" :value="item.id"-->
                <!--:key="item.id"></el-option>-->

                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--</el-col>-->

                <!-- <el-col :span="size">
                  <div @click="showDialog('adjustDryWeight')">
                    <el-form-item label="干体重 : ">
                      <el-input v-model="dialysisPrescription.adjustDryWeight" readonly="readonly"></el-input>
                    </el-form-item>
                  </div>
                </el-col> -->


                <el-col :span="size">
                  <div >
                    <el-form-item label="干体重 : ">
                      <el-input v-model="dialysisPrescription.adjustDryWeight" type="number"></el-input>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="size">
                  <el-form-item label="目标超滤量(ml) : ">
                    <el-input v-model="dialysisPrescription.target_ultrafiltration" type="number"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="24">
                    <el-form-item label="透析液配方:">
                      <el-radio v-model="dialysisPrescription.dialysate_formulation" label="1">常规</el-radio>
                      <el-radio v-model="dialysisPrescription.dialysate_formulation" label="2">低钙(1.25mmol/L)</el-radio>
                      <el-radio v-model="dialysisPrescription.dialysate_formulation" label="3">高钙(1.75mmol/L)</el-radio>
                      <el-radio v-model="dialysisPrescription.dialysate_formulation" label="4">低钠(135mmol/L)</el-radio>
                      <el-radio v-model="dialysisPrescription.dialysate_formulation" label="5">高钠(145mmol/L)</el-radio>
                    </el-form-item>
                </el-col>


                <el-col :span="size">
                  <el-form-item label="透析液流量(ml/min) : ">
                    <el-input v-model="dialysisPrescription.dialysateFlow"
                              :disabled="treatmentMode.dialysate_flow==1?false:true"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="size">
                  <el-form-item label="透析液温度(℃) : ">
                    <el-input v-model="dialysisPrescription.dialysate_temperature"
                              :disabled="treatmentMode.dialysate_flow==1?false:true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item label="钾(mmol/L) : ">
                    <el-input v-model="dialysisPrescription.kalium"
                              :disabled="treatmentMode.kalium==1?false:true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item label="钠(mmol/L) : ">
                    <el-input v-model="dialysisPrescription.sodium"
                              :disabled="treatmentMode.sodium==1?false:true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item label="钙(mmol/L) : ">
                    <el-input v-model="dialysisPrescription.calcium"
                              :disabled="treatmentMode.calcium==1?false:true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item label="碳酸氢盐(mmol/L) : ">
                    <el-input v-model="dialysisPrescription.bicarbonate"
                              :disabled="treatmentMode.bicarbonate==1?false:true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item label="葡萄糖(mmol/L) : ">
                    <el-input v-model="dialysisPrescription.glucose"
                              :disabled="treatmentMode.bicarbonate==1?false:true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item label="电导率(mmol/L) : ">
                    <el-input v-model="dialysisPrescription.conductivity "></el-input>
                  </el-form-item>
                </el-col>

                <!--<el-col :span="10">-->
                <!--<el-form-item label="血管通路 : ">-->
                <!--<el-select v-model="dialysisPrescription.vascularAccess" placeholder="请选择" style="width:100%;">-->
                <!--<el-option v-for="item in vascularAccess " :label="item.name" :value="item.id"-->
                <!--:key="item.id"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--</el-col>-->


                <!--<el-col :span="size">-->
                <!--<el-form-item label-width="10px">-->
                <!--<el-select v-model="dialysisPrescription.vascularAccessDesc" placeholder="请选择">-->
                <!--<el-option v-for="item in vascularAccessDesc " :label="item.name" :value="item.id"-->
                <!--:key="item.id"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <el-col :span="24">

                  <el-form-item label="备注 : ">
                    <el-input type="textarea" :rows="5" v-model="dialysisPrescription.remark"
                              placeholder="请输入内容">
                    </el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="22">

                  <el-form-item>
                    <p>{{ DialysisPrescriptionComfirmUserName }}</p>
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="commitDialysisPrescriptionAndOther">提交并设为长期处方</el-button>
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="commitDialysisPrescription">提交</el-button>
                    <el-button type="primary" @click="printDan">打印上机单</el-button>
                  </el-form-item>
                </el-col>

              </el-form>
            </el-col>
          </el-row>

          <div style="display:none">
            <div id="shangjidan" class="shangjidan">
              <div class="dan-title">上机单</div>
              <table class="dan-table">
                <tbody>
                <tr>
                  <td class="dan-td-col-2">姓名</td>
                  <td class="dan-td">
                    <div class="dan-value">{{userInfo.userName}}</div>
                  </td>
                  <td class="dan-td-col-2">性别</td>
                  <td class="dan-td">
                    <div class="dan-value">{{userInfo.gender}}</div>
                  </td>
                  <td class="dan-td-col-2">年龄</td>
                  <td class="dan-td">
                    <div class="dan-value">{{userInfo.age}}</div>
                  </td>
                </tr>
                </tbody>
              </table>
              <table class="dan-table">
                <tbody>
                <tr>
                  <td class="dan-td-col-4">出生日期</td>
                  <td class="dan-td">
                    <div class="dan-value">{{userInfo.birthdate}}</div>
                  </td>
                  <td class="dan-td-col-3">透析号</td>
                  <td class="dan-td">
                    <div class="dan-value">{{userInfo.dialysisNumber}}</div>
                  </td>
                  <td class="dan-td-col-2">机号</td>
                  <td class="dan-td">
                    <div class="dan-value "><b class="print-b">{{userInfo.bed}}</b></div>
                  </td>
                </tr>
                </tbody>
              </table>
              <table class="dan-table">
                <tbody>
                <tr>
                  <td class="dan-td-col-4">处方医生</td>
                  <td class="dan-td">
                    <div class="dan-value">{{danPrintData.doctor}}</div>
                  </td>
                  <td class="dan-td-col-4">处方时间</td>
                  <td class="dan-td">
                    <div class="dan-value">{{danPrintData.time}}</div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div style="border:1px solid #666;margin:15px 0px; ">
                <div class="dan-title">透前信息</div>
                <div class="dan-main">
                  <table class="dan-table" style="margin-top: 0px;">
                    <tbody>
                    <tr>
                      <td class="dan-td-col-4">透前体重</td>
                      <td class="dan-td">
                        <div class="dan-value"><b class="print-b">{{danPrintData.weight_before}}</b></div>
                      </td>
                      <td>kg</td>
                      <td class="dan-td-col-3">衣物重</td>
                      <td class="dan-td">
                        <div class="dan-value">{{danPrintData.additional_weight}}</div>
                      </td>
                      <td>kg</td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="dan-table">
                    <tbody>
                    <tr>
                      <td class="dan-td-col-4">透前血压</td>
                      <td class="dan-td">
                        <div class="dan-value"><b class="print-b">{{danPrintData.systolic_blood_pressure}}/{{danPrintData.diastolic_blood_pressure}}</b>
                        </div>
                      </td>
                      <td>mmHg</td>
                      <td class="dan-td-col-4">心率</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.breathing_rate}}</div>
                      </td>
                      <td>次/分</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="dan-title">处方内容</div>
                <div class="dan-main" style="border:1px solid #666;margin:15px 0px;">
                  <table class="dan-table">
                    <tbody>
                    <tr>
                      <td class="dan-td-col-4">透析模式</td>
                      <td class="dan-td">
                        <div class="dan-value">
                          <b class="print-b">{{danPrintData.modelName}}</b>
                        </div>
                      </td>
                      <td class="dan-td-col-4">透析时长</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.dialysis_duration}}
                        </div>
                      </td>
                      <td>h</td>
                      <td class="dan-td-col-3">透析机</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.dialyzer}}
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="dan-table">
                    <tbody>
                    <tr>
                      <td class="dan-td-col-3">灌流器</td>
                      <td class="dan-td">
                        <div class="dan-value">
                          {{danPrintData.perfusion_apparatus}}
                        </div>
                      </td>
                      <td class="dan-td-col-3">血流量</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.blood_flow_volume}}
                        </div>
                      </td>
                      <td>ml/min</td>
                      <td class="dan-td-col-3">脱水量</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.dewater_amount}}
                        </div>
                      </td>
                      <td>L</td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="dan-table">
                    <tbody>
                    <tr>
                      <td class="dan-td-col-3">置换液</td>
                      <td class="dan-td">
                        <div class="dan-value">
                          {{danPrintData.displace_liqui}}
                        </div>
                      </td>
                      <td>L</td>
                      <td class="dan-td-col-4">置换方式</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.replacement_way}}
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="dan-table">
                    <tbody>
                    <tr>
                      <td class="dan-td-col-3">抗凝剂</td>
                      <td class="dan-td">
                        <div class="dan-value">
                          {{danPrintData.anticoagulant}}
                        </div>
                      </td>
                      <template v-if="danPrintData.AlPanel.shouji != -1">
                        <td class="dan-td-col-2">首剂</td>
                        <td class="dan-td">
                          <div class="dan-value ">{{danPrintData.anticoagulant_shouji}}
                          </div>
                        </td>
                        <td>{{danPrintData.AlPanel.shouji_unit}}</td>
                      </template>
                      <template v-if="danPrintData.AlPanel.weichi != -1">
                        <td class="dan-td-col-2">维持</td>
                        <td class="dan-td">
                          <div class="dan-value ">{{danPrintData.anticoagulant_weichi}}
                          </div>
                        </td>
                        <td>{{danPrintData.AlPanel.weichi_unit}}</td>
                      </template>
                      <template v-if="danPrintData.AlPanel.zongliang != -1">
                        <td class="dan-td-col-2">总量</td>
                        <td class="dan-td">
                          <div class="dan-value ">{{danPrintData.anticoagulant_zongliang}}
                          </div>
                        </td>
                        <td>{{danPrintData.AlPanel.zongliang_unit}}</td>
                      </template>
                      <template v-if="danPrintData.AlPanel.gaimingcheng != -1">
                        <td class="dan-td-col-3">钙名称</td>
                        <td class="dan-td">
                          <div class="dan-value ">{{danPrintData.anticoagulant_gaimingcheng}}
                          </div>
                        </td>
                        <td>{{danPrintData.AlPanel.gaimingcheng_unit}}</td>
                      </template>
                      <template v-if="danPrintData.AlPanel.gaijiliang != -1">
                        <td class="dan-td-col-3">钙剂量</td>
                        <td class="dan-td">
                          <div class="dan-value ">{{danPrintData.anticoagulant_gaijiliang}}
                          </div>
                        </td>
                        <td>{{danPrintData.AlPanel.gaijiliang_unit}}</td>
                      </template>
                    </tr>
                    </tbody>
                  </table>
                  <table class="dan-table">
                    <tbody>
                    <tr>
                      <td class="dan-td-col-3">干体重</td>
                      <td class="dan-td">
                        <div class="dan-value">
                          {{danPrintData.dry_weight}}
                        </div>
                      </td>
                      <td>kg</td>
                      <td class="dan-td-col-5">透析液流量</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.dialysate_flow}}
                        </div>
                      </td>
                      <td>ml/min</td>
                      <td class="dan-td-col-5">透析液温度</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.dialysate_temperature}}
                        </div>
                      </td>
                      <td>℃</td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="dan-table">
                    <tbody>
                    <tr>
                      <td class="dan-td-col-1">钾</td>
                      <td class="dan-td">
                        <div class="dan-value">
                          {{danPrintData.kalium}}
                        </div>
                      </td>
                      <td>mmol/L</td>
                      <td class="dan-td-col-1">钠</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.sodium}}
                        </div>
                      </td>
                      <td>mmol/L</td>
                      <td class="dan-td-col-1">钙</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.calcium}}
                        </div>
                      </td>
                      <td>mmol/L</td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="dan-table">
                    <tbody>
                    <tr>
                      <td class="dan-td-col-4">碳酸氢盐</td>
                      <td class="dan-td">
                        <div class="dan-value">
                          {{danPrintData.bicarbonate}}
                        </div>
                      </td>
                      <td>mmol/L</td>
                      <td class="dan-td-col-3">葡萄糖</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.glucose}}
                        </div>
                      </td>
                      <td>mmol/L</td>
                      <td class="dan-td-col-3">电导率</td>
                      <td class="dan-td">
                        <div class="dan-value ">{{danPrintData.conductivity}}
                        </div>
                      </td>
                      <td>mmol/L</td>
                    </tr>
                    </tbody>
                  </table>

                </div>
                <div class="dan-title">备注</div>
                <div class="dan-main">
                  <table class="dan-table">
                    <tbody>
                    <tr>
                      <td class="">
                        <div class="">{{danPrintData.remark}}</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="border"></div>

          <el-row>
            <p class="title">接诊评估</p>
            <el-col :span="24">

              <el-form :model="receiveTreatmentAsses" class="demo-form-inline" label-width="110px">
                <el-form-item label="入室方式 : ">
                  <el-radio v-model="receiveTreatmentAsses.way" label="1">步行</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.way" label="2">扶行</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.way" label="3">轮椅</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.way" label="4">平车</el-radio>
                </el-form-item>

                <el-form-item label="病人意识 : ">
                  <el-radio v-model="receiveTreatmentAsses.consciousness" label="1">清醒</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.consciousness" label="2">嗜睡</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.consciousness" label="3">昏迷</el-radio>
                </el-form-item>

                <el-form-item label="病人食欲 : ">
                  <el-radio v-model="receiveTreatmentAsses.appetite" label="1">正常</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.appetite" label="2">减退</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.appetite" label="3">恶心</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.appetite" label="4">呕吐</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.appetite" label="5">腹泻</el-radio>
                </el-form-item>

                <el-form-item label="病人情况 : ">
                  <el-radio v-model="receiveTreatmentAsses.condition" label="1">住院</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.condition" label="2">手术期</el-radio>
                </el-form-item>

                <el-form-item label="体位 : ">
                  <el-radio v-model="receiveTreatmentAsses.posture" label="1">自动体位</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.posture" label="2">平卧位</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.posture" label="3">半卧位</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.posture" label="4">端坐位</el-radio>
                  <el-radio v-model="receiveTreatmentAsses.posture" label="5">躁动不安</el-radio>
                </el-form-item>

                <el-form-item>
                  <p>{{CommitReceiveTreatmentAssesComfirmUserName}}</p>
                  <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="commitReceiveTreatmentAssesRecord">提交</el-button>
                </el-form-item>
              </el-form>

            </el-col>
          </el-row>


          <div class="border"></div>


          <el-row>
            <p class="title">透前评估</p>
            <el-col :span="23">
              <el-form :model="dialysisBeforeAsses" class="demo-form-inline"
                       :label-position="labelPosition"
                       label-width="140px">
                <el-col :span="size">
                  <el-form-item label="血压(mmhg):">
                    <el-input style="width: 60px" v-model="dialysisBeforeAsses.systolic"></el-input>
                    <label>/</label>
                    <el-input style="width: 60px" v-model="dialysisBeforeAsses.diastolic"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="size">
                  <el-form-item label="体温(℃):">
                    <el-input v-model="dialysisBeforeAsses.T"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="size">
                  <el-form-item label="心率(次/分):">
                    <el-input v-model="dialysisBeforeAsses.R"></el-input>
                  </el-form-item>
                </el-col>

                <!--<el-col :span="size">-->
                <!--<el-form-item label="干体重(kg):">-->
                <!--<el-input v-model="dialysisBeforeAsses.dryWeight"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="size">-->
                <!--<el-form-item label="上次透后体重(kg):">-->
                <!--<el-input v-model="dialysisBeforeAsses.lastdialysisAfterWeight"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->

                <!--<el-col :span="size">-->
                <!--<el-form-item label="称重方式:">-->
                <!--<el-select v-model="dialysisBeforeAsses.weightWay" placeholder="请选择">-->
                <!--<el-option label="正常" value="1"></el-option>-->
                <!--<el-option label="卧床" value="2"></el-option>-->
                <!--<el-option label="拒测" value="3"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="size">-->
                <!--<el-form-item label="透前称重(kg):">-->
                <!--<el-input v-model="dialysisBeforeAsses.dialysisbeforeWeighed"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->

                <el-col :span="size">
                  <el-form-item label="附加物重(kg):">
                    <el-input v-model="dialysisBeforeAsses.clothingWeight"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item label="透前体重(kg):">
                    <el-input v-model="dialysisBeforeAsses.dialysisbeforeWeight"></el-input>
                  </el-form-item>
                </el-col>

                <!--<el-col :span="size">-->
                <!--<el-form-item label="体重增加(kg):">-->
                <!--<el-input v-model="dialysisBeforeAsses.weightAdd"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="size">-->
                <!--<el-form-item label="预增脱水量(L):">-->
                <!--<el-input v-model="dialysisBeforeAsses.PreDrinkingAmount"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="size">-->
                <!--<el-form-item label="超滤总量(L):">-->
                <!--<el-input v-model="dialysisBeforeAsses.totalAmountOfUltrafiltration"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->


                <el-col :span="size">
                  <div @click="showDialog('dialysisInterval')">
                    <el-form-item label="透析间期:">
                      <el-input v-model="dialysisBeforeAsses.dialysisInterval"></el-input>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="size">
                  <div @click="showDialog('afterTheLastDialysis')">
                    <el-form-item label="前次透析后:">
                      <el-input v-model="dialysisBeforeAsses.afterTheLastDialysis"></el-input>
                    </el-form-item>
                  </div>

                </el-col>
                <el-col :span="size">
                  <div @click="showDialog('dialysisBeforePreExistingSymptoms')">

                    <el-form-item label="透前症状:">
                      <el-input v-model="dialysisBeforeAsses.preExistingSymptoms"></el-input>

                    </el-form-item>
                  </div>

                </el-col>
                <el-col :span="size">
                  <div @click="showDialog('dialysisBeforeGuilty')">
                    <el-form-item label="内瘘:">
                      <el-input v-model="dialysisBeforeAsses.guilty"></el-input>
                    </el-form-item>
                  </div>

                </el-col>
                <el-col :span="size">
                  <div @click="showDialog('dialysisBeforeCatheter')">
                    <el-form-item label="导管:">
                      <el-input v-model="dialysisBeforeAsses.catheter"></el-input>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="size">
                  <div @click="showDialog('dialysisBeforeComplications')">
                    <el-form-item label="合并症:">
                      <el-input v-model="dialysisBeforeAsses.complications"></el-input>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="size">
                    <el-form-item label="血管通路部位:">
                      <el-select v-model="dialysisBeforeAsses.blood_access_part_id" placeholder="请选择">
                        <el-option
                          v-for="item in vascularAccess"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="size">
                    <el-form-item label="血管通路操作:">
                      <el-select v-model="dialysisBeforeAsses.blood_access_part_opera_id" placeholder="请选择">
                        <el-option
                          v-for="item in vascularAccessDesc"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>


                <el-col :span="24">
                    <el-form-item label="出血:">
                      <el-radio v-model="dialysisBeforeAsses.is_hemorrhage" label="2">否</el-radio>
                      <el-radio v-model="dialysisBeforeAsses.is_hemorrhage" label="1">是</el-radio>
                    </el-form-item>
                </el-col>


                <el-col :span="24" v-show="dialysisBeforeAsses.is_hemorrhage==1">
                    <el-form-item label=""  prop="hemorrhage_value">
                      <el-checkbox-group v-model="dialysisBeforeAsses.hemorrhage_value">
                        <el-checkbox v-for="item in hemorrhageOptions"  :label="item.label" :key="item.value" :value="item.label">{{item.label}}</el-checkbox>
                      </el-checkbox-group>

                    </el-form-item>
                </el-col>
                <el-col :span="24" v-show="dialysisBeforeAsses.is_hemorrhage==1">
                    <el-form-item label="">
                      <el-input v-model="dialysisBeforeAsses.hemorrhage_other" placeholder="若有其他出血情况，请填写"></el-input>
                    </el-form-item>
                </el-col>

                <el-col style="width: 100%" :span="24">
                  <el-form-item label="备注 : ">
                    <el-input type="textarea" :row="5" v-model="dialysisBeforeAsses.remark"
                              placeholder="请输入内容">
                    </el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="22">
                  <el-form-item>
                    <p>{{DialysisBeforeAssesComfirmUserName}}</p>
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitDialysisBeforeAssesForm">提交</el-button>
                  </el-form-item>
                </el-col>

              </el-form>
            </el-col>
          </el-row>


          <div class="border"></div>

          <el-row>
            <p class="title">临时医嘱</p>
            <el-col :span="24">
              <el-col style="margin:0 25px 25px 0;">
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="success" @click="stat_order_action">新增医嘱</el-button>
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="execution_action">执行医嘱</el-button>
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="danger" @click="delete_action">删除</el-button>
              </el-col>

              <el-table
                ref="singleTable"
                highlight-current-row
                :data="adviceTableData"
                @row-click="onRowClick"
                :row-class-name="tableRowClassName"
                border
                style="width: 100%;margin:0 0 30px 0;">
                <!--<el-table-column-->
                  <!--prop="advice_doctor"-->
                  <!--label="开嘱医生"-->
                  <!--align="center"-->
                <!--&gt;-->
                <!--</el-table-column>-->

                <el-table-column key="advice_doctor" label="开嘱医生" min-width="80"  property="advice_doctor" align="center">
                  <template slot-scope="scope">
                    {{getXuserName(scope.row.advice_doctor)}}
                  </template>
                </el-table-column>


                <el-table-column
                  prop="start_time"
                  label="开始时间"
                  align="center"
                >
                </el-table-column>

                <el-table-column
                  prop="advice_content"
                  align="center"
                  label="医嘱内容">
                </el-table-column>

                <el-table-column
                  prop="execution_time"
                  align="center"
                  label="执行时间">
                </el-table-column>
                <el-table-column
                  prop="execution_staff"
                  align="center"
                  label="执行护士">
                  <template slot-scope="scope">
                    <span v-if="scope.row.parent_id==0">{{getXuserName(scope.row.execution_staff)}}</span>
                  </template>

                </el-table-column>
                <el-table-column
                  prop="checker"
                  align="center"
                  label="核对人员">
                  <template slot-scope="scope">
                    <span v-if="scope.row.parent_id==0">{{getXuserName(scope.row.checker)}}</span>
                  </template>
                </el-table-column>

              </el-table>
            </el-col>
          </el-row>
          <div class="border"></div>

          <el-row>
            <el-col :span="23">
              <p class="title">透析上机</p>
              <el-form>
                <el-form-item>
                  <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="startDialysis">执行上机</el-button>
                </el-form-item>
              </el-form>
            </el-col>

          </el-row>

          <div class="border"></div>
          <el-row>
            <p class="title">双人核对</p>
            <el-col :span="24">
              <el-col style="margin:0 0 25px 0;">
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="commitDoubleCheck">确定</el-button>
              </el-col>

              <el-form :model="doubleReview" class="demo-form-inline" label-width="110px">
                <el-form-item label="透析物品核查 : ">
                  <el-radio v-model="doubleReview.dialysis_item_check" label="1">正确</el-radio>
                  <el-radio v-model="doubleReview.dialysis_item_check" label="2">错误</el-radio>
                  <label style="margin-left: 30px;color: #2d2f33">差错 : </label>
                  <el-input style="width: 60%;" v-model="doubleReview.dialysis_item_desc"></el-input>
                </el-form-item>

                <el-form-item label="透析参数核查 : ">
                  <el-radio v-model="doubleReview.dialysis_parameter_check" label="1">正确</el-radio>
                  <el-radio v-model="doubleReview.dialysis_parameter_check" label="2">错误</el-radio>
                  <label style="margin-left: 30px;color: #2d2f33">差错 : </label>
                  <el-input style="width: 60%;" v-model="doubleReview.dialysis_parameter_desc"></el-input>
                </el-form-item>

                <el-form-item label="血管通路核查 : ">
                  <el-radio v-model="doubleReview.vascular_access_verification" label="1">正确</el-radio>
                  <el-radio v-model="doubleReview.vascular_access_verification" label="2">错误</el-radio>
                  <label style="margin-left: 30px;color: #2d2f33">差错 : </label>
                  <el-input style="width: 60%;" v-model="doubleReview.vascular_access_desc"></el-input>
                </el-form-item>

                <el-form-item label="管道连接核查 : ">
                  <el-radio v-model="doubleReview.pipeline_connection_check" label="1">正确</el-radio>
                  <el-radio v-model="doubleReview.pipeline_connection_check" label="2">错误</el-radio>
                  <label style="margin-left: 30px;color: #2d2f33">差错 : </label>
                  <el-input style="width: 60%;" v-model="doubleReview.pipeline_connection_desc"></el-input>
                </el-form-item>

                <p>{{DoubleCheckComfirmUserName}}</p>
              </el-form>

            </el-col>
          </el-row>
          <div class="border"></div>

          <el-row>
            <p class="title">透析监测</p>
            <el-col :span="24">
              <el-col style="margin:0 0 25px 0;">
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="success" @click="isVisibiltyForMonitorDialog = true">新增监测</el-button>
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="danger" @click="delMonitor">删除</el-button>
              </el-col>


              <el-table
                :data="monitoringRecordTableData"
                border
                highlight-current-row
                @row-click="onMonitorRowClick"
                :row-class-name="tableMonitorRowClassName"
                style="margin:0 0 25px 0;">
                <el-table-column
                  prop="time"
                  label="时间"
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="PB"
                  label="血压(mmhg)"
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="pulse_frequency"
                  align="center"
                  label="脉率(次/分)"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="breathing_rate"
                  align="center"
                  width="100"
                  label="呼吸(次/分)">
                </el-table-column>
                <el-table-column
                  prop="blood_flow_volume"
                  align="center"
                  width="100"
                  label="血流量(ml/min)">
                </el-table-column>
                <el-table-column
                  prop="venous_pressure"
                  label="静脉压(mmhg)"
                  align="center"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="transmembrane_pressure"
                  label="跨膜压(mmhg)"
                  align="center"
                  width="100">
                </el-table-column>

                <el-table-column
                  prop="ultrafiltration_volume"
                  align="center"
                  width="100"
                  label="超滤量(ml/h)">
                </el-table-column>
                <el-table-column
                  prop="sodium_concentration"
                  align="center"
                  width="100"
                  label="钠浓度(mmol/L)">
                </el-table-column>
                <el-table-column
                  prop="dialysate_temperature"
                  align="center"
                  width="100"
                  label="透析液温度（℃)">
                </el-table-column>
                <el-table-column
                  prop="replacement_rate"
                  label="置换率(ml/min)"
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="displacement_quantity"
                  label="置换量(L)"
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="symptom"
                  align="center"
                  width="120"
                  label="病情变化">
                </el-table-column>
                <el-table-column
                  prop="dispose"
                  align="center"
                  width="120"
                  label="处理">
                </el-table-column>
                <el-table-column
                  prop="result"
                  width="120"
                  align="center"
                  label="结果">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <div class="border"></div>

          <el-row>
            <el-col :span="23">
              <p class="title">透析下机</p>
              <el-form>
                <el-form-item>
                  <el-button  :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="finishDialysis">执行下机</el-button>
                </el-form-item>
              </el-form>
            </el-col>

          </el-row>
          <div class="border"></div>

          <el-row>
            <p class="title">透后评估</p>
            <el-col :span="24">
              <el-form :model="dialysisAfterAsses" class="demo-form-inline"
                       :label-position="labelPosition"
                       label-width="140px">


                <el-col :span="size">
                  <el-form-item label="透后体重(kg):">
                    <el-input v-model="dialysisAfterAsses.weightAfterDialysi"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item label="体重减少(kg):">
                    <el-input v-model="dialysisAfterAsses.weightReduce"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="size">
                  <el-form-item label="体温(℃) : ">
                    <el-input v-model="dialysisAfterAsses.T"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="size">
                  <el-form-item label="血压(mmhg) : ">
                    <!--<el-select v-model="dialysisAfterAsses.part" :value="dialysisAfterAsses.part" placeholder="请选择"-->
                    <!--style="width:50%;">-->
                    <!--<el-option v-for="item in bpTypeData" :key="item.id" :label="item.text"-->
                    <!--:value="item.id"></el-option>-->
                    <!--</el-select>-->
                    <el-input style="width: 70px" v-model="dialysisAfterAsses.systolic"></el-input>
                    <label>/</label>
                    <el-input style="width: 70px" v-model="dialysisAfterAsses.diastolic"></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="size">
                <el-form-item label="脉率(次/分) : ">
                <el-input v-model="dialysisAfterAsses.P"></el-input>
                </el-form-item>
                </el-col>

                <!-- <el-col :span="size">
                  <el-form-item label="心率(次/分) : ">
                    <el-input v-model="dialysisAfterAsses.R"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="size">
                  <el-form-item label="实际超滤量(ml) : ">
                    <el-input v-model="dialysisAfterAsses.actualUfv"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="size">
                  <el-form-item label="实际置换量(L) : ">
                    <el-input v-model="dialysisAfterAsses.actualSubstituteFluidvolume"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="size">
                  <el-form-item label="实际治疗时长 : ">
                    <el-input style="width:30%;" v-model="dialysisAfterAsses.actualtreatHour"></el-input>
                    <label>h</label>
                    <el-input style="width:30%;" v-model="dialysisAfterAsses.actualtreatmin"></el-input>
                    <label>min</label>
                  </el-form-item>
                </el-col>

                <el-col :span="size">
                  <div @click="showDialog('cruor')">

                    <el-form-item label="凝血 : ">
                      <el-input v-model="dialysisAfterAsses.cruor" :value="dialysisAfterAsses.cruor"
                                :readonly="true"></el-input>
                    </el-form-item>
                  </div>

                </el-col>
                <el-col :span="size">
                  <div @click="showDialog('symptomsAfterDialysi')">
                    <el-form-item label="透后症状 : ">
                      <el-input v-model="dialysisAfterAsses.symptomsAfterDialysi"
                                :value="dialysisAfterAsses.symptomsAfterDialysi" :readonly="true"></el-input>
                    </el-form-item>
                  </div>

                </el-col>

                <el-col :span="size">
                  <div @click="showDialog('dialysateVolume')">
                    <el-form-item label="透析中入量 : ">
                      <el-input v-model="dialysisAfterAsses.dialysateVolume" :value="dialysisAfterAsses.dialysateVolume"
                                :readonly="true"></el-input>
                    </el-form-item>
                  </div>

                </el-col>
                <el-col :span="size">
                  <div @click="showDialog('fistula')">
                    <el-form-item label="内瘘 : ">
                      <el-input v-model="dialysisAfterAsses.fistula" :value="dialysisAfterAsses.fistula"
                                :readonly="true"></el-input>

                    </el-form-item>
                  </div>

                </el-col>


                <el-col :span="size">
                    <el-form-item label="血管通路部位:">
                      <el-select v-model="dialysisAfterAsses.blood_access_part_id" placeholder="请选择">
                        <el-option
                          v-for="item in vascularAccess"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="size">
                    <el-form-item label="血管通路操作:">
                      <el-select v-model="dialysisAfterAsses.blood_access_part_opera_id" placeholder="请选择">
                        <el-option
                          v-for="item in vascularAccessDesc"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-col>


                <el-col :span="size">
                  <div @click="showDialog('pipe')">
                    <el-form-item label="导管 : ">
                      <el-input v-model="dialysisAfterAsses.pipe" :value="dialysisAfterAsses.pipe"
                                :readonly="true"></el-input>
                    </el-form-item>
                  </div>

                </el-col>
                <el-col :span="size">
                  <div @click="showDialog('complications')">
                    <el-form-item label="并发症 : ">
                      <el-input v-model="dialysisAfterAsses.complications" :value="dialysisAfterAsses.complications"
                                :readonly="true"></el-input>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="拔针后穿刺点渗血:">
                      <el-radio v-model="dialysisAfterAsses.puncture_point_oozing_blood" label="1">有</el-radio>
                      <el-radio v-model="dialysisAfterAsses.puncture_point_oozing_blood" label="2">无</el-radio>
                    </el-form-item>
                    <el-form-item label="穿刺处血肿:">
                      <el-radio v-model="dialysisAfterAsses.puncture_point_haematoma" label="1">有</el-radio>
                      <el-radio v-model="dialysisAfterAsses.puncture_point_haematoma" label="2">无</el-radio>
                    </el-form-item>
                    <el-form-item label="压迫后内瘘震颤:">
                      <el-radio v-model="dialysisAfterAsses.internal_fistula_tremor_ac" label="1">存在</el-radio>
                      <el-radio v-model="dialysisAfterAsses.internal_fistula_tremor_ac" label="2">减弱</el-radio>
                      <el-radio v-model="dialysisAfterAsses.internal_fistula_tremor_ac" label="3">无</el-radio>
                    </el-form-item>
                </el-col>




                <el-col :span="24">
                    <el-form-item label="患者去向:">
                      <el-radio v-model="dialysisAfterAsses.patient_gose" label="1">离院</el-radio>
                      <el-radio v-model="dialysisAfterAsses.patient_gose" label="2">留观</el-radio>
                      <el-radio v-model="dialysisAfterAsses.patient_gose" label="3">住院</el-radio>
                    </el-form-item>
                </el-col>

                <el-col :span="12" v-show="dialysisAfterAsses.patient_gose==3">
                  <el-form-item label="科室 : ">
                    <el-input style="width:100%;" v-model="dialysisAfterAsses.inpatient_department"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24" v-show="dialysisAfterAsses.patient_gose==3">
                    <el-form-item label="交待病房护士/患者/陪人观察内容"  prop="observation_content_value">
                      <el-checkbox-group v-model="dialysisAfterAsses.observation_content_value">
                        <el-checkbox v-for="item in observationContentOptions"  :label="item.label" :key="item.value" :value="item.label">{{item.label}}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-show="dialysisAfterAsses.patient_gose==3">
                    <el-form-item label="">
                      <el-input v-model="dialysisAfterAsses.observation_content_other" placeholder="若有观察内容，请填写"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="20">

                  <el-form-item label="备注 : ">
                    <el-input type="textarea" :rows="5"
                              placeholder="请输入内容"  v-model="dialysisAfterAsses.remark">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="20">

                  <el-form-item>
                    <p>{{SubmitDialysisAfterAssesComfirmUserName}}</p>

                    <el-button  :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitDialysisAfterAssesForm">提交</el-button>
                  </el-form-item>
                </el-col>

              </el-form>
            </el-col>
          </el-row>


          <div class="border"></div>

          <el-row>
            <p class="title">治疗小结</p>
            <el-col :span="24">
              <el-form ref="dialysisSummary" label-width="140px" class="demo-form-inline"
                       :model="dialysisSummary">

                <el-col :span="8">
                  <el-form-item label="透后宣教 : " prop="text">
                    <el-select @change="dialysisAfterTeachSelectChange" style="width:100%;"
                               v-model="dialysisSummary.text" placeholder="请选择">
                      <el-option v-for="(s, index) in summary" :label="s.text" :value="s.value"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="16">
                  <el-form-item label="" prop="propagandaAndEducationContent" label-width="20px">
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"
                      v-model="dialysisSummary.propagandaAndEducationContent">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="透析小结 : " prop="text2">
                    <el-select @change="dialysisSummarySelectChange" style="width:100%;" v-model="dialysisSummary.text2"
                               placeholder="请选择">
                      <el-option v-for="(s, index) in summary" :label="s.text" :value="s.value"
                                 :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="16">
                  <el-form-item label="" prop="summaryContent" label-width="20px">
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"
                      v-model="dialysisSummary.summaryContent"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item>
                    <p>{{DialysisSummaryComfirmUserName}}</p>
                    <el-button  :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="submitSummary">提交</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-col>
          </el-row>
          <div class="border"></div>


        </el-main>
      </el-container>
    </el-container>


    <!--<stat-order-dialog ref="stat_order_dialog"></stat-order-dialog>-->

  </div>
</template>

<style scoped>

  .border {
    border-top: 1px #dcdfe6 solid;
  }

  .title {
    font-size: 20px;
    text-align: center;
  }


</style>


<script>
  import CheckBoxDialog from './Dialog/CheckBoxDialog'
  import InnerDialog from './Dialog/InnerDialog'
  import AddMonitor from './Dialog/AddMonitor'
  import DryWeightDialog from './Dialog/DryWeightDialog'
  import FormDialog from './Dialog/FormDialog'
  import {createDryWeight, getDryWeights} from "@/api/patient";
  import { fetchAllDoctorAndNurse,fetchAllAdminUsers } from "@/api/doctor";



  import {
    PatientInfo,
    doctorAndNurseList,
    commitDailysisRecord,
    commitDailysisSolution,
    CreateDoctorAdvice,
    getDoctorAdviceById,
    editDoctorAdviceById,
    CreateMonitor,
    GetAllZone,
    PostStartRecordInfo,
    GetGlobalInfo,
    GetDeviceInfo,
    delMonitor
  } from "@/api/dialysis";
  import {uParseTime} from "@/utils/tools";
  import {
    getAdviceConfig,
    getDoctorAdviceList,
    EditDoctorAdvice,
    StopDoctorAdvice,
    DeleteDoctorAdvice
  } from "@/api/advice";
  import print from "print-js";

  import {getDataConfig} from '@/utils/data'


  const bpTypeData = [
    {id: 1, text: '上肢', value: 1},
    {id: 2, text: '下肢', value: 2},
    {id: 3, text: '拒测', value: 3},
    {id: 4, text: '测不出来', value: 4},

  ]

  const defalutValue = {
    "eats": 0,
    "transfusion": 0,
    "bloodTransfusion":0,
    "washPipe": 0
  }



  export default {

    beforeCreate() {
      console.log("beforeCreate")
    },
    created() {


      console.log("created")

      var ptime = Math.round(new Date().getTime() / 1000);
      this.danPrintData.time = uParseTime(ptime, '{y}-{m}-{d} {h}:{i}');


      var xtuser = this.$store.getters.xt_user;
      this.orgname = xtuser.org.org_name;
      this.adminusername = xtuser.user.user_name;

    },
    beforeMount() {
      console.log("beforeMount")
    },

    mounted() {
      this.initData();

      var _this = this; //声明一个变量指向vue实例this,保证作用域一致
      this.timer = setInterval(function () {
        var ptime = Math.round(new Date().getTime() / 1000);
        _this.danPrintData.time = uParseTime(ptime, '{y}-{m}-{d} {h}:{i}');
      }, 60000);

    },

    beforeUpdate() {
      console.log("beforeUpdate")
    },
    updated() {
      console.log("updated")
    },
    beforeDestroy() {
      console.log("beforeDestroy")
    },
    destroyed() {
      console.log("destroyed")
    },


    components: {
      CheckBoxDialog,
      FormDialog,
      InnerDialog,
      DryWeightDialog,
      AddMonitor

    },
    data() {

      return {
        hemorrhageOptions:[
          {value:1, label:'穿刺点渗血'},
          {value:2, label:'牙龈出血'},
          {value:3, label:'消化道出血'},
          {value:4, label:'女性经期'},
        ],
        observationContentOptions:[
          {value:1, label:'意识状态'},
          {value:2, label:'生命体征'},
          {value:3, label:'内瘘搏动/渗血'},
          {value:4, label:'导管固定/穿刺口渗血'},
          {value:5, label:'动静脉直接穿刺口渗血/肢端循环情况'},
        ],
        adminusername:'',
        orgname:'',

        drugOptions: [],
        deliveryWayOptions: [],
        executionFrequencyOptions: [],
        dialysisTime: "",
        dialysisPrescriptionIsComfirm: false,
        receiveTreatmentAssesIsComfirm: false,
        dialysisBeforeAssesIsComfirm: false,
        doctorAdviceIsComfirm: false,
        doubleCheckIsComfirm: false,
        monitoringRecordIsComfirm: false,
        dialysisAfterAssesIsComfirm: false,
        dialysisSummaryIsComfirm: false,

        dialysisTimeShow: new Date(2018,1,1,3,0),


        dialysisId: 0,
        dialysisStatus: -1,

        DialysisPrescriptionComfirmUserName: "",
        CommitReceiveTreatmentAssesComfirmUserName: "",
        DialysisBeforeAssesComfirmUserName: "",
        DoubleCheckComfirmUserName: "",
        SubmitDialysisAfterAssesComfirmUserName: "",
        DialysisSummaryComfirmUserName: "",
        currentMonitorTableIndex: -1,

        recordStatus: -1,
        dialogTitle: "新增",
        dialogFormVisible: false,
        isEdit: false,
        searchKey: "",

        //透析监控
        MonitorForm: {
          monitoring_date: "",
          operate_date: "",
          monitoring_time: "",
          pulse_frequency: "",
          breathing_rated: "",
          blood_pressure_type: "",
          systolic_blood_pressure: "",
          diastolic_blood_pressure: "",
          blood_flow_volume: "",
          venous_pressure: "",
          arterial_pressure: "",
          transmembrane_pressure: "",
          Transme: "",
          ultrafiltration_rate: "",
          ultrafiltration_volume: "",
          sodium_concentration: "",
          dialysate_temperature: "",
          replacement_rate: "",
          displacement_quantity: "",
          ktv: "",
          monitoring_nurse: "",
          venous_pressure_unit: "mmhg",
          transmembrane_pressure_unit: "mmhg",
        },

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
              text: "清空",
              onClick(picker) {
                picker.$emit("pick");
              }
            }
          ]
        },
        adviceType: 1,
        adviceTypeArr: [
          {value: 2, label: "临时", id: "1"},
        ],
        stopType: 0,
        stopTypeArr: [
          {value: 0, label: "全部"},
          {value: 2, label: "未停止"},
          {value: 1, label: "已停止"},
        ],
        adviceTableData: [],
        isShow: false,
        bpTypeData: bpTypeData,
        isSelected: false,
        adviceForm: {
          advice_type: "",
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
          advice_doctor: this.$store.getters.xt_user.user.user_name,
          remark: "",
          parent_id: 0,
          num: 0,
          checker: "",
          execution_time: "",
          execution_staff: "",
        },
        executionForm: {
          advice_doctor: this.$store.getters.xt_user.user.user_name,
          start_time: "",
          checker: "",
          // execution_time: this.$store.getters.xt_user.user.user_name,
          // execution_staff: this.$store.getters.xt_user.user.user_name,
          content: "",
          id: 0,
          parent_id: 0,


        },


        stopForm: {
          id: 0,
          stop_time: "",
          stop_reason: "",
        },
        adviceRules: {
          advice_type: [{required: true, message: "请选择医嘱类型", trigger: 'blur'},],
          advice_date: [{required: true, message: "请选择医嘱时间", trigger: 'blur'},],
          start_time: [{required: true, message: "请选择开始时间", trigger: 'blur'},],
          advice_name: [{required: true, message: "请填写医嘱名称", trigger: 'blur'},],
          // advice_doctor: [{required: true, message: "请选择开嘱医生", trigger: 'blur'},],

        },
        stopRules: {
          stop_time: [{required: true, message: "请选择停止时间", trigger: 'blur'},],
        },
        listQuery: {
          start_time: "",
          end_time: "",
          advice_type: 1,
          stop_state: "",
          keywords: "",
          id: 0
        },


        summaryUncomfirm: "未确定",
        patientId: 0,
        //左侧栏初始化数据
        record_date: "",
        timeValue: 1,
        sickAreaValue: 1,
        SchedualPatientsTableData: [],
        //左侧栏下拉选项框数据
        sickAreaData: [],
        summary: [],
        anticoagulantsConfit: {},

        modeOptions: null,
        replacementWays: [],
        //排版患者列表
        dialysisList: [],
        deviceList: [],
        doctorList: [],
        nurseList: [],
        bloodFilters: [],
        perfusionApparatus: [],
        hemodialysisMachines: [],
        vascularAccess: [],
        vascularAccessDesc: [],
        weightList: [],

        lastValue: 0,

        //患者信息
        userInfo: {
          radio: 1,
          userName: "",
          gender: "",
          age: "",
          label: "门诊",
          dialysisNumber: "",
          inpatientWard: "",
          bed: "",
          dialysisCount: "",
          diagnosis: "",
          entryMethod: "",
          firstDialysisTime: "",
          dialysisTime: "",
          admission_number: ""
        },

        anticoagulant: {
          id: 0,
          name: "",
          type: 1,
          shouji: 1,
          weichi: 1,
          zongliang: 1,
          gaimingcheng: -1,
          gaijiliang: -1,
          shouji_unit: "mg",
          weichi_unit: "mg/h",
          zongliang_unit: "mg",
          gaimingcheng_unit: "",
          gaijiliang_unit: ""
        },


        dialysisPrescription: {
          module: "dialysisPrescription",
          gaijiliang: "",
          gaimingcheng: "",
          machine: "",
          machineType: "",
          targetDewateringAmount: "",
          prescriptionDehydration: "",
          anticoagulant: "",
          firstDose: "",
          maintenance: "",
          total: "",
          dialysisTime: "",
          dialysisMode: "",
          displacesTotal: "",
          displacesMethod: "",
          hemodialysisDevice: "",
          bloodFilterDevice: "",
          hemoperfusion: "",
          adjustDryWeight: "",
          vascularAccess: "",
          vascularAccessDesc: "",
          bloodFlow: "",
          displaceLiqui: "",
          dialysateFlow: "",
          kalium: "",
          sodium: "",
          calcium: "",
          bicarbonate: "",
          glucose: "",
          remark: "",
          conductivity: "",
          dialysate_temperature: "",
          dialysis_duration_hour:'',
          dialysis_duration_minute:'',
          target_ultrafiltration:'',
          dialysate_formulation:'1',
        },

        //透前评估
        dialysisBeforeAsses: {
          module: "dialysisBeforeAsses",
          T: "",
          P: "",
          R: "",
          part: "",
          systolic: "",
          diastolic: "",
          dryWeight: "",
          lastdialysisAfterWeight: "",
          weightWay: "",
          dialysisbeforeWeighed: "",
          clothingWeight: "",
          dialysisbeforeWeight: "",
          weightAdd: "",
          PreDrinkingAmount: "",
          totalAmountOfUltrafiltration: "",
          dialysisInterval: "",
          afterTheLastDialysis: "",
          preExistingSymptoms: "",
          guilty: "",
          catheter: "",
          complications: "",
          remark:"",
          is_hemorrhage:'2',
          hemorrhage_value:[],
          hemorrhage:'',
          hemorrhage_other:'',
          blood_access_part_id:'',
          blood_access_part_opera_id:'',

        },
        dialysisbeforeWeighedIsDisabled: false,
        clothingWeightIsDisabled: false,
        dialysisbeforeWeightIsDisabled: false,
        weightAddIsDisabled: false,


        //接诊评估
        receiveTreatmentAsses: {
          module: "receiveTreatmentAsses",
          way: '1',
          consciousness: '1',
          appetite: '1',
          condition: '1'
        },


        //双人检查
        doubleReview: {
          module: "doubleReview",
          dialysis_item_check: '1',
          dialysis_parameter_check: '1',
          vascular_access_verification: '1',
          pipeline_connection_check: '1',
          dialysis_item_desc: '',
          dialysis_parameter_desc: '',
          vascular_access_desc: '',
          pipeline_connection_desc: '',
          collator: '',
        },


        tempDoctorAdvice: {},

        monitoringRecordTableData: [],

        watchRecord: {},


        treatmentSummary: {},


        treatmentMode: {
          id: 1,
          name: "HD",
          dialysis_duration: 1,
          replacement_way: 2,
          hemodialysis_machine: 1,
          blood_filter: 2,
          perfusion_apparatus: 2,
          blood_flow_volume: 1,
          dialysate_flow: 1,
          kalium: 1,
          sodium: 1,
          calcium: 1,
          bicarbonate: 1
        },


        tableData3: [],
        content: "",
        content1: "",

        size: 8,
        labelPosition: 'right',
        data_value: '',
        input1: '',
        value12: '',
        formInline: {
          user: '',
          region: ''
        },
        radio: '1',
        adminUserOptions:null,
        doctorOptions:[],


        isVisibiltyForMonitorDialog: false,


        isVisibiltyForSymptomsDialog: false,
        isVisibiltyForDealDialog: false,
        isVisibiltyForResultsDialog: false,
        dialogSymptomsTitle: "症状",
        dialogDealTitle: "处理",
        dialogResultsTitle: "结果",
        symptomsData: '',
        dealData: '',
        resultsData: '',

        symptomsArray: [],
        dealArray: [],
        resultsArray: [],


        dialogFormExecutionVisible: false,


        //透前评估（弹窗相关）
        dialogDialysisIntervalTitle: '透析期间',
        dialysisIntervalData: [],
        isVisibiltyForDialysisIntervalDialog: false,
        dialogAfterTheLastDialysisTitle: '前次透析后',
        afterTheLastDialysiData: [],
        isVisibiltyForAfterTheLastDialysisDialog: false,
        dialogPreExistingSymptomsTitle: '透前症状',
        preExistingSymptomsData: [],
        isVisibiltyForPreExistingSymptomsDialog: false,
        dialogDialysisBeforeAssesGuiltyTitle: '内瘘',
        DialysisBeforeAssesGuiltyData: [],
        isVisibiltyForDialysisBeforeAssesGuiltyDialog: false,
        dialogDialysisBeforeAssesCatheterTitle: '导管',
        dialysisBeforeAssesCatheterData: [],
        isVisibiltyForDialysisBeforeAssesCatheterDialog: false,
        dialogDialysisBeforeAssesComplicationsTitle: '合并症',
        dialysisBeforeAssesComplicationsData: [],
        isVisibiltyForDialysisBeforeAssesComplicationsDialog: false,


        //透后评估（弹窗相关）
        cruorData: [],
        symptomsAfterDialysiData: [],
        dialysateVolumeData: defalutValue,
        fistulaData: [],
        pipeData: [],
        complicationsData: [],
        isVisibiltyForCruorDialog: false,
        isVisibiltyForSymptomsAfterDialysiDialog: false,
        isVisibiltyForDialysateVolumeDialog: false,
        isVisibiltyForFistulaDialog: false,
        isVisibiltyForPipeDialog: false,
        isVisibiltyForcomplicationsDialog: false,
        isVisibiltyAdjustDryWeightDialog: false,
        dialogCruorTitle: "凝血",
        dialogSymptomsAfterDialysiTitle: "透后症状",
        dialogDialysateVolumeTitle: "透析中入量",
        dialogFistulaTitle: '内瘘',
        dialogPipeTitle: "导管",
        dialogComplicationsTitle: "并发症",

        dialogAdjustWeightTitle: "调整干体重",
        dialogMonitorTitle: "监测记录",
        //透后评估


        dialysisAfterAsses: {
          module: "dialysisAfterAsses",
          T: "",
          P: "",
          R: "",
          part: "",
          systolic: "",
          diastolic: "",
          actualUfv: "",
          actualSubstituteFluidvolume: "",
          actualtreatHour: "",
          actualtreatmin: "",
          weighWay: "",
          weightAfterDialysi: "",
          weightReduce: "",
          cruor: "",
          symptomsAfterDialysi: "",
          dialysateVolume: "",
          dialysisIntakesFeed: "",
          dialysisIntakesTransfusion: "",
          dialysisIntakesBloodTransfusion: "",
          dialysisIntakesWashpipe: "",
          fistula: "",
          pipe: "",
          complications: "",
          remark: "",
          puncture_point_oozing_blood:'2',
          puncture_point_haematoma:'2',
          internal_fistula_tremor_ac:'3',
          patient_gose:'',
          inpatient_department:'',
          observation_content:'',
          observation_content_other:'',
          observation_content_value:[],

          // evaluator: "",
        },

        //透析小结
        dialysisSummary: {
          module: "summary",
          text: "",
          propagandaAndEducationContent: "",
          text2: "",
          summaryContent: "",
          changeMedicalNurse: "",
          treatNurse: "",
          checkStaff: "",
          deboardNurse: "",
          treatDoctor: "",
        },

        SubAdvice: [],

        //医嘱表格当前选中的值
        selectedAdviceData: null,
        currentIndex: -1,

        danPrintData: {
          time: '',
          doctor: '',
          dialyzer: '',
          modelName: '',
          perfusion_apparatus: '',
          blood_flow_volume: '',
          dewater_amount: '',
          displace_liqui: '',
          replacement_way: '',
          anticoagulant: '',
          anticoagulant_shouji: '',
          anticoagulant_weichi: '',
          anticoagulant_zongliang: '',
          anticoagulant_gaimingcheng: '',
          anticoagulant_gaijiliang: '',
          dry_weight: '',
          dialysate_flow: '',
          dialysate_temperature: '',
          kalium: '',
          sodium: '',
          calcium: '',
          bicarbonate: '',
          glucose: '',
          conductivity: '',
          remark: '',
          AlPanel: {
            id: 0,
            name: "",
            type: 1,
            shouji: 2,
            weichi: 2,
            zongliang: 2,
            gaimingcheng: -1,
            gaijiliang: -1,
            shouji_unit: "mg",
            weichi_unit: "mg/h",
            zongliang_unit: "mg",
            gaimingcheng_unit: "",
            gaijiliang_unit: ""
          },
          weight_before: '',
          additional_weight: '',
          systolic_blood_pressure: '',
          diastolic_blood_pressure: '',
          breathing_rate: '',

        },

      }
    },
    methods: {
      printOrder(){
        var xtdate = uParseTime(this.record_date, '{y}-{m}-{d}');
        this.$router.push('/dialysis/print?xtdate='+xtdate+'&xtno='+this.userInfo.dialysisNumber);
      },
      selectDialysisPrescriptionDialysisTime(val){
        var valTime = val.split(':');
        this.dialysisPrescription.dialysisTime =  valTime[0] + '.' + valTime[1];
        this.dialysisPrescription.dialysis_duration_hour =  valTime[0];
        this.dialysisPrescription.dialysis_duration_minute =  valTime[1];
      },
      setTQdataFromData(prescription) {
        this.danPrintData.doctor = this.getXuserName(prescription.prescription_doctor);
        this.danPrintData.modelName = this.modeName(prescription.mode_id);

        this.danPrintData.dialysis_duration = prescription.dialysis_duration;
        var deviceLen = this.deviceList.length;
        this.danPrintData.dialyzer = "";
        for (let index = 0; index < deviceLen; index++) {
          if (this.deviceList[index].id == prescription.dialyzer) {
            this.danPrintData.dialyzer = this.deviceList[index].name;
            break;
          }
        }
        var paLen = this.perfusionApparatus.length;
        this.danPrintData.perfusion_apparatus = "";
        for (let index = 0; index < paLen; index++) {
          if (this.perfusionApparatus[index].id == prescription.perfusion_apparatus) {
            this.danPrintData.perfusion_apparatus = this.perfusionApparatus[index].name;
            break;
          }
        }

        this.danPrintData.blood_flow_volume = prescription.blood_flow_volume;
        this.danPrintData.dewater_amount = prescription.dewater_amount;
        this.danPrintData.displace_liqui = prescription.displace_liqui;

        var rwLen = this.replacementWays.length;
        this.danPrintData.replacement_way = "";
        for (let index = 0; index < rwLen; index++) {
          if (this.replacementWays[index].id == prescription.replacement_way) {
            this.danPrintData.replacement_way = this.replacementWays[index].name;
            break;
          }
        }

        var acLen = this.anticoagulantsConfit.length;
        this.danPrintData.anticoagulant = "";

        var thisALID = prescription.anticoagulant;
        this.danPrintData.AlPanel = {};

        if (typeof(this.anticoagulantsConfit[thisALID]) != 'undefined' && this.anticoagulantsConfit[thisALID] != null) {
          this.danPrintData.anticoagulant = this.anticoagulantsConfit[thisALID].name;
          this.danPrintData.AlPanel = this.anticoagulantsConfit[thisALID];
        }


        this.danPrintData.anticoagulant_shouji = prescription.anticoagulant_shouji;
        this.danPrintData.anticoagulant_weichi = prescription.anticoagulant_weichi;
        this.danPrintData.anticoagulant_zongliang = prescription.anticoagulant_zongliang;
        this.danPrintData.anticoagulant_gaimingcheng = prescription.anticoagulant_gaimingcheng;
        this.danPrintData.anticoagulant_gaijiliang = prescription.anticoagulant_gaijiliang;

        this.danPrintData.dry_weight = prescription.dry_weight;
        this.danPrintData.dialysate_flow = prescription.dialysate_flow;
        this.danPrintData.dialysate_temperature = prescription.dialysate_temperature;
        this.danPrintData.kalium = prescription.kalium;
        this.danPrintData.sodium = prescription.sodium;
        this.danPrintData.calcium = prescription.calcium;
        this.danPrintData.bicarbonate = prescription.bicarbonate;
        this.danPrintData.glucose = prescription.glucose;
        this.danPrintData.conductivity = prescription.conductivity;
        this.danPrintData.remark = prescription.remark;
      },
      setTQdata(prescription) {
        this.danPrintData.doctor = this.getXuserName(this.$store.getters.xt_user.user.id);
        this.danPrintData.modelName = this.modeName(prescription.dialysisMode);


        this.danPrintData.dialysis_duration = prescription.dialysisTime;

        var deviceLen = this.deviceList.length;
        this.danPrintData.dialyzer = "";
        for (let index = 0; index < deviceLen; index++) {
          if (this.deviceList[index].id == prescription.machine) {
            this.danPrintData.dialyzer = this.deviceList[index].name;
            break;
          }
        }
        var paLen = this.perfusionApparatus.length;
        this.danPrintData.perfusion_apparatus = "";
        for (let index = 0; index < paLen; index++) {
          if (this.perfusionApparatus[index].id == prescription.hemoperfusion) {
            this.danPrintData.perfusion_apparatus = this.perfusionApparatus[index].name;
            break;
          }
        }

        this.danPrintData.blood_flow_volume = prescription.bloodFlow;
        this.danPrintData.dewater_amount = prescription.targetDewateringAmount;
        this.danPrintData.displace_liqui = prescription.displaceLiqui;

        var rwLen = this.replacementWays.length;
        this.danPrintData.replacement_way = "";
        for (let index = 0; index < rwLen; index++) {
          if (this.replacementWays[index].id == prescription.displacesMethod) {
            this.danPrintData.replacement_way = this.replacementWays[index].name;
            break;
          }
        }

        var acLen = this.anticoagulantsConfit.length;
        this.danPrintData.anticoagulant = "";

        var thisALID = prescription.anticoagulant;
        this.danPrintData.AlPanel = {};

        if (typeof(this.anticoagulantsConfit[thisALID]) != 'undefined' && this.anticoagulantsConfit[thisALID] != null) {
          this.danPrintData.anticoagulant = this.anticoagulantsConfit[thisALID].name;
          this.danPrintData.AlPanel = this.anticoagulantsConfit[thisALID];
        }


        this.danPrintData.anticoagulant_shouji = prescription.firstDose;
        this.danPrintData.anticoagulant_weichi = prescription.maintenance;
        this.danPrintData.anticoagulant_zongliang = prescription.total;
        this.danPrintData.anticoagulant_gaimingcheng = prescription.gaimingcheng;
        this.danPrintData.anticoagulant_gaijiliang = prescription.gaijiliang;

        this.danPrintData.dry_weight = prescription.adjustDryWeight;
        this.danPrintData.dialysate_flow = prescription.dialysateFlow;
        this.danPrintData.dialysate_temperature = prescription.dialysate_temperature;
        this.danPrintData.kalium = prescription.kalium;
        this.danPrintData.sodium = prescription.sodium;
        this.danPrintData.calcium = prescription.calcium;
        this.danPrintData.bicarbonate = prescription.bicarbonate;
        this.danPrintData.glucose = prescription.glucose;
        this.danPrintData.conductivity = prescription.conductivity;
        this.danPrintData.remark = prescription.remark;
      },
      setBdData(dialysis) {
        console.log(dialysis);
        this.danPrintData.weight_before = dialysis.dialysisbeforeWeight;
        this.danPrintData.additional_weight = dialysis.clothingWeight
        this.danPrintData.systolic_blood_pressure = dialysis.systolic
        this.danPrintData.diastolic_blood_pressure = dialysis.diastolic
        this.danPrintData.breathing_rate = dialysis.R
      },

      modeName(mode_id) {
        return typeof(this.modeOptions[mode_id]) != 'undefined' && typeof(this.modeOptions[mode_id].name) != 'undefined' ? this.modeOptions[mode_id].name : '';
      },
      getXuserName(id) {
        if (id <= 0) {
          return "";
        }
        var name = "";
        if (this.adminUserOptions == null || typeof(this.adminUserOptions.length) == "undefined") {
          return name;
        }
        var leng = this.adminUserOptions.length;
        if (leng == 0) {
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
      printDan() {
        var ptime = Math.round(new Date().getTime() / 1000);
        this.print_time = uParseTime(ptime, '{y}-{m}-{d} {h}:{i}');

        const style = '@media print { .shangjidan{width:500px;margin:0 auto}.shangjidan .dan-title{text-align:center;font-size:24px;font-weight:600;margin:0 auto;margin-top:15px;padding:5px 0}.shangjidan .dan-table{margin-top:10px;width:100%;line-height:20px;border-collapse:collapse}.shangjidan .dan-td-col-2{width:40px}.shangjidan .dan-td-col-4{width:80px}.shangjidan .dan-td-col-3{width:60px}.shangjidan .dan-td-col-5{width:100px}.shangjidan .dan-td{border-bottom:1px solid #666;text-align:center;max-width:200px}.shangjidan .dan-value{width:100%;margin:0 2px}.shangjidan .dan-main{border-bottom:1px solid #666;border-top:1px solid #666;padding:10px 5px} }';

        setTimeout(() => {
          printJS({
            printable: "shangjidan",
            type: "html",
            style: style,
            scanStyles: false
          });
        }, 1);
      },
      stat_order_action: function () {
        this.dialogFormVisible = true
      },
      execution_action: function () {
        if (this.selectedAdviceData != null) {
          let params = {
            "patient_id": this.patientId,
            "id": this.selectedAdviceData.id,
            "parent_id": this.selectedAdviceData.parent_id,

          }
          getDoctorAdviceById(params).then(response => {
            if (response.data.state == 0) {
              this.$message.error(response.data.msg);
              return false;
            } else {
              this.dialogFormExecutionVisible = true
              this.executionForm.advice_doctor = response.data.data.advice.advice_doctor
              this.executionForm.start_time = response.data.data.advice.start_time
              this.executionForm.content = response.data.data.advice.advice_name
                + response.data.data.advice.advice_desc
                + " "
                + response.data.data.advice.single_dose
                + response.data.data.advice.single_dose_unit
                + " "
                + response.data.data.advice.prescribing_number
                + response.data.data.advice.prescribing_number_unit
                + " "
                + response.data.data.advice.delivery_way
                + response.data.data.advice.execution_frequency

              if (response.data.data.subAdvice != null) {
                for (let i = 0; i < response.data.data.subAdvice.length; i++) {
                  this.executionForm.content = this.executionForm.content + '\n'

                    + response.data.data.subAdvice[i].advice_name
                    + response.data.data.subAdvice[i].advice_desc
                    + " "
                    + response.data.data.subAdvice[i].single_dose
                    + response.data.data.subAdvice[i].single_dose_unit
                    + " "
                    + response.data.data.subAdvice[i].prescribing_number
                    + response.data.data.subAdvice[i].prescribing_number_unit
                  this.executionForm.parent_id = response.data.data.subAdvice[i].parent_id

                }
              }
              this.executionForm.id = response.data.data.advice.id

              return false;
            }
          });


        } else {
          this.$message.error("请选择要执行的医嘱");

        }
      },
      delete_action: function () {
        if (this.selectedAdviceData != null) {

          this.$confirm('确认删除些条医嘱?', '医嘱删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            DeleteDoctorAdvice(this.selectedAdviceData.id).then(response => {
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
                this.deleteResetData(this.currentIndex, this.selectedAdviceData);
              }
            });
          }).catch(() => {
          });


        } else {
          this.$message.error("请选择要删除的医嘱");

        }
      },
      changeAdviceName(change) {
        this.adviceForm.advice_name = this.drugOptions[change].name;
        this.adviceForm.advice_desc = this.drugOptions[change].spec;
        this.adviceForm.single_dose_unit = this.drugOptions[change].spec_unit;
        this.adviceForm.prescribing_number_unit = this.drugOptions[change].form_unit;
      },
      changeSubAdviceName(change, val) {
        val.advice_name = this.drugOptions[change].name;
        val.advice_desc = this.drugOptions[change].spec;
        val.single_dose_unit = this.drugOptions[change].spec_unit;
        val.prescribing_number_unit = this.drugOptions[change].form_unit;

      },


      //初始化数据
      initData: function () {
        console.log(this.$store.getters.xt_user.user.user_name)
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        var nowDate = year + "-" + month + "-" + day;
        var date = new Date(nowDate + " 00:00:00");
        this.record_date = date.getTime() / 1000
        const id = this.$route.params && this.$route.params.id;
        this.patientId = id

        //全局信息
        this.getAllDoctorAndNurses()
        this.getAdviceConfig()
        this.getAllZone()
        this.GetAllData()
        this.GetPatinentInfo()
        this.fetchAllAdminUsers()
        this.fetchAllDoctorAndNurse();



        //store数据
        this.anticoagulantsConfit = this.$store.getters.anticoagulants_confit
        this.modeOptions = this.$store.getters.treatment_mode
        this.replacementWays = this.$store.getters.replacement_ways
        // debugger
        // this.replacementWays = getDataConfig('hemodialysis','replacement_ways')
        this.bloodFilters = this.$store.getters.blood_filters
        this.perfusionApparatus = this.$store.getters.perfusion_apparatus
        this.hemodialysisMachines = this.$store.getters.hemodialysis_machines


        var vascularAccessObj = this.$store.getters.vascular_access
        for( var index in vascularAccessObj) {
          this.vascularAccess.push(vascularAccessObj[index]);
        }

        var  vascularAccessDescObj = this.$store.getters.vascular_access_desc
        for(var index in vascularAccessDescObj) {
          this.vascularAccessDesc.push(vascularAccessDescObj[index]);
        }

        this.symptomsArray = this.$store.getters.symptoms
        this.dealArray = this.$store.getters.deals
        this.resultsArray = this.$store.getters.results

        this.dialysisIntervalData = this.$store.getters.dialysis_duration
        this.afterTheLastDialysiData = this.$store.getters.last_dialysis_after
        this.preExistingSymptomsData = this.$store.getters.dialysis_before
        this.DialysisBeforeAssesGuiltyData = this.$store.getters.internal_fistula
        this.dialysisBeforeAssesCatheterData = this.$store.getters.catheter
        this.dialysisBeforeAssesComplicationsData = this.$store.getters.complication
        this.summary = this.$store.getters.summary

        this.cruorData = this.$store.getters.cruor
        this.symptomsAfterDialysiData = this.$store.getters.last_dialysis_after
        this.fistulaData = this.$store.getters.internal_fistula
        this.pipeData = this.$store.getters.catheter
        this.complicationsData = this.$store.getters.complication


        // this.cruorData = this.


        var theDate = new Date();
        var year = theDate.getFullYear();
        var month = theDate.getMonth() + 1;
        var dat = theDate.getDate();
        month = month < 10 ? "0" + month : month;
        dat = dat < 10 ? "0" + dat : dat;
        var adviceDate = year + "-" + month + "-" + dat;

        this.adviceForm.advice_date = adviceDate


      },


      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      alertLog: function () {
      },


      listenToChildValue: function (val) {
        this.dialysisAfterAsses.dialysateVolume = val
      },
      DialogComfirm: function (val) {

        switch (val.title) {
          case this.dialogDialysisIntervalTitle:
            this.dialysisBeforeAsses.dialysisInterval = val.value.join(',')
            this.isVisibiltyForDialysisIntervalDialog = false
            break
          case this.dialogAfterTheLastDialysisTitle:
            this.dialysisBeforeAsses.afterTheLastDialysis = val.value.join(',')
            this.isVisibiltyForAfterTheLastDialysisDialog = false
            break
          case this.dialogPreExistingSymptomsTitle:
            this.dialysisBeforeAsses.preExistingSymptoms = val.value.join(',')
            this.isVisibiltyForPreExistingSymptomsDialog = false
            break
          case this.dialogDialysisBeforeAssesGuiltyTitle:
            this.dialysisBeforeAsses.guilty = val.value.join(',')
            this.isVisibiltyForDialysisBeforeAssesGuiltyDialog = false
            break
          case this.dialogDialysisBeforeAssesCatheterTitle:
            this.dialysisBeforeAsses.catheter = val.value.join(',')
            this.isVisibiltyForDialysisBeforeAssesCatheterDialog = false
            break
          case this.dialogDialysisBeforeAssesComplicationsTitle:
            this.dialysisBeforeAsses.complications = val.value.join(',')
            this.isVisibiltyForDialysisBeforeAssesComplicationsDialog = false
            break


          //透后评估部分
          case this.dialogCruorTitle:
            this.dialysisAfterAsses.cruor = val.value.join(',')
            this.isVisibiltyForCruorDialog = false
            break
          case this.dialogSymptomsAfterDialysiTitle:
            this.dialysisAfterAsses.symptomsAfterDialysi = val.value.join(',')
            this.isVisibiltyForSymptomsAfterDialysiDialog = false
            break

          case this.dialogComplicationsTitle:
            this.dialysisAfterAsses.complications = val.value.join(',')
            this.isVisibiltyForcomplicationsDialog = false
            break

          case this.dialogComplicationsTitle:
            this.dialysisAfterAsses.dialysateVolume = val.value.join(',')
            this.isVisibiltyForDialysateVolumeDialog = false
            break

          //调整干体重
          case this.dialogAdjustWeightTitle:
            //提交干体重信息
            createDryWeight(this.patientId, val.value).then(response => {
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
                this.weightList.unshift(response.data.data.weight);
                if (this.weightList.length > 6) {
                  this.weightList.pop();
                }
                this.dialogFormVisible = false;
                this.dialysisPrescription.adjustDryWeight = response.data.data.weight.weight;
              }
            });

            this.isVisibiltyAdjustDryWeightDialog = false
            break


          case this.dialogMonitorTitle:
            //提交数据
            this.isVisibiltyForMonitorDialog = false


            let ParamsQuery = val.value
            ParamsQuery['id'] = this.patientId
            ParamsQuery['dialysis_order_id'] = this.dialysisId

            CreateMonitor(ParamsQuery).then(response => {
              if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              } else {
                this.monitoringRecordIsComfirm = true
                this.$notify({
                  title: "成功",
                  message: "新增成功",
                  type: "success",
                  duration: 2000
                });
                let monitor = {}
                monitor['id'] = response.data.data.monitor.id
                monitor['time'] = response.data.data.monitor.monitoring_time
                monitor['PB'] = response.data.data.monitor.systolic_blood_pressure.toString() + '/' + response.data.data.monitor.diastolic_blood_pressure.toString()
                monitor['pulse_frequency'] = response.data.data.monitor.pulse_frequency
                monitor['breathing_rate'] = response.data.data.monitor.breathing_rate
                monitor['blood_flow_volume'] = response.data.data.monitor.blood_flow_volume
                monitor['venous_pressure'] = response.data.data.monitor.venous_pressure
                monitor['transmembrane_pressure'] = response.data.data.monitor.transmembrane_pressure
                monitor['ultrafiltration_volume'] = response.data.data.monitor.ultrafiltration_volume
                monitor['sodium_concentration'] = response.data.data.monitor.sodium_concentration
                monitor['dialysate_temperature'] = response.data.data.monitor.dialysate_temperature
                monitor['replacement_rate'] = response.data.data.monitor.replacement_rate
                monitor['displacement_quantity'] = response.data.data.monitor.displacement_quantity
                monitor['symptom'] = response.data.data.monitor.symptom
                monitor['dispose'] = response.data.data.monitor.dispose
                monitor['replacement_rate'] = response.data.data.monitor.replacement_rate
                monitor['result'] = response.data.data.monitor.result
                this.monitoringRecordTableData.unshift(monitor)

              }
            });


            break
          case this.dialogSymptomsTitle:
            this.symptomsData = val.value.join(',')
            this.isVisibiltyForSymptomsDialog = false
            break
          case this.dialogDealTitle:
            this.dealData = val.value.join(',')
            this.isVisibiltyForDealDialog = false
            break
          case this.dialogResultsTitle:
            this.resultsData = val.value.join(',')
            this.isVisibiltyForResultsDialog = false
            break


        }

      },
      DialogCancle: function (val) {
        switch (val) {
          //透前评估部分
          case this.dialogDialysisIntervalTitle:
            this.isVisibiltyForDialysisIntervalDialog = false
            break
          case this.dialogAfterTheLastDialysisTitle:
            this.isVisibiltyForAfterTheLastDialysisDialog = false
            break
          case this.dialogPreExistingSymptomsTitle:
            this.isVisibiltyForPreExistingSymptomsDialog = false
            break
          case this.dialogDialysisBeforeAssesGuiltyTitle:
            this.isVisibiltyForDialysisBeforeAssesGuiltyDialog = false
            break
          case this.dialogDialysisBeforeAssesCatheterTitle:
            this.isVisibiltyForDialysisBeforeAssesCatheterDialog = false
            break
          case this.dialogDialysisBeforeAssesComplicationsTitle:
            this.isVisibiltyForDialysisBeforeAssesComplicationsDialog = false
            break

          //透后评估部分
          case this.dialogCruorTitle:
            this.isVisibiltyForCruorDialog = false
            break
          case this.dialogSymptomsAfterDialysiTitle:
            this.isVisibiltyForSymptomsAfterDialysiDialog = false
            break
          case this.dialogFistulaTitle:
            this.isVisibiltyForFistulaDialog = false
            break
          case this.dialogPipeTitle:
            this.isVisibiltyForPipeDialog = false
          case this.dialogComplicationsTitle:
            this.isVisibiltyForcomplicationsDialog = false
            break

          //调整干体重
          case this.dialogAdjustWeightTitle:
            this.isVisibiltyAdjustDryWeightDialog = false
            break

          //监测记录'
          case this.dialogMonitorTitle:
            this.isVisibiltyForMonitorDialog = false
            break

          case this.dialogSymptomsTitle:
            this.isVisibiltyForSymptomsDialog = false
            break
          case this.dialogDealTitle:
            this.isVisibiltyForDealDialog = false
            break
          case this.dialogResultsTitle:
            this.isVisibiltyForResultsDialog = false
            break

        }

      }, FormDialogComfirm: function (val) {
        this.dialysisAfterAsses.dialysateVolume =val
        this.isVisibiltyForDialysateVolumeDialog = false
      }, FormDialogCancle: function () {
        this.isVisibiltyForDialysateVolumeDialog = false

      },
      changeDialysisMachine: function (val) {

        for (let i = 0; i < this.deviceList.length; i++) {
          if (this.deviceList[i].id == val) {
            this.dialysisPrescription.machineType = this.deviceList[i].model
          }
        }

      },


      changeThisAnticoagulant: function (val) {
        var thismode = parseInt(val);
        if (isNaN(thismode) || thismode <= 0) {
          return false;
        }
        if (typeof(this.anticoagulantsConfit[thismode]) == 'undefined' || this.anticoagulantsConfit[thismode] == null) {
          return false;
        }
        this.anticoagulant = this.anticoagulantsConfit[thismode];

      },

      commitDialysisPrescriptionAndOther() {
        let ParamsQuery = this.dialysisPrescription
        ParamsQuery['id'] = this.patientId
        ParamsQuery['dialysis_order_id'] = this.dialysisId
        ParamsQuery['record_date'] = this.record_date
        ParamsQuery['isCommitSolution'] = 1

        commitDailysisRecord(ParamsQuery).then(response => {
          // this.DialysisPrescriptionComfirmUserName = response.data.data.orgName + " " + "已确定"
          if (response.data.state==1) {
            this.$notify({
              title: "成功",
              message: "确认成功",
              type: "success",
              duration: 2000
            });
            this.setTQdata(ParamsQuery);
          }else {
            this.$message.error(response.data.msg);
            return false;
          }

        })
        this.dialysisPrescriptionIsComfirm = true

      }, getAllDoctorAndNurses: function () {
        doctorAndNurseList().then(response => {
          if (response.data.data.doctors != null) {
            this.doctorList = response.data.data.doctors
          }
          if (response.data.data.nursers != null) {

            this.nurseList = response.data.data.nursers
          }

        })
      }
      , getFormatDate: function (timestamp) {
        timestamp = parseInt(timestamp + '000');
        var newDate = new Date(timestamp);
        Date.prototype.format = function (format) {
          var date = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S+': this.getMilliseconds()
          };
          if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          for (var k in date) {
            if (new RegExp('(' + k + ')').test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
            }
          }
          return format;
        }
        return newDate.format('yyyy-MM-dd');

      },
      calAgeByBirthday: function (time) {
        var r = this.getFormatDate(time).match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) return false;
        var d = new Date(r[1], r[3] - 1, r[4]);
        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
          var Y = new Date().getFullYear();
          return (Y - r[1]);
        } else {
          return 0;
        }
      },
      dialysisAfterTeachSelectChange: function (values) {
        console.log(this.dialysisSummary.propagandaAndEducationContent)
        if (this.dialysisSummary.propagandaAndEducationContent == "") {
          this.dialysisSummary.propagandaAndEducationContent = values
        } else {
          if (this.dialysisSummary.propagandaAndEducationContent.indexOf(values) == -1) {
            if (this.dialysisSummary.propagandaAndEducationContent.charAt(this.dialysisSummary.propagandaAndEducationContent.length - 1).indexOf('。') == -1) {
              this.dialysisSummary.propagandaAndEducationContent = this.dialysisSummary.propagandaAndEducationContent + "," + values

            } else {
              this.dialysisSummary.propagandaAndEducationContent = this.dialysisSummary.propagandaAndEducationContent + values

            }
          }
        }
      },
      dialysisSummarySelectChange: function (values) {
        if (this.dialysisSummary.summaryContent == "") {
          this.dialysisSummary.summaryContent = values
        } else {
          if (this.dialysisSummary.summaryContent.indexOf(values) == -1) {
            if (this.dialysisSummary.summaryContent.charAt(this.dialysisSummary.summaryContent.length - 1).indexOf('。') == -1) {
              this.dialysisSummary.summaryContent = this.dialysisSummary.summaryContent + "," + values

            } else {
              this.dialysisSummary.summaryContent = this.dialysisSummary.summaryContent + "," + values
              this.dialysisSummary.summaryContent = this.dialysisSummary.summaryContent + values

            }
          }
        }

      }, commitDialysisPrescription() {


        let ParamsQuery = this.dialysisPrescription
        console.log(ParamsQuery)
        ParamsQuery['id'] = this.patientId
        ParamsQuery['dialysis_order_id'] = this.dialysisId
        ParamsQuery['record_date'] = this.record_date

        commitDailysisRecord(ParamsQuery).then(response => {
            // this.DialysisPrescriptionComfirmUserName = response.data.data.orgName + " " + "已确定"
            if (response.data.state==1) {
              if (this.$store.getters.xt_user.user.user_type == 1) {
                this.DialysisPrescriptionComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 管理员"
              } else if (this.$store.getters.xt_user.user.user_type == 2) {
                this.DialysisPrescriptionComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 医生"
              } else if (this.$store.getters.xt_user.user.user_type == 3) {
                this.DialysisPrescriptionComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 护士"
              } else if (this.$store.getters.xt_user.user.user_type == 4) {
                this.DialysisPrescriptionComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 运营"
              }
              this.$notify({
                title: "成功",
                message: "确认成功",
                type: "success",
                duration: 2000
              });

              this.setTQdata(ParamsQuery);
            }else {
              this.$message.error(response.data.msg);
              return false;
            }

        })


        this.dialysisPrescriptionIsComfirm = true

      }, submitDialysisBeforeAssesForm: function () {

        let ParamsQuery = this.dialysisBeforeAsses
        ParamsQuery['id'] = this.patientId
        ParamsQuery['dialysis_order_id'] = this.dialysisId
        ParamsQuery['record_date'] = this.record_date


        commitDailysisRecord(ParamsQuery).then(response => {
          // this.DialysisBeforeAssesComfirmUserName = response.data.data.orgName + " " + "已确定"
          if (response.data.state==1) {
            if (this.$store.getters.xt_user.user.user_type == 1) {
              this.DialysisBeforeAssesComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 管理员"
            } else if (this.$store.getters.xt_user.user.user_type == 2) {
              this.DialysisBeforeAssesComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 医生"
            } else if (this.$store.getters.xt_user.user.user_type == 3) {
              this.DialysisBeforeAssesComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 护士"
            } else if (this.$store.getters.xt_user.user.user_type == 4) {
              this.DialysisBeforeAssesComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 运营"
            }

            this.$notify({
              title: "成功",
              message: "确认成功",
              type: "success",
              duration: 2000
            });

            //为了打印
            this.setBdData(ParamsQuery);
          }else {
            this.$message.error(response.data.msg);
            return false;
          }



        })

        this.dialysisBeforeAssesIsComfirm = true
      },

      submitDialysisAfterAssesForm: function () {
        let ParamsQuery = this.dialysisAfterAsses
        ParamsQuery['id'] = this.patientId
        ParamsQuery['dialysis_order_id'] = this.dialysisId
        ParamsQuery['record_date'] = this.record_date


        commitDailysisRecord(ParamsQuery).then(response => {
          if (response.data.state==1) {
            // this.SubmitDialysisAfterAssesComfirmUserName = response.data.data.orgName + " " + "已确定"
            if (this.$store.getters.xt_user.user.user_type == 1) {
              this.dialysisAfterAssesIsComfirm = "提交人: " + this.$store.getters.xt_user.user.user_name + " 管理员"
            } else if (this.$store.getters.xt_user.user.user_type == 2) {
              this.dialysisAfterAssesIsComfirm = "提交人: " + this.$store.getters.xt_user.user.user_name + " 医生"
            } else if (this.$store.getters.xt_user.user.user_type == 3) {
              this.dialysisAfterAssesIsComfirm = "提交人: " + this.$store.getters.xt_user.user.user_name + " 护士"
            } else if (this.$store.getters.xt_user.user.user_type == 4) {
              this.dialysisAfterAssesIsComfirm = "提交人: " + this.$store.getters.xt_user.user.user_name + " 运营"
            }
            this.$notify({
              title: "成功",
              message: "确认成功",
              type: "success",
              duration: 2000
            });
          }else {
            this.$message.error(response.data.msg);
            return false;
          }

        })
        this.dialysisAfterAssesIsComfirm = true


      },
      submitSummary: function (val) {
        let ParamsQuery = this.dialysisSummary
        ParamsQuery['id'] = this.patientId
        ParamsQuery['dialysis_order_id'] = this.dialysisId
        ParamsQuery['record_date'] = this.record_date


        commitDailysisRecord(ParamsQuery).then(response => {
          if (response.data.state==1) {
            // this.DialysisSummaryComfirmUserName = response.data.data.orgName + " " + "已确定"
            if (this.$store.getters.xt_user.user.user_type == 1) {
              this.DialysisSummaryComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 管理员"
            } else if (this.$store.getters.xt_user.user.user_type == 2) {
              this.DialysisSummaryComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 医生"
            } else if (this.$store.getters.xt_user.user.user_type == 3) {
              this.DialysisSummaryComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 护士"
            } else if (this.$store.getters.xt_user.user.user_type == 4) {
              this.DialysisSummaryComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 运营"
            }
            this.$notify({
              title: "成功",
              message: "确认成功",
              type: "success",
              duration: 2000
            });
          }else {
            this.$message.error(response.data.msg);
            return false;
          }

        })
        this.dialysisSummaryIsComfirm = true


      }, commitDoubleCheck: function () {

        let ParamsQuery = this.doubleReview
        ParamsQuery['id'] = this.patientId
        ParamsQuery['dialysis_order_id'] = this.dialysisId
        ParamsQuery['record_date'] = this.record_date


        commitDailysisRecord(ParamsQuery).then(response => {
          if (response.data.state==1) {
            // this.DoubleCheckComfirmUserName = response.data.data.orgName + " " + "已确定"
            if (this.$store.getters.xt_user.user.user_type == 1) {
              this.DoubleCheckComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 管理员"
            } else if (this.$store.getters.xt_user.user.user_type == 2) {
              this.DoubleCheckComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 医生"
            } else if (this.$store.getters.xt_user.user.user_type == 3) {
              this.DoubleCheckComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 护士"
            } else if (this.$store.getters.xt_user.user.user_type == 4) {
              this.DoubleCheckComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 运营"
            }
            this.$notify({
              title: "成功",
              message: "确认成功",
              type: "success",
              duration: 2000
            });
          }else {
            this.$message.error(response.data.msg);
            return false;
          }

        })
        this.doubleCheckIsComfirm = true

      }, commitReceiveTreatmentAssesRecord: function () {

        let ParamsQuery = this.receiveTreatmentAsses
        ParamsQuery['id'] = this.patientId
        ParamsQuery['dialysis_order_id'] = this.dialysisId
        ParamsQuery['record_date'] = this.record_date

        commitDailysisRecord(ParamsQuery).then(response => {
          if (response.data.state==1) {
            // this.CommitReceiveTreatmentAssesComfirmUserName = response.data.data.orgName + " " + "已确定"
            if (this.$store.getters.xt_user.user.user_type == 1) {
              this.CommitReceiveTreatmentAssesComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 管理员"
            } else if (this.$store.getters.xt_user.user.user_type == 2) {
              this.CommitReceiveTreatmentAssesComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 医生"
            } else if (this.$store.getters.xt_user.user.user_type == 3) {
              this.CommitReceiveTreatmentAssesComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 护士"
            } else if (this.$store.getters.xt_user.user.user_type == 4) {
              this.CommitReceiveTreatmentAssesComfirmUserName = "提交人: " + this.$store.getters.xt_user.user.user_name + " 运营"
            }
            this.$notify({
              title: "成功",
              message: "确认成功",
              type: "success",
              duration: 2000
            });
          }else {
            this.$message.error(response.data.msg);
            return false;
          }

        })

        this.receiveTreatmentAssesIsComfirm = true

      },
      showDialog: function (val) {
        switch (val) {
          //透前评估
          case 'dialysisInterval':
            this.isVisibiltyForDialysisIntervalDialog = true
            break

          case 'afterTheLastDialysis':
            this.isVisibiltyForAfterTheLastDialysisDialog = true
            break

          case 'dialysisBeforePreExistingSymptoms':
            this.isVisibiltyForPreExistingSymptomsDialog = true
            break

          case 'dialysisBeforeGuilty':
            this.isVisibiltyForDialysisBeforeAssesGuiltyDialog = true
            break

          case 'dialysisBeforeCatheter':
            this.isVisibiltyForDialysisBeforeAssesCatheterDialog = true
            break

          case 'dialysisBeforeComplications':
            this.isVisibiltyForDialysisBeforeAssesComplicationsDialog = true
            break
          //透后评估
          case 'cruor':
            this.isVisibiltyForCruorDialog = true
            break
          case 'symptomsAfterDialysi':
            this.isVisibiltyForSymptomsAfterDialysiDialog = true
            break
          case 'dialysateVolume':
            this.isVisibiltyForDialysateVolumeDialog = true
            break
          case 'fistula':
            this.isVisibiltyForFistulaDialog = true
            break
          case 'pipe':
            this.isVisibiltyForPipeDialog = true
            break
          case 'complications':
            this.isVisibiltyForcomplicationsDialog = true
            break

          //调整干体重
          case 'adjustDryWeight':
            if (this.patientId == 0) {
              alert("请选择患者")
              return
            } else {
              this.isVisibiltyAdjustDryWeightDialog = true
            }
            break


        }
      },
      showInnerDialog: function (val) {
        switch (val) {
          case 'symptom':
            this.isVisibiltyForSymptomsDialog = true
            break
          case 'deal':
            this.isVisibiltyForDealDialog = true
            break
          case 'result':
            this.isVisibiltyForResultsDialog = true
            break
        }

      },
      changeSelect: function () {
        switch (this.dialysisBeforeAsses.weightWay) {
          case '1':
            this.dialysisbeforeWeighedIsDisabled = false
            this.clothingWeightIsDisabled = false
            this.dialysisbeforeWeightIsDisabled = false
            this.weightAddIsDisabled = false
            this.dialysisBeforeAsses.dialysisbeforeWeighed = ""

            break
          case '2':
            this.dialysisbeforeWeighedIsDisabled = true
            this.clothingWeightIsDisabled = true
            this.dialysisbeforeWeightIsDisabled = true
            this.weightAddIsDisabled = true
            this.dialysisBeforeAsses.dialysisbeforeWeighed = "卧床"
            break
          case '3':
            this.dialysisbeforeWeighedIsDisabled = true
            this.clothingWeightIsDisabled = true
            this.dialysisbeforeWeightIsDisabled = true
            this.weightAddIsDisabled = true
            this.dialysisBeforeAsses.dialysisbeforeWeighed = "拒测"
            break

        }

      }, changeDialysisMode: function (val) {
        var thismode = parseInt(val);
        if (isNaN(thismode) || thismode <= 0) {
          return false;
        }
        if (typeof(this.modeOptions[thismode]) == 'undefined' || this.modeOptions[thismode] == null) {
          return false;
        }
        this.treatmentMode = this.modeOptions[thismode];


      }, adjustDryWeight: function () {


      }, getAllWeightList: function (val) {
        let listQuery = {
          page: 0,
          limit: 0,
          id: val.id,
        }
        getDryWeights(listQuery).then(response => {
          console.log(response)
          if (response.data.state == 1) {
            this.weightList = response.data.data.weights;
            if (this.weightList.length > 0) {
              this.dialysisPrescription.adjustDryWeight = this.weightList[0].weight;
            }
          }
        });

      },
      //医嘱相关
      getAdviceConfig() {
        getAdviceConfig().then(response => {
          if (response.data.state == 1) {
            this.deliveryWayOptions = response.data.data.drugways;
            this.executionFrequencyOptions = response.data.data.efs;

            var druglist = {};
            var durglength = response.data.data.drugs.length;
            for (let index = 0; index < durglength; index++) {
              druglist[response.data.data.drugs[index].id] = response.data.data.drugs[index];
            }
            this.drugOptions = druglist;
          }
        });
      },
      submitEditAdvice(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     EditDoctorAdvice(this.patientId, this.adviceForm.id, this.adviceForm).then(response => {
        //       if (response.data.state == 0) {
        //         this.$message.error(response.data.msg);
        //         return false;
        //       } else {
        //         this.$notify({
        //           title: "成功",
        //           message: "修改医嘱成功",
        //           type: "success",
        //           duration: 2000
        //         });
        //         this.dialogFormVisible = false;
        //         // this.resetForm(formName);
        //
        //         for (let i = 0; i < this.doctorList.length; i++) {
        //           if (this.doctorList[i].id == response.data.data.advice.execution_staff) {
        //             this.adviceTableData[this.currentIndex].execution_staff = this.doctorList[i].name
        //           }
        //         }
        //         for (let i = 0; i < this.nurseList.length; i++) {
        //           if (this.doctorList[i].id == response.data.data.advice.execution_staff) {
        //             this.adviceTableData[this.currentIndex].execution_staff = this.doctorList[i].name
        //           }
        //         }
        //         for (let i = 0; i < this.doctorList.length; i++) {
        //           if (this.doctorList[i].id == response.data.data.advice.execution_staff) {
        //             this.adviceTableData[this.currentIndex].checker = this.doctorList[i].name
        //           }
        //         }
        //         for (let i = 0; i < this.nurseList.length; i++) {
        //           if (this.doctorList[i].id == response.data.data.advice.execution_staff) {
        //             this.adviceTableData[this.currentIndex].checker = this.doctorList[i].name
        //           }
        //         }
        //         this.adviceTableData[this.currentIndex].execution_time = this.getFormatDate(response.data.data.advice.execution_time)
        //         this.currentIndex = -1;
        //         return false;
        //       }
        //     });
        //   }
        // });
      },
      submitNewAdvice(formName, action) {
        let SubAdvices = []
        for (var i = 0; i < this.SubAdvice.length; i++) {
          SubAdvices.push(this.SubAdvice[i].subAdivceForm)
        }
        this.adviceForm['subAdviceForm'] = SubAdvices

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = Object.assign({}, this.adviceForm)
            CreateDoctorAdvice(this.patientId, this.dialysisId, this.record_date, form).then(response => {
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
                this.dialogFormVisible = false;

                if (response.data.data.subAdvice != null) {
                  for (let i = 0; i < response.data.data.subAdvice.length; i++) {
                    let subAdviceTableData = {}
                    subAdviceTableData['advice_content'] = response.data.data.subAdvice[i].advice_name + response.data.data.subAdvice[i].advice_desc + " " + response.data.data.subAdvice[i].single_dose + response.data.data.subAdvice[i].single_dose_unit + " " + response.data.data.subAdvice[i].prescribing_number + response.data.data.subAdvice[i].prescribing_number_unit
                    subAdviceTableData['id'] = response.data.data.subAdvice[i].id
                    subAdviceTableData['parent_id'] = response.data.data.subAdvice[i].parent_id
                    this.adviceTableData.unshift(subAdviceTableData);
                  }
                }

                if (response.data.data.advice != null) {
                  let adviceTableDatas = {}
                  adviceTableDatas['start_time'] = this.getFormatDate(response.data.data.advice.start_time)
                  adviceTableDatas['advice_content'] = response.data.data.advice.advice_name + response.data.data.advice.advice_desc + " " + response.data.data.advice.single_dose + response.data.data.advice.single_dose_unit + " " + response.data.data.advice.prescribing_number + response.data.data.advice.prescribing_number_unit + " " + response.data.data.advice.delivery_way + response.data.data.advice.execution_frequency
                  adviceTableDatas['id'] = response.data.data.advice.id
                  adviceTableDatas['parent_id'] = response.data.data.advice.parent_id
                  adviceTableDatas['advice_doctor'] = response.data.data.advice.advice_doctor
                  adviceTableDatas['execution_time'] = ''
                  adviceTableDatas['execution_staff'] = ''
                  adviceTableDatas['checker'] = ''
                  this.adviceTableData.unshift(adviceTableDatas);
                  this.currentIndex = -1;
                  return false;
                }
              }
            });
          }
        });
      }, getAllZone: function () {
        GetAllZone().then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.sickAreaData = response.data.data.zone

          }
        });
      },
      handleChangeChild: function (value) {
        console.log(value)
        console.log(this.lastValue)
        if (parseInt(value) > this.lastValue) { //新增
          this.lastValue = parseInt(value)
          let Object = {
            "id": value,
            "labelName": "子药名称" + value,
            "labeldesc": "子药描述" + value,
            "sigle": "单次用量" + value,
            "num": "开药数量" + value,

            "subAdivceForm": {
              "advice_name": "",
              "advice_desc": "",
              "single_dose": "",
              "single_dose_unit": "",
              "prescribing_number": "",
              "prescribing_number_unit": ""
            }
          }

          this.SubAdvice.push(Object)
          return;

        } else if (parseInt(value) < this.lastValue) {
          this.lastValue = parseInt(value)
          this.SubAdvice.pop()
          return;

        }
      }, deleteResetData(index, data) {
        if (data.parent_id > 0) { //子药物
          this.adviceTableData.splice(index, 1);
        } else {
          var resetTableData = this.adviceTableData;
          this.adviceTableData = [];
          var that = this;
          resetTableData.forEach(function (item, itemindex) {
            if (item.id != data.id && item.parent_id != data.id) {
              that.adviceTableData.push(item);
            }
          });
        }
      }, tableRowClassName({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      onRowClick(row, event, column) {
        this.currentIndex = row.index;
        this.selectedAdviceData = row

      }, submitExecuteAdvice() {

        let params = {
          "patient": this.patientId,
          "id": this.executionForm.id,
          "parent_id": this.executionForm.parent_id,
          "execution_time": this.executionForm.execution_time,
          "execution_staff": this.executionForm.execution_staff,
          "checker": this.executionForm.checker,

        }

        editDoctorAdviceById(params).then(response => {
          if (response.data.state == 0) {
            this.$message.error(response.data.msg);
            return false;
          } else {
            this.$notify({
              title: "成功",
              message: "执行医嘱成功",
              type: "success",
              duration: 2000
            });
            this.dialogFormExecutionVisible = false



            this.adviceTableData[this.currentIndex].execution_staff = response.data.data.advice.execution_staff
            this.adviceTableData[this.currentIndex].checker = response.data.data.advice.checker
            this.adviceTableData[this.currentIndex].execution_time = this.getFormatDate(response.data.data.advice.execution_time)
            this.currentIndex = -1;
            return false;
          }
        });


      }, GetAllData: function () {
        let params = {}
        GetDeviceInfo(params).then(response => {
          this.deviceList = response.data.data.device

        });
      }, tableMonitorRowClassName({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },
      onMonitorRowClick(row, event, column) {
        this.currentMonitorTableIndex = row.index;

      }, delMonitor: function () {

        if (this.currentMonitorTableIndex == -1) {
          this.$message.error("请选择要删除的记录");
          return
        } else {
          let id = this.monitoringRecordTableData[this.currentMonitorTableIndex].id
          let params = {
            "recordId": id,
            "id": this.patientId
          }

          this.$confirm('确认删除这条监控?', '透析监控删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delMonitor(params).then(response => {
              if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              }else {
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                  duration: 2000
                });
                this.monitoringRecordTableData.splice(this.currentMonitorTableIndex, 1)
              }


            });
          }).catch(() => {

          });
        }
      }, startDialysis: function () {
        if (this.dialysisId == 0) {
          let tip = ""
          if (this.dialysisPrescriptionIsComfirm != true) {
            tip = tip + "透析处方,"
          }
          if (this.receiveTreatmentAssesIsComfirm != true) {
            tip = tip + "接诊评估,"

          }
          if (this.dialysisBeforeAssesIsComfirm != true) {
            tip = tip + "透前评估,"
          }
          if (this.doctorAdviceIsComfirm != true) {
            tip = tip + "临时医嘱"
          }
          if (tip.length <= 0) {
            tip = ""
          } else {
            tip = tip + "等尚未确认是否开始上机"
          }

          this.$confirm(tip, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              'id': this.patientId,
              'status': 1
            }
            PostStartRecordInfo(params).then(response => {
              if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              } else {
                this.$notify({
                  title: "成功",
                  message: "上机成功",
                  type: "success",
                  duration: 2000
                });
                this.dialysisId = response.data.data.dialysisOrder.id
                this.dialysisStatus = response.data.data.dialysisOrder.stage
              }

            });
          }).catch(() => {

          });
        } else {
          if (this.dialysisStatus == 1) {
            this.$message.error("已经处于上机状态");

          } else if (this.dialysisStatus == 2) {
            this.$message.error("透析已结束");
          }


        }
      }, finishDialysis: function () {

        if (this.dialysisStatus == 1) {
          let tip = ""
          if (this.dialysisPrescriptionIsComfirm != true) {
            tip = tip + "透析处方,"
          }
          if (this.receiveTreatmentAssesIsComfirm != true) {
            tip = tip + "接诊评估,"

          }
          if (this.dialysisBeforeAssesIsComfirm != true) {
            tip = tip + "透前评估,"
          }
          if (this.doctorAdviceIsComfirm != true) {
            tip = tip + "临时医嘱,"
          }
          if (this.doubleCheckIsComfirm != true) {
            tip = tip + "双人核对,"
          }
          if (this.monitoringRecordIsComfirm != true) {
            tip = tip + "透析监测,"
          }

          this.$confirm(tip + "等尚未确认是否开始下机", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              'id': this.patientId,
              'status': 2,
              'record_id': this.dialysisId
            }
            PostStartRecordInfo(params).then(response => {
              if (response.data.state == 0) {
                this.$message.error(response.data.msg);
                return false;
              } else {
                this.$notify({
                  title: "成功",
                  message: "下机成功",
                  type: "success",
                  duration: 2000
                });
                this.dialysisStatus = response.data.data.dialysisOrder.stage
              }

            });
          }).catch(() => {

          });
        } else if (this.dialysisStatus == 2) {
          this.$message.error("透析已结束");
        } else {
          this.$message.error("尚未开始上机，无法执行下机");

        }
      }, schedualPickTime: function (val) {
        this.record_date = val.getTime() / 1000
        this.GetPatinentInfo()

      }, initModel: function () {
        this.dialysisSummary = {
          module: "summary",
          text: "",
          propagandaAndEducationContent: "",
          text2: "",
          summaryContent: "",
          changeMedicalNurse: "",
          treatNurse: "",
          checkStaff: "",
          deboardNurse: "",
          treatDoctor: "",
        }

        this.userInfo = {
          radio: 1,
          userName: "",
          gender: "",
          age: "",
          label: "门诊",
          dialysisNumber: "",
          inpatientWard: "",
          bed: "",
          dialysisCount: "",
          diagnosis: "",
          entryMethod: "",
          firstDialysisTime: "",
          dialysisTime: "",
          admission_number: ""
        }


        this.dialysisPrescription = {
          module: "dialysisPrescription",
          gaijiliang: "",
          gaimingcheng: "",
          machine: "",
          machineType: "",
          targetDewateringAmount: "",
          prescriptionDehydration: "",
          anticoagulant: "",
          firstDose: "",
          maintenance: "",
          total: "",
          dialysisTime: "",
          dialysisMode: "",
          displacesTotal: "",
          displacesMethod: "",
          hemodialysisDevice: "",
          bloodFilterDevice: "",
          hemoperfusion: "",
          adjustDryWeight: "",
          vascularAccess: "",
          vascularAccessDesc: "",
          bloodFlow: "",
          displaceLiqui: "",
          dialysateFlow: "",
          kalium: "",
          sodium: "",
          calcium: "",
          bicarbonate: "",
          glucose: "",
          remark: "",
          conductivity: "",
          dialysate_temperature: "",
          dialysis_duration_hour:'',
          dialysis_duration_minute:'',
          target_ultrafiltration:'',
          dialysate_formulation:"1",

        }

        //透前评估
        this.dialysisBeforeAsses = {
          module: "dialysisBeforeAsses",
          T: "",
          P: "",
          R: "",
          part: "",
          systolic: "",
          diastolic: "",
          dryWeight: "",
          lastdialysisAfterWeight: "",
          weightWay: "",
          dialysisbeforeWeighed: "",
          clothingWeight: "",
          dialysisbeforeWeight: "",
          weightAdd: "",
          PreDrinkingAmount: "",
          totalAmountOfUltrafiltration: "",
          dialysisInterval: "",
          afterTheLastDialysis: "",
          preExistingSymptoms: "",
          guilty: "",
          catheter: "",
          complications: "",
          is_hemorrhage:'2',
          hemorrhage_value:[],
          hemorrhage:'',
          hemorrhage_other:'',
          blood_access_part_id:'',
          blood_access_part_opera_id:'',
        }


        //接诊评估
        this.receiveTreatmentAsses = {
          module: "receiveTreatmentAsses",
          way: '1',
          consciousness: '1',
          appetite: '1',
          condition: '1',
          posture:'1',
        }


        //双人检查
        this.doubleReview = {
          module: "doubleReview",
          dialysis_item_check: '1',
          dialysis_parameter_check: '1',
          vascular_access_verification: '1',
          pipeline_connection_check: '1',
          dialysis_item_desc: '',
          dialysis_parameter_desc: '',
          vascular_access_desc: '',
          pipeline_connection_desc: '',
          collator: '',
        }


        this.dialysisAfterAsses = {
          module: "dialysisAfterAsses",
          T: "",
          P: "",
          R: "",
          part: "",
          systolic: "",
          diastolic: "",
          actualUfv: "",
          actualSubstituteFluidvolume: "",
          actualtreatHour: "",
          actualtreatmin: "",
          weighWay: "",
          weightAfterDialysi: "",
          weightReduce: "",
          cruor: "",
          symptomsAfterDialysi: "",
          dialysateVolume: "",
          dialysisIntakesFeed: "",
          dialysisIntakesTransfusion: "",
          dialysisIntakesBloodTransfusion: "",
          dialysisIntakesWashpipe: "",
          fistula: "",
          pipe: "",
          complications: "",
          remark: "",
          puncture_point_oozing_blood:'2',
          puncture_point_haematoma:'2',
          internal_fistula_tremor_ac:'3',
          patient_gose:'',
          inpatient_department:'',
          observation_content:'',
          observation_content_other:'',
          observation_content_value:[],
          // evaluator: "",
        }


      }, GetPatinentInfo: function () {
        let patientsParamsQuery = {
          'id': this.patientId,
          'record_date': this.record_date
        }

        PatientInfo(patientsParamsQuery).then(response => {

          this.initModel()


          this.adviceTableData = []

          this.monitoringRecordTableData = []

          this.recordStatus = response.data.data.dialysisStatus

          if (response.data.data.patientInfo.id > 0) {
            //设置用户基本信息
            this.userInfo.userName = response.data.data.patientInfo.name
            if (response.data.data.patientInfo.gender == 2) {
              this.userInfo.gender = '女'
            } else {
              this.userInfo.gender = '男'
            }
            if (response.data.data.patientInfo.source == 1) {
              this.userInfo.label = '门诊'
            } else {
              this.userInfo.label = '住院'
            }

            this.userInfo.birthdate = uParseTime(response.data.data.patientInfo.birthday, '{y}-{m}-{d}')


            this.userInfo.admission_number = response.data.data.patientInfo.admission_number
            this.userInfo.dialysisNumber = response.data.data.patientInfo.dialysis_no
            this.userInfo.inpatientWard = response.data.data.patientInfo.partition_id
            this.userInfo.userName = response.data.data.patientInfo.name
            this.userInfo.dialysisCount = response.data.data.patientInfo.total_dialysis
            this.userInfo.diagnosis = response.data.data.patientInfo.diagnose
            this.userInfo.firstDialysisTime = this.getFormatDate(response.data.data.patientInfo.first_dialysis_date)
            this.userInfo.age = this.calAgeByBirthday(response.data.data.patientInfo.birthday)
            this.userInfo.bed = response.data.data.patientInfo.DialysisSchedule.DeviceNumber.number
            this.userInfo.inpatientWard = response.data.data.patientInfo.DialysisSchedule.DeviceZone.name
          }

          if (response.data.data.dialysisOrder != null) {
            if (response.data.data.dialysisOrder.id > 0) {
              this.dialysisId = response.data.data.dialysisOrder.id
              this.dialysisStatus = response.data.data.dialysisOrder.stage
            }
          }


          //设置透析处方
          if (response.data.data.dialysisPrescription.id > 0) {
            if (response.data.data.isSolution == 1) {
              this.dialysisPrescriptionIsComfirm = false
            } else {
              this.dialysisPrescriptionIsComfirm = true
            }
            this.dialysisPrescription.gaijiliang = response.data.data.dialysisPrescription.anticoagulant_gaijiliang
            this.dialysisPrescription.gaimingcheng = response.data.data.dialysisPrescription.anticoagulant_gaimingcheng
            this.dialysisPrescription.machine = response.data.data.dialysisPrescription.dialyzer
            this.dialysisPrescription.machineType = response.data.data.dialysisPrescription.machine_type
            this.dialysisPrescription.targetDewateringAmount = response.data.data.dialysisPrescription.dewater_amount
            // this.dialysisPrescription.prescriptionDehydration = response.data.data.dialysisPrescription.prescription_dewatering
            this.dialysisPrescription.anticoagulant = response.data.data.dialysisPrescription.anticoagulant
            this.dialysisPrescription.firstDose = response.data.data.dialysisPrescription.anticoagulant_shouji
            this.dialysisPrescription.maintenance = response.data.data.dialysisPrescription.anticoagulant_weichi
            this.dialysisPrescription.total = response.data.data.dialysisPrescription.anticoagulant_zongliang
            this.dialysisPrescription.dialysisTime = response.data.data.dialysisPrescription.dialysis_duration
            this.dialysisPrescription.dialysisMode = response.data.data.dialysisPrescription.mode_id
            this.dialysisPrescription.displacesTotal = response.data.data.dialysisPrescription.replacement_total
            this.dialysisPrescription.displacesMethod = response.data.data.dialysisPrescription.replacement_way
            this.dialysisPrescription.hemodialysisDevice = response.data.data.dialysisPrescription.hemodialysis_machine
            this.dialysisPrescription.bloodFilterDevice = response.data.data.dialysisPrescription.blood_filter
            this.dialysisPrescription.hemoperfusion = response.data.data.dialysisPrescription.perfusion_apparatus
            this.dialysisPrescription.adjustDryWeight = response.data.data.dialysisPrescription.dry_weight
            this.dialysisPrescription.vascularAccess = response.data.data.dialysisPrescription.vascular_access_mode
            this.dialysisPrescription.vascularAccessDesc = response.data.data.dialysisPrescription.vascular_access
            this.dialysisPrescription.bloodFlow = response.data.data.dialysisPrescription.blood_flow_volume
            this.dialysisPrescription.displaceLiqui = response.data.data.dialysisPrescription.displace_liqui
            this.dialysisPrescription.dialysateFlow = response.data.data.dialysisPrescription.dialysate_flow
            this.dialysisPrescription.kalium = response.data.data.dialysisPrescription.kalium
            this.dialysisPrescription.sodium = response.data.data.dialysisPrescription.sodium
            this.dialysisPrescription.calcium = response.data.data.dialysisPrescription.calcium
            this.dialysisPrescription.bicarbonate = response.data.data.dialysisPrescription.bicarbonate
            this.dialysisPrescription.glucose = response.data.data.dialysisPrescription.glucose
            this.dialysisPrescription.remark = response.data.data.dialysisPrescription.remark
            this.dialysisPrescription.conductivity = response.data.data.dialysisPrescription.conductivity
            this.dialysisPrescription.dialysate_temperature = response.data.data.dialysisPrescription.dialysate_temperature
            this.dialysisPrescription.dialysis_duration_hour = response.data.data.dialysisPrescription.dialysis_duration_hour
            this.dialysisPrescription.dialysis_duration_minute = response.data.data.dialysisPrescription.dialysis_duration_minute
            this.dialysisPrescription.target_ultrafiltration = response.data.data.dialysisPrescription.target_ultrafiltration
            this.dialysisPrescription.dialysate_formulation = response.data.data.dialysisPrescription.dialysate_formulation.toString()



            this.dialysisTimeShow = new Date(2018, 1, 1, this.dialysisPrescription.dialysis_duration_hour, this.dialysisPrescription.dialysis_duration_minute)


            //为了打印
            this.setTQdataFromData(response.data.data.dialysisPrescription);


          }


          //设置接诊评估
          if (response.data.data.receiverTreatmentAccess.id > 0) {

            this.receiveTreatmentAssesIsComfirm = true
            this.receiveTreatmentAsses.way = response.data.data.receiverTreatmentAccess.way.toString()
            this.receiveTreatmentAsses.consciousness = response.data.data.receiverTreatmentAccess.consciousness.toString()
            this.receiveTreatmentAsses.appetite = response.data.data.receiverTreatmentAccess.appetite.toString()
            this.receiveTreatmentAsses.condition = response.data.data.receiverTreatmentAccess.condition.toString()
            this.receiveTreatmentAsses.posture = response.data.data.receiverTreatmentAccess.posture.toString()

          }


          //设置透前评估
          if (response.data.data.predialysisEvaluation.id > 0) {
            this.dialysisBeforeAssesIsComfirm = true
            this.dialysisBeforeAsses.T = response.data.data.predialysisEvaluation.temperature
            this.dialysisBeforeAsses.P = response.data.data.predialysisEvaluation.pulse_frequency
            this.dialysisBeforeAsses.R = response.data.data.predialysisEvaluation.breathing_rate
            this.dialysisBeforeAsses.part = response.data.data.predialysisEvaluation.blood_pressure_type
            this.dialysisBeforeAsses.systolic = response.data.data.predialysisEvaluation.systolic_blood_pressure
            this.dialysisBeforeAsses.diastolic = response.data.data.predialysisEvaluation.diastolic_blood_pressure
            this.dialysisBeforeAsses.dryWeight = response.data.data.predialysisEvaluation.dry_weight
            this.dialysisBeforeAsses.lastdialysisAfterWeight = response.data.data.predialysisEvaluation.weight_after_last_transparency
            this.dialysisBeforeAsses.weightWay = response.data.data.predialysisEvaluation.weighing_way
            this.dialysisBeforeAsses.dialysisbeforeWeighed = response.data.data.predialysisEvaluation.weighing_before
            this.dialysisBeforeAsses.clothingWeight = response.data.data.predialysisEvaluation.additional_weight
            this.dialysisBeforeAsses.dialysisbeforeWeight = response.data.data.predialysisEvaluation.weight_before
            this.dialysisBeforeAsses.weightAdd = response.data.data.predialysisEvaluation.weight_gain
            this.dialysisBeforeAsses.PreDrinkingAmount = response.data.data.assessmentAfterDislysis.preloaded_dewatering
            this.dialysisBeforeAsses.totalAmountOfUltrafiltration = response.data.data.predialysisEvaluation.ultrafiltration_amount
            this.dialysisBeforeAsses.dialysisInterval = response.data.data.predialysisEvaluation.dialysis_interphase
            this.dialysisBeforeAsses.afterTheLastDialysis = response.data.data.predialysisEvaluation.last_post_dialysis
            this.dialysisBeforeAsses.preExistingSymptoms = response.data.data.predialysisEvaluation.symptom_before_dialysis
            this.dialysisBeforeAsses.guilty = response.data.data.predialysisEvaluation.internal_fistula
            this.dialysisBeforeAsses.catheter = response.data.data.predialysisEvaluation.catheter
            this.dialysisBeforeAsses.complications = response.data.data.predialysisEvaluation.complication
            this.dialysisBeforeAsses.remark = response.data.data.predialysisEvaluation.remark
            this.dialysisBeforeAsses.is_hemorrhage = response.data.data.predialysisEvaluation.is_hemorrhage.toString();
            this.dialysisBeforeAsses.hemorrhage_other = response.data.data.predialysisEvaluation.hemorrhage_other
            this.dialysisBeforeAsses.hemorrhage_value = response.data.data.predialysisEvaluation.hemorrhage.split(',')
            if (response.data.data.predialysisEvaluation.blood_access_part_opera_id==0) {
              this.dialysisBeforeAsses.blood_access_part_opera_id = ''
            }else {
              this.dialysisBeforeAsses.blood_access_part_opera_id = response.data.data.predialysisEvaluation.blood_access_part_opera_id;
            }
            if (response.data.data.predialysisEvaluation.blood_access_part_id==0) {
              this.dialysisBeforeAsses.blood_access_part_id = ''
            }else {
              this.dialysisBeforeAsses.blood_access_part_id = response.data.data.predialysisEvaluation.blood_access_part_id;
            }

            //为了打印
            this.danPrintData.weight_before = response.data.data.predialysisEvaluation.weight_before
            this.danPrintData.additional_weight = response.data.data.predialysisEvaluation.additional_weight
            this.danPrintData.systolic_blood_pressure = response.data.data.predialysisEvaluation.systolic_blood_pressure
            this.danPrintData.diastolic_blood_pressure = response.data.data.predialysisEvaluation.diastolic_blood_pressure
            this.danPrintData.breathing_rate = response.data.data.predialysisEvaluation.breathing_rate

          }


          //设置医嘱
          var adviceTableDatas = {}
          var subAdviceTableData = {}


          if (response.data.data.doctorAdvice != null) {
            if (response.data.data.doctorAdvice.length > 0) {
              this.doctorAdviceIsComfirm = true
            }
            for (let i = 0; i < response.data.data.doctorAdvice.length; i++) {
              if (response.data.data.doctorAdvice[i].parent_id > 0) {
                subAdviceTableData['advice_content'] = response.data.data.doctorAdvice[i].advice_name
                  + response.data.data.doctorAdvice[i].advice_desc
                  + " "
                  + response.data.data.doctorAdvice[i].single_dose
                  + response.data.data.doctorAdvice[i].single_dose_unit
                  + " "
                  + response.data.data.doctorAdvice[i].prescribing_number
                  + response.data.data.doctorAdvice[i].prescribing_number_unit
                subAdviceTableData['id'] = response.data.data.doctorAdvice[i].id
                subAdviceTableData['parent_id'] = response.data.data.doctorAdvice[i].parent_id
                this.adviceTableData.push(subAdviceTableData);

              } else {


                adviceTableDatas['start_time'] = this.getFormatDate(response.data.data.doctorAdvice[i].start_time)
                adviceTableDatas['advice_content'] = response.data.data.doctorAdvice[i].advice_name
                  + response.data.data.doctorAdvice[i].advice_desc
                  + " "
                  + response.data.data.doctorAdvice[i].single_dose
                  + response.data.data.doctorAdvice[i].single_dose_unit
                  + " "
                  + response.data.data.doctorAdvice[i].prescribing_number
                  + response.data.data.doctorAdvice[i].prescribing_number_unit
                  + " "
                  + response.data.data.doctorAdvice[i].delivery_way
                  + response.data.data.doctorAdvice[i].execution_frequency

                adviceTableDatas['id'] = response.data.data.doctorAdvice[i].id
                adviceTableDatas['parent_id'] = response.data.data.doctorAdvice[i].parent_id
                adviceTableDatas['advice_doctor'] =  response.data.data.doctorAdvice[i].advice_doctor

                if (response.data.data.doctorAdvice[i].execution_time > 0) {
                  adviceTableDatas['execution_time'] = this.getFormatDate(response.data.data.doctorAdvice[i].execution_time)
                }
                adviceTableDatas['execution_staff'] = response.data.data.doctorAdvice[i].execution_staff
                adviceTableDatas['checker'] = response.data.data.doctorAdvice[i].checker


                this.adviceTableData.push(adviceTableDatas);
              }
            }
          }


          //设置双人核对
          if (response.data.data.doubleCheck.id > 0) {

            this.doubleCheckIsComfirm = true
            this.doubleReview.dialysis_item_check = response.data.data.doubleCheck.dialysis_item_check.toString()
            this.doubleReview.dialysis_parameter_check = response.data.data.doubleCheck.dialysis_parameter_check.toString()
            this.doubleReview.vascular_access_verification = response.data.data.doubleCheck.vascular_access_verification.toString()
            this.doubleReview.pipeline_connection_check = response.data.data.doubleCheck.pipeline_connection_check.toString()
            this.doubleReview.dialysis_item_desc = response.data.data.doubleCheck.dialysis_item_desc
            this.doubleReview.dialysis_parameter_desc = response.data.data.doubleCheck.dialysis_parameter_desc
            this.doubleReview.vascular_access_desc = response.data.data.doubleCheck.vascular_access_desc
            this.doubleReview.pipeline_connection_desc = response.data.data.doubleCheck.pipeline_connection_desc
            this.doubleReview.collator = response.data.data.doubleCheck.collator
          }

          //设置透析监测
          if (response.data.data.monitorRecord.length > 0) {
            this.monitoringRecordIsComfirm = true
            for (let i = 0; i < response.data.data.monitorRecord.length; i++) {
              let monitor = {}
              monitor['id'] = response.data.data.monitorRecord[i].id
              monitor['time'] = response.data.data.monitorRecord[i].monitoring_time
              monitor['PB'] = response.data.data.monitorRecord[i].systolic_blood_pressure.toString() + '/' + response.data.data.monitorRecord[i].diastolic_blood_pressure.toString()
              monitor['pulse_frequency'] = response.data.data.monitorRecord[i].pulse_frequency
              monitor['breathing_rate'] = response.data.data.monitorRecord[i].breathing_rate
              monitor['blood_flow_volume'] = response.data.data.monitorRecord[i].blood_flow_volume
              monitor['venous_pressure'] = response.data.data.monitorRecord[i].venous_pressure
              monitor['transmembrane_pressure'] = response.data.data.monitorRecord[i].transmembrane_pressure
              monitor['ultrafiltration_volume'] = response.data.data.monitorRecord[i].ultrafiltration_volume
              monitor['sodium_concentration'] = response.data.data.monitorRecord[i].sodium_concentration
              monitor['dialysate_temperature'] = response.data.data.monitorRecord[i].dialysate_temperature
              monitor['replacement_rate'] = response.data.data.monitorRecord[i].replacement_rate
              monitor['displacement_quantity'] = response.data.data.monitorRecord[i].displacement_quantity
              monitor['symptom'] = response.data.data.monitorRecord[i].symptom
              monitor['dispose'] = response.data.data.monitorRecord[i].dispose
              monitor['replacement_rate'] = response.data.data.monitorRecord[i].replacement_rate
              monitor['results'] = response.data.data.monitorRecord[i].results
              this.monitoringRecordTableData.unshift(monitor)
            }

          }

          if (response.data.data.assessmentAfterDislysis.id > 0) {
            this.dialysisAfterAssesIsComfirm = true

            //设置透后评估
            this.dialysisAfterAsses.T = response.data.data.assessmentAfterDislysis.temperature
            this.dialysisAfterAsses.P = response.data.data.assessmentAfterDislysis.pulse_frequency
            this.dialysisAfterAsses.R = response.data.data.assessmentAfterDislysis.breathing_rate
            this.dialysisAfterAsses.part = response.data.data.assessmentAfterDislysis.blood_pressure_type
            this.dialysisAfterAsses.systolic = response.data.data.assessmentAfterDislysis.systolic_blood_pressure
            this.dialysisAfterAsses.diastolic = response.data.data.assessmentAfterDislysis.diastolic_blood_pressure
            this.dialysisAfterAsses.actualUfv = response.data.data.assessmentAfterDislysis.actual_ultrafiltration
            this.dialysisAfterAsses.actualSubstituteFluidvolume = response.data.data.assessmentAfterDislysis.actual_displacement
            this.dialysisAfterAsses.actualtreatHour = response.data.data.assessmentAfterDislysis.actual_treatment_hour
            this.dialysisAfterAsses.actualtreatmin = response.data.data.assessmentAfterDislysis.actual_treatment_minute
            this.dialysisAfterAsses.weighWay = response.data.data.assessmentAfterDislysis.weighing_way
            this.dialysisAfterAsses.weightAfterDialysi = response.data.data.assessmentAfterDislysis.weight_after
            this.dialysisAfterAsses.weightReduce = response.data.data.assessmentAfterDislysis.weight_loss
            this.dialysisAfterAsses.cruor = response.data.data.assessmentAfterDislysis.cruor
            this.dialysisAfterAsses.symptomsAfterDialysi = response.data.data.assessmentAfterDislysis.symptom_after_dialysis
            this.dialysisAfterAsses.dialysateVolume = response.data.data.assessmentAfterDislysis.dialysis_intakes
            this.dialysisAfterAsses.dialysisIntakesFeed = response.data.data.assessmentAfterDislysis.dialysis_intakes_feed
            this.dialysisAfterAsses.dialysisIntakesTransfusion = response.data.data.assessmentAfterDislysis.dialysis_intakes_transfusion
            this.dialysisAfterAsses.dialysisIntakesBloodTransfusion = response.data.data.assessmentAfterDislysis.dialysis_intakes_blood_transfusion
            this.dialysisAfterAsses.dialysisIntakesWashpipe = response.data.data.assessmentAfterDislysis.dialysis_intakes_washpipe
            this.dialysisAfterAsses.fistula = response.data.data.assessmentAfterDislysis.internal_fistula
            this.dialysisAfterAsses.pipe = response.data.data.assessmentAfterDislysis.catheter
            this.dialysisAfterAsses.complications = response.data.data.assessmentAfterDislysis.complication
            this.dialysisAfterAsses.remark = response.data.data.assessmentAfterDislysis.remark
            this.dialysisAfterAsses.puncture_point_oozing_blood = response.data.data.assessmentAfterDislysis.puncture_point_oozing_blood.toString()
            this.dialysisAfterAsses.puncture_point_haematoma = response.data.data.assessmentAfterDislysis.puncture_point_haematoma.toString()
            this.dialysisAfterAsses.internal_fistula_tremor_ac = response.data.data.assessmentAfterDislysis.internal_fistula_tremor_ac.toString()



            this.dialysisAfterAsses.patient_gose = response.data.data.assessmentAfterDislysis.patient_gose.toString();
            this.dialysisAfterAsses.inpatient_department = response.data.data.assessmentAfterDislysis.inpatient_department
            this.dialysisAfterAsses.observation_content_other = response.data.data.assessmentAfterDislysis.observation_content_other
            this.dialysisAfterAsses.observation_content_value = response.data.data.assessmentAfterDislysis.observation_content.split(',')


          } else {

            this.dialysisAfterAsses = {
              module: "dialysisAfterAsses",
              T: "",
              P: "",
              R: "",
              part: "",
              systolic: "",
              diastolic: "",
              actualUfv: "",
              actualSubstituteFluidvolume: "",
              actualtreatHour: "",
              actualtreatmin: "",
              weighWay: "",
              weightAfterDialysi: "",
              weightReduce: "",
              cruor: "",
              symptomsAfterDialysi: "",
              dialysateVolume: "",
              dialysisIntakesFeed: "",
              dialysisIntakesTransfusion: "",
              dialysisIntakesBloodTransfusion: "",
              dialysisIntakesWashpipe: "",
              fistula: "",
              pipe: "",
              complications: "",
              remark: "",
            }

          }

          if (response.data.data.treatmentSummary.id > 0) {

            this.dialysisSummaryIsComfirm = true
            //设置用户透析小结
            this.dialysisSummary.propagandaAndEducationContent = response.data.data.treatmentSummary.mission
            this.dialysisSummary.summaryContent = response.data.data.treatmentSummary.dialysis_summary
            this.dialysisSummary.changeMedicalNurse = response.data.data.treatmentSummary.sj_nurse
            this.dialysisSummary.checkStaff = response.data.data.treatmentSummary.hd_nurse
            this.dialysisSummary.deboardNurse = response.data.data.treatmentSummary.xj_nurse
            this.dialysisSummary.treatNurse = response.data.data.treatmentSummary.zl_nurse
            this.dialysisSummary.treatDoctor = response.data.data.treatmentSummary.zl_doctor
          } else {


          }


        })

      }, fetchAllDoctorAndNurse() {
        fetchAllDoctorAndNurse().then(response => {
          if (response.data.state == 1) {
            this.doctorOptions = response.data.data.doctors;
          }
        });
      },fistulaDialogComfirm:function (val) {
        this.dialysisAfterAsses.fistula = val.value.join(',')
        this.isVisibiltyForFistulaDialog = false
      },fistulaDialogCancle:function () {
        this.isVisibiltyForFistulaDialog = false

      },pipeDialogComfirm:function (val) {
        this.isVisibiltyForPipeDialog = false
        this.dialysisAfterAsses.pipe = val.value.join(',')

      },pipeDialogCancle:function () {
        this.isVisibiltyForPipeDialog = false

      },  fetchAllAdminUsers() {
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

    },
    watch:{
      "dialysisBeforeAsses.is_hemorrhage":function(){
        if (this.dialysisBeforeAsses.is_hemorrhage==2) {
          this.dialysisBeforeAsses.hemorrhage = '';
          this.dialysisBeforeAsses.hemorrhage_value=[];
          this.dialysisBeforeAsses.hemorrhage_other = '';
        }
      },
      "dialysisBeforeAsses.hemorrhage_value":function(){
        this.dialysisBeforeAsses.hemorrhage = this.dialysisBeforeAsses.hemorrhage_value.join(",");
      },
      "dialysisAfterAsses.observation_content_value":function(){
        this.dialysisAfterAsses.observation_content = this.dialysisAfterAsses.observation_content_value.join(',');
      },
      "dialysisAfterAsses.patient_gose":function(){
        if(this.dialysisAfterAsses.patient_gose!=3) {
          this.dialysisBeforeAsses.observation_content = '';
          this.dialysisBeforeAsses.observation_content_value=[];
          this.dialysisBeforeAsses.observation_content_other = '';
          this.dialysisBeforeAsses.inpatient_department = '';
        }
      }
    }

  }
</script>

<style scoped>
  .shangjidan {
    width: 500px;
    margin: 0 auto;
  }

  .shangjidan .dan-title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin: 0 auto;
    margin-top: 15px;
    padding: 5px 0px;
  }

  .shangjidan .dan-table {
    margin-top: 10px;
    width: 100%;
    line-height: 20px;
    border-collapse: collapse;
  }

  .shangjidan .dan-td-col-2 {
    width: 40px;
  }

  .shangjidan .dan-td-col-4 {
    width: 80px;
  }

  .shangjidan .dan-td-col-3 {
    width: 60px;
  }

  .shangjidan .dan-td-col-5 {
    width: 100px;
  }

  .shangjidan .dan-td-col-1 {
    width: 20px;
  }

  .shangjidan .dan-td {
    border-bottom: 1px solid #666;
    text-align: center;
    max-width: 200px;
  }

  .shangjidan .dan-value {
    width: 100%;
    margin: 0px 2px;
  }

  .shangjidan .dan-main {
    border-bottom: 1px solid #666;
    border-top: 1px solid #666;
    padding: 10px 5px;
  }
</style>
