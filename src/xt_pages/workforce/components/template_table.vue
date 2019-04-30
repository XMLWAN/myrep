<template>
    <div v-loading="saving">
        <el-row v-show="editable">
            <el-col :span="24" style="text-align: left; margin-bottom: 10px;">
                <div v-show="editable && !is_editing">
                    <el-button type="primary" size="small" @click="is_editing = true" icon="el-icon-edit-outline">编辑</el-button>
                </div>
                <div v-show="editable && is_editing">
                    <el-button type="info" size="small" @click="is_editing = false" icon="el-icon-delete">取消</el-button>
                    <el-button type="warning" size="small" icon="el-icon-document" @click="saveAction">确定</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table ref="table" id="table_data" :max-height="tableHeight" :data="opera_device_numbers" :span-method="spanMethod" row-class-name="table-row-new-class schedule-table-row" @cell-click="itemClick">
            <el-table-column label="分区" width="80" align="center" fixed style="width: 100px; background-color: red; display: block;">
                <template slot-scope="scope">
                    {{ scope.row.zone.name }}
                </template>
            </el-table-column>

            <el-table-column label="机号" width="80" align="center" fixed>
                <template slot-scope="scope">
                    <div>{{scope.row.number}}</div>
                </template>
            </el-table-column>

            <el-table-column label="周一" width="215" align="center">
                <el-table-column prop="1_1" label="上" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['1_1']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="1_2" label="下" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['1_2']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="1_3" label="晚" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['1_3']"></template-table-item>
                    </template>
                </el-table-column>
            </el-table-column>

            <el-table-column label="周二" width="215" align="center">
                <el-table-column prop="2_1" label="上" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['2_1']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="2_2" label="下" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['2_2']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="2_3" label="晚" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['2_3']"></template-table-item>
                    </template>
                </el-table-column>
            </el-table-column>
            
            <el-table-column label="周三" width="215" align="center">
                <el-table-column prop="3_1" label="上" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['3_1']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="3_2" label="下" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['3_2']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="3_3" label="晚" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['3_3']"></template-table-item>
                    </template>
                </el-table-column>
            </el-table-column>
            
            <el-table-column label="周四" width="215" align="center">
                <el-table-column prop="4_1" label="上" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['4_1']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="4_2" label="下" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['4_2']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="4_3" label="晚" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['4_3']"></template-table-item>
                    </template>
                </el-table-column>
            </el-table-column>
            
            <el-table-column label="周五" width="215" align="center">
                <el-table-column prop="5_1" label="上" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['5_1']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="5_2" label="下" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['5_2']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="5_3" label="晚" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['5_3']"></template-table-item>
                    </template>
                </el-table-column>
            </el-table-column>
            
            <el-table-column label="周六" width="215" align="center">
                <el-table-column prop="6_1" label="上" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['6_1']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="6_2" label="下" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['6_2']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="6_3" label="晚" width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['6_3']"></template-table-item>
                    </template>
                </el-table-column>
            </el-table-column>

            <el-table-column label="周日" min-width="215" align="center">
                <el-table-column prop="7_1" label="上" min-width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['7_1']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="7_2" label="下" min-width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['7_2']"></template-table-item>
                    </template>
                </el-table-column>
                <el-table-column prop="7_3" label="晚" min-width="70" align="center">
                    <template slot-scope="scope">
                        <template-table-item :info="scope.row['7_3']"></template-table-item>
                    </template>
                </el-table-column>
            </el-table-column>
            
            <el-table-column prop="total" label="总数" width="60" align="center" fixed="right">
                <template slot-scope="scope">
                    {{ scope.row.total }}
                </template>
            </el-table-column>
        </el-table>

        <schedule-selector-dialog ref="selector_dialog" :patients="patients" @did_selected="will_add_schedule_action" @did_cancel="cancel_schedule_action"></schedule-selector-dialog>
    </div>
</template>

<script>
import TemplateTableItem from "./template_table_item"
import ScheduleSelectorDialog from "./template_schedule_selector_dialog"
import {updateSchedules} from "@/api/schedule_template/patient"

