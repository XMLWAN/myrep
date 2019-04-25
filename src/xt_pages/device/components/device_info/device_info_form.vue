<template>
    <div class="main">
        <!-- 第一行 -->
        <el-row>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.first_line_label">
                        <span class="col_label_span"><span class="required_span">*&nbsp;</span>序列号:</span>
                    </el-col>
                    <el-col :span="layout.first_line_content">
                        <el-input size="small" v-model="form.serial_number"></el-input>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.second_line_label">
                        <span class="col_label_span"><span class="required_span">*&nbsp;</span>设备类型:</span>
                    </el-col>
                    <el-col :span="layout.second_line_content">
                        <el-select v-model="form.device_type" size="small" :disabled="device_id != 0">
                            <el-option v-for="item in device_types" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.third_line_label">
                        <span class="col_label_span">床位号:</span>
                    </el-col>
                    <el-col :span="layout.third_line_content">
                        <el-select v-model="form.device_number_id" clearable size="small">
                            <el-option v-for="item in device_numbers" :key="item.id" :label="item.number" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.first_line_label">
                        <span class="col_label_span"><span class="required_span">*&nbsp;</span>设备名称:</span>
                    </el-col>
                    <el-col :span="layout.first_line_content">
                        <el-input size="small" v-model="form.name"></el-input>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.second_line_label">
                        <span class="col_label_span">生产厂家:</span>
                    </el-col>
                    <el-col :span="layout.second_line_content">
                        <el-input size="small" v-model="form.manufacturer"></el-input>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.third_line_label">
                        <span class="col_label_span">维修厂家:</span>
                    </el-col>
                    <el-col :span="layout.third_line_content">
                        <el-input size="small" v-model="form.repair_factory"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.first_line_label">
                        <span class="col_label_span">设备型号:</span>
                    </el-col>
                    <el-col :span="layout.first_line_content">
                        <el-input size="small" v-model="form.model"></el-input>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.second_line_label">
                        <span class="col_label_span">使用科室:</span>
                    </el-col>
                    <el-col :span="layout.second_line_content">
                        <el-input size="small" v-model="form.department"></el-input>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.third_line_label">
                        <span class="col_label_span">科室编号:</span>
                    </el-col>
                    <el-col :span="layout.third_line_content">
                        <el-input size="small" v-model="form.department_number"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.first_line_label">
                        <span class="col_label_span">购买日期:</span>
                    </el-col>
                    <el-col :span="layout.first_line_content">
                        <el-date-picker v-model="form.purchase_date" type="date" value-format="timestamp" size="small" style="width: 100%;"></el-date-picker>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.second_line_label">
                        <span class="col_label_span">安装日期:</span>
                    </el-col>
                    <el-col :span="layout.second_line_content">
                        <el-date-picker v-model="form.install_date" type="date" value-format="timestamp" size="small" style="width: 100%;"></el-date-picker>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.third_line_label">
                        <span class="col_label_span">启用日期:</span>
                    </el-col>
                    <el-col :span="layout.third_line_content">
                        <el-date-picker v-model="form.commissioning_date" value-format="timestamp" type="date" size="small" style="width: 100%;"></el-date-picker>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.first_line_label">
                        <span class="col_label_span">维修工程师:</span>
                    </el-col>
                    <el-col :span="layout.first_line_content">
                        <el-input size="small" v-model="form.maintainer"></el-input>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.second_line_label">
                        <span class="col_label_span">联系电话:</span>
                    </el-col>
                    <el-col :span="layout.second_line_content">
                        <el-input size="small" v-model="form.maintenance_call"></el-input>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.third_line_label">
                        <span class="col_label_span">保修期限:</span>
                    </el-col>
                    <el-col :span="layout.third_line_content">
                        <el-input size="small" v-model="form.warranty_period"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第六行 -->
        <!-- <el-row>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="9">
                        <span class="col_label_span">机器状态:</span>
                    </el-col>
                    <el-col :span="15">
                        <el-select v-model="form.device_status" clearable size="small">
                            <el-option v-for="item in device_states" :key="item.state" :label="item.name" :value="item.state"></el-option>
                        </el-select>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="10">
                        <span class="col_label_span">初始使用次数:</span>
                    </el-col>
                    <el-col :span="14">
                        <el-input v-model="form.initial_use_times" style="width: 100%;"></el-input>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="7">
                        <span class="col_label_span">备&nbsp;&nbsp;&nbsp;注:</span>
                    </el-col>
                    <el-col :span="17">
                        <el-input size="small" v-model="form.mark"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row> -->
        <!-- 第七行 -->
        <!-- <el-row>
            <el-col :span="7">
                <div class="col_div">
                    <el-col :span="8">
                        <span class="col_label_span">报废日期:</span>
                    </el-col>
                    <el-col :span="16">
                        <el-date-picker v-model="form.retirement_date" type="date" value-format="timestamp" size="small" style="width: 140px;"></el-date-picker>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="col_div">
                    <el-col :span="8">
                        <span class="col_label_span">报废原因:</span>
                    </el-col>
                    <el-col :span="16">
                        <el-select v-model="form.retirement_reason" clearable size="small">
                            <el-option v-for="item in retirement_reasons" :key="item.id" :label="item.reason" :value="item.reason"></el-option>
                        </el-select>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="col_div">
                    <el-col :span="15">
                        <span class="col_label_span">使用年限(年):</span>
                    </el-col>
                    <el-col :span="9">
                        <el-input size="small" v-model="form.service_life"></el-input>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="col_div">
                    <el-col :span="14">
                        <span class="col_label_span">工作时长(h):</span>
                    </el-col>
                    <el-col :span="10">
                        <el-input size="small" v-model="form.working_time"></el-input>
                    </el-col>
                </div>
            </el-col>
        </el-row> -->
        <!-- 治疗模式 -->
        <el-row v-show="false && form.device_type === 1">
            <el-col :span="24">
                <div class="col_div">
                    <el-col :span="3">
                        <div style="padding-left: 5px;">
                            <span class="col_label_span" style="line-height: auto; padding-left: 0; text-align: left;">治疗模式:</span>
                            <el-checkbox label="全选"></el-checkbox>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div style="margin-top: 6px;"></div>
                        <el-checkbox-group v-model="form.treatment_mode">
                            <el-checkbox v-for="item in cure_types" :label="item.id" :key="item.id" :value="item.id">{{ item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 反渗模式 -->
        <el-row v-show="false && form.device_type === 2">
            <el-col :span="8">
                <div class="col_div">
                    <el-col :span="layout.first_line_label">
                        <span class="col_label_span">反渗模式:</span>
                    </el-col>
                    <el-col :span="layout.first_line_content">
                        <el-select v-model="form.reverse_osmosis_mode" clearable size="small">
                            <el-option v-for="item in reverse_osmosises" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {getDeviceBaseInfo, createDevice, modifyDeviceBaseInfo} from '@/api/device/device'

export default {
    name: "DeviceInfoForm",
    data() {
        return {
            layout: {
                first_line_label: 8,
                first_line_content: 16,
                second_line_label: 8,
                second_line_content: 16,
                third_line_label: 8,
                third_line_content: 16,
            },
            device_id: 0,
            form: {
                device_type: 1,
                serial_number: '',
                name: '',
                device_number_id: '',
                manufacturer: '',
                repair_factory: '',
                model: '',
                department: '',
                department_number: '',
                purchase_date: '',
                install_date: '',
                commissioning_date: '',
                maintainer: '',
                maintenance_call: '',
                warranty_period: '',
                device_status: '',
                initial_use_times: '',
                mark: '',
                retirement_date: '',
                retirement_reason: '',
                service_life: '',
                working_time: '',
                treatment_mode: [], // 治疗模式
                reverse_osmosis_mode: '', // 反渗模式
            },
            device_types: [
                { id: 1, name: "透析机" },
                // { id: 2, name: "水处理机" },
            ],
            cure_types: [ // 治疗模式
                // { id:1, name: "HD" },
                // { id:2, name: "HDF" },
                // { id:3, name: "HD+HP" },
                // { id:4, name: "HP" },
                // { id:5, name: "HF" },
                // { id:10, name: "HD" },
                // { id:20, name: "HDF" },
                // { id:30, name: "HD+HP" },
                // { id:40, name: "HP" },
                // { id:50, name: "HF" },
                // { id:300, name: "HD+HP" },
            ],
            reverse_osmosises: [ // 反渗模式
                // { id:1, name: "单级反渗" }
            ],
            device_states: [
                { state: 1, name: '使用机' },
                { state: 2, name: '备用机' },
                { state: 3, name: '急诊机' },
                { state: 4, name: '报废机' },
            ],
            retirement_reasons: [
                { id: 1, reason: '报废原因1' },
                { id: 2, reason: '报废原因2' },
                { id: 3, reason: '报废原因3' },
                { id: 4, reason: '报废原因4' },
                { id: 5, reason: '其他' },
            ]
        }
    },
    props: {
        // device_id: {
        //     type: Number,
        //     require: false,
        // },
        device_numbers: {
            type: Array,
            require: true,
        }
    },
    created() {
        
    },
    methods: {
        clear() {
            this.device_id = 0
            this.form.device_type = 1
            this.form.serial_number = ''
            this.form.name = ''
            this.form.device_number_id = ''
            this.form.manufacturer = ''
            this.form.repair_factory = ''
            this.form.model = ''
            this.form.department = ''
            this.form.department_number = ''
            this.form.purchase_date = 0
            this.form.install_date = 0
            this.form.commissioning_date = 0
            this.form.maintainer = ''
            this.form.maintenance_call = ''
            this.form.warranty_period = ''
            this.form.device_status = ''
            this.form.initial_use_times = ''
            this.form.mark = ''
            this.form.retirement_date = 0
            this.form.retirement_reason = ''
            this.form.service_life = ''
            this.form.working_time = ''
            this.form.treatment_mode = []
            this.form.reverse_osmosis_mode = ''
        },
        set_device_id: function(device_id) {
            if (device_id > 0) {
                this.device_id = device_id
                getDeviceBaseInfo(device_id).then(rs => {
                    var resp = rs.data
                    if (resp.state === 1) {
                        this.form.device_type = resp.data.device_type
                        this.form.device_number_id = resp.data.device_number_id == 0 ? '' : resp.data.device_number_id

                        var device_info = resp.data.device_info
                        this.form.serial_number = device_info.serial_number
                        this.form.name = device_info.name
                        this.form.manufacturer = device_info.manufacturer
                        this.form.repair_factory = device_info.repair_factory
                        this.form.model = device_info.model
                        this.form.department = device_info.department
                        this.form.department_number = device_info.department_number
                        this.form.purchase_date = device_info.purchase_date == 0 ? '' : (device_info.purchase_date * 1000)
                        this.form.install_date = device_info.install_date == 0 ? '' : (device_info.install_date * 1000)
                        this.form.commissioning_date = device_info.commissioning_date == 0 ? '' : (device_info.commissioning_date * 1000)
                        this.form.maintainer = device_info.maintainer
                        this.form.maintenance_call = device_info.maintenance_call
                        this.form.warranty_period = device_info.warranty_period
                        this.form.device_status = device_info.device_status == 0 ? '' : device_info.device_status
                        this.form.initial_use_times = device_info.initial_use_times == 0 ? '' : device_info.initial_use_times
                        this.form.mark = device_info.mark
                        this.form.retirement_date = device_info.retirement_date == 0 ? '' : (device_info.retirement_date * 1000)
                        this.form.retirement_reason = device_info.retirement_reason
                        this.form.service_life = device_info.service_life == 0 ? '' : device_info.service_life
                        this.form.working_time = device_info.working_time == 0 ? '' : device_info.working_time
                        if (this.form.device_type == 1) {
                            // treatment_mode: []
                            
                        } else if (this.form.device_type == 2) {
                            // reverse_osmosis_mode: ''
                        }

                    } else {
                        this.$message.error(resp.msg)
                    }
                })
                
            } else {
                this.clear()
            }
        },
        create_device_submit() {
            var checkErr = this._check_submit()
            if (checkErr.length > 0) {
                this.$message.error(checkErr)
                return
            }

            var params = new Object()
            params.type = this.form.device_type
            params.serial_number = this.form.serial_number
            params.name = this.form.name
            params.device_number_id = this.form.device_number_id
            params.manufacturer = this.form.manufacturer
            params.repair_factory = this.form.repair_factory
            params.model = this.form.model
            params.department = this.form.department
            params.department_number = this.form.department_number
            params.purchase_date = typeof this.form.purchase_date == 'string' ? 0 : (this.form.purchase_date / 1000)
            params.install_date = typeof this.form.install_date == 'string' ? 0 : (this.form.install_date / 1000)
            params.commissioning_date = typeof this.form.commissioning_date == 'string' ? 0 : (this.form.commissioning_date / 1000)
            params.maintainer = this.form.maintainer
            params.maintenance_call = this.form.maintenance_call
            params.warranty_period = this.form.warranty_period
            params.device_status = this.form.device_status
            params.initial_use_times = this.form.initial_use_times
            params.mark = this.form.mark
            params.retirement_date = typeof this.form.retirement_date == 'string' ? 0 : (this.form.retirement_date / 1000)
            params.retirement_reason = this.form.retirement_reason
            params.service_life = this.form.service_life
            params.working_time = this.form.working_time
            // params.treatment_mode = this.form.treatment_mode
            // params.reverse_osmosis_mode = this.form.reverse_osmosis_mode
            createDevice(params).then(rs => {
                var resp = rs.data
                if (resp.state === 1) {
                    var device = resp.data.device
                    this.$emit('did_create', device)
                    this.$message({message: "创建成功", type: "success"})

                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        update_device_submit() {
            var checkErr = this._check_submit()
            if (checkErr.length > 0) {
                this.$message.error(checkErr)
                return
            }

            var params = new Object()
            params.device_id = this.device_id
            params.serial_number = this.form.serial_number
            params.name = this.form.name
            params.device_number_id = this.form.device_number_id
            params.manufacturer = this.form.manufacturer
            params.repair_factory = this.form.repair_factory
            params.model = this.form.model
            params.department = this.form.department
            params.department_number = this.form.department_number
            params.purchase_date = typeof this.form.purchase_date == 'string' ? 0 : (this.form.purchase_date / 1000)
            params.install_date = typeof this.form.install_date == 'string' ? 0 : (this.form.install_date / 1000)
            params.commissioning_date = typeof this.form.commissioning_date == 'string' ? 0 : (this.form.commissioning_date / 1000)
            params.maintainer = this.form.maintainer
            params.maintenance_call = this.form.maintenance_call
            params.warranty_period = this.form.warranty_period
            params.device_status = this.form.device_status
            params.initial_use_times = this.form.initial_use_times
            params.mark = this.form.mark
            params.retirement_date = typeof this.form.retirement_date == 'string' ? 0 : (this.form.retirement_date / 1000)
            params.retirement_reason = this.form.retirement_reason
            params.service_life = this.form.service_life
            params.working_time = this.form.working_time
            // params.treatment_mode = this.form.treatment_mode
            // params.reverse_osmosis_mode = this.form.reverse_osmosis_mode
            modifyDeviceBaseInfo(params).then(rs => {
                var resp = rs.data
                if (resp.state === 1) {
                    var device = resp.data.device
                    this.$emit('did_update', device)
                    this.$message({message: "保存成功", type: "success"})

                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        _check_submit() {
            if (this.form.serial_number.length == 0) {
                return "请填写设备序列号"
            }
            if (this.form.device_type !== 1 && this.form.device_type !== 2) {
                return "请选择设备类型"
            }
            if (this.form.name.length == 0) {
                return "请填写设备名"
            }
            if (this.form.maintenance_call.length > 0) {
                if (/^(0\d{2,3}-?\d{7,8}$)|(1\d{10}$)/.test(this.form.maintenance_call) == false) {
                    return "联系电话格式错误"
                }
            }
            return ""
        }
    }
}
</script>

<style scoped>
.main {
    width: 100%;
}
.main .el-row {
    border-bottom: 1px solid rgb(233, 233, 233);
    /* padding-left: 5px; */
    padding-right: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.col_div {
    width: 100%;
}
.col_label_span {
    padding-left: 0px;
    padding-right: 5px;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    /* display: block; */
    display: inline-block;
    width: 100%;
    text-align: right;
    /* padding-right: 5px; */
}
.required_span {
    color: red;
}

.el-checkbox {
    margin-bottom: 5px;
}
.el-checkbox+.el-checkbox {
    margin-left: 15px;
}
</style>
