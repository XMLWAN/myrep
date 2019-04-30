<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="sideColumn">
      <div class="head " :class="isCollapse ? 'headShrink' : ''">
        <div class="tx">
          <img :src="$store.getters.xt_user.org.org_logo.length > 0 ? $store.getters.xt_user.org.org_logo : ''"  class="img">
          <!-- <img src="@/assets/record/1.png"  class="img"> -->
        </div>
        <h2 class="title">{{ $store.getters.xt_user.org.org_short_name }}</h2>
        <!-- <h2 class="title">12121212</h2> -->
      </div>
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.sideColumn{
  background-color: rgb(48, 65, 86);
.head {
  text-align: center;
  padding: 20px 0 0 0;
  .tx {
    .img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
    }
  } 
  .title {
    font-size: 14px;
    color: #bfcbd9;
    padding: 10px 10px 15px 10px;
    line-height: 22px;

  }
}
.headShrink{
  .tx{
    .img{
      width: 30px;
      height: 30px;
    }

  }
  .title{
    display: none;
  }
}
}

</style>

