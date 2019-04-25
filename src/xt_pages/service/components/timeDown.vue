<template>
  <p>{{time}}</p>
</template>
<script>
  export default {
    data() {
      return {
        time: '',
        flag: false
      }
    },
    mounted() {
      let time = setInterval(() => {
        if (this.flag == true) {
          clearInterval(time)
        }
        this.timeDown()
      }, 500)
    },
    props: {
      endTime: {type: Number},
      nowTime: {type: Number}

    },
    methods: {
      timeDown() {
        const endTime = new Date(this.endTime)
        const nowTime = new Date(this.nowTime)
        let leftTime = parseInt((endTime.getTime() - nowTime.getTime()))
        let d = parseInt(leftTime / (24 * 60 * 60))
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
        let m = this.formate(parseInt(leftTime / 60 % 60))
        let s = this.formate(parseInt(leftTime % 60))
        if (leftTime <= 0) {
          this.flag = true
          this.$emit('time-end')
        }
        this.time =  d+'天'+h+'小时'+m+'分'+s+'秒'
      }, formate(time) {
        if (time >= 10) {
          return time
        } else {
          return `0${time}`
        }
      }
    }
  }</script>

