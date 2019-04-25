<!-- 透析液离子浓度检测 -->
<template>
    <div class="pane_main">
        <el-row>
            <el-col :span="24">
                <div class="row_div">
                    <strong class="title">透析液离子浓度检测</strong>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="22">
                <div class="row_div">
                    <el-col :span="12">
                        <span class="edit_item_label" style="margin-right: 28px;">取样日期:</span>
                        <el-date-picker v-model="form.sampling_time" size="small" :style="{ width: '200px' }"></el-date-picker>
                    </el-col>
                    <el-col :span="12">
                        <span class="edit_item_label" style="margin-right: 42px;">取样者:</span>
                        <el-select v-model="form.sampler" size="small" :style="{ width: '200px' }">
                            <el-option v-for="item in samplers" :label="item.name" :value="item.id" :key="item.id">{{ item.name }}</el-option>
                        </el-select>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="22">
                <div class="row_div">
                    <el-col :span="12">
                        <span class="edit_item_label" style="margin-right: 29px;">检测单位:</span>
                        <el-input v-model="form.detection_unit" size="small" :style="{ width: '200px' }"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <span class="edit_item_label" style="margin-right: 16px;">出报告日期:</span>
                        <el-date-picker v-model="form.result_time" size="small" :style="{ width: '200px' }"></el-date-picker>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="22">
                <div class="row_div">
                    <el-col :span="12">
                        <span class="edit_item_label">A浓缩液批号:</span>
                        <el-input v-model="form.a_concentrate_no" size="small" :style="{ width: '200px' }"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <span class="edit_item_label">B浓缩液批号:</span>
                        <el-input v-model="form.b_concentrate_no" size="small" :style="{ width: '200px' }"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="23">
                <div class="row_div">
                    <el-col :span="8">
                        <span class="edit_item_label">实际Na<sup>+</sup>(mmol/L):</span>
                        <el-input v-model="form.na_ion_content_real" size="small" :style="{ width: '100px' }"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <span class="edit_item_label">配方Na<sup>+</sup>(mmol/L):</span>
                        <el-input v-model="form.na_ion_content_theoretical" size="small" :style="{ width: '100px' }"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <span class="edit_item_label">K<sup>+</sup>(mmol/L):</span>
                        <el-input v-model="form.k_ion_content" size="small" :style="{ width: '100px' }"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="23">
                <div class="row_div">
                    <el-col :span="8">
                        <span class="edit_item_label">Ca<sup>2+</sup>(mmol/L):</span>
                        <el-input v-model="form.ca_ion_content" size="small" :style="{ width: '100px' }"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <span class="edit_item_label">Cl<sup>-</sup>(mmol/L):</span>
                        <el-input v-model="form.cl_ion_content" size="small" :style="{ width: '100px' }"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <span class="edit_item_label">HCO3<sup>-</sup>(mmol/L):</span>
                        <el-input v-model="form.hco3_ion_content" size="small" :style="{ width: '100px' }"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="23">
                <div class="row_div">
                    <el-col :span="8">
                        <span class="edit_item_label">Mg<sup>2+</sup>(mmol/L):</span>
                        <el-input v-model="form.a_concentrate_no" size="small" :style="{ width: '100px' }"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <span class="edit_item_label">PH:</span>
                        <el-input v-model="form.ph" size="small" :style="{ width: '100px' }"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="21">
                <div class="row_div">
                    <span class="edit_item_label">备注:</span>
                    <el-input v-model="form.marker" size="small" :style="{ width: '400px' }"></el-input>
                </div>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" :style="{ paddingTop: '6px', paddingBottom: '6px' }">保&nbsp;存</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "DislysateDetectionEditPane",
    data() {
        return {
            form: {
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
            },
            samplers: [],
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.pane_main {
    padding: 5px 5px 0px 5px;
}
.title {
    font-size: 16px;
    color: rgb(133, 133, 133);
}
.el-row {
    margin-bottom: 10px;
}
/* .el-row:last-child {
    margin-bottom: 0px;
} */
.row_div {
    width: 100%;
}
.edit_item_label {
    font-size: 14px;
    color: rgb(133, 133, 133);
    line-height: 32px;
    margin-right: 5px;
}
</style>