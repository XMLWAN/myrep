<template>
  <div class="app-container ">
    <div class="order-print-btn"
         v-loading="loading"
         element-loading-text="加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
         style="width: 100%;">
      <el-button type="primary" icon="el-icon-printer" @click="printThisPage">打印</el-button>
    </div>
    <div id="dialysis-print-box">
      <div class="dialysis-print-order">
        <div class="order-yy-name">{{orgname}}</div>
        <div class="order-title">血液净化治疗记录单</div>
        <table class="table-box" style="margin-top: 10px;">
          <tbody>
          <tr>
            <td width="50">姓 名:</td>
            <td width="90">
              <div class="under-line">&nbsp;{{patientInfo.name}}</div>
            </td>
            <td width="50">性 别:</td>
            <td width="120">
              <div>
                <label-box :isChecked='patientInfo_gender_1' showValue='男'></label-box>
                &nbsp;
                <label-box :isChecked='patientInfo_gender_2' showValue='女'></label-box>
              </div>
            </td>
            <td width="50">年 龄:</td>
            <td width="40">
              <div class="under-line">&nbsp;{{patientInfo.age}}</div>
            </td>
            <td>岁</td>
            <td width="10">&nbsp;</td>

            <td width="50">科 室:</td>
            <td width="200">
              <div>
                <label-box :isChecked='patientInfo_source_1' showValue='门 诊 透 析'></label-box>
                &nbsp;
                <label-box :isChecked='patientInfo_source_2' showValue='住 院'></label-box>
              </div>
            </td>

          </tr>
          </tbody>
        </table>
        <table class="table-box" style="margin-top: 10px;">
          <tbody>
          <tr>
            <td width="130">住院号/透析卡号:</td>
            <td width="90">
              <div class="under-line">&nbsp;{{patientInfo.admission_number?patientInfo.admission_number:'无'}}
                /{{patientInfo.dialysis_no}}
              </div>
            </td>

            <td width="40">诊 断:</td>
            <td width="">
              <div class="under-line">&nbsp;{{patientInfo.diagnose}}</div>
            </td>

            <td width="80">治 疗 日 期:</td>
            <td width="120">
              <div class="under-line">&nbsp;<span>{{queryParams.xtdate}}</span></div>
            </td>

          </tr>
          </tbody>
        </table>
        <table class="print-table" border="1">
          <tbody>
          <tr>
            <td width="30px" class="title-box">透前评估</td>
            <td>
              <table class="table-box">
                <tbody>
                <tr>
                  <td width="70">入院方式:</td>
                  <td width="230">
                    <div>
                      <label-box :isChecked='receiverTreatmentAccess.way==1?true:false' showValue='步行'></label-box>
                      &nbsp;
                      <label-box :isChecked='receiverTreatmentAccess.way==2?true:false' showValue='扶行'></label-box>
                      &nbsp;
                      <label-box :isChecked='receiverTreatmentAccess.way==3?true:false' showValue='轮椅'></label-box>
                      &nbsp;
                      <label-box :isChecked='receiverTreatmentAccess.way==4?true:false' showValue='平车'></label-box>
                    </div>
                  </td>

                  <td></td>
                  <td width="50">意识:</td>
                  <td width="180">
                    <div>
                      <label-box :isChecked='receiverTreatmentAccess.consciousness==1?true:false'
                                 showValue='清醒'></label-box>
                      &nbsp;
                      <label-box :isChecked='receiverTreatmentAccess.consciousness==2?true:false'
                                 showValue='嗜睡'></label-box>
                      &nbsp;
                      <label-box :isChecked='receiverTreatmentAccess.consciousness==3?true:false'
                                 showValue='昏迷'></label-box>
                    </div>
                  </td>
                  <td></td>
                  <td width="50">体温:</td>
                  <td width="100">
                    <div class="under-line">&nbsp;{{predialysis.temperature?predialysis.temperature:''}}</div>
                  </td>
                  <td width="35">℃</td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="40">体位:</td>
                  <td width="400">
                    <div>
                      <label-box :isChecked='receiverTreatmentAccess.posture==1?true:false'
                                 showValue='自动体位'></label-box>
                      &nbsp;
                      <label-box :isChecked='receiverTreatmentAccess.posture==2?true:false' showValue='平卧位'></label-box>
                      &nbsp;
                      <label-box :isChecked='receiverTreatmentAccess.posture==3?true:false' showValue='半卧位'></label-box>
                      &nbsp;
                      <label-box :isChecked='receiverTreatmentAccess.posture==4?true:false' showValue='端坐位'></label-box>
                      &nbsp;
                      <label-box :isChecked='receiverTreatmentAccess.posture==5?true:false'
                                 showValue='躁动不安'></label-box>
                      &nbsp;
                    </div>
                  </td>
                  <td></td>
                </tr>
                </tbody>
              </table>
              <table class="table-box">
                <tbody>
                <tr>
                  <td width="40">出血:</td>
                  <td width="95">
                    <div>
                      <label-box :isChecked='predialysis.is_hemorrhage==2?true:false' showValue='无'></label-box>
                      &nbsp;
                      <label-box :isChecked='predialysis.is_hemorrhage==1?true:false' showValue='有'></label-box>
                    </div>
                  </td>
                  <td width="10">(</td>
                  <td width="380">
                    <div>
                      <label-box
                        :isChecked="predialysis.is_hemorrhage==1&&predialysis.hemorrhage.indexOf('穿刺点渗血')>-1?true:false"
                        showValue='穿刺点渗血'></label-box>
                      &nbsp;
                      <label-box
                        :isChecked="predialysis.is_hemorrhage==1&&predialysis.hemorrhage.indexOf('牙龈出血')>-1?true:false"
                        showValue='牙龈出血'></label-box>
                      &nbsp;
                      <label-box
                        :isChecked="predialysis.is_hemorrhage==1&&predialysis.hemorrhage.indexOf('消化道出血')>-1?true:false"
                        showValue='消化道出血'></label-box>
                      &nbsp;
                      <label-box
                        :isChecked="predialysis.is_hemorrhage==1&&predialysis.hemorrhage.indexOf('女性经期')>-1?true:false"
                        showValue='女性经期'></label-box>
                    </div>
                  </td>

                  <td width="35">其它</td>
                  <td width="">
                    <div class="under-line">&nbsp;
                      <span v-if="predialysis.is_hemorrhage==1">{{predialysis.hemorrhage_other}}</span>
                    </div>
                  </td>
                  <td width="10">)</td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="70">血管通路:</td>
                  <td width="400">
                    <div>
                      <label-box :isChecked="predialysis.blood_access_part_opera_name.indexOf('自体内瘘')>-1?true:false"
                                 showValue='自体内瘘'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.blood_access_part_opera_name.indexOf('人造血管')>-1?true:false"
                                 showValue='人造血管'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.blood_access_part_opera_name.indexOf('直穿')>-1?true:false"
                                 showValue='直穿'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.blood_access_part_opera_name.indexOf('颈内静脉')>-1?true:false"
                                 showValue='颈内静脉'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.blood_access_part_opera_name.indexOf('股静脉')>-1?true:false"
                                 showValue='股静脉'></label-box>
                      &nbsp;
                    </div>
                  </td>

                  <td></td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="40">内瘘:</td>
                  <td width="35">震颤</td>
                  <td width="10">(</td>
                  <td width="180">
                    <div>
                      <label-box :isChecked="predialysis.internal_fistula.indexOf('震颤-存在')>-1?true:false"
                                 showValue='存在'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.internal_fistula.indexOf('震颤-减弱')>-1?true:false"
                                 showValue='减弱'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.internal_fistula.indexOf('震颤-无')>-1?true:false"
                                 showValue='无'></label-box>
                    </div>
                  </td>
                  <td width="10">)</td>

                  <td width="95">内瘘皮肤情况</td>
                  <td width="10">(</td>
                  <td width="220">
                    <div>
                      <label-box :isChecked="predialysis.internal_fistula_skin.indexOf('正常')>-1?true:false"
                                 showValue='正常'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.internal_fistula_skin.indexOf('瘀斑')>-1?true:false"
                                 showValue='瘀斑'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.internal_fistula_skin.indexOf('红')>-1?true:false"
                                 showValue='红'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.internal_fistula_skin.indexOf('肿')>-1?true:false"
                                 showValue='肿'></label-box>
                    </div>
                  </td>
                  <td width="10">)</td>
                  <td></td>
                </tr>
                </tbody>
              </table>
              <table class="table-box">
                <tbody>
                <tr>
                  <td width="40">导管:</td>
                  <td width="50">穿刺口</td>
                  <td width="10">(</td>
                  <td width="250">
                    <div>
                      <label-box :isChecked="predialysis.catheter.indexOf('穿刺口-干洁')>-1?true:false"
                                 showValue='干洁'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.catheter.indexOf('穿刺口-红肿')>-1?true:false"
                                 showValue='红肿'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.catheter.indexOf('穿刺口-分泌物')>-1?true:false"
                                 showValue='分泌物'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.catheter.indexOf('穿刺口-渗血')>-1?true:false"
                                 showValue='渗血'></label-box>
                    </div>
                  </td>
                  <td width="10">)</td>

                  <td width="65">导管打折</td>
                  <td width="10">(</td>
                  <td width="80">
                    <div>
                      <label-box :isChecked="predialysis.catheter_bend == 1?true:false" showValue='有'></label-box>
                      &nbsp;
                      <label-box :isChecked="predialysis.catheter_bend != 1?true:false" showValue='无'></label-box>
                    </div>
                  </td>
                  <td width="10">)</td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>

        <table class="print-table" border="1">
          <tbody>
          <tr>
            <td width="30px" class="title-box">透析处方</td>
            <td>
              <table class="table-box">
                <tbody>
                <tr>
                  <td width="70">透析时间:</td>
                  <td width="40">
                    <div class="under-line">&nbsp;{{prescription.dialysis_duration_hour?prescription.dialysis_duration_hour:''}}</div>
                  </td>
                  <td width="10">h</td>
                  <td width="40">
                    <div class="under-line">&nbsp;{{prescription.dialysis_duration_minute?prescription.dialysis_duration_minute:''}}</div>
                  </td>
                  <td width="35">min</td>
                  <td></td>
                  <td width="55">血流量:</td>
                  <td width="60">
                    <div class="under-line">&nbsp;{{prescription.blood_flow_volume?prescription.blood_flow_volume:''}}</div>
                  </td>
                  <td width="60">ml/min</td>
                  <td></td>
                  <td width="40">体重:</td>
                  <td width="35">透前</td>
                  <td width="50">
                    <div class="under-line">&nbsp;{{predialysis.weight_before?predialysis.weight_before:''}}</div>
                  </td>
                  <td width="20">Kg</td>
                  <td width="45">干体重</td>
                  <td width="50">
                    <div class="under-line">&nbsp;{{predialysis.dry_weight?predialysis.dry_weight:''}}</div>
                  </td>
                  <td width="20">Kg</td>
                  <td></td>
                  <td width="85">目标超滤量:</td>
                  <td width="70">
                    <div class="under-line">&nbsp;{{prescription.target_ultrafiltration?prescription.target_ultrafiltration:''}}</div>
                  </td>
                  <td width="20">ml</td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="70">抗凝方式:</td>
                  <td width="80">
                    <label-box :isChecked="prescription.anticoagulant==2?true:false" showValue='普通肝素'></label-box>
                  </td>
                  <td width="10">(</td>
                  <td width="35">首剂</td>
                  <td width="40">
                    <div class="under-line">&nbsp;
                      <span v-if="prescription.anticoagulant==2">{{prescription.anticoagulant_shouji}}</span>
                    </div>
                  </td>
                  <td width="20">mg</td>
                  <td width="10"></td>
                  <td width="35">维持</td>
                  <td width="40">
                    <div class="under-line">&nbsp;
                      <span v-if="prescription.anticoagulant==2">{{prescription.anticoagulant_weichi}}</span>
                    </div>
                  </td>
                  <td width="40">mg/h</td>
                  <td width="10">)</td>

                  <td width="95">
                    <label-box :isChecked="prescription.anticoagulant==3?true:false" showValue='低分子肝素'></label-box>
                  </td>
                  <td width="60">
                    <div class="under-line">&nbsp;
                      <span v-if="prescription.anticoagulant==3">{{prescription.anticoagulant_zongliang}}</span>
                    </div>
                  </td>
                  <td width="20">IU</td>

                  <td width="80">
                    <label-box :isChecked="prescription.anticoagulant==1?true:false" showValue='无肝素'></label-box>
                  </td>

                  <td width="70">其他方式:</td>
                  <td width="">
                    <div class="under-line">&nbsp;
                      <span v-if="prescription.anticoagulant>3">{{prescription.anticoagulant_name}}</span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>


              <table class="table-box">
                <tbody>
                <tr>
                  <td width="85">透析液配方:</td>
                  <td width="50">
                    <label-box :isChecked="prescription.dialysate_formulation_name.indexOf('常规')>-1?true:false"
                               showValue='常规'></label-box>
                  </td>
                  <td width="50">
                    <label-box :isChecked="prescription.dialysate_formulation_name.indexOf('低钙')>-1?true:false"
                               showValue='低钙'></label-box>
                  </td>
                  <td width="120">
                    (
                    <label class="radio-lebel-box">
                      <!-- <span class="radio-inner">
                          <span class="radio-fang " ></span>
                          <input  type="radio" class="radio-no" value="1">
                      </span> -->
                      <span> 1.25mmol/L</span>
                    </label>
                    )
                  </td>
                  <td width="50">
                    <label-box :isChecked="prescription.dialysate_formulation_name.indexOf('高钙')>-1?true:false"
                               showValue='高钙'></label-box>
                  </td>
                  <td width="100">
                    ( 1.75mmol/L )
                  </td>

                  <td width="50">
                    <label-box :isChecked="prescription.dialysate_formulation_name.indexOf('低钠')>-1?true:false"
                               showValue='低钠'></label-box>
                  </td>
                  <td width="110">
                    (
                    <label class="radio-lebel-box">
                      <!-- <span class="radio-inner">
                          <span class="radio-fang " ></span>
                          <input  type="radio" class="radio-no" value="1">
                      </span> -->
                      <span> 135mmol/L</span>
                    </label>
                    )
                  </td>
                  <td width="50">
                    <label-box :isChecked="prescription.dialysate_formulation_name.indexOf('高钠')>-1?true:false"
                               showValue='高钠'></label-box>
                  </td>
                  <td width="100">
                    ( 145mmol/L )
                  </td>
                  <td></td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="55">置换量:</td>
                  <td width="40">
                    <div class="under-line">&nbsp;{{prescription.replacement_total?prescription.replacement_total:''}}</div>
                  </td>
                  <td width="10">L</td>
                  <td width="10"></td>
                  <td width="70">治疗方式:</td>
                  <td width="50">
                    <label-box :isChecked="prescription.mode_id==1?true:false" showValue='HD'></label-box>
                  </td>
                  <td width="50">
                    <label-box :isChecked="prescription.mode_id==2?true:false" showValue='HDF'></label-box>
                  </td>
                  <td width="50">
                    <label-box :isChecked="prescription.mode_id==5?true:false" showValue='HF'></label-box>
                  </td>
                  <td width="50">
                    <label-box :isChecked="prescription.mode_id==4?true:false" showValue='HP'></label-box>
                  </td>
                  <td width="80">
                    <label-box :isChecked="prescription.mode_id==3?true:false" showValue='HD+HP'></label-box>
                  </td>

                  <td width="35">其他</td>
                  <td width="100">
                    <div class="under-line">&nbsp;
                      <span v-if="prescription.mode_id>5">{{prescription.mode}}</span>
                    </div>
                  </td>

                  <td width="140">透析器/灌流器型号:</td>
                  <td width="">
                    <div class="under-line">&nbsp;{{prescription.dialyzer_perfusion_apparatus}}</div>
                  </td>

                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="70">透析机号:</td>
                  <td width="100">
                    <div class="under-line">{{getNumber()}}</div>
                  </td>
                  <td width=""></td>

                  <td width="70">医生签名:</td>
                  <td width="100">
                    <div class="under-line">
                      <span v-if="advices.length == 0"></span>
                      <span v-else-if="setAdminUserES(advices[0][0].advice_doctor) == ''">{{getAdminUser(advices[0][0].advice_doctor)}}</span>
                      <img class="es-img" :src="setAdminUserES(advices[0][0].advice_doctor)"
                           alt="" srcset="" v-else>

                      <!-- {{getXuserName(prescription.prescription_doctor)}} -->
                    </div>
                  </td>
                  <td width="70">上机护士:</td>
                  <td width="100">
                    <div class="under-line">
                      <span v-if="setAdminUserES(dialysisOrder==null?0:dialysisOrder.start_nurse) == ''">{{getAdminUser(dialysisOrder==null?0:dialysisOrder.start_nurse)}}</span>
                      <img class="es-img" :src="setAdminUserES(dialysisOrder==null?0:dialysisOrder.start_nurse)"
                           alt="" srcset="" v-else>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>


        <table class="print-table" border="1">
          <tbody>
          <tr>
            <td :rowspan="jilurow" width="30px" class="title-box">透析中记录</td>

            <td width="100">时间</td>
            <td width="80">血压<br/>mmHg</td>
            <td width="40">脉率<br/>次/分</td>
            <td width="40">呼吸<br/>次/分</td>
            <td width="60">血流量<br/>ml/min</td>
            <td width="60">超滤量<br/>L</td>
            <td width="60">置换量<br/>L</td>
            <td width="60">静脉压<br/>mmHg</td>
            <td width="60">跨膜压<br/>mmHg</td>
            <!-- <td width="60">钠浓度<br/>mmol/L</td>
            <td width="80">透析液温度<br/>℃</td>
            <td width="60">置换率<br/>ml/min</td> -->

            <td width="">备 注</td>
          </tr>


          <tr v-for="monitor in monitors" :key="monitor.id">
            <td>&nbsp;
              <!-- <template>
                  <span v-if="monitor.monitoring_date">
                      {{monitor.monitoring_date | parseTime('{y}-{m}-{d}')}}
                  </span>
              </template>     -->
              {{getTime(monitor.operate_time,'{h}:{i}')}}
            </td>
            <td>&nbsp;{{monitor.systolic_blood_pressure?monitor.systolic_blood_pressure:''}} / {{monitor.diastolic_blood_pressure?monitor.diastolic_blood_pressure:''}}</td>
            <td>&nbsp;{{monitor.pulse_frequency?monitor.pulse_frequency:''}}</td>
            <td>&nbsp;{{monitor.breathing_rate?monitor.breathing_rate:''}}</td>
            <td>&nbsp;{{monitor.blood_flow_volume?monitor.blood_flow_volume:''}}</td>
            <td>&nbsp;{{monitor.ultrafiltration_volume?monitor.ultrafiltration_volume:''}}</td>
            <td>&nbsp;{{monitor.displacement_quantity?monitor.displacement_quantity:''}}</td>
            <td>&nbsp;{{monitor.venous_pressure?monitor.venous_pressure:''}}</td>
            <td>&nbsp;{{monitor.transmembrane_pressure?monitor.transmembrane_pressure:''}}</td>
            <!-- <td>&nbsp;{{monitor.sodium_concentration}}</td>
            <td>&nbsp;{{monitor.dialysate_temperature}}</td>
            <td>&nbsp;{{monitor.replacement_rate}}</td> -->
            <td>&nbsp;{{monitor.symptom}}
              &nbsp;{{monitor.dispose}}
              &nbsp;{{monitor.result}}
            </td>
          </tr>
          </tbody>
        </table>

        <table class="print-table" border="1">
          <tbody>
          <tr>
            <td class="title-box" width="30px">透后评估</td>
            <td>
              <table class="table-box">
                <tbody>
                <tr>
                  <td width="90">实际治疗时间</td>
                  <td width="40">
                    <div class="under-line">&nbsp;{{afterdialysis.actual_treatment_hour?afterdialysis.actual_treatment_hour:''}}</div>
                  </td>
                  <td width="10">h</td>
                  <td width="40">
                    <div class="under-line">&nbsp;{{afterdialysis.actual_treatment_minute?afterdialysis.actual_treatment_minute:''}}</div>
                  </td>
                  <td width="35">min</td>
                  <td></td>
                  <td width="75">实际超滤量</td>
                  <td width="70">
                    <div class="under-line">&nbsp;{{afterdialysis.actual_ultrafiltration?afterdialysis.actual_ultrafiltration:''}}</div>
                  </td>
                  <td width="20">ml</td>
                  <td></td>
                  <td width="60">透后体重</td>
                  <td width="50">
                    <div class="under-line">&nbsp;{{afterdialysis.weight_after?afterdialysis.weight_after:''}}</div>
                  </td>
                  <td width="20">Kg</td>
                  <td></td>
                  <td width="95">透析器凝血:</td>
                  <td width="220">
                    <label-box :isChecked="afterdialysis.txqnx==0?true:false" showValue='0 级'></label-box>
                    <label-box :isChecked="afterdialysis.txqnx==1?true:false" showValue='Ⅰ 级'></label-box>
                    <label-box :isChecked="afterdialysis.txqnx==2?true:false" showValue='Ⅱ 级'></label-box>
                    <label-box :isChecked="afterdialysis.txqnx==3?true:false" showValue='Ⅲ 级'></label-box>
                  </td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="130">拔针后穿刺点渗血:</td>
                  <td width="80">
                    <label-box :isChecked="afterdialysis.puncture_point_oozing_blood==1?true:false"
                               showValue='有'></label-box>
                    <label-box :isChecked="afterdialysis.puncture_point_oozing_blood!=1?true:false"
                               showValue='无'></label-box>
                  </td>
                  <td width="10"></td>
                  <td width="85">穿刺处血肿:</td>
                  <td width="80">
                    <label-box :isChecked="afterdialysis.puncture_point_haematoma==1?true:false"
                               showValue='有'></label-box>
                    <label-box :isChecked="afterdialysis.puncture_point_haematoma!=1?true:false"
                               showValue='无'></label-box>
                  </td>

                  <td width="10"></td>
                  <td width="105">压迫后内瘘震颤:</td>
                  <td width="140">
                    <label-box :isChecked="afterdialysis.internal_fistula_tremor_ac==1?true:false"
                               showValue='存在'></label-box>
                    <label-box :isChecked="afterdialysis.internal_fistula_tremor_ac==2?true:false"
                               showValue='减弱'></label-box>
                    <label-box :isChecked="afterdialysis.internal_fistula_tremor_ac==3?true:false"
                               showValue='无'></label-box>
                  </td>
                  <td width="">
                  </td>
                </tr>
                </tbody>
              </table>


              <table class="table-box">
                <tbody>
                <tr>
                  <td width="55">并发症:</td>
                  <td width="600">
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('低血压')>-1?true:false"
                               showValue='低血压'></label-box>
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('高血压')>-1?true:false"
                               showValue='高血压'></label-box>
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('心律失常')>-1?true:false"
                               showValue='心律失常'></label-box>
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('头晕')>-1?true:false"
                               showValue='头晕'></label-box>
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('头痛')>-1?true:false"
                               showValue='头痛'></label-box>
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('呕吐')>-1?true:false"
                               showValue='呕吐'></label-box>
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('抽搐')>-1?true:false"
                               showValue='抽搐'></label-box>
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('出血')>-1?true:false"
                               showValue='出血'></label-box>
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('心衰')>-1?true:false"
                               showValue='心衰'></label-box>
                    <label-box :isChecked="afterdialysis.complications_index.indexOf('腹痛')>-1?true:false"
                               showValue='腹痛'></label-box>

                  </td>
                  <td></td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="70">其他记录:</td>
                  <td width="">
                    <div class="under-line">&nbsp;{{afterdialysis.complications_other}}</div>
                  </td>
                </tr>
                </tbody>
              </table>
              <table class="table-box">
                <tbody>
                <tr>
                  <td width="">
                    <div class="under-line">&nbsp;</div>
                  </td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="70">患者去向:</td>
                  <td width="160">
                    <label-box :isChecked="afterdialysis.patient_gose==1?true:false" showValue='离院'></label-box>
                    <label-box :isChecked="afterdialysis.patient_gose==2?true:false" showValue='留观'></label-box>
                    <label-box :isChecked="afterdialysis.patient_gose==3?true:false" showValue='住院'></label-box>
                  </td>
                  <td width="10">(</td>
                  <td width="35">科室</td>
                  <td width="">
                    <div class="under-line">&nbsp;
                      <span v-if="afterdialysis.patient_gose==3">{{afterdialysis.inpatient_department}}</span>
                    </div>
                  </td>
                  <td width="220">交待病房护士/患者/陪人观察内容:</td>
                  <td width="160">
                    <label-box
                      :isChecked="afterdialysis.patient_gose==3&&afterdialysis.observation_content.indexOf('意识状态')>-1?true:false"
                      showValue='意识状态'></label-box>
                    <label-box
                      :isChecked="afterdialysis.patient_gose==3&&afterdialysis.observation_content.indexOf('生命体征')>-1?true:false"
                      showValue='生命体征'></label-box>
                  </td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="530">
                    <label-box
                      :isChecked="afterdialysis.patient_gose==3&&afterdialysis.observation_content.indexOf('内瘘搏动/渗血')>-1?true:false"
                      showValue='内瘘搏动/渗血'></label-box>
                    <label-box
                      :isChecked="afterdialysis.patient_gose==3&&afterdialysis.observation_content.indexOf('导管固定/穿刺口渗血')>-1?true:false"
                      showValue='导管固定/穿刺口渗血'></label-box>
                    <label-box
                      :isChecked="afterdialysis.patient_gose==3&&afterdialysis.observation_content.indexOf('动静脉直接穿刺口渗血/肢端循环情况')>-1?true:false"
                      showValue='动静脉直接穿刺口渗血/肢端循环情况'></label-box>
                  </td>
                  <td width="40">其他:</td>
                  <td width="">
                    <div class="under-line">&nbsp;
                      <span v-if="afterdialysis.patient_gose==3">{{afterdialysis.observation_content_other}}
                                                        </span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>

              <table class="table-box">
                <tbody>
                <tr>
                  <td width="150">当班责任（核对）护士:</td>
                  <td width="100">
                    <div class="under-line">
                      <!--<span v-if="afterdialysis.creater==0">&nbsp;</span>-->
                      <!--<img class="es-img" :src="setAdminUserES(afterdialysis.creater)" alt="" srcset="" v-else>-->


                      <span
                        v-if="setAdminUserES(afterdialysis.creater) == ''">{{getAdminUser(afterdialysis.creater)}}</span>
                      <img class="es-img" :src="setAdminUserES(afterdialysis.creater)"
                           alt="" srcset="" v-else>


                    </div>
                  </td>
                  <td width=""></td>
                  <td width="70">下机护士:</td>
                  <td width="100">
                    <div class="under-line">


                      <span v-if="setAdminUserES(dialysisOrder==null?0:dialysisOrder.finish_nurse) == ''">{{getAdminUser(dialysisOrder==null?0:dialysisOrder.finish_nurse)}}</span>
                      <img class="es-img" :src="setAdminUserES(dialysisOrder==null?0:dialysisOrder.finish_nurse)"
                           alt="" srcset="" v-else>

                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>

        <table class="print-table-no" border="1" count="0">
          <tbody>
          <tr>
            <td width="40px">时间</td>
            <td width="120px">医嘱内容</td>
            <td width="80px">医生签名</td>
            <td width="80px">执行护士</td>
            <td width="55px">执行时间</td>
            <td width="75px">核对护士</td>
            <td width="10px"></td>
            <td width="40px">时间</td>
            <td width="120px">医嘱内容</td>
            <td width="80px">医生签名</td>
            <td width="80px">执行护士</td>
            <td width="55px">执行时间</td>
            <td width="75px">核对护士</td>
          </tr>
          <tr v-for="(advice, index) in advices" :key="index">
            <td height="10px">
                                <span v-if="advice[0].start_time">
                                  {{getTime(advice[0].start_time,'{h}:{i}')}}
                                </span>
              <span v-else>&nbsp;<br/>&nbsp;</span>
            </td>
            <td class="advice-name">
              <span v-if="advice[0].parent_id>0">└</span>
              <span>{{advice[0].advice_name }}</span>
              <span>{{advice[0].advice_desc}}</span>
              <!-- <span v-if="advice[0].drug_spec">{{advice[0].drug_spec}}{{advice[0].drug_spec_unit}}</span> -->
              <span v-if="advice[0].prescribing_number">* {{advice[0].prescribing_number}}{{advice[0].prescribing_number_unit}}</span>
              <span v-if="advice[0].single_dose != 0">单次用量 {{advice[0].single_dose}}{{advice[0].single_dose_unit}}</span>
              <span>{{advice[0].delivery_way}}</span>
              <span>{{advice[0].execution_frequency}}</span>
              <div v-for="(child, childindex) in advice[0].children" :key="childindex" class="advice-children">
                <div>▲</div>
                <div>
                  <span>{{child.advice_name }}</span>
                  <span>{{child.advice_desc}}</span>
                  <span v-if="child.drug_spec">{{child.drug_spec}}{{child.drug_spec_unit}}</span>
                  <span
                    v-if="child.prescribing_number">* {{child.prescribing_number}}{{child.prescribing_number_unit}}</span>
                  <span v-if="child.single_dose != 0">单次用量 {{child.single_dose}}{{child.single_dose_unit}}</span>
                </div>
              </div>

            </td>

            <td>
              <!--<img class="es-img" :src="setAdminUserES(advice[0].advice_doctor)" alt="" srcset=""-->
              <!--v-show="advice[0].advice_doctor>0">-->
              <!---->
              <span
                v-if="setAdminUserES(advice[0].advice_doctor) == ''">{{getAdminUser(advice[0].advice_doctor)}}</span>
              <img class="es-img" :src="setAdminUserES(advice[0].advice_doctor)"
                   alt="" srcset="" v-else>
            </td>
            <td>
              <!--<img class="es-img" :src="setAdminUserES(advice[0].execution_staff)" alt="" srcset=""-->
              <!--v-show="advice[0].execution_staff>0">-->

              <span
                v-if="setAdminUserES(advice[0].execution_staff) == ''">{{getAdminUser(advice[0].execution_staff)}}</span>
              <img class="es-img" :src="setAdminUserES(advice[0].execution_staff)"
                   alt="" srcset="" v-else>

            </td>
            <td><span v-if="advice[0].execution_time">
                <!--{{advice[0].execution_time| parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}-->
                  {{getTime(advice[0].execution_time,'{h}:{i}')}}
                </span>
            </td>
            <td>
              <!--<img class="es-img" :src="setAdminUserES(advice[0].checker)" alt="" srcset=""-->
              <!--v-show="advice[0].checker>0">-->

              <span v-if="setAdminUserES(advice[0].checker) == ''">{{getAdminUser(advice[0].checker)}}</span>
              <img class="es-img" :src="setAdminUserES(advice[0].checker)"
                   alt="" srcset="" v-else>

            </td>
            <td></td>
            <td v-if="advice[1] != undefined">
                                <span v-if="advice[1].start_time">
                                    <!-- {{advice[1].start_time | parseTime('{y}-{m}-{d} {h}:{i}')}} -->
                                  {{getTime(advice[1].start_time,'{h}:{i}')}}
                                </span>
            </td>
            <td v-else>
              <span></span>
            </td>
            <td class="advice-name" v-if="advice[1] != undefined">
              <span>{{advice[1].advice_name }}</span>
              <span>{{advice[1].advice_desc}}</span>
              <!-- <span v-if="advice[1].drug_spec">{{advice[1].drug_spec}}{{advice[1].drug_spec_unit}}</span> -->
              <span v-if="advice[1].prescribing_number">* {{advice[1].prescribing_number}}{{advice[1].prescribing_number_unit}}</span>
              <span v-if="advice[1].single_dose != 0">单次用量 {{advice[1].single_dose}}{{advice[1].single_dose_unit}}</span>
              <span>{{advice[1].delivery_way}}</span>
              <span>{{advice[1].execution_frequency}}</span>

              <div v-for="(child, childindex) in advice[1].children" :key="childindex" class="advice-children">
                <div>▲</div>
                <div>
                  <span>{{child.advice_name }}</span>
                  <span>{{child.advice_desc}}</span>
                  <span v-if="child.drug_spec">{{child.drug_spec}}{{child.drug_spec_unit}}</span>
                  <span
                    v-if="child.prescribing_number">* {{child.prescribing_number}}{{child.prescribing_number_unit}}</span>
                  <span v-if="child.single_dose != 0">单次用量 {{child.single_dose}}{{child.single_dose_unit}}</span>
                </div>
              </div>
            </td>
            <td v-else>
              <span></span>
            </td>
            <td v-if="advice[1] != undefined">
              <!--<img class="es-img" :src="setAdminUserES(advice[1].advice_doctor)" alt="" srcset=""-->
              <!--v-show="advice[1].advice_doctor>0"></td>-->

              <span
                v-if="setAdminUserES(advice[1].advice_doctor) == ''">{{getAdminUser(advice[1].advice_doctor)}}</span>
              <img class="es-img" :src="setAdminUserES(advice[1].advice_doctor)"
                   alt="" srcset="" v-else>

            </td>

            <td v-else>
              <span></span>
            </td>

            <td v-if="advice[1] != undefined">
              <!--<img class="es-img" :src="setAdminUserES(advice[1].execution_staff)" alt="" srcset=""-->
              <!--v-show="advice[1].execution_staff>0">-->

              <span
                v-if="setAdminUserES(advice[1].execution_staff) == ''">{{getAdminUser(advice[1].execution_staff)}}</span>
              <img class="es-img" :src="setAdminUserES(advice[1].execution_staff)"
                   alt="" srcset="" v-else>

            </td>
            <!--<td><span v-if="advice[1].execution_time">{{advice[1].execution_time| parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>-->
            <!--</td>-->
            <td v-else>
              <span></span>
            </td>


            <td v-if="advice[1] != undefined">
              <span v-if="advice[1].execution_time">{{getTime(advice[1].execution_time,'{h}:{i}')}}</span>
            </td>
            <td v-else>
              <span></span>
            </td>


            <td v-if="advice[1] != undefined">
              <!--<img class="es-img" :src="setAdminUserES(advice[1].checker)" alt="" srcset=""-->
              <!--v-show="advice[1].checker>0">-->
              <!--<span v-show="advice[1].checker>0">setAdminUserES(advice[1].checker)</span>-->
              <span v-if="setAdminUserES(advice[1].checker) == ''">{{getAdminUser(advice[1].checker)}}</span>
              <img class="es-img" :src="setAdminUserES(advice[1].checker)"
                   alt="" srcset="" v-else>

            </td>
            <td v-else>
              <span></span>
            </td>
          </tr>
          </tbody>
        </table>


        <table class="table-box" style="margin-top: 10px;">
          <tbody>
          <tr>
            <td width="" style="font-size:13px">
              注：透析器凝血评价标准：“0 级” 无凝血或数条纤维束凝血，“Ⅰ 级” 少于10%纤维凝血，“Ⅱ 级” 少于50%纤维凝血，“Ⅲ 级” 大于50%纤维凝血。
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
  import {getDialysisRecord} from '@/api/dialysis';
  import {getDataConfig} from '@/utils/data';
  import {jsGetAge, uParseTime} from "@/utils/tools";
  import LabelBox from './printItem/LabelBox'
  import print from "print-js";

  export default {
    name: 'dialysisPrintOrder',
    components: {
      LabelBox,
    },
    data() {
      return {
        operators: [],
        adminUser: [],
        dialysisOrder: {
          DeviceNumber: []
        },
        operatorMaps: {},
        complications: ['低血压', '高血压', '心律失常', '头晕', '头痛', '呕吐', '抽搐', '出血', '心衰', '腹痛'],
        jilurow: 10,
        loading: false,
        orgname: '',
        patientInfo_gender_1: false,
        patientInfo_gender_2: false,
        patientInfo_source_2: false,
        patientInfo_source_1: false,
        modeOptions: {},
        replacementWays: [],
        perfusionApparatus: [],
        anticoagulantsConfit: {},
        bloodAccessParOpera: {},
        dialysateFormulationOptions: {},

        queryParams: {
          xtdate: '',
          xtno: '',
        },
        patientInfo: {
          birth: '',
          age: '',
          DialysisSchedule: {
            device_number: {number: ""},
            device_zone: {name: ""},
          },
          gender: 0
        },
        predialysis: {
          internal_fistula: "",
          internal_fistula_skin: "",
          catheter: "",
          blood_access_part_opera_name: '',
        },
        afterdialysis: {
          complications_index: "",
        },
        prescription: {
          dialysate_formulation_name: '',
          device: {},
        },
        advices: [],
        users: [],
        monitors: [],
        summary: {},
        receiverTreatmentAccess: {},


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

      }
    },
    methods: {
      getAdminUser(id) {
        if (id == 0) {
          return ''
        }
        if (id == undefined) {
          return ''
        }
        for (let i = 0; i < this.adminUser.length; i++) {
          if (this.adminUser[i].id == id) {
            return this.adminUser[i].name
          }
        }
      },
      getTime(value, temp) {
        if (value != undefined) {
          return uParseTime(value, temp)
        }
        return ""
      },
      printThisPage() {
        var ptime = Math.round(new Date().getTime() / 1000);
        this.print_time = uParseTime(ptime, '{y}-{m}-{d} {h}:{i}');

        const style = '@media print {.dialysis-print-order{width:960px;margin:0 auto}.dialysis-print-order .order-yy-name{margin:auto;text-align:center;font-size:20px;letter-spacing:5px}.dialysis-print-order .order-title{margin:auto;font-weight:600;text-align:center;font-size:22px;padding:10px 20px 20px 20px}.dialysis-print-order .table-box{width:100%;line-height:15px;font-size:14px}.dialysis-print-order .print-table{width:100%;text-align:center;border-collapse:collapse;line-height:25px;font-size:14px}.dialysis-print-order .print-table-no{width:100%;text-align:center;border-collapse:collapse;font-size:14px}.dialysis-print-order .under-line{border-bottom:1px solid #999;width:95%;text-align:center;margin-left:2px}.dialysis-print-order .title-box{text-align:center;font-size:16px;border:1px solid #666}.dialysis-print-order .radio-lebel-box{font-weight:400;cursor:pointer}.dialysis-print-order .radio-no{opacity:0;outline:0;position:absolute;margin:0;width:0;height:0;z-index:-1}.dialysis-print-order .radio-inner{white-space:nowrap;cursor:pointer;outline:0;display:inline-block;line-height:1;position:relative;vertical-align:middle}.dialysis-print-order .radio-fang{display:inline-block;position:relative;border:1px solid #000;box-sizing:border-box;width:14px;height:14px;background-color:#fff;z-index:1;transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)}.dialysis-print-order .is-checked-radio::after{content:"√";font-size:15px}}.es-img{height: 20px; }.advice-name{text-align: left;}.advice-children{display:flex;}';

        printJS({
          printable: "dialysis-print-box",
          type: "html",
          style: style,
          scanStyles: false
        });
      }, getNumber() {
        if (this.dialysisOrder != null) {
          return this.patientInfo.DialysisSchedule.device_zone.name + this.dialysisOrder.DeviceNumber.number
        } else {
          return this.patientInfo.DialysisSchedule.device_zone.name
        }
      },

      getXuserName(id) {
        if (id <= 0) {
          return "";
        }
        var name = "";
        if (this.users == null || typeof (this.users.length) == "undefined") {
          return name;
        }
        var leng = this.users.length;
        if (leng == 0) {
          return name;
        }
        for (let index = 0; index < leng; index++) {
          if (this.users[index].id == id) {
            name = this.users[index].name;
            break;
          }
        }
        return name;
      },
      setAdminUserES(id) {
        console.log(id)
        if (id == 0) {
          return ''
        }
        if (id in this.operatorMaps) {
          return this.operatorMaps[id].url;
        } else {
          return '';
        }
      },
      modeName(mode_id) {
        return typeof (this.modeOptions[mode_id]) != 'undefined' && typeof (this.modeOptions[mode_id].name) != 'undefined' ? this.modeOptions[mode_id].name : '';
      },
      getDialysisRecord() {
        getDialysisRecord(this.queryParams).then(response => {
          if (response.data.state == 1) {
            this.adminUser = response.data.data.users;
            this.users = response.data.data.users;
            this.patientInfo = response.data.data.patientInfo;
            this.patientInfo.birth = uParseTime(this.patientInfo.birthday, '{y}-{m}-{d}');
            this.patientInfo.age = jsGetAge(this.patientInfo.birth, '-');
            if (response.data.data.patientInfo.first_dialysis_date != 0) {
              this.patientInfo.first_dialysis_date = uParseTime(response.data.data.patientInfo.first_dialysis_date, '{y}-{m}-{d}');
            } else {
              this.patientInfo.first_dialysis_date = '';
            }

            this.predialysis = response.data.data.PredialysisEvaluation;
            this.predialysis.blood_access_part_opera_name = this.bloodAccessParOperaName(this.predialysis.blood_access_part_opera_id);
            this.afterdialysis = response.data.data.AssessmentAfterDislysis;
            this.operators = response.data.data.operators;
            this.dialysisOrder = response.data.data.dialysisOrder === null ? null : response.data.data.dialysisOrder;

            if (this.operators.length > 0) {
              var operatorsLen = this.operators.length;
              for (var index = 0; index < operatorsLen; index++) {
                this.$set(this.operatorMaps, this.operators[index].creator, this.operators[index]);
              }
            }

            this.afterdialysis.txqnx = -1;
            if (this.afterdialysis.cruor.indexOf('0度') > -1) {
              this.afterdialysis.txqnx = 0;
            }
            if (this.afterdialysis.cruor.indexOf('Ⅰ度') > -1) {
              this.afterdialysis.txqnx = 1;
            }
            if (this.afterdialysis.cruor.indexOf('Ⅱ度') > -1) {
              this.afterdialysis.txqnx = 2;
            }
            if (this.afterdialysis.cruor.indexOf('Ⅲ度') > -1) {
              this.afterdialysis.txqnx = 3;
            }


            this.afterdialysis.complications = this.afterdialysis.complication.split(',');
            this.afterdialysis.complications_other = [];
            this.afterdialysis.complications_index = [];
            var acllen = this.afterdialysis.complications.length;
            for (let index = 0; index < acllen; index++) {
              if (this.complications.indexOf(this.afterdialysis.complications[index]) >= 0) {
                this.afterdialysis.complications_index.push(this.afterdialysis.complications[index]);
              } else if (this.complications.indexOf(this.afterdialysis.complications[index]) < 0 && this.afterdialysis.complications_other.indexOf(this.afterdialysis.complications[index]) < 0) {
                this.afterdialysis.complications_other.push(this.afterdialysis.complications[index]);
              }
            }
            this.afterdialysis.complications_other = this.afterdialysis.complications_other.join(',');


            this.prescription = response.data.data.dialysisPrescription;
            this.receiverTreatmentAccess = response.data.data.receiverTreatmentAccess;

            this.prescription.mode = this.modeName(this.prescription.mode_id);
            var rwLen = this.replacementWays.length;
            this.prescription.replacement = "";
            for (let index = 0; index < rwLen; index++) {
              if (this.replacementWays[index].id == this.prescription.replacement_way) {
                this.prescription.replacement = this.replacementWays[index].name;
                break;
              }
            }

            this.prescription.dialysate_formulation_name = this.dialysateFormulationName(this.prescription.dialysate_formulation);


            var paLen = this.perfusionApparatus.length;
            this.prescription.perfusion_apparatus_name = "";
            for (let index = 0; index < paLen; index++) {
              if (this.perfusionApparatus[index].id == this.prescription.perfusion_apparatus) {
                this.prescription.perfusion_apparatus_name = this.perfusionApparatus[index].name;
                break;
              }
            }

            var acLen = this.anticoagulantsConfit.length;
            var thisALID = this.prescription.anticoagulant;
            this.prescription.anticoagulant_name = "";

            if (typeof (this.anticoagulantsConfit[thisALID]) != 'undefined' && this.anticoagulantsConfit[thisALID] != null) {
              this.prescription.anticoagulant_name = this.anticoagulantsConfit[thisALID].name;
              this.AlPanel = this.anticoagulantsConfit[thisALID];
            }

            this.advices = response.data.data.advices;
            this.monitors = response.data.data.monitors;
            this.summary = response.data.data.summary;

            if (this.monitors.length < 8) {
              var nl = 8 - this.monitors.length;
              for (let index = 0; index < nl; index++) {
                this.monitors.push([]);
              }
            }
            this.jilurow = this.monitors.length + 1;


            var childMap = {};
            for (const index in this.advices) {
              if (this.advices[index].parent_id == 0) {
                continue;
              }
              if (!(this.advices[index].parent_id in childMap)) {
                childMap[this.advices[index].parent_id] = [];
              }
              childMap[this.advices[index].parent_id].push(this.advices[index]);
            }


            var advices = [];
            for (const index in this.advices) {
              if (this.advices[index].parent_id > 0) {
                continue;
              }
              var item = this.advices[index]
              if (item.id in childMap) {
                item.children = childMap[item.id];
              } else {
                item.children = [];
              }
              advices.push(item);
            }

            var leftAdvice = [];
            var rightAdvice = [];
            var adlen = advices.length;

            var halfLen = adlen % 2 == 0 ? adlen / 2 : (adlen+1) / 2
            for (var i = 0; i < halfLen; i++) {
              leftAdvice.push(advices[i]);
              rightAdvice.push(advices[i + halfLen]);
            }
            if (halfLen < 5) {
              var nl = 5 - leftAdvice.length;
              for (let index = 0; index < nl; index++) {
                leftAdvice.push([]);
              }
              var nl = 5 - rightAdvice.length;
              for (let index = 0; index < nl; index++) {
                rightAdvice.push([]);
              }
            }

            this.advices = [];
            for (var i = 0; i < halfLen; i++) {
              var item = [];
              item.push(leftAdvice[i]);
              item.push(rightAdvice[i]);
              this.advices.push(item);
            }
          } else {
            this.$message.error("请求数据失败");
            return false;
          }

        });
      },
      bloodAccessParOperaName(id) {
        if (id in this.bloodAccessParOpera) {
          return this.bloodAccessParOpera[id].name;
        }
        return '';
      },
      dialysateFormulationName(id) {
        if (id in this.dialysateFormulationOptions) {
          return this.dialysateFormulationOptions[id].name;
        }
        return '';
      }
    },
    watch: {
      "patientInfo.gender": function () {

        if (this.patientInfo.gender == 1) {
          this.patientInfo_gender_1 = true;
          this.patientInfo_gender_2 = false;
        } else if (this.patientInfo.gender == 2) {
          this.patientInfo_gender_2 = true;
          this.patientInfo_gender_1 = false;
        } else {
          this.patientInfo_gender_2 = false;
          this.patientInfo_gender_1 = false;
        }
      },
      "patientInfo.source": function () {

        if (this.patientInfo.source == 1) {
          this.patientInfo_source_1 = true;
          this.patientInfo_source_2 = false;
        } else if (this.patientInfo.source == 2) {
          this.patientInfo_source_2 = true;
          this.patientInfo_source_1 = false;
        } else {

          this.patientInfo_source_2 = false;
          this.patientInfo_source_1 = false;
        }
      }


    },
    created() {
      var xtuser = this.$store.getters.xt_user;
      this.orgname = xtuser.org.org_name;
      // this.orgname = "遂溪方济医院";
      this.modeOptions = this.$store.getters.treatment_mode;
      this.replacementWays = this.$store.getters.replacement_ways;
      this.perfusionApparatus = this.$store.getters.perfusion_apparatus;
      this.anticoagulantsConfit = this.$store.getters.anticoagulants_confit;

      // this.bloodAccessParOpera = getDataConfig('hemodialysis', 'vascular_access_desc')

      var bloodAccessParOpera = getDataConfig('hemodialysis', 'vascular_access_desc');
      for (var key in bloodAccessParOpera) {
        this.bloodAccessParOpera[bloodAccessParOpera[key].id] = bloodAccessParOpera[key];
      }

      var dialysateFormulationOptions = getDataConfig("hemodialysis", "dialysate_formulation");
      for (var key in dialysateFormulationOptions) {
        this.dialysateFormulationOptions[dialysateFormulationOptions[key].id] = dialysateFormulationOptions[key];
      }

      const xtdate = this.$route.query && this.$route.query.xtdate;
      const xtno = this.$route.query && this.$route.query.xtno;
      if (typeof (xtdate) == "string" && xtdate.length > 0 && typeof (xtno) == "string" && xtno.length > 0) {
        this.queryParams.xtdate = xtdate;
        this.queryParams.xtno = xtno;
        this.getDialysisRecord();
      } else {
        this.$message.error("参数不齐");
        return false;
      }
    }

  }
</script>

<style>
  .dialysis-print-order {
    width: 960px;
    margin: 0 auto
  }

  .dialysis-print-order .order-yy-name {
    margin: auto;
    text-align: center;
    font-size: 20px;
    letter-spacing: 5px;
  }

  .dialysis-print-order .order-title {
    margin: auto;
    font-weight: 600;
    text-align: center;
    font-size: 22px;
    padding: 10px 20px 20px 20px;
  }

  .dialysis-print-order .table-box {

    width: 100%;
    line-height: 15px;
    font-size: 14px;
  }

  .dialysis-print-order .print-table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    line-height: 35px;
    font-size: 14px;
  }

  .dialysis-print-order .print-table-no {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    font-size: 14px;
  }

  .dialysis-print-order .under-line {
    border-bottom: 1px solid #999;
    width: 95%;
    text-align: center;
    margin-left: 2px;
  }

  .dialysis-print-order .title-box {
    text-align: center;
    font-size: 16px;
  }

  .dialysis-print-order .radio-lebel-box {
    font-weight: 400;
    cursor: pointer;
  }

  .dialysis-print-order .radio-no {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }

  .dialysis-print-order .radio-inner {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
  }

  .dialysis-print-order .radio-fang {
    display: inline-block;
    position: relative;
    border: 1px solid #000;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
  }

  .dialysis-print-order .is-checked-radio::after {
    content: "√";
    font-size: 15px;
  }

  .es-img {
    height: 25px;
  }

  .advice-name {
    text-align: left;
  }

  .advice-children {
    display: flex;
  }
</style>
