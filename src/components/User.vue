<template>
  <div>
    <el-card class="box-card">
      <div class="text item">
        <div>
          账号：{{ name }} 绑定QQ：{{ userData.remarks }} 状态：{{
            userData.status ? "已过期" : "正常"
          }}
        </div>

        <div class="header">更新cookie</div>
        <div class="card">
          <div class="card-body text-center">
            <el-input
              v-model="cookie"
              style="min-width: 300px"
              @keyup.enter="updateCookie"
              clearable
              class="my-4 w-full"
            />
          </div>
          <el-button type="success" auto @click="updateCookie">更新</el-button>
        </div>
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
      name:''
    };
  },

  mounted() {
    this.userData = this.userDataProps;
    this.name=this.userData.value.match(/pt_pin=(.*?);/) && this.userData.value.match(/pt_pin=(.*?);/)[1]
  },

  methods: {
    async updateCookie() {
      let userId = this.userData.id;
      if (this.cookie.indexOf("pt_key=") !== -1) {
        const pt_Key =
          this.cookie.match(/pt_key=(.*?);/) &&
          this.cookie.match(/pt_key=(.*?);/)[1];
        const pt_Pin =
          this.cookie.match(/pt_pin=(.*?);/) &&
          this.cookie.match(/pt_pin=(.*?);/)[1];
        let ck = "pt_key=" + pt_Key + ";pt_pin=" + pt_Pin + ";";
        let body = {
          _id: userId,
          value: ck,
          remarks: this.userData.remarks,
        }
        let rs = await api.updateUser(body);
        console.log(rs);
        alert(rs.data.msg)
        this.$router.push('/')

      }
    },
  },
  
};
</script>

<style lang="less" scoped>
.text {
  margin-bottom: 20px;
}
</style>