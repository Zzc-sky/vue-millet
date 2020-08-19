<template>
    <div class="product">
        <!-- 顶部导航 -->
        <nav-header :offsetY="offsetY"></nav-header>
        <!-- 参数导航栏 -->
        <product-parms :proName="productInfo.name" @scroll="scroll" ref="product_nav">
            <a slot="buy" class="buy" @click="goToDetail">立即购买</a>
        </product-parms>
        <!-- 商品内容 -->
        <pro-content :productInfo="productInfo"></pro-content>
        <!-- 底部导航 -->
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from "components/nav-header/NavHeader";
import ProductParms from "components/product-parms/ProductParms";
import ProContent from "./children/ProContent";
import NavFooter from "components/nav-footer/NavFooter";

import { getProductInfo } from "api";

export default {
    name: "product",
    data() {
        return {
            productInfo: {},
            offsetY: 0,
        };
    },
    components: {
        NavHeader,
        ProductParms,
        ProContent,
        NavFooter,
    },
    mounted() {
        this.getProductInfo();
        this.$store.dispatch(
            "saveOffsetTop",
            this.$refs.product_nav.$el.offsetTop
        );
    },
    methods: {
        async getProductInfo() {
            const { id } = this.$route.params;
            const res = await getProductInfo(id);
            this.productInfo = res;
        },
        goToDetail() {
            const { id } = this.$route.params;
            this.$router.push("/detail/" + id);
        },
        scroll(y) {
            this.offsetY = y;
        },
    },
};
</script>

<style  scoped>
</style>