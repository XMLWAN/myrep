<template>
    <div class="app-container" v-loading="loading">
        <el-row>
            <el-col :span="24">
                <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="addGroupAction">新增分组</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="20">
                <el-table :data="groups" border>
                    <el-table-column prop="name" label="分组名称" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" icon="el-icon-edit" size="mini" @click="modifyGroupAt(scope.row)">编辑</el-button>
                            <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="danger" icon="el-icon-delete" size="mini" @click="deleteGroupAt(scope.row)">删除</el-button>
                        </template>  
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog width="400px" :title="group_form.id == 0 ? '新增分组' : '修改分组'" :visible.sync="showEditGroup">
            <el-form :model="group_form" ref="form_group" :label-width="formLabelWidth">
                <el-form-item label="分组名称 : " prop="name" :rules="[{required: true, message: '请输入分组名', trigger: 'blur'}]">
                    <el-input v-model="group_form.name" style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancelModifyGroup">取 消</el-button>
                    <el-button :disabled="$store.getters.xt_user.subscibe.state==3?true:false" type="primary" @click="editGroupSubmitAction">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {getGroups, createGroup, modifyGroup, disableGroup} from '@/api/device/device'

export default {
    name: "DeviceGroupMain",
    data() {
        return {
            loading: false,
            groups: [],
            group_form:{
                id: 0,
                name: '',
            },
            showEditGroup: false,
            formLabelWidth: '90px',
        }
    },
    created() {
        this.loading = true
        getGroups().then(rs => {
            this.loading = false
            var resp = rs.data
            if (resp.state === 1) {
                this.groups.push(...resp.data.groups)
            } else {
                this.$message.error(resp.msg)
            }
        })
    },
    methods: {
        addGroupAction() {
            this.showEditGroup = true
        },
        modifyGroupAt(row) {
            this.group_form.id = row.id
            this.group_form.name = row.name
            this.showEditGroup = true
        },
        cancelModifyGroup() {
            this.group_form.id = 0
            this.group_form.name = ''
            this.$refs.form_group.clearValidate()
            this.showEditGroup = false
        },
        editGroupSubmitAction() {
            this.$refs.form_group.validate(valid => {
                if (valid) {
                    if (this.group_form.id === 0) {
                        createGroup(this.group_form.name).then(rs => {
                            var resp = rs.data
                            if (resp.state === 1) {
                                var newGroup = resp.data.group
                                this.groups.push(newGroup)
                                this.cancelModifyGroup()

                            } else {
                                this.$message.error(resp.msg)
                            }
                        })
                        
                    } else {
                        modifyGroup(this.group_form.id, this.group_form.name).then(rs => {
                            var resp = rs.data
                            if (resp.state === 1) {
                                for (let index = 0; index < this.groups.length; index++) {
                                    const group = this.groups[index];
                                    if (group.id == this.group_form.id) {
                                        group.name = this.group_form.name
                                        break
                                    }
                                }
                                this.cancelModifyGroup()

                            } else {
                                this.$message.error(resp.msg)
                            }
                        })
                    }
                    
                } else {
                    return false
                }
            })
        },
        deleteGroupAt: function(row) {
            this.$confirm("删除后将无法恢复，确定继续删除吗", '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'})
            .then(() => {
                this.loading = true
                disableGroup(row.id).then(rs => {
                    this.loading = false
                    var resp = rs.data
                    if (resp.state == 1) {
                        var index = this.groups.indexOf(row)
                        if (index > -1) {
                            this.groups.splice(index, 1)
                        }
                        
                    } else {
                        this.$message.error(resp.msg)
                    }
                })
            })
        }
    }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}
</style>
