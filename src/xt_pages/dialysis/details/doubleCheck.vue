<template>
   <div class="plate-box">
    <h2 class="DetailsTit"><span>{{ title }}</span></h2>
    <div class="plate">
      <ul>
        <li>
          <label>透析物品核查 : </label>
          <span class="content">{{ dialysis_item_check }}</span>
        </li>
        <li>
          <label>透析参数核查 : </label>
          <span class="content">{{ dialysis_parameter_check }}</span>
        </li>
        <li>
          <label>血管通路核查 : </label>
          <span class="content">{{ vascular_access_verification }}</span>
        </li>
        <li>
          <label>管道连接核查 : </label>
          <span class="content">{{ pipeline_connection_check }}</span>
        </li>

      </ul>
      <ul>


        <li>
          <label>{{ dialysis_item_desc_title }}</label>
          <span class="content">{{ dialysis_item_desc }}</span>
        </li>
        <li>
          <label>{{ dialysis_parameter_desc_title }}</label>
          <span class="content">{{ dialysis_parameter_desc }}</span>
        </li>
        <li>
          <label>{{ vascular_access_desc_title }}</label>
          <span class="content">{{ vascular_access_desc }}</span>
        </li>
        <li>
          <label>{{ pipeline_connection_desc_title }}</label>
          <span class="content">{{ pipeline_connection_desc }}</span>
        </li>
      </ul>
      <ul>
        <li>
          <label>第一次核对人员 : </label>
          <span class="content">{{getCreaterName(record.creater)}}</span>
        </li>
        <li>
          <label>第一次核对时间 : </label>
          <span class="content">{{getCreateTime(record.created_time,record.creater)}}</span>
        </li>
        <li>
          <label>第二次核对人员 : </label>
          <span class="content">{{ getModifierName(record.modifier) }}</span>
        </li>
        <li>
          <label>第二次核对时间 : </label>
          <span class="content">{{ getUpdateTime(record.updated_time,record.modifier) }}</span>
        </li>
      </ul>
    </div>
    <!-- <div class="note">处方医生 : {{doctor}}</div> -->
    <div class="middleLine"></div>
  </div>
</template>

<script>
  import {uParseTime} from "@/utils/tools";

  export default {
  name: "DoubleCheck",
  data() {
    return {
      title: "双人核对 ",
    };
  },
  props: {
    record: {
      type: Object,
    }, admin_map: {
      type: Object,
    },
  },
  computed: {
    dialysis_item_check: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.dialysis_item_check == 1 ? "正确" : "错误"
    },
    dialysis_parameter_check: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.dialysis_parameter_check == 1 ? "正确" : "错误"
    },
    vascular_access_verification: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.vascular_access_verification == 1 ? "正确" : "错误"
    },
    pipeline_connection_check: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.pipeline_connection_check == 1 ? "正确" : "错误"
    },
    dialysis_item_desc_title: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.dialysis_item_check == 1 ? "" : "错误描述 : "
    },
    dialysis_parameter_desc_title: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.dialysis_parameter_check == 1 ? "" : "错误描述 : "
    },
    vascular_access_desc_title: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.vascular_access_verification == 1 ? "" : "错误描述 : "
    },
    pipeline_connection_desc_title: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.pipeline_connection_check == 1 ? "" : "错误描述 : "
    },

    dialysis_item_desc: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.dialysis_item_check == 1 ? "" : this.record.dialysis_item_desc
    },
    dialysis_parameter_desc: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.dialysis_parameter_check == 1 ? "" : this.record.dialysis_parameter_desc
    },
    vascular_access_desc: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.vascular_access_verification == 1 ? "" : this.record.vascular_access_desc
    },
    pipeline_connection_desc: function() {
      if (this.record.id == 0) {
        return ""
      }
      return this.record.pipeline_connection_check == 1 ? "" : this.record.pipeline_connection_desc
    }
  },
  methods: {
    getCreaterName:function(val){


      if (this.record.id == 0) {
        return "-"
      }
      let id = String(val)


      return this.admin_map[id] == null ? "" : this.admin_map[id].name

    },getCreateTime:function(time,creator){
      if (this.record.id == 0) {
        return ""
      }
      if(creator == 0){
        return ""

      }else{
        return uParseTime(time, "{y}-{m}-{d}  {h}:{i}")

      }


    },getModifierName:function(val){
      console.log(this.admin_map)
      if (this.record.id == 0) {
        return "-"
      }
      let id = String(val)

      return this.admin_map[id] == null ? "" : this.admin_map[id].name


    },getUpdateTime:function(time,modifier){
      if (this.record.id == 0) {
        return ""
      }
      if(modifier == 0){
        return ''
      }else{
        return uParseTime(time, "{y}-{m}-{d}  {h}:{i}")
      }

    }

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>



