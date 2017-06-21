/**
 * @file
 * Created by Zhangyunlu on 16/8/8.
 * enter for production
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import {configRouter} from './tools/router-config';

const Main = Vue.extend(App)

Vue.use(VueRouter);

// create router
const router = new VueRouter({
    history: false,
    saveScrollPosition: true
});

// configure router
configRouter(router);

// boostrap the app
router.start(Main, 'app');

// just for debugging
window.router = router;