<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
        <!-- <el-tab-pane label="推送" name="pushTime">
            <span slot="label"><i class="el-icon-share"></i> 推送 </span>
        </el-tab-pane> -->
        <el-tab-pane name="thisWeek">
            <span slot="label"><i class="el-icon-date"></i> 本周（{{theWeek.thisWeek}}）</span>
        </el-tab-pane>
        <el-tab-pane name="nextWeek">
            <span slot="label"><i class="el-icon-date"></i> 下周（{{theWeek.nextWeek}}）</span>            
        </el-tab-pane>
    </el-tabs>
    <table-push v-if="activeName=='pushTime'"></table-push>
    <table-weeks v-else :week-time="activeName"> </table-weeks>    
  </div>
</template>

<script>
import {getWeekPanels} from '@/api/schedule';
import tableWeeks from './components/tableWeeks'
import tablePush from './components/tablePush'
export default {
    name:'remind',
     data() {
      return {   
        activeName: 'thisWeek',
        theWeek:{thisWeek:0,nextWeek:0,}
      };
    },
    components:{
        tableWeeks,
        tablePush
    },
    methods: {
        
      getWeekPanels(){
        getWeekPanels(0).then(response=>{
          if (response.data.state==0) {
            return false
          }
          this.theWeek.thisWeek = response.data.data.theWeek;
          this.theWeek.nextWeek = this.theWeek.thisWeek+1;
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    created(){
        this.getWeekPanels();
    }
};
</script>

<style  rel="stylesheet/css" lang="scss" scoped>


</style>

