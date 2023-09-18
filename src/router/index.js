import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'
Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userInfo',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserInfoView.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
 if(to.path==='/userInfo'){
  if(store.state.userCk.length>0){
    next()
  }
  else if(store.state.remarks>0){
    next()
  }
  else if(localStorage.getItem('remarks')!=null){
    next()
  }
  else{
    alert('请先注册或登录')
    next('/')
  }
 }else{
  next()
 }
})



export default router
