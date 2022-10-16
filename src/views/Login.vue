<template>
  <div class="login">
    <el-container>
      <el-main>
        <el-form
          :model="userFrom"
          ref="userFrom"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="userFrom.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="userFrom.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verify">
            <el-row>
              <el-col :span="12">
                <el-input
                  v-model="userFrom.verify"
                  placeholder="请输入验证码"
                  style="width: 150px"
                ></el-input>
              </el-col>
              <a href="#"
                ><el-image
                  style="width: 110px; margin-left: 30px"
                  :src="imgUrl"
                  @click.native="submitImg"
                ></el-image
              ></a>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userFrom')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getImg, login } from "../api";
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validateVerify = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      userFrom: {
        username: "",
        password: "",
        verify: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        verify: [{ validator: validateVerify, trigger: "blur" }],
      },
      imgUrl: "http://localhost:9000/user/kaptcha",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.userFrom).then((res) => {
            console.log("this:>> ", this);
            this.$message(res.message);
            if (res.code === 1) {
              this.$message(res.data);
              window.sessionStorage.setItem("login", true);
              this.$store.commit("SET_LOGIN", true);
              this.$router.push({
                name: "home",
              });
            } else {
              this.submitImg();
            }
          });
        }
      });
    },
    // 请求验证码
    submitImg() {
      getImg().then((res) => {
        const img = btoa(
          new Uint8Array(res).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        this.imgUrl = "data:image/png;base64," + img;
      });
    },
  },
};
</script>

<style scoped>
.el-container {
  width: 400px;
  margin-top: 100px;
  /* margin: 80px 20%; */
  left: 50%;
  margin-left: -200px;
  position: absolute;
  text-align: center;
}
.el-input {
  width: 300px;
}
</style>