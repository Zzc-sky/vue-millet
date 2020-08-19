<template>
    <div class="home">
        <nav-header></nav-header>
        <!-- 轮播图 -->
        <home-swiper></home-swiper>
        <!-- 广告 -->
        <home-ads></home-ads>
        <!-- 横幅 -->
        <home-banner></home-banner>
        <!-- 产品 -->
        <home-product></home-product>
        <server-bar></server-bar>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from "components/nav-header/NavHeader";
import NavFooter from "components/nav-footer/NavFooter";
import ServerBar from "components/server-bar/ServerBar";
import HomeSwiper from "./children/HomeSwiper";
import HomeAds from "./children/HomeAds";
import HomeBanner from "./children/HomeBanner";
import HomeProduct from "./children/HomeProduct";

export default {
    name: "Home",
    components: {
        NavHeader,
        NavFooter,
        ServerBar,
        HomeSwiper,
        HomeAds,
        HomeBanner,
        HomeProduct,
    },
};
</script>

<style  scoped>
</style>