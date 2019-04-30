<template>
    <div >
        <span>{{scheduleDetail.patient}}</span>
        <span v-if="scheduleDetail.mode_name.length>0">({{scheduleDetail.mode_name}})</span>
    </div>
</template>

<script>
export default {
  name: "weekItem",

  props:{
      scheduleDetail:{
          type:Object,
          default: function (){
              return {
                mode_id:0,
                mode_name:'',
                patient_id:0,
                patient:"",
              }
          },
      },
  },
};
</script>