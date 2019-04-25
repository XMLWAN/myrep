<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    },
    title:{
      type: String,
      default: 'chart'
    },
    options:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  data() {
    return {
      chart: null,
      chartOptions:{
        xAxis:[],
        legend:["HD", "HDF", "HD+HP", "HP"],
        series:{
            "HD":[],
            "HDF":[],
            "HD+HP":[],
            "HP":[],
        },
      },
      
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  created(){
    this.chartOptions = this.options;
    console.log("this.chartOptions", this.chartOptions, this.options);
  },
  methods: {
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
            text: this.title,
        },
        xAxis: {
          data: this.chartOptions.xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 50,
          right: 50,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: this.chartOptions.legend,
        },
        series: [{
          name: 'HD',
          smooth: true,
          type: 'line',
          data: this.chartOptions.series["HD"],
          animationDuration: 2800,
        },
        {
          name: 'HDF',
          smooth: true,
          type: 'line',
          data: this.chartOptions.series["HDF"],
          animationDuration: 2800,
        },
        {
          name: 'HD+HP',
          smooth: true,
          type: 'line',
          data: this.chartOptions.series["HD+HP"],
          animationDuration: 2800,
        },
        {
          name: 'HP',
          smooth: true,
          type: 'line',
          data: this.chartOptions.series["HP"],
          animationDuration: 2800,
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
