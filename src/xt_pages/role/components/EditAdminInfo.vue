<template>
    <div class="app-container">
        <el-col :span="19" v-loading="loading">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
                <el-form-item label="账号" prop="mobile">
                    <el-input v-model="form.mobile" placeholder="用户手机号" :disabled="form.id !==  0"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="用户姓名"></el-input>
                </el-form-item>

                <el-form-item label="职称">
                    <el-select v-model="form.user_type" placeholder="用户类型">
                        <el-option v-for="item in user_types" :label="item.name" :value="item.index" :key="item.index"></el-option>
                    </el-select>

                    <el-select v-model="form.user_title" placeholder="用户职称">
                        <el-option v-for="item in user_titles" :label="item.name" :value="item.index" :key="item.index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="角色">
                    <el-select v-model="form.role" placeholder="角色">
                        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="介绍">
                    <Tinymce :height=400 menubar='' ref="editor" v-model="form.intro" :show_upload_img="false" />
                </el-form-item>

                <el-form-item>
                    <router-link to="/role/admin/manage">
                        <el-button>取消</el-button>
                    </router-link>
                    <el-button type="primary" @click="submitAction">确定</el-button>
                </el-form-item>

            </el-form>
        </el-col>
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import {getAddAdminInitData, addAdmin, getModifyAdminInitData, modifyAdmin} from '@/api/role/admin'
// import store from '@/store'

export default {
    name: 'EditAdminInfo',
    components: {
        Tinymce
    },
    data() {
        var checkMobile = (rule, value, callback) => {
            if (!value || value.length == 0) {
                return callback(new Error('手机号不能为空'))
            }
            if (/^1\d{10}$/.test(value) == false) {
                return callback(new Error('手机号格式错误'))
            } else {
                callback()
            }
        }
        var checkName = (rule, value, callback) => {
            if (!value || value.length == 0) {
                return callback(new Error('姓名不能为空'))
            } else {
                callback()
            }
        }
        return {
            user_types: [
                { index: 2, name: '医生' },
                { index: 3, name: '护士' },
            ],
            user_titles: [
                { index: 1, name: '医士' },
                { index: 2, name: '医师' },
                { index: 3, name: '住院医师' },
                { index: 4, name: '主治医师' },
                { index: 5, name: '副主任医师' },
                { index: 6, name: '主任医师' },
                { index: 7, name: '护士' },
                { index: 8, name: '护师' },
                { index: 9, name: '主管护师' },
                { index: 10, name: '副主任护师' },
                { index: 11, name: '主任护师' },
                { index: 12, name: '运营专员' },
                { index: 13, name: '运营主管' },
            ],
            roles: [], // [{id, name, intro, status}]
            loading: true,
            qntoken: '',

            form: {
                id: 0,
                mobile: '',
                name: '',
                user_type: '',
                user_title: '',
                role: '', // 其实应该是 int 类型
                intro: '',
            },
            rules: {
                mobile: [
                    {validator: checkMobile, trigger: 'blur'}
                ],
                name: [
                    {validator: checkName, trigger: 'blur'}
                ]
            }
        }
    },
    props: {
        admin_id: {
            type: Number,
            require: true
        }
    },
    created() {
        if (this.admin_id < 0) {
            this.$message.error("参数错误")
            this.loading = false
            return
        }

        this.form.id = this.admin_id
        if (this.admin_id === 0) {
            this.form.user_type = this.user_types[0].index
            this.form.user_title = this.user_titles[0].index
            getAddAdminInitData().then(rs => {
                this.loading = false
                var resp = rs.data
                if (resp.state === 1) {
                    this.roles.push(...resp.data.roles)
                    this.qntoken = resp.data.qntoken
                    if (this.roles.length > 0) {
                        this.form.role = this.roles[0].id
                    }

                } else {
                    this.$message.error(resp.msg)
                }

            }).catch(err => {
                this.loading = false
                this.$message.error(err)
            })
            
        } else {
            getModifyAdminInitData(this.form.id).then(rs => {
                this.loading = false
                var resp = rs.data
                if (resp.state === 1) {
                    this.roles.push(...resp.data.roles)
                    this.qntoken = resp.data.qntoken
                    
                    var admin = resp.data.admin
                    this.form.name = admin.user_name
                    this.form.mobile = admin.mobile
                    this.form.user_type = admin.user_type
                    this.form.user_title = admin.user_title
                    this.form.role = admin.role_id
                    this.form.intro = admin.intro
                    
                } else {
                    this.$message.error(resp.msg)
                }

            }).catch(err => {
                this.loading = false
                this.$message.error(err)
            })
        }
    },
    methods: {
        submitAction: function() {
            if (this.admin_id < 0) {
                return
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.loading = true
                    if (this.form.id === 0) {
                        addAdmin(this.form.mobile, this.form.name, this.form.user_type, this.form.user_title, this.form.role, this.form.intro).then(rs => {
                            this.loading = false
                            var resp = rs.data
                            if (resp.state === 1) {
                                this.$store.dispatch('DidChangeAdmins')
                                var _this = this
                                setTimeout(() => {
                                    _this.$store.dispatch('RecoverAdminsChangeState')
                                }, 500)
                                _this.$router.back(-1)
                                
                            } else {
                                this.$message.error(resp.msg)
                            }

                        }).catch(err => {
                            this.loading = false
                            this.$message.error(err)
                        })
                        
                    } else {
                        modifyAdmin(this.form.id, this.form.name, this.form.user_type, this.form.user_title, this.form.role, this.form.intro).then(rs => {
                            this.loading = false
                            var resp = rs.data
                            if (resp.state === 1) {
                                this.$store.dispatch('DidChangeAdmins')
                                var _this = this
                                setTimeout(() => {
                                    _this.$store.dispatch('RecoverAdminsChangeState')
                                }, 500)
                                _this.$router.back(-1)
                                
                            } else {
                                this.$message.error(resp.msg)
                            }

                        }).catch(err => {
                            this.loading = false
                            this.$message.error(err)
                        })
                    }
                    
                } else {
                    return false
                }
            })
        }
    }
}
</script>
