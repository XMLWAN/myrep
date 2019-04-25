
<template>
  <div class="patient-container">
  <patient-sidebar :id="patientID"></patient-sidebar>
  <patient-detail :is-edit='true' :class='panelClass' v-on:tran-patient-info="patientInfo=$event"></patient-detail>
  </div>
</template>

<script>
import PatientDetail from './components/PatientDetail'
import PatientSidebar from './components/PatientSidebar'

export default {
  name: 'editForm',
  components: { PatientDetail,PatientSidebar },

  data(){
    return{
      patientID:0,
      panelClass:"patient-app-container",
      patientInfo:{
        id:0
      },
    }
  },
  created(){
    const id = this.$route.params && this.$route.params.id;
      this.patientID = parseInt(id);
      if (isNaN(this.patientID) || this.patientID <= 0) {
          console.log("patient info not had id");
          this.$notify.error({
          title: "错误",
          message: "无效的id"
          });
          this.$router.push('/patients/patients');
      }
  }

}
</script>

