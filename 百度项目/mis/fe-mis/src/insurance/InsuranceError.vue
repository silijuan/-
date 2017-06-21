<template>
<div>
    <v-alert type="danger" dismissable>
        <strong>注意</strong><br>你没有查看当前页面的权限，请联系负责人陈川，如已申请相应权限，请尝试打开相应页面
    </v-alert>
</div>
</template>

<style>
.main {
    margin: 30px;
}
</style>

<script>

import {alert} from 'vue-strap'
export default {
    data() {
    },
    components: {
        'v-alert': alert
    },
    methods: {},
    ready() {
    }
}
</script>

