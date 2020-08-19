<template>
    <div class="detail">
        <!-- 顶部导航 -->
        <nav-header :offsetY="offsetY"></nav-header>
        <!-- 商品导航栏 -->
        <product-parms :proName="product.name" @scroll="scroll"></product-parms>
        <!-- 商品内容 -->
        <detail-content></detail-content>
        <!-- 服务菜单 -->
        <server-bar></server-bar>
        <!-- 底部导航 -->
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from "components/nav-header/NavHeader";
import NavFooter from "components/nav-footer/NavFooter";
import ServerBar from "components/server-bar/ServerBar";
import ProductParms from "components/product-parms/ProductParms";
import DetailContent from "./children/DetailContent";

import { getProductInfo } from "api";

export default {
    name: "detail",
    data() {
        return {
            product: {},
            offsetY: 0,
        };
    },
    components: {
        NavHeader,
        NavFooter,
        ServerBar,
        ProductParms,
        DetailContent,
    },
    methods: {
        // 根据id获取商品信息
        async getProductInfo() {
            const { id } = this.$route.params;
            const res = await getProductInfo(id);
            this.product = res;
        },
        scroll(y) {
            this.offsetY = y;
        },
    },
    mounted() {
        this.getProductInfo();
    },
};
</script>

<style lang="scss" scoped>
</style>