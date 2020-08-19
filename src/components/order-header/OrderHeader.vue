<template>
    <div class="order-header">
        <div class="container clearfix">
            <div class="order-logo fl">
                <a href="#/home"></a>
            </div>
            <div class="title fl">
                <h2>
                    {{title}}
                    <slot name="tip"></slot>
                </h2>
            </div>
            <div class="username fr">{{username}}</div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";

export default {
    name: "order-header",
    props: {
        title: String,
    },
    computed: {
        ...mapState(["username"]),
    },
};
</script>

<style lang="scss" scoped>
.order-header {
    padding: 30px 0;
    border-bottom: 2px solid #ff6600;
    .order-logo {
        width: 50px;
        height: 50px;
        background: url("/imgs/logo-mi.png") no-repeat center;
        background-size: contain;
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }
    .title {
        margin-left: 54px;
        line-height: 50px;
        h2 {
            font-size: 28px;
            color: #343434;
            span {
                font-size: 14px;
                margin-left: 11px;
                color: #9a9a9a;
                font-weight: 200;
            }
        }
    }
    .username {
        font-size: 16px;
        color: #666666;
        line-height: 50px;
    }
}
</style>