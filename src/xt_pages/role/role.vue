<template>
  <div class="app-container">
    <el-row style="margin-bottom: 10px;">
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-circle-plus" @click="addRoleAction">新增角色</el-button>
      </el-col>
    </el-row>

    <el-table :data="roles" v-loading="loading_roles">
      <el-table-column label="角色名称" prop="name" min-width="20%"></el-table-column>
      <el-table-column label="角色描述" prop="intro" min-width="25%"></el-table-column>
      <el-table-column label="状态" min-width="15%">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1" style="color: #67C23A; font-size:20px;">
            <li class="el-icon-success"></li>
          </div>
          <div v-else style="color: #F56C6C; font-size:20px;">
            <li class="el-icon-error"></li>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="40%">
        <template slot-scope="scope">
          <router-link :to='{ path:"/role/perview", query:{ id:scope.row.id }}'>
            <el-button type="warning" icon="el-icon-setting">权限设置</el-button>
          </router-link>
          <el-button type="primary" icon="el-icon-edit-outline" @click="modifyRoleAction(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" v-if="scope.row.status === 1" @click="disableRoleAction(scope.row)">移除</el-button>
          <el-button type="info" icon="el-icon-refresh" v-if="scope.row.status !== 1" @click="recoverRoleAction(scope.row)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row style="margin-top: 15px;" v-if="role_total_count > 10">
      <el-col :span="24">
        <el-pagination :total="role_total_count" :current-page.sync="current_page" @current-change="pageChange" :page-size="10" layout="total, prev, pager, next, jumper"></el-pagination>
      </el-col>
    </el-row>

    <edit-role ref="edit_role" @did-add-role="didAddRole" @did-edit-role="didModifyRole"></edit-role>
  </div>
</template>

<script>
import EditRole from './components/EditRole.vue'
import {getRoles, setRoleStatus} from '@/api/role/role'

export default {
  components: {
    EditRole
  },
  data: function() {
    return {
      loading_roles: true,
      roles: [],
      role_total_count: 0,
      current_page: 1
    }
  },
  created: function() {
    this.requestRoleWithPage(1)
  },
  methods: {
    requestRoleWithPage: function(page) {
      this.roles.splice(0, this.roles.length)
      this.loading_roles = true
      getRoles(page).then(rs => {
        this.loading_roles = false
        const resp = rs.data
        if (resp.state === 1) {
          this.roles.push(...resp.data.roles)
          this.role_total_count = resp.data.total_count
          
        } else {
          this.$message.error(resp.msg)
        }
      }).catch(err => {
        this.loading_roles = false
        this.$message.error(err)
      })
    },
    addRoleAction: function() {
      // 父组件调用子组件方法 https://segmentfault.com/a/1190000009525355
      this.$refs.edit_role.show()
    },
    modifyRoleAction: function(row) {
      this.$refs.edit_role.modify(row.id, row.name, row.intro)
    },
    disableRoleAction: function(row) {
      this.$msgbox({
        title: '提示',
        message: '是否确定要移除该角色',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '移除中...'

            setRoleStatus(row.id, false).then(rs => {
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
              this.$message.error(err)
              instance.confirmButtonLoading = false
            })

          } else {
            done()
          }
        }
      })
    },
    recoverRoleAction: function(row) {
      const loading = this.$loading({
        lock: true,
        text: '正在恢复角色...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      setRoleStatus(row.id, true).then(rs => {
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
    didAddRole: function(id, name, intro, status) {
      this.roles.push({id: id, name: name, intro: intro, status: status})
    },
    didModifyRole: function(id, name, intro) {
      this.roles.forEach(role => {
        if (role.id === id) {
          role.name = name
          role.intro = intro
          return false
        }
      });
    },
    pageChange: function(nextPage) {
      this.requestRoleWithPage(nextPage)
    }
  }
}
</script>

