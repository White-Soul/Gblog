<template>
  <div id="app" v-cloak>
    <!-- 加载动画 -->
    <loading></loading>
    <!-- 头部 -->
    <layout-header></layout-header>
    <!-- 主体 -->
    <layout-body></layout-body>
    <!-- 尾部 -->
    <layout-footer></layout-footer>
  </div>
</template>
<script>
// @符号表示src
import layoutHeader from "@/components/layout/layout-header";
import layoutBody from "@/components/layout/layout-body";
import layoutFooter from "@/components/layout/layout-footer";
import Loading from "@/components/loading";
export default {
  name: "app",
  components: {
    layoutHeader,
    layoutBody,
    layoutFooter,
    Loading,
  },
  beforeDestroy() {
    window.sessionStorage.removeItem("login");
  },
};
</script>
<style lang="less">
#app {
  font-size: 17px;
  color: #6f6f6f;
}
</style>
