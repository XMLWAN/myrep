<template>
  <patient-form :is-edit='false'></patient-form>
</template>

<script>
import PatientForm from './components/PatientForm'

export default {
  name: 'createForm',
  components: { PatientForm }
}
</script>

