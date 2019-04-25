<template>
 <!-- top="5vh" -->
    <el-dialog title="设置模板" width="50%" :visible.sync="visible" :before-close="_close">
        <el-form :model="form" label-width="100px">
            <el-form-item label="模板启用数量">
                <el-select v-model="form.mode" placeholder="">
                    <el-option label="不启用模板" :value="0"></el-option>
                    <el-option label="启用一个模板" :value="1"></el-option>
                    <el-option label="启用两个模板" :value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div style="text-align: right; padding-right: 25px; padding-top: 10px; padding-bottom: 10px;">
            <el-button @click="hide">取消</el-button>
            <el-button :disabled="$store.getters.xt_user.subscibe.state == 3 ? true : false" type="primary" @click="saveAction">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { setTemplateMode } from "@/api/schedule_template/patient"

export default {
    name: "SetUpTemplateDialog",
    data() {
        return {
            visible: false,
            form: {
                mode: 0,
            },
        }
    },
    props: {
        template_mode: {
            type: Object,
        },
        origin_mode: {
            type: Number,
        }
    },
    watch: {
        "template_mode.mode": function() {
            this.form.mode = this.template_mode.mode
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
        saveAction: function() {
            var msg = ""
            if (this.origin_mode == 0) { // 0 -> 1 或 0 -> 2 直接清除下两周的排班
                msg = "开启模板将清除下两周已设置的排班！是否继续开启？"
            } else if (this.form.mode == 0) { // 1 -> 0 或 2 -> 0 则不处理排班，但清除所有模板item

            } else if (this.origin_mode == 1 && this.form.mode == 2) { // 1 -> 2 清除第二周排班
                msg = "开启双周模板将清除下第二周已设置的排班！是否继续开启？"
            } else if (this.origin_mode == 2 && this.form.mode == 1) { // 2 -> 1 清除第二周模板item，清除第二周排班，将第一周的排班重复到第二周
                msg = "双周模板调整为单周模板时，下第二周排班将被清除，并用单周模板生成下第二周的排班！是否继续调整？"
            }
            if (msg.length == 0) {
                this.submit()
            } else {
                this.$confirm(msg, '提示', {confirmButtonText: '是', cancelButtonText: '否', type: 'warning'})
                .then(() => {
                    this.submit()
                })
            }
        },
        submit: function() {
            setTemplateMode(this.form.mode).then(rs => {
                var resp = rs.data
                if (resp.state == 1) {
                    this.template_mode.mode = this.form.mode
                    this.hide()
                    this.$emit("chenge_mode", this.form.mode)
                    
                } else {
                    this.$message.error(resp.msg)
                }
            })
        }
    }
}
</script>

<style scoped>

</style>

