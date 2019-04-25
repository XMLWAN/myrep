<template>
    <div>
        <el-container>
            <!-- <el-header height="100px">
                <div class="_header">
                    <div class="device_info_type_item" :class="{ device_info_type_item_active: header.select_index == 0}" @click="header.select_index = 0">
                        <img src="@/assets/home/analyze.png"/>
                        <span>基本信息</span>
                    </div>
                    <div class="device_info_type_item" :class="{ device_info_type_item_active: header.select_index == 1}" @click="header.select_index = 1">
                        <img src="@/assets/home/equipment.png"/>
                        <span>消毒计划</span>
                    </div>
                    <div class="device_info_type_item" :class="{ device_info_type_item_active: header.select_index == 2}" @click="header.select_index = 2">
                        <img src="@/assets/home/prescription.png"/> 
                        <span>使用登记</span>
                    </div>
                    <div class="device_info_type_item" :class="{ device_info_type_item_active: header.select_index == 3}" @click="header.select_index = 3">
                        <img src="@/assets/home/sick.png"/>
                        <span>质量控制</span>
                    </div>
                    <div class="device_info_type_item" :class="{ device_info_type_item_active: header.select_index == 4}" @click="header.select_index = 4">
                        <img src="@/assets/home/record.png"/>
                        <span>维修维护</span>
                    </div>
                </div>
            </el-header> -->
            <el-main>
                <div class="_main">
                    <p v-show="device_id == 0" class="no_data_p">请选择设备</p>

                    <device-info-pane ref="device_info_pane" v-show="header.select_index == 0 && device_id != 0" :device_numbers="device_numbers" @did_update_device="did_update_device"></device-info-pane>

                    <coming-soon v-show="device_id != 0 && header.select_index != 0"></coming-soon>

                    <!-- <sterilize-plan-pane v-show="header.select_index == 1 && device_id != 0"></sterilize-plan-pane> -->
                    
                    <!-- <use-registration-pane v-show="header.select_index == 2 && device_id != 0"></use-registration-pane> -->
                    <!-- <water-pane v-show="header.select_index == 2 && device_id != 0"></water-pane> -->

                    <!-- <maintain-record-pane v-show="header.select_index == 4 && device_id != 0"></maintain-record-pane> -->

                    <!-- <quality-control-pane v-show="header.select_index == 3 && device_id != 0"></quality-control-pane> -->
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>    
import DeviceInfoPane from './device_info/device_info_pane'
import SterilizePlanPane from './sterilize_plan/sterilize_plan_pane'
import MaintainRecordPane from './maintain/maintain_record_pane'
import UseRegistrationPane from './use_registration_pane'
import waterPane from './water_pane'
import QualityControlPane from './quality_control/quality_control_pane'
import ComingSoon from './coming_soon'


export default {
    name: 'DeviceDetail',
    components: {
        DeviceInfoPane,
        SterilizePlanPane,
        MaintainRecordPane,
        UseRegistrationPane,
        waterPane,
        QualityControlPane,
        ComingSoon
    },
    data() {
        return {
            device_id: 0,
            device_type: 1,
            header: {
                select_index: 0
            }
        }
    },
    props: {
        // device_id: {
        //     type: Number,
        //     default: 1,
        // },
        device_numbers: {
            type: Array,
            require: true,
        },
    },
    methods: {
        set_device: function(device_id, device_type) {
            this.device_id = device_id
            this.device_type = device_type
            this.$refs.device_info_pane.set_device_id(device_id)
        },
        did_update_device: function(device) {
            this.$emit("did_update_device", device)
        }
    },
    // watch: {
    //     'header.select_index': function(newVal, oldValue) {
    //         console.log('n: ', newVal)
    //         console.log('o: ', oldValue)
    //     }
    // }
}
</script>

<style scoped>
._header {
    background-color: rgb(236, 245, 255);
    border-style: solid;
    border-radius: 10px;
    border-color: rgb(150, 202, 253);
    border-width: 1px;
    height: 100%;
    width: 100%;
    padding: 0 30px 0 30px;
}
.device_info_type_item {
    display: block;
    float: left; 
    width: 110px;
    height: 100%;
    text-align: center;
}
.device_info_type_item_active {
    background-color: white;
}
.device_info_type_item img {
    margin-top: 12px;
    height: 50px;
    width: 50px;
}
.device_info_type_item span {
    display: block;
    margin-top: 5px;
    font-size: 14px;
    color: rgb(90, 90, 90);
    font-weight: bold;
}
.el-header {
    padding: 0 0 0 0;
}
.el-main {
    padding: 0px 0 20px 0;
}
._main {
    background-color: rgb(255, 255, 255);
    border-style: solid;
    border-radius: 6px;
    border-color: rgb(221, 221, 221);
    border-width: 1px;
    width: 100%;
    min-height: 300px;
}
.no_data_p {
    font-size: 17px;
    color: dimgrey;
    text-align: center;
    width: 100%;
    margin-top: 200px;
    margin-bottom: 200px;
}
</style>

