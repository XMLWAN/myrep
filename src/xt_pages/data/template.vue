<template>
  <div class="tab-container">
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key" style="display:flex;">
        <keep-alive>
          <div style="display:flex;width:100%;">
          <tab-pane v-if='activeName==item.key' :type='item.key' style="flex:1;"></tab-pane>
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/templateTable'
export default {
  name: 'tab',
  components: { tabPane },
  data() {
    return {
      tabMapOptions: [
        { label: this.$t("data_config.education"), key: 'education' },
        { label: this.$t("data_config.summary"), key: 'summary' },
        { label: this.$t("data_config.course_disease"), key: 'course_disease' },
        { label: this.$t("data_config.rescue_record"), key: 'rescue_record' }
      ],
      activeName: 'education',
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
