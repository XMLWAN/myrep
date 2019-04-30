<template>
    <div class="app-container">
        <edit-admin-info :admin_id="0"></edit-admin-info>
    </div>
</template>

<script>
import EditAdminInfo from './components/EditAdminInfo.vue'

export default {
    name: 'CreateAdmin',
    components: {
        EditAdminInfo
    }
}
</script>
