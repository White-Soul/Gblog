<template>
  <div class="home">
    <!-- 主页上的头像背景以及介绍 -->
    <banner isHome="true"></banner>
    <div class="site-content animate">
      <!--通知栏-->
      <div class="notify">
        <!-- 搜索结果显示或分类显示 -->
        <div class="search-result" v-if="hideSlogan">
          <span v-if="searchWords">搜索结果："{{ searchWords }}" 相关文章</span>
          <span v-else-if="category">分类 "{{ category }}" 相关文章</span>
        </div>
        <!-- 主页的显示的 本博客的demo数据由Mockjs产生 -->
        <quote v-else>{{ notice }}</quote>
      </div>

      <!--焦点图 是主页才显示-->
      <div class="top-feature" v-if="!hideSlogan">
        <!-- 设置格式 -->
        <section-title>
          <div style="display: flex; align-items: flex-end">
            聚焦
            <!-- 聚焦后面的动态效果 -->
            <small-ico></small-ico>
          </div>
        </section-title>
        <div class="feature-content">
          <div class="feature-item" v-for="item in features" :key="item.title">
            <!-- 显示焦点图 -->
            <Feature :data="item"></Feature>
          </div>
        </div>
      </div>
      <!--文章列表-->
      <main class="site-main" :class="{ search: hideSlogan }">
        <section-title v-if="!hideSlogan">推荐</section-title>
        <template v-for="item in postList">
          <!-- 每一篇文章 -->
          <post :post="item" :key="item.id"></post>
        </template>
      </main>

      <!--加载更多-->
      <div class="more" v-show="hasNextPage">
        <div class="more-btn" @click="loadMore">More</div>
      </div>
    </div>
  </div>
</template>

<script>
// 主页上的头像背景以及介绍
import Banner from "@/components/banner";
// 显示焦点图
import Feature from "@/components/feature";
// 格式化标题  === 聚焦和文章标题
import sectionTitle from "@/components/section-title";
// 文章
import Post from "@/components/post";
// 聚焦后面的动态效果
import SmallIco from "@/components/small-ico";
// 主页的显示的 本博客的demo数据由Mockjs产生
import Quote from "@/components/quote";
import { fetchFocus, fetchList } from "../api";

export default {
  name: "Home",
  props: ["cate", "words"],
  data() {
    return {
      // 焦点图的数量3个
      features: [],
      // 文章列表
      postList: [],
      // 页码
      currPage: 1,
      // 下一页
      hasNextPage: false,
    };
  },
  components: {
    Banner,
    Feature,
    sectionTitle,
    Post,
    SmallIco,
    Quote,
  },
  computed: {
    // 搜索的文章
    searchWords() {
      return this.$route.params.words;
    },
    // 分类的文章
    category() {
      return this.$route.params.cate;
    },
    // 返回是否是category或searchWords
    hideSlogan() {
      return this.category || this.searchWords;
    },
    // 主页的显示的 本博客的demo数据由Mockjs产生
    notice() {
      return this.$store.getters.notice;
    },
  },
  methods: {
    // 3张焦点图
    fetchFocus() {
      fetchFocus()
        .then((res) => {
          this.features = res.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 所有的文章
    fetchList() {
      fetchList()
        .then((res) => {
          this.postList = res.data.items || [];
          this.currPage = res.data.page;
          this.hasNextPage = res.data.hasNextPage;
          console.log("postList :>> ", this.postList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 加载更多文章
    loadMore() {
      fetchList({ page: this.currPage + 1, name: this.cate }).then((res) => {
        this.postList = this.postList.concat(res.data.items || []);
        this.currPage = res.data.page;
        this.hasNextPage = res.data.hasNextPage;
      });
    },
  },
  mounted() {
    this.fetchFocus();
    this.fetchList();
  },
};
</script>
<style scoped lang="less">
.site-content {
  .notify {
    margin: 60px 0;
    border-radius: 3px;
    & > div {
      padding: 20px;
    }
  }

  .search-result {
    padding: 15px 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    border: 1px dashed #ddd;
    color: #828282;
  }
}

.top-feature {
  width: 100%;
  height: auto;
  margin-top: 30px;

  .feature-content {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;

    .feature-item {
      width: 32.9%;
    }
  }
}

.site-main {
  padding-top: 80px;

  &.search {
    padding-top: 0;
  }
}

.more {
  margin: 50px 0;
  .more-btn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #adadad;
    border: 1px solid #adadad;
    border-radius: 20px;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
      color: #8fd0cc;
      border: 1px dashed #8fd0cc;
    }
  }
}

/******/
@media (max-width: 800px) {
  .top-feature {
    display: none;
  }

  .site-main {
    padding-top: 40px;
  }

  .site-content {
    .notify {
      margin: 30px 0 0 0;
    }

    .search-result {
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
}

/******/
</style>
