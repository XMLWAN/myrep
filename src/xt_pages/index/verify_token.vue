<template>
  <div>
    <h2 style="text-align:center;">加载中...</h2>
  </div>
</template>

<script>
export default {
  created() {
    // alert(this.$route.query.token)
    this.$store.dispatch('VerifyToken', this.$route.query.token).then(() => {
      this.$store.dispatch('xt_GenerateRoutes', this.$store.getters.current_role_urls).then(() => {
        this.$store.dispatch('VerifyConfigList').then(() => {
          // alert('token 验证成功')
          // console.log(this.$store.getters.xt_permission.addRouters)
          this.$router.addRoutes(this.$store.getters.xt_permission.addRouters) // 动态添加可访问路由表
  //        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          this.$router.replace({ path: '/' })
        })
      })
    }).catch((error) => {
      // alert('token 验证失败' + error)
      if (error.code == 6016 || error.code == 6017) {
        window.location.href = process.env.BASE_API + "/handle_error?code=" + error.code 
      } else if (error.code == 6008) { // 令牌无效
        window.location.href = process.env.BASE_API + '/login?relogin=true'
      } else {
        this.$message.error("token 验证失败: " + error.msg)
        // alert('token 验证失败' + error.msg)
        // window.location.href = process.env.BASE_API + '/login'
      }
    })
  }
}
</script>
