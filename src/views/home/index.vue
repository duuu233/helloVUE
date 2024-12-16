<template>
  <div class="app-container">
    <div class="daily-box">
      <div class="title-box">关键指标</div>
      <div class="daily-data">
        <div class="daily-item">
          <div class="daily-item-tp">
            <span class="daily-item-num">{{
              wayBillRatioObj.toDayWayBillCount
            }}</span>
            <span class="daily-item-per" v-if="wayBillRatioObj.lastToDayWayBillRate!=0">
              <svg-icon
                :icon-class="
                  wayBillRatioObj.lastToDayWayBillRate > 0
                    ? 'arrow-up'
                    : 'arrow-down'
                "
                style="font-size: 18px"
                :class="
                  wayBillRatioObj.lastToDayWayBillRate > 0
                    ? 'arrow-up'
                    : 'arrow-down'
                "
              ></svg-icon>
            
                {{ wayBillRatioObj.lastToDayWayBillRate }}%
                <i style="color: rgb(144, 147, 153)">同比昨日</i>
            </span>
          </div>
          <div class="daily-item-bt">今日运单数量</div>
        </div>
        <div class="daily-item">
          <div class="daily-item-tp">
            <span class="daily-item-num">{{
              wayBillRatioObj.sevenDayWayBillCount
            }}</span>
            <span class="daily-item-per" v-if="wayBillRatioObj.lastSevenDayWayBillRate!=0">
              <svg-icon
                :icon-class="
                  wayBillRatioObj.lastSevenDayWayBillRate > 0
                    ? 'arrow-up'
                    : 'arrow-down'
                "
                style="font-size: 18px"
                :class="
                  wayBillRatioObj.lastSevenDayWayBillRate > 0
                    ? 'arrow-up'
                    : 'arrow-down'
                "
              ></svg-icon>
              {{ wayBillRatioObj.lastSevenDayWayBillRate }}%
              <i style="color: rgb(144, 147, 153)">同比上周</i>
            </span>
          </div>
          <div class="daily-item-bt">近7日运单数量</div>
        </div>
        <div class="daily-item">
          <div class="daily-item-tp">
            <span class="daily-item-num">{{
              wayBillRatioObj.monthWayBillCount
            }}</span>
            <span class="daily-item-per" v-if="wayBillRatioObj.lastMothWayBillRate!=0">
              <svg-icon
                :icon-class="
                  wayBillRatioObj.lastMothWayBillRate > 0
                    ? 'arrow-up'
                    : 'arrow-down'
                "
                style="font-size: 18px"
                :class="
                  wayBillRatioObj.lastMothWayBillRate > 0
                    ? 'arrow-up'
                    : 'arrow-down'
                "
              ></svg-icon>
              {{ wayBillRatioObj.lastMothWayBillRate }}%
              <i style="color: rgb(144, 147, 153)">同比上月</i>
            </span>
          </div>
          <div class="daily-item-bt">本月运单数量</div>
        </div>

        <div class="daily-item">
          <div class="daily-item-tp">
            <span class="daily-item-num">{{
              statisticsData.wayBillCount
            }}</span>
          </div>
          <div class="daily-item-bt">历史运单总数</div>
        </div>
        <!-- <div class="daily-item">
          <div class="daily-item-tp">
            <span class="daily-item-num">{{
              statisticsData.toDayWayBillCount
            }}</span>
          </div>
          <div class="daily-item-bt">今日运单总数</div>
        </div> -->
        <div class="daily-item">
          <div class="daily-item-tp">
            <span class="daily-item-num">{{
              statisticsData.yesterDayWayBillCount
            }}</span>
          </div>
          <div class="daily-item-bt">昨日运单总数</div>
        </div>
        <!-- <div class="daily-item">
          <div class="daily-item-tp">
            <span class="daily-item-num">{{
              statisticsData.sevenDayWayBillCount
            }}</span>
          </div>
          <div class="daily-item-bt">近7天运单总数</div>
        </div> -->
      </div>
    </div>

    <div class="layout-info">
      <!-- 左侧统计表 -->
      <div class="layout-info-lf">
        <div class="static-order-box">
          <div class="handle-box daily-box">
            <order-static></order-static>
          </div>
        </div>

        <!-- <div class="static-sale-box">
          <div class="handle-box daily-box">
            <sale-static></sale-static>
          </div>
        </div> -->

        <!-- <div class="static-category-box">
          <div class="handle-box daily-box">
            <category-static></category-static>
          </div>
        </div> -->
      </div>

      <!-- 右侧内容 -->
      <div class="layout-info-rt">
        <div class="handle-box daily-box">
          <div class="title-box">待办事项</div>

          <div class="handle-box-list">
            <div
              class="home-handle-item pointer"
              @click="goto('/oms/waybill', { orderState: 1 })"
            >
              <p class="num">{{ statisticsData.wayBillNum1 }}</p>
              <p class="txt">待取货订单</p>
            </div>
            <div
              class="home-handle-item pointer"
              @click="goto('/oms/waybill', { orderState: 2 })"
            >
              <p class="num">{{ statisticsData.wayBillNum2 }}</p>
              <p class="txt">配送中订单</p>
            </div>
          </div>
          <div class="handle-box-list">
            <div
              class="home-handle-item pointer"
              @click="goto('/oms/waybill', { orderState: 3 })"
            >
              <p class="num">
                {{ statisticsData.wayBillNum3 }}
              </p>
              <p class="txt">已送达订单</p>
            </div>
            <div
              class="home-handle-item pointer"
              @click="goto('/oms/waybill', { orderState: 4 })"
            >
              <p class="num">{{ statisticsData.wayBillNum4 }}</p>
              <p class="txt">已转出订单</p>
            </div>
          </div>
          <div class="handle-box-list">
            <div
              class="home-handle-item pointer"
              @click="goto('/oms/waybill', { orderState: 5 })"
            >
              <p class="num">
                {{ statisticsData.wayBillNum5 }}
              </p>
              <p class="txt">已取消订单</p>
            </div>
            <div
              class="home-handle-item pointer"
              style="opacity: 0"
              @click="goto('/oms/refundGoods', { refundState: 1 })"
            >
              <p class="num">{{ statisticsData.waitOrderGoodsCount }}</p>
              <p class="txt">占位无用</p>
            </div>
          </div>

          <!-- <div class="handle-box-list">
            <div
              class="home-handle-item home-handle-warning pointer"
              @click="goto('/pms/productStock')"
            >
              <p class="num">{{ statisticsData.stockWarningCount }}</p>
              <p class="txt">库存预警</p>
            </div>

      
            <div class="home-handle-item" style="opacity: 0">
              <p class="num">34</p>
              <p class="txt">待发货订单</p>
            </div>
          </div> -->
        </div>

        <!-- <div class="quick-handle daily-box">
          <div class="title-box">快捷操作</div>
          <div class="quick-handle-list">
            <div
              class="quick-handle-item pointer"
              @click="goto('/pms/addProduct')"
            >
              <img :src="img_home_publish" class="total-icon" />
              <p>发布商品</p>
            </div>
            <div class="quick-handle-item pointer" @click="goto('/oms/order')">
              <img :src="img_home_order" class="total-icon" />
              <p>订单管理</p>
            </div>
            <div class="quick-handle-item pointer" @click="goto('/sms/member')">
              <img :src="img_home_user" class="total-icon" />
              <p>用户管理</p>
            </div>
          </div>
        </div> -->

        <div class="handle-box daily-box">
          <div class="title-box">运单总览</div>
          <div class="handle-box-list">
            <div class="home-handle-item">
              <p class="num">{{ statisticsData.toBeDisPaCount }}</p>
              <p class="txt">待调度订单</p>
            </div>
            <div class="home-handle-item">
              <p class="num">{{ statisticsData.yesterDayWayBillCount }}</p>
              <p class="txt">昨日运单量</p>
            </div>
          </div>
          <div class="handle-box-list">
            <div class="home-handle-item">
              <p class="num">{{ statisticsData.toDayWayBillCount }}</p>
              <p class="txt">今日运单量</p>
            </div>
            <div class="home-handle-item">
              <p class="num">{{ statisticsData.wayBillCount }}</p>
              <p class="txt">历史总运单量</p>
            </div>
          </div>
        </div>

        <div class="handle-box daily-box">
          <div class="title-box">配送员总览</div>
          <div class="handle-box-list">
            <div class="home-handle-item">
              <p class="num">{{ statisticsData.regCount }}</p>
              <p class="txt">注册人数</p>
            </div>
            <div class="home-handle-item">
              <p class="num">{{ statisticsData.authCount }}</p>
              <p class="txt">已认证</p>
            </div>
          </div>
          <div class="handle-box-list">
            <div class="home-handle-item">
              <p class="num">{{ statisticsData.guyJobStatus1 }}</p>
              <p class="txt">开工中</p>
            </div>
            <div class="home-handle-item">
              <p class="num">{{ statisticsData.guyJobStatus2 }}</p>
              <p class="txt">忙碌中</p>
            </div>
          </div>
        </div>
        <!-- <div class="handle-box daily-box">
          <div class="title-box">短信余量统计</div>
          <div class="handle-box-list">
            <div class="home-handle-item">
              <p class="num">{{ getSMSStatisticsCount.dev_balance }}</p>
              <p class="txt">全类型短信余量</p>
            </div>
            <div class="home-handle-item">
              <p class="num">{{ getSMSStatisticsCount.dev_industry }}</p>
              <p class="txt">行业短信余量</p>
            </div>
          </div>
          <div class="handle-box-list">
            <div class="home-handle-item">
              <p class="num">{{ getSMSStatisticsCount.dev_market }}</p>
              <p class="txt">营销短信余量</p>
            </div>
            <div class="home-handle-item">
              <p class="num">{{ getSMSStatisticsCount.dev_voice }}</p>
              <p class="txt">语音短信余量</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getStatisticsToTms, getStatisticsToTmsWayBillRatio } from "@/api/home";
