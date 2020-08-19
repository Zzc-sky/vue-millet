<template>
    <div class="cart">
        <!-- 购物车顶部 -->
        <order-header title="我的购物车">
            <span slot="tip">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </order-header>
        <!-- 购物车内容 -->
        <order-content></order-content>
        <!-- 服务导航栏 -->
        <server-bar></server-bar>
        <!-- 底部导航 -->
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import ServerBar from "components/server-bar/ServerBar";
import NavFooter from "components/nav-footer/NavFooter";
import OrderHeader from "components/order-header/OrderHeader";
import OrderContent from "./children/CartContent";

export default {
    name: "cart",
    components: {
        OrderHeader,
        OrderContent,
        ServerBar,
        NavFooter
    },
};
</script>

<style  scoped>
</style>