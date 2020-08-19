<template>
    <div class="product-parms" :class="{is_fixed:isFixed}" ref="product_nav">
        <div class="container">
            <div class="left-nav">
                <span>{{proName}}</span>
            </div>
            <div class="right-nav">
                <a href="javascript:;">概述</a>
                <span>|</span>
                <a href="javascript:;">参数</a>
                <span>|</span>
                <a href="javascript:;">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "product-parms",
    props: {
        proName: String,
    },
    data() {
        return {
            isFixed: false,
            offsetTop: 0,
        };
    },
    methods: {
        initHeight() {
            let scrollTop =
                document.documentElement.scrollTop ||
                window.pageYOffset ||
                document.body.scrollTop;
            this.isFixed = scrollTop >= this.offsetTop ? true : false;
            this.$emit("scroll", scrollTop);
        },
    },
    mounted() {
        window.addEventListener("scroll", this.initHeight);
        this.$nextTick(() => {
            this.offsetTop = this.$refs.product_nav.offsetTop;
            this.$store.dispatch("saveOffsetTop", this.offsetTop);
        });
    },
    destroyed() {
        window.removeEventListener("scroll", this.initHeight);
    },
};
</script>

<style lang="scss" scoped>
.product-parms {
    height: 69px;
    line-height: 69px;
    border-top: 1px solid #e5e5e5;
    z-index: 11;
    background-color: #fff;
    &.is_fixed {
        position: fixed;
        width: 100%;
        top: 0;
        box-shadow: 0 5px 5px #ccc;
    }
    .container {
        display: flex;
        justify-content: space-between;
        .left-nav {
            font-size: 18px;
            font-size: #333333;
            font-weight: 700;
        }
        .right-nav {
            display: flex;
            align-items: center;
            a {
                font-size: 14px;
                color: #666666;
            }
            span {
                margin: 0 8px;
            }
            .buy {
                width: 110px;
                line-height: 30px;
                height: 30px;
                background-color: #ff7301;
                color: #fff;
                text-align: center;
                font-size: 12px;
                margin-left: 8px;
            }
        }
    }
}
</style>