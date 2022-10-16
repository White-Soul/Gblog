<template>
  <div class="edit">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="blog.title" placeholder="标题"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="blog.label" multiple placeholder="选择标签">
          <el-option
            v-for="item in blogLabel"
            :key="item.id"
            :label="item.labelName"
            :value="item.labelName"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <editor id="tinymce" v-model="blog.content" :init="init"></editor>
    <el-button @click="save" type="primary">保存</el-button>
    <el-button @click="back">返回</el-button>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default/icons";
import "tinymce/models/dom/model";
import { fetchCategory, saveBlog } from "../api";
import { nanoid } from "nanoid";
export default {
  name: "edit",
  components: {
    Editor,
  },
  mounted() {
    tinymce.init({});
  },
  data() {
    return {
      init: {
        selector: "#tinymce",
        language_url: "/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        height: 700,
      },
      blog: {
        //   博客内容
        content: "",
        title: "",
        //   保存的是blogLabel的value值
        labels: [],
        id: nanoid(12),
        userId: window.sessionStorage.getItem("userId"),
      },
      blogLabel: [],
    };
  },
  methods: {
    save() {
      saveBlog(this.blog).then((res) => {
        this.$message("保存成功");
      });
    },
    back() {
      this.$router.push({
        path: "/",
      });
    },
    fetchCategory() {
      fetchCategory()
        .then((res) => {
          this.blogLabel = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.fetchCategory();
  },
};
</script>

<style scoped>
.edit {
  /* margin-top: 100px; */
  /* margin: 80px 20%; */
  text-align: center;
  margin: 100px 50px;
}
.el-button {
  float: right;
  margin-top: 10px;
  margin-right: 20px;
}
.el-row {
  margin-bottom: 10px;
}
</style>