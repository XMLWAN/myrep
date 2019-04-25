<template>
  <div class="plan" >{{title}}</div>
</template>

<script>

export default {
    name:'tableTitle',
    props:['title']
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.plan{
    font-size:15px;
    color: #6caef7;
    background: #ecf5ff;
    height: 42px;
    line-height:42px;
    border: 1px #ebeef5 solid;
    width: 100%;
    padding-left:15px;
}
 
</style>

