<template>
    <div class="app-container">
        <el-row>
            <el-col :span="21">
                <el-tabs v-model="activeName" tab-position="top" :stretch="true">
                    <el-tab-pane name="schedules">
                        <span slot="label"> 排班信息 </span>
                        <template-table :editable="false" :device_numbers="device_numbers" :template="this_week_schedules" :patients="patients"></template-table>
                    </el-tab-pane>
                    <el-tab-pane name="first" :disabled="template_mode.mode == 0">
                        <span slot="label"> 第一周 </span>
                        <template-table :editable="true" :device_numbers="device_numbers" :template="first_template" :patients="patients"></template-table>
                    </el-tab-pane>
                    <el-tab-pane name="second" :disabled="template_mode.mode != 2">
                        <span slot="label"> 第二周 </span>
                        <template-table :editable="true" :device_numbers="device_numbers" :template="second_template" :patients="patients"></template-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="3" style="text-align: right;">
                <el-button type="primary" @click="setScheduleTemplateAction">设置模板</el-button>
            </el-col>
        </el-row>

        <set-up-template-dialog ref="setup_dialog" :template_mode="template_mode" :origin_mode="origin_mode" @chenge_mode="didChangeTemplateMode"></set-up-template-dialog>
    </div>
</template>

<script>
import SetUpTemplateDialog from "./components/setup_template_dialog"
import TemplateTable from "./components/template_table"
import { getTemplateInitData } from "@/api/schedule_template/patient"

export default {
    name: "WorkforceTemplate",
    components: {
        SetUpTemplateDialog,
        TemplateTable,
    },
    data: function() {
        return {
            activeName: "schedules",
            template_mode: {
                id: 0,
                mode: 0,
            },
            origin_mode: 0,
            device_numbers: [],
            patients: [],

            first_template: {
                items: [],
            },
            second_template: {
                items: [],
            },
            this_week_schedules: {
                id: 0,
                items: [],
            }
        }
    },
    created() {
        getTemplateInitData().then(rs => {
            var resp = rs.data
            if (resp.state == 1) {
                var mode = resp.data.template_mode
                var device_numbers = resp.data.device_numbers
                var templates = resp.data.templates
                var patients = resp.data.patients
                var schedules = resp.data.schedules

                this.template_mode = mode
                this.origin_mode = mode.mode
                this.device_numbers = device_numbers,
                this.patients = patients

                this.first_template = templates[0]
                this.second_template = templates[1]

                var fakeTemplateItems = []
                for (let index = 0; index < schedules.length; index++) {
                    const schedule = schedules[index];
                    var item = {}
                    this.$set(item, "id", schedule.id)
                    this.$set(item, "template_id", 0)
                    this.$set(item, "device_number_id", schedule.bed_id)
                    this.$set(item, "treat_mode", schedule.mode_id)
                    this.$set(item, "weekday", schedule.schedule_week)
                    this.$set(item, "time_type", schedule.schedule_type)
                    var patient = {}
                    this.$set(patient, "id", schedule.patient_id)
                    this.$set(patient, "name", schedule.patient)
                    this.$set(item, "patient", patient)

                    fakeTemplateItems.push(item)
                }
                this.this_week_schedules.items = fakeTemplateItems

            } else {
                this.$message(resp.msg)
            }
        })
    },
    methods: {
        setScheduleTemplateAction: function() {
            this.$refs.setup_dialog.show()
        },
        didChangeTemplateMode: function(mode) {
            if (this.origin_mode != mode) {
                if (this.origin_mode == 0) { // 0 -> 1 或 0 -> 2
                    // 不处理模板 item
                } else if (mode == 0) { // 1 -> 0 或 2 -> 0 清除所有模板的 item
                    this.first_template.items.splice(0, this.first_template.items.length)
                    this.second_template.items.splice(0, this.second_template.items.length)
                    if (this.activeName != "schedules") {
                        this.activeName = "schedules"
                    }
                } else if (this.origin_mode == 1 && mode == 2) { // 1 -> 2
                    // 不处理模板 item
                } else if (this.origin_mode == 2 && mode == 1) { // 2 -> 1 清除第二个模板的 item
                    this.second_template.items.splice(0, this.second_template.items.length)
                    if (this.activeName == "second") {
                        this.activeName = "schedules"
                    }
                }
                this.origin_mode = mode
            }
        }
    }
}
</script>

<style scoped>

</style>
