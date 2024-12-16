<template>
  <div>
    <div class="title-box">
      订单销售额统计
      <div class="echart-btn">
        <span class="one" @click="switchChart('#9A55FF', '0')">近一周</span>
        <span class="two" @click="switchChart('#FFBF96', '1')">近一月</span>
        <span class="three" @click="switchChart('#36D7E8', '2')">近一年</span>
      </div>
    </div>
    <div
      id="categoryChart"
      style="width: 90%; height: 530px; margin: 0 auto"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import { getStatisticsOrderMoney } from "@/api/home";
export default {
  name: "CategoryStatic",
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        legend: {
          show: true,
          left: "left",
          top: "top",
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "销售总额",
            type: "bar",
            data: [10, 52, 200, 334, 390, 330, 220],
            // barWidth:10
          },
        ],
      },
    };
  },
  created() {
    this.switchChart("#9A55FF", "0");
    this.$nextTick(function () {
      this.showEchart();
    });
  },
  methods: {
    showEchart() {
      var chartDom = document.getElementById("categoryChart");
      var myChart = echarts.init(chartDom);
      var option = this.option;
      option && myChart.setOption(option);
    },
    switchChart(color, queryType) {
      let option = Object.assign({}, this.option);
      getStatisticsOrderMoney({ queryType }).then((res) => {
        if (res.retCode === 200) {
          option.series[0].color = color;
          let data0 = [];
          let laber = [];
          res.retData.forEach((v, i) => {
            data0.push(v.orderMoney);
            laber.push(v.queryDate);
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
.echart-btn {
  position: absolute;
  top: 30px;
  /* right: 100px; */
  right: 0;
  color: #9c9fa6;
}
.echart-btn span {
  display: inline-block;
  padding-left: 36px;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
}
.echart-btn .one::before {
  position: absolute;
  display: block;
  content: "";
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: linear-gradient(180deg, #da8cff, #9a55ff);
  top: 2px;
  left: 0;
}
.echart-btn .two::before {
  position: absolute;
  display: block;
  content: "";
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffbf96, #fe7096);
  top: 2px;
  left: 0;
}
.echart-btn .three::before {
  position: absolute;
  display: block;
  content: "";
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: linear-gradient(181deg, #36d7e8, #b194fa);
  top: 2px;
  left: 0;
}
</style>