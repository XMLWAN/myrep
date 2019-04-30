<template>
    <el-dialog title="选择患者" width="40%" :visible.sync="visible" :before-close="_close">
        <el-form :model="form" label-width="80px">
            <el-form-item label="患者">
                <el-select v-model="form.patient_id" placeholder="选择患者" filterable clearable>
                    <el-option v-for="patient in patients" :key="patient.id" :value="patient.id" :label="patient.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="透析模式">
                <el-select v-model="form.treat_mode" placeholder="选择透析模式" clearable>
                    <el-option v-for="mode in treatment_modes" :key="mode.id" :value="mode.id" :label="mode.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="cancelScheduleAction">取消排班</el-button>
                <el-button type="primary" @click="saveAction">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    name: "ScheduleSelectorDialog",
    data() {
        return {
            visible: false,
            form: {
                patient_id: '',
                treat_mode: '',
                weekday: 1,
                time_type: 1, 
                device_number_id: 0,
            },
            treatment_modes: {},
        }
    },
    props: {
        patients: {
            type: Array,
            default: function() {
                return []
            }
        },
    },
    created() {
        this.treatment_modes = this.$store.getters.treatment_mode
    },
    methods: {
        _close: function(done) {
            this.clear()
            done()
        },
        clear: function() {
            this.form.patient_id = ""
            this.form.treat_mode = ""
            this.form.weekday = 1
            this.form.time_type = 1
            this.form.device_number_id = 0
        },
        show(weekday, time_type, device_number_id) {
            this.clear()

            this.form.weekday = weekday
            this.form.time_type = time_type
            this.form.device_number_id = device_number_id
            this.visible = true
        },
        showWith(patient_id, treat_mode, weekday, time_type, device_number_id) {
            this.clear()

            this.form.patient_id = patient_id
            this.form.treat_mode = treat_mode
            this.form.weekday = weekday
            this.form.time_type = time_type
            this.form.device_number_id = device_number_id
            this.visible = true
        },
        hide() {
            this.clear()
            this.visible = false
        },
        saveAction: function() {
            if (this.form.patient_id <= 0) {
                this.$message.error("请选择患者", 1500)
                return
            }
            if (this.form.treat_mode <= 0) {
                this.$message.error("请选择透析模式", 1500)
                return
            }
            this.$emit("did_selected", this.form.patient_id, this.form.treat_mode, this.form.weekday, this.form.time_type, this.form.device_number_id)
        },
        cancelScheduleAction: function() {
            this.$emit("did_cancel", this.form.weekday, this.form.time_type, this.form.device_number_id)
        }
    }
}
</script>

<style scoped>

</style>
