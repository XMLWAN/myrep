<template>
    <div>
        <el-dialog title="透析下机" :visible.sync="visible" width="50%">
            <div class="txsj">
                
            </div>
            <el-form :model="form" label-width="80px">
                <el-form-item label="下机护士">
                    <el-select v-model="form.nurse_id" :disabled="!(dialysis_order.id != 0 && dialysis_order.stage == 1)">
                        <el-option v-for="(admin, index) in admins" :key="index" :value="admin.id" :label="admin.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="(dialysis_order.id != 0 && dialysis_order.stage == 1)" @click="submit" :loading="loading" type="primary">执行下机</el-button>
                    <el-button v-else-if="(dialysis_order.id != 0 && dialysis_order.stage == 2)" :disabled="true" type="info">已下机</el-button>
                    <el-button v-else :disabled="true" type="info">未上机</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { finishDialysis } from "@/api/dialysis_record"
import { parseTime } from "@/utils"

export default {
    name: "FinishDialog",
    data() {
        return {
            visible: false,
            loading: false,
            
            patient_id: 0,
            schedule_date: 0,

            form: {
                nurse_id: 0,
            }
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
    },
    created() {
        this.patient_id = this.$route.query.patient_id
        this.schedule_date = this.$route.query.date

        if (this.dialysis_order.id == 0) {
            this.form.nurse_id = 0
        } else if (this.dialysis_order.stage == 1) {
            this.form.nurse_id = this.$store.getters.xt_user.user.id
        } else {
            this.form.nurse_id = this.dialysis_order.finish_nurse
        }
    },
    watch: {
        "dialysis_order.id": function() {
            if (this.dialysis_order.id == 0) {
                this.form.nurse_id = 0
            } else if (this.dialysis_order.stage == 1) {
                this.form.nurse_id = this.$store.getters.xt_user.user.id
            } else {
                this.form.nurse_id = this.dialysis_order.finish_nurse
            }
        },
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
            finishDialysis(this.patient_id, parseTime(this.schedule_date, "{y}-{m}-{d}"), this.form.nurse_id).then(rs => {
                this.loading = false
                var resp = rs.data
                if (resp.state == 1) {
                    var dialysis_order = resp.data.dialysis_order
                    var this_order = this.dialysis_order
                    for (const key in dialysis_order) {
                        // this.dialysis_order[key] = dialysis_order[key]
                        this.$set(this_order, key, dialysis_order[key])
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
