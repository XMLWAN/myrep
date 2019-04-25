<template>
    <div class="main">
        <el-row>
            <el-col :span="24">
                <span class="top_text_span">机器消毒:</span>
                <el-button type="primary" size="small" @click="add_plan_action">新增计划</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="records">
                    <el-table-column label="时间" min-width="15%" align="center" prop="time">
                    </el-table-column>
                    <el-table-column label="班次" min-width="10%" align="center" prop="schedule">
                    </el-table-column>
                    <el-table-column label="机表消毒方式" min-width="15%" align="center" prop="surface_disinfection">
                    </el-table-column>
                    <el-table-column label="机表消毒液" min-width="15%" align="center" prop="surface_disinfectant">
                    </el-table-column>
                    <el-table-column label="液路消毒方式" min-width="15%" align="center" prop="pipeline_disinfection">
                    </el-table-column>
                    <el-table-column label="液路消毒液" min-width="15%" align="center" prop="pipeline_disinfectant">
                    </el-table-column>
                    <el-table-column label="操作" min-width="15%" align="center">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <new-plan-dialog ref="new_plan_dialog"></new-plan-dialog>
    </div>
</template>

<script>
import NewPlanDialog from './add_sterilize_plan_dialog'

export default {
    name: "SterilizePlanPane",
    components: {
        NewPlanDialog
    },
    data() {
        return {
            // records : [{time, schedule, surface_disinfection, surface_disinfectant, pipeline_disinfection, pipeline_disinfectant}]
            records: [
                { time: '星期一', schedule: '上午', surface_disinfection: '化学消毒', surface_disinfectant: '某机表消毒液', pipeline_disinfection: '某液路消毒法', pipeline_disinfectant: '某液路消毒液' }
            ] 
        }
    },
    methods: {
        add_plan_action: function() {
            this.$refs.new_plan_dialog.show()
        }
    }
}
</script>

<style scoped>
.main {
    padding: 10px 10px 10px 10px;
}
.top_text_span {
    font-size: 14px;
    line-height: 32px;
    margin-right: 5px;
}
</style>
