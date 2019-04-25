<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-col :span="10">
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="add_device_action">新增设备</el-button>
                </el-col>
                <el-col :span="10">
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="danger" @click="delete_device_action">删除设备</el-button>
                </el-col>
                <!-- <div class="header">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-button type="primary" size="small" @click="partition_dialog_action">透析分区</el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button type="primary" size="small" @click="add_device_action">新增设备</el-button>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="24">
                            <el-form :model="filter_form" label-width="70px">
                                <el-form-item label="透析分区">
                                    <el-select v-model="filter_form.zone" clearable size="small">
                                        <el-option v-for="item in zones" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="班次">
                                    <el-select v-model="filter_form.schedule" clearable size="small">
                                        <el-option v-for="item in schedules" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="设备类型">
                                    <el-select v-model="filter_form.device_type" clearable size="small">
                                        <el-option v-for="item in device_types" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" size="small" @click="filter_devices">&nbsp;查询&nbsp;</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div> -->
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-table :data="devices" border :header-cell-style="{ backgroundColor: 'rgb(64, 158, 255)', color: 'white'}" :highlight-current-row="true" @row-click="select_row">
                    <el-table-column label="序列号" prop="serial_number" align="center" header-align="center"></el-table-column>
                    <el-table-column label="设备名" prop="name" align="center" header-align="center"></el-table-column>
                    <el-table-column label="型号" prop="model" align="center" header-align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <add-device-dialog ref="new_device_dialog" :device_numbers="device_numbers" @did_create_device="didCreateDevice"></add-device-dialog> 
        <partition-dialog ref="new_partition_dialog" :zones="zones" :device_numbers="device_numbers" :groups="groups"></partition-dialog> 
    </div>
 
</template>

<script>
import AddDeviceDialog from "./add_device_dialog"
import PartitionDialog from "./partition_dialog"
import { getDevices, disableDevice } from '@/api/device/device'

export default {
    name: 'DeviceList',
    components: {
        AddDeviceDialog,
        PartitionDialog,
    },
    data() {
        return {
            filter_form: {
                zone: '',
                schedule: '',
                device_type: '',
            },
            schedules: [
                { id:1, name:'上午' },
                { id:2, name:'下午' },
                { id:3, name:'晚上' },
            ],
            device_types: [
                { id:1, name:'透析机' },
                { id:2, name:'水处理机' },
            ],
            devices: [],

            current_select_device: null,
        }
    },
    props: {
        zones: {
            type: Array,
            require: true,
        },
        groups: {
            type: Array,
            require: true,
        },
        device_numbers: {
            type: Array,
            require: true,
        },
    },
    created() {
        this._get_devices()
    },
    methods: {
        add_device_action: function() {
            this.$refs.new_device_dialog.show()
        },
        partition_dialog_action: function() {
            this.$refs.new_partition_dialog.show()
        },
        filter_devices: function() {
            this.$emit("did_select_device", null)
            this._get_devices()
        },
        _get_devices: function() {
            getDevices(this.filter_form.device_type, this.filter_form.zone).then(rs => {
                var resp = rs.data
                if (resp.state === 1) {
                    // console.log(resp)
                    this.devices.splice(0, this.devices.length)
                    this.devices.push(...resp.data.devices)
                    
                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
        didCreateDevice: function(newDevice) {
            this.$refs.new_device_dialog.hide()
            this.devices.push(newDevice)
        },
        select_row: function(row, event, column) {
            // console.log(row)
            this.current_select_device = row
            this.$emit("did_select_device", row)
        },
        update_device: function(device) {
            if (device !== undefined) {
                for (let index = 0; index < this.devices.length; index++) {
                    const _device = this.devices[index];
                    if (_device.id == device.id) {
                        _device.name = device.name
                        _device.model = device.model
                        _device.serial_number = device.serial_number
                        _device.device_group_id = device.device_group_id
                        _device.device_number = device.device_number
                        _device.device_number_id = device.device_number_id
                        _device.device_zone_id = device.device_zone_id
                        break
                    }
                }
            }
        },
        delete_device_action: function() {
            if (this.current_select_device != null) {
                this.$confirm("删除后将无法恢复，确定继续删除吗", '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
                .then(() => {
                    disableDevice(this.current_select_device.id).then(rs => {
                        var resp = rs.data
                        if (resp.state == 1) {
                            var index = this.devices.indexOf(this.current_select_device)
                            if (index > -1) {
                                this.devices.splice(index, 1)
                            }
                            this.current_select_device = null
                            this.$emit("did_select_device", null)
                            
                        } else {
                            this.$message.error(resp.msg)
                        }
                    })
                })
            }
        },
    }
}
</script>

<style scoped>
.header {
    /* background-color: rgb(223, 249, 255); */
    background-color: rgb(236, 245, 255);
    border-style: solid;
    border-radius: 10px;
    border-color: rgb(150, 202, 253);
    border-width: 1px;
    padding: 20px 20px 0px 20px;
    margin-bottom: 10px;
}
.el-row {
    margin-bottom: 15px;
}
.el-form-item {
    margin-bottom: 5px;
}
.header .item_title {
    font-size: 14px;
}
</style>
