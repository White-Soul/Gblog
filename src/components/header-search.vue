<template>
  <div class="header-search">
    <i class="iconfont iconsearch" @click.stop="click"></i>
    <input
      ref="searchInput"
      :class="{ show: show }"
      v-model="searchValue"
      type="text"
      @click.stop=""
      @keyup.enter="search"
    />
  </div>
</template>

<script>
export default {
  name: "header-search",
  data() {
    return {
      // 搜索数据
      searchValue: "",
      //   是否显示输入框
      show: false,
    };
  },
  watch: {
    // 监听show属性
    show(value) {
      // 添加或删除一个事件监听器
      if (value) {
        document.body.addEventListener("click", this.close);
      } else {
        document.body.removeEventListener("click", this.close);
      }
    },
  },
  methods: {
    // 搜索回调，按下回车
    search() {
      // console.log(this.searchValue)
      //   访问路由
      this.$router.push({
        name: "search",
        params: { words: this.searchValue },
      });
      this.close();
    },
    // 点击搜索时出现搜索框
    click() {
      this.searchValue = "";
      this.show = !this.show;
      if (this.show) {
        this.$refs.searchInput && this.$refs.searchInput.focus();
      }
    },
    // 输入框失去焦点时关闭
    close() {
      this.$refs.searchInput && this.$refs.searchInput.blur();
      this.show = false;
    },
  },
};
</script>

<style scoped lang="less">
.header-search {
  display: inline-block;
  position: relative;
  i {
    font-size: 18px;
    position: relative;
    top: 3px;
  }
  input {
    border: none;
    outline: none;
    overflow: hidden;
    background: transparent;
    height: 30px;
    width: 0;
    transition: 0.2s all;
    &.show {
      width: 200px;
      margin-left: 10px;
    }
    &:focus {
      border-bottom: 1px solid #8fd0cc;
    }
  }
}
</style>
