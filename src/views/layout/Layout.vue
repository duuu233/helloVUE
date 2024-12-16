<template>
  <div class="app-wrapper" :class="classObj">
    <top-nav></top-nav>
 
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <!-- <navbar></navbar> -->
      <div>
        <tags-view />
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import TopNav from "./components/TopNav/TopNav";
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    TopNav,
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  min-height: 100vh;
  // padding-top: 140px;
  padding-top: 80px;
  padding-left: 240px;
  // width: 100%;
  background-color: #edf5fb;
}
</style>
