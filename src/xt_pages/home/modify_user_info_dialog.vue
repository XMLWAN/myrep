<template>
    <div>
        <el-dialog title="修改个人信息" width="50%" top="10vh" :visible.sync="visible" :before-close="_close">
            <el-form ref="form" :model="form" label-position="left" :rules="rules" label-width="80px" 
                    v-loading="uploading">
                <el-form-item label="账号">
                    <span>{{ this.$store.getters.xt_user.user.mobile }}</span>
                </el-form-item>
                <el-form-item label="姓名" prop="user_name">
                    <el-input v-model="form.user_name" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload  
                    style="width:100%;"
                    :data="qn_upload_data"
                    :multiple="false"
                    action="https://upload.qiniup.com"
                    :show-file-list="false"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    list-type="picture-card">
                        <!-- <img :src="avatar" style="width: 100px; height: 100px;" />
                        <span style="display: block; font-size: 11px; color: gray">108*108像素，仅支持JPG/PNG/JPEG， 大小在300K以内</span> -->
                        <img v-if="form.avatar" :src="form.avatar" class="avatar">
                        <i v-else class="el-icon-plus"></i>
                    </el-upload>
                    <span style="display: block; font-size: 11px; color: gray">仅支持JPG/PNG/JPEG， 大小在300K以内</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitAction">确定</el-button>
                    <el-button type="primary" @click="modifyPwdAction">修改密码</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="修改密码" append-to-body :visible.sync="pwd_dialog_visible">
            <el-form ref="pwd_form" :model="pwd_form" label-width="80px">
                <el-form-item label="账号">
                    <span>{{ this.$store.getters.xt_user.user.mobile }}</span>
                </el-form-item>
                <el-form-item label="新密码" prop="new_password">
                    <el-input v-model="pwd_form.new_password" style="width: 260px;"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="pwd_form.code" style="width: 135px;"></el-input>
                    <el-button :type="count_downing ? 'info' : 'primary'" :disabled="count_downing" @click="getCodeAction" style="width: 122px; padding-left: 5px; padding-right: 5px;">{{ code_btn_title }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="modify_pwd_loading" type="primary" @click="submitModifyPwdAction">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getToken } from "@/api/qiniu";
import { getFileExtension } from "@/utils/tools";
import { modifyAdminInfo, getModifyPwdCode, modifyPassword } from "@/api/login/login"
import { hex_md5 } from "@/utils/md5"

export default {
    name: "ModifyUserInfoDialog",
    data() {
        return {
            visible: false,
            pwd_dialog_visible: false,
            form: {
                user_name: this.$store.getters.xt_user.user.user_name,
                avatar: this.$store.getters.xt_user.user.avatar,
            },
            qn_upload_data: { 
                token: "", 
                key: "",
            },
            qiniuDomain: "https://images.shengws.com/",
            uploading: false,
            rules: {
                user_name: [
                    { required: true, message: "请填写姓名", trigger: "blur" }
                ]
            },

            pwd_form: {
                new_password: "",
                code: "",
            },
            count_downing: false,
            count_down: 0,
            modify_pwd_loading: false,
        }
    },
    computed: {
        avatar: function() {
            return this.form.avatar.length == 0 ? "/src/assets/home/user.png" : this.form.avatar
        },
        code_btn_title: function() {
            if (this.count_down == 0) {
                return "获取验证码"
            } else {
                return this.count_down + "秒后重新获取"
            }
        }
    },
    methods: {
        _close: function(done) {
            this.clear()
            done()
        },
        clear: function() {
            this.form.user_name = this.$store.getters.xt_user.user.user_name
            this.form.avatar = this.$store.getters.xt_user.user.avatar
        },
        show() {
            this.clear()
            this.visible = true
        },
        hide() {
            this.clear()
            this.visible = false
        },
        submitAction() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.uploading = true
                    var params = {
                        name: this.form.user_name,
                        avatar: this.form.avatar,
                    }
                    modifyAdminInfo(params).then(rs => {
                        this.uploading = false
                        var resp = rs.data
                        if (resp.state === 1) {
                            this.$store.dispatch("ModifyAdminUserInfo", { user_name: this.form.user_name, avatar: this.form.avatar })
                            this.hide()

                        } else {
                            this.$message.error(resp.msg)
                        }
                    })
                    
                } else {
                    return false
                }
            })
        },
        handleAvatarError(err, file, fileList) {
            this.$message.error(err);
            this.uploading = false
            return false;
        },
        handleAvatarSuccess(res, file) {
            this.form.avatar = this.qiniuDomain + res.url;
            this.uploading = false
        },
        beforeAvatarUpload(file) {
            var fileType = file.type
            const isJPG = fileType.indexOf("image") > -1
            const isLt300K = file.size < 300 * 1024

            if (!isJPG) {
                this.$message.error("只能上传图片")
                return false
            }
            if (!isLt300K) {
                this.$message.error("上传头像图片大小不能超过 300KB!")
                return false
            }

            var date = new Date()
            var ext = getFileExtension(file.name)
            var key = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + "admin_avatar_" + file.uid + "." + ext
            this.uploading = true

            return new Promise((resolve, reject) => {
                getToken().then(response => {
                    const token = response.data.data.uptoken
                    this.qn_upload_data.token = token
                    this.qn_upload_data.key = key
                    resolve(true)
                })
            })
        },
        modifyPwdAction: function() {
            this.pwd_dialog_visible = true
        },
        getCodeAction: function() {
            this.count_downing = true
            this.count_down = 11
            this.countDown()
            getModifyPwdCode()
        },
        countDown: function() {
            this.count_down = this.count_down - 1
            if (this.count_down == 0) {
                this.count_downing = false
                return
            }
            var t = this
            setTimeout(() => {
                this.countDown()
            }, 1000);
        },
        submitModifyPwdAction: function() {
            if (this.pwd_form.new_password.length == 0) {
                this.$message.error("未填写新密码")
                return
            }
            if (this.pwd_form.code.length == 0) {
                this.$message.error("未填写验证码")
                return
            }
            this.modify_pwd_loading = true
            modifyPassword(hex_md5(this.pwd_form.new_password), this.pwd_form.code).then(rs => {
                this.modify_pwd_loading = false
                var resp = rs.data
                if (resp.state == 1) {
                    this.$message.success(resp.data.msg)
                } else {
                    this.$message.error(resp.msg)
                }
            })
        }
    }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 146px;
    height: 146px;
    display: block;
  }
</style>

