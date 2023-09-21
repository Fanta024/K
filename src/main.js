import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dayjs from 'dayjs';
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.dayjs=dayjs
// 提交以后禁用按钮一段时间，防止重复提交
Vue.directive('noMoreClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      el.classList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.classList.remove('is-disabled')
      }, 2000)//2000ms
    })
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
