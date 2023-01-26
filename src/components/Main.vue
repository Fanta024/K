<template>
  <div>
    <div class="box">
      <div
        :class="{ active: !isActive }"
        @click="
          isShow = false;
          isActive = false;
        "
      >
        注册
      </div>
      <div
        :class="{ active: isActive }"
        @click="
          isShow = true;
          isActive = true;
        "
      >
        登录
      </div>
    </div>
    <div>
      <el-form v-if="!isShow">
        <el-form-item label-width="150px" label="请在此处粘贴cookie">
          <el-input v-model="cookie"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="QQ号">
          <el-input v-model="remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reg">注册</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="isShow">
        <el-form-item label-width="150px" label="输入QQ号">
          <el-input v-model="cookie"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as a from "../api/index.js";

export default {
  data() {
    return {
      cookie: "",
      remarks: "",
      isShow: false,
      isActive: false,
    };
  },

  mounted() {},

  methods: {
    async reg() {
      if (this.cookie.indexOf("pt_key=") !== -1) {
        const pt_Key =
          this.cookie.match(/pt_key=(.*?);/) &&
          this.cookie.match(/pt_key=(.*?);/)[1];
        const pt_Pin =
          this.cookie.match(/pt_pin=(.*?);/) &&
          this.cookie.match(/pt_pin=(.*?);/)[1];
        let ck = "pt_key=" + pt_Key + ";pt_pin=" + pt_Pin + ";";

        if (!this.remarks) {
          alert("未输入绑定QQ号");
          return;
        }
        let { data } = await a.addUser({ cookie: ck, remarks: this.remarks });
        console.log(data);
        alert(data.msg);
        this.$store.commit("setUserInfo", data.data);
        this.$router.push("/userInfo");
      }
    },
    async login() {
      if (isFinite(this.cookie)) {
        if (this.cookie.length <= 11) {
          let remarks = this.cookie.trim();
          let result = await a.getUserList(remarks);
          console.log(result);
          if (result.data.code == 200) {
            if (result.data.data.length == 0) {
              alert("未找到用户，请先注册");
            } else {
              this.$store.commit("setUserInfo", result.data.data);
              this.$router.push("/userInfo");
            }
          } else {
            alert(result.data.msg);
          }
        } else alert("请输入QQ号");
      } else alert("请输入QQ号");
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  :nth-child(1) {
    margin-right: 20px;
    cursor: pointer;
  }
  :nth-child(2) {
    cursor: pointer;
  }
}
.active {
  color: #42b983;
}
</style>