<template>
    <div class="patient-container">
        <patient-sidebar :id="patient_id" defaultActive="1-5"></patient-sidebar>
        <div class="container" v-loading="loading">
            <div>
                <span class="filter_title">日期查询</span>
                <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholde="开始日期" end-placeholde="结束日期" value-format="timestamp" :clearable="false" @change="requestRescueRecords()"></el-date-picker>
                <span style="margin-left: 10px;">
                    <el-button type="primary" @click="show_dialog = true">新增</el-button>
                    <el-button v-show="selectingRows.length > 0" type="danger" @click="deleteAction">删除</el-button>
                </span>
            </div>
            <div class="record">
                <el-row :gutter="15">
                    <el-col :span="10">
                        <el-table ref="record_table" :data="records" border highlight-current-row @current-change="didChangeCurrentRecord" @selection-change="didSelectionChange">
                            <el-table-column type="selection" width="40" align="center"></el-table-column>
                            <el-table-column label="记录时间" align="center">
                                <template slot-scope="scope">
                                    {{ recordTime(scope.row.record_time) }}
                                </template>
                            </el-table-column>
                            <el-table-column label="记录医生" align="center">
                                <template slot-scope="scope">
                                    {{ doctorName(scope.row.recorder) }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="14">
                        <div class="record_content_panel">
                            <div class="title">抢救内容</div>
                            <div class="content">
                                {{ current_select_record == null ? "" : current_select_record.content }}
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <el-dialog title="新增抢救记录" width="40%" top="5vh" :visible.sync="show_dialog">
            <div>
                <div class="new_record_form">
                    <diV>
                        <span class="filter_title">日常抢救:</span>
                        <el-select v-model="select_template" placeholder="可选择抢救模板"  @change="didSelectTemplate">
                            <el-option v-for="(option, index) in templates" :key="index" :label="option.title" :value="option.content"></el-option>
                        </el-select>
                    </diV>
                    <div class="textarea_panel">
                        <el-input v-model="new_content" type="textarea" rows="6" resize="none"></el-input>
                    </div>

                    <div style="text-align: right; padding-right: 0px; padding-top: 10px; padding-bottom: 10px;">
                        <el-button @click="show_dialog = false">取消</el-button>
                        <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="createAction" :loading="uploading_new_record">确定</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import PatientSidebar from "./components/PatientSidebar"
import { getRescueRecords, createRescueRecord, deleteRescueRecords } from "@/api/patient"
import { parseTime } from "@/utils"

export default {
    name: "RescueRecord",
    components: { 
        PatientSidebar 
    },
    data() {
        return {
            loading: false,

            patient_id: 0,
            date: [],

            records: [],
            doctors: [],
            current_select_record: null,

            show_dialog: false,
            uploading_new_record: false,
            templates: this.$store.getters.configlist.rescue_record,
            select_template: [],
            new_content: "",

            selectingRows: [],
        }
    },
    created() {
        this.patient_id = parseInt(this.$route.query.id)
        if (isNaN(this.patient_id) || this.patient_id <= 0) {
            this.$notify.error({
                title: "错误",
                message: "无效的id"
            })
            this.$router.push("/patients/patients")
            return
        }
        var now = new Date()
        this.date = [now.getTime() - (7 * 24 * 60 * 60 * 1000), now.getTime()]

        this.requestRescueRecords()
    },
    methods: {
        requestRescueRecords: function() {
            var startTime = new Date(this.date[0])
            var endTime = new Date(this.date[1])
            this.loading = true
            getRescueRecords(this.patient_id, parseTime(startTime, "{y}-{m}-{d}"), parseTime(endTime, "{y}-{m}-{d}")).then(rs => {
                this.loading = false
                var resp = rs.data
                if (resp.state == 1) {
                    this.current_select_record = null
                    this.records = resp.data.records
                    this.doctors = resp.data.doctors
                    
                } else {
                    this.$message.error(resp.msg)
                }
            }).catch(error => {
                this.loading = false
                this.$message.error(error)
            })
        },

        didChangeCurrentRecord: function(record) {
            this.current_select_record = record
        },
        recordTime: function(timestamp) {
            var time = new Date(timestamp * 1000)
            return parseTime(time, "{y}-{m}-{d}")
        },
        doctorName: function(doctor_id) {
            for (let index = 0; index < this.doctors.length; index++) {
                const doctor = this.doctors[index];
                if (doctor.id == doctor_id) {
                    return doctor.name
                }
            }
            return ""
        },

        createAction: function() {
            if (this.new_content.length == 0) {
                this.$message.error("请填写抢救内容")
                return
            }
            this.uploading_new_record = true
            createRescueRecord(this.patient_id, this.new_content).then(rs => {
                this.uploading_new_record = false
                var resp = rs.data
                if (resp.state == 1) {
                    this.records.unshift(resp.data.record)
                    // this.$refs.record_table.setCurrentRow()
                    this.$refs.record_table.setCurrentRow(this.records[0])
                    // this.current_select_record = this.records[0]
                    this.show_dialog = false
                    this.new_content = ""

                } else {
                    this.$message.error(resp.msg)
                }

            }).catch(error => {
                this.uploading_new_record = false
                this.$message.error(error)
            })
        },
        didSelectTemplate: function(templateContent) {
            this.new_content = this.new_content.length > 0 ? (this.new_content + templateContent) : templateContent

            this.select_template = ""
        },

        didSelectionChange: function(selectRows) {
            this.selectingRows = selectRows
        },
        deleteAction: function() {
            if (this.selectingRows.length == 0) {
                return
            }
            var ids = []
            for (let index = 0; index < this.selectingRows.length; index++) {
                const row = this.selectingRows[index];
                ids.push(row.id)
            }
            var ids_str = ids.join(",")
            this.loading = true
            deleteRescueRecords(this.patient_id, ids_str).then(rs => {
                var resp = rs.data
                if (resp.state == 1) {
                    for (let id_index = 0; id_index < ids.length; id_index++) {
                        for (let record_index = 0; record_index < this.records.length; record_index++) {
                            if (ids[id_index] == this.records[record_index].id) {
                                this.records.splice(record_index, 1)
                                break
                            }
                        }
                    }
                    this.selectingRows = []
                    this.$message.success("已删除")

                } else {
                    this.$message.error(resp.msg)
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
                this.$message.error(err)
            })
        },
    },
}
</script>

<style rel="stylesheet/css" lang="scss" scoped>
.container {
    margin-left: 180px;
    padding: 0 20px;

    .record {
        padding-top: 20px;
    }
}
.filter_title {
    font-size: 14px;
    color: gray;
    margin-right: 6px;
}
.record_content_panel {
    border-width: 1px;
    border-style: solid;
    border-color: #ebeef5;
    min-height: 200px;

    .title {
        font-size: 14px;
        font-weight: 500;
        color: #909399;
        line-height: 44px;
        height: 44px;
        text-align: center;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #ebeef5;
    }
    .content {
        padding: 12px 15px;
        font-size: 15px;
        color: gray;
        line-height: 22px;
    }
}

.new_record_form {
    // padding: 10px, 25px;

    .textarea_panel {
        margin-top: 10px;
    }
}
</style>
