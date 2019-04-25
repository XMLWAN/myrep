<template>
    <div >
        <el-tooltip placement="right" :disabled="scheduleDetail.patient.length>0?false:true" >
            <div slot="content">
                {{scheduleDetail.patient}}
                <br/>
                <span v-if="scheduleDetail.mode_name.length>0">({{scheduleDetail.mode_name}})</span>
            </div>
            <div>
                <span>{{scheduleDetail.patient}}</span><br/>
                <span v-if="scheduleDetail.mode_name.length>0">({{scheduleDetail.mode_name}})</span>
            </div>
        </el-tooltip>
    </div>
</template>

<script>
export default {
  name: "scheduleItem",

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
