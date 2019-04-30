<template>
    <div class="app-container">
        <el-row style="padding-bottom: 15px;">
            <el-col :span="24">
                <el-button type="primary" @click="printAction">打印</el-button>
            </el-col>
        </el-row>
        <div id="print_content">
            <div v-for="(record, index) in records" :key="index" class="print_page_main_content">
                <div class="order_title">
                    血液净化治疗记录单
                </div>
                <div class="row" style="margin-top: 15px;">
                    <div class="inline_block">
                        姓名：<div class="under_line" style="width: 120px;">{{ record.patient.name }}</div>
                    </div>
                    <div class="inline_block" style="margin-left: 20px;">
                        性别：
                        <check-box text="男" :checked="record.patient.gender == 1"></check-box>
                        <check-box text="女" :checked="record.patient.gender == 2"></check-box>
                    </div>
                    <div class="inline_block" style="margin-left: 15px;">
                        年龄：<div class="under_line" style="width: 50px;">TODO</div>岁
                    </div>
                    <div class="inline_block" style="float: right;">
                        科室：
                        <check-box text="门诊透析" :checked="false"></check-box>
                        <check-box text="住院" :checked="true"></check-box>
                        <!-- TODO -->
                    </div>
                </div>
                <div class="row flex">
                    <div class="inline_block">
                        住院号/透析卡号：<div class="under_line" style="width: 100px;">TODO/{{ record.patient.dialysis_no }}</div>
                    </div>
                    <div class="inline_block">
                        诊断：<div class="under_line" style="width: 500px;">TODO</div>
                    </div>
                    <div class="inline_block">
                        治疗日期：<div class="under_line" style="width: 100px;">TODO</div>
                    </div>
                </div>
                <div class="row">
                    <table class="proj_table">
                        <tbody>
                            <tr>
                                <td width="25px">
                                    透<br/>前<br/>评<br/>估
                                </td>
                                <td>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            入院方式：
                                            <check-box text="步行" :checked="isCheckBoxChecked(record.receive_assessment, 'way', 1)"></check-box>
                                            <check-box text="扶行" :checked="isCheckBoxChecked(record.receive_assessment, 'way', 2)"></check-box>
                                            <check-box text="轮椅" :checked="isCheckBoxChecked(record.receive_assessment, 'way', 3)"></check-box>
                                            <check-box text="平车" :checked="isCheckBoxChecked(record.receive_assessment, 'way', 4)"></check-box>
                                        </div>
                                        <div class="inline_block" style="margin-left: 30px;">
                                            意识：
                                            <check-box text="清醒" :checked="isCheckBoxChecked(record.receive_assessment, 'consciousness', 1)"></check-box>
                                            <check-box text="嗜睡" :checked="isCheckBoxChecked(record.receive_assessment, 'consciousness', 2)"></check-box>
                                            <check-box text="昏迷" :checked="isCheckBoxChecked(record.receive_assessment, 'consciousness', 3)"></check-box>
                                        </div>
                                        <div class="inline_block" style="margin-left: 30px;">
                                            体温：<div class="under_line" style="width: 60px;"></div>℃
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            体位：
                                            <check-box text="自动体位" :checked="false"></check-box>
                                            <check-box text="平卧位" :checked="false"></check-box>
                                            <check-box text="半卧位" :checked="false"></check-box>
                                            <check-box text="端坐位" :checked="false"></check-box>
                                            <check-box text="躁动不安" :checked="false"></check-box>
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            出血：
                                            <check-box text="无" :checked="false"></check-box>
                                            <check-box text="有" :checked="false"></check-box>
                                            （&nbsp;
                                            <check-box text="穿刺点渗血" :checked="false"></check-box>
                                            <check-box text="牙龈出血" :checked="false"></check-box>
                                            <check-box text="消化道出血" :checked="false"></check-box>
                                            <check-box text="女性经期" :checked="false"></check-box>
                                            其他：<div class="under_line" style="width: 300px;"></div>
                                            &nbsp;）
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            血管通路：
                                            <check-box text="自体内瘘" :checked="false"></check-box>
                                            <check-box text="人造血管" :checked="false"></check-box>
                                            <check-box text="直穿" :checked="false"></check-box>
                                            <check-box text="颈内静脉" :checked="false"></check-box>
                                            <check-box text="股静脉" :checked="false"></check-box>
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            内瘘：
                                            <check-box text="震颤" :checked="false"></check-box>
                                            （&nbsp;
                                            <check-box text="存在" :checked="false"></check-box>
                                            <check-box text="减弱" :checked="false"></check-box>
                                            <check-box text="无" :checked="false"></check-box>
                                            <check-box text="股静脉" :checked="false"></check-box>
                                            ）
                                            内瘘皮肤情况：（&nbsp;
                                            <check-box text="正常" :checked="false"></check-box>
                                            <check-box text="瘀斑" :checked="false"></check-box>
                                            <check-box text="红" :checked="false"></check-box>
                                            <check-box text="肿" :checked="false"></check-box>
                                            ）
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            导管：穿刺口
                                            （&nbsp;
                                            <check-box text="干洁" :checked="false"></check-box>
                                            <check-box text="红肿" :checked="false"></check-box>
                                            <check-box text="分泌物" :checked="false"></check-box>
                                            <check-box text="渗血" :checked="false"></check-box>
                                            ）
                                            导管打折：（&nbsp;
                                            <check-box text="有" :checked="false"></check-box>
                                            <check-box text="无" :checked="false"></check-box>
                                            ）
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td width="25px">
                                    透<br/>析<br/>处<br/>方
                                </td>
                                <td>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            透析时间：
                                            <div class="under_line" style="width: 30px;"></div>h
                                            <div class="under_line" style="width: 30px;"></div>min
                                        </div>
                                        <div class="inline_block" style="margin-left: 30px;">
                                            血流量：
                                            <div class="under_line" style="width: 50px;"></div>ml/min
                                        </div>
                                        <div class="inline_block" style="margin-left: 30px;">
                                            体重：
                                            透前 <div class="under_line" style="width: 50px;"></div>kg&nbsp;
                                            干体重 <div class="under_line" style="width: 50px;"></div>kg
                                        </div>
                                        <div class="inline_block" style="margin-left: 30px;">
                                            目标超滤量：
                                            <div class="under_line" style="width: 80px;"></div>ml
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            抗凝方式：
                                            <check-box text="普通肝素" :checked="false"></check-box>（
                                            首剂 <div class="under_line" style="width: 40px;"></div>mg&nbsp;
                                            维持 <div class="under_line" style="width: 40px;"></div>mg/h
                                            ）

                                            <check-box text="低分子肝素" :checked="false"></check-box>
                                            <div class="under_line" style="width: 50px;"></div>UI

                                            <check-box text="无肝素" :checked="false" style="margin-left: 10px;"></check-box>
                                            其他方式：<div class="under_line" style="width: 170px;"></div>
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            透析液配方：
                                            <check-box text="常规" :checked="false"></check-box>
                                            <check-box text="低钙" :checked="false"></check-box>（1.25mmol/L）&nbsp;
                                            <check-box text="高钙" :checked="false"></check-box>（1.75mmol/L）&nbsp;
                                            <check-box text="低钠" :checked="false"></check-box>（135mmol/L）&nbsp;
                                            <check-box text="高钠" :checked="false"></check-box>（145mmol/L）&nbsp;
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            置换量：
                                            <div class="under_line" style="width: 40px;"></div> L
                                        </div>
                                        <div class="inline_block" style="margin-left: 10px;">
                                            治疗方式：
                                            <check-box text="HD" :checked="false"></check-box>
                                            <check-box text="HDF" :checked="false"></check-box>
                                            <check-box text="HF" :checked="false"></check-box>
                                            <check-box text="HP" :checked="false"></check-box>
                                            <check-box text="HD+HP" :checked="false"></check-box>
                                            其他 <div class="under_line" style="width: 100px;"></div>
                                        </div>
                                        <div class="inline_block" style="margin-left: 10px;">
                                            透析器/灌流器型号：
                                            <div class="under_line" style="width: 130px;"></div>
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            透析机号：
                                            <div class="under_line" style="width: 150px;"></div>
                                        </div>
                                        <div class="inline_block" style="float: right;">
                                            医生签名：
                                            <div class="under_line" style="width: 100px;">
                                                <img style="height: 20px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552901663505&di=bf12bd343b552c6ccfb2ed12343a3141&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fe61190ef76c6a7ef7d58560df3faaf51f3de669b.jpg" />
                                            </div>
                                            &nbsp;上机护士：
                                            <div class="under_line" style="width: 100px;"></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td width="25px">
                                    透<br/>析<br/>中<br/>记<br/>录
                                </td>
                                <td style="padding: 0;">
                                    <table class="inside_table">
                                        <thead>
                                            <tr>
                                                <td width="100">时间</td>
                                                <td width="80">血压<br/>mmHg</td>
                                                <td width="60">脉率<br/>次/分</td>
                                                <td width="60">呼吸<br/>次/分</td>
                                                <td width="60">血流量<br/>ml/min</td>
                                                <td width="60">超滤量<br/>L</td>
                                                <td width="60">置换量<br/>L</td>
                                                <td width="60">静脉压<br/>mmHg</td>
                                                <td width="60">跨膜压<br/>mmHg</td>
                                                <td>备注</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(monitor_record, index) in record.monitor_records" :key="index">
                                                <td></td>
                                                <td>100/80</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <!-- 使整个表有7行以上 -->
                                            <template v-if="record.monitor_records.length < 7">
                                            <tr v-for="(num) in (7 - record.monitor_records.length)" :key="'7_' + num">
                                                <td></td>
                                                <td>/</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td width="25px">
                                    透<br/>后<br/>评<br/>估
                                </td>
                                <td>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            实际治疗时间：
                                            <div class="under_line" style="width: 30px;"></div>h
                                            <div class="under_line" style="width: 30px;"></div>min
                                        </div>
                                        <div class="inline_block" style="margin-left: 25px;">
                                            实际超滤量：
                                            <div class="under_line" style="width: 50px;"></div>ml
                                        </div>
                                        <div class="inline_block" style="margin-left: 25px;">
                                            透后体重：
                                            <div class="under_line" style="width: 50px;"></div>kg
                                        </div>
                                        <div class="inline_block" style="margin-left: 25px;">
                                            透析器凝血：
                                            <check-box text="0级" :checked="false"></check-box>
                                            <check-box text="Ⅰ级" :checked="false"></check-box>
                                            <check-box text="Ⅱ级" :checked="false"></check-box>
                                            <check-box text="Ⅲ级" :checked="false"></check-box>
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            拔针后穿刺点渗血：
                                            <check-box text="有" :checked="false"></check-box>
                                            <check-box text="无" :checked="false"></check-box>
                                        </div>
                                        <div class="inline_block" style="margin-left: 40px;">
                                            穿刺点血肿：
                                            <check-box text="有" :checked="false"></check-box>
                                            <check-box text="无" :checked="false"></check-box>
                                        </div>
                                        <div class="inline_block" style="margin-left: 40px;">
                                            压迫后内瘘震颤：
                                            <check-box text="存在" :checked="false"></check-box>
                                            <check-box text="减弱" :checked="false"></check-box>
                                            <check-box text="无" :checked="false"></check-box>
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block">
                                            并发症：
                                            <check-box text="低血压" :checked="false"></check-box>
                                            <check-box text="高血压" :checked="false"></check-box>
                                            <check-box text="心律失常" :checked="false"></check-box>
                                            <check-box text="头晕" :checked="false"></check-box>
                                            <check-box text="头痛" :checked="false"></check-box>
                                            <check-box text="呕吐" :checked="false"></check-box>
                                            <check-box text="抽搐" :checked="false"></check-box>
                                            <check-box text="出血" :checked="false"></check-box>
                                            <check-box text="心衰" :checked="false"></check-box>
                                            <check-box text="腹痛" :checked="false"></check-box>
                                        </div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        其他记录：<div class="under_line" style="width: 830px;"></div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;"><!-- 同属“其他记录” -->
                                        <div class="under_line" style="width: 900px;"></div>
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        患者去向：
                                        <check-box text="离院" :checked="false"></check-box>
                                        <check-box text="留观" :checked="false"></check-box>
                                        <check-box text="住院" :checked="false"></check-box>
                                        （
                                        科室 <div class="under_line" style="width: 200px;"></div>
                                        交待病房护士/患者/陪人观察内容：
                                        <check-box text="意识状态" :checked="false"></check-box>
                                        <check-box text="生命体征" :checked="false"></check-box>
                                    </div>
                                    <!-- 接“交待病房护士/患者/陪人观察内容” -->
                                    <div class="row" style="padding: 2px 0;">
                                        <check-box text="内瘘搏动/渗血" :checked="false"></check-box>
                                        <check-box text="导管固定/穿刺口渗血" :checked="false"></check-box>
                                        <check-box text="动静脉直接穿刺口渗血/肢端循环情况" :checked="false"></check-box>
                                        &nbsp;其他：
                                        <div class="under_line" style="width: 290px;"></div>
                                        ）
                                    </div>
                                    <div class="row" style="padding: 2px 0;">
                                        <div class="inline_block" style="float: left;">
                                            当班责任（核对）护士：
                                            <div class="under_line" style="width: 100px;">
                                                哈护士
                                            </div>
                                        </div>
                                        <div class="inline_block" style="float: right;">
                                            下机护士：
                                            <div class="under_line" style="width: 100px;">
                                                <img style="height: 20px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552901663505&di=bf12bd343b552c6ccfb2ed12343a3141&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fe61190ef76c6a7ef7d58560df3faaf51f3de669b.jpg" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding: 0;">
                                    <table class="inside_table">
                                        <thead>
                                            <tr>
                                                <td width="100">时间</td>
                                                <td>医嘱内容</td>
                                                <td width="120">医生签名</td>
                                                <td width="120">执行护士</td>
                                                <td width="100">执行时间</td>
                                                <td width="120">核对护士</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(advice, index) in record.advices" :key="index">
                                                <td>&nbsp;</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <!-- 使整个表有5行以上 -->
                                            <template v-if="record.advices.length < 5">
                                            <tr v-for="(num) in (5 - record.advices.length)" :key="'5_' + num">
                                                <td>&nbsp;</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    注：透析器凝血评价标准：“0 级” 无凝血或数条纤维束凝血，“Ⅰ 级” 少于10%纤维凝血，“Ⅱ 级” 少于50%纤维凝血，“Ⅲ 级” 大于50%纤维凝血。
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckBox from "./option_check_box"
import print from "print-js"
import { GetBatchPrintDialysisData } from "@/api/print_data"

