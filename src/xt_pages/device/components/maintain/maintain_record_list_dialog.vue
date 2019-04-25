<template>
    <el-dialog title="设备维修记录" width="95%" top="3vh" :visible.sync="visible" :before-close="_close">
        <el-row>
            <el-col :span="24">
                <el-form :model="form" :inline="true">
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

        <el-row>
            <el-col :span="24">
                <el-table :data="records" :height="500" border>
                    <el-table-column label="报修时间" prop="repairs_date" align="center" width="95" :resizable="false"></el-table-column>
                    <el-table-column label="出发时间" prop="departure_time" align="center" width="95" :resizable="false"></el-table-column>
                    <el-table-column label="到达时间" prop="arrival_time" align="center" width="95" :resizable="false"></el-table-column>
                    <el-table-column label="完成时间" prop="completion_time" align="center" width="95" :resizable="false"></el-table-column>
                    <el-table-column label="故障发生阶段" prop="err_stage" align="center" width="85" :resizable="false"></el-table-column>
                    <el-table-column label="故障提示信息及代码" prop="err_hit" align="center" width="107" :resizable="false"></el-table-column>
                    <el-table-column label="故障描述" prop="err_desc" align="center" width="118" :resizable="false"></el-table-column>
                    <el-table-column label="原因分析" prop="reason_guess" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="处理过程" prop="process" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="故障是否排除" prop="result" align="center" width="85" :resizable="false"></el-table-column>
                    <el-table-column label="原因" prop="result_reason" align="center" width="100" :resizable="false"></el-table-column>
                    <el-table-column label="操作" align="center" width="100" :resizable="false">
                        <template slot-scope="scope">
                            <div>
                                <el-button icon="el-icon-edit" size="small">编辑</el-button>
                            </div>
                            <div style="margin-top: 5px;">
                                <el-button type="danger" icon="el-icon-delete" size="small">移除</el-button>
                            </div>
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
                device_no: '',
                query_time_s: [], // 时间戳数组，共两个值
            },
            devices: [
                { id:1, name:'1' }
            ],
            records: [
                { repairs_date: "2000-08-02", departure_time: "2000-08-02 05:24:30", arrival_time: "2000-08-02 05:24:30", completion_time: "2000-08-02 05:24:30", err_stage: "开机启动", err_hit: "无", err_desc: "巴拉巴拉", reason_guess: "巴拉巴拉巴拉巴拉", process: "巴拉巴拉巴拉巴拉巴拉巴拉", result: "未解决", result_reason: "巴拉巴" },
                { repairs_date: "1979-01-02", departure_time: "1979-01-02 15:24:30", arrival_time: "1979-01-02 15:24:30", completion_time: "1979-01-02 15:24:30", err_stage: "开机启动", err_hit: "无", err_desc: "巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉", reason_guess: "巴拉巴拉巴拉巴拉", process: "巴拉巴拉巴拉巴拉巴拉巴拉", result: "未解决", result_reason: "巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉" },
                { repairs_date: "1979-01-02", departure_time: "1979-01-02 15:24:30", arrival_time: "1979-01-02 15:24:30", completion_time: "1979-01-02 15:24:30", err_stage: "开机启动", err_hit: "无", err_desc: "巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉", reason_guess: "巴拉巴拉巴拉巴拉", process: "", result: "未解决", result_reason: "" },
                { repairs_date: "1979-01-02", departure_time: "1979-01-02 15:24:30", arrival_time: "1979-01-02 15:24:30", completion_time: "1979-01-02 15:24:30", err_stage: "开机启动", err_hit: "无", err_desc: "巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉", reason_guess: "巴拉巴拉巴拉巴拉", process: "巴拉巴拉巴拉巴拉巴拉巴拉", result: "未解决", result_reason: "巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉" },
            ],
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
