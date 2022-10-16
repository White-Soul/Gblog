<template>
  <div
    id="layout-header"
    :class="{ fixed: fixed, hidden: hidden }"
    @click.stop="mobileShow = false"
  >
    <div class="site-logo">
      <!-- 路由到 / -->
      <router-link to="/">
        <img src="@/assets/site-logo.svg" alt="" />
        <p class="site-name">Gblog</p>
      </router-link>
    </div>
    <!-- 手机端显示Menus -->
    <div class="menus-btn" @click.stop="mobileShow = !mobileShow">Menus</div>
    <div
      class="site-menus"
      :class="{ mobileShow: mobileShow }"
      @click.stop="mobileShow = !mobileShow"
    >
      <!-- 搜索框 ============ 1 -->
      <div class="menu-item header-search"><header-search /></div>
      <!-- 首页 ================ 2 -->
      <div class="menu-item"><router-link to="/">首页</router-link></div>
      <!-- 文章 ================ 3 -->
      <div class="menu-item hasChild">
        <a href="#">文章</a>
        <!-- 如果存在则显示下拉列表 -->
        <div class="childMenu" v-if="category.length">
          <div class="sub-menu" v-for="item in category" :key="item.labelName">
            <!-- 显示文章下拉列表 -->
            <router-link :to="`/category/${item.labelName}`">{{
              item.labelName
            }}</router-link>
          </div>
        </div>
      </div>
      <div class="menu-item"><router-link to="/friend">友链</router-link></div>
      <div class="menu-item"><router-link to="/about">关于</router-link></div>
      <div class="menu-item" v-if="userLogin">
        <router-link to="/edit">编辑</router-link>
      </div>
      <div class="menu-item" v-else>
        <router-link to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSearch from "@/components/header-search";
import { fetchCategory } from "../../api";
export default {
  name: "layout-header",
  components: { HeaderSearch },
  data() {
    // 设置初始化页面时需要的属性
    return {
      lastScrollTop: 0,
      fixed: false,
      hidden: false,
      // 分类列表
      category: [],
      mobileShow: false,
    };
  },
  mounted() {
    // 添加监听
    window.addEventListener("scroll", this.watchScroll);
    this.fetchCategory();
  },
  beforeDestroy() {
    // 移除监听
    window.removeEventListener("scroll", this.watchScroll);
  },
  methods: {
    // 导航栏向下滚动会隐藏向上会显示
    watchScroll() {
      // 页面是否在最顶部
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 如果在则class为fixed
      if (scrollTop === 0) {
        this.fixed = false;
        // 如果不在最后滚动的位置向下则 class为hidden
      } else if (scrollTop >= this.lastScrollTop) {
        this.fixed = false;
        this.hidden = true;
      } else {
        this.fixed = true;
        this.hidden = false;
      }
      this.lastScrollTop = scrollTop;
    },
    //分类列表
    fetchCategory() {
      fetchCategory()
        .then((res) => {
          this.category = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    // 用户是否登录
    userLogin() {
      return this.$store.state.login;
    },
  },
};
</script>

<style scoped lang="less">
#layout-header {
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 80px;
  padding: 0 80px;
  display: flex;
  //   分配弹性元素方式 均匀排列每个元素
  //   首个元素放置于起点，末尾元素放置于终点
  justify-content: space-between;
  //   align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。
  align-items: center;
  //   transition 属性设置元素当过渡效果：
  transition: 0.3s all ease;
  -webkit-transition: 0.3s all ease;
  -moz-transition: 0.3s all linear;
  -o-transition: 0.3s all ease;
  -ms-transition: 0.3s all ease;
  &.hidden {
    top: -100px;
  }
  &.fixed {
    background-color: #ffffff;
    // box-shadow属性可以设置一个或多个下拉阴影的框。
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.site-logo {
  text-align: center;

  img {
    width: 60px;
    height: 60px;
  }

  p.site-name {
    font-size: 15px;
    font-weight: bold;
    position: relative;
    top: -10px;
  }
}
.menus-btn {
  display: none;
  //   visibility属性指定一个元素是否是可见的。
  visibility: hidden;
}
.site-menus {
  display: flex;
  align-items: center;

  .menu-item {
    min-width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
    a {
      padding: 12px 10px;
      color: #545454;
      font-weight: 500;
      font-size: 16px;
      &:hover {
        color: #ff6d6d;
      }
    }
    &:not(:last-child) {
      margin-right: 15px;
    }
    &.hasChild:hover .childMenu {
      // Opacity属性设置一个元素了透明度级别。
      opacity: 1;
      visibility: visible;
      //   Transform属性应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。
      transform: translateY(-5px);
    }
  }
  .childMenu {
    width: 130px;
    background-color: #fdfdfd;
    border-radius: 3px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 55px;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition: 0.7s all ease;
    -webkit-transition: 0.6s all ease;
    -moz-transition: 0.6s all linear;
    -o-transition: 0.6s all ease;
    -ms-transition: 0.6s all ease;
    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 8px solid white;
      top: -8px;
      left: 20px;
    }
    &:before {
      top: -9px;
      border-bottom: 8px solid #ddd;
    }
    .sub-menu {
      height: 40px;
      line-height: 40px;
      position: relative;
      &:not(:last-child):after {
        /*position: absolute;*/
        content: "";
        width: 50%;
        height: 1px;
        color: #ff6d6d;
        bottom: 0;
        left: 25%;
        z-index: 99;
      }
    }
  }
}
@media (max-width: 960px) {
  #layout-header {
    padding: 0 20px;
  }
}
@media (max-width: 600px) {
  #layout-header {
    padding: 0 10px;
  }
  .menus-btn {
    display: block;
    visibility: visible;
  }
  .site-menus {
    position: absolute;
    display: none;
    visibility: hidden;
    background-color: #f9f9f9;
    width: 100%;
    left: 0;
    top: 80px;
    z-index: -9;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .menu-item {
      position: relative;
      height: unset;
      &:not(:last-child) {
        margin-right: 0;
      }
    }
    .childMenu {
      position: relative;
      width: 100%;
      top: 0;
      background-color: #f3f3f3;
      opacity: 1;
      visibility: visible;
      border: none;
      box-shadow: none;
      &:before,
      &:after {
        content: "";
        position: relative;
        width: 0;
        height: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 0;
      }
    }
  }
  .site-menus.mobileShow {
    display: inline-block;
    visibility: visible;
    z-index: 99;
  }
}
</style>
