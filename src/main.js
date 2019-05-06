import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/icon/iconfont.css';
import "./vdirective/vdirective";
import "./vfilter/vfilter";
import axios from "./axios/axios.js"
import urls from "./axios/serviceUrls"
import GlobalUtil from './utils/globalUtil';

require('./mock.js');

Vue.use(element);
Vue.prototype.$axios = axios;
Vue.prototype.$url = urls;
Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
    if (to.name === null) {
        from.name ? next({
            name: from.name
        }) : next('/404');
    } else if (to.name == 'login') {
        next();
    } else {
        next()
        // let routers = GlobalUtil.getLocalStorage('routers')
        // if(!routers){
        //     // GlobalUtil.setLocalStorage('routers',['403','login']);
        //     next('/login')
        //     return 
        // }
        // if(routers.indexOf(to.name) != -1){
        //     next(); //如果匹配到正确跳转
        // }else{
        //     next('/403')
        // }
    }
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')