<template>
  <div class="userInfo">
    <UserVue v-for="item in userListData" :key="item._id" :userDataProps="item"></UserVue>
  </div>
</template>

<script>
import UserVue from '@/components/User.vue'
import {getUserList} from '@/api/index'
export default {
  data() {
    return {
      userListData:[]
    };
  },

  created() {
      getUserList(this.$store.state.remarks).then(r=>{
      this.userListData=r.data.data;
    })
  },

  methods: {
    
  },
  components:{
    UserVue
  }
};
</script>

<style lang="less" scoped>

</style>