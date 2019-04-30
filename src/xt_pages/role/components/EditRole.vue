<template>
    <el-dialog title='新增角色' width="40%" :visible.sync="visible" :before-close="_close">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" placeholder="" maxlength="30" style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="intro">
                <el-input type="textarea" v-model="form.intro" placeholder="" resize="none" rows="4" style="width: 95%;"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="hide">取消</el-button>
                <el-button type="primary" @click="submitAction()">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {addRole, modifyRole} from '@/api/role/role'

export default {
    name: 'EditRole',
    data() {
        return {
            form: {
                id: 0,
                name: '',
                intro: ''
            },
            'visible': false,
            rules: {
                name: [
                    {required: true, message: '请输入角色名称', trigger: 'blur'},
                    {max: 10, message: '10个字以内', trigger: 'blur'}
                ],
                intro: [
                    {required: true, message: '请输入角色说明', trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        _close: function(done) {
            this.clear()
            done()
        },
        clear: function() {
            this.form.id = 0
            this.form.name = ''
            this.form.intro = ''
        },
        show() {
            this.clear()
            this.visible = true
        },
        hide() {
            this.clear()
            this.visible = false
        },
        modify(id, name, intro) {
            this.form.id = id
            this.form.name = name
            this.form.intro = intro
            this.visible = true
        },
        submitAction() {
            this.$refs.form.validate((valid) => {
                if (valid) { // 验证通过
                    if (this.form.id === 0) { // 新增 role
                        addRole(this.form.name, this.form.intro).then(rs => {
                            var resp = rs.data
                            if (resp.state === 1) {
                                var new_id = resp.data.id
                                var new_name = resp.data.name
                                var new_intro = resp.data.intro
                                var new_status = resp.data.status
                                this.$emit('did-add-role', new_id, new_name, new_intro, new_status)

                                this.hide()
                                
                            } else {
                                this.$message.error(resp.msg)
                            }
                            
                        }).catch(err => {
                            this.$message.error(err)
                        })
                        
                    } else { // 修改 role
                        modifyRole(this.form.id, this.form.name, this.form.intro).then(rs => {
                            var resp = rs.data
                            if (resp.state === 1) {
                                this.$emit('did-edit-role', this.form.id, this.form.name, this.form.intro)
                                this.hide()
                                
                            } else {
                                this.$message.error(resp.msg)
                            }
                            
                        }).catch(err => {
                            this.$message.error(err)
                        })
                    }
                    
                } else { // 验证失败
                    return false
                }
            })
        }
    }
}
</script>

