<template>
  <div>
    <div class="title-box">商品品类销量(TOP10)</div>
    <div id="SaleStatic" style="width: 100%; height: 350px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import { getStatisticsProduct } from "@/api/home";
export default {
  name: "SaleStatic",
  data() {
    return {
      // option: {
      //   xAxis: {
      //     type: "category",
      //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //   },
      //   yAxis: {
      //     type: "value",
      //   },
      //   series: [
      //     {
      //       data: [150, 230, 224, 218, 135, 147, 260],
      //       type: "line",
      //     },
      //   ],
      // },
      option: {
        color: ["#80FFA5"],
        title: {
          // text: '渐变堆叠面积图'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#9ED0FF",
            },
          },
        },
        legend: {
          data: ["Line 1"],
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            // name: 'Line 1',
            type: "line",
            stack: "销售量",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(203, 230, 255)",
                },
                {
                  offset: 1,
                  color: "rgba(255, 255, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [],
          },
        ],
      },
    };
  },
  created() {
    this.getData();
    this.$nextTick(function () {

      this.showEchart();

    });
  },
  methods: {
    showEchart() {
      var chartDom = document.getElementById("SaleStatic");
      var myChart = echarts.init(chartDom);
      var option = this.option;
      option && myChart.setOption(option);
    },
    getData() {
      let option = Object.assign({}, this.option);
      getStatisticsProduct().then((res) => {
        if (res.retCode === 200) {
          let data0 = [];
          let laber = [];
          res.retData.forEach((v, i) => {
            data0.push(v.sumSaleCount);
            laber.push(v.categoryName);
          });
          option.series[0].data = [...data0];
          option.xAxis[0].data = [...laber];
        
          this.$nextTick(() => {
            this.showEchart();
          });
        } else {
          this.$message({
            type: "error",
            message: "获取数据失败",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.title-box {
  width: 100%;
  font-size: 18px;
  color: #2274e7;
  font-weight: 400;
  line-height: 28px;
  position: relative;
  padding-left: 40px;
  background: #fff;
  margin-top: 20px;
  padding: 30px 0 30px 40px;
}
.title-box::before {
  display: block;
  content: "";
  width: 4px;
  height: 20px;
  background: #2274e7;
  position: absolute;
  border-radius: 2px;
  left: 0;
  top: 34px;
}
</style>