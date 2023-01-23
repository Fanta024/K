<template>
  <div class="userInfo">
    <UserVue v-for="item in userListData" :key="item._id" :userDataProps="item"></UserVue>
  </div>
</template>

<script>
import UserVue from '@/components/User.vue'
export default {
  data() {
    return {
      userListData:[]
    };
  },

  mounted() {
    this.userListData = this.$store.state.userCk;
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