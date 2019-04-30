<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <div class="project">
                    <div class="title">
                        <span>授予透析记录管理权限</span>
                    </div>
                    <div class="subtitle">
                        对护士录入的透析记录有修改权限
                    </div>
                    <div class="transfer">
                        <el-transfer :titles="['所有用户', '已授权用户']" :button-texts="['取消授权', '添加授权']" :data="users" v-model="selecting_users">
                            <span slot-scope="{ option }">{{ option.label }}</span>
                        </el-transfer>
                    </div>
                    <div class="submit">
                        <el-button type="primary" @click="submitAction">提交</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getSpecialPermissionInitData, submitDialysisRecordPermissionUsers } from '@/api/role/admin'

export default {
    name: "SpecialPermissionManage",
    data() {
        return {
            origin_users: [],

            users: [],
            selecting_users: [],
        }
    },
    mounted() {
        getSpecialPermissionInitData().then(rs => {
            var resp = rs.data
            if (resp.state == 1) {
                this.origin_users = resp.data.users
                var head_nurses = resp.data.head_nurses

                var user_options = []
                for (let index = 0; index < this.origin_users.length; index++) {
                    const user = this.origin_users[index];
                    user_options.push({
                        key: user.id,
                        label: user.name,
                        disabled: false,
                    })
                }
                this.users = user_options

                var head_nurse_ids = []
                for (let index = 0; index < head_nurses.length; index++) {
                    const head_nurse = head_nurses[index];
                    head_nurse_ids.push(head_nurse.admin_user_id)
                }
                this.selecting_users = head_nurse_ids
                
            } else {
                this.$message.error(resp.msg)
            }
        }).catch(err => {
            this.$message.error(err)
        })
    },
    methods: {
        submitAction: function() {
            // console.log(this.selecting_users)
            var ids_str = this.selecting_users.join(",")
            submitDialysisRecordPermissionUsers(ids_str).then(rs => {
                var resp = rs.data
                if (resp.state == 1) {
                    this.$message.success("授权成功")
                } else {
                    this.$message.error(resp.msg)
                }

            }).catch(err => {
                this.$message.error(err)
            })
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.project {
    padding: 0 10px;
    .title {
        font-size: 20px;
        line-height: 35px;
        color: slategrey;
    }
    .subtitle {
        font-size: 15px;
        line-height: 25px;
        color: lightslategray;
    }
    .transfer {
        padding: 10px 0;
    }
    .submit {
        padding: 10px 0;
    }
}
</style>

