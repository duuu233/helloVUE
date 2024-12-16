<template>
  <div class="sidebar-container scroll-wrapper" :indicators="false">
    <scroll-bar>
      <div class="menus-box">
        <div v-for="(item, index) in sidebarRight" :key="index">
          <div class="item" v-show="hideItemList.indexOf(item.menuName) === -1">
            <div class="title">
              <i class="line"></i>
              <span class="name"> {{ item.menuName }}</span>
            </div>

            <div v-if="item.childs.length" class="route-box">
              <div v-for="(v, i) in item.childs" :key="i">
                <div
                  v-if="hideSubItemList.indexOf(v.menuName) === -1"
                  @click.stop="goPage(index, i)"
                  class="subitem"
                >
                  <router-link
                    :class="index + '' + i == clickedIndex ? 'clickedNav' : ''"
                    :to="{ name: v.menuUrl ? v.menuUrl : 'javascript:;' }"
                  >
                    {{ v.menuName }}</router-link
                  >
                </div>
              </div>
            </div>
            <!-- <router-link :to="{ name: 'demo' }"> 测试页</router-link> -->
          </div>
        </div>
      </div>
    </scroll-bar>
  </div>
  <!-- <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu> -->
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";
import store from "../../../../store";

export default {
  components: { SidebarItem, ScrollBar },
  created() {
    //   console.log(111)
    // console.log(this.routes)
  },
  data() {
    return {
      clickedIndex: null,
      hideItemList: [
        // "活动促销",
        // "消息推送",
        // "广告管理",
        // "企业管理",
        "支付查询",
        // "APP管理"
      ],
      hideSubItemList: [
        "商品品牌",
        // "帮助分类",
        // "帮助列表",
        "新闻分类",
        "新闻列表",
        "意见反馈",
        // "应用市场",
        // '用户消息',
        "商品属性值",
        "搜索关键词",
        "基础信息",
        "活动管理",
        "广告位置",
        "用户优惠券列表",
      ],
    };
  },
  methods: {
    goPage(index, i) {
      this.clickedIndex = index + "" + i;
    },
    bulletin(index, i) {
      this.clickedIndex = index + "" + i;
      this.$message({
        message: "正在施工中...敬请期待",
        type: "success",
        duration: 3000,
      });
    },
  },

  computed: {
    ...mapGetters(["sidebar", "routers"]),
    routes() {
      // return this.$router.options.routes
      return this.routers;
    },
    sidebarRight() {
      this.clickedIndex = "";
      return store.state.app.sidebarRight;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
<style lang="scss" scoped>
.menus-box {
  // padding-left: 42px;
  .item {
    padding-bottom: 20px;
    margin-left: 10px;
    padding-left: 10px;
    border-bottom: 1px solid #e2eafa;
  }
  .title {
    display: flex;
    font-size: 14px;
    line-height: 40px;
    color: #333333;
    margin-top: 14px;
    font-weight: 600;
    align-items: center;
    position: relative;
    .line {
      width: 4px;
      height: 16px;
      background-color: #2274e7;
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 2px;
    }
  }
  .route-box {
    display: flex;
    font-size: 12px;
    line-height: 30px;
    flex-wrap: wrap;
    color: #555;
    .subitem {
      width: 110px;
      a {
        display: inline-block;
        border-bottom: 1px solid transparent;
        line-height: 15px;

        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      a:hover {
        color: #2274e7;
        border-bottom: 1px solid #2274e7;
      }
    }
    // .subitem .router-link-active {
    //   color: #2274E7;
    // }
  }
}
.clickedNav {
  color: #2274e7 !important;
}
</style>