import OrderStatic from "./OrderStatic.vue";
import SaleStatic from "./SaleStatic.vue";
import CategoryStatic from "./CategoryStatic.vue";
import img_home_order from "@/assets/images/home_order.png";
import img_home_publish from "@/assets/images/home_publish.png";
import img_home_user from "@/assets/images/home_user.png";
export default {
  name: "home",
  components: {
    "order-static": OrderStatic,
    "sale-static": SaleStatic,
    "category-static": CategoryStatic,
  },
  data() {
    return {
      img_home_order,
      img_home_publish,
      img_home_user,
      statisticsData: {},
      wayBillRatioObj: {},
      isCreated: false,
    };
  },
  activated() {
    if (this.isCreated) {
      this.getStatisticsData();
      this.getStatisticsToTmsWayBillRatio();
    }
    this.isCreated = false;
  },
  deactivated() {
    this.isCreated = true;
  },
  created() {
    this.isCreated = true;
    this.getStatisticsData();
    this.getStatisticsToTmsWayBillRatio();
  },
  methods: {
    getStatisticsData() {
      getStatisticsToTms().then((res) => {
        if (res.retCode === 200) {
          this.statisticsData = res.retData;
        } else {
          this.$message({
            type: "success",
            message: "获取统计数据失败",
          });
        }
      });
    },
    getStatisticsToTmsWayBillRatio() {
      getStatisticsToTmsWayBillRatio().then((res) => {
        if (res.retCode === 200) {
          this.wayBillRatioObj = res.retData;
        } else {
          this.$message({
            type: "success",
            message: "获取运单统计比例失败",
          });
        }
      });
    },
    goto(path, query) {
      this.$router.push({
        path: path,
        query: query ? query : "",
      });
    },
  },
};
</script>

