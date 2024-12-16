<template>
  <div class="top-nav-box">
    <div class="logo">
      <img src="../../../../assets/images/logo.png" />
      <div class="line"></div>
      <div class="city_name">{{ countyName }}</div>
    </div>
    <div class="nav-box">
      <ul class="nav">
        <li
          v-for="(item, index) in navList"
          :key="index"
          @click="navClick(item.id, index)"
          :class="clickedIndex == index ? 'clickedNav' : ''"
        >
          {{ item.systemName }}
        </li>
      </ul>
      <div class="right">
        <el-dropdown
          class="avatar-container avatar-container-xbb"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <img class="user-avatar" src="../../../../assets/images/user.png" />
            <div class="user-name">{{ username }}</div>
            <i class="el-icon-caret-bottom"></i>

            <!-- <div class="avatar-drop-tip">
              <i></i>
              退出
            </div> -->
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <el-dropdown-item divided>
              <span
                @click="logout"
                style="display: inline-block; padding: 0 16px"
                >退出</span
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i class="right-line"></i>
        <div class="message-icon-box">
          <svg-icon icon-class="nav-ring" class="color-main"></svg-icon>
          <!-- <img
            class="message-icon"
            src="../../../../assets/images/message_icon.png"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLeftMenus } from '@/api/login'
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support'
import store from '../../../../store'
import router from '../../../../router'
import NProgress from 'nprogress' // Progress 进度条
// import '@/nprogress/nprogress.css' // Progress 进度条样式
export default {
  name: 'TopNav',
  data() {
    return {
      navList: store.state.app.sidebarTop,
      username: null,
      countyName: null,
      clickedIndex: 0
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  created() {
    this.username = getCookie('trueName')
    this.countyName = getCookie('countyName')
    if (this.navList.length) {
      this.navClick(this.navList[0].id, 0)
    } else {
      this.$message({
        message: '你没有任何一个页面的权限，请去联系管理员！',
        type: 'success',
        duration: 5000
      })
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$message({
          message: '已退出！',
          type: 'success',
          duration: 1000
        })
        setTimeout(() => {
          location.reload()
        }, 100)
        // 为了重新实例化vue-router对象 避免bug
      })
    },
    navClick(menuId, index) {
      this.clickedIndex = index
      getLeftMenus({ parentMenuId: menuId }).then(response => {
        store.dispatch('SetSideBarRight', response.retData)
      })

      // console.log(store.state.app.sidebarRight);
    }
  }
}
</script>
<style lang="scss" scoped>
.top-nav-box {
  display: flex;
  height: 70px;
  align-items: center;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #3a4354;
  z-index: 9999;
}
.logo {
  height: 70px;
  min-width: 310px;
  background-color: #3a4354;
  display: flex;
  align-items: center;
  color: #edf5fb;
  padding: 10px 20px 10px 26px;
  img {
    width: 70px;
    height: 47px;
  }
  .line {
    background-color: #edf5fb;
    width: 1px;
    height: 26px;
    margin: 0 20px;
  }
  .city_name {
    font-size: 16px;
    font-weight: 400;
    color: #edf5fb;
  }
}
.nav-box {
  display: flex;
  flex: 10;
  padding: 0 30px 0 0px;
  align-items: center;
  justify-content: space-between;
  .right {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
  }
}
.nav {
  display: flex;

  // min-width: 70vw;
  li {
    height: 70px;
    line-height: 70px;
    text-align: center;
    padding: 0 30px;
    color: #edf5fb;
    font-size: 16px;
    font-weight: 400;
    color: #edf5fb;
    cursor: pointer;
  }
  li:hover {
    background-color: #485266;
    color: #edf5fb;
    border-bottom: 4px solid #2274e7;
  }
}
.avatar-container {
  flex: 1;
  height: 35px;
  display: inline-block;
  .avatar-wrapper {
    cursor: pointer;
    // margin-top: 5px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e3eaf4;
    font-size: 16px;
    font-weight: 400;
    .user-avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 8px;
    }
    .user-name {
      display: inline-block;
    }
    .el-icon-caret-bottom {
      // position: absolute;
      // right: -20px;
      // top: 25px;
      margin-left: 6px;
      font-size: 14px;
    }
    .avatar-drop-tip {
      position: absolute;
      top: 80px;
      left: 30px;
      background-color: #3a4354;
      width: 140px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      color: #fff;
      border-radius: 10px;
      font-size: 26px;
      font-weight: 400;
      i {
        display: block;
        position: absolute;
        top: -6px;
        right: 20px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #3a4354;
      }
    }
  }
}
.right-line {
  width: 1px;
  height: 15px;
  background-color: #dcebf7;
  margin-left: 20px;
  margin-right: 15px;
}
.clickedNav {
  background-color: #485266;
  color: #edf5fb;
  border-bottom: 4px solid #2274e7;
}
.message-icon-box {
  display: flex;
  align-items: center;
  .message-icon {
    width: 30px;
    height: 28px;
  }
}
.user-dropdown {
  top: 63px !important;
  background-color: #3a4354;
  border-radius: 5px !important;
}
.user-dropdown :hover {
  background-color: #3a4354;
  border-radius: 5px !important;
}
.el-dropdown-menu__item {
  padding: 0;
  text-align: center;
  color: #fff !important;
  border-radius: 5px !important;
}
.el-dropdown-menu {
  padding: 0;
}

.el-dropdown-menu__item--divided {
  margin-top: 0;
  border-top: none;
}
// duu
:deep(.el-popper .popper__arrow::after) {
  border-bottom-color: #3a4354 !important;
}
.el-dropdown-menu__item--divided:before {
  content: '';
  height: 0;
  display: block;
  margin: 0;
}
</style>
