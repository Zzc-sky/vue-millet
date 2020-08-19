<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { getUser } from "api";

export default {
    name: "App",
    mounted() {
        if (this.$cookie.get("userId")) {
            this.getUserName();
        }
    },
    methods: {
        // 获取用户信息，并且保存到vuex中
        async getUserName() {
            const res = await getUser();
            this.saveUserName(res.username);
        },
        ...mapActions(["saveUserName"]),
    },
};
</script>

<style>
</style>
