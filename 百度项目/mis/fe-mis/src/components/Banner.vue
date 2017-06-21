<template>
    <div>
        <div class="top-banner navbar navbar-default">

            <div class="container-fluid logo">
                <div class="navbar-header">
                    <a class="navbar-brand logo-text" href="#">百度车险</a>
                </div>
            </div>

            <v-drop class="banner-item" text="订单管理" type="default">
                <li><a v-link="{ name: 'iol', params: {something:'$'}}">成单库</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php">订单查询</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/index/indexWithBtn">订单返现</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/batchRebate">手动返现</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/batchRebate">订单检索</a></li>
                <li><a v-link="{ name: 'ioi', params: {something:'$'} }">对账单导入</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/rebateRecord">返现记录查询</a></li>
            </v-drop>

            <v-drop class="banner-item" text="运营管理" type="default">
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/operate">运营活动</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/company">保险公司</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/message">短信模板</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/window">首页弹窗</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/feature">展示位</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/configure/peccancy">违章入口</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/priceStrategy">价格策略</a></li>
            </v-drop>

            <v-drop class="banner-item" text="财务管理" type="default">
                <li><a href="#">您似乎来到了一片没有知识的荒原</a></li>
            </v-drop>

            <v-drop class="banner-item" text="后台管理" type="default">
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/right?type=distribute">权限管理</a></li>
            </v-drop>

            <v-drop class="banner-item" text="报告管理" type="default">
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/buffetFunnel">Buffet漏斗图</a></li>
                <li><a href="http://mis.xian.baidu.com/insuranceMis/index.php/buffetOrder">Buffet订单</a></li>
            </v-drop>

            <v-drop class="banner-item" text="数据中心" type="default">
                <li><a href="http://mis.xian.baidu.com/wymisserver/#/dataCenter">数据中心</a></li>
            </v-drop>

            <div v-if="!islogin">
                <button class="banner-item btn btn-default" v-on:click="login()">登录</button>
            </div>
            <div v-if="islogin">
                <button class="banner-item btn btn-login" type="button">
                  {{name}} <span class="badge" v-on:click="out()">注销</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.top-banner .btn-default {
    background-color: transparent;
    border: none;
    color: #3794E3;
}
.top-banner .btn-login {
    background-color: transparent;
    border: none;
}
.top-banner {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-between;
    -ms-justify-content: space-between;
    -webkit-justify-content: space-between;
}
.top-banner .banner-item {
    margin: 10px;
}
.top-banner .logo {
    text-align: left;
    flex: 1;
    -ms-flex: 1;
    -webkit-flex: 1;
}
.top-banner .logo-text {
    color: #337ab7 !important;
    font-weight: bolder;
}
</style>

<script>

import { showLogin } from '../tools/passport.js';
import { checkLogin } from '../tools/passport.js';
import { exitLogin } from '../tools/passport.js';
import { Jsonp } from '../tools/tool';
import { dropdown } from 'vue-strap';

export default {
    props: {
      islogin: {
         twoWay: true
      },
      'total': {}
    },
    data() {
        return {
            'name':''
        }
    },
    components: {
        'v-drop': dropdown
    },
    methods: {
        login() {
            showLogin();
        },
        out() {
            exitLogin();
        }
    },
    ready() {
        let me = this;
        checkLogin(function (p1, p2) {
            me.islogin = p1;
            me.name = p2;
            if (!p1) {
                showLogin();
            }
        });
    }
}
</script>