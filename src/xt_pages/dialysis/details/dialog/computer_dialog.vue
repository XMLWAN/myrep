<template>
    <div>
        <el-dialog title="透析上机" :visible.sync="visible" width="50%">
            <el-form :model="form" label-width="80px">
                <el-form-item label="上机床位">
                    <el-select v-model="form.bed_id" placeholder="" :disabled="dialysis_order.id != 0">
                        <el-option v-for="(bed, index) in zone_beds" :key="index" :value="bed.id" :label="bed.number"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上机护士">
                    <el-select v-model="form.nurse_id" placeholder="" :disabled="dialysis_order.id != 0">
                        <el-option v-for="(admin, index) in admins" :key="index" :value="admin.id" :label="admin.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="dialysis_order.id == 0" @click="submit" type="primary" :loading="loading">执行上机</el-button>
                    <el-button v-else type="info" :disabled="true">已上机</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { startDialysis } from "@/api/dialysis_record"
import { parseTime } from "@/utils"

export default {
    name: "ComputerDialog",
    data() {
        return {
            visible: false,
            loading: false,

            patient_id: 0,
            schedule_date: 0,

            form: {
                bed_id: '',
                nurse_id: '',
            },
        }
    },
    props: {
        dialysis_order: {
            type: Object,
        },
        schedule: {
            type: Object,
        },
        admins: {
            type: Array,
        },
        device_numbers: {
            type: Array,
        },
    },
    created() {
        this.patient_id = this.$route.query.patient_id
        this.schedule_date = this.$route.query.date

        this.form.bed_id = this.dialysis_order.id == 0 ? this.schedule.bed_id : this.dialysis_order.bed_id
        this.form.nurse_id = this.dialysis_order.id == 0 ? this.$store.getters.xt_user.user.id : this.dialysis_order.start_nurse
    },
    watch: {
        "schedule.id": function() {
            this.form.bed_id = this.dialysis_order.id == 0 ? this.schedule.bed_id : this.dialysis_order.bed_id
        },
        "dialysis_order.id": function() {
            this.form.bed_id = this.dialysis_order.id == 0 ? this.schedule.bed_id : this.dialysis_order.bed_id
            this.form.nurse_id = this.dialysis_order.id == 0 ? this.$store.getters.xt_user.user.id : this.dialysis_order.start_nurse
        },
    },
    computed: {
        zone_beds: function() {
            var beds = []
            for (let index = 0; index < this.device_numbers.length; index++) {
                const device_number = this.device_numbers[index];
                if (device_number.zone_id == this.schedule.partition_id) {
                    beds.push(device_number)
                }
            }
            return beds
        }
    },
    methods: {
        show: function() {
            this.visible = true
        },
        hide: function() {
            this.visible = false
        },
        submit: function() {
            this.loading = true
            startDialysis(this.patient_id, parseTime(this.schedule_date, "{y}-{m}-{d}"), this.form.nurse_id, this.form.bed_id).then(rs => {
                this.loading = false
                var resp = rs.data
                if (resp.state == 1) {
                    var resp_dialysis_order = resp.data.dialysis_order
                    var this_order = this.dialysis_order
                    for (const key in resp_dialysis_order) {
                        this.$set(this_order, key, resp_dialysis_order[key])
                    }

                } else {
                    this.$message.error(resp.msg)
                }
            })
        },
    },
}
</script>

<style scoped>
.txsj{
    text-align: center;
    margin-bottom: 20px;
}
</style>
