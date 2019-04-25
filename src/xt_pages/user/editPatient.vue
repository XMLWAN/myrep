
<template>
  <div class="patient-container">
  <patient-sidebar :id="patientID"></patient-sidebar>
  <patient-form :is-edit='true' :class='panelClass' v-on:tran-patient-info="patientInfo=$event"></patient-form>
  </div>
</template>

<script>
import PatientForm from './components/PatientForm'
import PatientSidebar from './components/PatientSidebar'

export default {
  name: 'editForm',
  components: { PatientForm,PatientSidebar },

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
          this.$notify.error({
          title: "错误",
          message: "无效的id"
          });
          this.$router.push('/patients/patients');
      }
  }

}
</script>
