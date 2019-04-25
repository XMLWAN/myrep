<template>
  <div class="app-container">
    <el-row style="margin-bottom: 10px;">
      <el-col :span="24">
        <router-link to="/role/admin/create">
          <el-button type="primary" icon="el-icon-circle-plus">新增用户</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-table ref="table" :data="admins" v-loading="is_loading_admins">
      <el-table-column label="用户名" prop="user_name" width="160px"></el-table-column>
      <el-table-column label="最后登录IP" prop="ip" width="100px"></el-table-column>
      <el-table-column label="最后登录时间" prop="last_login_time" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.last_login_time == 0 ? '' : (_parseTime(scope.row.last_login_time, '{y}-{m}-{d} {h}:{i}'))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" prop="role_name" width="160px"></el-table-column>
      <el-table-column label="职称" prop="title_name" width="160px"></el-table-column>
      <el-table-column label="状态" width="100px">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1" style="color: #67C23A; font-size:20px;">
            <li class="el-icon-success"></li>
          </div>
          <div v-else style="color: #F56C6C; font-size:20px;">
            <li class="el-icon-error"></li>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210px">
        <template slot-scope="scope">
          <router-link :to="{ path:'/role/admin/edit', query:{ id:scope.row.user_id }}">
            <el-button type="primary" icon="el-icon-edit-outline">编辑</el-button>
          </router-link>
          <el-button type="danger" icon="el-icon-delete" v-if="scope.row.status == 1" @click="disableAdminAction(scope.row)">移除</el-button>
          <el-button size="medium" type="info" icon="el-icon-refresh" v-if="scope.row.status == 0" @click="recoverAdminAction(scope.row)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row style="margin-top: 15px;" v-if="admin_total_count > 10">
      <el-col :span="24">
        <el-pagination :total="admin_total_count" :current-page.sync="current_page" @current-change="pageChange" :page-size="10" layout="total, prev, pager, next, jumper"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {adminMainView, getAdmins, setAdminStatus} from '@/api/role/admin'
import { parseTime } from '@/utils'

export default {
  name: 'adminManage',
  data() {
    return {
      is_loading_admins: true,
      admins: [], // [{user_id, user_name, role_name, title_name, ip, last_login_time, status}]
      admin_total_count: 0,
      current_page: 1,
      is_exist_role: false
    }
  },
  created: function() {
    adminMainView().then(rs => {
      this.is_loading_admins = false
      var resp = rs.data
      if (resp.state === 1) {
        this.admins.push(...resp.data.admins)
        this.admin_total_count = resp.data.total_count
        this.is_exist_role = resp.data.is_exist_role
        this.current_page = 1
        
      } else {
        this.$message.error(resp.msg)
      }

    }).catch(err => {
      this.is_loading_admins = false
      this.$message.error(err)
    })
  },
  computed: {
    should_update_admins() {
      return this.$store.getters.xt_role_temps.did_admins_changed
    }
  },
  methods: {
    _parseTime(time, format) {
      return parseTime(time, format)
    },
    requestAdminsWithPage: function(page) {
      this.admins.splice(0, this.admins.length)
      this.is_loading_admins = true
      getAdmins(page).then(rs => {
        this.is_loading_admins = false
        const resp = rs.data
        console.log(resp)
        if (resp.state === 1) {
          this.admins.push(...resp.data.admins)
          this.admin_total_count = resp.data.total_count
          
        } else {
          this.$message.error(resp.msg)
        }
      }).catch(err => {
        this.is_loading_admins = false
        this.$message.error(err)
      })
    },
    addAdminAction: function() {
      this.$router.push({path:'/role/admin/create'})
    },
    disableAdminAction: function(row) {
      this.$msgbox({
        title: '提示',
        message: '是否确定要移除该管理员',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '删除中...'

            setAdminStatus(row.user_id, false).then(rs => {
              done()
              instance.confirmButtonLoading = false

              const resp = rs.data
              if (resp.state === 1) {
                row.status = 0
                
              } else {
                this.$message.error(resp.msg)
              }

            }).catch(err => {
              done()
              instance.confirmButtonLoading = false
              this.$message.error(err)
            })

          } else {
            done()
          }
        }
      })
    },
    recoverAdminAction: function(row) {
      const loading = this.$loading({
        lock: true,
        text: '正在恢复管理员...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      setAdminStatus(row.user_id, true).then(rs => {
        loading.close()

        const resp = rs.data
        if (resp.state === 1) {
          row.status = 1
          
        } else {
          this.$message.error(resp.msg)
        }
      }).catch(err => {
        loading.close()
        this.$message.error(err)
      })
    },
    pageChange: function(nextPage) {
      this.requestAdminsWithPage(nextPage)
    }
  },
  watch: {
    should_update_admins(should_change) {
      if (should_change) {
        this.requestAdminsWithPage(this.current_page)
      }
    }
  }
}
</script>
