<template>
  <div>
    <el-input v-model='msg' placeholder='输入'></el-input>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  data: function() {
    return {
      msg: ''
    }
  }
}
</script>
