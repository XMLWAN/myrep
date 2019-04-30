<template>
   <div class="plate-box">
    <h2 class="DetailsTit"><span>{{title}}</span></h2>
    <div class="tableTit " >   
        <ul>
             <li v-for="(item,index) in tableTit" :key="index" :value="item.value" >{{item}}</li>
        </ul>
    </div>
    <div class="tableDate" >   
        <ul>
             <li v-for="(item,index) in tableDate" :key="index" :value="item.value" >
               <span>{{item.data}}</span>
               <span>{{item.model}}</span>
               <span>{{item.weightBefore}}</span>
               <span>{{item.weightafter}}</span>
               <span>{{item.set}}</span>
               <span>{{item.actual}}</span>
             </li>
        </ul>
    </div>
    <div class="middleLine"></div>    
  </div>    
</template>

<script>
export default {
  name: "pastData",
  data() {
    return {
      title: "往期数据 ",
      tableTit: [
        "日期",
        "透析模式",
        "透前体重(kg)",
        "透后体重(kg)",
        "设定脱水(L)",
        "实际脱水(L)"
      ],
      tableDate: [
        {
          value: "1",
          data: "05-18 ",
          model: "HD",
          weightBefore: "10",
          weightafter: "30",
          set: "20",
          actual: "3"
        },
        {
          value: "1",
          data: "05-18 ",
          model: "HD",
          weightBefore: "10",
          weightafter: "30",
          set: "20",
          actual: "3"
        },
        {
          value: "1",
          data: "05-18 ",
          model: "HD",
          weightBefore: "10",
          weightafter: "30",
          set: "20",
          actual: "3"
        },
        {
          value: "1",
          data: "05-18 ",
          model: "HD",
          weightBefore: "10",
          weightafter: "30",
          set: "20",
          actual: "3"
        }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tableTit {
  background: $main-color;
  color: $text-color;
  @include box-sizing;
  ul {
    @include display-flex;
    @include align-items-center;
    @include text-align;
    @include justify-content-center;
    li {
      @include flex;
      border-right: 1px $border-color solid;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
    }
    &:last-child {
      border-right: none;
    }
  }
}
.tableDate {
  background: $text-color;
  color: $pgh-color;
  @include box-sizing;
  ul {
    li {
      font-size: 16px;
      height: 44px;
      line-height: 44px;
      @include display-flex;
      @include align-items-center;
      @include text-align;
      @include justify-content-center;
      span {
        @include flex;
        border-right: 1px $border-color solid;
        border-bottom: 1px $border-color solid;
      }
    }
    &:last-child {
      border-right: none;
    }
  }
}
</style>