<style scoped  lang="scss">
.daily-box {
  background: #fff;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
}
.daily-data {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  box-shadow: 0px 4px 81px 0px rgba(241, 242, 247, 0.82);
}
.daily-item {
  padding: 0 30px 30px 30px;
  flex-grow: 1;
}
.daily-item-num {
  font-size: 35px;
  line-height: 50px;
  color: #333;
  font-weight: bold;
}
.daily-item-per {
  font-size: 12px;
  color: #999999;
  font-weight: 500;
}
.daily-item-tp {
  font-weight: 12px;
  color: #6d7a8e;
  font-weight: 400;
  margin-bottom: 10px;
}
.daily-item-bt {
  font-weight: 12px;
  color: #6d7a8e;
  font-weight: 400;
  margin-bottom: 30px;
}
.title-box {
  width: 100%;
  font-size: 18px;
  color: #2274e7;
  font-weight: 400;
  line-height: 28px;
  position: relative;
  padding-left: 40px;
  background: #fff;
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
.layout-info {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}
.layout-info-lf {
  flex-grow: 2;
  margin-right: 30px;
}
.layout-info-lf .title-box {
  margin-top: 30px;
}
.layout-info-rt {
  /* flex-grow: 1; */
  width: 500px;
}
.handle-box-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px 20px;
}
.handle-box-list > div:nth-child(2n + 1) {
  margin-right: 20px;
}
.home-handle-item {
  flex-grow: 2;
  border-radius: 20px;
  background: #f3f6fd;
  text-align: center;
  padding: 20px 0;
}
.home-handle-item .num {
  font-size: 30px;
  font-weight: bold;
  color: #333;
  padding-bottom: 15px;
}
.home-handle-item .txt {
  font-size: 14px;
  font-weight: 400;
  color: #6d7a8e;
}
.home-handle-warning {
  background: #fff0f0;
}
.handle-box-list .home-handle-warning p {
  color: #f34d4d;
}
.quick-handle-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  color: #6d7a8e;
  font-size: 14px;
  font-weight: 400;
  padding: 0 60px 40px;
  text-align: center;
}
.quick-handle-item {
  width: 55px;
}
.quick-handle-item img {
  width: 55px;
  height: 55px;
}
.quick-handle-item p {
  margin-top: 20px;
}
.arrow-down {
  color: #f34d4d;
}
.arrow-up {
  color: #00e110;
}
.pointer {
  cursor: pointer;
}
</style>
