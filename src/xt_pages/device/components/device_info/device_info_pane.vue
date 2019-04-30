<template>
    <div>
        <div style="padding-top: 10px;">
            <device-info-form ref="device_info_form" :device_numbers="device_numbers" @did_update="did_update_device"></device-info-form>
        </div>
        <div style="text-align: right; padding-right: 25px; padding-top: 10px; padding-bottom: 10px;">
            <el-button type="primary" :disabled="$store.getters.xt_user.subscibe.state==3?true:false" @click="modify_submit">确定</el-button>
        </div>
    </div>
</template>

<script>
import DeviceInfoForm from './device_info_form'

export default {
    name: "DeviceInfoPane",
    components: {
        DeviceInfoForm
    },
    props: {
        device_numbers: {
            type: Array,
            require: true,
        }
    },
    methods: {
        set_device_id: function(device_id) {
            this.$refs.device_info_form.set_device_id(device_id)
        },
        modify_submit: function() {
            this.$refs.device_info_form.update_device_submit()
        },
        did_update_device: function(device) {
            this.$emit("did_update_device", device)
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
    padding-left: 5px;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    display: block;
    
}
.required_span {
    color: red;
}

</style>

