<template>
  <div class="userInfo">
    <UserVue v-for="item in userListData" :key="item._id" :userDataProps="item"></UserVue>
    <div class="addBox" v-if="userListData.length!=0">
      <div>添加cookie</div>
      <el-input v-model="cookie" placeholder="请输入Cookie"></el-input>
      <el-button @click="addNewCk">添加</el-button>
    </div>
    <div v-else>
      请先登录或注册
    </div>
  </div>
</template>

<script>
import UserVue from '@/components/User.vue'
import {getUserList} from '@/api/index'
import * as api from "../api/index.js";
export default {
  data() {
    return {
      userListData:[],
      cookie:''
    };
  },

  created() {
    if(localStorage.getItem("remarks")!=null){
      getUserList(localStorage.getItem("remarks")).then(r=>{
        this.userListData=r.data;
    })
    }else{
      getUserList(this.$store.state.remarks).then(r=>{
        this.userListData=r.data;
    })
  }
  },

  methods: {
   async addNewCk(){
      let remarks=this.$store.state.remarks;
      console.log(remarks);
      if(remarks==null || remarks.length<=0){
        remarks=localStorage.getItem("remarks")
      }
      if (this.cookie.indexOf("pt_key=") !== -1) {
        const pt_Key =
          this.cookie.match(/pt_key=(.*?);/) &&
          this.cookie.match(/pt_key=(.*?);/)[1];
        const pt_Pin =
          this.cookie.match(/pt_pin=(.*?);/) &&
          this.cookie.match(/pt_pin=(.*?);/)[1];
        let ck = "pt_key=" + pt_Key + ";pt_pin=" + pt_Pin + ";";
        let { message } = await api.addUser({ cookie: ck, remarks: remarks });
        alert(message);
        this.$router.go(0)
      } else {
        alert("请粘贴正确cookie");
      }
    }
  },
  components:{
    UserVue
  }
};
</script>

<style lang="less" scoped>
.addBox{
  margin-top: 20px;
}
</style>