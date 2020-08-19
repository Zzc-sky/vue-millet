<template>
    <div class="order">
        <router-view></router-view>
        <server-bar></server-bar>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import ServerBar from "components/server-bar/ServerBar";
import NavFooter from "components/nav-footer/NavFooter";

export default {
    name: "order",
    components: {
        ServerBar,
        NavFooter,
    },
};
</script>

<style  scoped>
</style>