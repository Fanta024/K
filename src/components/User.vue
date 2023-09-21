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
        <el-button v-no-more-click type="success" auto @click="updateCookie">更新</el-button>
        <el-button
          v-if="!userData.status"
          type="success"
          auto
          :disabled="isStart"
          @click="watering"
          >浇水</el-button
        >
        <el-button
          v-if="!userData.status"
          type="success"
          auto
          :disabled="!isStart"
          @click="pause"
          >暂停浇水</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { checkCk } from "@/utils/index.js";
import * as api from "../api/index.js";
export default {
  props: ["userDataProps"],
  data() {
    return {
      cookie: "",
      userData: [],
      name: "",
      isStart: false,
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
      let ck = checkCk(this.cookie);
      if (ck == null) {
        return;
      }
      let userId = this.userData.id;
      let body = {
        _id: userId,
        value: ck,
        remarks: this.userData.remarks,
      };
      let rs = await api.updateUser(body);
      alert(rs.message);
      this.$router.go(0);
    },
    async watering() {
      this.isStart = true;
      let { data: res } = await api.watering(this.userDataProps);
      alert("开始浇水");
      alert(res.msg);
    },
    async pause() {
      this.isStart = false;
      let { data: res } = await api.pause();
      alert(res.msg);
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