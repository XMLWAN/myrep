<template >
  <label class="radio-lebel-box">
    <span class="radio-inner">
        <span class="radio-fang " :class="{'is-checked-radio':isChecked}"></span>
        <input  type="radio" class="radio-no" :checked='isChecked' >
    </span>
    <span v-html="showValue"> </span>
  </label>
</template>

<script>
  export default {

    name: "labelBox",
    props: {
      isChecked:{
        type:Boolean,
        default:false,
      },
      showValue:{
        type:String,
        default:'',
      },
    },
    data() {
      return {
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
.radio-lebel-box {
    font-weight: 400;
    cursor: pointer;
}
.radio-inner {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
}
.radio-fang {
    display: inline-block;
    position: relative;
    border: 1px solid #000;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
.is-checked-radio::after {
    content: "√";
    font-size: 15px;
}
.radio-no {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
}
</style>
