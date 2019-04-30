<template>
   <div class="plate-box">
    <h2 class="DetailsTit"><span>{{title}}</span></h2>
    <div class="plate " >   
        <ul>
             <li v-for="(item,index) in info1" :key="index" :value="item.value" >
                <label>{{item.label}}</label>
                <span class="content">{{item.content}}</span>
                <span class="unit">{{item.unit}}</span>
            </li>
        </ul>
        <ul>
             <li v-for="(item,index) in info2" :key="index" :value="item.value" >
                <label>{{item.label}}</label>
                <span class="content">{{item.content}}</span>
                <span class="unit">{{item.unit}}</span>
                
            </li>
        </ul>
        <ul>
             <li v-for="(item,index) in info3" :key="index" :value="item.value" >
                <label>{{item.label}}</label>
                <span class="content">{{item.content}}</span>
                <span class="unit">{{item.unit}}</span>
            </li>
        </ul>
    </div>
    <div class="middleLine"></div>
  </div>    
</template>

<script>
export default {
  name: "DialysisPrescription",
  data() {
    return {
      title: "操作人员",
      info1: [
        { value: "1", label: "签到时间 : ", content: "2018-05-12 09:32:22", unit: "" },
        { value: "2", label: "上机护士 : ", content: "刘大燕", unit: "" },
        { value: "3", label: "核对护士: ", content: "刘大燕", unit: "" },
        { value: "4", label: "下机护士 : ", content: "刘大燕", unit: "" },
        { value: "4", label: "上机换药护士 : ", content: "周明君", unit: "" },
        { value: "4", label: "上机换药护士 : ", content: "周明君", unit: "" },
        { value: "4", label: "责任护士 : ", content: "周明君", unit: "" },
        { value: "4", label: "责任医生 : ", content: "周明君", unit: "" },
      ],
      info2: [
        { value: "1", label: "上机时间 : ", content: "2018-05-12 09:32:22", unit: "" },
        { value: "2", label: "核对时间 : ", content: "2018-05-12 09:32:22", unit: "" },
        { value: "3", label: "下机时间 : ", content: "2018-05-12 09:32:22", unit: "" },
        { value: "4", label: "上机换药时间 : ", content: "2018-05-12 09:32:22", unit: "" },
        { value: "4", label: "下机换药时间 : ", content: "2018-05-12 09:32:22", unit: "" }
      ],
      info3: [
        { value: "1", label: " ", content: "", unit: "" },

      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>



