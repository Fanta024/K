<template>
  <div>
    <div class="box">
      <div :class="{ active: !isActive }" @click="
        isShow = false;
      isActive = false;
      ">
        登录
      </div>
      <div :class="{ active: isActive }" @click="
        isShow = true;
      isActive = true;
      ">
        注册
      </div>

    </div>
    <div>
      <el-form v-if="!isShow">
        <el-form-item>
          <el-input v-model="remarks" clearable @keyup.enter.native="login" placeholder="QQ号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="isShow">
        <el-form-item>
          <el-input v-model="cookie" clearable @keyup.enter.native="reg" placeholder="Cookie"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="remarks" clearable @keyup.enter.native="reg" placeholder="QQ号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reg">注册</el-button>
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

  mounted() {
    this.remarks=localStorage.getItem("remarks");
    console.log(this.remarks);
   },

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
        let { message } = await a.addUser({ cookie: ck, remarks: this.remarks });
        alert(message);
        // this.$store.commit("setUserInfo", data.data);
        this.$store.commit("setUserRemark", this.remarks);
        this.$router.push("/userInfo");
      } else {
        alert("请粘贴正确cookie");
      }
    },
    async login() {
      if (isFinite(this.remarks)) {
        if (this.remarks.length <= 11) {
          let remarks = this.remarks.trim();
          let result = await a.getUserList(remarks);
          console.log(result);
          if (result.code == 200) {
            if (result.data.length == 0) {
              alert("未找到用户，请先注册");
            } else {
              // this.$store.commit("setUserInfo", result.data.data);
              localStorage.setItem("remarks",this.remarks)
              this.$store.commit("setUserRemark", this.remarks);
              this.$router.push("/userInfo");
            }
          } else {
            alert(result.message);
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