var rowspanNoControl = -1
export default {
    name: "TemplateTable",
    components: {
        TemplateTableItem,
        ScheduleSelectorDialog
    },
    data() {
        return {
            saving: false,
            zone_device_counts: {},
            treat_modes: {},
            is_editing: false,
            opera_device_numbers: [],
            origin_device_numbers: [],

            tableHeight: document.documentElement.clientHeight,
        }
    },
    props: {
        editable: {
            type: Boolean,
            default: true,
        },
        device_numbers: {
            type: Array,
        },
        template: {
            type: Object,
        },
        patients: {
            type: Array,
        }
    },
    created() {
        this.treat_modes = this.$store.getters.treatment_mode
        
        // window.addEventListener('scroll', this.handleScroll)
    },
    watch: {
        "device_numbers": function() {
            this.opera_device_numbers = this.makeDeviceNumbers(this.device_numbers)
            this.origin_device_numbers = this.makeDeviceNumbers(this.device_numbers)
        },
        "template.items": function() {
            // 先清除所有已有 item
            var weekdays = [1, 2, 3, 4, 5, 6, 7] // 周一-周日
            var time_types = [1, 2, 3] // 上下晚
            for (let d_n_i = 0; d_n_i < this.opera_device_numbers.length; d_n_i++) {
                const op_d_n = this.opera_device_numbers[d_n_i]
                const or_d_n = this.origin_device_numbers[d_n_i]

                op_d_n.total = 0
                or_d_n.total = 0

                for (let w_i = 0; w_i < weekdays.length; w_i++) {
                    const weekday = weekdays[w_i]
                    for (let t_i = 0; t_i < time_types.length; t_i++) {
                        const time_type = time_types[t_i]
                        
                        var item_key = weekday + "_" + time_type
                        var op_item = op_d_n[item_key]
                        var or_item = or_d_n[item_key]

                        op_item.pid = 0
                        op_item.name = ""
                        op_item.treat_mode_id = 0
                        op_item.treat_mode = ""

                        or_item.pid = 0
                        or_item.name = ""
                        or_item.treat_mode_id = 0
                        or_item.treat_mode = ""
                    }
                }
            }

            for (let index = 0; index < this.template.items.length; index++) {
                const template_item = this.template.items[index];

                for (let d_i = 0; d_i < this.opera_device_numbers.length; d_i++) {
                    const device_number = this.opera_device_numbers[d_i];
                    if (device_number.id == template_item.device_number_id) {
                        var weekday = template_item.weekday
                        var time_type = template_item.time_type
                        var cell_item = device_number[weekday + "_" + time_type]
                        cell_item.pid = template_item.patient_id
                        cell_item.name = template_item.patient.name
                        cell_item.treat_mode_id = template_item.treat_mode
                        cell_item.treat_mode = this.treat_modes[template_item.treat_mode].name
                        device_number.total += 1

                        // origin_device_numbers 初始化时数据应该是和 opera_device_numbers 一样的，这里就不再用一个 for 遍历 origin_device_numbers 重复 opera_device_numbers 的操作了
                        const o_device_number = this.origin_device_numbers[d_i]
                        var o_cell_item = o_device_number[weekday + "_" + time_type]
                        o_cell_item.pid = template_item.patient_id
                        o_cell_item.name = template_item.patient.name
                        o_cell_item.treat_mode_id = template_item.treat_mode
                        o_cell_item.treat_mode = this.treat_modes[template_item.treat_mode].name
                        o_device_number.total += 1

                        break
                    }
                }
            }

            // this.$refs.table.doLayout()
        },
        tableHeight (val) {
            if(!this.timer) {
                this.tableHeight = val
                this.timer = true
                let that = this
                setTimeout(function (){
                    that.timer = false
                }, 400)
            }
        }
    },
    mounted() {
        const that = this
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight
                if (window.fullHeight < 200) {
                    that.tableHeight = 200
                } else {
                    that.tableHeight = window.fullHeight - 200
                }
            })()
        }
    },
    methods: {
        // handleScroll: function() {
        //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //     console.log(scrollTop)
        //     if (scrollTop >= 150) {
        //         this.fixed_style = "background-color: red; position: fixed; top: 0px; left: 190px; right: 150px; z-index: 99;"
        //     } else {
        //         this.fixed_style = ""
        //     }
        // },
        makeDeviceNumbers: function(device_numbers) {
            var maked_device_numbers = []
            var weekdays = [1, 2, 3, 4, 5, 6, 7] // 周一-周日
            var time_types = [1, 2, 3] // 上下晚
            for (let index = 0; index < device_numbers.length; index++) {
                const device_number = device_numbers[index];
                var zone = {
                    id: device_number.zone.id,
                    name: device_number.zone.name,
                    type: device_number.zone.type,
                }
                var device = {
                    id: device_number.id,
                    number: device_number.number,
                    group_id: device_number.group_id,
                    zone_id: device_number.zone_id,
                    zone: zone,
                }

                // 以 weekday_timetype 为 key，{pid: 0, name: "", treat_mode_id: 0, treat_mode: ""} 为 value，加入到 maked_device_numbers 中
                for (let w_i = 0; w_i < weekdays.length; w_i++) {
                    const weekday = weekdays[w_i];
                    for (let t_i = 0; t_i < time_types.length; t_i++) {
                        const time_type = time_types[t_i];

                        var defaultValue = {}
                        this.$set(defaultValue, "pid", 0)
                        this.$set(defaultValue, "name", "")
                        this.$set(defaultValue, "treat_mode_id", 0)
                        this.$set(defaultValue, "treat_mode", "")

                        this.$set(device, weekday + "_" + time_type, defaultValue)
                    }
                }
                this.$set(device, "total", 0) // 每个床位号每周的排班总数

                maked_device_numbers.push(device)
            }
            return maked_device_numbers
        },
        spanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex == 0) {
                if (rowIndex == 0) {
                    rowspanNoControl = -1
                }
                var spanRowCount = this.zone_device_counts[row.zone_id]
                var isFirstRowInGroup = false
                if (spanRowCount == undefined) {
                    var count = 0
                    for (let index = 0; index < this.opera_device_numbers.length; index++) {
                        const number = this.opera_device_numbers[index]
                        if (number.zone_id == row.zone_id) {
                            count ++
                        }
                    }
                    this.zone_device_counts[row.zone_id] = count
                    spanRowCount = count + 0
                    isFirstRowInGroup = true

                } else {
                    isFirstRowInGroup = rowIndex == rowspanNoControl + 1
                    if (rowspanNoControl + spanRowCount == rowIndex) {
                        rowspanNoControl = rowIndex
                    }
                }

                if (isFirstRowInGroup) {
                    return {
                        rowspan: spanRowCount,
                        colspan: 1
                    }
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0,
                    }
                }
            }
        },
        itemClick: function(row, column, cell, event) {
            if (this.editable == false || this.is_editing == false) {
                return
            }

            if (column.property == undefined || /^[1-7]_[1-3]$/.test(column.property) == false) {
                return
            }
            if (row[column.property] == undefined) {
                return
            }
            
            var item = row[column.property]
            var weekday_timetype = column.property.split("_")
            var weekday = weekday_timetype[0]
            var time_type = weekday_timetype[1]
            var device_number_id = row.id
            if (item.pid == 0) {
                this.$refs.selector_dialog.show(weekday, time_type, device_number_id)
            } else {
                this.$refs.selector_dialog.showWith(item.pid, item.treat_mode_id, weekday, time_type, device_number_id)
            }
        },
        will_add_schedule_action: function(patient_id, treat_mode, weekday, time_type, device_number_id) {
            var patient = null
            for (let index = 0; index < this.patients.length; index++) {
                const p = this.patients[index];
                if (p.id == patient_id) {
                    patient = p
                    break
                }
            }
            if (patient == null) {
                this.$message.error("患者不存在")
                return
            }

            for (let index = 0; index < this.opera_device_numbers.length; index++) {
                const device_number = this.opera_device_numbers[index];
                for (let t_y = 1; t_y <= 3; t_y++) {
                    if (t_y == time_type && device_number_id == device_number.id) {
                        continue
                    }
                    if (device_number[weekday + "_" + t_y].pid == patient_id) {
                        this.$message.error("同位患者一天内不可有两次排班")
                        return
                    }
                }
            }

            for (let index = 0; index < this.opera_device_numbers.length; index++) {
                const device_number = this.opera_device_numbers[index]
                if (device_number.id == device_number_id) {

                    var isDiseaseSame = false
                    var havePatientDisease = patient.contagions.length > 0
                    if (patient.contagions.length > 0 || device_number.zone.type != 1) {
                        if (device_number.zone.type != 1) {
                            for (let c_i = 0; c_i < patient.contagions.length; c_i++) {
                                const contagion = patient.contagions[c_i]
                                if (contagion.disease_id == device_number.zone.type) {
                                    isDiseaseSame = true
                                }
                            }
                        }
                    } else {
                        isDiseaseSame = true
                    }
                    if (isDiseaseSame == false) {
                        // 此患者没有传染病，与此透析机不匹配，确定在此排班吗?
                        // 此患者有传染病，与此透析机不匹配，确定在此排班吗?
                        var msg = havePatientDisease ? "此患者有传染病，与此透析机不匹配，确定在此排班吗?" : "此患者没有传染病，与此透析机不匹配，确定在此排班吗?"
                        this.$confirm(msg, '提示', {confirmButtonText: '是', cancelButtonText: '否', type: 'warning'})
                        .then(() => {
                            this.add_schedule(patient, device_number, treat_mode, weekday, time_type)
                        })
                    } else {
                        this.add_schedule(patient, device_number, treat_mode, weekday, time_type)
                    }
                    return
                }
            }

            this.$message.error("设备不存在")
        },
        cancel_schedule_action: function(weekday, time_type, device_number_id) {
            for (let index = 0; index < this.opera_device_numbers.length; index++) {
                const device_number = this.opera_device_numbers[index]
                if (device_number.id == device_number_id) {
                    var item = device_number[weekday + "_" + time_type]
                    item.pid = 0
                    item.name = ""
                    item.treat_mode_id = 0
                    item.treat_mode = ""
                    this.$refs.selector_dialog.hide()
                }
            }
        },
        add_schedule: function(patient, device_number, treat_mode, weekday, time_type) {
            var item = device_number[weekday + "_" + time_type]
            var isNew = item.pid == 0

            item.pid = patient.id
            item.name = patient.name
            item.treat_mode_id = treat_mode
            item.treat_mode = this.treat_modes[treat_mode].name

            if (isNew) {
                device_number.total += 1
            }
            this.$refs.selector_dialog.hide()
        },
        saveAction: function() {
            this.saving = true

            var add_items = []
            var del_items = []
            var change_items = []
            var weekdays = [1, 2, 3, 4, 5, 6, 7] // 周一-周日
            var time_types = [1, 2, 3] // 上下晚
            for (let d_n_i = 0; d_n_i < this.opera_device_numbers.length; d_n_i++) {
                const op_d_n = this.opera_device_numbers[d_n_i]
                const or_d_n = this.origin_device_numbers[d_n_i]

                for (let w_i = 0; w_i < weekdays.length; w_i++) {
                    const weekday = weekdays[w_i]
                    for (let t_i = 0; t_i < time_types.length; t_i++) {
                        const time_type = time_types[t_i]
                        
                        var item_key = weekday + "_" + time_type
                        var op_item = op_d_n[item_key]
                        var or_item = or_d_n[item_key]
                        if (op_item.pid == 0 && or_item.pid == 0) {
                            continue
                        }
                        if (op_item.pid == or_item.pid && op_item.treat_mode_id == or_item.treat_mode_id) {
                            continue
                        }
                        if (op_item.pid == 0) {
                            del_items.push({
                                device_number_id: op_d_n.id,
                                weekday: weekday,
                                time_type: time_type,
                            })
                            continue
                        } else if (or_item.pid == 0) {
                            add_items.push({
                                device_number_id: op_d_n.id,
                                patient_id: op_item.pid,
                                mode: op_item.treat_mode_id,
                                weekday: weekday,
                                time_type: time_type,
                            })
                            continue
                        } else {
                            if (op_item.pid != or_item.pid || op_item.treat_mode_id != or_item.treat_mode_id) {
                                change_items.push({
                                    device_number_id: op_d_n.id,
                                    patient_id: op_item.pid,
                                    mode: op_item.treat_mode_id,
                                    weekday: weekday,
                                    time_type: time_type,
                                })
                            }
                        }
                    }
                }
            }

            updateSchedules(this.template.id, JSON.stringify(add_items), JSON.stringify(del_items), JSON.stringify(change_items)).then(rs => {
                var resp = rs.data
                if (resp.state == 1) {
                    this.$message({
                        message: "已保存",
                        type: "success",
                    })
                } else {
                    this.$message.error(resp.msg)
                }
                this.saving = false
                this.is_editing = false
            })
        }
    }
}
</script>

<style scoped>
.schedule-table-row {
  background: #fff !important;
}
.schedule-table-row:hover{
  background: #fff !important;
}
.schedule-table-row td:hover{
  background: rgb(88, 162, 236) !important;
}
.schedule-table-row td .cell{
  font-size: 12px;
  white-space:nowrap !important;
}
</style>
