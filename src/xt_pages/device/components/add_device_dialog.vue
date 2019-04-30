<template>
    <el-dialog title="新增设备" width="65%" top="5vh" :visible.sync="visible" :before-close="_close">
        <device-info-form ref="device_info_form" :device_numbers="device_numbers" @did_create="didCreateDevice"></device-info-form>
        <div style="text-align: right; padding-right: 25px; padding-top: 10px; padding-bottom: 10px;">
            <el-button @click="hide">取消</el-button>
            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="createAction">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import DeviceInfoForm from './device_info/device_info_form'

export default {
    name: "AddDeviceDialog",
    components: {
        DeviceInfoForm
    },
    data() {
        return {
            visible: false,
        }
    },
    props: {
        device_numbers: {
            type: Array,
            require: true,
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
        createAction() {
            this.$refs.device_info_form.create_device_submit()
        },
        didCreateDevice: function(device) {
            this.$refs.device_info_form.clear()
            this.$emit('did_create_device', device)
        }
    }
}
</script>

<style>
/* .el-dialog__body {
    padding: 10px 20px;
} */
</style>

