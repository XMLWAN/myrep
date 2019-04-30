<template>
    <el-dialog title="新增消毒计划" width="50%" :visible.sync="visible" :before-close="_close">
        <el-row>
            <el-col :span="12">
                <span>时</span><span style="margin-left: 28px; margin-right: 28px;">间</span><span>:</span>
                <el-select v-model="form.time">
                    <el-option v-for="weekday in weekdays" :value="weekday" :key="weekday" :label="weekday">{{ weekday }}</el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <span>班</span><span style="margin-left: 21px; margin-right: 21px;">次</span><span>:</span>
                <el-select v-model="form.schedule">
                    <el-option v-for="schedule in schedules" :value="schedule" :key="schedule">{{ schedule }}</el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <span>机表消毒方式:</span>
                <el-select v-model="form.surface_disinfection">
                    <el-option v-for="item in surface_disinfections" :value="item.id" :key="item.id" :label="item.name">{{ item.name }}</el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <span>机表消毒液:</span>
                <el-select v-model="form.surface_disinfectant">
                    <el-option v-for="item in surface_disinfectants" :value="item.id" :key="item.id" :label="item.name">{{ item.name }}</el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <span>液路消毒方式:</span>
                <el-select v-model="form.pipeline_disinfection">
                    <el-option v-for="item in pipeline_disinfections" :value="item.id" :key="item.id" :label="item.name">{{ item.name }}</el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <span>液路消毒液:</span>
                <el-select v-model="form.pipeline_disinfectant">
                    <el-option v-for="item in pipeline_disinfectants" :value="item.id" :key="item.id" :label="item.name">{{ item.name }}</el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24" :offset="0">
                <el-button type="primary" @click="hide">确定</el-button>
                <el-button @click="hide">取消</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
export default {
    name: "AddSterilizePlanDialog",
    data() {
        return {
            visible: false,
            form: {
                time: '',
                schedule: '',
                surface_disinfection: '',
                surface_disinfectant: '',
                pipeline_disinfection: '',
                pipeline_disinfectant: '',
            },
            weekdays: [
                "星期一", 
                "星期二", 
                "星期三", 
                "星期四", 
                "星期五", 
                "星期六", 
                "星期日", 
            ],
            schedules: [
                "上午",
                "下午",
                "晚上",
            ],
            surface_disinfections: [
                { id:0, name:"/" },
                { id:1, name:"某机表消毒方式" },
            ],
            surface_disinfectants: [
                { id:0, name:"/" },
                { id:1, name:"某机表消毒液" },
            ],
            pipeline_disinfections: [
                { id:0, name:"/" },
                { id:1, name:"某液路消毒方式" },
            ],
            pipeline_disinfectants: [
                { id:0, name:"/" },
                { id:1, name:"某液路消毒液" },
            ]
        }
    },
    methods: {
        _close: function(done) {
            this.clear()
            done()
        },
        clear: function() {
            this.form.time = ''
            this.form.schedule = ''
            this.form.surface_disinfection = ''
            this.form.surface_disinfectant = ''
            this.form.pipeline_disinfection = ''
            this.form.pipeline_disinfectant = ''
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
.el-row {
    margin-bottom: 15px;
}
</style>
