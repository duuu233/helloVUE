<template>
  <div>
    <div class="title-box">
      <div class="title">运单统计</div>
      <div class="echart-btn">
        <!-- <el-date-picker
          v-model="dateList"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="input-width"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          size="small"
          :picker-options="pickerOptions"
          @change="switchChart"
        >
        </el-date-picker> -->
        <span class="one" @click="switchChart('#9A55FF', '1')">近一周</span>
        <span class="two" @click="switchChart('#FFBF96', '2')">近一月</span>
        <span class="three" @click="switchChart('#36D7E8', '3')">近一年</span>
      </div>
    </div>
    <div
      id="orderChart"
      style="width: 96%; height: 530px; margin: 0 auto"
    ></div>
  </div>
</template>

<script>
import { getStatisticsToTmsWayBillByDay } from "@/api/home";
import * as echarts from "echarts";
import moment from "moment";
export default {
  name: "OrderStatic",
  data() {
    return {
      dateList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      option: {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "line",

            smooth: true,
          },
        ],
      },
    };
  },
  created() {
    this.$nextTick(function () {
      this.showEchart();
    });
    // const end = new Date();
    // const start = new Date();
    // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    // this.dateList = [
    //   moment(start).format("YYYY-MM-DD"),
    //   moment(end).format("YYYY-MM-DD"),
    // ];
    this.switchChart('#9A55FF', '1');
  },
  methods: {
    showEchart() {
      var chartDom = document.getElementById("orderChart");
      var myChart = echarts.init(chartDom);
      var option = this.option;
      option && myChart.setOption(option);
    },
    switchChart(color, queryType) {
      let option = Object.assign({}, this.option);
          option.series[0].color = color;
      getStatisticsToTmsWayBillByDay({
        // dateBegin: this.dateList[0],
        // dateEnd: this.dateList[1],
        queryType
      }).then((res) => {
        if (res.retCode === 200) {
          let data = [];
          let laber = [];
       
          // if (this.dateList[0] === this.dateList[1]) {
          //   isOneDay = true;
          // }
         
          res.retData.forEach((v, i) => {
            data.push(v.staCount);
               laber.push(v.otherToDate+ "" + v.weekStr);
            // if (isOneDay) {
            //   laber.push(v.toDayDate + "时");
            // } else {
            //   laber.push(v.otherToDate + "" + v.weekStr);
                   
            // }
          });
          option.series[0].data = [...data];
          option.xAxis.data = [...laber];
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
<style scoped lang="scss">
.title-box {
  color: #2274e7;
  font-weight: 400;
  position: relative;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 40px;
  .title {
    font-size: 18px;
  }
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
  color: #000;
}
.echart-btn span {
  display: inline-block;
  padding-left: 36px;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
    line-height: 30px;
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