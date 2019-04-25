<template>
    <el-dialog title="设备质量控制" width="95%" top="3vh" :visible.sync="visible" :before-close="_close">
        <el-row>
            <el-col :span="24">
                <el-form :model="form" :inline="true">
                    <el-form-item>
                        <el-select v-model="form.check_type">
                            <el-option v-for="item in check_types" :key="item.type" :label="item.label" :value="item.type">{{ item.label }}</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="机号">
                        <el-select v-model="form.device_no">
                            <el-option v-for="item in devices" :key="item.id" :label="item.name" :value="item.id">{{ item.name }}</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="日期">
                        <el-date-picker v-model="form.query_time_s" type="daterange" value-format="timestamp"></el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <el-row v-show="form.check_type === 1 || form.check_type === 2">
            <el-col :span="24">
                <el-table :data="records" :height="500" border :header-cell-style="{ fontSize: '13px' }">
                    <el-table-column label="取样日期" prop="sampling_time" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="取样标本" prop="sample" align="center" width="110" :resizable="false"></el-table-column>
                    <el-table-column label="A浓缩液批号" prop="a_concentrate_no" align="center" width="120" :resizable="false"></el-table-column>
                    <el-table-column label="B浓缩液批号" prop="b_concentrate_no" align="center" width="120" :resizable="false"></el-table-column>
                    <el-table-column label="取样部位" prop="sampling_location" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="检测单位" prop="detection_unit" align="center" width="110" :resizable="false"></el-table-column>
                    <el-table-column label="取样者" prop="sampler" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="出报告日期" prop="result_time" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="检测结果(cfu/ml)" prop="detection_result" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="操作" align="center" width="215" :resizable="false">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-edit" size="small">编辑</el-button>
                            <el-button type="danger" icon="el-icon-delete" size="small">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-row v-show="form.check_type === 3">
            <el-col :span="24">
                <el-table :data="ion_content_records" :height="500" border :header-cell-style="{ fontSize: '13px', paddingTop: '5px', paddingBottom: '5px' }">
                    <el-table-column label="取样日期" prop="sampling_time" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="取样者" prop="sampler" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="检测单位" prop="detection_unit" align="center" width="110" :resizable="false"></el-table-column>
                    <el-table-column label="A浓缩液批号" prop="a_concentrate_no" align="center" width="120" :resizable="false"></el-table-column>
                    <el-table-column label="B浓缩液批号" prop="b_concentrate_no" align="center" width="120" :resizable="false"></el-table-column>
                    <el-table-column label="出报告日期" prop="result_time" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="检测结果" align="center" :resizable="false">
                        <el-table-column label="实际钠(mmol/L)" prop="na_ion_content_real" align="center" width="120" :resizable="false"></el-table-column>
                        <el-table-column label="配方钠(mmol/L)" prop="na_ion_content_theoretical" align="center" width="120" :resizable="false"></el-table-column>
                        <el-table-column label="K+(mmol/L)" prop="k_ion_content" align="center" width="100" :resizable="false"></el-table-column>
                        <el-table-column label="Ca2+(mmol/L)" prop="ca_ion_content" align="center" width="110" :resizable="false"></el-table-column>
                        <el-table-column label="Cl-(mmol/L)" prop="cl_ion_content" align="center" width="100" :resizable="false"></el-table-column>
                        <el-table-column label="HCO3-(mmol/L)" prop="hco3_ion_content" align="center" width="120" :resizable="false"></el-table-column>
                        <el-table-column label="Mg2+(mmol/L)" prop="mg_ion_content" align="center" width="115" :resizable="false"></el-table-column>
                        <el-table-column label="PH" prop="ph" align="center" width="60" :resizable="false"></el-table-column>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="185" :resizable="false">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-edit" size="small">编辑</el-button>
                            <el-button type="danger" icon="el-icon-delete" size="small">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
export default {
    name: "MaintainRecordListDialog",
    data() {
        return {
            visible: false,
            form: {
                check_type: '', // 检查种类
                device_no: '',
                query_time_s: [], // 时间戳数组，共两个值
            },
            check_types: [
                { type: 1, label: "细菌检测" },
                { type: 2, label: "内毒素检测" },
                { type: 3, label: "透析液离子浓度检测" },
            ],
            devices: [
                { id:1, name:'1' }
            ],
            // records: [{Object ↓}]
            // {
            //     sampling_time: '', // 取样时间
            //     sample: '', // 取样标本
            //     a_concentrate_no: '', // A浓缩液批号
            //     b_concentrate_no: '', // B浓缩液批号
            //     sampling_location: '', // 取样部位
            //     detection_unit: '', // 检测单位
            //     sampler: '', // 取样者
            //     result_time: '', // 出报告日期
            //     detection_result: '', // 检测结果
            // }
            records: [
                {
                    sampling_time: '2000-08-20', // 取样时间
                    sample: '透析液', // 取样标本
                    a_concentrate_no: '2134534534', // A浓缩液批号
                    b_concentrate_no: '4564564565', // B浓缩液批号
                    sampling_location: '透析机取样口', // 取样部位
                    detection_unit: '某某公司', // 检测单位
                    sampler: '郭某某', // 取样者
                    result_time: '2000-08-20', // 出报告日期
                    detection_result: '0.0025', // 检测结果
                }
            ],
            // ion_content_records
            // {
            //     sampling_time: '', // 取样时间
            //     a_concentrate_no: '', // A浓缩液批号
            //     b_concentrate_no: '', // B浓缩液批号
            //     detection_unit: '', // 检测单位
            //     sampler: '', // 取样者
            //     result_time: '', // 出报告日期
            //     na_ion_content_real: '', // 实际 Na 离子浓度
            //     na_ion_content_theoretical: '', // 配方 Na 离子浓度
            //     k_ion_content: '', // K 离子浓度
            //     ca_ion_content: '', // Ca 离子浓度
            //     cl_ion_content: '', // Cl 离子浓度
            //     hco3_ion_content: '', // HCO3 离子浓度
            //     mg_ion_content: '', // Mg 离子浓度
            //     ph: '', // pH 值
            //     marker: '', // 备注
            // }
            ion_content_records: [
                {
                    sampling_time: '', // 取样时间
                    a_concentrate_no: '', // A浓缩液批号
                    b_concentrate_no: '', // B浓缩液批号
                    detection_unit: '', // 检测单位
                    sampler: '', // 取样者
                    result_time: '', // 出报告日期
                    na_ion_content_real: '', // 实际 Na 离子浓度
                    na_ion_content_theoretical: '', // 配方 Na 离子浓度
                    k_ion_content: '', // K 离子浓度
                    ca_ion_content: '', // Ca 离子浓度
                    cl_ion_content: '', // Cl 离子浓度
                    hco3_ion_content: '', // HCO3 离子浓度
                    mg_ion_content: '', // Mg 离子浓度
                    ph: '', // pH 值
                    marker: '', // 备注
                }
            ]
            
        }
    },
    methods: {
        _close: function(done) {
            this.clear()
            done()
        },
        clear: function() {
            
        },
        show() {
            this.clear()
            this.visible = true
        },
        hide() {
            this.clear()
            this.visible = false
        },
    }
}
</script>

<style scoped>

</style>
