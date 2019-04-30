<!-- 细菌检测 -->
<template>
    <div class="pane_main">
        <el-row>
            <el-col :span="12">
                <div class="row_div">
                    <strong class="title">细菌检测</strong>
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
                        <span class="edit_item_label" style="margin-right: 29px;">取样标本:</span>
                        <el-select v-model="form.sample" size="small" :style="{ width: '200px' }">
                            <el-option v-for="item in sample_options" :label="item.name" :value="item.id" :key="item.id">{{ item.name }}</el-option>
                        </el-select>
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
            <el-col :span="22">
                <div class="row_div">
                    <el-col :span="12">
                        <span class="edit_item_label" style="margin-right: 28px;">取样部位:</span>
                        <el-select v-model="form.sampling_location" size="small" :style="{ width: '200px' }">
                            <el-option v-for="item in sampling_location_options" :label="item.name" :value="item.id" :key="item.id">{{ item.name }}</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <span class="edit_item_label" style="margin-right: 29px;">检测单位:</span>
                        <el-input v-model="form.detection_unit" size="small" :style="{ width: '200px' }"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="22">
                <div class="row_div">
                    <el-col :span="12">
                        <span class="edit_item_label" style="margin-right: 42px;">取样者:</span>
                        <el-select v-model="form.sampler" size="small" :style="{ width: '200px' }">
                            <el-option v-for="item in samplers" :label="item.name" :value="item.id" :key="item.id">{{ item.name }}</el-option>
                        </el-select>
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
                    <span class="edit_item_label">检测结果(cfu/ml):</span>
                    <el-input v-model="form.detection_result" size="small" :style="{ width: '400px' }"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="21">
                <div class="row_div">
                    <span style="font-size: 13px; color: rgb(180, 180, 180); line-height: 28px;">注：细菌检测应每月一次，要求细菌数 &lt; 100 cfu/ml</span>
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
    name: "BacterialDetectionEditPane",
    data() {
        return {
            form: {
                sampling_time: '', // 取样时间
                sample: '', // 取样标本
                a_concentrate_no: '', // A浓缩液批号
                b_concentrate_no: '', // B浓缩液批号
                sampling_location: '', // 取样部位
                detection_unit: '', // 检测单位
                sampler: '', // 取样者
                result_time: '', // 出报告日期
                detection_result: '', // 检测结果
            },
            sample_options: [],
            sampling_location_options: [],
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