export default {
    name: "BatchPrintOrder",
    components: {
        CheckBox,
    },
    data() {
        return {
            records: [ // 模拟有多条数据
                // { 
                //     monitor_records: [ {},{},{},{},{},{},{},{},{},{},{}, ],
                //     advices: [ {},{},{},{},{},{},{}, ],
                // },
                // { 
                //     monitor_records: [],
                //     advices: [],
                // },
            ],
        }
    },
    mounted() {
        var ids = this.$store.getters.temp_params.batch_print_dialysis_record_ids
        if (ids.length == 0) {
            this.$router.back(-1)
            return
        }
        GetBatchPrintDialysisData(ids.join(",")).then(rs => {
            var resp = rs.data
            if (resp.state == 1) {
                console.log(resp)
                resp.data.schedules.forEach(schedule => {
                    schedule.advices = []
                });
                this.records = this.records.concat(resp.data.schedules)
            } else {
                this.$message.error(resp.msg)
            }
        }).catch(err => {
            this.$message.error(err)
        })
    },
    methods: {
        printAction: function() {
            const style = '@media print { .option_panel { margin: 0 5px 0 0; } .option_panel .check_box_panel { white-space: nowrap; outline: none; display: inline-block; line-height: 1; position: relative; vertical-align: middle; } .option_panel .check_box_panel .check_box { display: inline-block; position: relative; border: 1px solid #000; box-sizing: border-box; width: 14px; height: 14px; background-color: #fff; } .check_box_panel .did_checked::after { content: "√"; font-size: 15px; } .print_page_main_content { background-color: white; width:960px; margin:0 auto; padding: 0 0 0 0; page-break-after: always; } .print_page_main_content .order_title { text-align: center; font-size: 23px; line-height: 50px; font-weight: 500; } .row { font-size: 14px; line-height: 20px; padding: 5px 0; } .inline_block { display: inline-block; } .under_line { display: inline-block; border-bottom: 1px solid #999; text-align: center; white-space: nowrap; } .under_line::before { content: "\\00A0"; } .under_line::after { content: "\\00A0"; } .flex { display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex; align-items: center; -webkit-align-items: center; box-align: center; -moz-box-align: center; -webkit-box-align: center; text-align: center; -webkit-justify-content: space-between; justify-content: space-between; -moz-box-pack: space-between; -webkit--moz-box-pack: space-between; box-pack: space-between; } .print_page_main_content .proj_table { width: 100%; border: 1px solid; border-collapse: collapse; padding: 2px; } .print_page_main_content .proj_table tbody tr td { border: 1px solid; font-size: 16px; padding: 10px 8px; line-height: 30px; } .print_page_main_content .proj_table .inside_table { width: 100%; border: hidden; border-collapse: collapse; } .print_page_main_content .proj_table .inside_table tr td { border: 1px solid; text-align: center; font-size: 14px; padding: 8px 5px; line-height: 25px; } }';
            
            printJS({
                printable: "print_content",
                type: "html",
                documentTitle: "  ",
                style: style,
                scanStyles: false,
            });
        },

        // 函数说明：因为一次透析记录有些记录不一定是必须填的，比如 record.receive_assessment 可能为 null，所以要取 record.receive_assessment.way 前需要判断 record.receive_assessment 是否为 null，所以这个方法用来简化模板渲染的代码
        // 参数说明：比如判断 record.receive_assessment.way 是不是为1，参数为 (record.receive_assessment, way, 1)
        isCheckBoxChecked: function(record, key, target_value) {
            if (record == null || record == undefined) {
                return false
            } else {
                return record[key] == target_value
            }
        }
    },
}
</script>

