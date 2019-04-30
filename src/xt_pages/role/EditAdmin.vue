<template>
    <div class="app-container">
        <edit-admin-info :admin_id="admin_id"></edit-admin-info>
    </div>
</template>

<script>
import EditAdminInfo from './components/EditAdminInfo.vue'

export default {
    name: 'EditAdmin',
    components: {
        EditAdminInfo
    },
    data() {
        return {
            admin_id: 0
        }
    },
    created() {
        var id = parseInt(this.$route.query.id)
        this.admin_id = id
    },
}
</script>
