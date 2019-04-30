<template>
    <div class="app-container">
        <el-row :gutter="15">
            <el-col :span="7">
                <device-list ref="device_list" :zones="zones" :groups="groups" :device_numbers="device_numbers" @did_select_device="did_select_device"></device-list>
            </el-col>
            <el-col :span="17">
                <device-detail ref="device_detail" :device_numbers="device_numbers" @did_update_device="did_update_device"></device-detail>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DeviceList from './components/device_list'
import DeviceDetail from './components/device_detail'
import {getDeviceInitData} from '@/api/device/device'

export default {
    name: "DeviceManage",
    components: {
        DeviceList,
        DeviceDetail
    },
    data() {
        return {
            zones: [],
            groups: [],
            device_numbers: [],
        }
    },
    created() {
        getDeviceInitData().then(rs => {
            var resp = rs.data
            if (resp.state === 1) {
                // console.log(resp)
                this.zones.push(...resp.data.zones)
                this.groups.push(...resp.data.groups)
                this.device_numbers.push(...resp.data.numbers)
                
            } else {
                this.$message.error(resp.msg)
            }
        })
    },
    methods: {
        did_select_device: function(device) {
            if (device) {
                this.$refs.device_detail.set_device(device.id, device.device_type)
            } else {
                this.$refs.device_detail.set_device(0, 1)
            }
            
        },
        did_update_device: function(device) {
            this.$refs.device_list.update_device(device)
        }
    }
}
</script>
