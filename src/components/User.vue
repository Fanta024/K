<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div>
        
        <div>
          账号：{{ name }} 绑定QQ：{{ userData.remarks }} 状态：{{
            userData.status ? "已过期" : "正常"
          }}
        </div>
        <div v-if="!userData.status">
          上次更新时间:{{ userData.updatedAt }} 预计过期时间：{{
            expirationTime
          }}
        </div>
        <div v-if="userData.status">过期时间{{ userData.updatedAt }}</div>

      </div>
      <el-input
        v-model="cookie"
        clearable
        placeholder="此处粘贴Cookie更新"
        @keyup.enter.native="updateCookie"
      />
      <div style="margin-top: 10px">
        <el-button type="success" auto @click="updateCookie">更新</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from "../api/index.js";
export default {
  props: ["userDataProps"],
  data() {
    return {
      cookie: "",
      userData: [],
      name: "",
    };
  },

  created() {
    this.userData = this.userDataProps;
    this.userData.updatedAt = this.dayjs(this.userData.updatedAt).format(
      "M-DD HH:mm"
    );
    this.name =
      this.userData.value.match(/pt_pin=(.*?);/) &&
      this.userData.value.match(/pt_pin=(.*?);/)[1];
  },

  methods: {
    async updateCookie() {
      if (this.cookie.indexOf("pt_key=") !== -1) {
        const pt_Key =
          this.cookie.match(/pt_key=(.*?);/) &&
          this.cookie.match(/pt_key=(.*?);/)[1];
        const pt_Pin =
          this.cookie.match(/pt_pin=(.*?);/) &&
          this.cookie.match(/pt_pin=(.*?);/)[1];
        let ck = "pt_key=" + pt_Key + ";pt_pin=" + pt_Pin + ";";
        let userId = this.userData.id;
        let body = {
          _id: userId,
          value: ck,
          remarks: this.userData.remarks,
        };
        let rs = await api.updateUser(body);
        alert(rs.data.msg);
        // TODO 刷新用户数据  vuex
        this.$router.push("/");
      } else {
        alert("请输入正确Cookie");
      }
    },
  },
  computed: {
    expirationTime() {
      return this.dayjs(this.userData.updatedAt)
        .add("30", "day")
        .format("M-DD");
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 10px;
}
</style>