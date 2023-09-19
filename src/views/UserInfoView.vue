<template>
  <div class="userInfo">
    <UserVue
      v-for="item in userListData"
      :key="item._id"
      :userDataProps="item"
    ></UserVue>
    <div class="addBox" v-if="userListData.length != 0">
      <div>添加cookie</div>
      <el-input v-model="cookie" placeholder="请输入Cookie"></el-input>
      <el-button @click="addNewCk">添加</el-button>
    </div>
    <div v-else>请先登录或注册</div>
  </div>
</template>

<script>
import UserVue from "@/components/User.vue";
import { getUserList } from "@/api/index";
import * as api from "../api/index.js";
import { checkCk } from "@/utils";
export default {
  data() {
    return {
      userListData: [],
      cookie: "",
    };
  },

  created() {
    if (localStorage.getItem("remarks") != null) {
      getUserList(localStorage.getItem("remarks")).then((r) => {
        this.userListData = r.data;
      });
    } else {
      getUserList(this.$store.state.remarks).then((r) => {
        this.userListData = r.data;
      });
    }
  },

  methods: {
    async addNewCk() {
      let remarks = this.$store.state.remarks;
      if (remarks == null || remarks.length <= 0) {
        remarks = localStorage.getItem("remarks");
      }
      let ck = checkCk(this.cookie);
      if (ck == null) {
        return;
      }
      let { message } = await api.addUser({ cookie: ck, remarks: remarks });
      alert(message);
      this.$router.go(0);
    },
  },
  components: {
    UserVue,
  },
};
</script>

<style lang="less" scoped>
.addBox {
  margin-top: 20px;
}
</style>