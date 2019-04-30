<template>
  <el-menu class="navbar" mode="horizontal">
    <div>
       <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
       <breadcrumb class="breadcrumb-container"></breadcrumb>
    </div>
    
    <div class="system-nav">
       <div class="system-nav-menu">
          <a  href="http://jk.kuyicloud.com/">
          <!-- <a  href="http://test1.sgjyun.com/"> -->
             <span style="vertical-align: 14px; font-size: 14px; color: gray;"><i class="iconfont icon-pengyou"></i> SCRM</span>
          </a>
       </div>
       <div class="system-nav-menu">
        <a href="http://mall.kuyicloud.com/">
        <!-- <a href="http://mall.test.sgjyun.com/"> -->
          <span style="vertical-align: 14px; font-size: 14px; color: gray;"><i class="icon iconfont icon-service_fill"></i> 微商城</span>
        </a>
      </div>
      <div class="system-nav-menu active">
        <a>
          <span style="vertical-align: 14px; font-size: 14px; color: #58a2ec;"><i class="icon iconfont icon-jiankangshuidi"></i> 血透管理</span>
        </a>
      </div>
      <div class="system-nav-menu">
        <a href="http://cdm.kuyicloud.com/">
          <span style="vertical-align: 14px; font-size: 14px; color: gray;"><i class="icon iconfont icon-manbing-xuanzhong"></i> 慢病管理</span>
        </a>
      </div>
      
      <div class="system-nav-menu">
        <a href="http://sso.kuyicloud.com/org/app/create">
        <!-- <a href="http://testsso.sgjyun.com/org/app/create"> -->
          <span style="vertical-align: 14px; font-size: 14px; color: gray;"><i class="icon iconfont icon-suoyou"></i> 应用</span>
        </a>
      </div>
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avater">
          <span style="margin:0 8px;font-size: 14px;">{{ this.$store.getters.xt_user.user.user_name }}</span>
          <i class="el-icon-caret-bottom"></i>  
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="modifyUserInfoAction">修改个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="myServe">我的服务</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- <screenfull class="screenfull right-menu-item"></screenfull> -->
      <modify-user-info-dialog ref="modify_user_info_dialog"></modify-user-info-dialog>
      
    </div>

  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import ModifyUserInfoDialog from '@/xt_pages/home/modify_user_info_dialog'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    ModifyUserInfoDialog
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    avater: function() {
      var avatar = this.$store.getters.xt_user.user.avatar
      return avatar.length > 0 ? avatar : require('../../../assets/home/userData.png')
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('FrontendLogout')
      window.location.href = process.env.BASE_API + '/logout'
    },
    modifyUserInfoAction() {
      this.$refs.modify_user_info_dialog.show()
    },
    myServe() {
      this.$router.push('/service');
      return false;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  // height: 50px;
  // line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
      .iconfont{
        font-size:18px;
      }
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      // height: 50px;
      margin-right: 10px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 3px;
        // position: relative;
        display: flex;
        align-items:center;
        justify-content: center;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius:50%;
          object-fit: cover;
          object-position: center;
        }
        .el-icon-caret-bottom {
          // position: absolute;
          // right: -20px;
          // top: 25px;
          font-size: 12px;
          // margin: 0 0 0 10px;
          color:gray;
        }
      }
    }
  }
}
.system-nav{
   margin-top: 12px;
  .system-nav-menu{
    float: left;
    margin:0 15px; 
  }
}
.el-menu::after, 
.el-menu::before{
  width: 1px;
  height: 1px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
