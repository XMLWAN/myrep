<template>
  <div class="tab-container">
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key" style="display:flex;">
        <keep-alive>
          <div style="display:flex;width:100%;">
          <tab-pane v-if='activeName==item.key' :type='item.key' style="flex:1;"></tab-pane>
          <tableson v-if='activeName==item.key' :type='item.key' style="flex:1;"></tableson>
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/table'
import tableson from './components/tableson'

export default {
  name: 'tab',
  components: { tabPane,tableson },
  data() {
    return {
      tabMapOptions: [
        { label: this.$t("data_config.patient"), key: 'patient' },
        { label: this.$t("data_config.hemodialysis"), key: 'hemodialysis' },
        // { label: this.$t("data_config.scheduling"), key: 'scheduling' },
        // { label: this.$t("data_config.device"), key: 'device' },
        // { label: this.$t("data_config.system"), key: 'system' }
      ],
      activeName: 'patient',
      createdTimes: 0
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
</style>
