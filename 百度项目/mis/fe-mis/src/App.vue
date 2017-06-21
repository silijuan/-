<template>
    <div>
        <m-banner :islogin.sync="islogin"></m-banner>
        <div v-show="islogin" v-cloak>
            <router-view class="view" transition="test" transition-mode="out-in" keep-alive="true"></router-view>
        </div>
    </div>
</template>

<style>
</style>

<script>

import Banner from './components/Banner.vue'

export default {
    data() {
        return {
            islogin: false
        }
    },
    components: {
        'm-banner': Banner
    },
    methods: {}
}
</script>