<style scoped>
.print_page_main_content {
    background-color: white;
    width:960px; 
    margin:0 auto 50px;
    padding: 0 0 0 0;
    page-break-after: always;
}
.print_page_main_content .order_title {
    text-align: center;
    font-size: 23px;
    line-height: 50px;
    font-weight: 500;
}
.row {
    font-size: 14px;
    line-height: 20px;
    padding: 5px 0;
}
.inline_block {
    display: inline-block;
}
.under_line {
    display: inline-block;
    border-bottom: 1px solid #999;
    text-align: center;
    white-space: nowrap; 
}
.under_line::before {
    content: "\00A0";
}
.under_line::after {
    content: "\00A0";
}
.flex {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    box-align: center;
    -moz-box-align: center;
    -webkit-box-align: center;
    text-align: center;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -moz-box-pack: space-between;
    -webkit--moz-box-pack: space-between;
    box-pack: space-between;
}
.print_page_main_content .proj_table {
    width: 100%;
    border: 1px solid;
    border-collapse: collapse;
    padding: 2px;
}
.print_page_main_content .proj_table tbody tr td {
    border: 1px solid;
    /* text-align: center; */
    font-size: 16px;
    padding: 10px 8px;
    line-height: 30px;
}
.print_page_main_content .proj_table .inside_table {
    width: 100%; 
    border: hidden; /* 解决边框冲突 */
    border-collapse: collapse;
}
.print_page_main_content .proj_table .inside_table tr td {
    border: 1px solid;
    text-align: center;
    font-size: 14px;
    padding: 8px 5px;
    line-height: 25px;
}
</style>
